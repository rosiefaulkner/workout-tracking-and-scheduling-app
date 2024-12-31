import React from "react";
import Header from "./Header";

function PageLayout({ children }) {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="m-4 flex grow flex-col gap-4">
        <div className="justify-center">{children}</div>
      </div>
    </main>
  );
}

export default PageLayout;
