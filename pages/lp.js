import { useContext } from "react";
// Material
import { Container, Toolbar } from "@mui/material";
// Context
import { AppContext } from "src/AppContext";

// Components
import Header from "src/components/Header";
import ScrollToTop from "src/components/ScrollToTop";
import L_pool from "src/components/L_Pool";

import { OverviewWrapper, BackgroundWrapper } from "src/utils/styles";

export default function Pool({}) {
    const { darkMode } = useContext(AppContext);
    return (
        <OverviewWrapper>
            <Toolbar id="back-to-top-anchor" />
            <BackgroundWrapper
                style={{
                    backgroundImage: `url(/static/background.png)`,
                    opacity: `${darkMode ? 0.4 : 0.6}`
                }}
            />
            <Header />
            <Container maxWidth="lg">
                <L_pool />
            </Container>
            <ScrollToTop />
        </OverviewWrapper>
    );
}
