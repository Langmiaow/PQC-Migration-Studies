const crypto = require('node:crypto');

const { publicKey, privateKey } = crypto.generateKeyPairSync('ml-kem-768');

const { sharedKey, ciphertext } = crypto.encapsulate(publicKey)

console.log("B: ", sharedKey);

const deSharedKey = crypto.decapsulate(privateKey, ciphertext);

console.log("A get from B:", deSharedKey);
