import { ethers } from "ethers";
import { TOKEN_ABI, UNIBIT_DEX_ABI, UNIBIT_DEX_CONTRACT } from "src/Contracts/Localhost/contracts";

export const getLiquidityPools = async (address, setData, openSnackbar) => {
    const { ethereum } = window;
    try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(UNIBIT_DEX_CONTRACT, UNIBIT_DEX_ABI, signer);

        const lpTokens = await contract.getAddressPools(address);

        const auxList = [];
        
        for (let i = 0; i < lpTokens.length; i++) {
            auxList.push({address: lpTokens[i]});
            let auxContract = new ethers.Contract(lpTokens[i], TOKEN_ABI, signer);
            let name = await auxContract.name();
            let symbol = await auxContract.symbol();
            let decimals = await auxContract.decimals();
            let lp = await contract.tokenLiquidity(lpTokens[i]);
            let tokenValue = await contract.getTokenValue(lpTokens[i]);
            auxList[i].name = name;
            auxList[i].symbol = symbol;
            auxList[i].ethPool = Number(lp[0]) / Math.pow(10,18);
            auxList[i].tokenPool = Number(lp[1]) / Math.pow(10,Number(decimals));
            auxList[i].tokenValue = Number(tokenValue) / Math.pow(10,18);
        }

        console.log(auxList);

        setData(auxList);

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