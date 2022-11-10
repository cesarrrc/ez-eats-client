import React from "react";
import classes from "./button-navigation.module.css";
import Link from "next/link";
import Image from "next/image";

export default function ButtonNavigation({ content, img, path, img2 }) {
  return (
    <div className={classes.button_nav_container}>
      <div className={classes.image_container}>
        <Image className={classes.img1} src={img} alt={content} fill />
        <Image className={classes.img2} src={img2} alt={content} fill />
        <Link href={`${path}`}>
          <h3 className={classes.content}>
            {content.split("\\n").map((el) => (
              <div>{el}</div>
            ))}
          </h3>
        </Link>
      </div>
    </div>
  );
}
