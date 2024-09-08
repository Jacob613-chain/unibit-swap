import React, { useEffect, useContext, useState } from "react";
import StakingRecord from "./StakingRecord";
import { AppContext } from "src/AppContext";
import { ethers } from "ethers";
import { getLockTimes, getNewStakings } from "src/utils/stakingHandlers";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function StakingRecords({ reload, rates, MULTIPLYER }) {
    const { openSnackbar, walletContext } = useContext(AppContext);
    const { walletAccount } = walletContext;
    const [lockTimes, setLockTimes] = useState([]);
    const [newStakings, setNewStakings] = useState([]);
    const getDataHander = async () => {
        if (!walletAccount) {
            setLockTimes([]);
            return;
        }
        //
        try {
            const nst = await getNewStakings();
            const lts = await getLockTimes();
            setLockTimes(lts);
            setNewStakings(nst);
        } catch (error) {
            openSnackbar(
                <div style={{ maxWidth: 500 }}>
                    <p>Error occured. </p>
                    <p>{error.message}</p>
                </div>,
                "error"
            );
            console.error(error);
        }
    };

    useEffect(() => {
        getDataHander();
    }, [reload]);

    return (
        <div style={{ marginTop: 24, marginBottom: 24 }}>
            {lockTimes.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Staked Amount</TableCell>
                                <TableCell align="center">APR(Daily)</TableCell>
                                <TableCell align="center">Lock Period</TableCell>
                                <TableCell align="center">Unlocked on</TableCell>
                                <TableCell align="center">Rewards</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lockTimes.map((time, idx) => (
                                <StakingRecord new={false} lockTime={time} key={idx} rates={rates} MULTIPLYER={MULTIPLYER} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {newStakings.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Staked Amount</TableCell>
                                <TableCell align="center">APR(Daily)</TableCell>
                                <TableCell align="center">Lock Date</TableCell>
                                <TableCell align="center">Max unlock date (MUD)</TableCell>
                                <TableCell align="center">Rewards (now)</TableCell>
                                <TableCell align="center">Rewards (MUD)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {newStakings.map((stk, sdx) => (
                                <StakingRecord n={true} staking={stk} rates={rates} MULTIPLYER={MULTIPLYER} key={sdx} sdx={sdx} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}
