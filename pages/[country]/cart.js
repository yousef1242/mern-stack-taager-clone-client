import * as cookie from "cookie";
import MainNavbar from "@/components/mainNavbar/MainNavbar";
import classes from "../../styles/cart.module.css";
import PartNavbar from "@/components/partNavbar/PartNavbar";
import Head from "next/head";
import request from "@/lib/request";
import CartItem from "@/components/cartItem/CartItem";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import OrderModel from "@/components/orderModel/OrderModel";
import { setCart } from "@/redux/cartSlice";

const Cart = ({ cart }) => {
  const { country } = useRouter().query;
  const [cartItems, setCartItems] = useState(cart);
  const { auth } = useSelector((state) => state.auth);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceProfirt, setTotalProfit] = useState(0);
  const [orderModalShow, setOrderModalShow] = useState(false);
  const dispatch = useDispatch();

  const deleteAllCartFunction = async () => {
    try {
      const { data } = await request.delete(
        `/api/cart/delete?country=${country}`,
        {
          headers: {
            Authorization: "bearer " + auth?.token,
          },
        }
      );
      toast.success(data.message);
      setCartItems([]);
      dispatch(setCart([]));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  useEffect(() => {
    const totalPrice = cartItems?.reduce(
      (sum, item) => sum + item?.productId?.price * item?.quantaty,
      0
    );
    setTotalPrice(totalPrice);
  }, [cartItems]);
  useEffect(() => {
    const totalprofit = cartItems?.reduce(
      (sum, item) =>
        sum + (item?.productId?.price * (20 / 100)).toFixed(0) * item?.quantaty,
      0
    );
    setTotalProfit(totalprofit);
  }, [cartItems]);
  return (
    <>
      <Head>
        <title>Taager</title>
        <meta name="description" content="biggest marketing website" />
      </Head>
      <MainNavbar />
      <PartNavbar egLink={`/eg/cart`} saLink={`/sa/cart`} aeLink={`/ae/cart`} />
      <main className={classes.cartPage}>
        <div className="container">
          {cartItems?.length > 0 ? (
            <div className="row m-0">
              <div className="col-12 col-lg-8 mb-lg-0 mb-3">
                <div className="mb-5 d-flex justify-content-between">
                  <h2 className="fw-bold">العربة ({cartItems?.length} منتج)</h2>
                  <button
                    onClick={deleteAllCartFunction}
                    style={{
                      background: "var(--green-color)",
                      border: "0",
                      padding: "5px 10px",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                    className="text-start text-white"
                  >
                    حذف الكل
                  </button>
                </div>
                <CartItem setCartItems={setCartItems} cartItems={cartItems} />
              </div>
              <div className="col-12 col-lg-4">
                <div className="card">
                  <div
                    className="card-header text-white text-center fw-bold fs-4 border-0"
                    style={{ background: "var(--green-color)" }}
                  >
                    تفاصيل الطلب في العربة
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span>عدد المنتجات المحددة</span>
                      <span>{cartItems?.length}</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span>سعر المنتجات</span>
                      <span className="fw-bold">
                        {totalPrice}{" "}
                        {country === "eg"
                          ? "ج.م"
                          : country === "sa"
                          ? "ر.س"
                          : "د.ا"}
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span>صافي الربح</span>
                      <span className="fw-bold">
                        {totalPriceProfirt}{" "}
                        {country === "eg"
                          ? "ج.م"
                          : country === "sa"
                          ? "ر.س"
                          : "د.ا"}
                      </span>
                    </div>
                    <button
                      onClick={() => setOrderModalShow(true)}
                      className={classes.continueOrder}
                    >
                      اكمل الطلب
                    </button>
                    <OrderModel
                      totalPrice={totalPrice}
                      totalPriceProfirt={totalPriceProfirt}
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                      show={orderModalShow}
                      onHide={() => setOrderModalShow(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <section className={classes.emptyCartSection}>
              <h2 className="fw-bold mb-4">العربة فارغة</h2>
              <Link
                href={`/${country}/products`}
                className={classes.emptyCartLink}
              >
                تصفح المنتجات
              </Link>
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default Cart;

export async function getServerSideProps(context) {
  const { country } = context.query;
  const parsedCookies = cookie.parse(context.req.headers.cookie);
  const jsonCookie = JSON.parse(parsedCookies.setUserInfoAfterLogin);
  const { data } = await request.get(`/api/cart/get?country=${country}`, {
    headers: {
      Authorization: "bearer " + jsonCookie?.token,
    },
  });
  return {
    props: {
      cart: data,
    },
  };
}
