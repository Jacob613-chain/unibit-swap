import { createRepeatInscriptions } from "@sats-connect/core";
import { defaultNetwork } from "../constants";
import getConfig from "../getConfig";
import getMempoolFee from "../fees/getMempoolFee";

// pass toast func() and walletAccount(ordinals address)
const handleDeployForXVerseWallet = async (openSnackbar, walletAccount, tick, max, lim, feeRate) => {
        
    // prepare payload
    const deployJSON = {
        p: "brc-20",
        op: "deploy",
        tick: tick,
        max: max,
        lim: lim
    };

    // inscription payload
    const payload = {
        network: {
            type: getConfig().BitcoinDefaultNetwork.name
        },
        repeat: 1,
        contentType: "application/json",
        content: JSON.stringify(deployJSON),
        payloadType: "PLAIN_TEXT",
        /** Optional parameters:
    appFeeAddress: "", // the address where the inscription fee should go
    appFee: 1000, // the amount of sats that should be sent to the fee address
    */
        suggestedMinerFeeRate: Number(feeRate)
    };
    // send inscription request
    try {
        await createRepeatInscriptions({
            payload: payload,
            onFinish: (response) => {
                console.log("Inscription result for xverse wallet: ", response);
                openSnackbar(`Successfully deployed Txn ID: ${response.txId}`, "success");
                return response.txId;
            },
            onCancel: () => {
                openSnackbar("Inscription cancelled!", "warning");
            },
        });
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

export default handleDeployForXVerseWallet;
