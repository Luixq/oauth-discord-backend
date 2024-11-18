import { FastifyInstance } from "fastify";
import { DefineRoutesHandler } from "types/defineRoute.js";

export function DefineRoutes(handler: DefineRoutesHandler) {
    return function(app: FastifyInstance, _: any, done: Function) {
        handler(app);
        done();
    }
}