const crypto = require('node:crypto');
const {publicKey, privateKey} = crypto.generateKeyPairSync('ml-dsa-65');
console.log("PQC Key generated.");