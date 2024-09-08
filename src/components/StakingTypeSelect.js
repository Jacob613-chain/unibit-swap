import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function StakingTypeSelect({ rates, setRateIindex, rateIndex, MULTIPLYER }) {
    const handleChange = (event) => {
        setRateIindex(event.target.value);
    };

    return (
        <FormControl>
            <InputLabel id="demo-simple-select-label">Lock Period</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={rateIndex} label="Lock Period" onChange={handleChange}>
                {rates.map((r, i) => (
                    <MenuItem key={i} value={i}>
                        {r.period} days
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
