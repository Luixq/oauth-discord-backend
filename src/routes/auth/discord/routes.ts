import { AuthDiscordController } from "#/controllers/auth/discord/callback.js"
import { DefineRoutes } from "#/functions/utils.js"

export default DefineRoutes(app => {
    app.get("/callback", AuthDiscordController)

    app.get("/login", (req, res) => {
        res.redirect("https://discord.com/oauth2/authorize?client_id=1317132185345589298&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fdiscord%2Fcallback&scope=email+identify")
    })

    app.post("/logout", (req, res) => {
        res.send({ message: "Logged out" })
    })
})