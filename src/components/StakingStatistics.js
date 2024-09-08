/******************************
 * This component is not used now
 */

import React, { useState, useContext, useEffect } from "react";
// Material
import { Box, Typography } from "@mui/material";
// Context
import { AppContext } from "src/AppContext";
// Utils
import { getDataForStaking } from "src/utils/stakingHandlers";
import { ethers } from "ethers";

export default function StakingStatistics({ balance, userStaking, setUserStaking, reload, reward, setReward, rates, MULTIPLYER }) {
    const { openSnackbar, darkMode, walletContext, loading, setLoading } = useContext(AppContext);
    const { walletAccount } = walletContext;

    const getDatahandler = async () => {
        if (!walletAccount) {
            setUserStaking(null);
            setReward(0);
            return;
        }
        setLoading(true);
        try {
            const data = await getDataForStaking(walletAccount, "userStaking");
            const segs = data.toString().split(",");
            setUserStaking({
                balance: segs[0],
                claimed: segs[1],
                stakingTypes: segs.slice(2)
            });
            const ee = await getDataForStaking(walletAccount, "earned");
            setReward(ee.toString());
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
        setLoading(false);
    };
    useEffect(() => {
        getDatahandler();
        return () => {};
    }, [balance, reload]);

    return (
        <Box
            p={2}
            sx={{
                border: darkMode ? "1px solid rgb(255, 255, 255, 0.5)" : "1px solid rgb(0, 0, 0, 0.3)",
                borderRadius: "10px"
            }}
        >
            {loading ? (
                <h2>Getting data...</h2>
            ) : (
                userStaking !== null && (
                    <>
                        {userStaking.balance > 0 && (
                            <>
                                <Box display="flex" mb={1} justifyContent="space-between" mt={1}>
                                    <Typography variant="h4">APR</Typography>
                                    <Typography>{userStaking.stakingTypes.map((type) => (rates[type].rate * 365) / MULTIPLYER).join("%, ")}%</Typography>
                                </Box>
                                <Box display="flex" mb={1} justifyContent="space-between" mt={1}>
                                    <Typography variant="h4">Lock Period</Typography>
                                    <Typography>{userStaking.stakingTypes.map((type, idx) => rates[type].period).join(" days, ")} days</Typography>
                                </Box>
                            </>
                        )}
                        <Box display="flex" mb={1} justifyContent="space-between" mt={1}>
                            <Typography variant="h4">Staked</Typography>
                            <Typography>
                                {ethers.utils.formatEther(userStaking.balance)} ({userStaking.stakingTypes.length} time(s))
                            </Typography>
                        </Box>
                        <Box display="flex" mb={1} justifyContent="space-between" mt={1}>
                            <Typography variant="h4">Claimed</Typography>
                            <Typography>{ethers.utils.formatEther(userStaking.claimed)}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt={1} mb={1}>
                            <Typography variant="h4">Pending rewards</Typography>
                            <Typography>{ethers.utils.formatEther(reward)}</Typography>
                        </Box>
                    </>
                )
            )}
        </Box>
    );
}
