// Cloudflare Pages Function: GET /api/callback
// GitHub redirects here after login. Exchanges the code for a token and hands it to the Decap CMS
// window (/admin) using Decap's postMessage handshake.

export async function onRequestGet({ request, env }) {
    const url    = new URL(request.url);
    const code   = url.searchParams.get("code");
    const state  = url.searchParams.get("state");
    const cookie = (request.headers.get("Cookie") || "").match(/(?:^|;\s*)decap_oauth_state=([^;]+)/)?.[1];

    if (!code || !state || state !== cookie) {
        return reply(url.origin, "error", { message: "Login expired or was started elsewhere. Please try again." });
    }

    const res = await fetch("https://github.com/login/oauth/access_token", {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", "User-Agent": "wbzard-decap-cms" },
        body:    JSON.stringify({
            client_id:     env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code,
            redirect_uri:  `${url.origin}/api/callback`,
        }),
    });
    const data = await res.json().catch(() => ({}));

    if (!data.access_token) {
        return reply(url.origin, "error", { message: data.error_description || "GitHub login failed." });
    }
    return reply(url.origin, "success", { token: data.access_token, provider: "github" });
}

// Decap handshake: the popup announces itself, the CMS window answers, and the popup sends the result
// back — only to our own origin, so the token can't leak to another site that opened this window.
function reply(origin, status, content) {
    const message = JSON.stringify(`authorization:github:${status}:${JSON.stringify(content)}`).replace(/</g, "\\u003c");
    const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex"></head><body>
<p>${status === "success" ? "Logged in. You can close this window." : "Login failed. You can close this window and try again."}</p>
<script>
(function () {
    var allowed = ${JSON.stringify(origin)};
    function receive(e) {
        if (e.origin !== allowed) return;
        window.opener.postMessage(${message}, e.origin);
        window.removeEventListener("message", receive, false);
    }
    window.addEventListener("message", receive, false);
    window.opener && window.opener.postMessage("authorizing:github", allowed);
})();
</script></body></html>`;
    return new Response(html, {
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-store",
            "Set-Cookie": "decap_oauth_state=; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
        },
    });
}
