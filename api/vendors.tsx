import sendRequest from "../util/send-request.tsx";
const BASE_URL = "http://localhost:3000/vendors";

export async function editVendorPage(newVendorPage) {
  console.log("editVendorPage API", newVendorPage);
  const editvendorpageURL = BASE_URL + "/editvendorpage";
  const res = await fetch(editvendorpageURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: newVendorPage.token,
    },
    body: JSON.stringify(newVendorPage.vendorPage),
  });
  if (res.ok) {
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid vendor page edit");
  }
}

export async function getVendorPage(vendor) {
  console.log("getVendorPage API", vendor);
  return await sendRequest(
    `${BASE_URL}/${vendor}`,
    "GET",
    null,
    "Invalid Vendor"
  );
}
export async function getVendorByName(vendorname) {
  console.log("getVendorByName API", vendorname);
  return await sendRequest(
    `${BASE_URL}/name/${vendorname}`,
    "GET",
    null,
    "Invalid Vendor"
  );
}

export async function addVendorReview(review) {
  console.log("addVendorReview API", review);
  return await sendRequest(
    `${BASE_URL}/addreview`,
    "POST",
    review.review,
    "Invalid Review",
    review.token
  );
}

export async function getReviewsByUser(userid) {
  console.log("getReviewsByUser API", userid);
  return await sendRequest(
    `${BASE_URL}/getReviewsByUser/${userid}`,
    "GET",
    null,
    "Invalid Reviews"
  );
}
