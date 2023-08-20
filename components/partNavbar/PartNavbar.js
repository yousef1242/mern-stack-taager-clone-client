import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import classes from "../../styles/partNavbar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import request from "@/lib/request";

const PartNavbar = ({egLink, saLink, aeLink}) => {
  const [categories, setCategories] = useState([]);
  const { country } = useRouter().query;
  useEffect(() => {
    const getCategories = async () => {
      const { data } = await request.get("/api/categories");
      setCategories(data);
    };
    getCategories();
  }, []);
  return (
    <Navbar className={classes.partNavbar}>
      <Container>
        <Dropdown className={classes.dropDown}>
          <Dropdown.Toggle
            className={classes.dropDownToogle}
            style={{
              background: "var(--green-color)",
              color: "#fff",
              border: "0",
              fontSize: "18px",
              direction: "rtl",
              borderRadius: "0",
            }}
          >
            جميع الفئات
          </Dropdown.Toggle>

          <Dropdown.Menu style={{right:"0px"}}>
            {categories?.map((cat) => (
              <Link
                className={classes.partNavLinks}
                key={cat?._id}
                href={`/${country}/products/category/${cat?.title}`}
              >
                {cat?.title}
              </Link>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Navbar.Collapse id="basic-navbar-nav">
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
                شحن الي{" "}
                {country === "eg" ? (
                  <>
                    <img
                      className="ms-2"
                      src="https://taager.com/assets/img/countries-dropdown-icons/eg.svg"
                      alt=""
                    />
                    مصر
                  </>
                ) : country === "sa" ? (
                  <>
                  <img
                    className="ms-2"
                    src="https://taager.com/assets/img/countries-dropdown-icons/sa.svg"
                    alt=""
                  />
                    السعودية
                  </>
                ) : country === "ae" ? (
                  <>
                  <img
                    className="ms-2"
                    src="https://taager.com/assets/img/countries-dropdown-icons/ae.svg"
                    alt=""
                  />
                    امارات
                  </>
                ) : (
                  ""
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Link className={classes.partNavLinks} href={egLink}>
                  <img
                    className="ms-2"
                    src="https://taager.com/assets/img/countries-dropdown-icons/eg.svg"
                    alt=""
                  />
                  مصر{" "}
                </Link>
                <Link className={classes.partNavLinks} href={saLink}>
                  <img
                    className="ms-2"
                    src="https://taager.com/assets/img/countries-dropdown-icons/sa.svg"
                    alt=""
                  />
                  السعودية
                </Link>
                <Link className={classes.partNavLinks} href={aeLink}>
                  <img
                    className="ms-2"
                    src="https://taager.com/assets/img/countries-dropdown-icons/ae.svg"
                    alt=""
                  />
                  امارات
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PartNavbar;
