import axios from "axios";

const uploadFileToOrdinalsBucket = async (dataURL, name, type) => {
    const uploadJSON = {};

    uploadJSON.dataURL = dataURL;
    uploadJSON.name = name;
    uploadJSON.type = type;

    // send request
    try {
        const response = await axios({
            method: 'post',
            url: 'https://ordinalsbot.com/api/directupload',
            data: uploadJSON
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
export default uploadFileToOrdinalsBucket;
