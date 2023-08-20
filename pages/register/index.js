import UserNavbar from "@/components/userNavbar/UserNavbar";
import Head from "next/head";
import classes from "../../styles/form.module.css";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import request from "@/lib/request";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (username === "") return toast.error("الاسم مطلوب");
    if (email === "") return toast.error("البريد الالكتروني مطلوب");
    if (phoneNumber === "") return toast.error("رقم الهاتف مطلوب");
    if (phoneNumber.length < 8) {
      return toast.error("رقم الهاتف غير صحيح");
    }
    if (password === "") return toast.error("كلمة المرور مطلوبة");
    if (password.length < 8) {
      return toast.error("يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل");
    }
    if (confirmPassword !== password)
      return toast.error("كلمة المرور لا تتطابق");
    setLoading(true);
    try {
      const { data } = await request.post("api/auth/register", {
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
      });
      toast.success(data.message);
      router.push("/login")
      setLoading(false);
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
        <div className={`container w-100 h-100 ${classes.formContainer}`}>
          <div>
            <div className={classes.formImageDiv}>
              <img
                src="https://taager.com/assets/img/auth/signIcon.svg"
                alt=""
              />
            </div>
            <h4 className="text-center mb-5">
              أنشئ حساباً و ابدأ رحلة الأرباح مع تاجر
            </h4>
            <form onSubmit={submitFormHandler}>
              <div className={classes.formGroup}>
                <input
                  type="text"
                  placeholder="الاسم"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className={classes.formGroup}>
                <input
                  type="email"
                  placeholder="البريد الالكتروني"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
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
              <div className={classes.formGroup}>
                <input
                  type="password"
                  placeholder="تاكيد كلمة المرور"
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  "استمرار"
                )}
              </button>
            </form>
            <div className="mt-4 fs-5">
              لدي حساب بالفعل؟{" "}
              <Link
                style={{ color: "var(--green-color)", fontWeight: "bold" }}
                href={"/login"}
              >
                تسجبل دخول
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
