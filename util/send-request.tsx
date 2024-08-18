export default async function sendRequest(
  url,
  method = "GET",
  payload = null,
  errMsg,
  token
) {
  const options = { method };
  if (payload) {
    options.headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    options.body = JSON.stringify(payload);
  }
  const res = await fetch(url, options);

  if (res.ok) {
    return res.json();
  }
  throw new Error(errMsg);
}
