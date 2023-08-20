import { Table } from "react-bootstrap";
import classes from "../../styles/cartItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import request from "@/lib/request";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { removeFromCart, setCart } from "@/redux/cartSlice";

const CartItem = ({ cartItems, setCartItems }) => {
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const numberOptions = [];

  for (let i = 1; i <= 50; i++) {
    numberOptions.push(i);
  }

  const deleteproductFromCartFunction = async (productId) => {
    try {
      const newCartItems = cartItems?.filter((cart) => cart?._id !== productId);
      setCartItems(newCartItems);
      const newCartSlice = cart?.filter((cart) => cart?._id !== productId);
      dispatch(setCart(newCartSlice));
      const { data } = await request.delete(`/api/cart/delete/${productId}`, {
        headers: {
          Authorization: "bearer " + auth?.token,
        },
      });
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="card">
        <Table className="text-center">
          <thead>
            <tr>
              <th>المنتج</th>
              <th>السعر</th>
              <th>الكمية</th>
              <th>الربح</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((cart) => (
              <>
                <tr
                  style={{ borderBottom: "0 #fff" }}
                  className="w-100"
                  key={cart?._id}
                >
                  <td width={"250px"} className="text-end align-items-center">
                    <FontAwesomeIcon
                      onClick={() => deleteproductFromCartFunction(cart?._id)}
                      className="fs-5 ms-3"
                      cursor={"pointer"}
                      color="var(--green-color)"
                      icon={faXmark}
                    />
                    <img
                      className={classes.cartImage}
                      src={cart?.productId?.images?.slice(0, 1)}
                      alt=""
                    />
                    <span className="fs-5 me-3">
                      {cart?.productId?.name?.slice(0, 10)}
                    </span>
                    {cart?.size ? (
                      <span
                        style={{ color: "var(--green-color)" }}
                        className="mt-1 d-block"
                      >
                        المقاس : {cart?.size}
                      </span>
                    ) : ""}
                  </td>
                  <td>{cart.productId?.price}</td>
                  <td>
                    <select
                      onChange={async (e) => {
                        try {
                          const { data } = await request.put(
                            `/api/cart/update/${cart?._id}`,
                            {
                              quantaty: e.target.value,
                            },
                            {
                              headers: {
                                Authorization: "bearer " + auth?.token,
                              },
                            }
                          );
                          window.location.reload();
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                      defaultValue={cart?.quantaty}
                    >
                      {numberOptions.map((num, index) => (
                        <option key={index}>{num}</option>
                      ))}
                    </select>
                  </td>
                  <td>{(cart.productId?.price * (20 / 100)).toFixed(0)}</td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default CartItem;
