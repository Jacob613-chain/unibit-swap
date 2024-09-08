import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Typography } from "@mui/material";

export default function NavLink({ link, text, external }) {
    const router = useRouter();
    return (
        <Link  underline="none" color="inherit" href={!["/","/swap","/pool"].includes(link) ? link : ""} rel="noreferrer noopener nofollow" target={external && "_blank"}>
            <Button variant={`${link === router.pathname ? "contained" : "text"}`} sx={{ mx: 1 }}>
                {text} 
                {
                    ["/swap","/pool"].includes(link) ?
                        <Typography variant="d1" style={{ marginLeft: "5px", color: "#000", fontSize: "10px", padding: "0px 3px 0px 3px", backgroundColor: "#dddddd", border: "1px solid #dddddd", borderRadius: "5px" }}>
                            soon
                        </Typography> : null
                }
            </Button>
        </Link>
    );
}
