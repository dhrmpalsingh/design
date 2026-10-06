# Pipihiri website fixes

These are ready-to-apply fixes from the website presence audit of pipihiri.com (6 October 2026). Each file has the exact text to paste and where to paste it.

## Order of work

Diwali is on **8 November 2026**, and companies place Diwali gift orders in October. So do the top block first.

| # | Fix | File | Where it's done | Time |
|---|---|---|---|---|
| **This week** |||||
| 1 | Update the Diwali gift guide for 2026 and move it to a URL without a year | `01-diwali-gift-guide-2026.md` | Website | 1 hr |
| 2 | Merge `/gifting/` into `/corporate-gifting/` | `02-corporate-gifting-merge.md` | Website | 30 min |
| 3 | Use one address everywhere | `03-address-and-google-business-profile.md` | Website, Justdial, Kala Curry, Amazon, Instagram, Facebook | 30 min |
| 4 | Create a Google Business Profile | `03-address-and-google-business-profile.md` | Google (your account) | 20 min, plus verification |
| **This month** |||||
| 5 | Page titles and descriptions | `04-page-titles-and-descriptions.md` | Website | 45 min |
| 6 | Turn on reviews and start asking for them | `05-reviews.md` | Website, WhatsApp | 15 min, then ongoing |
| 7 | Hide tag pages from Google, add category intros | `06-site-cleanup.md` | Website | 10 min |
| 8 | Clean up the Amazon listing | `07-amazon-listing.md` | Seller Central | 20 min per listing |
| 9 | Help Google recognise the brand name | `08-brand-and-social.md` | Website SEO settings, email to mad4india | 20 min |
| 10 | New Instagram bio and links | `08-brand-and-social.md` | Instagram | 10 min |
| 11 | Facebook: auto-share from Instagram | `08-brand-and-social.md` | Meta Business Suite | 10 min |
| 12 | Choose your positioning | `08-brand-and-social.md` | Your decision | — |
| 13 | Pitch the "best pottery classes in Delhi" lists | `08-brand-and-social.md` | Email | 30 min |
| — | Small fixes: URL typo, About URL, unboxing notice | `06-site-cleanup.md` | Website | 20 min |

## Redirects

`redirects.csv` lists the 301 redirects. Each row is: old URL, new URL, regex (0 = no), HTTP code. You can import it into the free **Redirection** plugin (Tools → Redirection → Import/Export).

**Only add a redirect after its new page exists.** Otherwise visitors land on a "page not found" error.

- `/gifting/` → `/corporate-gifting/`: the new page already exists, so this is safe now.
- The Diwali, square-coasters and About lines: rename the slug first, then add the redirect.
- If you skip the optional About rename, delete that line.

## Check these details before publishing

I couldn't open the live site, so some details come from search results or are left as `[brackets]`:

- [ ] Prices: workshops (₹2,500 / ₹3,200 / ₹5,500), coasters from ₹299 and planters from ₹399 for corporate orders, free shipping above ₹499
- [ ] Your public address and the area name for the pottery class page
- [ ] The last order date for Diwali delivery, and corporate order deadlines
- [ ] Spelling of the founders' names (Aditi, Ajayy G Kumar)
- [ ] Product links and prices in the Diwali guide
- [ ] Whether you use Yoast or Rank Math (the steps cover both)

## What only you can do

These need your own logins, so the text is ready for you to paste:

- Google Business Profile
- Justdial
- Kala Curry
- Amazon Seller Central
- Instagram
- Facebook
- Emails to LBB and mad4india

## What Claude can apply on the website

With access to the WordPress site, Claude can apply fixes 1, 2, 5, 6, 7 and the small fixes directly:

- Renaming products and slugs
- Updating page and post content and SEO fields
- Adding category descriptions
- Adding redirects

A few plugin settings screens may still need a click from you; Claude will list those.

**To give access:**

1. **Allow the site:** in the cloud environment settings (environment menu in the session title bar → Edit → Network access), add `pipihiri.com` and `www.pipihiri.com` to the allowed domains. Keep the default package-manager list.
2. **Create a WordPress Application Password:** in WordPress, go to Users → Profile → Application Passwords, name it "Claude", and click Add. Use an Administrator account.
3. **Store it as a secret, not in chat:** in the same environment settings, add two environment variables:
   - `WP_USER`: your WordPress username
   - `WP_APP_PASSWORD`: the application password
4. **Start a new session** (new settings only apply to new sessions) and say: *"Apply the fixes in `pipihiri/` from branch `claude/wonderful-noether-p4y86z` to pipihiri.com."*

You can revoke the application password in the same WordPress screen as soon as the work is done.
