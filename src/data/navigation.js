const store = require("store")

const navigation = [
  {
    "name": "Home",
    "url": "/",
  },
  {
    "name": "Tour",
    "url": "/tour",
  },
  // {
  //   "name": "Login",
  //   "url": "/login",
  // },
  // {
  //   "name": "Contact",
  //   "url": "/contact"
  // }
]

export function getNavigation() {
  const profile = store.get("user")
  if (profile) {
    navigation[1] = {
      "name": "Profile",
      "url": "/profile",
    }
  }
  return navigation
}
