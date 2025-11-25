# PDF_certificate_validation
Upload a certificate and store that in a Blockchain and validate for lifetime. Decentralized application (DApp) built on the Ethereum Sepolia Testnet to store and verify certificate authenticity using blockchain immutability.

# The system works by:

Uploading a PDF certificate
Generating a SHA-256 hash in the browser
Storing that hash on the blockchain (owner-only)
Verifying the hash of any uploaded PDF against the stored records
If the uploaded file's hash matches the blockchain entry → Certificate is VALID
Otherwise → INVALID.

# Features
# SHA-256 Hashing in Browser
No backend server required
Uses crypto.subtle.digest
Ensures data privacy (file never leaves the user’s device)

# PDF Upload Support
Only .pdf files are accepted
Hash field is automatically generated and displayed
Manual hash entry not required

# Blockchain Storage
Owner can store certificate hashes
Prevents duplicates
Immutable record on Ethereum

# Blockchain Verification
Anyone can verify a certificate
Verification uses verifyCertificate(bytes32) view function
No gas required for verification

# Clean Eco-Friendly UI
Two-panel dashboard design
Left panel → Store certificate
Right panel → Verify certificate
Premium green & yellow theme

# MetaMask Integration
Wallet connection required before interacting with the contract
Account switching supported

# Smart Contract
Contract: CertificateRegistry
Network: Ethereum Sepolia
Language: Solidity ^0.8.0

# Setup Instructions
1. Clone or Download
git clone <repository_link>

2. Open the Project

Simply open index.html in any modern browser (Chrome/Brave recommended).

3. Install MetaMask

https://metamask.io/

4. Switch to Sepolia Network

MetaMask → Networks → Select Sepolia

5. Get Sepolia ETH (for storing certificates)

Recommended faucet:
https://faucet.quicknode.com/ethereum/sepolia

6. Update Contract Address + ABI in script.js
Inside script.js:

const contractAddress = "YOUR_SEPOLIA_CONTRACT_ADDRESS";
const abi = [ ... ];

# How to Use
✔ Storing a Certificate
Click Connect MetaMask
Upload the PDF to the left panel
The SHA-256 hash auto-fills

Click Store Certificate
Confirm the transaction in MetaMask

✔ Verifying a Certificate
Upload the PDF to the right panel
Auto-generated hash appears

Click Verify
Result appears as:

VALID CERTIFICATE ✔

INVALID CERTIFICATE ✘

# Important Limitations

Compressed or modified PDFs will generate different hashes.
Even a single-byte change results in a different SHA-256 hash.
Users must upload the original, unmodified PDF issued by the authority.
This behavior is cryptographically correct and expected.
(Advanced solutions like canonicalization, field-based hashing, or QR-code verification can be added later.)

# Future Enhancements

You can extend this DApp with:
QR-based verification
Canonical hashing for compression-tolerant certificates
A backend for storing certificate metadata
On-chain certificate revocation
Certificate ID system
UI redesign with animations
Hosting on GitHub Pages / Netlify
