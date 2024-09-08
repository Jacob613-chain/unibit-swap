/******************************
 * This component needs to be refactored
 */
import React, { useState } from "react";
// Material
import { Box, MenuItem, Stack, TextField, Typography, Button, Input, InputAdornment } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
// abi
// components
import BootstrapDialogTitle from "src/components/common/BootstrapDialogTitle";
// styles
import { BootstrapDialog } from "src/utils/styles";
export default function TokenSelectDialog({ open, handleClose, handleSelect }) {
    const [search, setSearch] = useState("");
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (/^0x[a-fA-F0-9]{40}$/g.test(value)) {
            console.log("Valid Ethereum address:", value);
            for (let i = 0; i < DEFAULT_TOKENS.length; i++) {
                if (DEFAULT_TOKENS[i].address === value.toString()) {
                    openSnackbar("Already added token", "error");
                    return false;
                }
            }
            getTokeninfo(value.toString()).then((result) => {
                if (result) {
                    const symbol = result[0];
                    const decimal = result[1];
                    console.log(symbol, decimal);
                    const data = {
                        id: DEFAULT_TOKENS.length,
                        symbol: symbol,
                        address: value.toString(),
                        decimal: decimal,
                        description: "Found by address",
                        logo: "static/default.svg"
                    };
                    setImportData(data);
                }
            });
        } else {
            if (value != 0) openSnackbar("Wrong address! Please input correct Address.", "error");
        }
    };

    return (
        <BootstrapDialog open={open} onClose={handleClose} aria-labelledby="Select-title">
            <BootstrapDialogTitle id="Select-title" onClose={handleClose}>
                <Typography variant="h3">Select a Token</Typography>
            </BootstrapDialogTitle>
            <Box alignItems="center" sx={{ mt: 1, mb: 2, ml: 2, mr: 2 }}>
                <TextField
                    placeholder="Search Token by address"
                    fullWidth
                    value={search}
                    onChange={handleSearch}
                    InputProps={{
                        type: "search",
                        startAdornment: (
                            <InputAdornment position="start" sx={{ mr: 0.7 }}>
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: <InputAdornment position="end" />
                    }}
                />
            </Box>
            <Box width="450px" alignItems="center" padding="10px">
                {importData ? (
                    <Box justifyContent="space-between" display="flex">
                        <Stack direction="row" alignItems="center">
                            <img style={{ height: 23 }} src={importData.logo} />
                            <Typography variant="s1" ml={2}>
                                {importData.symbol}
                            </Typography>
                            <Typography variant="s4" ml={2}>
                                {importData.description}
                            </Typography>
                        </Stack>
                        <Button variant="outlined" sx={{ ":hover": { background: "#1fc7d4" } }} onClick={importHandler1}>
                            Import
                        </Button>
                    </Box>
                ) : (
                    <>
                        {tokens.map((row, idx) => (
                            <MenuItem key={row.id} value={row.id} spacing={2} onClick={() => handleSelect1(row.id)}>
                                <Stack direction="row" alignItems="center">
                                    <img style={{ height: 23 }} src={row.logo} />
                                    <Typography variant="s1" ml={2}>
                                        {row.symbol}
                                    </Typography>
                                    <Typography variant="s4" ml={2}>
                                        {row.description}
                                    </Typography>
                                </Stack>
                            </MenuItem>
                        ))}
                    </>
                )}
            </Box>
        </BootstrapDialog>
    );
}
