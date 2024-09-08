import { ethers } from "ethers";
import { TOKEN_ABI, UNIBIT_DEX_ABI, UNIBIT_DEX_CONTRACT } from "src/Contracts/Localhost/contracts";

export const swapToken = async (tokenAddressFrom, tokenAddressTo, whoEth, value, openSnackbar, setData) => {
    const { ethereum } = window;
    try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const dexContract = new ethers.Contract(UNIBIT_DEX_CONTRACT, UNIBIT_DEX_ABI, signer);

        let swapTxn;
        let approveTxn;
        if (whoEth === 0) {
            const tokenContract = new ethers.Contract(tokenAddressFrom, TOKEN_ABI, signer);
            approveTxn = await tokenContract.approve(UNIBIT_DEX_CONTRACT, value.toLocaleString('fullwide', {useGrouping:false}));
            approveTxn.wait();
            console.log(tokenAddressFrom, tokenAddressTo, value.toLocaleString('fullwide', {useGrouping:false}));
            swapTxn = await dexContract.swapTokenToToken(tokenAddressFrom, tokenAddressTo, value.toLocaleString('fullwide', {useGrouping:false}));
        }

        if (whoEth === 1) {
            swapTxn = await dexContract.swapEthToToken(tokenAddressTo, {value: ethers.utils.parseEther(value.toString())});
        }

        if (whoEth === 2) {
            const tokenContract = new ethers.Contract(tokenAddressFrom, TOKEN_ABI, signer);
            approveTxn = await tokenContract.approve(UNIBIT_DEX_CONTRACT, value.toLocaleString('fullwide', {useGrouping:false}));
            approveTxn.wait();
            swapTxn = await dexContract.swapTokenToEth(tokenAddressFrom, value.toLocaleString('fullwide', {useGrouping:false}));
        }

        swapTxn.wait();

        setData(swapTxn.hash);
        
    } catch (error) {
        console.error(error);
        openSnackbar(
            <div style={{ maxWidth: 500 }}>
                <p>Error occured</p>
                <p>{error.message}</p>
            </div>,
            "error"
        );
    }
}