import { ethers } from "ethers";
import { TOKEN_ABI, UNIBIT_DEX_ABI, UNIBIT_DEX_CONTRACT } from "src/Contracts/Localhost/contracts";

export const getTokenBalance = async (address, setData, owner, openSnackbar) => {
    const { ethereum } = window;
    try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, TOKEN_ABI, signer);

        const balance = await contract.balanceOf(owner);
        const decimals = await contract.decimals();

        const balanceNumber = Number(balance) / Math.pow(10, Number(decimals));

        setData(
            balanceNumber
        );

    } catch (error) {
        console.error(error);
        setData({
            error
        });
        openSnackbar(
            <div style={{ maxWidth: 500 }}>
                <p>Error occured</p>
                <p>{error.message}</p>
            </div>,
            "error"
        );
    }
}