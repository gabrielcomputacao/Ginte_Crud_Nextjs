import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.status(405).end();
  }

  const { name, email, address, birthdate, phone } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      address,
      birthdate,
      phone,
    },
  });

  return res.status(201).json(user);
}
