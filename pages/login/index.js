import UserNavbar from "@/components/userNavbar/UserNavbar";
import Head from "next/head";
import classes from "../../styles/form.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import request from "@/lib/request";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/authSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (phoneNumber === "") return toast.error("رقم الهاتف مطلوب");
    if (phoneNumber.length < 8) {
      return toast.error("رقم الهاتف غير صحيح");
    }
    if (password === "") return toast.error("كلمة المرور مطلوبة");
    if (password.length < 8) {
      return toast.error("يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل");
    }
    setLoading(true);
    try {
      const { data } = await request.post("api/auth/login", {
        phoneNumber: phoneNumber,
        password: password,
      });
      toast.success("لقد سجلت الي حسابك بنجاح");
      setLoading(false);
      router.push("/eg/products")
      dispatch(setAuth(data));
      Cookies.set("setUserInfoAfterLogin", JSON.stringify(data));
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Taager</title>
        <meta name="description" content="biggest marketing website" />
      </Head>
      <UserNavbar />
      <div className={classes.formDiv}>
        <div className={`container h-100 ${classes.formContainer}`}>
          <div>
            <div className={classes.formImageDiv}>
              <img
                src="https://taager.com/assets/img/auth/login-lock.svg"
                alt=""
              />
            </div>
            <h4 className="text-center mb-5">تسجيل الدخول إلى حسابك</h4>
            <form onSubmit={submitFormHandler}>
              <div className={classes.formGroup}>
                <input
                  type="tel"
                  placeholder="رقم الهاتف"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className={classes.formGroup}>
                <input
                  type="password"
                  placeholder="كلمة المرور"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                disabled={loading}
                type="submit"
                className={classes.formBtn}
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
                  "تسجبل دخول"
                )}
              </button>
            </form>
            <div className="mt-4 fs-5">
              ليس لديك حساب؟
              <Link
                style={{ color: "var(--green-color)", fontWeight: "bold" }}
                href={"/register"}
              >
                إنشاء حساب جديد
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
