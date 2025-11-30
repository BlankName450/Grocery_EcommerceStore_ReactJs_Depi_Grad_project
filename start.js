const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Grocery App on Replit...\n');

// Start backend
console.log('📦 Starting backend server on port 5000...');
const backend = spawn('npm', ['start'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    PORT: process.env.PORT || 5000
  }
});

// Wait a bit for backend to start, then start frontend
setTimeout(() => {
  console.log('⚛️  Starting frontend server on port 3000...');
  const frontend = spawn('npm', ['start'], {
    cwd: path.join(__dirname, 'frontend'),
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      PORT: process.env.FRONTEND_PORT || 3000,
      BROWSER: 'none', // Don't open browser automatically
      REACT_APP_API_URL: process.env.REACT_APP_API_URL || ''
    }
  });

  frontend.on('error', (err) => {
    console.error('❌ Frontend error:', err);
  });

  frontend.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`Frontend exited with code ${code}`);
    }
  });

  // Store frontend reference for cleanup
  process.frontend = frontend;
}, 2000);

// Handle process termination
const cleanup = () => {
  console.log('\n🛑 Shutting down servers...');
  if (backend) backend.kill();
  if (process.frontend) process.frontend.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

backend.on('error', (err) => {
  console.error('❌ Backend error:', err);
});

backend.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`Backend exited with code ${code}`);
  }
});

