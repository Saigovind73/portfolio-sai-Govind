const fetch = require('node-fetch');

async function testSubmit() {
    try {
        const response = await fetch('http://localhost:5001/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Debug User',
                email: 'debug@example.com',
                requestType: 'diet',
                goal: 'Debug 500'
            })
        });
        const status = response.status;
        const body = await response.json();
        console.log(`Status: ${status}`);
        console.log('Body:', JSON.stringify(body, null, 2));
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

testSubmit();
