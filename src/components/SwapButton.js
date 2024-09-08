/******************************
 * This component needs to be refactored
 */
import { Button } from "@mui/material";

const SwapButton = ({ amount1, swapHandler }) => {
    return (
        <Button fullWidth onClick={swapHandler} variant="outlined" sx={{ margin: "20px", borderRadius: "10px" }}>
            <h3>Exchange</h3>
        </Button>
    );
};

export default SwapButton;
