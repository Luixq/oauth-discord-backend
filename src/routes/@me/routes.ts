import { MeController } from "#/controllers/@me/@me.js"
import { Middleware } from "#/functions/middleware.js"
import { DefineRoutes } from "#/functions/utils.js"
import { FastifyReply, FastifyRequest } from "fastify"

export default DefineRoutes(app => {
    app.post("/", { preHandler: async (req: FastifyRequest, reply: FastifyReply) => Middleware(req, reply, [])}, MeController)
})