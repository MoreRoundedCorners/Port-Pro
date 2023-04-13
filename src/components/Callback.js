import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function Callback() {
  const { setToken } = useAuth();
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const authorizationCode = searchParams.get("code");

    if (authorizationCode) {
      console.log(authorizationCode);
      sendAuthorizationCodeToServer(authorizationCode);
    }
  }, []);

  async function sendAuthorizationCodeToServer(authorizationCode) {
    try {
      const response = await fetch("/api/users/spotify/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: authorizationCode }),
      });

      if (!response.ok) {
        throw new Error("Failed to send authorization code to server");
      }

      const data = await response.json();
      setToken(data.accessToken);
      // Process the response data (e.g., store the access token)
    } catch (error) {
      {
        console.error(
          "Error sending authorization code to server:",
          error.message,
          error.stack
        );
      }
    }
  }

  return (
    <div>
      <p>test</p>
    </div>
  );
}

export default Callback;
