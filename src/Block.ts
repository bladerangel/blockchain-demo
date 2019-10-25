import { createHash } from 'crypto';

export default class Block {
  public nonce: number;
  public hash: string;
  public timestamp: number;
  constructor(
    public index: number,
    public previousHash: string,
    public data: any,
  ) {
    this.timestamp = this.getTimestamp();
    this.nonce = this.generateNonce(10000, 99999);
    this.hash = this.calculateHash();
  }

  static genesis(): Block {
    return new Block(0, '0'.repeat(64), 'genesis block');
  }

  generateNonce(minimum: number, maximum: number): number {
    const newMinimum = Math.ceil(minimum);
    const newMaximum = Math.floor(maximum);

    return (
      Math.floor(Math.random() * (newMaximum - newMinimum + 1)) + newMinimum
    );
  }

  getTimestamp(): number {
    return new Date().getTime();
  }

  calculateHash(): string {
    return createHash('sha256')
      .update(
        this.index + this.nonce + this.previousHash + this.data + this.timestamp,
      )
      .digest('hex');
  }
}
