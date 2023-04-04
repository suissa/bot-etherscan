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

// address do contrato Doric
const address = "0x94b6dAE0E72da0F2f076e44b8B819723Fe1d8a40";
// address do contrato BRZ
const contractAddress = '0x420412e765bfa6d85aaac94b4f7b708c89be2e2b';
let LAST_TRANSACTION = null;
// interval de 1 minuto
setInterval(async () => {
  // busca o saldo do account1
  // axios.get(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=0x4e238622c1797115F35174C50583F5D41b915cb6&tag=latest&apikey=${apiKey}`)
  //   .then(response => {

  axios.get(`https://api.etherscan.io/api?module=account&action=tokentx&address=${contractAddress}&sort=desc&apikey=${apiKey}`)
    .then(async (response) => {
      const lastTx = response.data.result[0];
      console.log(`A última transação foi: ${JSON.stringify(lastTx, null, 2)}`);
      const value = lastTx.value;
      // LAST_TRANSACTION != null && 
      if (LAST_TRANSACTION != null && LAST_TRANSACTION.timeStamp != lastTx.timeStamp) {
        try {
          const erc20 = new ethers.Contract(address, abi, signer);
          console.log(await erc20.symbol());
          const result = await erc20.transfer("0x4e238622c1797115F35174C50583F5D41b915cb6", value);
          console.log(result);
          console.log("account1", await erc20.balanceOf("0x4e238622c1797115F35174C50583F5D41b915cb6"))
          console.log("account2", await erc20.balanceOf("0xa620A5199F498B81191D291c62a70aa761be7536"))
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log('Não houve transação') //, { LAST_TRANSACTION, lastTx });
      }
      LAST_TRANSACTION = lastTx;
    })
    .catch(error => {
      console.log(`Erro ao buscar a última transação: ${error}`);
    });
}, 10 * 1000);
// ;(async () => {
//   try {
//     const erc20 = new ethers.Contract(address, abi, signer);
//     console.log(await erc20.symbol());
//     const result = await erc20.transfer("0x4e238622c1797115F35174C50583F5D41b915cb6", parseEther("10"));
//     console.log(result);
//     console.log("account1", await erc20.balanceOf("0x4e238622c1797115F35174C50583F5D41b915cb6"))
//     console.log("account2", await erc20.balanceOf("0xa620A5199F498B81191D291c62a70aa761be7536"))
//   } catch (error) {
//     console.error(error);
//   }
// })()