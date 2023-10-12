const fs = require('fs');
const pkg = require('eth-lightwallet')
const web3 = require('web3')
const { ethers, JsonRpcProvider, parseEther } = require('ethers')
const provider = new JsonRpcProvider(`https://mainnet.doric.network/`)
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

// console.log(ethers)
// return false;

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
const account4 = "0x156d7932d31C6EeF341eb628792b638e87DEC345"
const account5 = "0xB5cF1B966B741Bd3b78bD615932978797DD66Bd3"
const account6 = "0x4d4646ccAB43aC52DB1f867463301001d12DC8F4"
const account7 = "0x34a6650dd7D18C26528839D5FF3272B10D00AdF5"
const account8 = "0xB60733caD7A1830155C4e2b6Dd8b1443C365f2b7"
const account9 = "0xdC52cC72526F508b0723430E1954dAE297B7840A"
const account10 = "0x1eeC3353c83B5CB3bE2b288A45c5655bA6b46AfA"
const account11 = "0x71236D3087B102c11Bdd96Ae9B2061A7a2a7CB1A"
const account12 = "0x71236D3087B102c11Bdd96Ae9B2061A7a2a7CB1A"
const account13 = "0x746d140b7eF4016Cf2b7C451b0477254ef59bE74"

const accounts = [
  account2,
  account3,
  account4,
  account5,
  account6,
  account7,
  account8,
  account9,
  account10,
  account11,
  account12,
  account13
]



const tokens = require('./tokens.escolhidos.2.json')
const tokenAddresses = tokens.map(t => t.address);

// const address = "0x94b6dAE0E72da0F2f076e44b8B819723Fe1d8a40";
// address do contrato BRZ
const contractAddress = '0x420412e765bfa6d85aaac94b4f7b708c89be2e2b';
let LAST_TRANSACTION = null;

let tempo = 0;
let data = tokens;

function readJSONFile(filename) {
  try {
      const data = fs.readFileSync(filename, 'utf8');
      const parsedData = JSON.parse(data);
      return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
      return [];
  }
}
function customStringify(obj) {
  let jsonString = '{';
  for (const [key, value] of Object.entries(obj)) {
    jsonString += `"${key}": `;
    if (typeof value === 'bigint') {
      jsonString += `"${value.toString()}",`;
    } else {
      jsonString += `${JSON.stringify(value)},`;
    }
  }
  jsonString = jsonString.slice(0, -1); // Remove a última vírgula
  jsonString += '}';
  return jsonString;
}
function replacer(key, value) {
  if (typeof value === 'bigint') {
    return value.toString() + 'n'; // Adiciona um 'n' para indicar que é um BigInt
  }
  return value;
}


async function writeJSON(result, filename = 'resultado.mainnet.json') {
  const currentData = readJSONFile(filename);
  currentData.push(result);

  fs.writeFileSync(filename, JSON.stringify(currentData, replacer, 2));
}



async function atualizaTempo() {
  // Gera um tempo aleatório entre 30s (30000ms) e 40s (40000ms)
  // tempo = Math.floor(Math.random() * (1200000 - 30000 + 1)) + 30000;
  tempo = 5 * 60 * 1000;
  console.log(`\n\n\nAntes: ${new Date()}`);
  console.log(`Próximo intervalo: ${tempo / 1000}s`);
  // Define o próximo intervalo
  setTimeout(atualizaTempo, tempo);
  // Chama o setInterval com o tempo aleatório gerado
  setInterval(() => {
    // console.log(`Executando a cada ${tempo}ms`);
  }, tempo);

  try {
    const randomAddress = tokenAddresses[Math.floor(Math.random() * tokenAddresses.length)];
    const randomAccount = accounts[Math.floor(Math.random() * accounts.length)];

    const erc20 = new ethers.Contract(randomAddress, abi, signer);
    const symbol = await erc20.symbol();
    console.log("\n\n\n\n\n\n", {symbol});

    const balance = await erc20.balanceOf(account1);
    console.log("Saldo da account1 em tokens: ", ethers.formatUnits(balance, 'wei'));  // ou use a quantidade de casas decimais do token


    const randomValue = (Math.floor(Math.random() * 100) + 1).toString()
    console.log({randomValue});
    const quantity = parseEther(randomValue);

    const nextNonce = await provider.getTransactionCount(account1, 'latest');
    console.log("nextNonce", nextNonce);
    
    const gasPrice = ethers.parseUnits("10", "gwei");
    console.log("gasPrice", gasPrice);
    
    const result = await erc20.transfer(account2, quantity, { nonce: nextNonce, gasPrice: gasPrice });
    console.log("\n\n\n", result, new Date());
    console.log("\n\n\n", result.hash);

    const JSON = {
      symbol,
      balance,
      address: randomAddress,
      transactionHash: result.hash,
      "from": account1,
      "to": randomAccount,
      "value": randomValue,
      "gas": "0x76c0",
      "gasPrice": "1000 gwei",
      "nonce": nextNonce,
      "data": result,
      "timestamp": Date.now()
    }
    console.log("account1", await erc20.balanceOf(account1))
    console.log("account2", await erc20.balanceOf(account2))

    console.log(`Depois rodo o bot: ${new Date()}`);
    writeJSON(JSON); 
    return result;
  } catch (error) {
      console.error(error);
  }  // Chamar a função para escrever o resultado em um arquivo JSON.
}


;(async () => {
  // Inicia o primeiro intervalo aleatório
  atualizaTempo();
})();
