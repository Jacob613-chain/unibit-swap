import { ethers } from "ethers";
import { TOKEN_ABI, UNIBIT_DEX_ABI, UNIBIT_DEX_CONTRACT } from "src/Contracts/Localhost/contracts";

export const getTokenInfo = async (address, setData, openSnackbar) => {
    const { ethereum } = window;
    try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, TOKEN_ABI, signer);

        const name = await contract.name();
        const symbol = await contract.symbol();
        const decimals = await contract.decimals();

        setData({
            address,
            name,
            symbol,
            decimals: Number(decimals)
        });

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