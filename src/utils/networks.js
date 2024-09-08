import EthereumIcon from "../assets/chains/evm/ethereum.svg";
import OptimismIcon from "../assets/chains/evm/optimism.svg";
import KavaIcon from "../assets/chains/evm/kava.svg";
import PolygonIcon from "../assets/chains/evm/polygon.svg";
import MantaIcon from "../assets/chains/evm/manta.svg";
import BaseIcon from "../assets/chains/evm/base.svg";
import ArbitrumIcon from "../assets/chains/evm/arbitrum.svg";
import AvalancheIcon from "../assets/chains/evm/avax.svg";
import CronosIcon from "../assets/chains/evm/cronos.svg";
import BscIcon from "../assets/chains/evm/bnb.svg";

const EVM_CHAIN = {
    ETHEREUM: "Ethereum",
    OPTIMISM: "optimism",
    KAVA: "Kava",
    POLYGON: "Polygon",
    MANTA_ETH: "Manta Pacific Mainnet",
    BASE_ETH: "Base",
    ARBITRUM: "Arbitrum",
    AVALANCHE: "Avalanche",
    CRONOS: "Cronos",
    BINANCE: "BSC"
};
const EvmChainsIcon = {
    [EVM_CHAIN.ETHEREUM]: EthereumIcon,
    [EVM_CHAIN.OPTIMISM]: OptimismIcon,
    [EVM_CHAIN.KAVA]: KavaIcon,
    [EVM_CHAIN.POLYGON]: PolygonIcon,
    [EVM_CHAIN.MANTA_ETH]: MantaIcon,
    [EVM_CHAIN.BASE_ETH]: BaseIcon,
    [EVM_CHAIN.ARBITRUM]: ArbitrumIcon,
    [EVM_CHAIN.AVALANCHE]: AvalancheIcon,
    [EVM_CHAIN.CRONOS]: CronosIcon,
    [EVM_CHAIN.BINANCE]: BscIcon
};

const mainNetConfig = {
    // Define all the mainnet configurations
    EvmChainDefinitions: {
        [EVM_CHAIN.ETHEREUM]: {
            rpcUrl: "https://eth.llamarpc.com",
            explorerUrl: "https://etherscan.io",
            currency: "ETH",
            name: "Ethereum LlamaNodes",
            chainId: 1
        },
        [EVM_CHAIN.OPTIMISM]: {
            rpcUrl: "https://mainnet.optimism.io",
            explorerUrl: "https://optimistic.etherscan.io",
            currency: "ETH",
            name: "OP Mainnet",
            chainId: 10
        },
        [EVM_CHAIN.KAVA]: {
            rpcUrl: "https://evm.kava.io",
            explorerUrl: "https://kavascan.com",
            currency: "KAVA",
            name: "Kava",
            chainId: 2222
        },
        [EVM_CHAIN.POLYGON]: {
            rpcUrl: "https://polygon-rpc.com/",
            explorerUrl: "https://polygonscan.com",
            currency: "MATIC",
            name: "Polygon Mainnet",
            chainId: 137
        },
        [EVM_CHAIN.MANTA_ETH]: {
            rpcUrl: "https://manta-pacific.drpc.org",
            explorerUrl: "https://pacific-explorer.manta.network",
            currency: "ETH", // This is unusual as Manta might have its own currency, please double-check
            name: "Manta",
            chainId: 169
        },
        [EVM_CHAIN.BASE_ETH]: {
            rpcUrl: "https://base.llamarpc.com",
            explorerUrl: "https://basescan.org",
            currency: "ETH",
            name: "Base",
            chainId: 8453
        },
        [EVM_CHAIN.ARBITRUM]: {
            rpcUrl: "https://arb1.arbitrum.io/rpc",
            explorerUrl: "https://arbiscan.io",
            currency: "ETH",
            name: "Arbitrum One",
            chainId: 42161
        },
        [EVM_CHAIN.AVALANCHE]: {
            rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
            explorerUrl: "https://snowtrace.io",
            currency: "AVAX",
            name: "Avalanche C-Chain",
            chainId: 43114
        },
        [EVM_CHAIN.CRONOS]: {
            rpcUrl: "https://evm.cronos.org",
            explorerUrl: "https://explorer.cronos.org",
            currency: "CRO",
            name: "Cronos Mainnet",
            chainId: 25
        },
        [EVM_CHAIN.BINANCE]: {
            rpcUrl: "https://binance.llamarpc.com",
            explorerUrl: "https://bscscan.com",
            currency: "BNB",
            name: "BNB Chain LlamaNodes",
            chainId: 56
        }
    },
    EvmChainTokenAddress: {
        [EVM_CHAIN.ETHEREUM]: "0x76bc2e765414e6c8b596c0f52c4240f80268f41d",
        [EVM_CHAIN.OPTIMISM]: "0x76bc2e765414e6c8b596c0f52c4240f80268f41d",
        [EVM_CHAIN.KAVA]: "0x76bc2e765414e6c8b596c0f52c4240f80268f41d",
        [EVM_CHAIN.POLYGON]: "0x76bc2e765414e6c8b596c0f52c4240f80268f41d",
        [EVM_CHAIN.MANTA_ETH]: "0x76bc2e765414e6c8b596c0f52c4240f80268f41d",
        [EVM_CHAIN.BASE_ETH]: "0x76bc2e765414e6c8b596c0f52c4240f80268f41d",
        [EVM_CHAIN.ARBITRUM]: "0x76bc2e765414e6c8b596c0f52c4240f80268f41d",
        [EVM_CHAIN.AVALANCHE]: "0x76bc2e765414e6c8b596c0f52c4240f80268f41d",
        [EVM_CHAIN.CRONOS]: "0x76bc2e765414e6c8b596c0f52c4240f80268f41d",
        [EVM_CHAIN.BINANCE]: "0x76bc2e765414e6c8b596c0f52c4240f80268f41d"
    },
    EvmChainVaultAddress: {
        [EVM_CHAIN.ETHEREUM]: "0xC511F4f356A246e1F42984a3146B34ef994fBa38",
        [EVM_CHAIN.OPTIMISM]: "0xC511F4f356A246e1F42984a3146B34ef994fBa38",
        [EVM_CHAIN.KAVA]: "0xC511F4f356A246e1F42984a3146B34ef994fBa38",
        [EVM_CHAIN.POLYGON]: "0xC511F4f356A246e1F42984a3146B34ef994fBa38",
        [EVM_CHAIN.MANTA_ETH]: "0xC511F4f356A246e1F42984a3146B34ef994fBa38",
        [EVM_CHAIN.BASE_ETH]: "0xC511F4f356A246e1F42984a3146B34ef994fBa38",
        [EVM_CHAIN.ARBITRUM]: "0xC511F4f356A246e1F42984a3146B34ef994fBa38",
        [EVM_CHAIN.AVALANCHE]: "0xC511F4f356A246e1F42984a3146B34ef994fBa38",
        [EVM_CHAIN.CRONOS]: "0xC511F4f356A246e1F42984a3146B34ef994fBa38",
        [EVM_CHAIN.BINANCE]: "0xC511F4f356A246e1F42984a3146B34ef994fBa38"
    }
};

const testNetConfig = {
    // Define all the testnet configurations
    EvmChainDefinitions: {
        [EVM_CHAIN.ETHEREUM]: {
            rpcUrl: "https://rpc.sepolia.dev",
            explorerUrl: "https://sepolia.etherscan.io",
            currency: "SEP",
            name: "Sepolia (Ethereum testnet)",
            chainId: 11155111
        },
        [EVM_CHAIN.OPTIMISM]: {
            rpcUrl: "https://optimism-sepolia.blockpi.network/v1/rpc/public",
            explorerUrl: "https://optimism-sepolia.blockscout.com",
            currency: "ETH",
            name: "OP Sepolia Testnet",
            chainId: 11155420
        },
        [EVM_CHAIN.KAVA]: {
            rpcUrl: "https://2221.rpc.thirdweb.com",
            explorerUrl: "https://testnet.kavascan.com",
            currency: "TKAVA",
            name: "Kava Testnet",
            chainId: 2221
        },
        [EVM_CHAIN.ARBITRUM]: {
            rpcUrl: "https://goerli-rollup.arbitrum.io/rpc",
            explorerUrl: "https://goerli.arbiscan.io",
            currency: "ETH",
            name: "Arbitrum Goerli (Testnet)",
            chainId: 421613
        },
        [EVM_CHAIN.BINANCE]: {
            chainId: 97,
            name: "BSC",
            currency: "tBNB",
            explorerUrl: "https://bsc-testnet.publicnode.com/?testnet",
            rpcUrl: "https://bsc-testnet-rpc.publicnode.com"
        },
        // TODO : Setup EVM_CHAINS.MATIC testnet !
        [EVM_CHAIN.POLYGON]: {
            rpcUrl: "https://polygon.llamarpc.com",
            explorerUrl: "https://polygonscan.com",
            currency: "MATIC",
            name: "Polygon LlamaNodes",
            chainId: 137
        },
        // TODO : Setup EVM_CHAINS.MANTA_ETH testnet !
        [EVM_CHAIN.MANTA_ETH]: {
            rpcUrl: "https://pacific-rpc.manta.network/http",
            explorerUrl: "https://pacific-explorer.manta.network",
            currency: "ETH", // This is unusual as Manta might have its own currency, please double-check
            name: "Manta",
            chainId: 169
        },
        // TODO : Setup EVM_CHAINS.BASE_ETH testnet !
        [EVM_CHAIN.BASE_ETH]: {
            rpcUrl: "https://base.llamarpc.com",
            explorerUrl: "https://basescan.org",
            currency: "ETH",
            name: "Base",
            chainId: 8453
        },
        // TODO : Setup EVM_CHAINS.AVAX testnet !
        [EVM_CHAIN.AVALANCHE]: {
            rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
            explorerUrl: "https://snowtrace.io",
            currency: "AVAX",
            name: "Avalanche",
            chainId: 43114
        },
        // TODO : Setup EVM_CHAINS.CRONOS testnet !
        [EVM_CHAIN.CRONOS]: {
            rpcUrl: "https://evm.cronos.org",
            explorerUrl: "https://explorer.cronos.org",
            currency: "CRO",
            name: "Cronos Mainnet",
            chainId: 25
        }
    },
    EvmChainTokenAddress: {
        [EVM_CHAIN.ETHEREUM]: "0xDd9c64AD119EF73c7E361E4C7DA351d9dE61f4f6",
        [EVM_CHAIN.OPTIMISM]: "0xDd9c64AD119EF73c7E361E4C7DA351d9dE61f4f6",
        [EVM_CHAIN.KAVA]: "0xDd9c64AD119EF73c7E361E4C7DA351d9dE61f4f6",
        [EVM_CHAIN.POLYGON]: "0xDd9c64AD119EF73c7E361E4C7DA351d9dE61f4f6",
        [EVM_CHAIN.MANTA_ETH]: "0xDd9c64AD119EF73c7E361E4C7DA351d9dE61f4f6",
        [EVM_CHAIN.BASE_ETH]: "0xDd9c64AD119EF73c7E361E4C7DA351d9dE61f4f6",
        [EVM_CHAIN.ARBITRUM]: "0xDd9c64AD119EF73c7E361E4C7DA351d9dE61f4f6",
        [EVM_CHAIN.AVALANCHE]: "0xDd9c64AD119EF73c7E361E4C7DA351d9dE61f4f6",
        [EVM_CHAIN.CRONOS]: "0xDd9c64AD119EF73c7E361E4C7DA351d9dE61f4f6",
        [EVM_CHAIN.BINANCE]: "0xDd9c64AD119EF73c7E361E4C7DA351d9dE61f4f6"
    },
    EvmChainVaultAddress: {
        [EVM_CHAIN.ETHEREUM]: "0x8c44584d6a5b65E0e282aaAF171c0fd95ea42245",
        [EVM_CHAIN.OPTIMISM]: "0x8c44584d6a5b65E0e282aaAF171c0fd95ea42245",
        [EVM_CHAIN.KAVA]: "0x8c44584d6a5b65E0e282aaAF171c0fd95ea42245",
        [EVM_CHAIN.POLYGON]: "0x8c44584d6a5b65E0e282aaAF171c0fd95ea42245",
        [EVM_CHAIN.MANTA_ETH]: "0x8c44584d6a5b65E0e282aaAF171c0fd95ea42245",
        [EVM_CHAIN.BASE_ETH]: "0x8c44584d6a5b65E0e282aaAF171c0fd95ea42245",
        [EVM_CHAIN.ARBITRUM]: "0x8c44584d6a5b65E0e282aaAF171c0fd95ea42245",
        [EVM_CHAIN.AVALANCHE]: "0x8c44584d6a5b65E0e282aaAF171c0fd95ea42245",
        [EVM_CHAIN.CRONOS]: "0x8c44584d6a5b65E0e282aaAF171c0fd95ea42245",
        [EVM_CHAIN.BINANCE]: "0x8c44584d6a5b65E0e282aaAF171c0fd95ea42245"
    }
};

const EvmChainNativeCurrency = {
    [EVM_CHAIN.ETHEREUM]: { name: "Ether", symbol: "ETH", decimals: 18 },
    [EVM_CHAIN.OPTIMISM]: { name: "Ether", symbol: "ETH", decimals: 18 },
    [EVM_CHAIN.KAVA]: { name: "Kava", symbol: "KAVA", decimals: 18 },
    [EVM_CHAIN.POLYGON]: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    [EVM_CHAIN.MANTA_ETH]: { name: "Ether", symbol: "ETH", decimals: 18 },
    [EVM_CHAIN.BASE_ETH]: { name: "Ether", symbol: "ETH", decimals: 18 },
    [EVM_CHAIN.ARBITRUM]: { name: "Ether", symbol: "ETH", decimals: 18 },
    [EVM_CHAIN.AVALANCHE]: { name: "Avalanche", symbol: "AVAX", decimals: 18 },
    [EVM_CHAIN.CRONOS]: { name: "Cronos", symbol: "CRO", decimals: 18 },
    [EVM_CHAIN.BINANCE]: {
        name: "BNB Chain Native Token",
        symbol: "BNB",
        decimals: 18
    }
};

const bitcoinNetworks = {
    mainnet: {
        name: "Mainnet"
    },
    testnet: {
        name: "Testnet"
    }
};

export { EvmChainsIcon, mainNetConfig, testNetConfig, EvmChainNativeCurrency, bitcoinNetworks };
