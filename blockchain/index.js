const SHA256 = require("crypto-js/sha256");

class Block { 
    constructor(timestamp, data, previousHash = "") { 
        this.index = 0; 
        this.timestamp = timestamp; 
        this.data = data; 
        this.previousHash = previousHash;
        
    }

    calculateHash() { 
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString(); 

    }


}

class Blockchain { 
    constructor() { 
        this.chain = [this.createGenesisBlock()]; 

    }
    createGenesisBlock() { 
        return new Block("03/01/2018", "Initital block", "0");
    }

    getLatestBlock() { 
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) { 
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.index = this.getLatestBlock().index + 1;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() { 
        for ( let i = 1; i < this.chain.length; i++) { 
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1]; 

            if (currentBlock.hash !== currentBlock.calculateHash()) { 
              
                return false;
                
            }

            if(currentBlock.previousHash !== previousBlock.hash) { 
               
                return false;
                
            }
        }
        return true; 
    }

}

let grammeCoin = new Blockchain();
grammeCoin.addBlock(new Block("03/01/2018", {amount: 10000000}, ));
grammeCoin.addBlock(new Block("01/12/2017", {amount: 50000}, ));

console.log(JSON.stringify(grammeCoin, null, 4));

console.log("Is chain valid?" + grammeCoin.isChainValid());

grammeCoin.chain[1].data = {amount: 10};

console.log("Is chain valid?" + grammeCoin.isChainValid());