const express = require('express');
const crypto = require('node:crypto');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const {publicKey, privateKey} = crypto.generateKeyPairSync('ml-dsa-65');

//login
app.post('/login', (req, res) => {
    const {username, password} = req.body;

    if(username === 'admin' && password === '123456') {
        const payload = {
            username: username,
            password: password
        };

        const data = Buffer.from(JSON.stringify(payload));
        const signature = crypto.sign(null, data, privateKey);

        res.json({
            payload: payload,
            signature: signature.toString('base64')
        });
    } else {
        res.status(400).send();
    }
});

//verify
app.post('/protected', (req, res) => {
    const {payload, signature} = req.body;

    if (!payload || !signature) {
        return res.status(400).send();
    }

    const dataToVerify = Buffer.from(JSON.stringify(payload));
    const signatureBuffer = Buffer.from(signature, 'base64');

    const isValid = crypto.verify(null, dataToVerify, publicKey, signatureBuffer);

    if (isValid) {
        res.status(200).send("Verified!");
    } else {
        res.status(403).send();
    }
});

app.listen(3000, () => console.log("http://localhost:3000"));

