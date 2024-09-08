import { useState } from "react";
import getConfig from "src/utils/getConfig";

export const useWallet = () => {
    const [walletAccount, setWalletAccount] = useState(null);
    const { WalletTypes } = getConfig();
    const [walletType, setWalletType] = useState(WalletTypes.none);
    return { walletAccount, setWalletAccount, walletType, setWalletType, WalletTypes };
};
