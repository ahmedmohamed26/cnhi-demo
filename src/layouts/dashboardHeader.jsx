import { Flex, Divider, Dropdown } from "antd";

import CustomTypography from "../components/Typography";
import HeaderButton from "../components/HeaderButton";
import NotificationsDropdown from "../components/user/notificationsDropdown";
import LanguageDropdown from "../components/user/languageDropdown";
import UserDropdown from "../components/user/userDropdown";
import NavigationBar from "../components/NavigationBar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

//images
import logo from "../assets/logo.png";
import header from "../assets/header.png";
//cookie
import { useSelector, useDispatch } from "react-redux";
import MobileMenu from "../components/MobileMenu";
import VersionDropdown from "../components/VersionDropdown";
import dayjs from "dayjs";
import Basket from "../components/user/basket";
export default function DashboardHeader() {
  const { t } = useTranslation();
  let { user } = useSelector((state) => state.auth);
  const isMobile = useMediaQuery({
    query: "(max-width:600px)",
  });
  const dispatch = useDispatch();
  return (
    <Flex
      style={{
        width: "100%",
        backgroundImage: `url(${header})`,
        backgroundSize: "cover",
        paddingBottom: "5vh",
      }}
      vertical
      id="container"
    >
      <Flex
        style={{
          width: "90%",
          margin: "3vh auto",
        }}
        vertical
        gap={40}
      >
        <Flex justify="space-between">
          <div id="logo">
            <Link to={"/"}>
              <img className="w-48" src={logo}></img>
            </Link>
          </div>
          <Flex
            gap={"large"}
            align="center"
            style={{
              backgroundCOl: "#F2F2F2",
            }}
          >
            <Basket />

            <NotificationsDropdown />
            <Divider
              style={{
                borderInlineStart: "1px solid #F2F2F21A",
                height: "20px",
              }}
              type="vertical"
            />
            {/* <HeaderButton
              onClick={(e) => {
                dispatch(toggleTheme());
              }}
              id="header-button"
              icon={
                <svg
                  width="22"
                  height="21"
                  viewBox="0 0 30 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.2061 13.9759L23.206 13.9747C23.2048 9.65239 19.5355 6.09488 15.001 6.09473L23.2061 13.9759ZM23.2061 13.9759C23.2087 15.0146 22.9989 16.044 22.5884 17.0052C22.1778 17.9665 21.5743 18.8412 20.8116 19.5787C20.0488 20.3162 19.1418 20.9019 18.1422 21.3013C17.1426 21.7007 16.0705 21.9059 14.9878 21.9045L14.9866 21.9045M23.2061 13.9759L14.9866 21.9045M14.9866 21.9045C10.4695 21.9094 6.79947 18.3392 6.79883 14.0081L6.79883 14.0079M14.9866 21.9045L6.79883 14.0079M6.79883 14.0079C6.79781 11.9161 7.65697 9.90594 9.19332 8.42052M6.79883 14.0079L9.19332 8.42052M8.74347 14.6147L8.71125 14.6209L8.70742 14.0192C8.68577 10.6224 11.5177 7.91446 15.0122 7.90381L15.0131 7.9038C16.6702 7.90191 18.2637 8.5347 19.4433 9.66856C20.6234 10.803 21.2929 12.347 21.2988 13.9629L21.2988 13.9633C21.3085 17.3446 18.522 20.0686 15.0845 20.0921M8.74347 14.6147C9.06881 17.7521 11.7767 20.1154 15.0845 20.0921M8.74347 14.6147L9.23658 14.5196L8.74347 14.6147ZM15.0845 20.0921L15.0811 19.5921L15.0847 20.0921C15.0846 20.0921 15.0846 20.0921 15.0845 20.0921ZM9.19332 8.42052C10.7302 6.9346 12.8188 6.09612 15.0007 6.09473L9.19332 8.42052Z"
                    stroke="white"
                  />
                  <path
                    d="M23.9164 6.73211L23.9164 6.73208L23.9116 6.73638C23.7347 6.89486 23.4973 6.98294 23.2495 6.97714C23.0018 6.97134 22.7696 6.8723 22.6013 6.70624L22.6013 6.70623L22.5978 6.70278C22.4253 6.53587 22.3312 6.31373 22.3301 6.08561C22.329 5.8575 22.4209 5.63462 22.5916 5.46625L22.5917 5.46632L22.5989 5.45891C22.9625 5.08526 23.3436 4.72357 23.7336 4.35547L23.7336 4.35548L23.7358 4.35331C23.8172 4.27557 23.9148 4.21349 24.0234 4.17162C24.1315 4.12994 24.2478 4.10936 24.365 4.11148C24.8127 4.12404 25.0843 4.29695 25.2448 4.63902C25.3367 4.8349 25.3581 5.00087 25.3375 5.14066C25.3171 5.27925 25.2502 5.42826 25.1058 5.58351C24.7297 5.98542 24.3327 6.36878 23.9164 6.73211Z"
                    fill="white"
                    stroke="white"
                  />
                  <path
                    d="M15.0099 3.70177L15.007 3.7018C14.7593 3.70431 14.5232 3.61354 14.3482 3.45345C14.1741 3.29428 14.0742 3.0798 14.0635 2.85648C14.0442 2.34304 14.0436 1.83047 14.0635 1.32521C14.0816 0.881933 14.4618 0.506006 14.9921 0.503281L14.9921 0.503353L15.0006 0.503166C15.2469 0.497727 15.4825 0.586245 15.6572 0.744773C15.8313 0.902782 15.9305 1.11682 15.9395 1.33927L15.9394 1.33927L15.94 1.34817C15.9493 1.50852 15.9472 1.66172 15.9449 1.83413C15.9437 1.91746 15.9425 2.00528 15.9425 2.10056C15.9425 2.20483 15.944 2.30012 15.9453 2.39085C15.9478 2.55487 15.9501 2.70394 15.9432 2.8641C15.9295 3.08392 15.8298 3.29428 15.6586 3.45125C15.4861 3.60946 15.2543 3.7007 15.0099 3.70177Z"
                    fill="white"
                    stroke="white"
                  />
                  <path
                    d="M2.68759 13.1082H2.6888C2.78973 13.1082 2.88304 13.107 2.97244 13.1059C3.13674 13.1037 3.28784 13.1018 3.44876 13.1078C3.69543 13.1191 3.92468 13.2217 4.09002 13.3893C4.25517 13.5566 4.34402 13.7756 4.34347 13.9996C4.34292 14.2236 4.25299 14.4422 4.08698 14.6088C3.9207 14.7758 3.69077 14.8773 3.44393 14.8874C2.92596 14.9053 2.40752 14.9054 1.88861 14.8875C1.6434 14.8746 1.416 14.7716 1.25199 14.6045C1.08776 14.4372 0.999455 14.2188 1 13.9954C1.00055 13.772 1.08993 13.554 1.25502 13.3874C1.42009 13.2208 1.6484 13.1188 1.89402 13.1072C2.06557 13.1014 2.23074 13.1035 2.40868 13.1057C2.49766 13.1068 2.58983 13.108 2.68759 13.1082Z"
                    fill="white"
                    stroke="white"
                  />
                  <path
                    d="M26.5585 14.8932L26.5487 14.8928L26.5389 14.8928C26.2842 14.8938 26.043 14.7969 25.8673 14.6286C25.6922 14.4609 25.5967 14.2366 25.5957 14.0063C25.5948 13.776 25.6884 13.5511 25.862 13.3821C26.0362 13.2125 26.2766 13.1137 26.5312 13.1127L26.5393 13.1127L26.5473 13.1124C27.0806 13.0931 27.6131 13.0924 28.1388 13.1123C28.636 13.1317 29.0015 13.5201 29.0032 13.996L29.0031 13.996L29.0033 14.0042C29.0077 14.2231 28.9246 14.4383 28.7662 14.6044C28.6075 14.7708 28.385 14.8748 28.1437 14.8897C27.9736 14.8992 27.8169 14.8962 27.6415 14.8928C27.5434 14.8909 27.4395 14.8889 27.3242 14.8889H27.0953L27.0905 14.8944C27.0731 14.8946 27.0557 14.8948 27.0386 14.895C26.8732 14.897 26.7204 14.8989 26.5585 14.8932Z"
                    fill="white"
                    stroke="white"
                  />
                  <path
                    d="M14.985 27.5002L14.985 27.5002C15.5287 27.5071 15.917 27.1281 15.9355 26.674C15.956 26.1645 15.956 25.6532 15.9355 25.1444C15.9243 24.9221 15.8251 24.7087 15.6528 24.5496C15.4794 24.3895 15.2456 24.2973 14.9991 24.2969C14.7526 24.2964 14.5184 24.3877 14.3444 24.5472C14.1714 24.7058 14.0713 24.9189 14.0592 25.1411C14.0523 25.2995 14.0545 25.448 14.057 25.6121C14.0584 25.7028 14.0598 25.7983 14.0598 25.9029C14.0598 26.0068 14.0584 26.1019 14.057 26.1923C14.0545 26.357 14.0522 26.5065 14.0593 26.6667L14.985 27.5002ZM14.985 27.5002L14.9783 27.5002M14.985 27.5002L14.9783 27.5002M14.9783 27.5002C14.736 27.5004 14.506 27.41 14.3358 27.2528M14.9783 27.5002L14.3358 27.2528M14.3358 27.2528C14.1662 27.096 14.0692 26.8856 14.0593 26.6669L14.3358 27.2528Z"
                    fill="white"
                    stroke="white"
                  />
                  <path
                    d="M7.49909 5.48691L7.49905 5.48695L7.50417 5.49233C7.66595 5.6625 7.74969 5.88332 7.74296 6.10726C7.73623 6.33126 7.63927 6.54764 7.46687 6.70907L7.46685 6.70905L7.46269 6.71303C7.29449 6.87422 7.06522 6.96961 6.82141 6.97466C6.57758 6.9797 6.34388 6.89386 6.16821 6.73937L6.16821 6.73936L6.16588 6.73733C5.80309 6.42224 5.4591 6.08024 5.11171 5.72511L5.11158 5.72498C4.97265 5.58305 4.89684 5.39759 4.89275 5.09617C4.93474 4.74752 5.10177 4.49432 5.4602 4.34247C5.84098 4.18115 6.16387 4.23204 6.46046 4.48436C6.82643 4.79905 7.17321 5.1338 7.49909 5.48691Z"
                    fill="white"
                    stroke="white"
                  />
                  <path
                    d="M5.64139 23.8081L5.63697 23.8081C5.38999 23.8063 5.04526 23.6123 4.8919 23.2518L4.89194 23.2518L4.88937 23.246C4.81796 23.0839 4.80008 22.9057 4.83723 22.7346C4.87443 22.5634 4.96567 22.4046 5.10184 22.2808L5.1019 22.2809L5.1087 22.2745C5.42815 21.9731 5.75001 21.6804 6.08166 21.4028L6.0817 21.4029L6.08749 21.3979C6.27018 21.2402 6.51259 21.155 6.76364 21.1648C7.01465 21.1747 7.24831 21.2786 7.41626 21.4492C7.58368 21.6193 7.67291 21.842 7.67055 22.0695C7.6682 22.297 7.57436 22.5181 7.40323 22.6852L7.40316 22.6851L7.39615 22.6923C7.14389 22.9486 6.88171 23.1963 6.6133 23.45C6.58341 23.4782 6.55344 23.5065 6.5234 23.535C6.34104 23.7074 6.11645 23.8157 5.64139 23.8081Z"
                    fill="white"
                    stroke="white"
                  />
                  <path
                    d="M24.3766 23.8116C24.6675 23.8014 24.9277 23.6845 25.0762 23.3788L25.0773 23.3765L25.0773 23.3765C25.1732 23.1816 25.1994 23.0155 25.1832 22.8746C25.1671 22.7354 25.1055 22.5848 24.9663 22.425L24.9661 22.4247C24.7813 22.2123 24.5815 22.0237 24.3622 21.8168C24.2772 21.7366 24.1893 21.6537 24.0983 21.5655M24.3766 23.8116L24.0979 21.5651C24.098 21.5653 24.0981 21.5654 24.0983 21.5655M24.3766 23.8116C23.9297 23.8058 23.7061 23.6919 23.5236 23.5034L23.5236 23.5034L23.5216 23.5014C23.2753 23.2498 23.0313 22.9952 22.7863 22.7389C22.4851 22.4229 22.4936 21.9135 22.8658 21.5765C23.2474 21.231 23.7685 21.2477 24.0983 21.5655M24.3766 23.8116L24.0983 21.5655"
                    fill="white"
                    stroke="white"
                  />
                  <path
                    d="M13.5544 13.9861C13.5544 13.0901 13.5503 12.1935 13.5544 11.2975C13.5599 10.3449 14.1763 9.77648 15.1647 9.7995C17.3444 9.85016 19.2142 11.6014 19.345 13.7184C19.4813 15.8893 17.8826 17.8314 15.7096 18.1406C15.4754 18.1774 15.2386 18.197 15.0012 18.1991C14.1981 18.1952 13.5708 17.6162 13.5599 16.8393C13.5422 15.8887 13.5558 14.9374 13.5558 13.9861H13.5544Z"
                    fill="#F7C601"
                  />
                </svg>
              }
            /> */}

            <LanguageDropdown />
            {/* {user?.type != 6 && <VersionDropdown />} */}
            {/* {} */}
            {user?.type == 6 ? "" : user?.type !== 1 ? "" : <VersionDropdown />}
            {/*<VersionDropdown />*/}
            <div
              className="flex gap-2 items-center"
              style={{
                display: isMobile ? "none" : "flex",
              }}
            >
              <Divider
                style={{
                  borderInlineStart: "1px solid #F2F2F21A",
                  height: "20px",
                }}
                type="vertical"
              />
              <UserDropdown />
            </div>
          </Flex>
        </Flex>
        <Flex vertical wrap="wrap">
          <div id="title" className="mb-4">
            <CustomTypography
              fontSize={isMobile ? 20 : 40}
              style={{
                color: "white",
              }}
              className="text-3xl"
            >
              {dayjs().hour() < 12 ? t("welcomeDay") : t("welcomeNight")}{" "}
              {user?.fullName?.includes("@")
                ? user?.fullName?.split("@")[0]
                : user?.fullName?.split(" ")[0]}
            </CustomTypography>
            <CustomTypography
              fontSize={24}
              style={{
                color: "#FFFFFFB5",
              }}
            >
              {t("happyWishing")}
            </CustomTypography>
          </div>
          {!isMobile && <NavigationBar />}
          {isMobile && <MobileMenu />}
        </Flex>
      </Flex>
    </Flex>
  );
}
