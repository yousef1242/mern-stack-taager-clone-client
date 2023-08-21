import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import classes from "../../styles/mainNavbar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBagShopping,
  faBox,
  faCartShopping,
  faStore,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { setAuth } from "@/redux/authSlice";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import request from "@/lib/request";
import { setCart } from "@/redux/cartSlice";

const MainNavbar = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const router = useRouter();

  // get cart length
  const getCartLength = async () => {
    const { data } = await request.get(`/api/cart/get?country=${router.query.country}`, {
      headers: {
        Authorization: "bearer " + auth?.token,
      },
    });
    dispatch(setCart(data));
  };
  useEffect(() => {
    getCartLength();
  }, [router.query.country]);

  return (
    <Navbar className={classes.navbar}>
      <Container>
        <Link className={classes.navbarBrand} href={`/${router.query.country}/products`}>
          Taager.com
        </Link>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className={classes.navbarCart} href={`/${router.query.country}/cart`}>
              <span>
                <FontAwesomeIcon icon={faBagShopping} />
              </span>
              <span className={classes.cartSpinner}>
                {cart?.length > 0 ? <Spinner animation="grow" /> : ""}
              </span>
            </Link>
          </Nav>
          <Nav className="me-auto">
            <Dropdown className={classes.dropDown}>
              <Dropdown.Toggle
                className={classes.dropDownToogle}
                style={{
                  background: "none",
                  color: "#0f1933",
                  border: "0",
                  fontSize: "24px",
                  direction: "rtl",
                }}
              >
                اهلا {auth?.username}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Link
                  className={`${classes.navLinks}`}
                  href={`/${router.query.country}/profile`}
                >
                  <FontAwesomeIcon icon={faUser} /> حسابي
                </Link>
                <Link
                  className={`${classes.navLinks}`}
                  href={`/${router.query.country}/wallet`}
                >
                  <FontAwesomeIcon icon={faWallet} /> محفظتي
                </Link>
                <Link
                  className={`${classes.navLinks}`}
                  href={`/${router.query.country}/orders`}
                >
                  <FontAwesomeIcon icon={faBox} /> طلباتي
                </Link>
                <Link
                  onClick={() => {
                    dispatch(setAuth(null));
                    Cookies.remove("setUserInfoAfterLogin");
                    router.push("/login")
                  }}
                  className={`${classes.navLinks}`}
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} /> تسجيل خروج
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default dynamic(() => Promise.resolve(MainNavbar), { ssr: false });
