import React from "react";
import Link from "next/link";
import { IconButton, Button, Drawer } from "@mui/material";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

import classes from "./social-nav.module.css";
import TikTokIcon from "../icons/tiktik-icon";

type Props = {
  footer?: boolean;
  header?: boolean;
  style?: React.CSSProperties;
};

const SocialNav = ({ footer, header, style }: Props) => {
  return (
    <nav
      className={
        footer
          ? classes.footer_social_container
          : header
          ? classes.header_social_container
          : classes.drawer_social_container
      }
      style={style}
    >
      <ul>
        <li>
          <Link href="https://www.instagram.com/ezeatskitchen" target="_blank">
            <IconButton style={{ color: "inherit" }}>
              <InstagramIcon className={classes.icon} />
            </IconButton>
          </Link>
        </li>
        <li>
          <Link href="https://www.facebook.com/EZEatsKitchenTX" target="_blank">
            <FacebookIcon className={classes.icon} />
          </Link>
        </li>
        <li>
          <TikTokIcon className={classes.custom_icon} />
        </li>
      </ul>
    </nav>
  );
};

export type SocialNavProps = {
  footer: false;
  header: false;
  style: null;
};

export default SocialNav;
