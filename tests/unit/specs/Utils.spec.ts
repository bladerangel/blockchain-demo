import Utils from '../../../src/Utils';

describe('Tests in blockchain class', () => {
  describe('Tests in generateNonce method', () => {
    test('Should generate a nonce number 10000', () => {
      const spyRandom = jest.spyOn(Math, 'random');
      spyRandom.mockReturnValueOnce(0);
      const nonce = Utils.generateNonce(10000, 99999);
      expect(nonce).toBe(10000);
    });

    test('Should generate a nonce number 99999', () => {
      const spyRandom = jest.spyOn(Math, 'random');
      spyRandom.mockReturnValueOnce(0.99999);
      const nonce = Utils.generateNonce(10000, 99999);
      expect(nonce).toBe(99999);
    });

    test('Should generate a nonce number 55000', () => {
      const spyRandom = jest.spyOn(Math, 'random');
      spyRandom.mockReturnValueOnce(0.5);
      const nonce = Utils.generateNonce(10000, 99999);
      expect(nonce).toBe(55000);
    });
  });

  test('Should calculate valid hash', () => {
    const spyRandom = jest.spyOn(Math, 'random');
    spyRandom.mockReturnValueOnce(0);
    const spyGetTimestamp = jest.spyOn(Utils, 'getTimestamp');
    spyGetTimestamp.mockReturnValueOnce(0);
    const nonce = Utils.generateNonce(10000, 99999);
    const hash = Utils.calculateHash(
      0,
      nonce,
      Utils.initHash(),
      '',
      Utils.getTimestamp(),
    );
    expect(hash).toBe(
      'c74e96277fed00133029336aef255e99656e35ac9da5f2fdd50064cc64a97f1f',
    );
    expect(hash).toHaveLength(64);
  });
});
