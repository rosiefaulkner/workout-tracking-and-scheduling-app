import React, { useEffect, useState, useRef, useContext } from "react";
import { Alert, Form, Input, Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../helpers/axiosInstance";
import { AppContext } from "../../../AppContext/AppContext";

export default function LoginForm() {
  const alertMessage = useRef(null);
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const navigate = useNavigate();
  const { setUserData } = useContext(AppContext);
  

  const getPasswordError = (value) => {
    if (!submitted) return null;
    if (value.length < 4) return "Password must be at least 4 characters.";
    if (!/[A-Z]/.test(value))
      return "Password must include an uppercase letter.";
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
        if (response?.message) {
          alertMessage.current = ({ message: response.message});
        } else {
          setErrors({ message: "Double check your credentials and try again."});
        }
        setIsLoginSuccessful(false);
      } else {
        setUserData({...response?.data});
        setIsLoginSuccessful(true);
      }
    } catch (error) {
      setErrors({ message: "Whoops, something went wrong." });
      setIsLoginSuccessful(false);
    }
  };

  useEffect(() => {
    if (!isLoginSuccessful) {
      return;
    }
    setErrors({});
    navigate("/account");
  }, [isLoginSuccessful]);

  return (
    <>
    {errors?.message && (
      <div className="w-full flex items-center my-3 alert-danger rounded-medium">
        <Alert color="danger" title={errors.message} />
      </div>
    )}
    <Form className="flex flex-col gap-4 max-w-md" onSubmit={onSubmit}>
      <Input
        name="email"
        type="email"
        placeholder="Enter your email"
        required
        validationBehavior="native"
        errorMessage={errors.email}
        className="border-transparent focus:border-transparent focus:ring-0"
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
    </>
  );
}
