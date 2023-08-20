import Modal from "react-bootstrap/Modal";
import classes from "../../styles/withdrawModel.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import request from "@/lib/request";
import { useSelector } from "react-redux";
import { Alert, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";

function WithdrawModel(props) {
  const [amount, setAmount] = useState();
  const [paypalAccount, setPaypalAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => state.auth);
  const router = useRouter();

  const withdrawFunction = async (e) => {
    e.preventDefault();
    if (!amount) return toast.error("املئ الحقول");
    if (amount < 0) return toast.error("حدث خطأ ما");
    if (paypalAccount === "") return toast.error("املئ الحقول");
    if (props.countryBalance <= 0 || amount > props.countryBalance) {
      return toast.error("لا يمكنك سحب الارباح");
    }
    if (props.countryCurruncy === "EGP" && amount < 40) {
      return toast.error("اقل سحب اربعين جنيه مصري");
    }
    if (props.countryCurruncy === "AED" && amount < 2) {
      return toast.error("اقل سحب اتنين درهم اماراتي");
    }
    if (props.countryCurruncy === "SAR" && amount < 5) {
      return toast.error("اقل سحب خمسة ريال سعودي");
    }
    setLoading(true);
    try {
      const { data } = await request.post(
        "/api/withdraw/send",
        {
          amount: amount,
          paypalAccount: paypalAccount,
          countryCurruncy: props.countryCurruncy,
          userId: auth?.id,
        },
        {
          headers: {
            Authorization: "bearer " + auth?.token,
          },
        }
      );
      toast.success(data.message);
      router.push(`/${router.query.country}/profile`);
      try {
        await request.put(
          `/api/users/withdraw/balance/${auth?.id}`,
          {
            amount: amount,
            curruncy: props.countryCurruncy,
          },
          {
            headers: {
              Authorization: "bearer " + auth?.token,
            },
          }
        );
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Modal
      className={classes.orderModel}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className={classes.withdrawModelHeader} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          سحب الارباح
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={withdrawFunction}>
          <div className={classes.formGroup}>
            <div className="d-flex mb-3 gap-2 align-items-center flex-wrap">
              <label htmlFor="amount">المبلغ المراد سحبه</label>
              <Alert className="m-0" variant={"warning"}>
                سيتم تحويل المبلغ المحدد الي العملة دولار حسب معدل التحويل الخاص
                بلحظة سحبك للارباح
              </Alert>
            </div>
            <div>
              <input
                onChange={(e) => setAmount(e.target.value)}
                id="amount"
                type="number"
                value={amount}
              />
              <span>{props.countryCurruncy}</span>
            </div>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="paypalAccount" className="mb-3 w-100">
              اكونت Paypal
            </label>
            <input
              onChange={(e) => setPaypalAccount(e.target.value)}
              id="paypalAccount"
              type="text"
              value={paypalAccount}
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className={classes.withdrawModelBtn}
          >
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "تاكيد السحب"
            )}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default WithdrawModel;
