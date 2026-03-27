const http = require('http');

const data = JSON.stringify({
    name: 'Debug User',
    email: 'debug@example.com',
    requestType: 'diet',
    goal: 'Debug 500 Native'
});

const options = {
    hostname: 'localhost',
    port: 5001,
    path: '/api/contact',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        console.log('Body:', body);
    });
});

req.on('error', (error) => {
    console.error('Request error:', error);
});

req.write(data);
req.end();
