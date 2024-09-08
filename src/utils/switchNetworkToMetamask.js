import Web3 from "web3";
const switchNetworkTo = async (network, openSnackbar, setLoading) => {
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: Web3.utils.toHex(network.chainId)
                }
            ]
        });
    } catch (error) {
        console.log("Error while switching network: ", error);
        openSnackbar(
            <div style={{ maxWidth: 500 }}>
                <p>Error occured. </p>
                <p>{error.message}</p>
            </div>,
            "error"
        );
    }
    setLoading(false);
};

export default switchNetworkTo;
