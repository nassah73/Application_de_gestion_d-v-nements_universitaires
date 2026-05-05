const http = require('http');

const sendRequest = (method, path, data = null) => {
    return new Promise((resolve, reject) => {
        const postData = data ? JSON.stringify(data) : null;
        
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: method,
            headers: postData ? {
                'Content-Type': 'application/json',
                'Content-Length': postData.length
            } : {}
        };
        
        const req = http.request(options, (res) => {
            let responseData = '';
            
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            
            res.on('end', () => {
                try {
                    const result = JSON.parse(responseData);
                    resolve({ status: res.statusCode, data: result });
                } catch (e) {
                    resolve({ status: res.statusCode, data: responseData });
                }
            });
        });
        
        req.on('error', (error) => {
            reject(error);
        });
        
        if (postData) {
            req.write(postData);
        }
        req.end();
    });
};

const testForgotReset = async () => {
    console.log('=========================================');
    console.log('  TESTS FORGOT PASSWORD & RESET PASSWORD');
    console.log('=========================================\n');
    
    const testEmail = 'ahmed.benali@uiz.ac.ma';
    const newPassword = 'NewPassword@1234';
    let otpCode = null;
    
    console.log('📋 1. Test Forgot Password (Générer OTP)');
    try {
        const result = await sendRequest('POST', '/api/auth/forgot-password', { email: testEmail });
        console.log('   Statut:', result.status);
        const { otp, ...safeResponse } = result.data || {};
        console.log('   Réponse:', { ...safeResponse, otp: otp ? '******' : undefined });
        if (result.data.otp) {
            otpCode = result.data.otp;
            console.log('   OTP reçu: ******');
        }
    } catch (error) {
        console.log('   Erreur:', error.message);
    }
    console.log('-----------------------------------------\n');
    
    if (otpCode) {
        console.log('📋 2. Test Reset Password (Avec OTP valide)');
        try {
            const result = await sendRequest('POST', '/api/auth/reset-password', {
                email: testEmail,
                otp: otpCode,
                newPassword: newPassword
            });
            console.log('   Statut:', result.status);
            const { otp: _, newPassword: __, ...safeReset } = result.data || {};
            console.log('   Réponse:', safeReset);
        } catch (error) {
            console.log('   Erreur:', error.message);
        }
        console.log('-----------------------------------------\n');
        
        console.log('📋 3. Test Login avec le nouveau mot de passe');
        try {
            const result = await sendRequest('POST', '/api/auth/login', {
                email: testEmail,
                password: newPassword
            });
            console.log('   Statut:', result.status);
            const { token: _, ...loginSafe } = result.data || {};
            console.log('   Réponse:', {
                _id: loginSafe._id,
                displayName: loginSafe.displayName,
                email: loginSafe.email,
                role: loginSafe.role,
                message: loginSafe.message
            });
        } catch (error) {
            console.log('   Erreur:', error.message);
        }
        console.log('-----------------------------------------\n');
    }
    
    console.log('📋 4. Test Forgot Password (Email non existant)');
    try {
        const result = await sendRequest('POST', '/api/auth/forgot-password', { email: 'nonexistent@example.com' });
        console.log('   Statut:', result.status);
        console.log('   Réponse:', result.data);
    } catch (error) {
        console.log('   Erreur:', error.message);
    }
    console.log('-----------------------------------------\n');
    
    console.log('📋 5. Test Reset Password (OTP invalide)');
    try {
        const result = await sendRequest('POST', '/api/auth/reset-password', {
            email: testEmail,
            otp: '000000',
            newPassword: newPassword
        });
        console.log('   Statut:', result.status);
        const { newPassword: _, ...pwSafe } = result.data || {};
        console.log('   Réponse:', pwSafe);
    } catch (error) {
        console.log('   Erreur:', error.message);
    }
    console.log('-----------------------------------------\n');
    
    console.log('📋 6. Test Reset Password (Email manquant)');
    try {
        const result = await sendRequest('POST', '/api/auth/reset-password', {
            otp: otpCode || '123456',
            newPassword: newPassword
        });
        console.log('   Statut:', result.status);
        const { newPassword: _, ...pwSafe } = result.data || {};
        console.log('   Réponse:', pwSafe);
    } catch (error) {
        console.log('   Erreur:', error.message);
    }
    console.log('-----------------------------------------\n');
    
    console.log('=========================================');
    console.log('         FIN DES TESTS                   ');
    console.log('=========================================');
};

testForgotReset();
