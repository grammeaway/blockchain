const SHA256 = require("crypto-js/sha256");

class Block { 
    constructor(timestamp, data, previousHash = "") { 
        this.index = 0; 
        this.timestamp = timestamp; 
        this.data = data; 
        this.previousHash = previousHash;
        this.nonce = 0;
        
    }

    calculateHash() { 
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString(); 

    }

    mineBlock(difficulty) { 
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) { 
            this.hash = this.calculateHash();
            this.nonce++; 
        }

        console.log("Block mined: " + this.hash);

    }


}



class Blockchain { 
    constructor() { 
        this.chain = [this.createGenesisBlock()]; 
        this.difficulty = 2;

    }
    createGenesisBlock() { 
        return new Block("03/01/2018", "Genesisblock", "0");
    }

    getLatestBlock() { 
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) { 
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.index = this.getLatestBlock().index + 1;
        this.chain.push(newBlock);
        newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
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
console.log("Mining block...")
grammeCoin.addBlock(new Block("03/01/2018", {amount: 10000000}, ));
console.log("Mining block...")
grammeCoin.addBlock(new Block("01/12/2017", {amount: 50000}, ));

