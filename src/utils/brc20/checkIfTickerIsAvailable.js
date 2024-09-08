import axios from "axios";

const checkIfTickerIsAvailable = async (ticker) => {

    // send request
    try {
        
        const response = await axios({
            method: 'get',
            url: `https://open-api.unisat.io/v1/indexer/brc20/${ticker}/info`,
            headers: {
                "Authorization": "Bearer 1899f6233c0c904e9a2e6aab746fdd72e05e15d68c5256fd0fc87b5584ff41dd",
                "Content-Type": "application/json",
            }
        }); 

        const responseData = response.data;

        return responseData.msg === "get brc20 status failed";
    } catch (error) {
        console.log("Error while requesting order: ", error);
        openSnackbar(
            <div style={{ maxWidth: 500 }}>
                <p>Error occured. </p>
                <p>{error.message}</p>
            </div>,
            "error"
        );
    }
};
export default checkIfTickerIsAvailable;
