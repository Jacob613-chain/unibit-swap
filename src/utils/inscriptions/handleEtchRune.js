import { createRepeatInscriptions, request } from "@sats-connect/core";
import { defaultNetwork } from "../constants";
import getConfig from "../getConfig";
import Wallet from "src/components/Wallet";
import axios from "axios";

// pass toast func() and walletAccount(ordinals address)
const handleEtchRune = async (openSnackbar, name, supply, symbol, divisibility, amount, cap, premine, address, feeRate, turbo, file) => {
    // prepare payload
    const etchJSON = {};

    etchJSON.rune = name;
    etchJSON.supply = Number(supply);
    etchJSON.symbol = symbol;
    etchJSON.divisibility = Number(divisibility);
    etchJSON.premine = Number(premine);
    etchJSON.files = [
        file
    ];
    etchJSON.receiveAddress = address;
    etchJSON.fee = Number(130);
    if (amount && cap) {
        etchJSON.terms = {
            "amount": Number(amount),
            "cap": Number(cap)
        }
    }
    etchJSON.turbo = turbo;

    // send inscription request
    try {
        const response = await axios({
            method: 'post',
            url: 'https://api.ordinalsbot.com/runes/etch',
            data: etchJSON
        });

        console.log(response.data);

        const responseData = response.data;

        openSnackbar(
            "Etch rune order placed. Proceeding to payment...", "success"
        );

        return {
            runeName: responseData.runeProperties.rune,
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

export default handleEtchRune;
