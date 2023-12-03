const Wallet = require('ethereumjs-wallet').default;

let crazy = 0

// Generate a new random wallet
const wallet = Wallet.generate();

// Get the private key, public key, and Ethereum address
const privateKey = wallet.getPrivateKeyString();
const publicKey = wallet.getPublicKeyString();
const ethereumAddress = wallet.getAddressString();

console.log('Private Key: ', privateKey);
console.log('Public Key: ', publicKey);
console.log('Ethereum Address: ', ethereumAddress);

while(ethereumAddress != '0xE20106a9e60F311c127410481cF85C1250935A33') {
    console.log('cracking attempt...' + crazy);
    crazy++;
}

console.log('key found')