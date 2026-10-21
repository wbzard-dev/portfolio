// Cloudflare Pages Function: GET /api/auth
// Starts the GitHub OAuth flow for Decap CMS (/admin). Needs GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET
// set as environment variables in the Cloudflare Pages project (see docs/cms.md).

const ALLOWED_SCOPES = ["public_repo", "repo"];

export async function onRequestGet({ request, env }) {
    if (!env.GITHUB_CLIENT_ID) {
        return new Response("CMS login is not configured: GITHUB_CLIENT_ID is missing.", { status: 500 });
    }

    const url   = new URL(request.url);
    const scope = ALLOWED_SCOPES.includes(url.searchParams.get("scope")) ? url.searchParams.get("scope") : "public_repo";
    const state = crypto.randomUUID();

    const authorize = new URL("https://github.com/login/oauth/authorize");
    authorize.searchParams.set("client_id",    env.GITHUB_CLIENT_ID);
    authorize.searchParams.set("redirect_uri", `${url.origin}/api/callback`);
    authorize.searchParams.set("scope",        `${scope},user`);
    authorize.searchParams.set("state",        state);

    return new Response(null, {
        status: 302,
        headers: {
            Location: authorize.toString(),
            // Checked in /api/callback to make sure the login was started from this site (CSRF protection).
            "Set-Cookie": `decap_oauth_state=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
        },
    });
}
