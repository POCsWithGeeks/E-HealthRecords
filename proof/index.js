const express = require("express");
const app = express();
const fs = require("fs");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
var ipfsAPI = require("ipfs-api");

// connect to ipfs daemon API server
var ipfs = ipfsAPI("ipfs.infura.io", "5001", { protocol: "https" });
const Web3 = require("web3");

// const web3 = new Web3("http://localhost:8545");
const web3 = new Web3(
  "https://ropsten.infura.io/v3/126f0ae333e84292a85b7fb7ebc77d19"
);

const account = "0x55B855dBf812Fda67A074b8c263a175AD8E35F3d";

//hidestream;
var pkey = "28d35e098da1a7641ff2e00a5708ca419bb8f95212bf904aa73c0df33cb90e0f";

const contractAddress = "0x8aff03713269D9b09ABa84f137826aCF480b8b9f";

const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_word",
        type: "string",
      },
    ],
    name: "setWord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getWord",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

var myContract = new web3.eth.Contract(abi, contractAddress);

// console.log(ipfs);

app.get("/", function (req, res) {
  //   res.send('Hello World')
  //res.send("Ipfs + infura ");
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/profile", upload.single("avatar"), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  var data = new Buffer(fs.readFileSync(req.file.path));
  ipfs.files.add(data, function (err, res1) {
    console.log(res1);
    var encodedData = myContract.methods.setWord(res1[0].hash).encodeABI();
    console.log(encodedData);

    let transactionObject = {
      gas: "470000",
      data: encodedData,
      from: account,
      to: contractAddress,
    };

    web3.eth.accounts.signTransaction(transactionObject, pkey, function (
      err,
      trans
    ) {
      if (err) {
        console.log(err);
      }
      console.log(trans);
      web3.eth
        .sendSignedTransaction(trans.rawTransaction)
        .on("receipt", function (result) {
          console.log(receipt);
          res.send(res1);
        });
    });
  });
  // res.send(req.file);
});
app.get("/download", function (req, res) {
  myContract.methods
    .getWord()
    .call({ from: account })
    .then(function (result) {
      console.log(result);
      // res.send(result);
      res.redirect("https://ipfs.io/ipfs/" + result);
    });
});
app.listen(3001);
