# Blog CMS (Decap) — setup & daily use

Dashboard: **https://www.wbzard.com/admin**. Works on laptop and phone.

Posts are saved as YAML files in `/data` (the same format as the existing posts) and committed to GitHub. Cloudflare Pages then rebuilds and publishes the site automatically, usually within about a minute. Every published post is prerendered, added to the sitemap and `llms.txt`, and gets full SEO markup, exactly like the hand-written guides.

---

## One-time setup (≈10 minutes)

Decap logs you in with GitHub. Because the site runs on Cloudflare (not Netlify), login goes through two small Cloudflare Pages Functions in `/functions/api/` that need a GitHub OAuth app.

### 1. Create a GitHub OAuth App
1. GitHub → your profile picture → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**
   *(If the repo belongs to the `wbzard-dev` organisation, you can create it under the org's settings instead. Either works.)*
2. Fill in:
   - **Application name:** `Wbzard Labs CMS`
   - **Homepage URL:** `https://www.wbzard.com`
   - **Authorization callback URL:** `https://www.wbzard.com/api/callback`
3. Click **Register application**.
4. Copy the **Client ID**. Then click **Generate a new client secret** and copy the secret. **It is only shown once.**

### 2. Add the keys to Cloudflare Pages
1. Cloudflare dashboard → **Workers & Pages** → your site's Pages project → **Settings** → **Variables and Secrets** (Environment variables).
2. For **Production**, add:
   - `GITHUB_CLIENT_ID` = the Client ID (type: Text)
   - `GITHUB_CLIENT_SECRET` = the client secret (type: **Secret**)
3. Save, then **redeploy** (Deployments → latest → ⋯ → Retry deployment) so the functions pick up the variables.

### 3. Log in
Open **https://www.wbzard.com/admin** → **Login with GitHub** → authorise. Only GitHub accounts with write access to `wbzard-dev/portfolio` can save anything.

---

## Writing and publishing a post

1. **Blog posts → New Blog post**
2. Fill in **Title, Category, Excerpt** and the **Body** (Markdown editor; use the "+" button for images).
3. Optional but recommended:
   - **Cover image:** 1200×630. Leave empty to use the default Wbzard Labs image.
   - **Key takeaways:** 3–5 short sentences. These show at the top and get quoted by Google and AI assistants.
   - **Show on city pages:** tick Shivamogga and/or Bangalore so the post appears on those pages.
   - **SEO title / meta description / keywords**
4. **Save.** The post is now a *Draft* (stored on a `cms/…` branch; not live).
5. Move it through **Workflow**: Drafts → In review → Ready.
6. Click **Publish → Publish now**. It's merged into `main` and goes live in about a minute at `/blog/<slug>`.

**From your phone:** the dashboard works in mobile Chrome or Safari. Editing is easiest in landscape. You can save drafts on the phone and polish them on a laptop later.

**Editing or deleting** a post works the same way: open it, change it, save, publish. Deleting a post removes its URL, so prefer editing over deleting posts that may already be indexed by Google.

## Writing tips for ranking
- Put the main keyword in the **title** and first paragraph (e.g. "website design in Shivamogga").
- Link to the matching service or course page, e.g. `/shivamogga/website-design` or `/courses/mern-stack-course-shivamogga`.
- Use `##` headings for sections, and keep paragraphs short.
- Add **Key takeaways**: they double as the article summary for search and AI.
- After publishing, use Search Console → **URL Inspection → Request indexing** on the new URL.

## Local editing (optional, for development)
```bash
npx decap-server      # in one terminal
npm run dev           # in another, then open http://localhost:5173/admin/
```
`local_backend: true` in `public/admin/config.yml` lets the CMS write straight to your local files without GitHub login.

## Files
- `public/admin/index.html`: loads Decap (pinned version)
- `public/admin/config.yml`: CMS fields, which mirror the blog YAML format
- `functions/api/auth.js`, `functions/api/callback.js`: GitHub OAuth for Cloudflare Pages
- `public/images/uploads/`: images uploaded through the CMS
