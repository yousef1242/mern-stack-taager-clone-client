import MainNavbar from "@/components/mainNavbar/MainNavbar";
import Head from "next/head";
import classes from "../../../../styles/categories.module.css";
import PartNavbar from "@/components/partNavbar/PartNavbar";
import { useRouter } from "next/router";
import request from "@/lib/request";
import ProductsItem from "@/components/productItem/ProductsItem";

const Category = ({ products }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Taager</title>
        <meta name="description" content="biggest marketing website" />
      </Head>
      <MainNavbar />
      <PartNavbar
        egLink={`/eg/products/category/${router.query.category}`}
        saLink={`/sa/products/category/${router.query.category}`}
        aeLink={`/ae/products/category/${router.query.category}`}
      />
      <main className={classes.categoryPage}>
        <div className="container">
          <h3 className="mb-5">{router.query.category}</h3>
          {products.length > 0 ? (
            <ProductsItem products={products} />
          ) : (
            <h3 className="text-center fw-bold mt-5">
              {router.query.category} No Products for
            </h3>
          )}
        </div>
      </main>
    </>
  );
};

export default Category;

export async function getServerSideProps(context) {
  const { category, country } = context.query;
  const { data } = await request.get(
    `/api/products/cat/category?category=${category}&country=${country}`
  );
  return {
    props: {
      products: data,
    },
  };
}
