import React from "react";
import { useLocation } from "react-router-dom";
import {
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";

function NavMenu() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <NavbarContent className="flex gap-4 ">
      <NavbarItem data-active={pathname === "/account/my-program"}>
        <Link
          href="/account/my-program"
          underline="none"
          color={pathname === "/account/my-program" ? "primary" : "foreground"}
        >
          Train
        </Link>
      </NavbarItem>
      <NavbarItem data-active={pathname === "/account"}>
        <Link
          href="/account"
          underline="none"
          color={pathname === "/account" ? "primary" : "foreground"}
        >
          Discover
        </Link>
      </NavbarItem>
      <NavbarItem data-active={pathname === "/workout/create"}>
        <Link
          href="/workout/create"
          underline="none"
          color={pathname === "/workout/create" ? "primary" : "foreground"}
        >
          Create
        </Link>
      </NavbarItem>
    </NavbarContent>
  );
}

export default NavMenu;
