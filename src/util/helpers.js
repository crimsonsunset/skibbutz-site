const store = require("store")

export function getProfile(){
  return store.get('user');
}
