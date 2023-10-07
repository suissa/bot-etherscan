const pkg = require('eth-lightwallet')
const web3 = require('web3')
const { ethers, JsonRpcProvider, parseEther } = require('ethers')
const provider = new JsonRpcProvider(`https://testnet.doric.network/`)
const axios = require('axios');

const apiKey = '7XVPRP4R6VM22S65BCU62TB4Z8F678DZ9Z';
const pk1 = "14c16c6e97885e553482d63fb3365ad96e0727b6bedd12362b8c691162532637"
const pk2 = "dc0c176a2c4f3f5bb4f4eee985f4a8f0503249127fa992138059f9cbfea71681"
const pk3 = "77ce064ff06cb6940f1c3c3d669dea632e60a3c5326faa40b689071b8c1aada8"
const pk4 = "b158501c9c184ab1bae36b9ed8804a1454ccb572673a7e8aa9f60723b9a56831"
const pk5 = "13387760062579904ee300e4dd9ea4d7d0891eca97cfa121c7cdfe8a94be88c3"
const pk6 = "7d6cbc3557ffbe76562afabf0e4491f664b666caf317ccf2ed1efa69afa77d77"
const pk7 = "dfe096cdfca00eabb1b237b2c4a171fa6c8fc5b93b2dd710390e8c1cce402cb9"
const pk8 = "4de6a329367ceb439d2a75d126704b9db617cde3ffc1f367865121176ffc6130"
const pk9 = "fdb960989f0a489a85831eda3cb1d82de1e9a32d3d7440369a2dfa33b6561d41"
const pk10 = "b46f8d3b04ad863d8206aec58189c35f10f4e2fcf15ac32e449890fb2ab6e62e"
const pk11 = "a62d6bdeadbded5dd158ec0bd8a6e39f32374271edc760430556f554e0f75c21"
const pk12 = "646e66d04b2bfa2c963b49a892ebbb4a14d26228e4bb8e07d753d5e97e2e2d09"
const pk13 = "7711c15dea3608feaa69fd272e33fa40c39d6fa3de3e19accd2a03660d56832f"


const walletJson = new ethers.Wallet(pk1);
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
const account3 = "0x5ae5A8e28ddf739C92d2A23Fd97A9FE2454f6d79"
const account4 = ""
const account5 = ""
const account6 = ""
const account7 = ""
const account8 = ""
const account9 = ""
const account10 = ""
const account11 = ""
const account12 = ""
const account13 = ""

// address do contrato Doric
// const address = "0x61b0c854C60a5577E68be7a40Bc4D61935c1a058"
const token01 = "0x21Ec14ecAA44A036132Ea6A267B4963D41D8E9D6"
const token02 = "0xb386f940ddbB9CBB0aa909bc34325b13F5E4eAb9"
const token03 = "0x8Ad80085ec08CceDB99CDb1986BcbD72d1Ef6cc0"
const token04 = "0xB38013EB44D6496D50Abbf266c39b16761b7ba52"
const token05 = "0xcB7d6CfFb8A10156Ee533A46a2D75AD9d3425c9E"
const token06 = "0xdB4029Eabe19C2ED45257D6df2b158aA8B55096c"
const token07 = "0xDd84078531bcb4788Acf25bBD60FC900C990827b"
const tokenAddresses = [
  token01, token02, token03, token04, token05, token06, token07
]
// const address = "0x94b6dAE0E72da0F2f076e44b8B819723Fe1d8a40";
// address do contrato BRZ
const contractAddress = '0x420412e765bfa6d85aaac94b4f7b708c89be2e2b';
let LAST_TRANSACTION = null;

let tempo = 0;

async function atualizaTempo() {
  // Gera um tempo aleatório entre 1 min e 1 hora
  tempo = Math.floor(Math.random() * (259200000 - 800000 + 1)) + 10000;
  // tempo = Math.floor(Math.random() * (1000000 - 300000 + 1)) // + 10000;
  // tempo = Math.floor(Math.random() * (60000 - 20000 + 1)) // + 10000;
  console.log(`\n\n\nAntes: ${new Date()}`);
  console.log(`Próximo intervalo: ${tempo / 1000}s`);
  // Define o próximo intervalo
  setTimeout(atualizaTempo, tempo);
  // Chama o setInterval com o tempo aleatório gerado
  setInterval(() => {
    // console.log(`Executando a cada ${tempo}ms`);
  }, tempo);
  console.log(`Depois rodo o bot: ${new Date()}`);

  try {
    const randomAddress = tokenAddresses[Math.floor(Math.random() * tokenAddresses.length)];
    const erc20 = new ethers.Contract(randomAddress, abi, signer);
    console.log(await erc20.symbol());
    const randomValue = (Math.floor(Math.random() * 100) + 1).toString()
    console.log({randomValue});
    const quantity = parseEther(randomValue);
    const result = await erc20.transfer(account2, quantity);
    console.log(result, new Date());
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
