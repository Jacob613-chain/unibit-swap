import { ethers } from "ethers";
import { TOKEN_ABI, UNIBIT_DEX_ABI, UNIBIT_DEX_CONTRACT } from "src/Contracts/Localhost/contracts";

export const createOrAddLiquidityPool = async (tokenAddress, tokenValue, ethValue, openSnackbar, setData) => {
    const { ethereum } = window;
    try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const dexContract = new ethers.Contract(UNIBIT_DEX_CONTRACT, UNIBIT_DEX_ABI, signer);
        const tokenContract = new ethers.Contract(tokenAddress, TOKEN_ABI, signer);

        const decimals = await tokenContract.decimals()
        var tokenPool = tokenValue*Math.pow(10,decimals);
        var ethPool = ethValue.toString();
        tokenPool = tokenPool.toLocaleString('fullwide', {useGrouping:false});
        const approveTxn = await tokenContract.approve(UNIBIT_DEX_CONTRACT, tokenPool);
        approveTxn.wait();
        const lpTransaction = await dexContract.createOrAddLiquidity(tokenAddress, tokenPool, {value: ethers.utils.parseEther(ethPool)});
        lpTransaction.wait();
        setData(lpTransaction.hash);
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