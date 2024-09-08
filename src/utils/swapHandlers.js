import { ethers } from "ethers";

import contractModules from "src/Contracts";
// Utils
const { contractAddresses, contractABIs } = contractModules;
const { stakingContractAddress, tokenContractAddress } = contractAddresses;
const { StakingContractABI, UnibitContractABI } = contractABIs;
