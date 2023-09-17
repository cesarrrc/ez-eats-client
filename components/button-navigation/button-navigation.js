import React from "react";
import classes from "./button-navigation.module.css";
import Link from "next/link";
import Image from "next/image";

export default function ButtonNavigation({
  content,
  content2,
  img,
  path,
  img2,
}) {
  return (
    <div className={classes.button_nav_container}>
      <div className={classes.image_container}>
        <Image className={classes.img1} src={img} alt={content} fill />
        <Link href={`${path}`}>
          <Image className={classes.img2} src={img2} alt={content} fill />
          <h4 className={classes.content2}>{content2}</h4>
        </Link>
      </div>
    </div>
  );
}
