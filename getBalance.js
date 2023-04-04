const axios = require('axios');
async function getBalance(address, apiKey) {
  const apiUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
  const response = await axios.get(apiUrl);
  return response.data.result;
}

const address = '0x1234567890123456789012345678901234567890';
const apiKey = 'SUA-CHAVE-DE-API-AQUI';

getBalance(address, apiKey)
  .then(balance => console.log(`O saldo da conta é ${balance}`))
  .catch(error => console.error(error));
