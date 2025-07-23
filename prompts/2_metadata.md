# Prompt: "Generate Metadata"

## Goal

- Help me to create a better metada for the page, considering our specific topic **[YOUR_SPECIFIC_TOPIC]**.
- Use the company details provided and the structure in the example, please. **Be sure to use the Company details**.
- Change the title to match the topic and our services in a better way, maintaining the professional tone. Don't use the specifyc topic as the title, be more creative.
- If there are any placeholders, fields (e.g., `[change]`), replace them with the company details.
- Respect the banned vocabulary list (no “luxury”, “luxurious”, “deluxe”, “premier”).

## Output instructions — **STRICT**

1. **Return exactly one code block** fenced with three back-ticks followed by `html`:

   ```html
   <!-- entire, updated HTML goes here -->
   ```

2. **Do not** output anything—no explanations, no extra code blocks, no stray characters—*before* the opening ```html fence or *after* the closing``` fence.

## COMPANY DETAILS

- Company Name: **[CHANGE_NAME]**
- Domain: **[CHANGE_DOMAIN]**
- Address: **[CHANGE_ADDRESS]**
- Email: **support@[CHANGE_DOMAIN]**
- Date: **May 22, 2025**

## Metadata Template Example

```html
<title>Professional Home Styling & Color Matching Service | [CHANGE_NAME]</title>
<!-- Main information -->
<meta name="description" content="[change_NAME] offers professional remote home styling and color matching services. Upload room photos to receive custom color palettes, paint suggestions, and expert styling tips tailored to your space." />
<meta name="author" content="[change_NAME]" />
<!-- Creation and modification dates -->
<meta name="date" content="2025-04" />
<meta name="revised" content="2025-04" />
<!-- Keywords -->
<meta name="keywords" content="remote home styling, color matching service, custom color palettes, paint suggestions, room styling tips, [change_NAME], interior design help, online home consultation, house flipping design, new homeowner design, home color flow planning, custom mood boards" />
<!-- Open Graph for social media sharing -->
<meta property="og:title" content="Remote Home Styling & Color Matching: Professional Design Services from Your Photos" />
<meta property="og:description" content="Upload your room photos and receive custom color palettes, paint suggestions, and expert styling tips. Perfect for new homeowners and house flippers seeking professional design guidance." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://[change_NAME].com/" />
<meta property="og:site_name" content="[change_NAME]" />
<!-- Twitter Card -->
<meta name="twitter:title" content="Remote Home Styling & Color Matching: Professional Design Services from Your Photos" />
<meta name="twitter:description" content="Upload your room photos and receive custom color palettes, paint suggestions, and expert styling tips. Perfect for new homeowners and house flippers seeking professional design guidance." />
<!-- Canonical links -->
<link rel="canonical" href="https://[change_NAME].com/" />
```
