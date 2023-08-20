import MainNavbar from "@/components/mainNavbar/MainNavbar";
import PartNavbar from "@/components/partNavbar/PartNavbar";
import classes from "../../../../styles/singleProduct.module.css";
import request from "@/lib/request";
import Head from "next/head";
import { useRouter } from "next/router";
import { Carousel } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ProductsItem from "@/components/productItem/ProductsItem";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart } from "@/redux/cartSlice";

const SingleProduct = ({ product, relatedProducts }) => {
  const [sizeCheck, setSizeCheck] = useState("");
  const [quantaty, setQuantaty] = useState(1);
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setSizeCheck(product?.sizes?.slice(0, 1)[0]);
  }, [product]);

  const router = useRouter().query;

  const handleDownloadImagesProduct = () => {
    product?.images?.forEach((image, index) => {
      const fileName = `product_image_${index + 1}.jpg`;
      fetch(image)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const a = document.createElement("a");
          a.href = url;
          a.download = fileName;
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("Error downloading the file:", error);
        });
    });
  };

  const addToCartFunction = async () => {
    try {
      const { data } = await request.post(
        "/api/cart/add",
        {
          productId: product?._id,
          quantaty: quantaty,
          country: router.country,
          size: sizeCheck,
        },
        {
          headers: {
            Authorization: "beaer " + auth?.token,
          },
        }
      );
      toast.success(data.message);
      dispatch(addToCart(product));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>Taager</title>
        <meta name="description" content="biggest marketing website" />
      </Head>
      <MainNavbar />
      <PartNavbar
        egLink={`/eg/products/details/${router.productId}`}
        saLink={`/sa/products/details/${router.productId}`}
        aeLink={`/ae/products/details/${router.productId}`}
      />

      {product?.country === router.country ? (
        <main className={classes.singleProductPage}>
          <div className="container">
            <section className="top-section mb-5">
              <div className="row m-0">
                <div className="col-12 col-md-4 mb-3">
                  <div className="card p-2">
                    <Carousel data-bs-touch="false">
                      {product?.images?.map((image, index) => (
                        <Carousel.Item key={index + 1}>
                          <img
                            className={classes.carouselImage}
                            src={image}
                            alt=""
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                  <button
                    onClick={handleDownloadImagesProduct}
                    className={classes.downloadImagesProduct}
                  >
                    تحميل صور المنتج علي جهازك
                  </button>
                </div>
                <div className="col-12 col-md-8">
                  <h4 className="mb-5 text-black fw-bold">{product?.name}</h4>
                  <div className="price-div mb-4 d-flex align-items-center justify-content-between justify-content-md-start">
                    <div className="child">
                      <h5 className="mb-3 d-block">سعر البيع</h5>
                      <h5 className="fw-bold">
                        {product.price} {product.currency}
                      </h5>
                    </div>
                    <div className="child me-5">
                      <h5 className="mb-3 d-block">ربح لك</h5>
                      <h5 className="fw-bold" style={{ color: "#e39700" }}>
                        {(product?.price * (20 / 100)).toFixed(0)}{" "}
                        {product?.currency}
                      </h5>
                    </div>
                  </div>
                  <div className="sizes-div mb-4 d-flex align-items-center gap-2">
                    {product?.sizes?.map((size) => (
                      <button
                        onClick={() => setSizeCheck(size)}
                        className={`${classes.sizeButton} ${
                          size === sizeCheck ? classes.checkButtonSize : ""
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <div className={`mb-4 ${classes.quantatyProduct}`}>
                    <button
                      className={`${classes.quantatyControllBuuton} ms-3`}
                      onClick={() => setQuantaty(quantaty + 1)}
                    >
                      +
                    </button>
                    <input
                      className={classes.quantatyControllInput}
                      minLength={1}
                      value={quantaty}
                    />
                    <button
                      disabled={quantaty === 1}
                      className={`${classes.quantatyControllBuuton} me-3 ${
                        quantaty === 1 ? classes.disabledBtn : ""
                      }`}
                      onClick={() => setQuantaty(quantaty - 1)}
                    >
                      -
                    </button>
                  </div>
                  <button
                    onClick={addToCartFunction}
                    className={`${classes.addToCartBtn}`}
                  >
                    {" "}
                    اضف الي العربة{" "}
                    <FontAwesomeIcon className="me-2" icon={faCartShopping} />
                  </button>
                </div>
              </div>
            </section>
            <section className="mb-5">
              <h4 className="mb-4">تفاصيل المنتج</h4>
              <div
                dangerouslySetInnerHTML={{ __html: product?.description }}
              ></div>
            </section>
            <section>
              <h4 className="mb-4">منتجات ذات صلة</h4>
              {relatedProducts?.filter(
                (relateProduct) =>
                  relateProduct?.category === product?.category &&
                  relateProduct?._id !== product?._id
              ).length > 0 ? (
                <ProductsItem
                  products={relatedProducts
                    ?.filter(
                      (relateProduct) =>
                        relateProduct?.category === product?.category &&
                        relateProduct?._id !== product?._id
                    )
                    .slice(0, 5)}
                />
              ) : (
                <h5>لا يوجد منتجات ذات صلة</h5>
              )}
            </section>
          </div>
        </main>
      ) : (
        <main
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className={classes.singleProductPage}
        >
          <h3>هذا المنتج غير متوفر</h3>
        </main>
      )}
    </>
  );
};

export default SingleProduct;

export async function getServerSideProps(context) {
  const { productId } = context.params;
  const { country } = context.query;
  const { data } = await request.get(`/api/products/single/${productId}`);
  const res = await request.get(`/api/products/${country}`);
  return {
    props: {
      product: data,
      relatedProducts: res.data,
    },
  };
}
