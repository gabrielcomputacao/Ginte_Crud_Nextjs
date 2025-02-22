import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, address, birthdate, phone } = req.body;

    try {
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
    } catch (error) {
      return res.status(400);
    }
  }

  if (req.method === "PUT") {
    const { id, name, email, phone, birthdate, address } = req.body;

    try {
      const userUpdate = await prisma.user.update({
        where: { id },
        data: { name, email, phone, birthdate, address },
      });

      return res.status(202).json(userUpdate);
    } catch (err) {
      return res.status(400);
    }
  }

  if (req.method === "GET") {
    try {
      const { search } = req.query;

      if (search && search.length > 1) {
        const usersSearch = await prisma.user.findMany({
          where: {
            OR: [
              {
                name: {
                  contains: String(search),
                },
              },
              {
                email: {
                  contains: String(search),
                },
              },
            ],
          },
        });

        return res.status(200).json(usersSearch);
      }

      const users = await prisma.user.findMany();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500);
    }
  }

  return res.status(405).end();
}
