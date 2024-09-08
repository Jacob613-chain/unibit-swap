import React from "react";
import { useState } from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";

// Material
import { Box, Divider, IconButton, Link, Menu, MenuItem, Stack, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SwapCallsIcon from "@mui/icons-material/SwapCalls";

// Iconify Icons
import { Icon } from "@iconify/react";
import baselineBrightnessHigh from "@iconify/icons-ic/baseline-brightness-high";
import baselineBrightness4 from "@iconify/icons-ic/baseline-brightness-4";

// Context
import { useContext } from "react";
import { AppContext } from "src/AppContext";

export default function HeaderMobileMenu() {
    const { toggleTheme, darkMode } = useContext(AppContext);
    const shareUrl = `https://unibit-swap.vercel.app/`;
    const shareTitle = "BLOXFI is the Best DEX on Arbitrum network";
    const shareDesc = "BLOXFI is a zero-fee dex platform for trading on Arbitrum network, providing token swapping and farming service.";

    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box id="nav-menu-mobile" sx={{ flexGrow: 0, display: { sm: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu}>
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: "block", md: "none" }
                }}
            >
                {/* staking and token creator and bridge */}
                <MenuItem onClick={handleCloseNavMenu}>
                    <Link underline="none" color="inherit" href="/" rel="noreferrer noopener nofollow">
                        <Stack direction="row" spacing={1} sx={{ mr: 2 }} alignItems="center">
                            <CurrencyExchangeIcon />
                            <Typography variant="s3" style={{ marginLeft: "10px" }}>
                                Swap
                            </Typography>
                            <Typography variant="d1" style={{ marginLeft: "5px", color: "#000", fontSize: "10px", padding: "0px 3px 0px 3px", backgroundColor: "#dddddd", border: "1px solid #dddddd", borderRadius: "5px" }}>
                                soon
                            </Typography>
                        </Stack>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Link underline="none" color="inherit" href="/" rel="noreferrer noopener nofollow">
                        <Stack direction="row" spacing={1} sx={{ mr: 2 }} alignItems="center">
                            <AccountBalanceIcon />
                            <Typography variant="s3" style={{ marginLeft: "10px" }}>
                                Liquidity Pool
                            </Typography>
                            <Typography variant="d1" style={{ marginLeft: "5px", color: "#000", fontSize: "10px", padding: "0px 3px 0px 3px", backgroundColor: "#dddddd", border: "1px solid #dddddd", borderRadius: "5px" }}>
                                soon
                            </Typography>
                        </Stack>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link underline="none" color="inherit" href="/staking" rel="noreferrer noopener nofollow">
                        <Stack direction="row" spacing={1} sx={{ mr: 2 }} alignItems="center">
                            <AccountBalanceIcon />
                            <Typography variant="s3" style={{ marginLeft: "10px" }}>
                                Stake
                            </Typography>
                        </Stack>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link underline="none" color="inherit" href="/create" rel="noreferrer noopener nofollow">
                        <Stack direction="row" spacing={1} sx={{ mr: 2 }} alignItems="center">
                            <RocketLaunchIcon />
                            <Typography variant="s3" style={{ marginLeft: "10px" }}>
                                Token Creator
                            </Typography>
                        </Stack>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Link underline="none" color="inherit" href="/runes" rel="noreferrer noopener nofollow">
                        <Stack direction="row" spacing={1} sx={{ mr: 2 }} alignItems="center">
                            <RocketLaunchIcon />
                            <Typography variant="s3" style={{ marginLeft: "10px" }}>
                                Runes
                            </Typography>
                        </Stack>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link underline="none" color="inherit" href={`https://bridge.unibit.app`} rel="noreferrer noopener nofollow" target="blank">
                        <Stack direction="row" spacing={1} sx={{ mr: 2 }} alignItems="center">
                            <SwapCallsIcon />
                            <Typography variant="s3" style={{ marginLeft: "10px" }}>
                                Bridge
                            </Typography>
                        </Stack>
                    </Link>
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        toggleTheme();
                    }}
                >
                    <Stack direction="row" spacing={1} sx={{ mr: 2 }} alignItems="center">
                        {darkMode ? <Icon icon={baselineBrightness4} width={24} height={24} /> : <Icon icon={baselineBrightnessHigh} width={24} height={24} />}
                        <Typography variant="s3" style={{ marginLeft: "10px" }}>
                            {darkMode ? "Dark Theme" : "Light Theme"}
                        </Typography>
                    </Stack>
                </MenuItem>

                <Stack alignItems="center" sx={{ mt: 2 }}>
                    <Stack direction="row" spacing={3}>
                        <FacebookShareButton url={shareUrl} quote={shareTitle} hashtag={"#"} description={shareDesc}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TwitterShareButton title={shareTitle} url={shareUrl} hashtag={"#"}>
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                    </Stack>
                </Stack>
            </Menu>
        </Box>
    );
}
