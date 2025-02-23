import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, address, birthdate, phone } = req.body;

    try {
      const existingUserEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUserEmail) {
        return res.status(409).json({ message: "E-mail já cadastrado" });
      }

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
      return res.status(400).json({ message: "Erro ao cadastrar usuário" });
    }
  }

  if (req.method === "PUT") {
    const { id, name, email, phone, birthdate, address } = req.body;

    try {
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      if (email !== existingUser.email) {
        const emailExists = await prisma.user.findUnique({
          where: { email },
        });

        if (emailExists) {
          return res.status(409).json({ error: "E-mail já cadastrado" });
        }
      }

      const userUpdate = await prisma.user.update({
        where: { id },
        data: { name, email, phone, birthdate, address },
      });

      return res.status(202).json(userUpdate);
    } catch (err) {
      return res.status(400).json({ message: "Erro ao atualizar usuário." });
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
      return res.status(500).json({ message: "Erro ao buscar usuários." });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { ids } = req.body;

      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res
          .status(400)
          .json({ message: "Erro ao selecionar usuários para exclusão." });
      }

      await prisma.user.deleteMany({
        where: {
          id: { in: ids },
        },
      });

      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar usuário." });
    }
  }

  return res.status(405).end();
}
