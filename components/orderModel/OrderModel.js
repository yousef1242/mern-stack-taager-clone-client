import Modal from "react-bootstrap/Modal";
import classes from "../../styles/orderModel.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import request from "@/lib/request";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "@/redux/cartSlice";

function OrderModel(props) {
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [goverment, setGoverment] = useState("");
  const [address, setAdress] = useState("");
  const [facebookPageName, setFacebookPageName] = useState("");
  const [facebookPageLink, setFacebookPageLink] = useState("");
  const [note, setNote] = useState("");
  const [productId, setProductId] = useState([]);
  const [quantaty, setQuantaty] = useState([]);
  const { country } = useRouter().query;
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const setProductsIds = () => {
    const productIds = props.cartItems?.map((cart) => cart.productId._id);
    setProductId(productIds);
  };

  const setProductsQuantanty = () => {
    const productQuantatys = props.cartItems?.map((cart) => cart.quantaty);
    setQuantaty(productQuantatys);
  };

  useEffect(() => {
    setAdress("");
    setPhoneNumber("");
    setGoverment("");
    setFullname("");
    setFacebookPageName("");
    setFacebookPageLink("");
    setNote("");
    setProductsIds();
    setProductsQuantanty();
  }, [country, props.cartItems]);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (
      fullname === "" ||
      phoneNumber === "" ||
      goverment === "" ||
      address === ""
    ) {
      return toast.error("املئ الحقول");
    }
    try {
      const { data } = await request.post(
        "/api/orders/create",
        {
          fullname: fullname,
          phoneNumber: phoneNumber,
          goverment: goverment,
          address: address,
          userPageNameOnFacebook: facebookPageLink,
          userPageLinkOnFacebook: facebookPageName,
          notes: note,
          productId: productId,
          quantaty: quantaty,
          totalPrice: props.totalPrice,
          totalProfit: props.totalPriceProfirt,
          orderTo: country,
        },
        {
          headers: {
            Authorization: "bearer " + auth?.token,
          },
        }
      );
      await request.delete(`/api/cart/delete?country=${country}`, {
        headers: {
          Authorization: "bearer " + auth?.token,
        },
      });
      toast.success(data.message);
      dispatch(setCart([]));
      props.setCartItems([]);
    } catch (error) {
      console.log(error);
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
      <Modal.Header className={classes.orderModelHeader} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">اكمل الطلب</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submitFormHandler}>
          <div>
            <h3 className="fw-bold mb-5">البيانات الشخصية</h3>
            <div className={classes.formGroup}>
              <label htmlFor="fullname">الإسم بالكامل</label>
              <input
                onChange={(e) => setFullname(e.target.value)}
                type="text"
                id="fullname"
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="numberPhone">رقم المحمول</label>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
                id="numberPhone"
              />
            </div>
          </div>
          <div>
            <h3 className="fw-bold mb-5">بيانات الشحن</h3>
            <div className={classes.formGroup}>
              <label htmlFor="goverment">المحافظة</label>
              {country === "eg" ? (
                <select onChange={(e) => setGoverment(e.target.value)}>
                  <option value="" disabled selected>
                    المحافظة
                  </option>
                  <option value="Cairo">القاهرة</option>
                  <option value="Alexandria">الإسكندرية</option>
                  <option value="Beheira">البحيرة</option>
                  <option value="Kafr El Sheikh">كفر الشيخ</option>
                  <option value="Dakahlia">الدقهلية</option>
                  <option value="Damietta">دمياط</option>
                  <option value="Sharqia">الشرقية</option>
                  <option value="Port Said">بورسعيد</option>
                  <option value="Ismailia">الإسماعيلية</option>
                  <option value="Suez">السويس</option>
                  <option value="Gharbia">الغربية</option>
                  <option value="Menofia">المنوفية</option>
                  <option value="Minya">المنيا</option>
                  <option value="Assiut">أسيوط</option>
                  <option value="Fayoum">الفيوم</option>
                  <option value="Beni Suef">بني سويف</option>
                  <option value="Sohag">سوهاج</option>
                  <option value="Qena">قنا</option>
                  <option value="Aswan">أسوان</option>
                  <option value="Luxor">الأقصر</option>
                  <option value="Red Sea">البحر الأحمر</option>
                  <option value="New Valley">الوادي الجديد</option>
                  <option value="Matrouh">مطروح</option>
                  <option value="North Sinai">شمال سيناء</option>
                  <option value="South Sinai">جنوب سيناء</option>
                </select>
              ) : country === "sa" ? (
                <select onChange={(e) => setGoverment(e.target.value)}>
                  <option value="" disabled selected>
                    المحافظة
                  </option>
                  <option value="Riyadh">الرياض</option>
                  <option value="Makkah">مكة المكرمة</option>
                  <option value="Madinah">المدينة المنورة</option>
                  <option value="Eastern Province">المنطقة الشرقية</option>
                  <option value="Asir">عسير</option>
                  <option value="Tabuk">تبوك</option>
                  <option value="Qassim">القصيم</option>
                  <option value="Hail">حائل</option>
                  <option value="Jazan">جازان</option>
                  <option value="Najran">نجران</option>
                  <option value="Al Baha">الباحة</option>
                  <option value="Al Jouf">الجوف</option>
                  <option value="Northern Borders">الحدود الشمالية</option>
                  <option value="Riyadh Province">محافظة الرياض</option>
                </select>
              ) : (
                <select onChange={(e) => setGoverment(e.target.value)}>
                  <option value="" disabled selected>
                    المحافظة
                  </option>
                  <option value="Abu Dhabi">أبوظبي</option>
                  <option value="Dubai">دبي</option>
                  <option value="Sharjah">الشارقة</option>
                  <option value="Ajman">عجمان</option>
                  <option value="Umm Al Quwain">أم القيوين</option>
                  <option value="Ras Al Khaimah">رأس الخيمة</option>
                  <option value="Fujairah">الفجيرة</option>
                  <option value="Ras Al Khaimah">رأس الخيمة</option>
                </select>
              )}
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="address">
                العنوان بالتفصيل{" "}
                <span style={{ color: "var(--green-color)" }}>
                  (المنطقة، اسم الشارع، رقم العقار، رقم الشقة)
                </span>
              </label>
              <input
                onChange={(e) => setAdress(e.target.value)}
                type="text"
                id="address"
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="facebookPageName">
                اسم صفحتك اللي بتبيع منها على الفيسبوك (اختياري)
              </label>
              <input
                onChange={(e) => setFacebookPageName(e.target.value)}
                type="text"
                id="facebookPageName"
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="facebookPageLink">لينك الصفحة (اختياري)</label>
              <input
                onChange={(e) => setFacebookPageLink(e.target.value)}
                type="text"
                id="facebookPageLink"
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="notes">ملاحظات (اختياري)</label>
              <textarea
                onChange={(e) => setNote(e.target.value)}
                id="notes"
                cols="30"
                rows="10"
                style={{ resize: "none" }}
              ></textarea>
            </div>
          </div>
          <button className={classes.orderModelBtn}>اكمل الطلب</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default OrderModel;
