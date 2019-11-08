import Blockchain from '../../../src/Blockchain';
import Utils from '../../../src/Utils';
import Data from '../mocks/Data';

describe('Tests in blockchain class', () => {
  let blockchain: Blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  test('Should start with real genesis block when instantiating blockchain', () => {
    const block = blockchain.chain[0];
    expect(blockchain.chain).toHaveLength(1);
    expect(block.index).toBe(0);
    expect(block.nonce.toString()).toHaveLength(5);
    expect(block.previousHash).toBe(
      '0000000000000000000000000000000000000000000000000000000000000000',
    );
    expect(block.hash).toHaveLength(64);
    expect(block.data).toBe('genesis block');
    expect(block.timestamp).not.toBeNaN();
  });

  describe('Tests in generateNextBlock method', () => {
    test('Should generate next mock block', () => {
      const mockBlock = Data.block();
      const mockGenesisBlock = Data.genesisBlock();
      const spyLastBlock = jest.spyOn(blockchain, 'lastBlock');
      spyLastBlock.mockReturnValueOnce(mockGenesisBlock);
      const spyGenerateNonce = jest.spyOn(Utils, 'generateNonce');
      spyGenerateNonce.mockReturnValueOnce(mockBlock.nonce);
      const spyHash = jest.spyOn(Utils, 'calculateHash');
      spyHash.mockReturnValueOnce(mockBlock.hash);
      const spyGetTimestamp = jest.spyOn(Utils, 'getTimestamp');
      spyGetTimestamp.mockReturnValueOnce(mockBlock.timestamp);

      const nextBlock = blockchain.generateNextBlock(mockBlock.data);
      expect(nextBlock).toEqual(mockBlock);
    });

    test('Should generate next real block', () => {
      const nextBlock = blockchain.generateNextBlock('new block');
      expect(nextBlock.index).toBe(1);
      expect(nextBlock.nonce.toString()).toHaveLength(5);
      expect(nextBlock.previousHash).toHaveLength(64);
      expect(nextBlock.hash).toHaveLength(64);
      expect(nextBlock.data).toBe('new block');
      expect(nextBlock.timestamp).not.toBeNaN();
    });
  });

  describe('Tests in addBlock method', () => {
    test('Should add a new mock block', () => {
      const mockBlock = Data.block();
      blockchain.addBlock(mockBlock);
      expect(blockchain.chain).toHaveLength(2);

      const lastBlock = blockchain.lastBlock();
      expect(lastBlock).toEqual(mockBlock);
    });

    test('Should add a new real block', () => {
      const nextBlock = blockchain.generateNextBlock('new block');
      blockchain.addBlock(nextBlock);
      expect(blockchain.chain).toHaveLength(2);

      const lastBlock = blockchain.lastBlock();
      expect(lastBlock).toEqual(nextBlock);
    });
  });

  describe('Tests in isValidNextBlock method', () => {
    test('Should validate genesis mock block and next mock block', () => {
      const mockGenesisBlock = Data.genesisBlock();
      const mockBlock = Data.block();
      expect(
        blockchain.isValidNextBlock(mockGenesisBlock, mockBlock),
      ).toBeTruthy();
    });

    test('Should validate genesis real block and next real block', () => {
      const genesisBlock = blockchain.lastBlock();
      const nextBlock = blockchain.generateNextBlock('new block');
      expect(blockchain.isValidNextBlock(genesisBlock, nextBlock)).toBeTruthy();
    });

    test('Should not validate genesis mock block and next fail mock block', () => {
      const mockGenesisBlock = Data.genesisBlock();
      const failMockBlock = Data.failBlock();
      expect(
        blockchain.isValidNextBlock(mockGenesisBlock, failMockBlock),
      ).toBeFalsy();
    });

    test('Should not validate genesis real block and next mock block', () => {
      const genesisBlock = blockchain.lastBlock();
      const mockBlock = Data.block();
      expect(blockchain.isValidNextBlock(genesisBlock, mockBlock)).toBeFalsy();
    });
  });

  describe('Tests in mine method', () => {
    test('Should mine the genesis mock block and next real block', () => {
      const mockGenesisBlock = Data.genesisBlock();
      const mockBlock = Data.block();
      const spyGenerateNextBlock = jest.spyOn(blockchain, 'generateNextBlock');
      const spyLastBlock = jest.spyOn(blockchain, 'lastBlock');
      const spyAddBlock = jest.spyOn(blockchain, 'addBlock');
      spyGenerateNextBlock.mockReturnValueOnce(mockBlock);
      spyLastBlock.mockReturnValueOnce(mockGenesisBlock);
      blockchain.mine(mockBlock.data);
      expect(spyAddBlock).toHaveBeenCalled();
    });

    test('Should mine the genesis real block and next real block', () => {
      const spyAddBlock = jest.spyOn(blockchain, 'addBlock');
      blockchain.mine('new block');
      expect(spyAddBlock).toHaveBeenCalled();
    });

    test('Should not mine the genesis mock block and next fail mock block', () => {
      const mockGenesisBlock = Data.genesisBlock();
      const failMockBlock = Data.failBlock();
      const spyGenerateNextBlock = jest.spyOn(blockchain, 'generateNextBlock');
      const spyLastBlock = jest.spyOn(blockchain, 'lastBlock');
      const spyAddBlock = jest.spyOn(blockchain, 'addBlock');
      spyGenerateNextBlock.mockReturnValueOnce(failMockBlock);
      spyLastBlock.mockReturnValueOnce(mockGenesisBlock);
      expect(spyAddBlock).not.toHaveBeenCalled();
      expect(() => {
        blockchain.mine(failMockBlock.data);
      }).toThrow();
    });

    test('Should not mine the genesis real block and next mock block', () => {
      const mockBlock = Data.block();
      const spyAddBlock = jest.spyOn(blockchain, 'addBlock');
      const spyGenerateNextBlock = jest.spyOn(blockchain, 'generateNextBlock');
      spyGenerateNextBlock.mockReturnValueOnce(mockBlock);
      expect(spyAddBlock).not.toHaveBeenCalled();
      expect(() => {
        blockchain.mine(mockBlock.data);
      }).toThrow();
    });
  });

  describe('Tests in isValidChain method', () => {
    test('Should validate mock chain', () => {
      const mockChain = Data.chain();
      expect(blockchain.isValidChain(mockChain)).toBeTruthy();
    });

    test('Should validate real chain', () => {
      blockchain.mine('new block');
      expect(blockchain.isValidChain(blockchain.chain)).toBeTruthy();
    });

    test('Should not validate fail mock chain', () => {
      const failMockChain = Data.failChain();
      expect(blockchain.isValidChain(failMockChain)).toBeFalsy();
    });
  });
});
