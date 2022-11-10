import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";

import classes from "./order-online-button.module.css";

type Props = {
  drawer?: boolean;
};

const OrderOnlineButton = ({ drawer }: Props) => {
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
          <Button
            component={Link}
            href="https://www.toasttab.com/ez-eats-brick-and-mortar-641-mill-street/v3"
            className={classes.button}
            target="_blank"
          >
            Order Online
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export type OrderOnlineButtonProps = {
  drawer: false;
};

export default OrderOnlineButton;
