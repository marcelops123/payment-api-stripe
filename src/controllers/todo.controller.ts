import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
export const createTodoController = async (request: Request, response: Response) => {
    const userId = request.headers['x-user-id'];
    const {title} = request.body;
    if (!userId) {
        response.status(404).send({ error: "Usuário não encontrado" });
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId as string
        }
    })

    if(!user) {
        response.status(404).send({ error: "Não autorizado" });
    }

    if(user) {
        
        const todo = await prisma.todo.create({
            data: {
                task: title,
                ownerId: user.id
            }
        });
        
        response.send(todo);
    }

}