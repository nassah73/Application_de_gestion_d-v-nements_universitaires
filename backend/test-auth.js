const http = require('http');

const testLogin = (email, password, userType) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ email, password });
        
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/api/auth/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };
        
        const req = http.request(options, (res) => {
            let responseData = '';
            
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            
            res.on('end', () => {
                try {
                    const result = JSON.parse(responseData);
                    resolve({ status: res.statusCode, data: result, userType });
                } catch (e) {
                    resolve({ status: res.statusCode, data: responseData, userType });
                }
            });
        });
        
        req.on('error', (error) => {
            reject(error);
        });
        
        req.write(data);
        req.end();
    });
};

const runTests = async () => {
    console.log('=========================================');
    console.log('    TESTS D\'AUTHENTIFICATION BACKEND    ');
    console.log('=========================================\n');
    
    const tests = [
        {
            name: 'Super Admin',
            email: 'superadmin@uiz.ac.ma',
            password: 'SuperAdmin@1234'
        },
        {
            name: 'Email incorrect',
            email: 'nonexistent@example.com',
            password: 'password123'
        },
        {
            name: 'Mot de passe incorrect',
            email: 'superadmin@uiz.ac.ma',
            password: 'wrongpassword'
        }
    ];
    
    for (const test of tests) {
        console.log(`📋 Test: ${test.name}`);
        console.log(`   Email: ${test.email}`);
        console.log(`   Mot de passe: ${test.password}`);
        
        try {
            const result = await testLogin(test.email, test.password, test.name);
            console.log(`   Statut: ${result.status}`);
            console.log(`   Réponse:`, result.data);
        } catch (error) {
            console.log(`   Erreur:`, error.message);
        }
        
        console.log('-----------------------------------------\n');
    }
    
    console.log('=========================================');
    console.log('         FIN DES TESTS                   ');
    console.log('=========================================');
};

runTests();
