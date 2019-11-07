import Blockchain from '../../../src/Blockchain';
import Utils from '../../../src/Utils';
import Block from '../../../src/Block';

describe('Tests in blockchain class', () => {
  let blockchain: Blockchain;

  beforeAll(() => {
    blockchain = new Blockchain();
  });

  test('Should start with block genesis when instantiating blockchain', () => {
    const block = blockchain.blocks[0];
    expect(blockchain.blocks).toHaveLength(1);
    expect(block.index).toBe(0);
    expect(block.nonce.toString()).toHaveLength(5);
    expect(block.previousHash).toBe(
      '0000000000000000000000000000000000000000000000000000000000000000',
    );
    expect(block.hash).toHaveLength(64);
    expect(block.data).toBe('genesis block');
    expect(block.timestamp).not.toBeNaN();
  });

  test('Should add a new block', () => {
    const lastBlock = jest.spyOn(Blockchain.prototype, 'lastBlock');
    lastBlock.mockReturnValueOnce(
      new Block(
        0,
        10000,
        '0000000000000000000000000000000000000000000000000000000000000000',
        'b0bd9595c9d97aa4e39ebb977ea4e312afe920af4a32f5cb3468e0146c13c311',
        'genesis block',
        0,
      ),
    );
    const spyGenerateNonce = jest.spyOn(Utils, 'generateNonce');
    spyGenerateNonce.mockReturnValueOnce(10000);
    const spyGetTimestamp = jest.spyOn(Utils, 'getTimestamp');
    spyGetTimestamp.mockReturnValueOnce(0);
    blockchain.addBlock('new block');
    expect(blockchain.blocks).toHaveLength(2);

    const block = blockchain.blocks[1];
    expect(block.index).toBe(1);
    expect(block.nonce).toBe(10000);
    expect(block.previousHash).toBe(blockchain.lastBlock().previousHash);
    expect(block.hash).toBe(
      'c7b1d427475397dc8ed90f5c9a2a3d6d476abbee5ef87f05b6e342f52db2b665',
    );
    expect(block.data).toBe('new block');
    expect(block.timestamp).toBe(0);
  });
});
