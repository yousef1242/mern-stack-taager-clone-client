import MainNavbar from "@/components/mainNavbar/MainNavbar";
import PartNavbar from "@/components/partNavbar/PartNavbar";
import Head from "next/head";
import classes from "../../styles/wallet.module.css";
import SidebarProfile from "@/components/sidebarProfile/SidebarProfile";
import request from "@/lib/request";
import { useEffect, useState } from "react";
import * as cookie from "cookie";
import { Spinner } from "react-bootstrap";
import WithdrawModel from "@/components/withdrawModel/WithdrawModel";

const Wallet = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [withdrawModel, setWithdrawModel] = useState(false);
  const [amountCurruncy, setAmountCurruncy] = useState("");
  const [countryBalance, setCountryBalance] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>Taager</title>
        <meta name="description" content="biggest marketing website" />
      </Head>
      <MainNavbar />
      <PartNavbar
        egLink={"/eg/wallet"}
        saLink={"/sa/wallet"}
        aeLink={"/ae/wallet"}
      />
      <main className={classes.walletPage}>
        <div className="container">
          <div className="row m-0">
            <div className="col-4 d-none d-md-flex">
              <SidebarProfile />
            </div>
            {!loading ? (
              <div className="col-12 col-md-8">
                <h2 className="fw-bold mb-3">المحفظة</h2>
                <span className="d-block mb-5">
                  انت في اول الطريق الي تحقيق حلمك و تقدر دلوقتي تشوف المنتجات
                  وتبدأ تبيع اللي يناسبك و تحقق ارباح و نجاحات كتير
                </span>
                <div className="row m-0">
                  <div className="col-12 col-lg-6 mb-3">
                    <div className="card p-5">
                      <div className="d-flex align-items-center">
                        <div
                          className="child"
                          style={{ width: "80px", height: "80px" }}
                        >
                          <img
                            src="https://taager.com/assets/img/countries-dropdown-icons/eg.svg"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            alt=""
                          />
                        </div>
                        <div className="child me-2">
                          <h5>ارباحك الجاهزة للسحب</h5>
                          <h5 style={{ color: "var(--green-color)" }}>
                            {user?.egyptBalance} جنيه مصري
                          </h5>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setWithdrawModel(true);
                          setAmountCurruncy("EGP");
                          setCountryBalance(user?.egyptBalance)
                        }}
                        className={classes.takeMoney}
                      >
                        سحب الارباح
                      </button>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 mb-3">
                    <div className="card p-5">
                      <div className="d-flex align-items-center">
                        <div
                          className="child"
                          style={{ width: "80px", height: "80px" }}
                        >
                          <img
                            src="https://taager.com/assets/img/countries-dropdown-icons/ae.svg"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            alt=""
                          />
                        </div>
                        <div className="child me-2">
                          <h5>ارباحك الجاهزة للسحب</h5>
                          <h5 style={{ color: "var(--green-color)" }}>
                            {user?.emaratBalance} جنيه اماراتي
                          </h5>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setWithdrawModel(true);
                          setAmountCurruncy("AED");
                          setCountryBalance(user?.emaratBalance)
                        }}
                        className={classes.takeMoney}
                      >
                        سحب الارباح
                      </button>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="card p-5">
                      <div className="d-flex align-items-center">
                        <div
                          className="child"
                          style={{ width: "80px", height: "80px" }}
                        >
                          <img
                            src="https://taager.com/assets/img/countries-dropdown-icons/sa.svg"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            alt=""
                          />
                        </div>
                        <div className="child me-2">
                          <h5>ارباحك الجاهزة للسحب</h5>
                          <h5 style={{ color: "var(--green-color)" }}>
                            {user?.sudiaBalance} جنيه سعودي
                          </h5>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setWithdrawModel(true);
                          setAmountCurruncy("SAR");
                          setCountryBalance(user?.sudiaBalance)
                        }}
                        className={classes.takeMoney}
                      >
                        سحب الارباح
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-12 col-md-8 d-flex align-items-center justify-content-center">
                {" "}
                <Spinner
                  as="span"
                  animation="border"
                  size="lg"
                  role="status"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        </div>
        <WithdrawModel
          countryCurruncy={amountCurruncy}
          countryBalance={countryBalance}
          show={withdrawModel}
          onHide={() => setWithdrawModel(false)}
        />
      </main>
    </>
  );
};

export default Wallet;

export async function getServerSideProps(context) {
  const parsedCookies = cookie.parse(context.req.headers.cookie);
  const jsonCookie = JSON.parse(parsedCookies.setUserInfoAfterLogin);

  const { data } = await request.get(`/api/users/${jsonCookie.id}`);

  return {
    props: {
      user: data,
    },
  };
}
