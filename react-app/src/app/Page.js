import React from "react";

export default function Page() {
  return (
    <Switch>
      <Route path="/profile/:username">
        <Profile />
      </Route>
      <Route path="/">
        <Timeline />
      </Route>
    </Switch>
  );
}
