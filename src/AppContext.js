import { useState, createContext, useEffect } from "react";
import { Backdrop } from "@mui/material";
// Loader
import { PuffLoader } from "react-spinners";
import { useWallet } from "./hooks/useWallet";
export const AppContext = createContext({});
export function ContextProvider({ children, openSnackbar }) {
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const [modal, setModal] = useState("");
    const { walletAccount, walletType, setWalletType, setWalletAccount, WalletTypes } = useWallet();

    const toggleTheme = () => {
        window.localStorage.setItem("appTheme", !darkMode);
        setDarkMode(!darkMode);
    };

    function showConnectWallet() {
        setModal("wallet");
    }
    function showTransactionModal() {
        setModal("transaction");
    }
    function hideModal() {
        setModal("");
    }

    useEffect(() => {
        const isDarkMode = window.localStorage.getItem("appTheme");
        if (isDarkMode) {
            // convert to boolean
            setDarkMode(isDarkMode === "true");
        }
    }, []);
    const modalContext = {
        modal,
        hideModal,
        showConnectWallet,
        showTransactionModal
    };

    const walletContext = {
        walletAccount,
        setWalletAccount,
        walletType,
        setWalletType,
        WalletTypes
    };

    return (
        <AppContext.Provider value={{ toggleTheme, darkMode, setLoading, openSnackbar, modalContext, walletContext }}>
            <Backdrop sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <PuffLoader color={"#00AB55"} size={50} />
            </Backdrop>
            {children}
        </AppContext.Provider>
    );
}
