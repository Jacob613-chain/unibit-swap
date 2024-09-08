import { Box, Button, FormControl, FormControlLabel, Link, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/AppContext";
import WalletConnectButton from "../WalletConnectButton";
import Page from "../Page";
import { getLiquidityPools } from "src/utils/unibitdex/getLiquidityPools";
import { maskAddress } from "src/utils/maskAddress";
import { BootstrapDialog } from "src/utils/styles";
import BootstrapDialogTitle from "../common/BootstrapDialogTitle";
import { getTokenInfo } from "src/utils/unibitdex/getTokenInfo";
import { getTokenBalance } from "src/utils/unibitdex/getTokenBalance";
import { getEthBalance } from "src/utils/unibitdex/getEthBalance";
import { createOrAddLiquidityPool } from "src/utils/unibitdex/createOrAddLiquidityPool";
import { removeLiquidityPool } from "src/utils/unibitdex/removeLiquidityPool";

export default function LiquidityPoolComponent() {

    const { openSnackbar, walletContext, modalContext, darkMode } = useContext(AppContext);
    const { walletAccount, walletType, WalletTypes } = walletContext;
    const { showConnectWallet } = modalContext;
    const [lPIntention, setLPIntention] = useState("List");
    const [lPList, setLPList] = useState();
    const [token, setToken] = useState();
    const [openSelectToken, setOpenSelectToken] = useState(false);
    const [searchAddress, setSearchAddress] = useState();
    const [searchedToken, setSearchedToken] = useState({});
    const [tokenBalance, setTokenBalance] = useState(0);
    const [ethBalance, setEthBalance] = useState(0);
    const [tokenValue, setTokenValue] = useState(0);
    const [ethValue, setEthValue] = useState(0);
    const [selectedPool, setSelectedPool] = useState();
    const [processing, setProcessing] = useState(false);
    const [txn, setTxn] = useState();

    useEffect(() => {
        if (walletAccount && !lPList && walletType === WalletTypes.metamask) {
            getLiquidityPools(walletAccount.address, setLPList, openSnackbar);
        }
    }, [lPList, walletAccount]);

    useEffect(() => {
        if (searchAddress) {
            getTokenInfo(searchAddress, setSearchedToken, openSnackbar);
        }
    }, [searchAddress]);

    useEffect(() => {
        if (token) {
            getTokenBalance(token.address, setTokenBalance, walletAccount.address, openSnackbar);
            setSelectedPool(lPList.find(lp => lp["address"] === token.address));
        }
    }, [token]);

    useEffect(() => {
        if (walletAccount && walletType === WalletTypes.metamask) {
            getEthBalance(setEthBalance, openSnackbar);
        }
    }, [walletAccount]);

    useEffect(() => {
        setToken();
        setTokenValue(0);
        setTokenBalance(0);
        setEthValue(0);
        setSearchAddress();
        setSearchedToken({});
        setSelectedPool();
        setProcessing();
        setTxn();
    }, [lPIntention]);

    const getAddPriceImpact = () => {
        if (selectedPool && tokenValue && ethValue) {
            let newTP = selectedPool.tokenPool + tokenValue;
            let newEP = selectedPool.ethPool + ethValue;
            let newV = newEP / newTP;
            let dif = newV - selectedPool.tokenValue;
            let perc = dif * 100 / selectedPool.tokenValue;
            perc = parseFloat(perc).toFixed(3);
            if (perc < 0) {
                return <Typography variant="h4" sx={{margin: "10px 0"}}>Price Impact: <Typography color="red">{perc}%</Typography></Typography>
            } else {
                return <Typography variant="h4" sx={{margin: "10px 0"}}>Price Impact: <Typography color="green">{perc}%</Typography></Typography>
            }
        }
    }

    const getRemovePriceImpact = () => {
        if (selectedPool && tokenValue && ethValue) {
            let newTP = selectedPool.tokenPool - tokenValue;
            let newEP = selectedPool.ethPool - ethValue;
            let newV = newEP / newTP;
            let dif = newV - selectedPool.tokenValue;
            let perc = dif * 100 / selectedPool.tokenValue;
            perc = parseFloat(perc).toFixed(3);
            if (perc < 0) {
                return <Typography variant="h4" sx={{margin: "10px 0"}}>Price Impact: <Typography color="red">{perc}%</Typography></Typography>
            } else {
                return <Typography variant="h4" sx={{margin: "10px 0"}}>Price Impact: <Typography color="green">{perc}%</Typography></Typography>
            }
        }
    }

    const handleCreatePool = async () => {
        setProcessing(true);
        if (token) {
            await createOrAddLiquidityPool(token.address, tokenValue, ethValue, openSnackbar, setTxn);
        }
        setProcessing(false);
        getLiquidityPools(walletAccount.address, setLPList, openSnackbar);
        getTokenBalance(token.address, setTokenBalance, walletAccount.address, openSnackbar);
        getEthBalance(setEthBalance, openSnackbar);
        setTokenValue(0);
        setEthValue(0);
    }

    const handleRemovePool = async () => {
        setProcessing(true);
        if (token) {
            await removeLiquidityPool(token.address, tokenValue, ethValue, openSnackbar, setTxn);
        }
        setProcessing(false);
        getLiquidityPools(walletAccount.address, setLPList, openSnackbar);
        getTokenBalance(token.address, setTokenBalance, walletAccount.address, openSnackbar);
        getEthBalance(setEthBalance, openSnackbar);
        setTokenValue(0);
        setEthValue(0);
    }

    return (
        <Page title="Liquidity Pool">
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
                    <Typography variant="h1">Liquidity Pool</Typography>
                    {
                        walletAccount && walletType === WalletTypes.metamask ?
                            <Stack>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={lPIntention}
                                        onChange={(e) => {
                                            setLPIntention(e.target.value);
                                        }}
                                    >
                                        <FormControlLabel value="List" control={<Radio />} label="My Pools" />
                                        <FormControlLabel value="Create" control={<Radio />} label="Create/Add LP" />
                                        <FormControlLabel value="Remove" control={<Radio />} label="Remove LP" />
                                    </RadioGroup>
                                </FormControl>
                                {
                                    lPIntention === "List" ?
                                        <Stack>
                                            <TableContainer>
                                                <Table aria-label="caption table">
                                                    { !lPList || lPList?.length === 0 ? <caption>You don't have liquidity pools created yet.</caption> : null }
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Token Address</TableCell>
                                                            <TableCell>Token Name</TableCell>
                                                            <TableCell>Token Symbol</TableCell>
                                                            <TableCell>Token Pool</TableCell>
                                                            <TableCell>Eth Pool</TableCell>
                                                            <TableCell>Token Value (in ETH)</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            !lPList ?
                                                                null :
                                                                lPList.map((lp) => (
                                                                    <TableRow key={lp.address} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                        <TableCell>{maskAddress(lp.address)}</TableCell>
                                                                        <TableCell>{lp.name}</TableCell>
                                                                        <TableCell>{lp.symbol}</TableCell>
                                                                        <TableCell>{lp.tokenPool}</TableCell>
                                                                        <TableCell>{lp.ethPool}</TableCell>
                                                                        <TableCell>{lp.tokenValue} $ETH</TableCell>
                                                                    </TableRow>
                                                                ))
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Stack> : lPIntention === "Create" ?
                                            <Stack>
                                                <Stack display="flex" direction="row" alignItems="center" justifyContent="space-between" sx={{
                                                    border: darkMode ? "1px solid rgb(255, 255, 255)" : "1px solid rgb(0, 0, 0, 0.3)",
                                                    borderRadius: "10px",
                                                    padding: "0px 10px",
                                                    marginTop: "10px"
                                                }}>
                                                    <Stack display="flex" direction="row" alignItems="center">
                                                        <Stack display="flex" alignItems="center" direction="row" justifyContent="center" sx={{
                                                            borderRadius: "10px",
                                                            border: darkMode ? "1px solid rgb(255, 255, 255)" : "1px solid rgb(0, 0, 0, 0.3)",
                                                            padding: "10px 10px",
                                                            width: "100px",
                                                            cursor: "pointer"
                                                        }} onClick={() => setOpenSelectToken(true)}>
                                                            {
                                                                token ?
                                                                <Stack direction="row">
                                                                    <img style={{ height: 23 }} src="static/placeholder.png" />
                                                                    <Typography variant="s3">{token.symbol}</Typography>
                                                                </Stack> :
                                                                <Typography variant="s3">Select</Typography>
                                                            }
                                                        </Stack>
                                                        <TextField
                                                            variant="standard"
                                                            placeholder={token ? "Enter a number" : "Select a token"}
                                                            value={tokenValue}
                                                            onChange={(e) => {
                                                                if (Number(e.target.value) <= tokenBalance) {
                                                                    setTokenValue(Number(e.target.value));
                                                                } else {
                                                                    setTokenValue(tokenBalance);
                                                                }
                                                            }}
                                                            InputProps={{
                                                                disableUnderline: true,
                                                            }}
                                                            sx={{
                                                                padding: "20px 20px",
                                                                input: {
                                                                    fontSize: "18px"
                                                                }
                                                            }}
                                                            type="number"
                                                        />
                                                    </Stack>
                                                    <Typography>Balance: {tokenBalance}</Typography>
                                                </Stack>
                                                <Stack display="flex" direction="row" alignItems="center" justifyContent="space-between" sx={{
                                                    border: darkMode ? "1px solid rgb(255, 255, 255)" : "1px solid rgb(0, 0, 0, 0.3)",
                                                    borderRadius: "10px",
                                                    padding: "0px 10px",
                                                    marginTop: "10px"
                                                }}>
                                                    <Stack display="flex" direction="row" alignItems="center">
                                                        <Stack display="flex" alignItems="center" direction="row" justifyContent="center" sx={{
                                                            borderRadius: "10px",
                                                            border: darkMode ? "1px solid rgb(255, 255, 255)" : "1px solid rgb(0, 0, 0, 0.3)",
                                                            padding: "10px 10px",
                                                            width: "100px"
                                                        }}>
                                                            <Stack direction="row">
                                                                <img style={{ height: 23 }} src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029" />
                                                                <Typography variant="s3">ETH</Typography>
                                                            </Stack> 
                                                        </Stack>
                                                        <TextField
                                                            variant="standard"
                                                            placeholder="Enter a number"
                                                            value={ethValue}
                                                            onChange={(e) => {
                                                                if (Number(e.target.value) <= ethBalance) {
                                                                    setEthValue(Number(e.target.value));
                                                                } else {
                                                                    setEthValue(ethBalance);
                                                                }
                                                            }}
                                                            InputProps={{
                                                                disableUnderline: true,
                                                            }}
                                                            sx={{
                                                                padding: "20px 20px",
                                                                input: {
                                                                    fontSize: "18px"
                                                                }
                                                            }}
                                                            type="number"
                                                        />
                                                    </Stack>
                                                    <Typography>Balance: {ethBalance}</Typography>
                                                </Stack>
                                                {
                                                    token && selectedPool ?
                                                    <Stack sx={{margin: "20px 0"}}>
                                                        <Typography variant="h3" sx={{margin: "5px 0"}}>Current Liquidity Pool</Typography>
                                                        <Typography variant="h4" sx={{margin: "10px 0"}}>${token.symbol} Pool: {selectedPool.tokenPool}</Typography>
                                                        <Typography variant="h4" sx={{margin: "10px 0"}}>$ETH Pool: {selectedPool.ethPool}</Typography>
                                                        {getAddPriceImpact()}
                                                    </Stack> : null
                                                }
                                                <Button variant="outlined" sx={{
                                                    marginTop: "10px",
                                                    padding: "10px"
                                                }} onClick={handleCreatePool}>
                                                    {
                                                        processing ?
                                                        <Typography variant="h4">Processing Liquidity Pool</Typography> :
                                                        <Typography variant="h4">
                                                            {token && selectedPool ? "Add to" : "Create"} Liquidity Pool
                                                        </Typography>
                                                    }
                                                </Button>
                                                {txn ? <Typography variant="h4" sx={{margin: "20px 0"}}>Liquidity Pool Txn: <Link href={`https://sepolia.etherscan.io/tx/${txn}`} target="_blank" rel="nofereffer">{txn}</Link></Typography> : null}
                                            </Stack> : lPIntention === "Remove" ?
                                            <Stack>
                                                <Stack display="flex" direction="row" alignItems="center" justifyContent="space-between" sx={{
                                                    border: darkMode ? "1px solid rgb(255, 255, 255)" : "1px solid rgb(0, 0, 0, 0.3)",
                                                    borderRadius: "10px",
                                                    padding: "0px 10px",
                                                    marginTop: "10px"
                                                }}>
                                                    <Stack display="flex" direction="row" alignItems="center">
                                                        <Stack display="flex" alignItems="center" direction="row" justifyContent="center" sx={{
                                                            borderRadius: "10px",
                                                            border: darkMode ? "1px solid rgb(255, 255, 255)" : "1px solid rgb(0, 0, 0, 0.3)",
                                                            padding: "10px 10px",
                                                            width: "100px",
                                                            cursor: "pointer"
                                                        }} onClick={() => setOpenSelectToken(true)}>
                                                            {
                                                                token ?
                                                                <Stack direction="row">
                                                                    <img style={{ height: 23 }} src="static/placeholder.png" />
                                                                    <Typography variant="s3">{token.symbol}</Typography>
                                                                </Stack> :
                                                                <Typography variant="s3">Select</Typography>
                                                            }
                                                        </Stack>
                                                        <TextField
                                                            variant="standard"
                                                            placeholder={token ? "Enter a number" : "Select a token"}
                                                            value={tokenValue}
                                                            onChange={(e) => {
                                                                if (selectedPool) {
                                                                    if (Number(e.target.value) <= selectedPool.tokenPool) {
                                                                        setTokenValue(Number(e.target.value));
                                                                    } else {
                                                                        setTokenValue(selectedPool.tokenPool)
                                                                    }
                                                                }
                                                            }}
                                                            InputProps={{
                                                                disableUnderline: true,
                                                            }}
                                                            sx={{
                                                                padding: "20px 20px",
                                                                input: {
                                                                    fontSize: "18px"
                                                                }
                                                            }}
                                                            type="number"
                                                        />
                                                    </Stack>
                                                </Stack>
                                                <Stack display="flex" direction="row" alignItems="center" justifyContent="space-between" sx={{
                                                    border: darkMode ? "1px solid rgb(255, 255, 255)" : "1px solid rgb(0, 0, 0, 0.3)",
                                                    borderRadius: "10px",
                                                    padding: "0px 10px",
                                                    marginTop: "10px"
                                                }}>
                                                    <Stack display="flex" direction="row" alignItems="center">
                                                        <Stack display="flex" alignItems="center" direction="row" justifyContent="center" sx={{
                                                            borderRadius: "10px",
                                                            border: darkMode ? "1px solid rgb(255, 255, 255)" : "1px solid rgb(0, 0, 0, 0.3)",
                                                            padding: "10px 10px",
                                                            width: "100px"
                                                        }}>
                                                            <Stack direction="row">
                                                                <img style={{ height: 23 }} src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029" />
                                                                <Typography variant="s3">ETH</Typography>
                                                            </Stack> 
                                                        </Stack>
                                                        <TextField
                                                            variant="standard"
                                                            placeholder="Enter a number"
                                                            value={ethValue}
                                                            onChange={(e) => {
                                                                if (selectedPool) {
                                                                    if (Number(e.target.value) <= selectedPool.ethPool) {
                                                                        setEthValue(Number(e.target.value));
                                                                    } else {
                                                                        setEthValue(selectedPool.ethPool)
                                                                    }
                                                                }
                                                            }}
                                                            InputProps={{
                                                                disableUnderline: true,
                                                            }}
                                                            sx={{
                                                                padding: "20px 20px",
                                                                input: {
                                                                    fontSize: "18px"
                                                                }
                                                            }}
                                                            type="number"
                                                        />
                                                    </Stack>
                                                </Stack>
                                                {
                                                    token && selectedPool ?
                                                    <Stack sx={{margin: "20px 0"}}>
                                                        <Typography variant="h3" sx={{margin: "5px 0"}}>Current Liquidity Pool</Typography>
                                                        <Typography variant="h4" sx={{margin: "10px 0"}}>${token.symbol} Pool: {selectedPool.tokenPool}</Typography>
                                                        <Typography variant="h4" sx={{margin: "10px 0"}}>$ETH Pool: {selectedPool.ethPool}</Typography>
                                                        {getRemovePriceImpact()}
                                                    </Stack> : token && !selectedPool ?
                                                    <Stack sx={{margin: "20px 0"}}>
                                                        <Typography variant="h4" sx={{margin: "10px 0", color: "red"}}>You don't have Liquidity Pool for this token.</Typography>
                                                    </Stack> : null
                                                }
                                                <Button variant="outlined" sx={{
                                                    marginTop: "10px",
                                                    padding: "10px"
                                                }} onClick={handleRemovePool}>
                                                    <Typography variant="h4">
                                                        {
                                                            processing ?
                                                            "Processing Liquidity Pool" :
                                                            "Remove Liquidity Pool"
                                                        }
                                                    </Typography>
                                                </Button>
                                                {txn ? <Typography variant="h4" sx={{margin: "20px 0"}}>Liquidity Pool Txn: <Link href={`https://sepolia.etherscan.io/tx/${txn}`} target="_blank" rel="nofereffer">{txn}</Link></Typography> : null}
                                            </Stack> :
                                            null
                                }
                            </Stack> : !walletAccount ?
                                <Stack display="flex" justifyContent="space-around" alignItems="center" sx={{ mt: 1 }} width="100%">
                                    <WalletConnectButton showConnectWallet={showConnectWallet} />
                                </Stack> :
                                <Stack>
                                    <h1>This feature is not supported for your wallet.</h1>
                                </Stack>
                    }
                </Box>
            </Stack>
            {
                openSelectToken &&
                <BootstrapDialog open={openSelectToken} onClose={() => setOpenSelectToken(false)}>
                    <BootstrapDialogTitle onClose={() => setOpenSelectToken(false)}>
                        <Typography variant="h3">Select a token</Typography>
                    </BootstrapDialogTitle>
                    <Box alignItems="center" sx={{ mt: 1, mb: 2, ml: 2, mr: 2, width:"400px" }}>
                        <TextField
                            placeholder="Search token address"
                            fullWidth
                            value={searchAddress}
                            onChange={(e) => {
                                setSearchAddress(e.target.value);
                            }}
                        />
                        {
                            searchedToken.name ?
                                <Stack>
                                    <Typography>Token Name: {searchedToken.name}</Typography>
                                    <Typography>Token Symbol: {searchedToken.symbol}</Typography>
                                    <Typography>Token Decimals: {searchedToken.decimals}</Typography>
                                    <Button variant="outlined" onClick={() => {
                                        setToken(searchedToken);
                                        setOpenSelectToken(false);
                                    }}>
                                        Use token
                                    </Button>
                                </Stack> : searchedToken.error ?
                                <Typography color="red">Token not found.</Typography> : null
                        }
                    </Box>
                </BootstrapDialog>
            }
        </Page>
    );
}