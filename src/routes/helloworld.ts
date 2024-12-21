import { DefineRoutes } from "#/functions/utils.js"

export default DefineRoutes(app => {
    app.get("/", async (req, reply) => {
        reply.send({ message: "Hello, World!" });
    });
})