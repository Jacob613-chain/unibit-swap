import { getAddress } from "@sats-connect/core";
import getConfig from "../getConfig";
async function connectXverse(handleCloseWallet, setWalletAccount, setWalletType, WalletTypes, openSnackbar) {
    const getAddressOptions = {
        payload: {
            purposes: ["ordinals", "payment"],
            message: "Address for receiving Ordinals",
            network: {
                type: getConfig().BitcoinDefaultNetwork.name
            }
        },
        onFinish: (response) => {
            const addresses = response.addresses;
            console.info("XVerse Wallet: ", addresses);
            setWalletAccount({
                address: response.addresses[0].address,
                pubKey: response.addresses[0].publicKey,
                paymentAddress: response.addresses[1].address,
                paymentPublicKey: response.addresses[1].publicKey
            });
            setWalletType(WalletTypes.xverse);
            handleCloseWallet();
            openSnackbar("XVerse Wallet is connected!", "success");
        },
        onCancel: (e) => {
            openSnackbar("Cancelled connecting wallet!", "error");
        }
    };
    try {
        await getAddress(getAddressOptions);
    } catch (error) {
        console.error("Error while connecting Xverse wallet: ", error);
        openSnackbar(
            <div style={{ maxWidth: 500 }}>
                <p>Error occured. </p>
                <p>{error.message}</p>
            </div>,
            "error"
        );
    }
}

export default connectXverse;
