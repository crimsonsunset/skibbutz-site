import React from "react"
import PageTemplate from "../components/pageTemplate"
import { AuthService, useAuth } from "gatsby-theme-auth0"

let Callback = () => {

  React.useEffect(() => {
    if (/access_token|id_token|error/.test(window.location.hash)) {
      AuthService.handleAuthentication();
    }
  }, []);

  return (
    <PageTemplate title="Callback">
      Callback. Redirecting
    </PageTemplate>
  )
}


export default Callback
