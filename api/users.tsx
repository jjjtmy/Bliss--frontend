import sendRequest from "../util/send-request.tsx";
const BASE_URL = "http://localhost:3000/users";

export async function getUserfromID(userid: number) {
  console.log("getUserfromID API", userid);
  return await sendRequest(
    `${BASE_URL}/userid/${userid}`,
    "GET",
    null,
    "Invalid User",
    null
  );
}
export async function getUserfromUser(user: string) {
  console.log("getUserfromUser API", user);
  return await sendRequest(
    `${BASE_URL}/user/${user}`,
    "GET",
    null,
    "Invalid User",
    null
  );
}

export async function signUp(userData) {
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

export async function getLoginDetails(email) {
  console.log("getLoginDetails API", email);
  return await sendRequest(
    `${BASE_URL}/loginDetails?email=${email}`,
    "GET",
    null,
    "Invalid Login Details",
    null
  );
}

export async function storeToken(userData) {
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

export async function loginUser(userData) {
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

export async function logoutUser(token, userData) {
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

export async function editUser(userDetails) {
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

export async function addToWishlist(wishlist) {
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

export async function updateComment(body) {
  console.log("updateComment API", body);
  const updateCommentURL = BASE_URL + "/updateComment";
  console.log(updateCommentURL);
  const res = await fetch(updateCommentURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (res.ok) {
    console.log(res);
    return res.json();
  } else {
    throw new Error("Could not update comment");
  }
}

export async function deleteWishlistItem(body) {
  console.log("deleteWishlistItem API", body);
  const deleteWishlistItemURL = BASE_URL + "/deleteWishlistItem";
  console.log(deleteWishlistItemURL);
  const res = await fetch(deleteWishlistItemURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (res.ok) {
    console.log(res);
    return res.json();
  } else {
    throw new Error("");
  }
}
