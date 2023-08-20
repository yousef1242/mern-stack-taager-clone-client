import { Modal } from "react-bootstrap";
import classes from "../../styles/followOrder.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const FollowOrder = (props) => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className={classes.followOrderModelHeader} closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            تتبع طلبك
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between align-content-center">
            <div className="child">
              <div className="mb-5">تم استلام الطلب</div>
              {props.orderCancel ? (
                <div className="mb-5">تم الغاء الطلب</div>
              ) : (
                <>
                  <div className="mb-5">تم تأكيد الطلب</div>
                  <div className="mb-5">في انتظار شركة الشحن</div>
                  <div className="mb-5">التوصيل قيد التقدم</div>
                  <div className="mb-5">تم التوصيل</div>
                </>
              )}
            </div>
            <div className="child position-relative">
              {props.orderCancel ? (
                <div className="flex-column d-flex align-items-center">
                <div className={classes.lineStatusCancelOrder}></div>
                  <div
                    className={`${classes.statusDiv} mb-5`}
                    style={{ background: "var(--green-color)" }}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                  <div
                    className={`${classes.statusDiv} mb-5`}
                    style={{ background: "red" }}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                </div>
              ) : (
                <div className="flex-column d-flex align-items-center">
                  <div className={classes.lineStatusNotCancelOrder}></div>
                  <div
                    className={`${classes.statusDiv} ${classes.greenBg} mb-5`}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                  <div
                    className={`${classes.statusDiv} ${
                      props.orderStatus === "تم تأكيد الطلب" ||
                      props.orderStatus === "في انتظار شركة الشحن" ||
                      props.orderStatus === "التوصيل قيد التقدم" ||
                      props.orderStatus === "تم التوصيل"
                        ? classes.greenBg
                        : ""
                    } mb-5`}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                  <div
                    className={`${classes.statusDiv} ${
                      props.orderStatus === "في انتظار شركة الشحن" ||
                      props.orderStatus === "التوصيل قيد التقدم" ||
                      props.orderStatus === "تم التوصيل"
                        ? classes.greenBg
                        : ""
                    } mb-5`}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                  <div
                    className={`${classes.statusDiv} ${
                      props.orderStatus === "التوصيل قيد التقدم" ||
                      props.orderStatus === "تم التوصيل"
                        ? classes.greenBg
                        : ""
                    } mb-5`}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                  <div
                    className={`${classes.statusDiv} ${
                      props.orderStatus === "تم التوصيل" ? classes.greenBg : ""
                    } mb-5`}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FollowOrder;
