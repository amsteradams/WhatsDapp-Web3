var WhatsDapp = artifacts.require("./WhatsDapp.sol");

module.exports = function(deployer) {
  deployer.deploy(WhatsDapp);
};
