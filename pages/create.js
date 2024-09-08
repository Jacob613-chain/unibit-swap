import React, { useContext } from "react";
// Material
import { Container, Toolbar } from "@mui/material";
// Context

import { AppContext } from "src/AppContext";
// Components
import Header from "src/components/Header";
import ScrollToTop from "src/components/ScrollToTop";
import CreateBRC20 from "src/components/BRC20/CreateBRC20";
//styles
import { OverviewWrapper, BackgroundWrapper } from "src/utils/styles";

export default function Create({}) {
    const { darkMode } = useContext(AppContext);

    return (
        <OverviewWrapper>
            <Toolbar id="back-to-top-anchor" />
            <BackgroundWrapper
                style={{
                    backgroundImage: `url(/static/background.png)`,
                    opacity: `${darkMode ? 0.5 : 0.7}`
                }}
            />
            <Header />
            <Container maxWidth="lg">
                <CreateBRC20 />
            </Container>
            <ScrollToTop />
        </OverviewWrapper>
    );
}
