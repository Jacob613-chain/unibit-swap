import React, { useContext } from "react";

// Material
import { Button } from "@mui/material";
// Context
import { AppContext } from "src/AppContext";
// Utils
import handleEtchRune from "src/utils/inscriptions/handleEtchRune";
import handleXverseTransfer from "src/utils/transfers/handleXverseTransfer";
import handleUnisatTransfer from "src/utils/transfers/handleUnisatTransfer";
import getOrdinalBotsOrderStatus from "src/utils/ordinalbots/getOrdinalBotsOrderStatus";
import handleMintRune from "src/utils/inscriptions/handleMintRune";
import uploadFileToOrdinalsBucket from "src/utils/ordinalbots/uploadFileToOrdinalsBucket";

export default function CreateRunesButton(props) {
    const { openSnackbar, walletContext } = useContext(AppContext);
    const { walletType, walletAccount, WalletTypes } = walletContext;
    const mintRunes = async () => {
        if (walletType === WalletTypes.none) {
            openSnackbar("Please connect wallet!", "warning");
            return;
        }
        openSnackbar("Minting Rune");
        console.log(walletAccount, walletType);
        switch (walletType) {
            case WalletTypes.xverse:
                var orderData = await handleMintRune(openSnackbar, props.name, props.receiverAddress, props.feeRate, props.repeats);
                if (!orderData) {
                    return;
                }
                props.setOrderData(orderData);
                await handleXverseTransfer(openSnackbar, orderData.orderPayAddress, orderData.orderPayAmount);
                break;
            case WalletTypes.unisat:
                var orderData = await handleMintRune(openSnackbar, props.name, props.receiverAddress, props.feeRate, props.repeats);
                if (!orderData) {
                    return;
                }
                props.setOrderData(orderData);
                await handleUnisatTransfer(openSnackbar, orderData.orderPayAddress, orderData.orderPayAmount, props.feeRate);
                break;
            default:
                openSnackbar("Minting Runes for your wallet type is not supported yet.", "warning");
        }
    };

    const etchRunes = async () => {
        if (walletType === WalletTypes.none) {
            openSnackbar("Please connect wallet!", "warning");
            return;
        }
        openSnackbar("Uploading File...");
        console.log(walletAccount, walletType);
        const fileUpload = await uploadFileToOrdinalsBucket(props.fileDataURL, props.file.name, props.file.type);
        if (!fileUpload.key) {
            openSnackbar("Error Uploading File...", "error");
            return;
        }
        const file = {
            "url": fileUpload.publicURL,
            "size": props.file.size,
            "name": props.file.name
        }
        openSnackbar("Etching Rune...");
        switch (walletType) {
            case WalletTypes.xverse:
                var orderData = await handleEtchRune(openSnackbar, props.name, props.supply, props.symbol, props.divisibility, props.amount, props.cap, props.premine, props.receiverAddress, props.feeRate, props.turbo, file);
                if (!orderData) {
                    return;
                }
                props.setOrderData(orderData);
                await handleXverseTransfer(openSnackbar, orderData.orderPayAddress, orderData.orderPayAmount);
                break;
            case WalletTypes.unisat:
                var orderData = await handleEtchRune(openSnackbar, props.name, props.supply, props.symbol, props.divisibility, props.amount, props.cap, props.premine, props.receiverAddress, props.feeRate, props.turbo, file);
                if (!orderData) {
                    return;
                }
                props.setOrderData(orderData);
                await handleUnisatTransfer(openSnackbar, orderData.orderPayAddress, orderData.orderPayAmount, props.feeRate);
                break;
            default:
                openSnackbar("Etching runes for your wallet type is not supported yet.", "warning");
        }
    };

    const getOrderDetail = async () => {
        const orderData = await getOrdinalBotsOrderStatus(props.orderId);
        props.setOrderData(orderData);
    }

    const etchMintOrDetail = async () => {
        if (props.type !== "Detail") {
            var auxName = props.name;
            if (auxName.replaceAll("•","").length < 13) {
                openSnackbar("Rune name length removing '•' cannot be less than 13","warning");
                return;
            }
            if (props.supply > 21000000) {
                openSnackbar("Supply cannot exceed 21,000,000","warning");
                return;
            }
        }
        if (props.type === "Etch") {
            await etchRunes();
        } else if (props.type === "Mint") {
            await mintRunes();
        } else {
            await getOrderDetail();
        }
    }

    return (
        <Button sx={{ padding: 1, width: "35%" }} onClick={() => etchMintOrDetail()} variant="contained">
            {props.type === "Etch" ? "Etch" : props.type === "Mint" ? "Mint" : "Get Detail"}
        </Button>
    );
}
