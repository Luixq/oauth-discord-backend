import { FastifyReply, FastifyRequest } from "fastify";

async function controller(req: FastifyRequest, reply: FastifyReply) {
    const userInfos = req.user;

    return reply.send({
        id: userInfos.user.id,
        discordId: userInfos.user.discordId,
        username: userInfos.user.username,
        globalname: userInfos.user.globalname,
        discriminator: userInfos.user.discriminator,
        avatar: userInfos.user.avatar,
        email: userInfos.user.email,
        verified: userInfos.user.verified,
        locale: userInfos.user.locale,
        mfa_enabled: userInfos.user.mfa_enabled,
        createdAt: userInfos.user.createdAt,
        updatedAt: userInfos.user.updatedAt ,
        session: userInfos.session
    });
}

export { controller as MeController };