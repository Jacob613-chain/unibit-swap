/******************************
 * This component needs to be refactored
 */
import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import Decimal from "decimal.js";
// Material
import { Box, MenuItem, Stack, TextField, Typography, Button, Input, InputAdornment, Link } from "@mui/material";

import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
// abi
import router_abi from "src/Contracts/router_abi.json";
import token_abi from "src/Contracts/token_abi.json";
// components
import BootstrapDialogTitle from "src/components/common/BootstrapDialogTitle";
import WalletConnectButton from "src/components/WalletConnectButton";
import SwapButton from "./SwapButton";
import SwapSetting from "./SwapSetting";
// context
import { AppContext } from "src/AppContext";
// utils
import { DEFAULT_TOKENS } from "src/utils/tokenList";
import { ADDR_WETH, router_address } from "src/utils/constants";
import getPrice from "src/utils/swapping/getPrice";
import getTokeninfo from "src/utils/swapping/getTokeninfo";
// styles
import { BootstrapDialog } from "src/utils/styles";
import { getDexTokens } from "src/utils/unibitdex/getDexTokens";
import { getTokenBalance } from "src/utils/unibitdex/getTokenBalance";
import { getEthBalance } from "src/utils/unibitdex/getEthBalance";
import { getTokenValueInOtherToken } from "src/utils/unibitdex/getTokenValueInOtherToken";
import { swapToken } from "src/utils/unibitdex/swapToken";

export default function Swapping() {
    const { openSnackbar, modalContext, walletContext, darkMode, setLoading, loading } = useContext(AppContext);
    const { showConnectWallet } = modalContext;
    const { walletAccount, walletType, WalletTypes } = walletContext;
    const [slippage, setSlippage] = useState(0.5);

    const [select1, setSelect1] = useState(); //
    const [select2, setSelect2] = useState(); //

    const [amount1, setAmount1] = useState(0);
    const [amount2, setAmount2] = useState(0);

    const [bal1, setBal1] = useState(0);
    const [bal2, setBal2] = useState(0);

    const [swapPrice, setSwapPrice] = useState(0);

    const [openSelectToken, setOpenSelectToken] = useState(false);
    const [opened, setOpened] = useState(1);
    const [searchAddress, setSearchAddress] = useState("");
    const [tokens, setTokens] = useState([]);
    const [txn, setTxn] = useState();

    useEffect(() => {
        if (select1 >= 0 && walletAccount && walletType === WalletTypes.metamask) {
            console.log(tokens[select1].address);
            if (tokens[select1].address === "main") {
                getEthBalance(setBal1, openSnackbar);
            } else {
                getTokenBalance(tokens[select1].address, setBal1, walletAccount.address, openSnackbar);
            }
        }
        if (select2 >= 0 && walletAccount && walletType === WalletTypes.metamask) {
            if (tokens[select2].address === "main") {
                getEthBalance(setBal2, openSnackbar);
            } else {
                getTokenBalance(tokens[select2].address, setBal2, walletAccount.address, openSnackbar);
            }
        }
        if (select1 >= 0 && select2 >= 0) {
            if (tokens[select1].address === "main") {
                setSwapPrice(parseFloat(1/tokens[select2].tokenValue).toFixed(6));
            } else if (tokens[select2].address === "main") {
                setSwapPrice(parseFloat(tokens[select1].tokenValue).toFixed(6));
            } else {
                getTokenValueInOtherToken(tokens[select1].address, tokens[select2].address, setSwapPrice, openSnackbar);
            }
        }
    }, [select1, select2]);

    useEffect(() => {
        if (tokens.length === 0) {
            getDexTokens(setTokens, openSnackbar);
        }
    }, [tokens]);

    useEffect(() => {
        if (amount1 !== 0) {
            setAmount2(amount1*swapPrice);
        }
    }, [amount1, swapPrice]);

    // useEffect(() => {
    //     if (amount2 !== 0) {
    //         setAmount1(amount2/swapPrice);
    //     }
    // }, [amount2]);

    const reverse_swap = () => {
        setSwapPrice(1/swapPrice);
        setSelect1(select2);
        setSelect2(select1);
        setAmount1(amount2);
    };

    const checkIfContains = (sv, n, s, a) => {
        return n.includes(sv) || s.includes(sv) || a.includes(sv);
    }

    const swapHandler = async () => {
        let we = 0;
        let v = amount1 * Math.pow(10, tokens[select1].decimals);
        if (tokens[select1].address === "main") {
            we = 1;
            v = amount1;
        }
        if (tokens[select2].address === "main") {
            we = 2;
        }
        await swapToken(tokens[select1].address, tokens[select2].address, we, v, openSnackbar, setTxn);
        await getDexTokens(setTokens, openSnackbar);
        if (select1 >= 0 && walletAccount && walletType === WalletTypes.metamask) {
            console.log(tokens[select1].address);
            if (tokens[select1].address === "main") {
                await getEthBalance(setBal1, openSnackbar);
            } else {
                await getTokenBalance(tokens[select1].address, setBal1, walletAccount.address, openSnackbar);
            }
        }
        if (select2 >= 0 && walletAccount && walletType === WalletTypes.metamask) {
            if (tokens[select2].address === "main") {
                await getEthBalance(setBal2, openSnackbar);
            } else {
                await getTokenBalance(tokens[select2].address, setBal2, walletAccount.address, openSnackbar);
            }
        }
        if (select1 >= 0 && select2 >= 0) {
            if (tokens[select1].address === "main") {
                setSwapPrice(parseFloat(1/tokens[select2].tokenValue).toFixed(6));
            } else if (tokens[select2].address === "main") {
                setSwapPrice(parseFloat(tokens[select1].tokenValue).toFixed(6));
            } else {
                await getTokenValueInOtherToken(tokens[select1].address, tokens[select2].address, setSwapPrice, openSnackbar);
            }
        }
    };

    return (
        <Box>
            <Stack alignItems="center" justifyContent="center" minHeight="84vh">
                <Box
                    minWidth="38vw"
                    sx={{
                        borderRadius: "10px",
                        border: darkMode ? "solid 1px rgb(255, 255, 255)" : "solid 1px rgb(0, 0, 0, 0.3)",
                        padding: "15px 35px",
                        mt: 1
                    }}
                >
                    <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h3">Unibit Swap</Typography>
                        <SwapSetting slippage={slippage} setSlippage={setSlippage} />
                    </Stack>
                    <br />
                    <Box>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{
                                border: darkMode ? "solid 1px rgb(255, 255, 255)" : "solid 1px rgb(0, 0, 0, 0.3)",
                                borderRadius: "10px",
                                padding: "20px 20px"
                            }}
                        >
                            <Stack>
                                <Button
                                    id="token1"
                                    value={select1}
                                    variant="outlined"
                                    onClick={() => {
                                        setOpenSelectToken(true);
                                        setOpened(1);
                                    }}
                                    sx={{ minWidth: 120, padding: "10px 0px" }}
                                >
                                    {
                                        select1 >= 0 ?
                                        <Stack direction="row" spacing={0.8} alignItems="center">
                                            <img style={{ height: 23 }} src="static/placeholder.png" />
                                            <Typography variant="s4">{tokens[select1].symbol}</Typography>
                                            <ArrowDropDownIcon />
                                        </Stack> :
                                        <Stack direction="row" spacing={0.8} alignItems="center">
                                            <Typography variant="s4">Select</Typography>
                                            <ArrowDropDownIcon />
                                        </Stack> 
                                    }       
                                </Button>
                                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                                    <Typography>Balance: {Math.round(bal1 * 100000) / 100000}</Typography>
                                    {bal1 > 0 && (
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                maxHeight: "25px",
                                                color: "black",
                                                border: "1px solid rgb(0, 0, 0)",
                                                borderRadius: "10px"
                                            }}
                                            onClick={() => {
                                                setAmount1(bal1);
                                            }}
                                        >
                                            max
                                        </Button>
                                    )}
                                </Box>
                            </Stack>
                            <Input
                                display="flex"
                                onChange={(e) => {
                                    setAmount1(e.target.value);
                                }}
                                value={amount1}
                                placeholder="0.0"
                                disableUnderline
                                sx={{
                                    width: "100%",
                                    input: {
                                        autoComplete: "off",
                                        padding: "10px 0px",
                                        border: "none",
                                        fontSize: "18px",
                                        textAlign: "end",
                                        appearance: "none",
                                        fontWeight: 700
                                    }
                                }}
                            />
                        </Box>
                        <Box textAlign="center" alignItems="center" sx={{ m: -1.8 }}>
                            <SwapVerticalCircleIcon
                                onClick={() => {
                                    reverse_swap();
                                }}
                                sx={{ height: "35px", width: "35px", cursor: "pointer" }}
                            />
                        </Box>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{
                                border: darkMode ? "solid 1px rgb(255, 255, 255)" : "solid 1px rgb(0, 0, 0, 0.3)",
                                borderRadius: "10px",
                                padding: "20px 20px"
                            }}
                        >
                            <Stack>
                                <Button
                                    id="token2"
                                    value={select2}
                                    variant="outlined"
                                    onClick={() => {
                                        setOpenSelectToken(true);
                                        setOpened(2);
                                    }}
                                    sx={{ minWidth: 120, padding: "10px 0px" }}
                                >
                                    {
                                        select2 >= 0 ?
                                        <Stack direction="row" spacing={0.8} alignItems="center">
                                            <img style={{ height: 23 }} src="static/placeholder.png" />
                                            <Typography variant="s4">{tokens[select2].symbol}</Typography>
                                            <ArrowDropDownIcon />
                                        </Stack> :
                                        <Stack direction="row" spacing={0.8} alignItems="center">
                                            <Typography variant="s4">Select</Typography>
                                            <ArrowDropDownIcon />
                                        </Stack> 
                                    }    
                                </Button>
                                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                                    <Typography>Balance: {Math.round(bal2 * 100000) / 100000}</Typography>
                                </Box>
                            </Stack>
                            <Input
                                display="flex"
                                onChange={(e) => {
                                    setAmount2(e.target.value);
                                }}
                                value={amount2}
                                placeholder="0.0"
                                disableUnderline
                                disabled
                                sx={{
                                    width: "100%",
                                    input: {
                                        autoComplete: "off",
                                        padding: "10px 0px",
                                        border: "none",
                                        fontSize: "18px",
                                        textAlign: "end",
                                        appearance: "none",
                                        fontWeight: 700
                                    }
                                }}
                            />
                        </Box>
                        <br />
                        <Box padding="10px">
                            <Stack display="flex" justifyContent="space-between" direction="row">
                                <Typography variant="s1">Slippage</Typography>
                                <Typography variant="s1">{slippage === 100 ? "Auto" : `${slippage}%`}</Typography>
                            </Stack>
                            {
                                select1 >= 0 && select2 >= 0 && <Stack display="flex" justifyContent="space-between" direction="row">
                                    <Typography variant="s1">Price</Typography>
                                    <Typography variant="s1">
                                        {swapPrice}  {tokens[select2].symbol} per {tokens[select1].symbol}
                                    </Typography>
                                </Stack>
                            }
                            <Stack display="flex" justifyContent="space-between" direction="row">
                                <Typography variant="s1">fee</Typography>
                                <Typography variant="s1">0.3%</Typography>
                            </Stack>
                        </Box>
                        <Box display="flex" justifyContent="space-around" alignItems="center" textAlign="center" sx={{ mt: 1 }} width="100%">
                            {walletAccount ? <SwapButton amount1={amount1} swapHandler={swapHandler} /> : <WalletConnectButton showConnectWallet={showConnectWallet} />}
                        </Box>
                        {txn ? <Typography variant="h4" sx={{margin: "20px 0"}}>Liquidity Pool Txn: <Link href={`https://sepolia.etherscan.io/tx/${txn}`} target="_blank" rel="nofereffer">{txn}</Link></Typography> : null}
                    </Box>
                </Box>
            </Stack>
            <BootstrapDialog open={openSelectToken} onClose={() => setOpenSelectToken(false)}>
                    <BootstrapDialogTitle onClose={() => setOpenSelectToken(false)}>
                        <Typography variant="h3">Select a token</Typography>
                    </BootstrapDialogTitle>
                    <Box alignItems="center" sx={{ mt: 1, mb: 2, ml: 2, mr: 2, width:"400px" }}>
                        <TextField
                            placeholder="Search token"
                            fullWidth
                            value={searchAddress}
                            onChange={(e) => {
                                setSearchAddress(e.target.value);
                            }}
                            sx={
                                {
                                    marginBottom: "10px"
                                }
                            }
                        />
                        {
                            tokens.map((token, idx) => {
                                const it = <MenuItem key={idx} value={idx} spacing={2} onClick={() => {
                                    if (opened == 1) {
                                        setSelect1(idx);
                                    } else {
                                        setSelect2(idx);
                                    }
                                    setOpenSelectToken(false);
                                }}>
                                    <Stack direction="row" alignItems="center">
                                        <img style={{ height: 23 }} src="static/placeholder.png"/>
                                        <Typography variant="s1" ml={2}>{token.symbol}</Typography>
                                        <Typography variant="s1" ml={2}>{token.name}</Typography>
                                    </Stack>
                                </MenuItem>;
                                if (searchAddress.length > 0) {
                                    if (checkIfContains(searchAddress, token.name, token.symbol, token.address)) {
                                        return (it);
                                    }
                                } else {
                                    if ((opened === 1 && select2 !== idx) || (opened === 2 && select1 !== idx)) {
                                        return (it);
                                    }
                                }
                            })
                        }
                    </Box>
                </BootstrapDialog>
        </Box>
    );
}
