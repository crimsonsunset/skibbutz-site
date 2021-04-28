import React from "react"
import { AuthService, useAuth } from "gatsby-theme-auth0"

let Callback = () => {

  React.useEffect(() => {
    if (/access_token|id_token|error/.test(window.location.hash)) {
      AuthService.handleAuthentication();
    }
  }, []);

  return (
    <div>
      Callback. Redirecting
    </div>
  )
}


export default Callback
