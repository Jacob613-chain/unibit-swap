/******************************
 * This component needs to be refactored
 */
import React, { useState } from "react";
import { Box, Stack, Typography, Button, Input, IconButton, FormControlLabel, DialogActions, InputAdornment } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { IOSSwitch, BootstrapDialog } from "src/utils/styles";
import BootstrapDialogTitle from "src/components/common/BootstrapDialogTitle";

export default function SwapSetting({ slippage, setSlippage }) {
    const [open, setOpen] = useState(false);
    const [autoSlippage, setAutoSlippage] = useState(false);
    const autoslippageHandler = (e) => {
        if (e.target.checked) {
            setSlippage(100);
            setAutoSlippage(true);
        } else {
            setAutoSlippage(false);
        }
    };

    const handleClickOpen = () => {
        if (open === true) {
            return;
        }
        setOpen(true);
    };

    const handleClose = (e) => {
        setOpen(false);
    };
    return (
        <IconButton onClick={handleClickOpen}>
            <SettingsIcon />
            <BootstrapDialog open={open} onClose={handleClose} aria-labelledby="customized-dialog-title">
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography variant="h3">Setting Slippage</Typography>
                </BootstrapDialogTitle>
                <Box alignItems="center">
                    <DialogActions>
                        <Box width="98%" alignItems="center" justifyContent="center" minHeight="300px" minWidth="450px">
                            <Stack spacing={1}>
                                <Stack width="100%" display="flex" alignItems="center" justifyContent="space-between" direction="row">
                                    <Typography variant="s1">Automatic Slippage Tolerance</Typography>
                                    <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} checked={autoSlippage} onChange={autoslippageHandler} />} />
                                </Stack>
                                <Stack display="flex" justifyContent="space-between" direction="row">
                                    <Typography variant="s1">Slippage</Typography>
                                    <Typography variant="s1" sx={{ mr: 2 }}>
                                        {slippage === 100 ? "Auto" : `${slippage}%`}
                                    </Typography>
                                </Stack>
                                {slippage === 0.1 && <Typography color="red">Your transaction may be reverted due to low slippage tolerance</Typography>}
                                <br />
                                {autoSlippage === false && (
                                    <Stack display="flex" spacing={2} direction="row" alignItems="center">
                                        <Box>
                                            <Button
                                                onClick={() => {
                                                    setSlippage(0.1);
                                                }}
                                            >
                                                0.1%
                                            </Button>
                                        </Box>
                                        <Box>
                                            <Button
                                                onClick={() => {
                                                    setSlippage(0.5);
                                                }}
                                            >
                                                0.5%
                                            </Button>
                                        </Box>
                                        <Box>
                                            <Button
                                                onClick={() => {
                                                    setSlippage(1);
                                                }}
                                            >
                                                1.0%
                                            </Button>
                                        </Box>
                                        <Box>
                                            <Input
                                                disableUnderline
                                                onChange={(e) => {
                                                    setSlippage(e.target.value);
                                                }}
                                                placeholder="Custom"
                                            ></Input>
                                        </Box>
                                    </Stack>
                                )}
                            </Stack>
                        </Box>
                    </DialogActions>
                </Box>
            </BootstrapDialog>
        </IconButton>
    );
}
