export type oAuthResponse = {
    token_type: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}

export type User = {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: string | null;
    accent_color: string | null;
    global_name: string;
    avatar_decoration_data: string | null;
    banner_color: string | null;
    clan: string | null;
    primary_guild: string | null;
    mfa_enabled: boolean;
    locale: string;
    premium_type: number;
    email: string;
    verified: boolean;
}