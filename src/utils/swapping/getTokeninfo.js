const getTokeninfo = async (token) => {
    const { ethereum } = window;
    try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const token_contract = new ethers.Contract(token, token_abi, signer);
        try {
            const symbol = await token_contract.symbol();
            const decimal = parseInt(await token_contract.decimals());
            return [symbol, decimal];
        } catch (e) {
            console.log("Error while getting token info: ", e);
            return false;
        }
    } catch (e) {
        console.log("Wallet is not connected", e);
        return false;
    }
};

export default getTokeninfo;
