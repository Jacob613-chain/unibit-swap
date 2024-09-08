import axios from "axios";

const getOrdinalBotsOrderStatus = async (id) => {

    // send request
    try {
        const response = await axios({
            method: 'get',
            url: `https://api.ordinalsbot.com/order?id=${id}`,
        }); 

        const responseData = response.data;

        return responseData;
    } catch (error) {
        console.log("Error while requesting order data: ", error);
        openSnackbar(
            <div style={{ maxWidth: 500 }}>
                <p>Error occured. </p>
                <p>{error.message}</p>
            </div>,
            "error"
        );
    }
};
export default getOrdinalBotsOrderStatus;
