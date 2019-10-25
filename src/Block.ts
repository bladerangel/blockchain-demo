export default class Block {
  constructor(
    public index: number,
    public nonce: number,
    public previousHash: string,
    public hash: string,
    public data: any,
    public timestamp: number,
  ) {}
}
