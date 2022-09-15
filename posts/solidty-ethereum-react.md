---
title: "Solidity & Ethereum in React -1-"
date: 'August 24, 2022'
excerpt: 'Solidityでスマートコントラクトを作ったり、React/Next.jsを使いながらDAppsを作成する'
cover_image: '/images/posts/img4.jpg'
category: 'Solidity'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/women/12.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

Simple Unit Converter：　https://eth-converter.com/

Remix
https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js

user@mbp Solidity % npx create-react-app faucet

user@mbp faucet % npm i truffle -g

user@mbp faucet % truffle init

#### truffle-config.js
~~~
module.exports = {
  networks: {
    development: {
     host: "127.0.0.1", 
     port: 8545,           
     network_id: "*",    
    },
  },
  compilers: {
    solc: {
      version: "0.8.15",  
    }
  },
};
~~~

### スマートコントラクトFaucetを作成
#### #12 Faucet.sol
~~~
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
  // storage variables
  uint public funds = 1000;
  int public counter = -10;
  uint32 public test = 4294967295;
}
~~~

####　#15 Migration

ABI とはapplication binary interface

Faucet.sol(comple)⇨ABI(bytecode)(migrate)⇨Blockchain

```
truffle(development)>truffle compile
```
¥build¥contractsフォルダに以下のようなFaucet.jsonができる
```
{
  "contractName": "Faucet",
  "abi": [
    {
      "inputs": [],
      "name": "numOfFunders",
      "outputs": [
        {
          "internalType": 
```

migrationsフォルダに以下のような新しいファイル(2_faucet_migration.js)を作成してmigrate
```
const FaucetContract = artifacts.require("Faucet")
module.exports = function (deployer) {
  deployer.deploy(FaucetContract)
}
```
```
truffle(development)>truffle migrate
```
```
2_faucet_migration.js
=====================

   Replacing 'Faucet'
   ------------------
   > transaction hash:    0xd26----
   > Blocks: 0            Seconds: 0
   > contract address:    0x252----
   > block number:        93
   > block timestamp:     1661346950
   > account:             0xd0-----
   > balance:             83.73493565879999999
   > gas used:            742818 (0xb55a2)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01485636 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.01485636 ETH
```


~~~
truffle(development)> const instance = await Faucet.deployed()
undefined
truffle(development)> instance
~~~

~~~
   methods: {
      counter: [Function: bound _createTxObject],
      '0x61bc221a': [Function: bound _createTxObject],
      'counter()': [Function: bound _createTxObject],
      funds: [Function: bound _createTxObject],
      '0xc89f2ce4': [Function: bound _createTxObject],
      'funds()': [Function: bound _createTxObject],
      test: [Function: bound _createTxObject],
      '0xf8a8fd6d': [Function: bound _createTxObject],
      'test()': [Function: bound _createTxObject]
    },
~~~

### 21. Access Contract with console
Ganacheのcontracts => Faucet => Storage

consoleでアクセスする
~~~
user@mbp faucet %> truffle console
truffle(development)> const instance = await Faucet.deployed()
truffle(development)> instance
~~~

```
methods: {
    counter: counter()
    funds:  funds()
    test:   test()
}
```

~~~
truffle(development)> const funds = await instance.funds()
undefined
truffle(development)> funds
BN {
  negative: 0,
  words: [ 1000, <1 empty item> ],
  length: 1,
  red: null
}
truffle(development)> funds.toString()
'1000'
~~~

~~~
truffle(development)> const test = await instance.test()
undefined
truffle(development)> test.toString()
'4294967295'
truffle(development)>
~~~

### 22. Web3 Interaction Part
web3.js is a collection of libraries that allow you to interact with a local or remote ethereum node using HTTP, IPC or WebSocket.
[関連サイトのリンク](https://web3js.readthedocs.io/en/v1.7.5/)

~~~
user@mbp faucet % truffle console
truffle(development)> const instance = new web3.eth.Contract(Faucet.abi, "0x2A57664fc40ee2D63720491E4FB82377c155e1e0")
undefined

truffle(development)> const funds = await instance.methods.funds().call()
undefined
truffle(development)> funds
'1000'
~~~

~~~
new web3.eth.Contract(jsonInterface[, address][, options])
~~~

### 24. Recieve Function
~~~
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
    // eth を受けとるファンクション
    recieve() external payable
}
~~~
```
receive()
A contract can now have only one receive function, declared with the syntax: 
receive() external payable {…} (without the function keyword).
It executes on calls to the contract with no data (calldata), 
e.g. calls made via send() or transfer().
The function cannot have arguments, cannot return anything and 
must have external visibility and payable state mutability.
```

### 25. SendTransaction
~~~
user@mbp faucet % truffle console
truffle(development)> accounts
[
  '0xd0F _____________________________1996300',
  '0x0d4B_____________________________7427974',
  '0x0617_____________________________3C203E4',
  '0x5fab_____________________________58f5C98',
  '0x2C74_____________________________2b0dE21',
  '0x30c3_____________________________A9cC9Cf',
  '0xD9c2_____________________________04C5d88',
  '0x4b04_____________________________8DdcA0D',
  '0x15Da_____________________________EbA4f48',
  '0x1Ec0_____________________________2F5C81D'
]
~~~
参考リンク：  
https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#id84

~~~
web3.eth.sendTransaction(transactionObject [, callback])
from - String|Number: The address for the sending account. Uses the web3.eth.defaultAccount property, if not specified.   
       Or an address or index of a local wallet in web3.eth.accounts.wallet.  
to - String: (optional) The destination address of the message, left undefined for a contract-creation transaction.
value - Number|String|BN|BigNumber: (optional) The value transferred for the transaction in wei,   
      also the endowment if it’s a contract-creation transaction.

~~~

Ethereum Unit Converter(wei to eth)    
https://eth-converter.com/ 
~~~
truffle(development)> web3.eth.sendTransaction({from: accounts[0], to: "0x7EFdaf49251a21E2aa86B1bd72196281170c4A91",value: "10000000000000000000"})
~~~

### 28. blockchain link
Blockchain: https://andersbrownworth.com/blockchain/blockchain  
Ganache Contract Faucet のアドレスからバイトコードを取得
~~~
truffle(development)> web3.eth.getCode("0x7EFdaf49251a21E2aa86B1bd72196281170c4A91")
'0x608060405236600a57005b600080fdfea2646970667358221220f2500cc6df5d3c0009f4a4d22b9afba6e3024ce07aad4409c6ca7da872bcd03964736f6c634300080f0033'
~~~

Faucet.
bytecode/ deployedBytecode
~~~
 "bytecode": "0x6080604052348015600f57600080fd5b50604580601d6000396000f3fe608060405236600a57005b600080fdfea2646970667358221220f2500cc6df5d3c0009f4a4d22b9afba6e3024ce07aad4409c6ca7da872bcd03964736f6c634300080f0033",
  "deployedBytecode": "0x608060405236600a57005b600080fdfea2646970667358221220f2500cc6df5d3c0009f4a4d22b9afba6e3024ce07aad4409c6ca7da872bcd03964736f6c634300080f0033",
~~~

### 30. Additional Resouces

// how is Block Header Calculated  
RLP (“recursive length prefix”) encoding is the main serialization format used in Ethereum,
and is used everywhere - for blocks, transactions, account state data and
wire protocol messages.

How header is encoded  
https://ethereum.stackexchange.com/questions/67280/block-header-hash-calculation

Encoder  
https://toolkit.abdk.consulting/ethereum#rlp

About RLP encoding  
https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919

Etherem Live view  
http://ethviewer.live/

bits, bytes, words
https://www.youtube.com/watch?v=Weyv-V8xz0c

EVMs, and Bytecode  
https://www.youtube.com/watch?v=RxL_1AfV7N4

Memory in computer:  
https://www.youtube.com/watch?v=F0Ri2TpRBBg

### 31. add funds
~~~
// ¥contracts¥FaucetContract.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
  receive() external payable {}
  function addFunds() external payable {}
}
~~~
recieve関数はvalueをつけないがaddFunds関数は必要
~~~
user@mbp faucet % truffle migrate --reset
user@mbp faucet % truffle console
truffle(development)> const instance = await Faucet.deployed()
undefined
truffle(development)> instance.addFunds({value: "2000000000000000000"})
~~~

### 32. Call function by its signature
~~~
user@mbp faucet % truffle console
truffle(development)> web3.eth.sendTransaction({from: accounts[0], to: "0x7EFdaf49251a21E2aa86B1bd72196281170c4A91",data: "a26759cb", value: "10000000000000000000"})
~~~
Keccak（ケチャック）-256 はイーサリアムで用いられているハッシュ関数　　
https://emn178.github.io/online-tools/keccak_256
addFunds()を入力するとa26759cbc968c68c5eb5853f763227a619bc9612320b36b21463d21f1dc9ec98  
頭の４バイト："a26759cb"を指定してaddFunc()をコールできる

### 34. Method Calls + JSON RPC
// pure, view - read-only call, no gas fee
// view - it indicates that the function will not alter the storage state in any way  
// pure - even more strict, indicating that it won't even read the storage state  
(例)
function testing() extenal pure returns(uint) {
  return 2 + 2;
}  
// Tansactions (can generate state changes) and require gas fee  
// read-only call, no gas fee
~~~
user@mbp faucet % truffle migrate --reset
user@mbp faucet % truffle console
truffle(development)> const instance = await Faucet.deployed()
undefined
truffle(development)> const result = await instance.testing() 
truffle(development)>result
truffle(development)>result.toSring()
'4'
~~~
// to talk to the node on the network you can make JSON RPC http calls  
Ethereum JSON RPC API 日本語リファレンス  
https://scrapbox.io/sushiether/Ethereum_JSON_RPC_API_%E6%97%A5%E6%9C%AC%E8%AA%9E%E3%83%AA%E3%83%95%E3%82%A1%E3%83%AC%E3%83%B3%E3%82%B9
eth_accounts: クライアントに管理されているアドレスのリストを返します。  
postmanを使う  
POST  http://127.0.0.1:7545  
~~~
{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}
~~~
### 35. Funders
~~~
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
  address[] public funders;
  receive() external payable {}

  function addFunds() external payable {
    funders.push(msg.sender);
  }
}
~~~
~~~
user@mbp faucet % truffle migrate --reset
user@mbp faucet % truffle console
truffle(development)> const instance = await Faucet.deployed()
undefined
truffle(development)> instance.addFunds({value: "200000000000", from: accounts(0)})
truffle(development)> instance.addFunds({value: "200000000000", from: accounts(1)})  
~~~

### 36. Get Funders
~~~
truffle(development)> instance.funders(0)
'0xf8929- - - - - - - - - - - - - - - - 6c6'
truffle(development)> instance.funders(1)
'0x75d78- - - - - - - - - - - - - - - - 7a1'
~~~
fundersを一括で取得するgetAllFunders()
~~~js
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
  address[] public funders;
  receive() external payable {}

  function addFunds() external payable {
    funders.push(msg.sender);
  }
}
 function getAllFunders() external view returns (address[] memory){
    return funders;
  }
~~~
address[]のような配列にはmemoryの型をつける
~~~
user@mbp faucet % truffle migrate --reset
user@mbp faucet % truffle console
truffle(development)> const instance = await Faucet.deployed()
undefined
truffle(development)> instance.addFunds({value: "200000000000", from: accounts(0)})
truffle(development)> instance.addFunds({value: "200000000000", from: accounts(1)})  
truffle(development)>instance.getAllFunders()
[
  '0xf8929- - - - - - - - - - - - - - - - 6c6',
  '0x75d78- - - - - - - - - - - - - - - - 7a1'
]
~~~
### 37. Public vs External
~~~js
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
  address[] public funders;
  receive() external payable {}

  function addFunds() external payable {
    funders.push(msg.sender);
  }
　　　　　　　　　　　　　　　　
 function getAllFunders() public view returns (address[] memory){
    return funders;
  }

  function getFunderAtIndex(uint8 index) external view returns(address){
    address[] memory _funders = getAllFunders();　//
    return _funders[index];
  }
}
~~~
上の例ではgetFunderAtIndex関数がgetAllFunders関数をコールしているが、
同じFaucetの内にある関数を呼ぶ時は呼ばれるgetAllFunders()をexternalではなくpublicにする必要がある externalは外部からのみでpublicは外部と内部の両方から呼ばれる

~~~
user@mbp faucet % truffle migrate --reset
user@mbp faucet % truffle console
truffle(development)> const instance = await Faucet.deployed()
undefined
truffle(development)> instance.addFunds({from: accounts[0], value: "2"})
truffle(development)>instance.addFunds({from: accounts[1], value: "2"})
truffle(development)>instance.getFunderAtIndex(0)
'0xf8929- - - - - - - - - - - - - - - - 6c6'
truffle(development)>instance.getFunderAtIndex(1)
'0x75d78- - - - - - - - - - - - - - - - 7a1'
~~~
### 42. Private & Internal
~~~
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
  address[] internal funders;  // internalに変更
  // private -> can be accessble only when the smart contract
  // internal -> can be accessble within smart contract and also derived smart contract

  receive() external payable {}
        - - - - -
}
~~~
### 45 Funders mapping
~~~js
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {

  uint public numOfFunders;
  mapping(uint => address) private funders;

  receive() external payable {}

  function addFunds() external payable {
    uint index = numOfFunders++;
    funders[index] = msg.sender;
  }
　　　　　　　　　　　　　　　　
  function getFunderAtIndex(uint8 index) external view returns(address){
    return funders[index];
  }
}
~~~
~~~
user@mbp faucet % truffle migrate --reset
user@mbp faucet % truffle console
truffle(development)> const instance = await Faucet.deployed()
undefined
truffle(development)> instance.addFunds({from: accounts[0], value: "200000000"})
truffle(development)>instance.addFunds({from: accounts[1], value: "200000000"})
truffle(development)>instance.getFunderAtIndex(0)
'0xf8929- - - - - - - - - - - - - - - - 6c6'
truffle(development)>instance.getFunderAtIndex(1)
'0x75d78- - - - - - - - - - - - - - - - 7a1'
~~~

### 46 Get all funders
~~~js
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {

  uint public numOfFunders;
  mapping(uint => address) private funders;

  receive() external payable {}

  function addFunds() external payable {
    uint index = numOfFunders++;
    funders[index] = msg.sender;
  }
  // ↓ 追加
  function getAllFunders() external view returns (address[] memory) {
    address[] memory _funders = new address[](numOfFunders);

    for (uint i = 0; i < numOfFunders; i++) {
      _funders[i] = funders[i];
    }

    return _funders;
  }
　　　　　　　　　　　　　　　　
  function getFunderAtIndex(uint8 index) external view returns(address){
    return funders[index];
  }
}
~~~
~~~
user@mbp faucet % truffle migrate --reset
user@mbp faucet % truffle console
truffle(development)> const instance = await Faucet.deployed()
undefined
truffle(development)> instance.addFunds({from: accounts[0], value: "200000000"})
truffle(development)>instance.addFunds({from: accounts[1], value: "200000000"})
truffle(development)>instance.getAllFunders()
[
'0xf8929- - - - - - - - - - - - - - - - 6c6'
'0x75d78- - - - - - - - - - - - - - - - 7a1'
]
~~~
### 47 Prevent duplications


48 lutfunders
~~~
let x = 3;
const y = x++;

console.log(`x:${x}, y:${y}`);
// expected output: "x:4, y:3"

let a = 3;
const b = ++a;


console.log(`a:${a}, b:${b}`);
// expected output: "a:4, b:4"
