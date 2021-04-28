import React from "react"
import PageTemplate from "../components/pageTemplate"
import { AuthService, useAuth } from "gatsby-theme-auth0"
const store = require('store')

let Login = () => {

  const possProf = AuthService.getUserProfile()
  if(possProf){
    store.set('user', possProf);
  }

  const { isLoggedIn } = useAuth();
  const profile = store.get('user');

  return (
    <PageTemplate title="Login">
      <div>
        {profile && <p>Hello {profile.name}</p>}

        {isLoggedIn ? (
          <button onClick={
            (e, i) => {
              AuthService.logout()
              store.remove('user')
            }
          }>Logout</button>
        ) : (
           <button onClick={AuthService.login}>Login</button>
         )}
      </div>
    </PageTemplate>
  )
}

export default Login
