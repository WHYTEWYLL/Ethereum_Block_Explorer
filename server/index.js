const express = require('express');
const EC = require('elliptic').ec;
const cors = require('cors');
const { Wallet, utils, providers } = require('ethers');


const app = express();
const port = 3042;


// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

app.get('/block/:network', (req, res) =>  {

  const {network} = req.params;
  const provider = new providers.getDefaultProvider(network)
  provider.getBlock('latest').then(elem => {
    result = {
      hash: elem.hash,
      parentHash:elem.parentHash,
      number:elem.number,
      timestamp: new Date(elem.timestamp),
      nonce: elem.nonce.toString() || 0,
      difficulty: elem.difficulty,
      gasLimit: utils.formatEther( elem.gasLimit ),
      gasUsed: utils.formatEther( elem.gasUsed ),
      miner:elem.miner,
      extraData: elem.extraData,
      transactions: elem.transactions.length,
      baseFeePerGas: utils.formatEther( elem.baseFeePerGas) ,
      difficulty: elem.difficulty
    }
    console.log(result)

    res.send(result)
  })

  

})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
