# Fix 5: Page titles and meta descriptions

**Problems:**

- The brand appears twice on product pages ("Pipihiri Camel … - Pipihiri").
- The homepage title is too long, so Google cuts it off.
- Key pages have no brand or location in the title.
- One product title reads like an Amazon listing.

## Step 1: Fix the title template (fixes every product at once)

In your SEO plugin, set the title templates to:

| Content type | Template |
|---|---|
| Products | `%title% \| Pipihiri` |
| Pages | `%title% \| Pipihiri` |
| Posts | `%title% \| Pipihiri` |

- **Yoast:** Yoast SEO → Settings → Content types → (each type) → SEO title
- **Rank Math:** Rank Math → Titles & Meta → (each type) → Single title

Variable names differ slightly between plugins. Use the plugin's own "Title" and "Site title" variables and a `|` separator.

## Step 2: Remove "Pipihiri" from the start of product names

On your own site the brand is obvious, so the name can describe the product. Rename these in **Products → Edit → Title**:

| Current product name | New product name |
|---|---|
| Pipihiri Camel Terracotta Tea Light Cover (Pack Of 2) | Camel Terracotta Tealight Cover, Hand-Painted (Set of 2) |
| Pipihiri Owl Terracotta Tea Light Cover (Pack of 2) | Owl Terracotta Tealight Cover, Hand-Painted (Set of 2) |
| Pipihiri Round Shape Terracotta Coasters (Set of 4) | Round Terracotta Coasters (Set of 4) |
| Pipihiri Terracotta Square Shape Coasters (Set of 4) | Square Terracotta Coasters (Set of 4) |
| Pipihiri Terracotta Table Clock, Terracotta, Indian Modern Artistic Design Look Table Clock, Home Decor | Horse Terracotta Table Clock, Hand-Painted |
| Pipihiri Terracotta Piggy Bank And Money Box | Terracotta Piggy Bank, Hand-Painted |
| Pipihiri Terracotta Round Leg Planter | Round Terracotta Planter with Legs |
| Pipihiri Terracotta Glass Shape Planter | Glass-Shape Terracotta Planter |

These are the products I could see in search results. Apply the same pattern to the rest of the catalogue: **[what it is], [what's special] ([set size])**.

> If your Google Shopping or Meta catalogue feed uses the product name, check that the feed still sends "Pipihiri" in its separate *brand* field.

## Step 3: Custom titles and descriptions for key pages

Set these in the SEO plugin box at the bottom of each page's editor. Titles are under 60 characters and descriptions under 160, so Google shows them in full.

### Homepage
- **Title:** Handmade Terracotta Decor & Planters | Pipihiri
- **Description:** Hand-painted terracotta planters, tealight covers, coasters and gifts, made in our Delhi studio. Free shipping above ₹499. Pottery classes & corporate gifts.

### Shop (`/shop/`)
- **Title:** Shop Handmade Terracotta Home Decor | Pipihiri
- **Description:** Planters, tealight covers, coasters, clocks and piggy banks, each shaped and hand-painted from natural clay in Delhi. Free shipping above ₹499.

### About (`/about-me/`)
- **Title:** About Pipihiri | A Terracotta Studio in Delhi
- **Description:** Pipihiri is a Delhi terracotta studio started by artists Aditi and Ajayy. Every piece is shaped, fired and hand-painted by hand. Read our story.

### Pottery Class (`/pottery-class/`)
- **Title:** Pottery Classes in [Area], Delhi | Pipihiri
- **Description:** Small-batch pottery classes in Delhi: beginner workshops (3 hrs, ₹2,500), terracotta decor workshops, masterclasses, kids' camps and team events.
- **H1 on the page:** Pottery Classes in [Area], Delhi

### Corporate Gifting (`/corporate-gifting/`)
See `02-corporate-gifting-merge.md`.

### Diwali guide
See `01-diwali-gift-guide-2026.md`.

### FAQ (`/faq/`)
- **Title:** FAQ: Shipping, Returns & Care | Pipihiri
- **Description:** Delivery times, free shipping above ₹499, what to do if a piece arrives damaged, and how to care for handmade terracotta.

> Check the workshop price and the ₹499 free-shipping threshold against your current rates before publishing.
