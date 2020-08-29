import React from "react";
import Header from "./Header";
import Page from "./Page";
import Sidebar from "./Sidebar";

function App() {
  return (
    <>
      TODO
      <ul>
        <li>Initializing state voor auth</li>
        <li>optimistic updates of Subscriptions</li>
      </ul>
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
