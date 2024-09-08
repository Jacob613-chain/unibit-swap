import axios from "axios";

const getMempoolFee = async () => {

    // send request
    try {
        
        const response = await axios({
            method: 'get',
            url: "https://mempool.space/api/v1/fees/recommended",
        }); 

        const responseData = response.data;

        return responseData;
    } catch (error) {
        console.log("Error while requesting fees: ", error);
        openSnackbar(
            <div style={{ maxWidth: 500 }}>
                <p>Error occured. </p>
                <p>{error.message}</p>
            </div>,
            "error"
        );
    }
};
export default getMempoolFee;
