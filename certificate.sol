// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {

    address public owner;

    mapping(bytes32 => bool) public certificateExists;

    event CertificateAdded(bytes32 certHash);

    constructor() {
        owner = msg.sender;
    }

    function storeCertificate(bytes32 certHash) public {
        require(msg.sender == owner, "Not authorized");
        require(!certificateExists[certHash], "Certificate already exists");

        certificateExists[certHash] = true;
        emit CertificateAdded(certHash);
    }

    function verifyCertificate(bytes32 certHash) public view returns (bool) {
        return certificateExists[certHash];
    }
}
