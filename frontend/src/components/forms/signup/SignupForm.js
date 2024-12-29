import React, { useState } from "react";
import {Form, Input, Button} from "@nextui-org/react";
import axiosInstance from "../../../helpers/axiosInstance";

export default function SignupForm() {
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState('');

  // Password validation
  const getPasswordError = (value) => {
    if (value.length < 4) {
      return "Password must be 4 characters or more";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Password needs at least 1 uppercase letter";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Password needs at least 1 symbol";
    }

    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const newErrors = {};

    // Password validation
    const passwordError = getPasswordError(data.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Username validation
    // TODO: Verfy username is unique
    if (data.name === "admin") {
      newErrors.name = "Nice try! Choose a different username";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    // Clear errors and submit
    setErrors({});
    setSubmitted(data);

    try {
      const response = await axiosInstance.post("/account/create-user", data);
      if (!response || response?.status !== 200 || response?.data?.status !== "success") {
        setResponseMessage(response?.data?.message || "Oops. Something went wrong.");
      } else {
        setResponseMessage(response?.data?.message);
      }
    } catch (error) {
      setResponseMessage("Whoops. Something went wrong.");
    }
  };

  return (
    <Form
      className="w-full justify-center items-center space-y-4"
      validationBehavior="native"
      validationErrors={errors}
      onReset={() => setSubmitted(null)}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4 max-w-md">
        <Input
          isRequired
          errorMessage={({validationDetails}) => {
            if (validationDetails.valueMissing) {
              return "Please enter a username";
            }

            return errors.name;
          }}
          label="Username"
          labelPlacement="outside"
          name="username"
          placeholder="Enter a username"
        />

        <Input
          isRequired
          errorMessage={({validationDetails}) => {
            if (validationDetails.valueMissing) {
              return "Please enter your email";
            }
            if (validationDetails.typeMismatch) {
              return "Please enter a valid email address";
            }
          }}
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />

        <Input
          isRequired
          errorMessage={getPasswordError(password)}
          isInvalid={getPasswordError(password) !== null}
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter a strong password"
          type="password"
          value={password}
          onValueChange={setPassword}
        />

        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="bordered">
            Reset
          </Button>
        </div>
      </div>

      {submitted && (
        <div className="text-small text-default-500 mt-4">
          <h2>{responseMessage}</h2>
          Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
}