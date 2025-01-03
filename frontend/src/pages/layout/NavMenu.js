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
    <NavbarContent className="hidden sm:flex gap-3">
      <NavbarItem data-active={pathname === "/account/my-program"}>
        <Link
          href="/account/my-program"
          color={pathname === "/account/my-program" ? "primary" : "foreground"}
        >
          My Program
        </Link>
      </NavbarItem>
      <NavbarItem data-active={pathname === "/account"}>
        <Link
          href="/account"
          color={pathname === "/account" ? "primary" : "foreground"}
        >
          Discover
        </Link>
      </NavbarItem>
      <NavbarItem data-active={pathname === "/workout/create"}>
        <Link
          href="/workout/create"
          color={pathname === "/workout/create" ? "primary" : "foreground"}
        >
          Create
        </Link>
      </NavbarItem>
    </NavbarContent>
  );
}

export default NavMenu;
