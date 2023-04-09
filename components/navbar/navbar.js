import React, { useState } from "react";
import classes from "./navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { IconButton, Button, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MailIcon from "@mui/icons-material/Mail";
import EventIcon from "@mui/icons-material/Event";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SocialNav from "../social-nav-container/social-nav";
import OrderOnlineButton from "../order-online-button/order-online-button";
import { useRouter } from "next/router";

export default function NavBar() {
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const router = useRouter();

  const menusPage = router.pathname === "/menus";

  return (
    <header>
      <div className={classes.nav_container}>
        <div className={classes.logo_container}>
          <Link href="/">
            <Button className={classes.button_logo}>
              <Image
                src={"/img/banner.png"}
                alt="EZ Eats"
                width={400}
                height={400}
              />
            </Button>
          </Link>
        </div>
        <div className={classes.logo_container_2}>
          <Button className={classes.button_logo} component={Link} href="/">
            <Image
              src={"/img/small-logo.png"}
              alt="EZ Eats"
              width={400}
              height={400}
              layout
            />
          </Button>
        </div>
        <nav className={classes.nav}>
          <ul className={classes.nav_buttons}>
            <li>
              <Link href="/">
                <Button className={classes.button_main}>
                  <HomeIcon style={{ fontSize: "20px" }} />
                  &nbsp;Home
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/locations">
                <Button className={classes.button_main}>
                  <LocationOnIcon style={{ fontSize: "20px" }} />
                  &nbsp;Locations
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/menus">
                <Button className={classes.button_main}>
                  <MenuBookIcon style={{ fontSize: "20px" }} />
                  &nbsp;Menus
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/events">
                <Button className={classes.button_main}>
                  <EventIcon style={{ fontSize: "20px" }} />
                  &nbsp;Events
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <Button className={classes.button_main}>
                  <EmojiPeopleIcon style={{ fontSize: "20px" }} />
                  &nbsp;Our Story
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <Button className={classes.button_main}>
                  <MailIcon style={{ fontSize: "20px" }} />
                  &nbsp;Contact
                </Button>
              </Link>
            </li>
          </ul>
          <SocialNav style={{ justifyContent: "right" }} header />
        </nav>
        <nav className={classes.nav_2}>
          <IconButton
            className={classes.hamburger}
            color="inherit"
            onClick={toggleDrawer}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </nav>
        <Drawer
          open={drawer}
          onClose={toggleDrawer}
          anchor="right"
          classes={{ paper: classes.drawer }}
        >
          <nav className={classes.drawer_nav}>
            <ul>
              <li>
                <OrderOnlineButton drawer />
              </li>
              <li>
                <Link href="/">
                  <Button
                    className={classes.button}
                    onClick={toggleDrawer}
                    style={{ color: "black" }}
                  >
                    <HomeIcon />
                    &nbsp;Home
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/menus">
                  <Button
                    className={classes.button}
                    onClick={toggleDrawer}
                    style={{ color: "black" }}
                  >
                    <MenuBookIcon />
                    &nbsp;Menu
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/events">
                  <Button
                    className={classes.button}
                    onClick={toggleDrawer}
                    style={{ color: "black" }}
                  >
                    <EventIcon />
                    &nbsp;Events
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/locations">
                  <Button
                    className={classes.button}
                    onClick={toggleDrawer}
                    style={{ color: "black" }}
                  >
                    <LocationOnIcon />
                    &nbsp;Locations
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <Button
                    className={classes.button}
                    onClick={toggleDrawer}
                    style={{ color: "black" }}
                  >
                    <MailIcon />
                    &nbsp;Contact
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <Button
                    className={classes.button}
                    onClick={toggleDrawer}
                    style={{ color: "black" }}
                  >
                    <EmojiPeopleIcon />
                    &nbsp;About
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
          <SocialNav />
        </Drawer>
      </div>
    </header>
  );
}
