/******************************
 * This component is not used now
 */
import { Dialog, DialogActions, DialogContent, DialogTitle, Input, Typography, Button } from "@mui/material";
import React from "react";
import BootstrapDialogTitle from "./common/BootstrapDialogTitle";

export default function ManualAPRDialog({ open, setOpen, manualAPR, setManualAPR, onOK }) {
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpen(false)}>
                <h2>Set APR</h2>
            </BootstrapDialogTitle>
            <DialogContent style={{ margin: 12 }}>
                <Input fullWidth type="number" value={manualAPR} onChange={(e) => setManualAPR(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        setOpen(false);
                        onOK();
                    }}
                >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}
