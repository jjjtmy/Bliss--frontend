import * as usersAPI from "../api/users";
import { getToken, removeToken } from "../util/security";

export async function getUserfromID(id) {
  console.log("getUserfromID service", id);
  const user = await usersAPI.getUserfromID(id);
  return user; //returns user collection
}

export async function getUserfromUser(username) {
  console.log("getUserfromUser", username);
  const user = await usersAPI.getUserfromUser(username);
  return user;
}

export async function getLoginDetails(email) {
  console.log("getLoginDetails service", email);
  const loginDetails = await usersAPI.getLoginDetails(email);
  return loginDetails; //returns id, name, salt, iterations
}

export async function loginUser(userData) {
  console.log("loginUser service", userData);
  const res = await usersAPI.loginUser(userData);
  return res; // returns token (user, email, role)
}

export async function signUp(userData) {
  console.log("signUp service", userData);
  const token = await usersAPI.signUp(userData);
  return token; // create + returns new user collection
}

export async function logoutUser() {
  console.log("logoutUser service");
  const token = getToken();
  if (token) {
    const res = await usersAPI.logoutUser(
      token,
      JSON.parse(atob(token.split(".")[1])).payload
    );
    removeToken();
    // window.location.reload();
  }
}

export function getUser() {
  console.log("getUser service");
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split(".")[1])).payload.user : null;
  // returns username
}
export function getUserRole() {
  console.log("getUser service");
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split(".")[1])).payload.role : null;
  // returns username
}

export async function getUserIDFromToken() {
  await getToken();
  const token = getToken();
  const email = token
    ? JSON.parse(atob(token.split(".")[1])).payload.email
    : null;
  console.log("email", email);
  const userCollection = await getLoginDetails(email);
  const userID = userCollection.data._id;
  console.log("userID", userID);
  return userID;
}

export function editUser(userDetails) {
  console.log("editUser service", userDetails);
  const user = usersAPI.editUser(userDetails);
  return user; //returns true if successful
}

export async function addToWishlist(vendorID) {
  const userID = await getUserIDFromToken();
  const wishlist = { userID, vendorID };
  const res = await usersAPI.addToWishlist(wishlist);
  return res; //returns true if successful
}
