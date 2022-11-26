/* eslint-disable import/no-anonymous-default-export */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../db/client"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // res.status(200).json({ name: 'John Doe' })
  const slug = req.query["slug"];
  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "no slug specified!" }))
    return;
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug
      }
    }
  })

  if (!data) {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "no slug found!" }))
    return;
  }
  // return res.redirect(data.url);
  res.setHeader("Content-Type", "application/json")
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Cache-Control", "s-maxage=100000, stale-while-revalidate")

  return res.json(data);
}
