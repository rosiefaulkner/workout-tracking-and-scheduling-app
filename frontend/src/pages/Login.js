import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import LoginForm from "./../components/forms/login/LoginForm";
import SignupForm from "../components/forms/signup/SignupForm";

export default function Login() {

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="login" title="Login">
          <Card>
            <CardBody>
              <LoginForm />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="signup" title="Sign Up">
          <Card>
            <CardBody>
              <SignupForm />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
