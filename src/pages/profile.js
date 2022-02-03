import React from "react"
import PageTemplate from "@components//pageTemplate"
import { getProfile } from "@util/helpers"
const store = require("store")

let Profile = () => {
  const profile = getProfile();

  return (
    <PageTemplate title={`User Profile: ${profile?.name}`}>

      <button onClick={
        (e, i) => {
          // AuthService.logout()
          store.remove('user')
        }
      }>Logout</button>
    </PageTemplate>
  )
}

export default Profile
