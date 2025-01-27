import React from "react";
import { Button } from "@heroui/react";
import { TrophyIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function LiftLogo() {
  const navigate = useNavigate();
  return (
    <div className="text-blue">
      <Button
        onPress={() => navigate("/")}
        className="bg-transparent p-4 rounded-full shadow-lg hover:bg-primary-light transition-colors"
      >
        <TrophyIcon className="size-6 text-blue-500" />
      </Button>
    </div>
  );
}
