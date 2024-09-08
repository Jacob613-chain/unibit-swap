// Material
import { Box, styled, Switch, Dialog, AppBar, alpha } from "@mui/material";

export const OverviewWrapper = styled(Box)(
    ({ theme }) => `
      // overflow: hidden;
      flex: 1;
`
);

export const BackgroundWrapper = styled(Box)(
    ({ theme }) => `
      width: 100%;
      height: 90%;
      position: absolute;
      background-size: cover;
      background-color: rgb(32, 34, 37);
      background-position: center center;
      opacity: 0.99;
      z-index: -1;
      filter: blur(8px);
      -webkit-mask: linear-gradient(rgb(255, 255, 255), transparent);
`
);

export const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
                opacity: 1,
                border: 0
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5
            }
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#33cf4d",
            border: "6px solid #fff"
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
            color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600]
        },
        "&.Mui-disabled + .MuiSwitch-track": {
            opacity: theme.palette.mode === "light" ? 0.7 : 0.3
        }
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 22,
        height: 22
    },
    "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500
        })
    }
}));

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2)
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1)
    }
}));

export const yellowButtonStyle = {
    color: "black",
    background: "#F8D20F",
    padding: "10px 30px"
};

export const HeaderWrapper = styled(AppBar)(
    ({ theme }) => `
    width: 100%;
    background-color: ${theme.colors.nav.background};
    margin-bottom: ${theme.spacing(0)};
    justify-content: center;
    border: none;
    border-radius: 0px;
    border-bottom: 0px solid ${alpha("#CBCCD2", 0.2)};
    // position: -webkit-sticky;
    // position: sticky;
    // top: 0;
    // z-index: 1300;
`
);
