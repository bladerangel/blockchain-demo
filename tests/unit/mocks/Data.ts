import Block from '../../../src/Block';

export default class Data {
  static genesisBlock(): Block {
    return new Block(
      0,
      0,
      '0000000000000000000000000000000000000000000000000000000000000000',
      'df5d9c1cf5f7c86400aa8fa8584f978f81e32eacd8b750c43a6307c7f7ab2956',
      'genesis block',
      0,
    );
  }
  static block(): Block {
    return new Block(
      1,
      0,
      'df5d9c1cf5f7c86400aa8fa8584f978f81e32eacd8b750c43a6307c7f7ab2956',
      '085cd3b3aae6ac073715ce6224c17a263f24c1598798f90e7c998523bc9bdc11',
      'new block',
      0,
    );
  }

  static failBlock(): Block {
    return new Block(
      1,
      0,
      'df5d9c1cf5f7c86400aa8fa8584f978f81e32eacd8b750c43a6307c7f7ab2956',
      '085cd3b3aae6ac073715ce6224c17a263f24c1598798f90e7c998523bc9bdc12',
      'new block',
      0,
    );
  }

  static chain(): Block[] {
    return [this.genesisBlock(), this.block()];
  }

  static failChain(): Block[] {
    return [this.genesisBlock(), this.failBlock()];
  }
}
