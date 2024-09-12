import { Flex } from "antd";
import "./auth.css";
import { Outlet } from "react-router-dom";
import LanguageDropdown from "../components/user/languageDropdown";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import takamol from "../assets/c12e3d6a54a40c5ccd1007ba89d99363.png";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import logo from "@/assets/logo.png";

export default function AuthLayout({ ...rest }) {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });
  const { isSamlLoading } = useSelector((state) => state.loading);
  useEffect(() => {}, [isSamlLoading]);

  return isSamlLoading ? (
    <Loading />
  ) : (
    <Flex
      style={{
        position: "relative",
      }}
      className="h-full"
    >
      <LanguageDropdown id="auth-button" />
      <Flex
        align="center"
        justify="space-between"
        className="w-full md:w-1/2"
        vertical
      >
        <Flex
          align="center"
          justify="center"
          className="w-full h-full"
          vertical
        >
          <div className="w-full">
            {/* h-2/3 */}
            <div className=" w-full lg:px-20 lg:block flex justify-center">
              <Outlet />
            </div>
          </div>
        </Flex>
        <div
          style={{
            color: "#828282",
            position: "relative",
          }}
          className="my-3"
        >
          version 1.0.0
        </div>
      </Flex>
      {/* {import.meta.env.VITE_VERSION} */}
      <div
        id="auth-right"
        className="h-screen"
        style={{
          display: isMobile && "none",
        }}
      >
        <div className="flex items-center justify-center h-full">
          <img className="w-96" src={logo}></img>
        </div>
      </div>
    </Flex>
  );
}
