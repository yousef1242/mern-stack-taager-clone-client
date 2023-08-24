import MainNavbar from "@/components/mainNavbar/MainNavbar";
import Head from "next/head";
import classes from "../../../styles/Home.module.css";
import PartNavbar from "@/components/partNavbar/PartNavbar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import request from "@/lib/request";
import ProductsItem from "@/components/productItem/ProductsItem";

const Products = ({ products }) => {
  const router = useRouter();
  useEffect(() => {
    if (
      router.query.country !== "eg" &&
      router.query.country !== "sa" &&
      router.query.country !== "ae"
    ) {
      router.push("/eg/products");
    }
  }, [router.query.country]);

  return (
    <>
      <Head>
        <title>Taager</title>
        <meta name="description" content="biggest marketing website" />
      </Head>
      <MainNavbar />
      <PartNavbar
        egLink={"/eg/products"}
        saLink={"/sa/products"}
        aeLink={"/ae/products"}
      />
      <main className={classes.homePage}>
        <div className="container">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://media.taager.com/9db01c75-b8da-480e-9734-fbb8dbd1854b.jpeg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://media.taager.com/1998213a-6174-483a-a029-d2fdd18691f4.png"
                alt="Second slide"
              />
            </Carousel.Item>
          </Carousel>
          <div className="newest-products mt-5 mb-5">
            <h2 className="mb-4">وصل حديثا</h2>
            {products.length > 0 ? (
              <ProductsItem products={products?.slice(0, 5)} />
            ) : (
              <h3 className="text-center fw-bold mt-5">
                لا توجد منتجات ل {router.query.country}
              </h3>
            )}
          </div>
          {products?.length > 0 && products?.filter((product) => product.category === "الكترونات").length > 0 ?(
            <div className="newest-products mb-5">
              <h2 className="mb-4">الكترونيات</h2>
              <ProductsItem
                products={products
                  ?.filter((product) => product.category === "الكترونات")
                  .slice(0, 5)}
              />
            </div>
          ) : ""}
          {products?.length > 0 && products?.filter((product) => product.category === "ملابس").length > 0 ? (
            <div className="newest-products mb-5">
              <h2 className="mb-4">ملابس</h2>
              <ProductsItem
                products={products
                  ?.filter((product) => product.category === "ملابس")
                  .slice(0, 5)}
              />
            </div>
          ) : ""}
        </div>
      </main>
    </>
  );
};

export default Products;

export async function getServerSideProps(context) {
  const { country } = context.query;
  const { data } = await request.get(`/api/products/${country}`);
  return {
    props: {
      products: data,
    },
  };
}
