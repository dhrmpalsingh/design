# Fix 7 and smaller fixes: Site cleanup

## Fix 7: Hide thin archive pages from Google

**Problem:** WordPress tag and category pages are indexed, such as `/tag/terracotta-gifts/`, `/category/gifting-guides/` and `/category/home-decor-ideas/`. On their own they're just lists of post excerpts, and they compete with your real articles.

### Tags: noindex all of them

- **Yoast:** Yoast SEO → Settings → Categories & tags → Tags → turn **off** "Show tags in search results"
- **Rank Math:** Rank Math → Titles & Meta → Tags → Robots Meta → tick **No Index**

### Categories: keep them, but add an intro

Category pages can rank if they say something. Paste these into **Posts → Categories → Edit → Description**. Check that your theme displays the description, and if it doesn't, the SEO plugin may have a setting for it.

**Gifting Guides**
> Gift ideas that won't end up in the cupboard. Our gifting guides cover Diwali, housewarmings, weddings and corporate gifts, with handmade terracotta picks at every budget, all shaped and hand-painted in our Delhi studio.

**Home Decor Ideas**
> Ideas for using terracotta at home: where to put planters so they thrive, how to style tealight covers, which plants suit clay pots, and how to make handmade pieces last. Written from our studio in Delhi and tested in real Indian homes and balconies.

If you don't want to write intros, noindex categories the same way as tags.

## Fix the product URL typo

`/product/sqaure-shape-coasters/` → `/product/square-shape-coasters/`

1. **Products → Square Terracotta Coasters → Edit**, then change the **slug** to `square-shape-coasters`.
2. WordPress redirects the old product URL automatically. A backup line is in `redirects.csv`.
3. Update the link if it's used in Instagram posts or bio links.

## About page URL (optional, low priority)

`/about-me/` reads like a one-person blog, but Pipihiri has two founders. To change it:

1. **Pages → About → Edit**, then change the slug to `about`.
2. **Pages don't redirect automatically**, so add the `/about-me/` → `/about/` line from `redirects.csv` first.
3. Update the menu link.

Skip this if you're short on time. It's cosmetic.

## Make the unboxing-video rule visible before people buy

**Problem:** The shipping policy requires an unboxing video within 24 hours for damage claims. Customers who don't know this before the box arrives end up as angry reviews.

Show this short notice on **every product page** (WooCommerce → Settings, or a "short description" block, or your theme's product-page notice option) and on the **checkout** page:

> 📦 **Terracotta is fragile.** Please record a video while opening your parcel. If anything arrives damaged, send us the video within 24 hours and we'll replace it or refund you.

Also include this line in the order confirmation email.

## Diary reminder: January 2027

The post "Best Pottery Studios in India **2026**" will look out of date in January. Either update it to 2027, or remove the year from the title and slug and add a redirect, the same way as the Diwali guide.
