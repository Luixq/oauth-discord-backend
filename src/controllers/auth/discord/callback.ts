import { prisma } from "#/functions/database.js";
import { services } from "#/services/discordoauth/services.js";
import { User } from "#/types/@types.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const querySchema = z.object({
    code: z.string(),
});

async function controller(req: FastifyRequest, reply: FastifyReply) {
    const { code } = await querySchema.parseAsync(req.query);

    // Get user access token from discord oAuth2
    const userAccessToken = await services.GetUserAccessToken(code);

    // Get user data from discord api
    const userResponse = await fetch("https://discord.com/api/users/@me", {
        headers: {
            authorization: `${userAccessToken.token_type} ${userAccessToken.access_token}`,
        },
    });

    // If user data request failed, throw error
    if (!userResponse.ok) throw Error("Failed to get user data");
    const user = await userResponse.json() as User;
    if (!user.id) throw Error("Failed to get user data");

    // Create or update user in database
    const newOrUpdatedUser = await prisma.user.upsert({
        where: { discordId: user.id },
        update: {
            username: user.username,
            globalname: user.global_name || user.username,
            email: user.email,
            avatar: user.avatar,
            discriminator: user.discriminator,
            locale: user.locale,
            verified: user.verified,
            mfa_enabled: user.mfa_enabled,
            accessToken: userAccessToken.access_token,
            refreshToken: userAccessToken.refresh_token,
            tokenExpiresAt: new Date(Date.now() + userAccessToken.expires_in * 1000),
        },
        create: {
            discordId: user.id,
            username: user.username,
            globalname: user.global_name || user.username,
            email: user.email,
            avatar: user.avatar,
            discriminator: user.discriminator,
            locale: user.locale,
            verified: user.verified,
            mfa_enabled: user.mfa_enabled,
            accessToken: userAccessToken.access_token,
            refreshToken: userAccessToken.refresh_token,
            tokenExpiresAt: new Date(Date.now() + userAccessToken.expires_in * 1000),
        },
    });
    if (!newOrUpdatedUser) throw Error("Failed to create or update user");

    // Create new session
    const newSession = await prisma.session.create({
        data: {
            userId: newOrUpdatedUser.id,
            sessionExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
    });
    if (!newSession) throw Error("Failed to create session");

    // Set session cookie and redirect to frontend
    await reply.setCookie("session", newSession.id, {
        sameSite: 'lax',
        maxAge: 24 * 60 * 60,
        path: "/"
    }).redirect("http://localhost:3000/");
}

export { controller as AuthDiscordController };