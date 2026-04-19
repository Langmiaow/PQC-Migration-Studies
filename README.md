# PQC Migration Studies
> Latest update: 2026-04-19

## What is post-quantum cryptography and why do we need it?

### 1.1 Basic definition
**Post-Quantum Cryptography (PQC)** is a field of research aiming to develop counter-strategies against the potential threat to current encryption algorithms posed by future quantum computers. [^1]

### 1.2 Why do we need it?
Nowadays, the reason why many encryption algorithms (such as **RSA**) are effective is that conventional computers have difficulty handling ematical problems like **Prime factorization**. For a large enough number, it is estimated that a classical computer would need billions of years to find the factors.

However, quantum computers use a different logic. Once they have sufficient capability, they will be able to leverages **quantum superposition** to solve specific mathematical problems (like prime factorization) exponentially faster than classical enumeration. This dramatically reduces the total time taken to break encryption. [^2]

To avoid a huge amount of information being exposed by quantum computers, the worldwide community has to start retiring current encryption algorithms now, because the migration needs years of time. [^3] [^4]

## How many types of PQC schemes and which of them are standardised?

### 2.1 Types of PQC schemes
While there are many types of math being researched, NIST has focused on two families that are strong enough to resist quantum computers (and also conventional computers). They are:

**Structured lattices** and **Hash functions** [^5]

### 2.2 Standardised PQC schemes
According to the latest NIST announcement (Aug 2024), there are three finalized standards and one in draft: [^7]

1. **ML-KEM** (Module-Lattice-Based Key-Encapsulation Mechanism) [^8] - Used for General Encryption. Formerly known as CRYSTALS-Kyber.
2. **ML-DSA** (Module-Lattice-Based Digital Signature Algorithm) [^9] - Formerly known as CRYSTALS-Dilithium .
3. **SLH-DSA** (Stateless Hash-Based Digital Signature Algorithm) [^10] - Formerly known as SPHINCS+.
4. **FN-DSA** (Falcon) - Currently in draft (early 2026). It was originally planned for late 2024, but due to its complex floating-point implementation, it is still under review. [^11]

## What companies/organisations have implemented PQC schemes and what libraries/open sources of PQC schemes?

### PQC scheme implementations
The industry has largely adopted a "Hybrid Approach", combining classical algorithms with PQC to ensure security even if one algorithm fails.

* **Apple (iMessage PQ3)**: In 2024, Apple launched the PQ3 protocol, making the most significant deployment of PQC in messaging history. It provides "Level 3" security by not only using PQC for the initial handshake but also periodically re-keying the conversation. [^12]
![PQC in messaging Apps](https://security.apple.com/assets/image/generated/xlarge_quantum_security_messaging_apps_LightMode.png)

* **Google (Chrome & Android)**: Google has enabled [ML-KEM](#22-standardised-pqc-schemes) by default in Chrome for TLS 1.3 and QUIC connections. [^13]

* **Cloudflare**: As a major web infrastructure provider, Cloudflare has enabled PQC support across its entire global network. Any website using Cloudflare can now use PQC for its key exchange, making it the largest-scale deployment for web-based PQC. [^14]
![](https://cf-assets.www.cloudflare.com/zkvhlag99gkb/6oRJ1q0ib6rCSfgBJPJyuU/8e2847b56b058eb6267d1b9303a74883/image1-40.png)

### Library/Open sources of PQC schemes
For developers and researchers, several open-source libraries provide standardized implementations of NIST-approved PQC algorithms:

* **liboqs (Open Quantum Safe)**: An open-source project that aims to support the transition to quantum-resistant cryptography. [^15]

* **PQ Code Package**: A collection of open source projects aiming to build high-assurance software implementations of standards-track post-quantum cryptography algorithms. [^16]

## Library Research
| Library | Current status | Comment |
| :--- | :--- | :--- |
| oqs-node [^17]| Renamed to `liboqs-js` | Fully developed and supports various algorithms. However, it is built with C, which might not be the priority option for Web projects due to the overhead of native bindings and deployment complexity.
| pqc.js [^18] | Last updated 4 years ago | Not recommended, as it likely hasn't caught up with the latest NIST finalized standards.
| crystals-kyber-js [^19] | May become deprecated by `mlkem` in the near future. | Only supports ML-KEM (encryption). Not suitable for the digital signature requirements of the login demo.

The newer Node.js version ( v25.9.0 ) offers native PQC support via OpenSSL 3.5 now, [^20] which is used by this demo.

## Demo Usage
`DSA-demo.js` provides a back-end service to handle login request and signature verification.
It now supports switching between ML-DSA and SLH-DSA.

Run:
```
node ML-DSA-demo.js
```
The server will run at `localhost:3000`.

---

`DSA-demo.html` demonstrates a login and the verification flow.

1. Open it with brower then enter the user details:

        Username: admin

        Password: 123456

2. Select an algorithm between **ML-DSA** (Lattice-based) or **SLH-DSA** (Hash-based).
3. Click the **Login** button to generate signature. The PQC signature will be displayed in the signature card, and the actual byte size will appear in the status section.
4. Click the **Verify** button. The client will send the payload and signature back to the server for validation. 
   
Note that the signature field is editable, changing any of the content in user details or signature will cause a failure of verification.

---
`ML-KEM-demo.js` demonsrates the **Key Encapsulation Mechanism**. Bob uses Alice's public key to encapulate a `sharedKey`, resulting in a `ciphertext`. Alice then uses her private key to decapsulate the `ciphertext` and retrieve the exact same `sharedKey`.

## Observation
**Big but Fast**: A standard RSA-2048 signature is about 256 bytes. In contrast, the ML-DSA-65 signature is approximately 3,300 bytes, which is over 10 times larger. This poses a risk of exceeding standard HTTP header size limits. Despite its huge size, the mathematical operations are very fast - no noticeable latency. 
 



[^1]: https://www.nist.gov/cybersecurity-and-privacy/what-post-quantum-cryptography#what-is-quantum-computing
[^2]: https://www.nist.gov/cybersecurity-and-privacy/what-post-quantum-cryptography#how-does-current-cryptography-work-and-how-would-a-quantum-compu
[^3]: https://www.nist.gov/cybersecurity-and-privacy/what-post-quantum-cryptography#why-do-we-need-post-quantum-encryption-and-how-will-pqc-algorith
[^4]: https://www.nist.gov/cybersecurity-and-privacy/what-post-quantum-cryptography#if-cryptographically-relevant-quantum-computers-don%E2%80%99t-exist-yet
[^5]: https://www.nist.gov/cybersecurity-and-privacy/what-post-quantum-cryptography#why-do-we-need-post-quantum-encryption-and-how-will-pqc-algorith
[^6]: https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards#more-details-on-the-new-standards
[^7]: https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards#more-details-on-the-new-standards
[^8]: https://csrc.nist.gov/pubs/fips/203/final
[^9]: https://csrc.nist.gov/pubs/fips/204/final
[^10]: https://csrc.nist.gov/pubs/fips/205/final
[^11]: https://csrc.nist.gov/csrc/media/presentations/2025/fips-206-fn-dsa-(falcon)/images-media/fips_206-perlner_2.1.pdf
[^12]: https://security.apple.com/blog/imessage-pq3/
[^13]: https://blog.chromium.org/2023/08/protecting-chrome-traffic-with-hybrid.html
[^14]: https://blog.cloudflare.com/post-quantum-cryptography-ga/
[^15]: https://openquantumsafe.org/
[^16]: https://github.com/pq-code-package
[^17]: https://github.com/open-quantum-safe/liboqs-js
[^18]: https://github.com/Dashlane/pqc.js/
[^19]: https://github.com/dajiaji/crystals-kyber-js
[^20]: https://nodejs.org/api/crypto.html#asymmetric-key-types

