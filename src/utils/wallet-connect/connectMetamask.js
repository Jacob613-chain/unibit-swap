async function connectMetamask(handleCloseWallet, setWalletAccount, setWalletType, WalletTypes, openSnackbar) {
    const { ethereum } = window;

    if (!ethereum) {
        openSnackbar("Metamask is not installed! Go install the extension!", "error");
        return;
    }
    try {
        // keep track of accounts returned
        let accounts = await ethereum.request({
            method: "eth_requestAccounts"
        });
        handleCloseWallet();
        console.log("Metamask: ", accounts[0]);
        setWalletAccount({
            address: accounts[0],
            pubKey: "",
            paymentAddress: "",
            paymentPublicKey: ""
        });
        setWalletType(WalletTypes.metamask);
        openSnackbar("Metamask Wallet is connected!", "success");
    } catch (error) {
        console.error("Error while connecting metamask wallet: ", error);
        openSnackbar(
            <div style={{ maxWidth: 500 }}>
                <p>Error occured. </p>
                <p>{error.message}</p>
            </div>,
            "error"
        );
    }
}

export default connectMetamask;
