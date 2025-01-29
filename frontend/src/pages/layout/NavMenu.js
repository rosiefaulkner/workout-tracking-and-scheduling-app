import React from "react";
import { useLocation } from "react-router-dom";
import {
  NavbarContent,
  NavbarItem,
  Link,
} from "@heroui/react";

function NavMenu() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <NavbarContent className="flex gap-4">
      <NavbarItem data-active={pathname === "/account/my-program"}>
        <Link
          href="/account/my-program"
          underline="none"
          color={pathname === "/account/my-program" ? "primary" : "foreground"}
          className="no-undlerline"
        >
          Train
        </Link>
      </NavbarItem>
      <NavbarItem data-active={pathname === "/account"}>
        <Link
          href="/account"
          underline="none"
          color={pathname === "/account" ? "primary" : "foreground"}
          className="no-undlerline"
        >
          Discover
        </Link>
      </NavbarItem>
      <NavbarItem data-active={pathname === "/workout/custom-routine"}>
        <Link
          href="/workout/custom-routine"
          underline="none"
          color={pathname === "/workout/custom-routine" ? "primary" : "foreground"}
          className="no-undlerline"
        >
          ✨ Custom Routine
        </Link>
      </NavbarItem>
      <NavbarItem data-active={pathname === "/workout/create"}>
        <Link
          href="/workout/create"
          underline="none"
          color={pathname === "/workout/create" ? "primary" : "foreground"}
          className="no-undlerline"
        >
          Create
        </Link>
      </NavbarItem>
    </NavbarContent>
  );
}

export default NavMenu;
