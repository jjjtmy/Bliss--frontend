import * as vendorsAPI from "../api/vendors";

export async function editVendorPage(updatedVendorPage) {
  console.log("editVendorPage service", updatedVendorPage);
  const vendorDetails = await vendorsAPI.editVendorPage(updatedVendorPage);
  return vendorDetails; //returns true if successful
}

export async function getVendorPage(vendorID) {
  console.log("getVendorPage service", vendorID);
  const vendor = await vendorsAPI.getVendorPage(vendorID);
  return vendor.data; //returns vendor collection
}

export async function getVendorByName(formData) {
  console.log("searchVendors service", formData);
  const vendor = await vendorsAPI.getVendorByName(formData);
  return vendor.data; //returns vendor collection
}

export async function addVendorReview(review) {
  console.log("addVendorReview service", review);
  const newReview = await vendorsAPI.addVendorReview(review);
  return newReview; //returns true if successful
}

export async function getReviewsByUser(userid) {
  console.log("getReviewsByUser service", userid);
  const reviews = await vendorsAPI.getReviewsByUser(userid);
  return reviews; //returns array of review collections by userid + vendorID
}

export async function getVendorNames() {
  return;
}
