"use client";
import DocsSideBar from "@components/docs_components/DocsSideBar";
import React, { createContext, useState } from "react";

const hashContext = createContext();

function DocsLayout({ children }) {
  const [hash, setHash] = useState("");
  return (
    <hashContext.Provider value={{ hash, setHash }}>
      <div className="relative flex-1 flex h-full">
        <DocsSideBar />
        <div className="absolute inset-0 flex-1 lg:ml-50 max-lg:mt-16 min-[500px]:p-4">
          <div
            className=" bg-white min-[500px]:border min-[500px]:border-gray-200 min-[500px]:shadow-md min-[500px]:rounded-xl  h-full p-8 pt-0 overflow-y-auto"
            id="docs-content"
          >
            {children}
          </div>
        </div>
      </div>
    </hashContext.Provider>
  );
}

export { hashContext };

export default DocsLayout;
