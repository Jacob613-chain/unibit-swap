import { Button } from "@mui/material";

const WalletConnectButton = ({ showConnectWallet }) => {
    return (
        <Button
            fullWidth
            onClick={() => {
                showConnectWallet();
            }}
            variant="outlined"
            sx={{ borderRadius: "10px", margin: "20px" }}
        >
            <h3>Connect Wallet</h3>
        </Button>
    );
};

export default WalletConnectButton;
