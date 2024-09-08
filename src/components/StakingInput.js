/******************************
 * This component is not used now
 */
import React, { useContext } from "react";
import { Box, Input, Button } from "@mui/material";
import { AppContext } from "src/AppContext";
export default function StakingInput({ amountin, setAmountin, balance }) {
    const { darkMode } = useContext(AppContext);
    return (
        <Box
            sx={{
                // background: darkMode && "rgba(255, 255, 255, 0.5)",
                maxWidth: "100%",
                border: darkMode ? "solid 1px rgba(255, 255, 255, 0.5)" : "solid 1px rgba(0, 0, 0, 0.5)",
                borderRadius: "10px",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <img src="logo/logo.png" style={{ height: "30px", marginLeft: "3px" }}></img>
            <Input
                fullWidth
                placeholder="0.0"
                id="amount"
                value={amountin}
                onChange={(e) => {
                    setAmountin(e.target.value);
                }}
                disableUnderline
                sx={{
                    width: "100%",
                    input: {
                        padding: "15px 15px",
                        border: "none",
                        fontSize: "18px",
                        textAlign: "start",
                        appearance: "none",
                        // color: "black",
                        fontWeight: 700
                    }
                }}
            />
            <Button
                variant="outlined"
                sx={{ maxHeight: "25px", border: darkMode ? "solid 1px rgba(255, 255, 255, 0.5)" : "solid 1px rgba(0, 0, 0, 0.5)", borderRadius: "10px", mr: 1 }}
                onClick={() => {
                    setAmountin(balance);
                }}
            >
                max
            </Button>
        </Box>
    );
}
