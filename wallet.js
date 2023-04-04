const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');
const Wallet = require('ethereumjs-wallet').default;

// Definindo a frase secreta para a seed
const mnemonic = 'vai ralando na boquinha da garrafa';

// Gerando a seed a partir da frase secreta
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Criando o HD Wallet a partir da seed
const hdWallet = hdkey.fromMasterSeed(seed);

// Derivando a chave privada e pública do HD Wallet
const derivedKey = hdWallet.derivePath("m/44'/60'/0'/0/0");
const privateKey = derivedKey.getWallet().getPrivateKeyString();
const address = Wallet.fromPrivateKey(privateKey).getChecksumAddressString();

console.log(`Chave privada: ${privateKey}`);
console.log(`Endereço Ethereum: ${address}`);
