// Material
import { useMediaQuery, useTheme, Box, Container, IconButton, Toolbar } from "@mui/material";

// Iconify Icons
import { Icon } from "@iconify/react";
import baselineBrightnessHigh from "@iconify/icons-ic/baseline-brightness-high";
import baselineBrightness4 from "@iconify/icons-ic/baseline-brightness-4";

// Context
import { useContext } from "react";
import { AppContext } from "src/AppContext";

// Components
import Logo from "./Logo";
import Wallet from "./Wallet";
import HeaderMobileMenu from "./HeaderMobileMenu";
import NavLink from "./NavLink";

import { HeaderWrapper } from "src/utils/styles";

export default function Header() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { toggleTheme, darkMode } = useContext(AppContext);

    return (
        <HeaderWrapper position="sticky" enableColorOnDark={true} sx={{ py: 1, opacity: isMobile ? 0.9 : 0.6 }}>
            <Container maxWidth="xl" sx={{ minWidth: "90%" }}>
                <Toolbar disableGutters>
                    <Box
                        id="logo-container-mobile"
                        sx={{
                            mr: 2
                        }}
                    >
                        <Logo />
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center"
                        }}
                    >
                        {/* staking and token creator and bridge */}
                        {!isMobile && (
                            <>
                                <NavLink link={"/swap"} text={"Swap"} />
                                <NavLink link={"/pool"} text={"Liquidity Pool"} />
                                <NavLink link={"/staking"} text={"Staking"} />
                                <NavLink link={"/create"} text={"Token Creator"} />
                                <NavLink link={"/runes"} text={"Runes"} />
                                <NavLink link={"https://bridge.unibit.app"} text={"Bridge"} external />
                            </>
                        )}

                        <Wallet />
                        {!isMobile && (
                            <IconButton
                                onClick={() => {
                                    toggleTheme();
                                }}
                            >
                                {darkMode ? <Icon icon={baselineBrightness4} /> : <Icon icon={baselineBrightnessHigh} />}
                            </IconButton>
                        )}
                    </Box>

                    <HeaderMobileMenu />
                </Toolbar>
            </Container>
        </HeaderWrapper>
    );
}
