import React, { useContext, useEffect } from "react";
import LiftLogo from "../../assets/LiftLogo";
import { Navbar, NavbarBrand, NavbarContent, Input } from "@nextui-org/react";
import UserMenu from "./UserMenu";
import NavMenu from "./NavMenu";
import { AppContext } from "../../AppContext/AppContext";

export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

function Header() {
  const { userData, logout } = useContext(AppContext);

  return (
    <header className="min-w-fit flex place-content-between justify-between">
      <Navbar
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-primary",
          ],
        }}
      >
        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          <NavbarBrand className="mr-4">
            <div className="flex items-center">
              <div className="w-70">
                <LiftLogo className="w-full h-full" />
              </div>
            </div>
          </NavbarBrand>
          <NavMenu />
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input:
                "text-small border-transparent focus:border-transparent focus:ring-0",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
          <UserMenu userDataFields={userData} logout={logout} />
        </NavbarContent>
      </Navbar>
    </header>
  );
}

export default Header;