let API_URL = "";

const hostname = window.location.hostname;
const protocol = window.location.protocol;
const port = window.location.port;
const currentUrl = window.location.href;

// Running on Replit
if (hostname.includes("repl.co") || hostname.includes("replit.dev") || hostname.includes("replit")) {
  // Replit uses port-based subdomains: https://5000-username-replname.repl.co
  // Or same domain with different ports: https://replname.username.repl.co:5000
  
  // Check if we're using port-based subdomain format (e.g., 5000-username-replname.repl.co)
  const portMatch = hostname.match(/^(\d+)-/);
  
  if (portMatch) {
    // Port-based subdomain: frontend might be on 5000, backend on 5001
    const frontendPort = portMatch[1];
    
    // Try backend on port 5001 first (common Replit setup), then fallback to 5000
    if (frontendPort === "5000") {
      API_URL = hostname.replace(`5000-`, `5001-`);
    } else {
      // If frontend is on 3000, backend is likely on 5000
      API_URL = hostname.replace(`${frontendPort}-`, `5000-`);
    }
    
    // Ensure HTTPS
    if (protocol === 'http:') {
      API_URL = `https://${API_URL}`;
    } else {
      API_URL = `${protocol}//${API_URL}`;
    }
  } else {
    // Same domain, different port - try port 5001 first, then 5000
    const baseHost = hostname.split(':')[0];
    if (port === "5000") {
      // Frontend on 5000, backend likely on 5001
      API_URL = `${protocol}//${baseHost}:5001`;
    } else {
      // Frontend on different port, backend on 5000
      API_URL = `${protocol}//${baseHost}:5000`;
    }
  }
  
  console.log('Replit detected - Frontend URL:', currentUrl);
  console.log('Replit detected - API_URL:', API_URL);
} 
// Running locally
else {
  API_URL = "http://localhost:5000";
  console.log('Local development - API_URL:', API_URL);
}

export default API_URL;