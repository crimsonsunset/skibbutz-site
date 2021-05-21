import React from "react"
import { AuthService, useAuth } from "gatsby-theme-auth0"
import { navigate } from "gatsby" //import navigate from gatsby

let Callback = () => {


  React.useEffect(() => {
    if (/access_token|id_token|error/.test(window.location.hash)) {
      AuthService.handleAuthentication()
        .catch((err) => {
          alert(err.errorDescription);
          navigate('/'); //navigate to edit page
        })
    }
  }, [])

  return (
    <div>
      {'Callback. Redirecting'}
    </div>
  )
}


export default Callback
