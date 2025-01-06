import React from "react";
import Header from "./Header";
import { AppProvider } from "../../AppContext/AppContext";

function PageLayout({ children }) {
  return (
    <AppProvider>
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="m-4 flex grow flex-col gap-4">
        <div className="justify-center pt-7">
          {children}
        </div>
      </div>
    </main>
    </AppProvider>
  );
}

export default PageLayout;
