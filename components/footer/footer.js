import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { Button } from "@mui/material";
import classes from "./footer.module.css";
import SocialNav from "../social-nav-container/social-nav";

export default function Footer() {
  return (
    <footer className={classes.footer_container}>
      <div className={classes.grid_container}>
        <SocialNav footer />
        <p>© 2022 by Cesar Cisneros</p>
      </div>
    </footer>
  );
}
