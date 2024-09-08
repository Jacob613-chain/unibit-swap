import React, { useContext } from "react";

// Material
import { Button } from "@mui/material";
// Context
import { AppContext } from "src/AppContext";
// Utils
import handleMintForXVerseWallet from "src/utils/inscriptions/handleMintForXVerseWallet";
import handleMintForUnisatWallet from "src/utils/inscriptions/handleMintForUnisatWallet";
import handleDeployForXVerseWallet from "src/utils/inscriptions/handleDeployForXverseWallet";
import handleDeployForUnisatWallet from "src/utils/inscriptions/handleDeployForUnisatWallet";
import getUnisatOrder from "src/utils/inscriptions/getUnisatOrder";
import checkIfTickerIsAvailable from "src/utils/brc20/checkIfTickerIsAvailable";

export default function CreateBRC20Button(props) {
    const { openSnackbar, walletContext } = useContext(AppContext);
    const { walletType, walletAccount, WalletTypes } = walletContext;
    const mintBRC20 = async () => {
        if (walletType === WalletTypes.none) {
            openSnackbar("Please connect wallet!", "warning");
            return;
        }
        openSnackbar("minting BRC20 token");
        console.log(walletAccount, walletType);
        switch (walletType) {
            case WalletTypes.xverse:
                var orderData = await handleMintForXVerseWallet(openSnackbar, walletAccount, props.tick, props.amt, props.feeRate);
                props.setOrderData(orderData);
                break;
            case WalletTypes.unisat:
                var orderData = await handleMintForUnisatWallet(openSnackbar, walletAccount, props.tick, props.amt, props.feeRate);
                props.setOrderData(orderData);
                break;
            default:
                openSnackbar("Minting BRC20 for your wallet type is not supported yet.", "warning");
        }
    };

    const deployBRC20 = async () => {
        if (walletType === WalletTypes.none) {
            openSnackbar("Please connect wallet!", "warning");
            return;
        }
        openSnackbar("Deploying BRC20 token");
        console.log(walletAccount, walletType);
        switch (walletType) {
            case WalletTypes.xverse:
                var orderData = await handleDeployForXVerseWallet(openSnackbar, walletAccount, props.tick, props.max, props.lim, props.feeRate);
                props.setOrderData(orderData);
                break;
            case WalletTypes.unisat:
                var orderData = await handleDeployForUnisatWallet(openSnackbar, walletAccount, props.tick, props.max, props.lim, props.feeRate);
                props.setOrderData(orderData);
                break;
            default:
                openSnackbar("Deploy BRC20 for your wallet type is not supported yet.", "warning");
        }
    };

    const getOrderDetail = async () => {
        const orderData = await getUnisatOrder(openSnackbar, props.orderId);
        props.setOrderData(orderData);
    }

    const deployMintOrDetail = async () => {
        const tickerAvailable = await checkIfTickerIsAvailable(props.tick ?? "unib");
        if (props.type === "Deploy") {
            if (!tickerAvailable) {
                openSnackbar("Token name is not available.", "error");
                return;
            }
            await deployBRC20();
        } else if (props.type === "Mint") {
            if (tickerAvailable) {
                openSnackbar("Token does not exist.", "error");
                return;
            }
            await mintBRC20();
        } else {
            await getOrderDetail();
        }
    }

    return (
        <Button sx={{ padding: 1, width: "35%" }} onClick={() => deployMintOrDetail()} variant="contained">
            {props.type === "Deploy" ? "Deploy" : props.type === "Mint" ? "Mint" : "Get Detail"}
        </Button>
    );
}
