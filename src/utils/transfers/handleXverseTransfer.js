import { createRepeatInscriptions, request } from "@sats-connect/core";
import { defaultNetwork } from "../constants";
import getConfig from "../getConfig";
import Wallet from "src/components/Wallet";
import axios from "axios";

// pass toast func() and walletAccount(ordinals address)
const handleXverseTransfer = async (openSnackbar, address, amount) => {
    // send inscription request
    try {
        await request("sendTransfer", {
            recipients: [
                {
                    "address": address,
                    "amount": amount
                }
            ]
        });
        openSnackbar(
            <div style={{ maxWidth: 500 }}>
                <p>Payment done.</p>
                <p>Keep track of the etching status.</p>
            </div>,
            "success"
        );
    } catch (error) {
        console.log("Error while inscription for xverse: ", error);
        openSnackbar(
            <div style={{ maxWidth: 500 }}>
                <p>Error occured while payment.</p>
                <p>Make the payment manually to the shown address.</p>
                <p>{error.message}</p>
            </div>,
            "error"
        );
    }
};

export default handleXverseTransfer;
