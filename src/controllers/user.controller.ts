import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const listUsersController = async (request: Request, response: Response) => {
    const users = await prisma.user.findMany();
    response.send({
        users: users
    }) 
}

export const addUserController = async (request: Request, response: Response) => {
    const usertoAdd = prisma.user.create({
        data: {
            name: "Marcelo",
            email: "testes123@gmail.com",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }).catch(err => console.log(err))
    response.send(usertoAdd)
}