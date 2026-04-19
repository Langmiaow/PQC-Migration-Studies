const crypto = require('node:crypto');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

var storedPublicKey = '';

app.post('/login', (req, res) => {
    const { username, password, algorithm } = req.body;

    if (username === 'admin' && password === '123456') {
        const payload = {
            username: username,
            password: password
        };
        const data = Buffer.from(JSON.stringify(payload));

        if (algorithm === 'ml') {
            const { publicKey, privateKey } = crypto.generateKeyPairSync('ml-dsa-65');
            storedPublicKey = publicKey;
            const signature = crypto.sign(null, data, privateKey);

            res.json({
                payload: payload,
                signature: signature.toString('base64')
            });
        } else if (algorithm === 'slh') {
            const { publicKey, privateKey } = crypto.generateKeyPairSync('slh-dsa-sha2-128s');
            storedPublicKey = publicKey;
            const signature = crypto.sign(null, data, privateKey);

            res.json({
                payload: payload,
                signature: signature.toString('base64')
            }).send();
        } else res.status(204).send();
    }



});

app.post('/protected', (req, res) => {
    const { payload, signature } = req.body;

    if (!payload || !signature) {
        return res.status(400).send();
    }

    const dataToVerify = Buffer.from(JSON.stringify(payload));
    const signatureBuffer = Buffer.from(signature, 'base64');

    const isValid = crypto.verify(null, dataToVerify, storedPublicKey, signatureBuffer);

    if (isValid) {
        res.status(200).send("Verified!");
    } else {
        res.status(403).send();
    }
});

app.listen(3000, () => console.log("http://localhost:3000"));