import Link from "next/link";
import classes from "../../styles/sidebarProfile.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBox, faUser, faWallet } from "@fortawesome/free-solid-svg-icons";

const SidebarProfile = () => {
  const { country } = useRouter().query;
  return (
    <>
      <div className={classes.SidebarProfile}>
        <Link className={`${classes.navLinks}`} href={`/${country}/profile`}>
          <FontAwesomeIcon icon={faUser} /> حسابي
        </Link>
        <Link className={`${classes.navLinks}`} href={`/${country}/wallet`}>
          <FontAwesomeIcon icon={faWallet} /> محفظتي
        </Link>
        <Link className={`${classes.navLinks}`} href={`/${country}/orders`}>
          <FontAwesomeIcon icon={faBox} /> طلباتي
        </Link>
        <Link
          onClick={() => {
            dispatch(setAuth(null));
            Cookies.remove("setUserInfoAfterLogin");
          }}
          className={`${classes.navLinks}`}
          href={"/login"}
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} /> تسجيل خروج
        </Link>
      </div>
    </>
  );
};

export default SidebarProfile;
