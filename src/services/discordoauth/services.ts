import { oAuthResponse } from "#/types/@types.js";

async function GetUserAccessToken(code: string) {
    const body = new FormData();
    body.set("grant_type", "authorization_code");
    body.set("code", code);
    body.set("redirect_uri", "http://localhost:8080/auth/discord/callback");
    body.set("client_secret", process.env.OAUTH_CLIENT_SECRET);
    body.set("client_id", process.env.OAUTH_CLIENT_ID);
    body.set("scope", "identify");

    const response = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        body,
    });

    if (!response.ok) throw Error("Failed to get access token");

    const data = await response.json() as oAuthResponse;

    if (!data.access_token) throw Error("Invalid access token");

    return data;
}

export const services = {
    GetUserAccessToken
}