import { createRepeatInscriptions, request } from "@sats-connect/core";
import { defaultNetwork } from "../constants";
import getConfig from "../getConfig";
import Wallet from "src/components/Wallet";
import axios from "axios";

// pass toast func() and walletAccount(ordinals address)
const handleMintRune = async (openSnackbar, name, address, feeRate, mints) => {
    // prepare payload
    const mintJSON = {};

    mintJSON.rune = name;
    mintJSON.fee = Number(130);
    mintJSON.receiveAddress = address;
    mintJSON.numberOfMints = mints;

    // send inscription request
    try {
        const response = await axios({
            method: 'post',
            url: 'https://api.ordinalsbot.com/runes/mint',
            data: mintJSON
        });

        console.log(response.data);

        const responseData = response.data;

        console.log(responseData);

        openSnackbar(
            "Mint rune order placed. Proceeding to payment...", "success"
        );

        return {
            runeName: responseData.rune,
            orderId: responseData.id,
            status: responseData.state,
            orderPayAddress: responseData.charge.address,
            orderPayAmount: responseData.charge.amount,
        }

    } catch (error) {
        console.log("Error while inscription for xverse: ", error);
        openSnackbar(
            <div style={{ maxWidth: 500 }}>
                <p>Error occured. </p>
                <p>{error.response.data.error[0].msg}</p>
            </div>,
            "error"
        );
    }
};

export default handleMintRune;
