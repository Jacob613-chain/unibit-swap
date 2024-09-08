import axios from "axios";

const handleDeployForUnisatWallet = async (openSnackbar, walletAccount, tick, max, lim, feeRate) => {
    // openSnackbar("This feature is now being developed!", "warning");
    // prepare payload

    const deployJSON = {
        "receiveAddress": walletAccount.address,
        "feeRate": Number(feeRate),
        "outputValue": 546,
        "devAddress": "",
        "devFee": 0,
        "brc20Ticker": tick,
        "brc20Max": max,
        "brc20Limit": lim
    };

    // send inscription request
    try {
        const response = await axios({
            method: 'post',
            url: 'https://open-api.unisat.io/v2/inscribe/order/create/brc20-deploy',
            headers: {
                "Authorization": "Bearer 1899f6233c0c904e9a2e6aab746fdd72e05e15d68c5256fd0fc87b5584ff41dd",
                "Content-Type": "application/json",
            },
            data: deployJSON
        }); 

        const responseData = response.data.data;

        await window.unisat.sendBitcoin(responseData.payAddress, responseData.amount, responseData.feeRate);
    
        console.log(responseData);

        return responseData;
    } catch (error) {
        console.log("Error while inscription for xverse: ", error);
        openSnackbar(
            <div style={{ maxWidth: 500 }}>
                <p>Error occured. </p>
                <p>{error.message}</p>
            </div>,
            "error"
        );
    }
};
export default handleDeployForUnisatWallet;
