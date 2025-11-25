const contractAddress = "0x5442B3f3ad321EC32473934a2834fF1DcC47E798";

const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "certHash",
				"type": "bytes32"
			}
		],
		"name": "CertificateAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "certHash",
				"type": "bytes32"
			}
		],
		"name": "storeCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "certificateExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "certHash",
				"type": "bytes32"
			}
		],
		"name": "verifyCertificate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


// Web3
let web3;
let contract;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await ethereum.request({ method: "eth_requestAccounts" });

        contract = new web3.eth.Contract(abi, contractAddress);
        alert("Wallet Connected!");
    } else {
        alert("MetaMask not detected!");
    }
}

/* ===================================================================
        SHA-256 PDF HASHING FUNCTIONS
=================================================================== */

async function fileToSHA256(file) {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return "0x" + hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

/* ===================================================================
        STORE PANEL — FILE HANDLER
=================================================================== */
async function handleStoreFile(event) {
    const file = event.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
        alert("Only PDF files are allowed.");
        event.target.value = "";
        return;
    }

    const hash = await fileToSHA256(file);
    document.getElementById("storeHash").value = hash;
}

/* ===================================================================
        VERIFY PANEL — FILE HANDLER
=================================================================== */
async function handleVerifyFile(event) {
    const file = event.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
        alert("Only PDF files are allowed.");
        event.target.value = "";
        return;
    }
    
    const hash = await fileToSHA256(file);
    document.getElementById("verifyHash").value = hash;
}

/* ===================================================================
        Blockchain Interactions
=================================================================== */

async function storeCert() {
    const hash = document.getElementById("storeHash").value;
    if (!hash) { alert("Upload a PDF first."); return; }

    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.storeCertificate(hash).send({ from: accounts[0] });
        alert("Certificate stored successfully!");
    } catch (err) {
        alert("Error: " + err.message);
    }
}

async function verifyCert() {
    const hash = document.getElementById("verifyHash").value;
    if (!hash) { alert("Upload a PDF first."); return; }

    try {
        const result = await contract.methods.verifyCertificate(hash).call();
        document.getElementById("result").innerText =
            result ? "VALID CERTIFICATE ✔" : "INVALID CERTIFICATE ✘";
        document.getElementById("result").className =
            result ? "valid" : "invalid";
    } catch (err) {
        alert("Error: " + err.message);
    }
}
