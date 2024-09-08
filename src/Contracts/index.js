// testnet address and artifacts --- AribitrumGoerli is not being used now
import addresses from "src/Contracts/EthereumSepolia/contract_addresses.json"; //
import UnibitContractABI from "src/Contracts/EthereumSepolia/UIBT.json";
import StakingContractABI from "src/Contracts/EthereumSepolia/StakingContract.json";
// mainnet
import addressesMain from "src/Contracts/ArbitrumOne/contract_addresses.json";
import UnibitContractABIMain from "src/Contracts/ArbitrumOne/UIBT.json";
import StakingContractABIMain from "src/Contracts/ArbitrumOne/StakingContract.json";

// for test net
// for main net
let contractABIs = {
    UnibitContractABI: UnibitContractABIMain.abi,
    StakingContractABI: StakingContractABIMain.abi
};
let contractAddresses = addressesMain;

// check env and update if production
if (process.env.Environment === "production") {
    contractABIs = {
        UnibitContractABI: UnibitContractABIMain.abi,
        StakingContractABI: StakingContractABIMain.abi
    };
    contractAddresses = addressesMain;
}

// export modules
const modules = {
    contractABIs,
    contractAddresses
};
export default modules;
