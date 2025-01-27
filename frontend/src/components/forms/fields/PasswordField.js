import React from "react";
import {Input} from "@heroui/react";
import { EyeSlashFilledIcon, EyeFilledIcon } from './../../../helpers/eyeSlashFilledIcon';

export default function PasswordField() {
    const [isVisible, setIsVisible] = React.useState(false);
  
    const toggleVisibility = () => setIsVisible(!isVisible);
  
    return (
      <Input
        className="max-w-xs"
        endContent={
          <button
            aria-label="toggle password visibility"
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        label="Password"
        placeholder="Enter your password"
        type={isVisible ? "text" : "password"}
        variant="bordered"
        name="password"
      />
    );
  }
  