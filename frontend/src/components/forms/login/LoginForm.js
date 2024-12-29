import React, { useState } from "react";
import { Form, Input, Button } from "@nextui-org/react";
import axiosInstance from "../../../helpers/axiosInstance";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("");

  const getPasswordError = (value) => {
    if (!submitted) return null;
    if (value.length < 4) return "Password must be at least 4 characters.";
    if (!/[A-Z]/.test(value)) return "Password must include an uppercase letter.";
    if (!/[^a-zA-Z0-9]/.test(value)) return "Password must include a symbol.";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const newErrors = {};
    const passwordError = getPasswordError(data.password);

    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(data);

    try {
      const response = await axiosInstance.post("/login", data);
      if (
        !response ||
        response?.status !== 200 ||
        response?.data?.status !== "success"
      ) {
        setResponseMessage(
          response?.data?.message || "Oops. Something went wrong."
        );
      } else {
        setResponseMessage(response?.data?.message);
      }
    } catch (error) {
      setResponseMessage("Whoops. Something went wrong.");
    }
  };

  return (
    <Form className="flex flex-col gap-4 max-w-md" onSubmit={onSubmit}>
      <Input
        name="email"
        type="email"
        placeholder="Enter your email"
        required
        validationBehavior="native"
        errorMessage={errors.email}
      />
      <Input
        name="password"
        type="password"
        placeholder="Enter your password"
        required
        onValueChange={(value) => setPassword(value)}
        errorMessage={getPasswordError(password)}
        isInvalid={!!getPasswordError(password)}
      />
      <Button type="submit" color="primary" className="w-full">
        Login
      </Button>
    </Form>
  );
}
