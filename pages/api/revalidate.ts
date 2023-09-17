import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    string | { revalidated: boolean } | { err: any; revalidated: boolean }
  >
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json("Invalid token");
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate("/");
    await res.revalidate("/locations");
    await res.revalidate("/menus");
    await res.revalidate("/ez-eats-trailer-middleton");
    await res.revalidate("/ez-eats-trailer-middleton/menu");
    await res.revalidate("/ez-eats-kitchen-mill-street-market");
    await res.revalidate("/ez-eats-kitchen-mill-street-market/menu");
    await res.revalidate("/about");
    return res.json({ revalidated: true });
  } catch (err: any) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send({ err, revalidated: false });
  }
}
