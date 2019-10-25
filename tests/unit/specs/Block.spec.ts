import Block from '../../../src/Block';

describe('Tests in block class', () => {
  test('Should instantiate a block by passing values ​​correctly to the constructor', () => {
    const block = new Block(0, '', '');
    expect(block.index).toBe(0);
    expect(block.nonce.toString()).toHaveLength(5);
    expect(block.previousHash).toBe('');
    expect(block.hash.toString()).toHaveLength(64);
    expect(block.data).toBe('');
    expect(block.timestamp).not.toBeNaN();
  });

  test('Should instantiate the genesis block correctly', () => {
    const block = Block.genesis();
    expect(block.index).toBe(0);
    expect(block.nonce.toString()).toHaveLength(5);
    expect(block.previousHash).toBe(
      '0000000000000000000000000000000000000000000000000000000000000000',
    );
    expect(block.hash.toString()).toHaveLength(64);
    expect(block.data).toBe('genesis block');
    expect(block.timestamp).not.toBeNaN();
  });
});
