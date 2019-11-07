import Blockchain from '../../../src/Blockchain';
import Block from '../../../src/Block';

describe('Tests in blockchain class', () => {
  let blockchain: Blockchain;

  beforeEach(() => {
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
    blockchain.addBlock(new Block(0, 0, '', '', '', 0));
    expect(blockchain.blocks).toHaveLength(2);

    const block = blockchain.lastBlock();
    expect(block.index).toBe(0);
    expect(block.nonce).toBe(0);
    expect(block.previousHash).toBe('');
    expect(block.hash).toBe('');
    expect(block.data).toBe('');
    expect(block.timestamp).toBe(0);
  });

  describe('Tests in isValidNextBlock method', () => {
    test('Should validate next block', () => {
      const genesisBlock = blockchain.lastBlock();
      blockchain.addBlock(blockchain.generateNextBlock('new block'));
      expect(
        blockchain.isValidNextBlock(genesisBlock, blockchain.lastBlock()),
      ).toBeTruthy();
    });

    test('Should not validate next block', () => {
      const genesisBlock = blockchain.lastBlock();
      blockchain.addBlock(new Block(0, 0, 'new block', '', '', 0));
      expect(
        blockchain.isValidNextBlock(genesisBlock, blockchain.lastBlock()),
      ).toBeFalsy();
    });
  });

  describe('Tests in mine method', () => {
    test('Should mine the next block', () => {
      const spyAddBlock = jest.spyOn(blockchain, 'addBlock');
      blockchain.mine('new block');
      expect(spyAddBlock).toHaveBeenCalled();
    });

    test('Should not mine the next block', () => {
      const spyAddBlock = jest.spyOn(blockchain, 'addBlock');
      const spyGenerateNextBlock = jest.spyOn(blockchain, 'generateNextBlock');
      spyGenerateNextBlock.mockReturnValueOnce(
        new Block(0, 0, 'new block', '', '', 0),
      );
      expect(spyAddBlock).not.toHaveBeenCalled();
      expect(() => {
        blockchain.mine('new block');
      }).toThrow();
    });
  });
});
