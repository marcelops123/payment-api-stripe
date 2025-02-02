import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const listUsersController = async (request: Request, response: Response) => {
    const users = await prisma.user.findMany();
    response.send({
        users: users
    })
}

export const findOneUserController = async (request: Request, response: Response) => {
    const { userId } = request.params;

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    if (!user) {
        response.status(404).send({ error: "Usuário não encontrado!" });
    } else
        response.send(user);
}

export const createUserController = async (request: Request, response: Response) => {
    const { name, email } = request.body;

    if (!name || !email) {
        response.send({ erro: "Os campos nome e email devem ser preenchidos!" });
    }

    const emailAlreadyExists = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (emailAlreadyExists) {
        response.status(404).send({ erro: "Esse email já está sendo utilizado!" });
    }

    const user = await prisma.user.create({
        data: {
            name, email
        }
    })

    response.send(user);
}

export const deleteUserController = async (request: Request, response: Response) => {
    const { userId} = request.params;

    if (!userId) {
        response.send({ erro: "Falta o id do usuário!" });
    }

    const verifyIdExists = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!verifyIdExists) {
        response.status(404).send({ erro: "Usuário não encontrado" });
    }

    const user = await prisma.user.delete({
        where: {
            id: userId
        }
    })

    response.send(user);
}