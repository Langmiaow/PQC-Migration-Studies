const crypto = require('node:crypto');

const {publicKey, privateKey} = crypto.generateKeyPairSync('ml-dsa-65');

const msg = "Don't cry I am just a fish.";
const data = Buffer.from(msg);

console.log("Generating signature...");
const signature = crypto.sign(null, data, privateKey);
console.log(signature.length);

const isVerified = crypto.verify(null, data, publicKey, signature);
console.log(isVerified ? "pass" : "!!!");