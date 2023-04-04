const pkg = require('eth-lightwallet')
const web3 = require('web3')
const { ethers, JsonRpcProvider, parseEther } = require('ethers')
const provider = new JsonRpcProvider(`https://testnet.doric.network/`)
const axios = require('axios');

const apiKey = '7XVPRP4R6VM22S65BCU62TB4Z8F678DZ9Z';
const pk = "dc0c176a2c4f3f5bb4f4eee985f4a8f0503249127fa992138059f9cbfea71681"
const walletJson = new ethers.Wallet(pk);
const signer = walletJson.connect(provider);
const account2 = "0xa620A5199F498B81191D291c62a70aa761be7536"
const account1 = "0x4e238622c1797115F35174C50583F5D41b915cb6"

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

// address do token
const address = "0x94b6dAE0E72da0F2f076e44b8B819723Fe1d8a40";

;(async () => {
  try {
    const erc20 = new ethers.Contract(address, abi, signer);
    console.log(await erc20.symbol());
    console.log("account1", 
      (await erc20.balanceOf(account1)).toString()
    )

    console.log(
      "account2", 
      (await erc20.balanceOf(account2)).toString()
    ) 

  } catch (error) {
    console.error(error);
  }
})()