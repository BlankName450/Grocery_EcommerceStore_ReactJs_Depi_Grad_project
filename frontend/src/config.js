let API_URL = "";

const hostname = window.location.hostname;
const protocol = window.location.protocol;

// Running on Vercel
if (hostname.includes("vercel.app") || hostname.includes("vercel.com")) {
  // Vercel serves both frontend and API from same domain
  API_URL = `${protocol}//${hostname}`;
  console.log('Vercel detected - API_URL:', API_URL);
} 
// Running locally
else {
  API_URL = "http://localhost:5000";
  console.log('Local development - API_URL:', API_URL);
}

export default API_URL;