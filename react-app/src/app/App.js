import React from "react";
import Timeline from "../timeline/Timeline";
import Header from "./Header";

function App() {
  return (
    <>
      <div className="main">
        <Header />
        <Timeline />
      </div>
      <div className="sidebar">...</div>
    </>
  );
}

export default App;
