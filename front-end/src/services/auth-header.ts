export default function authHeader(): { Authorization?: string } | {} {
  const headers: { Authorization?: string } = {};

  if (localStorage.getItem("userAccessToken")) {
    headers.Authorization = ("Bearer " +
      localStorage.getItem("userAccessToken")) as string;
  }

  return headers;
}
