import { ethers } from "ethers";

export const getEthBalance = async (setData, openSnackbar) => {
    const { ethereum } = window;
    try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        let ethBalance = await signer.getBalance();
        ethBalance = Number(ethBalance) / Math.pow(10, 18);
        ethBalance = parseFloat(ethBalance).toFixed(3);

        setData(
            ethBalance
        );

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