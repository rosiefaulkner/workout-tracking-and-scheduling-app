import React from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-primary">404</h1>
        <p className="mt-4 text-xl text-gray-400">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="mt-2 text-gray-500">
          It might have been moved or deleted.
        </p>
        <div className="mt-6">
          <Button
            color="primary"
            auto
            onPress={() => (navigate("/"))}
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
