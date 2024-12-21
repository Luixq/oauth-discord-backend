import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "./database.js";

export async function Middleware(req: FastifyRequest, reply: FastifyReply, roles: string[]) {
    const authorization = req.headers.authorization;
    if (!authorization) return reply.code(401).send({ message: "Unauthorized" });
    const token = authorization.split(" ")[1];

    const userFromSessionToken = await prisma.session.findUnique({
        where: { id: token },
        include: { user: true }
    });
    if (!userFromSessionToken) return reply.code(401).send({ message: "Unauthorized" });

    const user = userFromSessionToken.user;

    req.user = {
        session: userFromSessionToken.id,
        user
    }

    return true;
}