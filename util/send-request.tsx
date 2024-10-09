type Method = "GET" | "POST" | "PUT" | "DELETE"; // Define a type for allowed HTTP methods

export default async function sendRequest(
  url: string,
  method: Method = "GET", // Specify the method type
  payload: any = null,
  errMsg: string = "Request failed", // Default error message
  token?: string // Make token an optional parameter
) {
  const options: RequestInit = { method }; // Specify type for options

  if (payload) {
    options.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Use token correctly
    };
    options.body = JSON.stringify(payload);
  }

  const res = await fetch(url, options);

  if (res.ok) {
    return res.json(); // Parse the JSON response
  }

  throw new Error(errMsg); // Throw an error if the request fails
}
