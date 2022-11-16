import React from "react";
import { useRouter } from "next/router";

type Props = {};

const EzEatsKitchen = (props: Props) => {
  const router = useRouter();
  console.log(router.query.slug);
  return <div>{router.query.slug}</div>;
};

export default EzEatsKitchen;
