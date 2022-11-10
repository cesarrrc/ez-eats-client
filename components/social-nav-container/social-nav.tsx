import React from "react";
import Link from "next/link";
import { IconButton, Button, Drawer } from "@mui/material";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

import classes from "./social-nav.module.css";

type Props = {
  footer?: boolean;
  header?: boolean;
};

const SocialNav = ({ footer, header }: Props) => {
  return (
    <nav
      className={
        footer
          ? classes.footer_social_container
          : header
          ? classes.header_social_container
          : classes.drawer_social_container
      }
    >
      <ul>
        <li>
          <Link href="https://www.instagram.com/ezeatstx/" target="_blank">
            <IconButton style={{ color: "inherit" }}>
              <InstagramIcon className={classes.icon} />
            </IconButton>
          </Link>
        </li>
        <li>
          <FacebookIcon className={classes.icon} />
        </li>
        <li>
          <AlternateEmailIcon className={classes.icon} />
        </li>
      </ul>
    </nav>
  );
};

export type SocialNavProps = {
  footer: false;
  header: false;
};

export default SocialNav;
