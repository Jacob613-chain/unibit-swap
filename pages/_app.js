import Head from "next/head";
import { SnackbarProvider } from "notistack";
import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";

import CssBaseline from "@mui/material/CssBaseline";

import ThemeProvider from "src/theme/ThemeProvider";
import { ContextProvider } from "src/AppContext";
// Components
import XSnackbar from "src/components/Snackbar";
import { useSnackbar } from "src/hooks/useSnackbar";
import NextNProgress from "nextjs-progressbar";

function getLibrary(provider, connector) {
    return new Web3(provider);
}

function BloxifiApp(props) {
    const { isOpen, msg, variant, openSnackbar, closeSnackbar } = useSnackbar();
    const { Component, pageProps } = props;
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <link rel="manifest" href="/site.webmanifest" />
                <title>Unibit App</title>
                <link rel="shortcut icon" href="logo/logo.png" />
                <meta name="msapplication-TileColor" content="#121619" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <Web3ReactProvider getLibrary={getLibrary}>
                <ContextProvider openSnackbar={openSnackbar}>
                    <ThemeProvider>
                        <SnackbarProvider maxSnack={3}>
                            <CssBaseline />
                            <NextNProgress />
                            <Component {...pageProps} />
                            <XSnackbar isOpen={isOpen} message={msg} variant={variant} close={closeSnackbar} />
                        </SnackbarProvider>
                    </ThemeProvider>
                </ContextProvider>
            </Web3ReactProvider>
        </>
    );
}

export default BloxifiApp;
