# Demos related to PQC
> Latest update: 2026-04-14

## Library Research
| Library | Current status | Comment |
| :--- | :--- | :--- |
| oqs-node [^1]| Renamed to `liboqs-js` | Fully developed and supports various algorithms. However, it is built with C, which might not be the priority option for Web projects due to the performance reduction and deployment complexity.
| pqc.js [^2] | Last updated 4 years ago | Not recommended, as it likely hasn't caught up with the latest NIST finalized standards.
| crystals-kyber-js [^3] | May become deprecated by `mlkem` in the near future. | Only supports ML-KEM (encryption). Not suitable for the digital signature requirements of the login demo.

The newer Node.js version ( v25.9.0 ) offers native PQC support via OpenSSL 3.5 now, [^4] which is used by this demo.

```javascript
const crypto = require('node:crypto');
const {publicKey, privateKey} = crypto.generateKeyPairSync('ml-dsa-65');
console.log("PQC Key generated.")
```

## Demo Usage
`ML-DSA-demo.js` provides a back-end service to handle login request and signature verification.

Run:
```
node ML-DSA-demo.js
```
The server will run at `localhost:3000`.

---

`ML-DSA-demo.html` is a simple screen shows the login and the verification flow.

1. Open it with brower then enter the user details:

        Username: admin

        Password: 123456

2. Click on Login button, then the signature will display on the below textfield.
   
Note that changing any of the content in user details or signature will cause a failure of verification.

---
`ML-KEM-demo.js` demonsrates the **Key Encapsulation Mechanism**. Bob uses Alice's public key to encapulate a `sharedKey`, resulting in a `chiphertext`. Alice then uses her private key to decapulate the `ciphertext` and retrieve the exact same `sharedKey`.

## Observation
**Big but Fast**: A standard RSA-2048 signature is about 256 bytes. In contrast, the ML-DSA-65 signature is approximately 3,300 bytes, which is over 10 times larger. This may be in risk oversizing some http header limitations. Despite its huge size, the mathematical operations are very fast - no noticeable latency. 
 




[^1]: https://github.com/open-quantum-safe/liboqs-js
[^2]: https://github.com/Dashlane/pqc.js/
[^3]: https://github.com/dajiaji/crystals-kyber-js
[^4]: https://nodejs.org/api/crypto.html#asymmetric-key-types

