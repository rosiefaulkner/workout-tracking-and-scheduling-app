import React, { useState, useEffect } from "react";
import {Alert, Form, Input, Button} from "@nextui-org/react";
import axiosInstance from "../../../helpers/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
  const navigate = useNavigate();

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

    if (data.username === "admin") {
      newErrors.username = "Nice try! Choose a different username";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(data);

    try {
      const response = await axiosInstance.post("/account/create-user", data);
      if (!response || response?.status !== 200 || response?.data?.status !== "success") {
        if (response) {
          setErrors({ message: response?.message || "Oops. Something went wrong." });
        }
        setIsSignupSuccessful(false);
      } else {
        setIsSignupSuccessful(true);
      }
    } catch (error) {
      setIsSignupSuccessful(false)
      setErrors({ message: "Whoops, something went wrong." });
    }
  };

  useEffect(() => {
      if (!isSignupSuccessful) {
        return;
      }
      setErrors({});
      navigate("/account");
    }, [isSignupSuccessful]);

  return (
    <>
    {errors?.message && (
      <div className="w-full flex items-center my-3 alert-danger rounded-medium">
        <Alert color="danger" title={errors.message} />
      </div>
    )}
    <Form className="flex flex-col gap-4 max-w-md" onSubmit={onSubmit}>
      <Input
        name="username"
        placeholder="Enter your username"
        required
        errorMessage={errors.username}
      />
      <Input
        name="email"
        type="email"
        placeholder="Enter your email"
        required
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
        Sign Up
      </Button>
    </Form>
    </>
  );
}
