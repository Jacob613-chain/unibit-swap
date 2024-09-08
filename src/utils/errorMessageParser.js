const errorMessageParser = (message) => {
    if (message.message) {
        return message.message;
    }
    const chunks = message.split('"');
    if (chunks.length > 0) {
        let found = chunks.find((c) => c.startsWith("execution reverted:"));
        if (found) {
            found = found.replace("execution reverted:", "");
            return found;
        }
    }
    if (message.includes("user rejected transaction")) {
        return "You have rejected the transaction.";
    }
    console.log(message.split("\n"));
    return "Unknow Error. " + message;
};

export default errorMessageParser;
