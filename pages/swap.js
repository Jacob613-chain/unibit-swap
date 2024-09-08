// Material
import { Container, Toolbar } from "@mui/material";
// Context
import { useContext } from "react";
import { AppContext } from "src/AppContext";
// Components
import Header from "src/components/Header";
import ScrollToTop from "src/components/ScrollToTop";
import Swapping from "src/components/Swapping";
import { OverviewWrapper, BackgroundWrapper } from "src/utils/styles";

export default function Swap({}) {
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
                <Swapping />
            </Container>
            <ScrollToTop />
        </OverviewWrapper>
    );
}
