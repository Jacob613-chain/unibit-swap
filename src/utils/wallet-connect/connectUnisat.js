async function connectUnisat(handleCloseWallet, setWalletAccount, setWalletType, WalletTypes, openSnackbar) {
    const unisat = window.unisat;

    if (!unisat) {
        openSnackbar("Unisat is not installed! Go install the extension!", "error");
        return;
    }
    try {
        // keep track of accounts returned
        let accounts = await unisat.requestAccounts();
        let pubKey = await unisat.getPublicKey();
        console.info("Unisat Wallet: ", accounts, pubKey);
        handleCloseWallet();
        setWalletAccount({
            address: accounts[0],
            pubKey: pubKey,
            paymentAddress: "",
            paymentPublicKey: ""
        });
        setWalletType(WalletTypes.unisat);
        openSnackbar("Unisat Wallet is connected!", "success");
    } catch (error) {
        console.error("Error while connecting Unisat wallet: ", error);
        openSnackbar(
            <div style={{ maxWidth: 500 }}>
                <p>Error occured. </p>
                <p>{error.message}</p>
            </div>,
            "error"
        );
    }
}

export default connectUnisat;
