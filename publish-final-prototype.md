# Publish Final Prototype

You are about to publish a final prototype to an existing case study on the buycycle Design Hub. The user (Lead Designer) will provide the case study slug or URL, and the HTML prototype file(s) to upload.

## Steps

1. **Identify the case study** from the user's message. Extract the slug from the URL or use the slug directly. Example: `https://buycycle-aidesign-onboarding.vercel.app/output/price-adjustment-modal-for-component-upgrades` → slug is `price-adjustment-modal-for-component-upgrades`.

2. **Locate the HTML prototype file(s)** from the current project. Search for all `.html` files. If multiple HTML files exist, list them and ask which one(s) should be published as final prototypes. Multiple selections are allowed.

3. **Show a summary** of what will be published: the case study slug and the filename(s). Ask: "Ready to publish these as final prototypes?"

4. **Once confirmed**, for each HTML file, read the file content and POST to the Design Hub API:

   curl -X POST https://buycycle-aidesign-onboarding.vercel.app/api/upload-final \
     -H "Content-Type: application/json" \
     -d '{
       "password": "BUYCYCLE_HUB_2026",
       "slug": "[case-study-slug]",
       "prototypeHtml": "[full HTML file content as string]",
       "prototypeFilename": "[filename].html"
     }'

   Note: Do NOT include `"type"` — the default is `"final"`, which is correct here.

5. **If the API returns success**, tell the user: "Published! Final prototype is live at https://buycycle-aidesign-onboarding.vercel.app/output/[slug]"

6. **If the API returns an error**, show the error message clearly.

## Important
- This command only adds final prototypes to existing case studies. It does not create new case studies.
- Never ask the user to do anything with git or GitHub. The API handles everything.
- If the slug cannot be found, the API will return a 404 — inform the user and ask them to double-check the case study URL.
