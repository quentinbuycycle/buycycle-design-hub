# Publish to Design Hub

You are about to publish a case study to the buycycle Design Hub. Analyze the current conversation context and the work that was just completed, then generate a structured case study and submit it.

## Steps

1. **Ask the author** for their full name if not already known from context.

2. **Analyze the conversation** and generate the following:
   - **Title**: A concise, descriptive title for the work done (not generic — specific to the feature/fix/design)
   - **Problem**: Exactly 2 concise sentences. What was the challenge? What user or business problem was being solved?
   - **Solution**: Exactly 2 concise sentences. What was built or designed? What was the key design decision?
   - **UX & UI Rationale**: Maximum 5 concise bullet points. Why was this the right design solution? Reference relevant UX principles, heuristics, or Gestalt laws where applicable.
   - **System Limitations**: Concise bullet points only. Where did gaps, missing components, or unclear guidelines in the design system slow things down or force workarounds? Be specific and constructive. If there were no limitations, say so in one line.

3. **Generate tags** using exactly these two categories:
   - **User type**: Pick one — "Buyer", "Seller", or "Buyer & Seller"
   - **Core flow**: Pick one — "Pre-transactional XP", "Seller XP", or "Post-transaction XP"
   Both tags are required on every case study.

4. **Locate HTML prototype file(s)** from the current project. Search for all `.html` files. If multiple HTML files exist, list them and ask the author which one(s) should be published as prototypes to review. Multiple selections are allowed — all selected files will be uploaded. If no HTML file exists, generate a self-contained HTML file that visually presents the work as a clean, viewable prototype — inline all CSS and JS, no external dependencies.

5. **Show the complete case study to the author** for review. Show the title, all sections, tags, and the prototype filename(s). Ask: "Does this look good? I'll publish it to the Design Hub."

6. **Once confirmed**, read the first HTML prototype file content and POST to the Design Hub API to create the case study:

   curl -X POST https://buycycle-aidesign-onboarding.vercel.app/api/upload \
     -H "Content-Type: application/json" \
     -d '{
       "password": "BUYCYCLE_HUB_2026",
       "title": "[title]",
       "author": "[author name]",
       "team": "[team — ask if unsure, default to the team context from conversation]",
       "tags": ["[User type tag]", "[Core flow tag]"],
       "problem": "[2 sentences]",
       "solution": "[2 sentences]",
       "rationale": "[bullet points as markdown]",
       "systemStrengths": "",
       "systemLimitations": "[bullet points as markdown]",
       "prototypeHtml": "[full HTML file content as string]",
       "prototypeFilename": "[filename].html"
     }'

7. **If multiple prototypes were selected**, upload each additional prototype using the upload-final endpoint with `"type": "review"`. For each additional file after the first:

   curl -X POST https://buycycle-aidesign-onboarding.vercel.app/api/upload-final \
     -H "Content-Type: application/json" \
     -d '{
       "password": "BUYCYCLE_HUB_2026",
       "slug": "[slug from step 6 response]",
       "prototypeHtml": "[full HTML file content as string]",
       "prototypeFilename": "[filename].html",
       "type": "review"
     }'

8. **If the API returns success**, tell the author: "Published! Your case study is live at https://buycycle-aidesign-onboarding.vercel.app/output/[slug]"

9. **If the API returns an error**, show the error message and suggest the author try the manual upload form at https://buycycle-aidesign-onboarding.vercel.app/upload

## Content rules — strictly follow these
- Problem: 2 sentences only. No more.
- Solution: 2 sentences only. No more.
- UX & UI Rationale: 5 bullet points max. Each bullet is one concise line.
- System Assessment: Only limitations. No strengths section. Concise bullet points only.
- Tags: Always exactly 2 tags. One user type (Buyer / Seller / Buyer & Seller) and one core flow (Pre-transactional XP / Seller XP / Post-transaction XP).

## Important
- Write in a clear, professional tone. Not marketing copy — honest documentation.
- The System Limitations section is critical. Be genuinely constructive — this feedback loop improves the framework.
- If the conversation doesn't contain enough context to write a meaningful case study, tell the author and ask for more detail rather than fabricating content.
- Never ask the author to do anything with git or GitHub. The API handles everything.
