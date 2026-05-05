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

const testStudentAuth = async () => {
    console.log('=========================================');
    console.log('    TESTS AUTHENTIFICATION STUDENT      ');
    console.log('=========================================\n');
    
    const testStudent = {
        fullName: 'Ahmed Benali',
        cne: 'A123456789',
        email: 'ahmed.benali@uiz.ac.ma',
        phone: '0612345678',
        filiere: 'Informatique',
        niveau: 'L3',
        password: 'Student@1234'
    };
    
    console.log('📋 1. Test d\'inscription d\'un étudiant');
    console.log('   Données:', testStudent);
    try {
        const registerResult = await sendRequest('POST', '/api/students/register', testStudent);
        console.log('   Statut:', registerResult.status);
        console.log('   Réponse:', registerResult.data);
    } catch (error) {
        console.log('   Erreur:', error.message);
    }
    console.log('-----------------------------------------\n');
    
    console.log('📋 2. Test de connexion étudiant (succès)');
    try {
        const loginResult = await sendRequest('POST', '/api/auth/login', {
            email: testStudent.email,
            password: testStudent.password
        });
        console.log('   Statut:', loginResult.status);
        console.log('   Réponse:', loginResult.data);
    } catch (error) {
        console.log('   Erreur:', error.message);
    }
    console.log('-----------------------------------------\n');
    
    console.log('📋 3. Test de connexion étudiant (mot de passe incorrect)');
    try {
        const loginResult = await sendRequest('POST', '/api/auth/login', {
            email: testStudent.email,
            password: 'WrongPassword123'
        });
        console.log('   Statut:', loginResult.status);
        console.log('   Réponse:', loginResult.data);
    } catch (error) {
        console.log('   Erreur:', error.message);
    }
    console.log('-----------------------------------------\n');
    
    console.log('=========================================');
    console.log('         FIN DES TESTS                   ');
    console.log('=========================================');
};

testStudentAuth();
