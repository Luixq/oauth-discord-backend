import { DefineRoutes } from "functions/utils.js";

export default DefineRoutes(app => {
    app.get("/", async (req, res) => {
        return res.code(200).send({
            message: "Hello, World!"
        })
    })
})