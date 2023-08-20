import MainNavbar from "@/components/mainNavbar/MainNavbar";
import PartNavbar from "@/components/partNavbar/PartNavbar";
import Head from "next/head";
import classes from "../../styles/profile.module.css";
import SidebarProfile from "@/components/sidebarProfile/SidebarProfile";
import request from "@/lib/request";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import * as cookie from "cookie";

const Profile = ({ user }) => {
  const [loading, setLoading] = useState(true);
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
        egLink={"/eg/profile"}
        saLink={"/sa/profile"}
        aeLink={"/ae/profile"}
      />
      <main className={classes.profilePage}>
        <div className="container">
          <div className="row m-0">
            <div className="col-4 d-none d-md-flex">
              <SidebarProfile />
            </div>
            {!loading ? (
              <div className="col-12 col-md-8">
                <h2 className="fw-bold mb-5">اعدادات الحساب</h2>
                <div className="card p-3 mb-5">
                  <img
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "3px",
                    }}
                    src="https://taager.com/assets/img/default_avatar.png"
                    alt=""
                  />
                  <span className="fw-bold fs-5 d-block mt-3">
                    {user?.username}
                  </span>
                </div>
                <div className="card">
                  <div
                    className="top-div p-3 d-flex align-items-center"
                    style={{ borderBottom: "1px solid #efefef" }}
                  >
                    <div
                      className="child ms-2"
                      style={{ width: "80px", height: "80px" }}
                    >
                      <img
                        src="https://taager.com/assets/img/personal-i.png"
                        className="w-100 h-100"
                        alt=""
                      />
                    </div>
                    <div className="child">
                      <span>لا يمكنك تغيير الاعدادات</span>
                    </div>
                  </div>
                  <div className="botton-div p-3">
                    <div className="row m-0">
                      <div className="col-12 col-md-6 mb-3">
                        <input
                          type="text"
                          className="w-100 p-2"
                          disabled
                          value={user?.username}
                          style={{ cursor: "not-allowed" }}
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <input
                          type="text"
                          className="w-100 p-2"
                          disabled
                          value={user?.email}
                          style={{ cursor: "not-allowed" }}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className="w-100 p-2"
                          disabled
                          value={user?.phoneNumber}
                          style={{ cursor: "not-allowed" }}
                        />
                      </div>
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
      </main>
    </>
  );
};

export default Profile;

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
