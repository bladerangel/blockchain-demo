import Block from './Block';
import Utils from './Utils';

export default class Blockchain {
  public blocks: Block[];
  constructor() {
    this.blocks = [this.genesisBlock()];
  }

  genesisBlock(): Block {
    const index = 0;
    const nonce = Utils.generateNonce(10000, 99999);
    const previousHash = '0'.repeat(64);
    const data = 'genesis block';
    const timestamp = Utils.getTimestamp();
    const hash = Utils.calculateHash(
      index,
      nonce,
      previousHash,
      data,
      timestamp,
    );
    return new Block(index, nonce, previousHash, hash, data, timestamp);
  }

  lastBlock(): Block {
    return this.blocks[this.blocks.length - 1];
  }

  addBlock(data: any) {
    /* if (this.isValidNextBlock(newBlock, this.latestBlock)) {*/
    const lastBlock = this.lastBlock();
    const index = lastBlock.index + 1;
    const nonce = Utils.generateNonce(10000, 99999);
    const previousHash = lastBlock.hash;
    const timestamp = Utils.getTimestamp();
    const hash = Utils.calculateHash(
      index,
      nonce,
      previousHash,
      data,
      timestamp,
    );
    this.blocks.push(
      new Block(index, nonce, previousHash, hash, data, timestamp),
    );
    /*} else {
      throw 'Error: Invalid block';
    }*/
  }
  /*
  isValidNextBlock(nextBlock: Block, previousBlock: Block) {
    const nextBlockHash = this.calculateHashForBlock(nextBlock);

    if (previousBlock.index + 1 !== nextBlock.index) {
      return false;
    }
    if (previousBlock.hash !== nextBlock.previousHash) {
      return false;
    }
    if (nextBlockHash !== nextBlock.hash) {
      return false;
    }
    if (!this.isValidHashDifficulty(nextBlockHash)) {
      return false;
    }
    return true;
  }

  isValidChain(chain: Block[]) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    const tempChain = [chain[0]];
    for (let i = 1; i < chain.length; i = i + 1) {
      if (this.isValidNextBlock(chain[i], tempChain[i - 1])) {
        tempChain.push(chain[i]);
      } else {
        return false;
      }
    }
    return true;
  }

  isChainLonger(chain: Block[]) {
    return chain.length > this.blockchain.length;
  }

  replaceChain(newChain: Block[]) {
    if (this.isValidChain(newChain) && this.isChainLonger(newChain)) {
      this.blockchain = JSON.parse(JSON.stringify(newChain));
    } else {
      throw 'Error: invalid chain';
    }
  }*/
}
