import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// [Unit]
// Description=gunicorn daemon
// Requires=gunicorn.socket
// After=network.target

// [Service]
// User=ubuntu
// Group=www-data
// WorkingDirectory=/home/ubuntu/CynoTracking/app
// ExecStart=/home/ubuntu/env/bin/gunicorn
//           --access-logfile - \
//           --workers 3 \
//           --bind unix:/run/gunicorn.sock \
//           tracker.wsgi:application
// [Install]
// WantedBy=multi-user.target
