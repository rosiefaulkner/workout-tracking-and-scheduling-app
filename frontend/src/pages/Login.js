import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import LoginForm from "../components/forms/login/LoginForm";
import SignupForm from "../components/forms/signup/SignupForm";

export default function Login() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-screen w-full items-start justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
          <Card className="max-w-md w-full mt-20 shadow-lg bg-white">
            <CardBody>
              <div className="w-full py-10">
                <Tabs aria-label="Login or Signup Options" className="w-full block">
                  <Tab key="login" title="Login">
                    <LoginForm />
                  </Tab>
                  <Tab key="signup" title="Sign Up">
                    <SignupForm />
                  </Tab>
                </Tabs>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}
