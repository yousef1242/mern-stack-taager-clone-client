import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function UserNavbar() {
  return (
    <Navbar style={{ background: "white", boxShadow: "0 0 10px #efefef" }}>
      <Container>
        <span
          style={{
            color: "black",
            textDecoration: "none",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Taager.com
        </span>
      </Container>
    </Navbar>
  );
}

export default UserNavbar;
