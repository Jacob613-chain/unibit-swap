import { ethers } from "ethers";
import { TOKEN_ABI, UNIBIT_DEX_ABI, UNIBIT_DEX_CONTRACT } from "src/Contracts/Localhost/contracts";

export const getDexTokens = async (setData, openSnackbar) => {
    const { ethereum } = window;
    try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(UNIBIT_DEX_CONTRACT, UNIBIT_DEX_ABI, signer);

        const tokens = await contract.getTokens();

        const auxList = [
            {
                address: "main",
                symbol: "ETH",
                name: "Ethereum",
                ethPool: 0,
                tokenPool: 0,
                tokenValue: 0,
                decimals: 18
            }
        ];
        
        for (let i = 0; i < tokens.length; i++) {
            auxList.push({address: tokens[i]});
            let auxContract = new ethers.Contract(tokens[i], TOKEN_ABI, signer);
            let name = await auxContract.name();
            let symbol = await auxContract.symbol();
            let decimals = await auxContract.decimals();
            let lp = await contract.tokenLiquidity(tokens[i]);
            let tokenValue = await contract.getTokenValue(tokens[i]);
            auxList[i+1].name = name;
            auxList[i+1].symbol = symbol;
            auxList[i+1].decimals = Number(decimals);
            auxList[i+1].ethPool = Number(lp[0]) / Math.pow(10,18);
            auxList[i+1].tokenPool = Number(lp[1]) / Math.pow(10,Number(decimals));
            auxList[i+1].tokenValue = Number(tokenValue) / Math.pow(10,18);
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