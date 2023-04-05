
const { ethers, JsonRpcProvider, parseEther } = require('ethers')

console.log("10 string", parseEther("10"))
console.log("10 number", parseEther(10..toString()))

const randomValue = (Math.floor(Math.random() * 100)).toString()
console.log("randomValue " + randomValue, parseEther(randomValue))