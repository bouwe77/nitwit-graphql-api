import React from "react";
import Header from "./Header";
import Page from "./Page";
import Sidebar from "./Sidebar";

function App() {
  return (
    <>
      <div className="main">
        <Header />
        <Page />
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
    </>
  );
}

export default App;
