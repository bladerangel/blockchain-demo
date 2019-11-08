import Block from './Block';
import Utils from './Utils';

export default class Blockchain {
  public chain: Block[];
  constructor() {
    this.chain = [this.genesisBlock()];
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
    return this.chain[this.chain.length - 1];
  }

  generateNextBlock(data: any): Block {
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
    return new Block(index, nonce, previousHash, hash, data, timestamp);
  }

  addBlock(block: Block) {
    this.chain.push(block);
  }

  isValidNextBlock(previousBlock: Block, nextBlock: Block) {
    const { index, previousHash, timestamp, data, nonce } = nextBlock;
    const nextBlockHash = Utils.calculateHash(
      index,
      nonce,
      previousHash,
      data,
      timestamp,
    );

    if (
      previousBlock.index + 1 === nextBlock.index &&
      previousBlock.hash === nextBlock.previousHash &&
      nextBlockHash === nextBlock.hash
    ) {
      return true;
    }
    return false;
  }

  mine(data: any) {
    const nextBlock = this.generateNextBlock(data);
    if (this.isValidNextBlock(this.lastBlock(), nextBlock)) {
      this.addBlock(nextBlock);
    } else {
      throw 'Error: Invalid block';
    }
  }

  isValidChain(chain: Block[]) {
    return chain.some((block, index, blocks) => {
      if (blocks.length !== index + 1) {
        return this.isValidNextBlock(block, blocks[index + 1]);
      }
    });
  }
}
