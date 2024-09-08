import React, { useContext } from "react";
// Material
import { Stack, Box } from "@mui/material";
// Context
import { AppContext } from "src/AppContext";
//component
import Page from "src/components/Page";

export default function HomeComponent() {
    const { darkMode } = useContext(AppContext);

    return (
        <Page title="Create">
            <Stack justifyContent="center" alignItems="center" display="flex" minHeight="80vh">
                <Box
                    maxWidth="lg"
                    minWidth="35vw"
                    px={4}
                    py={2}
                    sx={{
                        borderRadius: "10px",
                        border: darkMode ? "1px solid rgb(255, 255, 255)" : "1px solid rgb(0, 0, 0, 0.3)"
                    }}
                >
                    <h1>Welcome to Unibit!</h1>
                    <div style={{fontSize: "20px"}}>
                        <p>
                            Discover the potential of Bitcoin cross-chain DeFi innovation through our platform: Cross chain Bridge ,Token creator( BRC20 & Runes)Unibit DEX , Pools, NFT’s and effortlessly Launch projects across Multiple EVM chains.
                        </p>
                    </div>
                </Box>
            </Stack>
        </Page>
    );
}
