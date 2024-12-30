import fastify from "fastify";

import cors from "@fastify/cors";
import autoload from "@fastify/autoload";
import path from "path";

import log from "consola";
import chalk from "chalk";
import { ZodError } from "zod";

import { Session, User } from "@prisma/client";

declare module "fastify" {
    interface FastifyRequest {
        user: {
            session: string;
            user: User;
        }
    }
}
const app = fastify();

app.register(cors, { origin: "*" });
app.register(autoload, {
    dir: path.join(import.meta.dirname, "routes"),
    routeParams: true
});

app.register(import('@fastify/cookie'), {
    secret: process.env.COOKIE_SECRET,
    parseOptions: {},
})

app.addHook("onRoute", ({ method, path }) => {
    if (method == "HEAD" || method == "OPTIONS") return;
    log.success(`${chalk.magenta(method)} ${chalk.green(path)}`);
});

app.setErrorHandler((err, req, reply) => {
    log.error(err);
    if (err instanceof ZodError) {
        return reply.code(400).send({ message: "Bad Request" });
    };

    reply.send({ message: "Internal Server Error" });
});

app.listen({
    port: 8080,
    host: "0.0.0.0"
}).then(() => {
    log.success(`Server listening at ${chalk.green("http://localhost:8080")}`);
}).catch((err) => {
    log.error(err);
    process.exit(1);
})