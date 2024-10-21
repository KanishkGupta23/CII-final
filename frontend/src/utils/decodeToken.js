export const decodeJWT = (token) => {
  if (!token) return null;

  const base64Url = token.split('.')[1]; // Get the payload part
  if (!base64Url) return null;

  // Replace '-' with '+' and '_' with '/' for Base64 decoding
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  
  // Decode the Base64 string
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
};

