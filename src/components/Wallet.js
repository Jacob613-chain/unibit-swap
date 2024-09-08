/******************************
 * This component needs to be updated to include more wallets
 */
import { useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
// Material
import { alpha, Avatar, Badge, Button, IconButton, Link, MenuItem, Popover, Stack, Typography, DialogActions, Box } from "@mui/material";
// Iconify
import { Icon } from "@iconify/react";
import userLock from "@iconify/icons-fa-solid/user-lock";
// Context
import { useContext } from "react";
import { AppContext } from "src/AppContext";
// Utils
import connectMetamask from "src/utils/wallet-connect/connectMetamask";
import connectXverse from "src/utils/wallet-connect/connectXverse";
import connectUnisat from "src/utils/wallet-connect/connectUnisat";

import BootstrapDialogTitle from "src/components/common/BootstrapDialogTitle";
//styles
import { BootstrapDialog } from "src/utils/styles";
export default function Wallet() {
    const { modalContext, walletContext, openSnackbar } = useContext(AppContext);
    const { modal, showConnectWallet, hideModal } = modalContext;
    const { walletAccount, setWalletAccount, setWalletType, WalletTypes } = walletContext;
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    let logoImageUrl = null;
    // menu open and close
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // modal open and close
    function handleOpenModal() {
        showConnectWallet();
    }
    function handleCloseWallet() {
        hideModal();
        handleClose();
    }
    // logout action
    const handleLogout = () => {
        handleClose();
        setWalletAccount(null);
        setWalletType(WalletTypes.none);
    };

    const ModalWallet = () => {
        return (
            <BootstrapDialog open={modal === "wallet"} onClose={modal === "wallet" ? handleCloseWallet : null} aria-labelledby="customized-dialog-title">
                <BootstrapDialogTitle id="customized-dialog-title" onClose={modal === "wallet" ? handleCloseWallet : null}>
                    <Typography variant="h3">Connect Wallet</Typography>
                </BootstrapDialogTitle>
                <Box alignItems="center">
                    <DialogActions>
                        <Box width="98%" alignItems="center" justifyContent="center" minHeight="260px" minWidth="450px">
                            <Stack width="100%" spacing={1} display="flex" alignItems="center" justifyContent="center">
                                <Button
                                    sx={{ width: "85%" }}
                                    onClick={async () => {
                                        await connectMetamask(handleCloseWallet, setWalletAccount, setWalletType, WalletTypes, openSnackbar);
                                    }}
                                >
                                    <Stack width="100%" display="flex" alignItems="center" justifyContent="space-between" direction="row">
                                        <Icon>
                                            <img src="static/wallet/meta.png" height="50px" />
                                        </Icon>
                                        <Typography variant="s1">Metamask</Typography>
                                    </Stack>
                                </Button>
                                <Button
                                    sx={{ width: "85%" }}
                                    onClick={async () => {
                                        await connectXverse(handleCloseWallet, setWalletAccount, setWalletType, WalletTypes, openSnackbar);
                                    }}
                                >
                                    <Stack width="100%" display="flex" alignItems="center" justifyContent="space-between" direction="row">
                                        <Icon>
                                            <img src="static/wallet/xverse-wallet.svg" height="50px" />
                                        </Icon>
                                        <Typography variant="s1">Xverse</Typography>
                                    </Stack>
                                </Button>
                                <Button
                                    sx={{ width: "85%" }}
                                    onClick={async () => {
                                        await connectUnisat(handleCloseWallet, setWalletAccount, setWalletType, WalletTypes, openSnackbar);
                                    }}
                                >
                                    <Stack width="100%" display="flex" alignItems="center" justifyContent="space-between" direction="row">
                                        <Icon>
                                            <img src="static/wallet/unisat-wallet.svg" height="50px" />
                                        </Icon>

                                        <Typography variant="s1">Unisat</Typography>
                                    </Stack>
                                </Button>
                            </Stack>
                        </Box>
                    </DialogActions>
                </Box>
            </BootstrapDialog>
        );
    };

    return (
        <>
            <IconButton ref={anchorRef} onClick={handleOpen}>
                <Badge color="primary">
                    {logoImageUrl ? <Avatar variant={accountLogo ? "" : "square"} alt="user" src={logoImageUrl} sx={{ width: 32, height: 32 }} /> : <Icon icon={userLock} />}
                </Badge>
            </IconButton>
            <Popover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef.current}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                    sx: {
                        mt: 1.5,
                        ml: 0.5,
                        overflow: "inherit",
                        border: (theme) => `solid 1px ${alpha("#919EAB", 0.08)}`,
                        width: 220
                    }
                }}
            >
                {walletAccount ? (
                    <Stack spacing={1} alignItems="center" sx={{ pt: 1, pb: 2 }}>
                        <Link
                            color="inherit"
                            target="_blank"
                            // href={`https://arbiscan.io/address/${walletaccount}`}
                            rel="noreferrer noopener nofollow"
                        >
                            <Typography align="center" style={{ wordWrap: "break-word" }} variant="body2" sx={{ width: 180, color: "text.secondary" }}>
                                {walletAccount.address}
                            </Typography>
                        </Link>
                        <Stack direction="row" spacing={1}>
                            <Button variant="contained" onClick={handleLogout} size="small">
                                Logout
                            </Button>
                            <CopyToClipboard text={walletAccount.address} onCopy={() => {}}>
                                <Button variant="outlined" size="small">
                                    Copy
                                </Button>
                            </CopyToClipboard>
                        </Stack>
                    </Stack>
                ) : (
                    <MenuItem key="wallet" onClick={handleOpenModal} sx={{ typography: "body2", py: 2, px: 2.5 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="s3" style={{ marginLeft: "10px" }}>
                                Wallet Connect
                            </Typography>
                        </Stack>
                        {/* <ModalWalletConnect /> */}
                    </MenuItem>
                )}
            </Popover>
            <ModalWallet />
        </>
    );
}
