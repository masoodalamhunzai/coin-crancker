import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Logoutbutton(props) {
  const { logout } = useAuth0();
  return (
    <>
      <button
        onClick={() =>
          logout({
            returnTo: window.location.origin,
          })
        }
        className={"logout-btn " + props.className}
      >
        Logout
      </button>
    </>
  );
}

export default Logoutbutton;
