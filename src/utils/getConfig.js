import { bitcoinNetworks, mainNetConfig } from "./networks";

const getConfig = () => {
    const config = {
        EVMDefaultNetwork: mainNetConfig.EvmChainDefinitions.Arbitrum,
        BitcoinDefaultNetwork: bitcoinNetworks.mainnet,
        WalletTypes: {
            none: 0,
            metamask: 1,
            xverse: 2,
            unisat: 3
        },
        StakingDefaultAPY: "50"
    };

    if (process.env.Environment === "production") {
        config.EVMDefaultNetwork = mainNetConfig.EvmChainDefinitions.Arbitrum;
        config.BitcoinDefaultNetwork = bitcoinNetworks.mainnet;
    }

    return config;
};

export default getConfig;
