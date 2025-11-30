let API_URL = "";

const hostname = window.location.hostname;
const protocol = window.location.protocol;
const port = window.location.port;

// Running on Replit
if (hostname.includes("repl.co") || hostname.includes("replit.dev") || hostname.includes("replit")) {
  // Replit uses port-based subdomains: https://5000-username-replname.repl.co
  // Or same domain with different ports: https://replname.username.repl.co:5000
  
  // Check if we're using port-based subdomain format (e.g., 3000-username-replname.repl.co)
  const portMatch = hostname.match(/^(\d+)-/);
  
  if (portMatch) {
    // Port-based subdomain: replace frontend port (3000) with backend port (5000)
    const frontendPort = portMatch[1];
    API_URL = hostname.replace(`${frontendPort}-`, `5000-`);
    // Ensure HTTPS
    if (protocol === 'http:') {
      API_URL = `https://${API_URL}`;
    } else {
      API_URL = `${protocol}//${API_URL}`;
    }
  } else {
    // Same domain, different port
    const baseHost = hostname.split(':')[0];
    // Use port 5000 for backend
    API_URL = `${protocol}//${baseHost}:5000`;
  }
  
  console.log('Replit detected - API_URL:', API_URL);
} 
// Running locally
else {
  API_URL = "http://localhost:5000";
  console.log('Local development - API_URL:', API_URL);
}

export default API_URL;