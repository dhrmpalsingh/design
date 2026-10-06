# Fixes 9–13: Brand, social media and press

## Fix 9: Help Google recognise "Pipihiri" as a brand

**Problem:** Searching just "pipihiri" returns Māori dictionary entries and an insect. You only appear when people add "terracotta".

### a) Tell Google who you are (Organization schema)

**If you use Yoast or Rank Math, use its built-in settings instead of pasting code.** Both already output this, and pasting it twice creates duplicates.

- **Yoast:** Yoast SEO → Settings → Site representation → Organisation. Set the name to "Pipihiri" and upload the logo. Then under Other profiles, add the links below.
- **Rank Math:** Rank Math → Titles & Meta → Local SEO (name, logo) and Social Meta (profile links).

**Profile links to add:**

- https://www.instagram.com/pipihiristudio/
- https://www.facebook.com/pipihiristudio/ (check this is the right Page)
- Your Amazon brand store URL (once you have one, see `07-amazon-listing.md`)
- Your Kala Curry brand page URL
- Your Google Business Profile link (once verified)

**With no SEO plugin**, paste this into the homepage `<head>`. Use your theme's "header scripts" box or a plugin such as WPCode:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Pipihiri",
  "url": "https://pipihiri.com/",
  "logo": "https://pipihiri.com/[path-to-logo].png",
  "description": "Handmade, hand-painted terracotta home decor, gifts and pottery classes from a studio in Delhi.",
  "founder": [
    { "@type": "Person", "name": "Aditi" },
    { "@type": "Person", "name": "Ajayy G Kumar" }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[same as fix 3]",
    "addressLocality": "New Delhi",
    "postalCode": "[PIN]",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://www.instagram.com/pipihiristudio/",
    "https://www.facebook.com/pipihiristudio/"
  ]
}
</script>
```

Check the founder names and spelling. Ajayy's name appears as "Ajayy G Kumar" in the mad4india article and as "Ajay" elsewhere.

### b) Spell it the same way everywhere

Use **Pipihiri**: capital P, everything else lowercase, as on the site. The mad4india article writes "PipiHiri". Email them and ask for a correction. While you're at it, ask them to add a link to pipihiri.com if there isn't one.

### c) More mentions that use the brand name

Each listing below adds a mention of "Pipihiri" with a link to your site:

- Google Business Profile (fix 4)
- Kala Curry brand page: make sure it links to pipihiri.com
- Craft and maker directories, such as Delhi craft councils, sustainable-brand lists and Indian handmade marketplaces
- City-guide features (fix 13)

## Fix 10: Instagram bio

**Current:** "Handcrafted Luxury #homedecor"

**New bio (under Instagram's 150-character limit):**

```
Handmade terracotta, shaped & painted in our Delhi studio 🏺
Pottery classes · Corporate & Diwali gifts
Shop, book a class or order in bulk 👇
```

**Links:** Instagram allows up to 5 links in the bio. Add them in this order:

1. Diwali Gifts 2026 → `pipihiri.com/diwali-gift-ideas/` (until 8 Nov, then remove)
2. Shop → `pipihiri.com/shop/`
3. Corporate Gifting → `pipihiri.com/corporate-gifting/`
4. Pottery Classes → `pipihiri.com/pottery-class/`
5. Amazon → your Amazon store or listing

**Other quick wins:**

- **Name field:** "Pipihiri | Terracotta Studio". The name field is searchable on Instagram, so "terracotta" in it helps people find you.
- **Category:** set it to Home Decor or Art Studio.
- **Highlights:** add a "Classes" highlight and a "Reviews" highlight with customer photos and DMs. Ask permission before sharing.

## Fix 11: Facebook

Your Facebook Page didn't appear in search results. You need a Facebook Page to run Instagram or Facebook ads, so keep it, but don't put effort into it:

1. In **Meta Business Suite**, connect the Instagram account to the Facebook Page.
2. Turn on **automatic sharing** of Instagram posts and reels to Facebook. The Page then stays active with no extra work.
3. Check that the Page's About section uses the address from fix 3 and links to pipihiri.com.

If you'd rather not have a Facebook presence, remove the Facebook icon from the website footer so visitors don't land on an empty Page.

## Fix 12: Positioning (your decision)

**Problem:** Instagram says "Handcrafted Luxury", but the site leads with ₹299 coasters and free shipping above ₹499. Customers get two different messages.

| Option | Message | Fits |
|---|---|---|
| **A. Handmade for every day** (recommended) | Real handmade terracotta, at prices that make it an everyday buy and an easy gift | Your current prices, free shipping above ₹499, corporate bulk orders, gifting guides |
| B. Artisan luxury | Collector pieces, small batches, made to order | Would need higher prices, premium packaging and fewer discounts |

The new Instagram bio and page titles in these files follow **option A**. If you choose B, tell me and I'll rewrite them.

## Fix 13: Get onto "best pottery classes in Delhi" lists

LBB's **"10 Best Pottery Classes In Delhi"** (https://lbb.in/delhi/pottery-classes-delhi-ncr/) ranks highly for that search. Lists like this get updated, and they need studios to include.

### Pitch email

**To:** LBB Delhi's editorial or contributor contact (check the site's footer or contact page for the current address)
**Subject:** Pottery studio for your Delhi pottery classes list: Pipihiri, [Area]

> Hi LBB team,
>
> I'm [Aditi], co-founder of Pipihiri, a terracotta studio in [Area], Delhi. I saw your "10 Best Pottery Classes in Delhi" list and wanted to suggest us for the next update.
>
> What we run:
> - Beginner pottery workshop: 3 hours, ₹2,500, in small batches
> - Terracotta home-decor workshop: 4 hours, ₹3,200
> - Full-day advanced ceramic masterclass: ₹5,500
> - Kids' pottery camps (ages 8–16) and team-building sessions for companies
>
> Pipihiri started when we watched a potter's child shape a mud whistle ("pipihiri" is a folk word for a whistle). Today everything we sell is shaped and hand-painted in the same studio where we teach.
>
> If it helps, a writer is welcome to join a session as our guest. Photos: [Drive link]
>
> Thanks,
> [Name]
> [Phone] · pipihiri.com/pottery-class · @pipihiristudio

Send the same pitch to other Delhi city guides and listicles that rank for "pottery classes in Delhi". Search the phrase and pitch the top 5–10 pages that aren't studios themselves.

> Check the class details and prices against your current offering before sending. These come from your indexed Pottery Class page.
