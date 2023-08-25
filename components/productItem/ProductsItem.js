import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "../../styles/productsItem.module.css";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import request from "@/lib/request";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart } from "@/redux/cartSlice";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
const ProductsItem = ({ products }) => {
  const router = useRouter().query;
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const addToCartFunction = async (product, size) => {
    const { data } = await request.post(
      "/api/cart/add",
      {
        productId: product?._id,
        quantaty: 1,
        country: router.country,
        size: size,
      },
      {
        headers: {
          Authorization: "beaer " + auth?.token,
        },
      }
    );
    toast.success(data.message);
    dispatch(addToCart(product));
  };
  return (
    <>
      <Container>
        <Slider className={classes.slider} {...settings}>
          {products?.map((product) => (
            <div key={product?._id}>
              <div className={`${classes.card} card ms-2 me-2`}>
                <Link
                  href={`/${router.country}/products/details/${product?._id}`}
                  className={`${classes.imgDiv} card-image`}
                >
                  <img src={product?.images?.slice(0, 1)} alt="" />
                </Link>
                <div className="card-body">
                  <Link
                    style={{ height: "47px" }}
                    href={`/${router.country}/products/details/${product?._id}`}
                    className="fw-bold text-decoration-none text-black d-block mb-4"
                  >
                    {product?.name}
                  </Link>
                  <div className="parent d-flex justify-content-between align-items-center">
                    <div className="child text-start">
                      <h6 className="d-block mb-2">سعر البيع</h6>
                      <h6 className="fw-bold">
                        {product?.price} {product?.currency}
                      </h6>
                    </div>
                    <div className="child text-start">
                      <h6 className="d-block mb-2">ربح لك</h6>
                      <h6 className="fw-bold" style={{ color: "#e39700" }}>
                        {(product?.price * (20 / 100)).toFixed(0)}{" "}
                        {product?.currency}
                      </h6>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      addToCartFunction(product, product?.sizes?.slice(0, 1)[0])
                    }
                    className={classes.addToCartBtn}
                  >
                    {" "}
                    اضف الي العربة{" "}
                    <FontAwesomeIcon className="me-2" icon={faCartShopping} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </>
  );
};

export default ProductsItem;
