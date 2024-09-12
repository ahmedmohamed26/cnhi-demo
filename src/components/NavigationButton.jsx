import { Button, Space } from "antd";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";

export default function NavigationButton({ icon, title, path }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <NavLink
      to={path ?? "/"}
      className={({ isActive }) => {
        setIsActive(isActive);
      }}
    >
      <Button
        style={{
          borderRadius: "100px",
          display: "flex",
          alignItems: "center",
          fontSize: "16px",
          padding: "20px",
          backgroundColor: isActive ? "#C9E4EC" : "#63A5B9",
          color: isActive ? "#0A0F1A" : "#fff",
        }}
        icon={React.cloneElement(icon, {
          style: { fill: isActive ? "#0A0F1A" : "#fff" },
        })}
        type={isActive ? "primary" : "text"}
        className={"hover:!bg-[#CCCCFE] hover:!text-black"}
      >
        {title}
      </Button>
    </NavLink>
  );
}
