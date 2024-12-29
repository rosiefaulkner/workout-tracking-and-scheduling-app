import React from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
  } from "@nextui-org/react";
  
  export default function UserMenu() {
    return (
      <div className="flex items-center gap-4">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="my_programs">My programs</DropdownItem>
            <DropdownItem key="history">History</DropdownItem>
            <DropdownItem key="edit_profile">Edit Profile</DropdownItem>
            <DropdownItem key="invite_friends">Invite friends</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
  