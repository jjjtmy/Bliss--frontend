import sendRequest from "../util/send-request.tsx";
const BASE_URL = "http://localhost:3000/users";

interface UserData {
  user: string;
  email: string;
  role: string;
}

export async function getUserfromID(userid: number) {
  console.log("getUserfromID API", userid);
  return await sendRequest(
    `${BASE_URL}/userid/${userid}`,
    "GET",
    null,
    "Invalid User"
  );
}
export async function getUserfromUser(user: string) {
  console.log("getUserfromUser API", user);
  return await sendRequest(
    `${BASE_URL}/user/${user}`,
    "GET",
    null,
    "Invalid User"
  );
}

export async function signUp(userData: UserData) {
  console.log("signUp API", userData);
  const createURL = BASE_URL + "/create";
  console.log(createURL);
  const res = await fetch(createURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (res.ok) {
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid Sign Up");
  }
}

export async function getLoginDetails(email: string) {
  console.log("getLoginDetails API", email);
  return await sendRequest(
    `${BASE_URL}/loginDetails?email=${email}`,
    "GET",
    null,
    "Invalid Login Details"
  );
}

export async function storeToken(userData: UserData) {
  console.log("storeToken API", userData);
  const createURL = BASE_URL + "/storeToken";
  console.log(createURL);
  const res = await fetch(createURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (res.ok) {
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid Token");
  }
}

export async function loginUser(userData: UserData) {
  console.log("loginUser API", userData);
  const loginURL = BASE_URL + "/login";
  console.log(loginURL);
  const res = await fetch(loginURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (res.ok) {
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid Login");
  }
}

export async function logoutUser(token: string, userData: UserData) {
  console.log("logoutUser API", token, userData);
  const logoutURL = BASE_URL + "/logout";
  console.log("logout URL", logoutURL);
  const res = await fetch(logoutURL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(userData),
  });
  if (res.ok) {
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid Logout");
  }
}

interface userDetails {
  name: string;
  image_url: string;
  reviews?: []; // Make reviews optional
}

export async function editUser(userDetails: userDetails) {
  console.log("editUser API", userDetails);
  const editURL = BASE_URL + "/edit";
  console.log(editURL);
  const res = await fetch(editURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetails),
  });
  if (res.ok) {
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid Edit User");
  }
}

interface wishlist {
  userID: string;
  vendorID: string;
  comment?: string;
}

export async function addToWishlist(wishlist: wishlist) {
  console.log("addToWishlist API", wishlist);
  const wishlistURL = BASE_URL + "/addToWishlist";
  console.log(wishlistURL);
  const res = await fetch(wishlistURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(wishlist),
  });
  if (res.ok) {
    console.log(res);
    return res.json();
  } else {
    throw new Error("Could not save to wishlist");
  }
}

export async function updateComment(wishlist: wishlist) {
  console.log("updateComment API", wishlist);
  const updateCommentURL = BASE_URL + "/updateComment";
  console.log(updateCommentURL);
  const res = await fetch(updateCommentURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(wishlist),
  });
  if (res.ok) {
    console.log(res);
    return res.json();
  } else {
    throw new Error("Could not update comment");
  }
}

export async function deleteWishlistItem(wishlist: wishlist) {
  console.log("deleteWishlistItem API", wishlist);
  const deleteWishlistItemURL = BASE_URL + "/deleteWishlistItem";
  console.log(deleteWishlistItemURL);
  const res = await fetch(deleteWishlistItemURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(wishlist),
  });
  if (res.ok) {
    console.log(res);
    return res.json();
  } else {
    throw new Error("");
  }
}
