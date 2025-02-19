const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  // Initialize the contract with proposal names (as bytes32)
  // You can use web3.utils.asciiToHex to convert strings to bytes32 if needed.
  const proposals = [
    web3.utils.asciiToHex("Proposal1"),
    web3.utils.asciiToHex("Proposal2"),
    web3.utils.asciiToHex("Proposal3")
  ];
  deployer.deploy(Voting, proposals);
};
