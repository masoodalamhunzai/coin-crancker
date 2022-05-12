import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <button onClick={() => loginWithRedirect()} className="mx-auto btn">
        Login
      </button>
    </>
  );
}

export default LoginButton;
