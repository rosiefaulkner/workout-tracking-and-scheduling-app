import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import AIIcon from "../assets/AIIcon";

function Generate() {
  return (
    <section className="py-24 md:py-28">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4">
            <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                <AIIcon />
                <div className="flex flex-col">
                  <p className="text-md">Generate a workout</p>
                  <p className="text-small text-default-500">with AI</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>
                  Pick a few options and automatically get a challenging workout
                </p>
              </CardBody>
              <Divider />
              <CardFooter>
                <Link isExternal showAnchorIcon href="/workout/generate">
                  Try it out.
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Generate;
