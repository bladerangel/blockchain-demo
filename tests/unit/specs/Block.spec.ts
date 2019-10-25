import Block from '../../../src/Block';

describe('Tests in block class', () => {
  test('Should instantiate a block by passing values ​​correctly to the constructor', () => {
    const block = new Block(0, 0, '', '', '', 0);
    expect(block.index).toBe(0);
    expect(block.nonce).toBe(0);
    expect(block.previousHash).toBe('');
    expect(block.hash).toBe('');
    expect(block.data).toBe('');
    expect(block.timestamp).toBe(0);
  });
});
