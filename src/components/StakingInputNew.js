import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { AppContext } from "src/AppContext";

export default function StakingInputNew({ amountin, setAmountin, balance }) {
    const { darkMode } = useContext(AppContext);
    return (
        <Box width="100%">
            <TextField
                id="input-with-icon-textfield"
                label="Select amount"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <img src="logo/coin.png" style={{ height: "30px", marginLeft: "3px" }} />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button
                                variant="outlined"
                                sx={{ maxHeight: "25px", border: darkMode ? "solid 1px rgba(255, 255, 255, 0.5)" : "solid 1px rgba(0, 0, 0, 0.5)", borderRadius: "10px" }}
                                onClick={() => {
                                    setAmountin(balance);
                                }}
                            >
                                max
                            </Button>
                        </InputAdornment>
                    )
                }}
                variant="outlined"
                value={amountin}
                onChange={(e) => setAmountin(e.target.value)}
                type="number"
            />
        </Box>
    );
}
