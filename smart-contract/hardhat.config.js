require("@nomiclabs/hardhat-waffle");


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.2",
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_KEY,
      accounts: ["0xe22711bCa99ff337977792122910172CE08943Ad"]
    }
  }
};
