import { useState, useContext, useEffect } from "react";
// Material
import { Box, Stack, TextField, Button, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
// Context
import { AppContext } from "src/AppContext";
//component
import Page from "src/components/Page";
import CreateBRC20Button from "../BRC20/CreateBRC20Button";
import WalletConnectButton from "../WalletConnectButton";
import getUnisatOrder from "src/utils/inscriptions/getUnisatOrder";
import CreateRunesButton from "./CreateRunesButton";
import getMempoolFee from "src/utils/fees/getMempoolFee";
import useDebounce from "src/hooks/useDebounce";
import getOrdinalBotsOrderStatus from "src/utils/ordinalbots/getOrdinalBotsOrderStatus";

export default function RunesComponent() {
    const { openSnackbar, darkMode, walletContext, modalContext } = useContext(AppContext);
    const { walletAccount, walletType, WalletTypes } = walletContext;
    const { showConnectWallet } = modalContext;
    const [runeName, setRuneName] = useState("");
    const [runeSymbol, setRuneSymbol] = useState("");
    const [runeDivisibility, setRuneDivisibility] = useState();
    const [runePremine, setRunePremine] = useState();
    const [file, setFile] = useState();
    const [fileDataURL, setFileDataURL] = useState();
    const [turbo, setTurbo] = useState(true);
    const [isMintable, setIsMintable] = useState(true);
    const [amount, setAmount] = useState();
    const [cap, setCap] = useState();
    const [destinationAddress, setDestinationAddress] = useState();
    const [repeats, setRepeats] = useState(1);
    const [supply, setSupply] = useState();
    const [createType, setCreateType] = useState("Etch");
    const [feeRate, setFeeRate] = useState();
    const [selectedFeeRate, setSelectedFeeRate] = useState();
    const [orderData, setOrderData] = useState();
    const [orderId, setOrderId] = useState("");
    const updateOrderData = async () => {
        openSnackbar("Updating order data.", "success");
        const orderDetail = await getOrdinalBotsOrderStatus(orderData.orderId);
        setOrderData(orderDetail);
    };

    useEffect(() => {
        console.log(walletAccount);
        if (walletAccount) {
            setDestinationAddress(walletAccount.address);
        }
    }, walletAccount);

    useEffect(() => {
        if (!isMintable) {
            setAmount();
            setCap();
        }
    }, [isMintable])

    useEffect(() => {
        if (!feeRate) {
            getUnisatFees();
        }
    }, [feeRate]);

    useEffect(() => {
        setOrderData();
    }, [createType]);

    useEffect(() => {
        var auxPremine = runePremine ? Number(runePremine) : 0;
        var auxAmount = amount ? Number(amount) : 0;
        var auxCap = cap ? Number(cap) : 0;
        var auxMul = auxPremine + (auxAmount * auxCap);
        setSupply(auxPremine+(auxAmount*auxCap));
    }, [runePremine, amount, cap]);

    const getUnisatFees = async () => {
        const fees = await getMempoolFee();
        setFeeRate(fees);
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear() % 100; 
        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');
        const formattedYear = String(year).padStart(2, '0');
        return `${formattedDay}/${formattedMonth}/${formattedYear}`;
    }

    return (
        <Page title="Runes">
            <Stack justifyContent="center" alignItems="center" display="flex" minHeight="80vh">
                <Box
                    maxWidth="md"
                    minWidth="35vw"
                    sx={{
                        borderRadius: "10px",
                        border: darkMode ? "1px solid rgb(255, 255, 255)" : "1px solid rgb(0, 0, 0, 0.3)",
                        padding: "20px 30px"
                    }}
                >
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={createType}
                            onChange={(e) => {
                                setCreateType(e.target.value);
                            }}
                        >
                            <FormControlLabel value="Etch" control={<Radio />} label="Etch" />
                            <FormControlLabel value="Mint" control={<Radio />} label="Mint" />
                            <FormControlLabel value="Detail" control={<Radio />} label="Inscription Detail" />
                        </RadioGroup>
                    </FormControl>
                    {
                        createType === "Etch" ?
                        <>
                            <Stack spacing={2} marginBottom={3} marginTop={3}>
                                <Typography variant="h3">Etch a new Rune</Typography>
                                <Typography variant="caption">Name (13-26 characters, use "•" as separator)</Typography>
                                <TextField
                                    required
                                    placeholder="Rune Name"
                                    margin="dense"
                                    onChange={(e) => {
                                        var aux = e.target.value.toUpperCase();
                                        if (/\d/.test(aux)) {
                                            openSnackbar("Rune name cannot contain numbers.","warning");
                                            return;
                                        }
                                        if (aux.includes("••")) {
                                            openSnackbar("'•' can only be between letters","warning");
                                            return;
                                        }
                                        if (aux.replaceAll("•","").length <= 26) {
                                            setRuneName(e.target.value.toUpperCase());
                                        } else {
                                            openSnackbar("Rune name length removing '•' cannot be higher than 26","warning");
                                            return;
                                        }
                                    }}
                                    value={runeName}
                                    sx={{
                                        "&.MuiTextField-root": {
                                            marginTop: 1
                                        }
                                    }}
                                />
                            </Stack>
                            <Stack spacing={2} marginBottom={3}>
                                <Typography variant="caption">Symbol (A single character)</Typography>
                                <TextField
                                    required
                                    placeholder="Rune Symbol"
                                    margin="dense"
                                    onChange={(e) => {
                                        if (e.target.value.length < 2) {
                                            setRuneSymbol(e.target.value);
                                        }
                                    }}
                                    value={runeSymbol}
                                    sx={{
                                        "&.MuiTextField-root": {
                                            marginTop: 1
                                        }
                                    }}
                                />
                            </Stack>
                            <Stack spacing={2} marginBottom={3}>
                                <Typography variant="caption">Runes Total Supply (auto-calculated, max 21,000,000)</Typography>
                                <TextField
                                    placeholder="Rune Total Supply"
                                    disabled
                                    margin="dense"
                                    value={supply}
                                    sx={{
                                        "&.MuiTextField-root": {
                                            marginTop: 1
                                        }
                                    }}
                                    type="number"
                                />
                            </Stack>
                            <Stack spacing={2} marginBottom={3}>
                                <Typography variant="caption">Divisibility (max 18)</Typography>
                                <TextField
                                    placeholder="Rune Divisibility"
                                    margin="dense"
                                    onChange={(e) => {
                                        if (Number(e.target.value) > 18) {
                                            setRuneDivisibility("18")
                                        } else {
                                            setRuneDivisibility(e.target.value);
                                        }
                                    }}
                                    value={runeDivisibility}
                                    sx={{
                                        "&.MuiTextField-root": {
                                            marginTop: 1
                                        }
                                    }}
                                    type="number"
                                />
                            </Stack>
                            <Stack spacing={2} marginBottom={3}>
                                <Typography variant="caption">Runes Premine</Typography>
                                <TextField
                                    placeholder="Rune Premine"
                                    margin="dense"
                                    onChange={(e) => {
                                        setRunePremine(e.target.value);
                                    }}
                                    value={runePremine}
                                    sx={{
                                        "&.MuiTextField-root": {
                                            marginTop: 1
                                        }
                                    }}
                                    type="number"
                                />
                            </Stack>
                            <Stack spacing={2} marginBottom={3}>
                                <Typography variant="caption">File (required)</Typography>
                                <TextField
                                    placeholder="Rune Premine"
                                    margin="dense"
                                    onChange={(e) => {
                                        var aux = e.target.files[0]
                                        setFile(aux);
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            const dataURL = reader.result;
                                            setFileDataURL(dataURL);
                                        };
                                        reader.readAsDataURL(aux);
                                    }}
                                    sx={{
                                        "&.MuiTextField-root": {
                                            marginTop: 1
                                        }
                                    }}
                                    type="file"
                                />
                            </Stack>
                            <Stack spacing={2} marginBottom={3}>
                                <Typography variant="caption">Turbo Mode (Rune will apply all future protocol changes)</Typography>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={turbo}
                                    onChange={(e) => {
                                        if (e.target.value === "true") {
                                            setTurbo(true);
                                        } else {
                                            setTurbo(false);
                                        }
                                    }}
                                >
                                    <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                    <FormControlLabel value={false} control={<Radio />} label="No" />
                                </RadioGroup>
                            </Stack>
                            <Stack spacing={2} marginBottom={3}>
                                <Typography variant="caption">Is Mintable</Typography>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={isMintable}
                                    onChange={(e) => {
                                        if (e.target.value === "true") {
                                            setIsMintable(true);
                                        } else {
                                            setIsMintable(false);
                                        }
                                    }}
                                >
                                    <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                    <FormControlLabel value={false} control={<Radio />} label="No" />
                                </RadioGroup>
                            </Stack>
                            {
                                isMintable ?
                                <>
                                    <Stack spacing={2} marginBottom={3}>
                                        <Typography variant="caption">Minted Runes per Txn</Typography>
                                        <TextField
                                            placeholder="Minted Runes per Txn"
                                            margin="dense"
                                            onChange={(e) => {
                                                setAmount(e.target.value);
                                            }}
                                            value={amount}
                                            sx={{
                                                "&.MuiTextField-root": {
                                                    marginTop: 1
                                                }
                                            }}
                                            type="number"
                                        />
                                    </Stack>
                                    <Stack spacing={2} marginBottom={3}>
                                        <Typography variant="caption">Allowed number of mints</Typography>
                                        <TextField
                                            placeholder="Allowed number of mints"
                                            margin="dense"
                                            onChange={(e) => {
                                                setCap(e.target.value);
                                            }}
                                            value={cap}
                                            sx={{
                                                "&.MuiTextField-root": {
                                                    marginTop: 1
                                                }
                                            }}
                                            type="number"
                                        />
                                    </Stack>
                                    
                                </> : 
                                null
                            }
                        </> : createType === "Mint" ?
                        <>
                            <Stack spacing={2} marginBottom={3} marginTop={3}>
                                <Typography variant="h3">Mint Runes</Typography>
                                <Typography variant="caption">Existing Rune Name</Typography>
                                <TextField
                                    required
                                    placeholder="Existing Rune Name"
                                    margin="dense"
                                    onChange={(e) => {
                                        var aux = e.target.value.toUpperCase();
                                        if (/\d/.test(aux)) {
                                            openSnackbar("Rune name cannot contain numbers.","warning");
                                            return;
                                        }
                                        if (aux.includes("••")) {
                                            openSnackbar("'•' can only be between letters","warning");
                                            return;
                                        }
                                        if (aux.replaceAll("•","").length <= 26) {
                                            setRuneName(e.target.value.toUpperCase());
                                        } else {
                                            openSnackbar("Rune name length removing '•' cannot be higher than 26","warning");
                                            return;
                                        }
                                    }}
                                    value={runeName}
                                    sx={{
                                        "&.MuiTextField-root": {
                                            marginTop: 1
                                        }
                                    }}
                                />
                            </Stack>
                            <Stack spacing={2} marginBottom={3}>
                                <Typography variant="caption">Mint Repeats</Typography>
                                <TextField
                                    required
                                    placeholder="Mint Repeats"
                                    margin="dense"
                                    onChange={(e) => {
                                        setRepeats(e.target.value);
                                    }}
                                    value={repeats}
                                    sx={{
                                        "&.MuiTextField-root": {
                                            marginTop: 1
                                        }
                                    }}
                                    type="number"
                                />
                            </Stack>
                            <Stack spacing={2} marginBottom={3}>
                                <Typography variant="caption">Receiver Address</Typography>
                                <TextField
                                    required
                                    disabled
                                    placeholder="Receiver Address"
                                    margin="dense"
                                    onChange={(e) => {
                                        setDestinationAddress(e.target.value);
                                    }}
                                    value={destinationAddress}
                                    sx={{
                                        "&.MuiTextField-root": {
                                            marginTop: 1
                                        }
                                    }}
                                />
                            </Stack>
                        </> :
                        <>
                            <Stack spacing={2} marginBottom={3} marginTop={3}>
                                <Typography variant="h3">Inscription Order Detail</Typography>
                                <Typography variant="caption">Order ID</Typography>
                                <TextField
                                    required
                                    placeholder="Order ID"
                                    margin="dense"
                                    onChange={(e) => {
                                        setOrderId(e.target.value);
                                    }}
                                    value={orderId}
                                    sx={{
                                        "&.MuiTextField-root": {
                                            marginTop: 1
                                        }
                                    }}
                                />
                            </Stack>
                        </>
                    }
                    {
                        createType !== "Detail" ?
                        <><Typography variant="caption">Fee Rate sat/vB (lasts to complete)</Typography><br></br>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={selectedFeeRate}
                                onChange={(e) => {
                                    setSelectedFeeRate(e.target.value);
                                }}
                            >
                                <FormControlLabel value={feeRate?.economyFee} control={<Radio />} label={`${feeRate?.economyFee} (>1h)`} />
                                <FormControlLabel value={feeRate?.hourFee} control={<Radio />} label={`${feeRate?.hourFee} (1h)`} />
                                <FormControlLabel value={feeRate?.halfHourFee} control={<Radio />} label={`${feeRate?.halfHourFee} (1/2h)`} />
                                <FormControlLabel value={feeRate?.fastestFee} control={<Radio />} label={`${feeRate?.fastestFee} (<1/2h)`} />
                            </RadioGroup>
                        </FormControl></> : null
                    }
                    <Stack display="flex" justifyContent="space-around" alignItems="center" textAlign="center" sx={{ mt: 1 }} width="100%">
                        {!walletAccount ? (
                            <WalletConnectButton showConnectWallet={showConnectWallet} />
                        ) : (
                            <Stack
                                spacing={2}
                                marginBottom={3}
                                marginTop={3}
                                direction="row"
                                alignItems="center"
                                justifyContent="space-around"
                                display="flex"
                                textAlign="center"
                                width="100%"
                            >
                                <CreateRunesButton 
                                    name={runeName}
                                    symbol={runeSymbol}
                                    mintable={isMintable}
                                    divisibility={runeDivisibility}
                                    supply={supply}
                                    amount={amount}
                                    cap={cap}
                                    premine={runePremine}
                                    turbo={turbo}
                                    receiverAddress={destinationAddress}
                                    file={file}
                                    fileDataURL={fileDataURL}
                                    type={createType}
                                    setOrderData={setOrderData}
                                    orderId={orderId}
                                    repeats={repeats}
                                    feeRate={selectedFeeRate ?? feeRate?.economyFee}
                                />
                                {
                                    orderData && createType !== "Detail" ?
                                    <Button sx={{ padding: 1, width: "35%" }} onClick={() => updateOrderData()} variant="contained">
                                        Update order Status
                                    </Button> : null
                                }
                            </Stack>
                        )}
                        {
                            orderData && walletType && ["Etch", "Mint"].includes(createType) ?
                            <div>
                                <b>Rune Name</b>
                                <p>{orderData.runeName}</p>
                                <b>Inscription Order ID</b><br></br>
                                <small>Save and check status in order detail tab</small>
                                <p>{orderData.orderId}</p>
                            </div> :
                            orderData && !orderData.runeName && createType === "Detail" && walletType ?
                            <div style={{textAlign: "start"}}>
                                <p><b>Type:</b> {orderData.orderType.toUpperCase()}</p>
                                <h1>Payment Info</h1>
                                <p><b>Status:</b> {orderData.charge.status.toUpperCase()}</p>
                                <p><b>Pay BTC Here:</b> {orderData.charge.address}</p>
                                <p><b>Amount: {Number(orderData.charge.amount)*1e-8} BTC</b></p>
                                <p><b>Lightning invoice: {orderData.charge.lightning_invoice.payreq.slice(0,6)}...{orderData.charge.lightning_invoice.payreq.slice(-6,-1)}</b></p>
                                {
                                    orderData.charge.status === "paid" ?
                                    <b>Your payment was received and your order is currently being processed, see details below. It will be sent to the address you provided once finished.</b> :
                                    <b>Payment has not arrived yet. If you already paid, wait for confirmation, if not, pay the displayed amount to the address above.</b>
                                }
                                <h1>Inscription Info</h1>
                                <p><b>Receive address:</b> {orderData.receiveAddress}</p>
                                <p><b>State:</b> {orderData.state.toUpperCase()}</p>
                                <p><b>Date:</b> {formatDate(orderData.createdAt)}</p>
                                {orderData.orderType === "rune-etch" ? <p><b>View Rune: </b> <a href={`https://explorer.ordinalsbot.com/rune/${orderData.runeProperties.rune}`} target="_blank" rel="noreferrer">{orderData.runeProperties.rune}</a></p> : null}
                                <h1>Rune Info</h1>
                                {orderData.orderType === "rune-etch" ? <p><b>Name:</b> {orderData.runeProperties.rune}</p> : <p><b>Name:</b> {orderData.rune}</p>}
                                {
                                    orderData.orderType === "rune-etch" ? 
                                    <div>
                                        <p><b>Supply:</b> {orderData.runeProperties.supply}</p>
                                        <p><b>Premine: </b> {orderData.runeProperties.premine}</p>
                                        {
                                            orderData.runeProperties.terms ?
                                            <div>
                                                <p><b>Amount: </b> {orderData.runeProperties.terms.amount}</p>
                                                <p><b>Cap: </b> {orderData.runeProperties.terms.cap}</p>
                                            </div> : null
                                        }
                                    </div> : 
                                    <div>
                                        <p><b>Number of mints:</b> {orderData.numberOfMints}</p>
                                    </div>
                                }
                                {orderData.orderType === "rune-etch" ? <b>Rune etches consist of a commit and a reveal. There will be at least 6 blocks between the commit and reveal tx</b> : null}
                                {
                                    orderData.etchingTx ?
                                    <div>
                                        <p><b>Commit Txn:</b> {orderData.etchingTx.commit ? <a href={`https://mempool.space/tx/${orderData.etchingTx.commit}`} target="_blank" rel="noreferrer">{orderData.etchingTx.commit}</a> : "Pending txn..."}</p>
                                        <p><b>Reveal Txn:</b> {orderData.etchingTx.reveal ? <a href={`https://mempool.space/tx/${orderData.etchingTx.reveal}`} target="_blank" rel="noreferrer">{orderData.etchingTx.reveal}</a> : "Pending txn..."}</p>
                                    </div> : 
                                    null
                                }
                            </div> :
                            null
                        }
                    </Stack>
                </Box>
            </Stack>
        </Page>
    );
}
