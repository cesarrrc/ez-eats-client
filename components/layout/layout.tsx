import React from "react";
import classes from "./layout.module.css";
import NavBar from "../navbar/navbar";
import Footer from "../footer/footer";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className={classes.layout_container}>
      <NavBar />
      <main
        style={{
          display: "flex",
          // flexGrow: 1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
