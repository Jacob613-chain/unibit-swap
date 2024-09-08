import axios from "axios";
const getPrice = async (name1, name2) => {
    try {
        const price_data = await axios.post(`https://min-api.cryptocompare.com/data/price?fsym=${name1}&tsyms=${name2}`);
        if (price_data) {
            const price = price_data.data[name2];
            console.log(price.toString());
            return price.toString();
        }
    } catch (err) {
        console.log("Error on getting price", err);
    }
    return 0;
};

export default getPrice;
