import React from "react";
import { Avatar } from "@nextui-org/react";
import UserMenu from "./UserMenu";
import LiftLogo from "../../assets/LiftLogo";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

function Header() {
  const handleUserClick = () => {
    alert("User Profile Clicked!");
  };

  const handleSettingsClick = () => {
    alert("Settings Clicked!");
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 shadow-md bg-white">
      {/* Logo section */}
      <div className="flex items-center">
        <div className="w-70">
          <LiftLogo className="w-full h-full" />
        </div>
      </div>

      {/* Menu section */}
      <div className="flex items-center space-x-4">
        <UserMenu />
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={handleSettingsClick}
        >
          <Cog6ToothIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </header>
  );
}

export default Header;
