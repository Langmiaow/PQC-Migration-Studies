# Demos related to PQC
> by Xicheng Yang | Latest updated: 2026-04-14

## Libraries research
### oqs-node
| Library | Current status | Comment |
| :--- | :--- | :--- |
| oqs-node [^1]| Renamed to `liboqs-js` | Fully developed and supports various of algorithms. However, it is built with C, which might not be the priority option for Web projects due to the performance reduction and deployment complexity.
| pqc.js [^2] | Last updated 4 years ago | Not recommended, as it likely hasn't caught up with the latest NIST finalized standards.
| crystals-kyber-js [^3] | May become deprecated by `mlkem` in the near future. | Only supports ML-KEM (encryption). No suitable for the digital signature requirements of the login demo.

The newer Node.js version ( v25.9.0 ) offers native PQC support now. [^4]

```javascript
const crypto = require('node:crypto');
const {publicKey, privateKey} = crypto.generateKeyPairSync('ml-dsa-65');
console.log("PQC Key generated.")
```





[^1]: https://github.com/open-quantum-safe/liboqs-js
[^2]: https://github.com/Dashlane/pqc.js/
[^3]: https://github.com/dajiaji/crystals-kyber-js
[^4]: https://nodejs.org/api/crypto.html#asymmetric-key-types

