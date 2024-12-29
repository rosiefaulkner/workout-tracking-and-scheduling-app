import React from "react";
import { Avatar } from "@nextui-org/react";
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
    <header className="flex items-center justify-between px-6 py-3 shadow-md bg-white h-16 md:h-20">
      {/* Logo Section */}
      <div className="flex items-center">
        <div className="w-50 h-10 md:w-14 md:h-14">
          <LiftLogo className="w-full h-full" />
        </div>
      </div>

      {/* Title Section */}
      <div className="text-lg font-bold text-blue-600 md:text-xl">
        ACCOUNT STUFFS 2
      </div>

      {/* Actions Section */}
      <div className="flex items-center space-x-4">
        <Avatar
          className="cursor-pointer"
          showFallback
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          onClick={handleUserClick}
        />
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
