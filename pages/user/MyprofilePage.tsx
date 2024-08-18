// import "./UserProfilePage.css";
// import { Box } from "@mantine/core";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import NavBar from "../../components/NavBar";
// import { getUser } from "../../service/users";

// export default function clientProfilePage() {
//   const { userID } = useParams();
//   const [userDetails, setUserDetails] = useState(null);

//   async function fetchData() {
//     try {
//       const token = getToken();
//       if (!token) {
//         navigate("/login");
//       } else {
//         const role = JSON.parse(atob(token.split(".")[1])).payload.email;
//         const user = await getLoginDetails(email);
//         console.log(`userpage user`, user);
//         setUserDetails(user);
//       }
//     } catch {
//       console.error("Error fetching vendor details", error);
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <>
//       <NavBar />
//       <Box className="vendorContainer">
//         <Box className="image">IMAGE GOES HERE</Box>
//         <div className="details">
//           <Box>Profile Picture goes here</Box>
//           <Box>Name </Box>
//           <Box h="200px">
//             {" "}
//             Reviews
//             {/* Reviews
//             {vendorDetails.reviews.map((review) => (
//               <div>
//                 <p>Cost per pax: {review.costperpax}</p>
//                 <p>Food: {review.food}</p>
//                 <p>Ambience: {review.ambience}</p>
//                 <p>Pre-wedding support: {review.preWeddingSupport}</p>
//                 <p>Day-of support: {review.dayOfSupport}</p>
//                 <p>Overall: {review.overall}</p>
//                 <p>Comments: {review.comments}</p>
//               </div>
//             ))} */}
//           </Box>
//         </div>
//       </Box>
//     </>
//   );
// }
