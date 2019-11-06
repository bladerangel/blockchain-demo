import { createHash } from 'crypto';

export default class Utils {
  static generateNonce(minimum: number, maximum: number): number {
    const newMinimum = Math.ceil(minimum);
    const newMaximum = Math.floor(maximum);

    return (
      Math.floor(Math.random() * (newMaximum - newMinimum + 1)) + newMinimum
    );
  }

  static calculateHash(
    index: number,
    nonce: number,
    previousHash: string,
    data: any,
    timestamp: number,
  ): string {
    return createHash('sha256')
      .update(index + nonce + previousHash + data + timestamp)
      .digest('hex');
  }

  static initHash(): string {
    return '0'.repeat(64);
  }

  static getTimestamp(): number {
    return new Date().getTime();
  }
}
