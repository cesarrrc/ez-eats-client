import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";

import classes from "./order-online-button.module.css";
import IconButton from "@mui/material/IconButton";

type Props = {
  drawer?: boolean;
  href?: string | null;
  title?: string | null;
  muiIcon?: any;
};

const OrderOnlineButton = ({ drawer, href, title, muiIcon }: Props) => {
  if (href == "coming soon") {
    return (
      <nav
        className={
          drawer
            ? classes.order_online_button_drawer
            : classes.order_online_button
        }
      >
        <ul>
          <li>
            <Button className={`${classes.coming_soon} ${classes.button}`}>
              <span className={classes.coming_soon_pre}>
                {title ? title : "Order Online"}
              </span>
              <span className={classes.coming_soon_post}>Coming Soon</span>
            </Button>
          </li>
        </ul>
      </nav>
    );
  }
  return (
    <nav
      className={
        drawer
          ? classes.order_online_button_drawer
          : classes.order_online_button
      }
    >
      <ul>
        <li>
          {muiIcon ? (
            <IconButton
              component={Link}
              href={href ? href : "/menus"}
              target={href ? "_blank" : ""}
              className={classes.button}
            >
              <span
                className={classes.coming_soon_pre}
                style={{
                  display: "flex",
                  gap: 10,
                }}
              >
                {muiIcon}
                {title ? title : "Order Online"}
              </span>
            </IconButton>
          ) : (
            <Button
              component={Link}
              href={href ? href : "/menus"}
              className={classes.button}
              target={href ? "_blank" : ""}
            >
              {title ? title : "Order Online"}
            </Button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export type OrderOnlineButtonProps = {
  drawer: false;
  href: null;
  title: null;
  muiIcon: null;
};

export default OrderOnlineButton;
