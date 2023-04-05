const pkg = require('eth-lightwallet')
const web3 = require('web3')
const { ethers, JsonRpcProvider, parseEther } = require('ethers')
const provider = new JsonRpcProvider(`https://testnet.doric.network/`)
const axios = require('axios');

const apiKey = '7XVPRP4R6VM22S65BCU62TB4Z8F678DZ9Z';
const pk = "dc0c176a2c4f3f5bb4f4eee985f4a8f0503249127fa992138059f9cbfea71681"
const walletJson = new ethers.Wallet(pk);
const signer = walletJson.connect(provider);

// account2 com drc 0xa620A5199F498B81191D291c62a70aa761be7536
// account1 sem drc 0x4e238622c1797115F35174C50583F5D41b915cb6
// A Human-Readable ABI; for interacting with the contract, we
// must include any fragment we wish to use
const abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

const account1 = "0x4e238622c1797115F35174C50583F5D41b915cb6";
const account2 = "0xa620A5199F498B81191D291c62a70aa761be7536"

// address do contrato Doric
const address = "0x61b0c854C60a5577E68be7a40Bc4D61935c1a058"
// const address = "0x94b6dAE0E72da0F2f076e44b8B819723Fe1d8a40";
// address do contrato BRZ
const contractAddress = '0x420412e765bfa6d85aaac94b4f7b708c89be2e2b';
let LAST_TRANSACTION = null;

let tempo = 0;

async function atualizaTempo() {
  // Gera um tempo aleatório entre 1 min e 1 hora
  tempo = Math.floor(Math.random() * (6000000 - 800000 + 1)) + 10000;
  console.log(`\n\n\nAntes: ${new Date()}`);
  console.log(`Próximo intervalo: ${tempo}ms`);
  // Define o próximo intervalo
  setTimeout(atualizaTempo, tempo);
  // Chama o setInterval com o tempo aleatório gerado
  setInterval(() => {
    console.log(`Executando a cada ${tempo}ms`);
  }, tempo);
  console.log(`Depois: ${new Date()}`);

  try {
    const erc20 = new ethers.Contract(address, abi, signer);
    console.log(await erc20.symbol());
    const result = await erc20.transfer(account1, parseEther("10"));
    console.log(result);
    console.log("account1", await erc20.balanceOf(account1))
    console.log("account2", await erc20.balanceOf(account2))
  } catch (error) {
    console.error(error);
  }
}

;(async () => {
  // Inicia o primeiro intervalo aleatório
  atualizaTempo();
})();

// try {
//   const erc20 = new ethers.Contract(address, abi, signer);
//   console.log(await erc20.symbol());
//   const result = await erc20.transfer("0x4e238622c1797115F35174C50583F5D41b915cb6", parseEther("10"));
//   console.log(result);
//   console.log("account1", await erc20.balanceOf("0x4e238622c1797115F35174C50583F5D41b915cb6"))
//   console.log("account2", await erc20.balanceOf("0xa620A5199F498B81191D291c62a70aa761be7536"))
// } catch (error) {
//   console.error(error);
// }
