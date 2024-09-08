import { ethers } from "ethers";
import { TOKEN_ABI, UNIBIT_DEX_ABI, UNIBIT_DEX_CONTRACT } from "src/Contracts/Localhost/contracts";

export const getTokenValueInOtherToken = async (addressFrom, addressTo, setData, openSnackbar) => {
    const { ethereum } = window;
    try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(UNIBIT_DEX_CONTRACT, UNIBIT_DEX_ABI, signer);

        const tokenValue = await contract.getTokenValueInOtherToken(addressFrom, addressTo);

        const convertedTokenValue = parseFloat(Number(tokenValue) / Math.pow(10,18)).toFixed(6);

        setData(convertedTokenValue);

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