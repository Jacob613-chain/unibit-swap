import { useState, useContext, useEffect } from "react";
// Material
import { Box, Stack, TextField, Button, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
// Context
import { AppContext } from "src/AppContext";
//component
import Page from "src/components/Page";
import CreateBRC20Button from "./CreateBRC20Button";
import WalletConnectButton from "../WalletConnectButton";
import getUnisatOrder from "src/utils/inscriptions/getUnisatOrder";
import getMempoolFee from "src/utils/fees/getMempoolFee";

export default function CreateBRC20() {
    const { openSnackbar, darkMode, walletContext, modalContext } = useContext(AppContext);
    const { walletAccount, walletType, WalletTypes } = walletContext;
    const { showConnectWallet } = modalContext;
    const [tokenName, setTokenName] = useState("");
    const [tokenMax, setTokenMax] = useState("");
    const [tokenLim, setTokenLim] = useState("");
    const [mintAm, setMintAm] = useState("");
    const [receiverAddress, setReceiverAddress] = useState();
    const [createType, setCreateType] = useState("Deploy");
    const [orderData, setOrderData] = useState();
    const [orderId, setOrderId] = useState("");
    const [feeRate, setFeeRate] = useState();
    const [selectedFeeRate, setSelectedFeeRate] = useState();
    const updateOrderData = async () => {
        openSnackbar("Updating order data.", "success");
        const orderDetail = await getUnisatOrder(openSnackbar, orderData.orderId);
        setOrderData(orderDetail);
    };

    useEffect(() => {
        if (walletAccount) {
            setReceiverAddress(walletAccount.address);
        }
    }, walletAccount);

    useEffect(() => {
        if (!feeRate) {
            getUnisatFees();
        }
    }, [feeRate]);

    const getUnisatFees = async () => {
        const fees = await getMempoolFee();
        setFeeRate(fees);
    }

    return (
        <Page title="Create">
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
                            <FormControlLabel value="Deploy" control={<Radio />} label="Deploy" />
                            <FormControlLabel value="Mint" control={<Radio />} label="Mint" />
                            {
                                walletType == WalletTypes.unisat ?
                                <FormControlLabel value="Detail" control={<Radio />} label="Inscription Detail" /> : null
                            }
                        </RadioGroup>
                    </FormControl>
                    {
                        createType === "Deploy" ?
                        <>
                            <Stack spacing={2} marginBottom={3} marginTop={3}>
                                <Typography variant="h3">Create New BRC20 Token</Typography>
                                <Typography variant="caption">Token Name (max 4 characters)</Typography>
                                <TextField
                                    required
                                    placeholder="Token Name"
                                    margin="dense"
                                    onChange={(e) => {
                                        if (e.target.value.length < 5) {
                                            setTokenName(e.target.value);
                                        }
                                    }}
                                    value={tokenName}
                                    sx={{
                                        "&.MuiTextField-root": {
                                            marginTop: 1
                                        }
                                    }}
                                />
                            </Stack>
                            <Stack spacing={2} marginBottom={3}>
                                <Typography variant="caption">Symbol</Typography>
                                <TextField
                                    required
                                    disabled
                                    placeholder="Token Symbol"
                                    margin="dense"
                                    onChange={(e) => {
                                        setTokenName(e.target.value);
                                    }}
                                    value={tokenName}
                                    sx={{
                                        "&.MuiTextField-root": {
                                            marginTop: 1
                                        }
                                    }}
                                />
                            </Stack>
                            <Stack spacing={2} marginBottom={3}>
                                <Typography variant="caption">Total Supply</Typography>
                                <TextField
                                    required
                                    placeholder="Token Total Supply"
                                    margin="dense"
                                    onChange={(e) => {
                                        setTokenMax(e.target.value);
                                    }}
                                    value={tokenMax}
                                    sx={{
                                        "&.MuiTextField-root": {
                                            marginTop: 1
                                        }
                                    }}
                                    type="number"
                                />
                            </Stack>
                            <Stack spacing={2} marginBottom={3}>
                                <Typography variant="caption">Maximum Mint Quantity</Typography>
                                <TextField
                                    required
                                    placeholder="Token Maximum Mint Quantity"
                                    margin="dense"
                                    onChange={(e) => {
                                        setTokenLim(e.target.value);
                                    }}
                                    value={tokenLim}
                                    sx={{
                                        "&.MuiTextField-root": {
                                            marginTop: 1
                                        }
                                    }}
                                    type="number"
                                />
                            </Stack>
                        </> : createType === "Mint" ?
                        <>
                            <Stack spacing={2} marginBottom={3} marginTop={3}>
                                <Typography variant="h3">Mint BRC20 Token</Typography>
                                <Typography variant="caption">Token Name</Typography>
                                <TextField
                                    required
                                    placeholder="Token Name"
                                    margin="dense"
                                    onChange={(e) => {
                                        if (e.target.value.length < 5) {
                                            setTokenName(e.target.value);
                                        }
                                    }}
                                    value={tokenName}
                                    sx={{
                                        "&.MuiTextField-root": {
                                            marginTop: 1
                                        }
                                    }}
                                />
                            </Stack>
                            <Stack spacing={2} marginBottom={3}>
                                <Typography variant="caption">Amount to Mint</Typography>
                                <TextField
                                    required
                                    placeholder="Amount to Mint"
                                    margin="dense"
                                    onChange={(e) => {
                                        setMintAm(e.target.value);
                                    }}
                                    value={mintAm}
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
                                        setReceiverAddress(e.target.value);
                                    }}
                                    value={receiverAddress}
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
                                <CreateBRC20Button 
                                    tick={tokenName}
                                    max={tokenMax}
                                    lim={tokenLim}
                                    amt={mintAm}
                                    receiverAddress={receiverAddress}
                                    type={createType}
                                    setOrderData={setOrderData}
                                    orderId={orderId}
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
                            orderData && walletType === WalletTypes.unisat ?
                            <div>
                                <b>BRC20 Ticker</b>
                                <p>{JSON.parse(orderData.files[0].filename).tick}</p>
                                <b>Inscription Order ID</b><br></br>
                                <small>Save to check later</small>
                                <p>{orderData.orderId}</p>
                                <b>Inscription Status</b>
                                <p>{orderData.status}</p>
                                <p>{orderData.confirmedCount + orderData.unconfirmedCount} / {orderData.count} Processed</p>
                                <p>{orderData.confirmedCount} Confirmed, {orderData.unconfirmedCount} Unconfirmed</p>
                                {
                                    orderData.files[0].status === "pending" ?
                                    <div>
                                        <b>Inscription detail</b><br></br>
                                        <a href="https://unisat.io/orders/inscribe" target="_blank" rel="no-referrer">Inscription still pending, track your unisat order here.</a>
                                    </div> :
                                    orderData.files[0].inscriptionId ?
                                    <div>
                                        <b>Inscription detail</b><br></br>
                                        <a href={`https://unisat.io/inscription/${orderData.files[0].inscriptionId}`} target="_blank" rel="no-referrer">Check inscription detail</a>
                                    </div> :
                                    null
                                }
                            </div> :
                            orderData && walletType === WalletTypes.xverse ?
                            <div>
                                <b>BRC20 Ticker</b>
                                <p>{tokenName}</p>
                                <b>Transaction ID</b><br></br>
                                <a href={`https://mempool.space/tx/${orderData}`}>{orderData}</a>
                            </div>: null
                        }
                    </Stack>
                </Box>
            </Stack>
        </Page>
    );
}
