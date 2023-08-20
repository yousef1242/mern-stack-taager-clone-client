import MainNavbar from "@/components/mainNavbar/MainNavbar";
import PartNavbar from "@/components/partNavbar/PartNavbar";
import Head from "next/head";
import classes from "../../styles/order.module.css";
import SidebarProfile from "@/components/sidebarProfile/SidebarProfile";
import request from "@/lib/request";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import * as cookie from "cookie";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import ShowOrder from "@/components/showOrder/ShowOrder";
import FollowOrder from "@/components/followOrder/Followorder";

const Orders = ({ orders }) => {
  const [ordersData, setOrdersData] = useState(orders);
  const [loading, setLoading] = useState(true);
  const { auth } = useSelector((state) => state.auth);
  const [showOrdermodal, setShowOrderModal] = useState(false);
  const [followOrdermodal, setFollowOrderModal] = useState(false);
  const [orderInfo, setOrderInfo] = useState({});
  const [orderStatus, setOrderStatus] = useState("تم استلام الطلب");
  const [orderCancel, setOrderCancele] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setOrdersData(orders);
  }, [orders]);

  const cancelOrder = async (orderId) => {
    const updatedOrders = ordersData.map((order) => {
      if (order._id === orderId) {
        return { ...order, isCancled: true };
      }
      return order;
    });

    setOrdersData(updatedOrders);
    try {
      const { data } = await request.put(
        `/api/orders/cancel/${orderId}`,
        {},
        {
          headers: {
            Authorization: "bearer " + auth?.token,
          },
        }
      );
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const searchByInput = (e) => {
    e.preventDefault();
    const filterData =
      search === ""
        ? ordersData
        : ordersData?.filter(
            (order) =>
              order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
              order.fullname.toLowerCase().includes(search.toLowerCase())
          );
    setOrdersData(filterData);
  };

  return (
    <>
      <Head>
        <title>Taager</title>
        <meta name="description" content="biggest marketing website" />
      </Head>
      <MainNavbar />
      <PartNavbar
        egLink={"/eg/orders"}
        saLink={"/sa/orders"}
        aeLink={"/ae/orders"}
      />
      <main className={classes.ordersPage}>
        <div className="container">
          <div className="row m-0">
            <div className="col-4 d-none d-md-flex">
              <SidebarProfile />
            </div>
            {!loading ? (
              <div className="col-12 col-md-8">
                <h2 className="fw-bold mb-5">الطلبات</h2>
                <div style={{ background: "#efefef" }} className="p-4">
                  <div className="row m-0">
                    <div className="col-12 col-sm-8 mb-sm-0 mb-3">
                      <input
                        type="text"
                        value={search}
                        placeholder="قم بالبحث باستخدام اسم العميل, رقم الطلب "
                        className={classes.searchInput}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div className="col-12 col-sm-4 d-flex align-items-center justify-content-around">
                      <button
                        onClick={searchByInput}
                        className={classes.searchBtn}
                      >
                        بحث
                      </button>
                      <button
                        onClick={() => {
                          setOrdersData(orders);
                          setSearch("");
                        }}
                        className={classes.searchBtn}
                        style={{
                          color: "var(--green-color)",
                          background: "#fff",
                          border: "1px solid var(--green-color)",
                        }}
                      >
                        جديد
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row m-0 mt-5">
                  {ordersData?.length > 0 ? (
                    ordersData?.map((order) => (
                      <div
                        key={order?._id}
                        className="col-12 mb-3 py-4 border-bottom"
                      >
                        <div className="row m-0">
                          <div className="col-12 mb- col-lg-8">
                            <div>
                              <div className={classes.orderHeader}>
                                <span className="ms-3">رقم الاوردر</span>
                                <span className="fw-bold ms-3">
                                  {order?.orderNumber}
                                </span>
                                <span className="ms-3">تاريخ الطلب</span>
                                <span className="fw-bold">
                                  {order?.createdAt && (
                                    <span>
                                      {new Date(
                                        order.createdAt
                                      ).toLocaleDateString("en-US")}
                                    </span>
                                  )}
                                </span>
                              </div>
                              <div className="py-3 text-center row m-0">
                                <div className="col-6 col-md-3 mb-3">
                                  <span className="d-block mb-2">
                                    اسم العميل
                                  </span>
                                  <span className="fw-bold">
                                    {order?.fullname}
                                  </span>
                                </div>
                                <div className="col-6 col-md-3 mb-3">
                                  <span className="d-block mb-2">
                                    رقم الموبايل
                                  </span>
                                  <span className="fw-bold">
                                    {order?.phoneNumber}
                                  </span>
                                </div>
                                <div className="col-6 col-md-3 mb-3">
                                  <span className="d-block mb-2">المحافظة</span>
                                  <span className="fw-bold">
                                    {order?.goverment}
                                  </span>
                                </div>
                                <div className="col-6 col-md-3 mb-3">
                                  <span className="d-block mb-2">
                                    المبلغ الإجمالي
                                  </span>
                                  <span className="fw-bold">
                                    {order?.totalPrice}{" "}
                                    {order?.orderTo === "eg"
                                      ? "ج.م"
                                      : order?.orderTo === "sa"
                                      ? "ر.س"
                                      : "د.ا"}
                                  </span>
                                </div>
                                <div className="col-6 col-md-3 mb-3">
                                  <span className="d-block mb-2">
                                    اجمالي الربح
                                  </span>
                                  <span className="fw-bold">
                                    {order?.totalProfit}{" "}
                                    {order?.orderTo === "eg"
                                      ? "ج.م"
                                      : order?.orderTo === "sa"
                                      ? "ر.س"
                                      : "د.ا"}
                                  </span>
                                </div>
                                <div className="col-6 col-md-3 mb-3">
                                  <span className="d-block mb-2">العنوان</span>
                                  <span className="fw-bold">
                                    {order?.address}
                                  </span>
                                </div>
                                <div className="col-6 col-md-3 mb-3">
                                  <span className="d-block mb-2">شحن الي</span>
                                  <span className="fw-bold">
                                    {order?.orderTo === "eg"
                                      ? "مصر"
                                      : order?.orderTo === "sa"
                                      ? "السعودية"
                                      : "الامارات"}
                                  </span>
                                </div>
                                <div className="col-6 col-md-3 mb-3">
                                  <span className="d-block mb-2">
                                    الملاحظات
                                  </span>
                                  <span className="fw-bold">
                                    {order?.notes !== ""
                                      ? order?.notes
                                      : "لا توجد ملاحظات"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-4">
                            <button
                              style={{
                                border: "1px solid var(--green-color)",
                                color: "var(--green-color)",
                              }}
                              className={classes.orderBtns}
                              onClick={() => {
                                setShowOrderModal(true);
                                setOrderInfo(order);
                              }}
                            >
                              عرض الاوردر
                            </button>
                            <button
                              onClick={() => {
                                setFollowOrderModal(true);
                                setOrderStatus(order?.status);
                                setOrderCancele(order?.isCancled);
                              }}
                              className={classes.orderBtns}
                            >
                              تتبع الاوردر
                            </button>
                            {order?.isCancled ? (
                              ""
                            ) : order?.status === "تم التوصيل" ? (
                              ""
                            ) : order?.status === "التوصيل قيد التقدم" ? (
                              ""
                            ) : order?.status === "في انتظار شركة الشحن" ? (
                              ""
                            ) : order?.status === "تم تأكيد الطلب" ? (
                              ""
                            ) : (
                              <button
                                onClick={() => cancelOrder(order?._id)}
                                style={{
                                  border: "1px solid red",
                                  color: "red",
                                }}
                                className={classes.orderBtns}
                              >
                                الغاء
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h3 className="mt-5 text-center fw-bold">لا توجد طلبات</h3>
                  )}
                  <ShowOrder
                    orderInfo={orderInfo}
                    show={showOrdermodal}
                    onHide={() => setShowOrderModal(false)}
                  />
                  <FollowOrder
                    orderStatus={orderStatus}
                    orderCancel={orderCancel}
                    show={followOrdermodal}
                    onHide={() => setFollowOrderModal(false)}
                  />
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

export default Orders;

export async function getServerSideProps(context) {
  const parsedCookies = cookie.parse(context.req.headers.cookie);
  const jsonCookie = JSON.parse(parsedCookies.setUserInfoAfterLogin);

  const { data } = await request.get(`/api/orders/get/${jsonCookie.id}`, {
    headers: {
      Authorization: "bearer " + jsonCookie?.token,
    },
  });

  return {
    props: {
      orders: data,
    },
  };
}
