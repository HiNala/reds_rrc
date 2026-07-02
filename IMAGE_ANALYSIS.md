# Image Analysis: Original Site vs Rebuilt Site

## Methodology

1. Parsed `start/assets/asset-manifest.json` to extract all 29 image assets (jpg/png/ico) with their Wix media IDs, dimensions, file sizes, and page usages.
2. Parsed each page's `rendered-dom.html` to extract `<img>` tags with alt text and surrounding context.
3. Used Playwright to navigate the live original site (`www.redsrrc.com`) and the rebuilt site (`redsrrc-production.up.railway.app`), extracting all rendered `<img>` elements with their src, alt, and dimensions.
4. Matched `public/` files to original assets by file size (byte-exact matching).
5. Compared the original site's page-to-image mapping with the rebuilt site's actual image usage.

---

## Complete Asset Table (29 image assets)

| # | Asset filename | Wix media ID | Dimensions | Size (bytes) | Original page | Section / position | What the image shows |
|---|---|---|---|---|---|---|---|
| 1 | asset-08f1ae6a37c3.png | 938e72_d4441407002248f886835d5c36934e14 | 92x83 | 6,500 | Home (3d4bed) | Header logo (all pages) | Red's RRC company logo |
| 2 | asset-bad93a88c178.jpg | 938e72_424643a7e5c040eebf867b358822562b | 235x215 | 5,678 | Home (3d4bed) | Footer (all pages) | TimberTech PRO Platinum contractor badge |
| 3 | asset-33c1436f8c40.ico | pfavico | 16x16 | 1,150 | Home (3d4bed) | Favicon | Browser favicon |
| 4 | asset-413ceef82355.png | sloppyframe.3214ce8e | 1970x1970 | 40,949 | Home (3d4bed) | Background decoration | Wix UI frame overlay (decorative, not content) |
| 5 | asset-341fe01ae24d.jpg | 6e10219f11314e1babe61a59ef135376 | 426x514 | 41,367 | Services | Building Maintenance section | Handyman / maintenance work (alt="Handyman") |
| 6 | asset-da1cc5aa8a95.jpg | a4bdf9dc953e4e7cb2a039d75f446429 | 427x514 | 39,502 | Services | Construction Management section | Construction management (alt="Construction Management") |
| 7 | asset-d9cd1e8194dc.jpg | 9f3b705350c4415c965e09ba54aff41d | 427x514 | 29,091 | Services | Construction Planning section | Building plans / blueprints (alt="Building Plans") |
| 8 | asset-f5b8c0f44582.png | 938e72_13043050dec744738861779a6ab1f8aa | 1280x729 | 2,276,142 | Home (cc4a84) | Hero slideshow slide 1 | Outdoor deck/patio with glass railing (alt="DSC05148-HDR_edited.png") |
| 9 | asset-564d9d24544c.png | 938e72_70fc414ec4cd42f480e575daabe7414c | 1280x729 | 1,941,590 | Home (cc4a84) | Hero slideshow slide 2 | TimberTech deck with glass railing (alt="TimberTech-ImpressionRailExpress...") |
| 10 | asset-b7c42540480e.jpg | 938e72_2c68e4faa42a44eb87b736a6f3f1889b | 320x388 | 34,774 | Home (cc4a84) | Portrait photo (below hero) | Founder portrait (alt="IMG_5650_edited_edited.jpg") |
| 11 | asset-f39375af1984.jpg | 938e72_dd5d4dbaf5da4680b20fbfc9abce365e | 320x388 | 29,652 | Home (cc4a84) | Portrait photo (below hero) | Personal/lifestyle photo (alt="6ECBFC47-E1A7-4AAA-A6E6-A4D6184D5839...") |
| 12 | asset-6baad66cff25.jpg | 938e72_2c68e4faa42a44eb87b736a6f3f1889b | 155x155 | 14,097 | Our Story | Founder portrait (OUR STORY section) | Founder portrait, cropped square (same image as #10, smaller crop) |
| 13 | asset-55e8628a7d09.png | 938e72_e5cfc41109c14b01b64181004eb56400 | 910x683 | 1,235,522 | Our Clients | Gallery slideshow position 1 | Man relaxing on patio with yellow Labrador |
| 14 | asset-9c44b3a4ddd9.jpg | 938e72_70932cef653c404fb29aa6073c76a35e | 512x683 | 96,183 | Our Clients | Gallery slideshow position 2 | Completed construction project |
| 15 | asset-e359098ef4a4.jpg | 938e72_d6f9c8d5856745b4ae905dc7b6e52d4d | 910x683 | 84,348 | Our Clients | Gallery slideshow position 3 | Completed construction project |
| 16 | asset-f711ccbfb1d1.jpg | 938e72_3ca38f9d937746fa9d4b50635e2ccdfb | 512x683 | 51,191 | Our Clients | Gallery slideshow position 4 | Construction project detail |
| 17 | asset-195dad802798.jpg | 938e72_7a7eae8c54a14b0b8d3a242a4ec44ae6 | 910x683 | 95,180 | Our Clients | Gallery slideshow position 5 | Completed construction project |
| 18 | asset-97055b503e16.jpg | 938e72_9d6a011778ef4a1993ed0187d36200e6 | 910x683 | 131,121 | Our Clients | Gallery slideshow position 6 | Small dog on sunlit finished deck |
| 19 | asset-d74d9c72678c.jpg | 938e72_7f2ee4c5460749928a8d7327ba9f7471 | 512x683 | 128,783 | Our Clients | Gallery slideshow position 7 | Dog in yard with outdoor construction |
| 20 | asset-e63738766da9.png | 938e72_cf29e67de2984752b3c65d3b4cf639e5 | 512x683 | 839,344 | Our Clients | Gallery slideshow position 8 | Dog resting inside finished home |
| 21 | asset-c0a6b8d80d12.jpg | 938e72_648aa1d21e6e4098ac32423784de9835 | 512x683 | 110,012 | Our Clients | Gallery slideshow position 9 | Completed construction project |
| 22 | asset-2195b9ff40da.jpg | 938e72_dd5d4dbaf5da4680b20fbfc9abce365e | 512x683 | 68,645 | Our Clients | Gallery slideshow position 10 | Personal/lifestyle photo (same image as #11, larger version) |
| 23 | asset-bf897de5a38b.jpg | 938e72_5896c48032e748a6a2788ea6ec86da4e | 512x683 | 78,278 | Our Clients | Gallery slideshow position 11 | Construction progress photo |
| 24 | asset-e35c86d48dd2.jpg | 938e72_afda2736237d41709263f20781e7baf0 | 910x683 | 64,293 | Our Clients | Gallery slideshow position 12 | Completed construction project |
| 25 | asset-601b7744ce0d.png | 938e72_fbabc68c79e94a17b2366faf83a1739e | 910x683 | 1,366,041 | Our Clients | Gallery slideshow position 13 | Black dog on driveway with construction materials |
| 26 | asset-2029a74ea09b.jpg | 938e72_fa0212783ae441789068247849e6fd42 | 512x683 | 106,630 | Our Clients | Gallery slideshow position 14 | Construction project detail |
| 27 | asset-bd0ff1f1acfe.png | 938e72_1741a75cdd1a460ebea12e7b07cd3720 | 512x683 | 687,817 | Our Clients | Gallery slideshow position 15 | Founder with small white dog |
| 28 | asset-7e856e538174.jpg | 938e72_1cb46151bd26431090bdeb7d0048dd94 | 910x683 | 124,464 | Our Clients | Gallery slideshow position 16 | Construction project showcase |
| 29 | asset-3639c8cb0b23.jpg | 938e72_74850167802b43b5bd5bf36cc93838ee | 512x683 | 42,560 | Our Clients | Gallery slideshow position 17 | Completed construction project detail |

### Shared Wix media IDs (same image, different crops/resolutions)

- **938e72_2c68e4faa42a44eb87b736a6f3f1889b** = asset #10 (Home, 320x388) and asset #12 (Story, 155x155 cropped) — founder portrait
- **938e72_dd5d4dbaf5da4680b20fbfc9abce365e** = asset #11 (Home, 320x388) and asset #22 (Clients, 512x683) — personal/lifestyle photo

---

## Current public/ file mapping (by byte-exact file size matching)

| public/ file | Size (bytes) | Matched asset | Original page | Correct? |
|---|---|---|---|---|
| `public/brand/logo.png` | 6,500 | asset-08f1ae6a37c3 (92x83) | Home (logo) | YES |
| `public/brand/timbertech-platinum.png` | 5,678 | asset-bad93a88c178 (235x215) | Home (footer badge) | YES |
| `public/hero/hero-1.png` | 2,276,142 | asset-f5b8c0f44582 (1280x729) | Home hero slide 1 | YES |
| `public/hero/hero-2.png` | 1,941,590 | asset-564d9d24544c (1280x729) | Home hero slide 2 | YES |
| `public/services/building-maintenance.jpg` | 41,367 | asset-341fe01ae24d (426x514) | Services — Building Maintenance | YES |
| `public/services/construction-management.jpg` | 29,091 | asset-d9cd1e8194dc (427x514) | Services — Construction Planning | **NO — SWAPPED** |
| `public/services/construction-planning.jpg` | 39,502 | asset-da1cc5aa8a95 (427x514) | Services — Construction Management | **NO — SWAPPED** |
| `public/gallery/project-01.png` | 2,276,142 | asset-f5b8c0f44582 (1280x729) | Home hero slide 1 | **NO — hero image, not gallery** |
| `public/gallery/project-02.png` | 1,941,590 | asset-564d9d24544c (1280x729) | Home hero slide 2 | **NO — hero image, not gallery** |
| `public/gallery/project-03.jpg` | 68,645 | asset-2195b9ff40da (512x683) | Clients gallery #10 | YES |
| `public/gallery/project-04.jpg` | 34,774 | asset-b7c42540480e (320x388) | Home portrait | **NO — home page portrait, not gallery** |
| `public/gallery/project-05.png` | 1,235,522 | asset-55e8628a7d09 (910x683) | Clients gallery #1 | YES (but duplicated on story page) |
| `public/gallery/project-06.png` | 687,817 | asset-bd0ff1f1acfe (512x683) | Clients gallery #15 | YES (but duplicated on story page) |
| `public/gallery/project-07.png` | 1,366,041 | asset-601b7744ce0d (910x683) | Clients gallery #13 | YES |
| `public/gallery/project-08.jpg` | 131,121 | asset-97055b503e16 (910x683) | Clients gallery #6 | YES |
| `public/gallery/project-09.jpg` | 128,783 | asset-d74d9c72678c (512x683) | Clients gallery #7 | YES |
| `public/gallery/project-10.png` | 839,344 | asset-e63738766da9 (512x683) | Clients gallery #8 | YES |
| `public/gallery/project-11.jpg` | 96,183 | asset-9c44b3a4ddd9 (512x683) | Clients gallery #2 | YES |
| `public/gallery/project-12.jpg` | 84,348 | asset-e359098ef4a4 (910x683) | Clients gallery #3 | YES |
| `public/gallery/project-13.jpg` | 51,191 | asset-f711ccbfb1d1 (512x683) | Clients gallery #4 | YES |
| `public/gallery/project-14.jpg` | 95,180 | asset-195dad802798 (910x683) | Clients gallery #5 | YES |
| `public/gallery/project-15.jpg` | 78,278 | asset-bf897de5a38b (512x683) | Clients gallery #11 | YES |
| `public/gallery/project-16.jpg` | 64,293 | asset-e35c86d48dd2 (910x683) | Clients gallery #12 | YES |
| `public/gallery/project-17.jpg` | 106,630 | asset-2029a74ea09b (512x683) | Clients gallery #14 | YES |
| `public/gallery/project-18.jpg` | 110,012 | asset-c0a6b8d80d12 (512x683) | Clients gallery #9 | YES |
| `public/gallery/project-19.jpg` | 124,464 | asset-7e856e538174 (910x683) | Clients gallery #16 | YES |
| `public/gallery/project-20.jpg` | 42,560 | asset-3639c8cb0b23 (512x683) | Clients gallery #17 | YES |
| `public/story/founder-portrait.jpg` | 34,774 | asset-b7c42540480e (320x388) | Home portrait (same image as Story) | Acceptable (higher-res version of correct image) |
| `public/story/founder-with-dog.png` | 1,235,522 | asset-55e8628a7d09 (910x683) | Clients gallery #1 | **NO — clients gallery image, not story** |
| `public/story/founder-with-white-dog.png` | 687,817 | asset-bd0ff1f1acfe (512x683) | Clients gallery #15 | **NO — clients gallery image, not story** |

---

## All Current Mismatches

### MISMATCH 1: Service images are SWAPPED

**Problem:** `construction-management.jpg` and `construction-planning.jpg` contain each other's images.

| public/ file | Currently contains | Original alt text | Should contain |
|---|---|---|---|
| `public/services/construction-management.jpg` | asset-d9cd1e8194dc (alt="Building Plans") | "Building Plans" | asset-da1cc5aa8a95 (alt="Construction Management") |
| `public/services/construction-planning.jpg` | asset-da1cc5aa8a95 (alt="Construction Management") | "Construction Management" | asset-d9cd1e8194dc (alt="Building Plans") |
| `public/services/building-maintenance.jpg` | asset-341fe01ae24d (alt="Handyman") | "Handyman" | CORRECT — no change needed |

**Fix:** Swap the contents of `construction-management.jpg` and `construction-planning.jpg`. The file `construction-management.jpg` should contain the image whose original Wix alt text was "Construction Management" (asset-da1cc5aa8a95 / `start/assets/images/asset-da1cc5aa8a95.jpg`), and `construction-planning.jpg` should contain the image whose alt text was "Building Plans" (asset-d9cd1e8194dc / `start/assets/images/asset-d9cd1e8194dc.jpg`).

**Source files:**
- `start/assets/images/asset-da1cc5aa8a95.jpg` → copy to `public/services/construction-management.jpg`
- `start/assets/images/asset-d9cd1e8194dc.jpg` → copy to `public/services/construction-planning.jpg`

---

### MISMATCH 2: Gallery contains hero images (project-01 and project-02)

**Problem:** `public/gallery/project-01.png` and `public/gallery/project-02.png` are duplicates of the hero images, not client gallery photos.

| public/ file | Currently contains | Should be |
|---|---|---|
| `public/gallery/project-01.png` | asset-f5b8c0f44582 = hero-1.png (DSC05148-HDR, 1280x729) | A client gallery image (or removed) |
| `public/gallery/project-02.png` | asset-564d9d24544c = hero-2.png (TimberTech, 1280x729) | A client gallery image (or removed) |

**Impact:** The clients/projects pages show hero images as project photos. These are wide panoramic deck shots that don't belong in the project gallery.

**Fix:** Remove `project-01.png` and `project-02.png` from the gallery, or replace them with actual client gallery images. The original clients page has 17 unique gallery images. The current gallery has 20 slots, but 3 are wrong (project-01, project-02, project-04), leaving only 17 correct ones — which matches the original count. So the simplest fix is to remove project-01, project-02, and project-04 and renumber.

---

### MISMATCH 3: Gallery contains home page portrait (project-04)

**Problem:** `public/gallery/project-04.jpg` is the founder portrait from the home page, not a client gallery photo.

| public/ file | Currently contains | Should be |
|---|---|---|
| `public/gallery/project-04.jpg` | asset-b7c42540480e (320x388, IMG_5650, founder portrait) | A client gallery image (or removed) |

**Impact:** The clients/projects pages show the founder's portrait as a "project photo." This image belongs on the home page and story page, not in the project gallery.

**Fix:** Remove `project-04.jpg` from the gallery. The same image is correctly used as `public/story/founder-portrait.jpg`.

---

### MISMATCH 4: Story page uses clients gallery images as "founder with dog" photos

**Problem:** The story page (`/story`) uses two images that are actually from the Our Clients gallery, not from the story page.

| public/ file | Currently contains | Actual origin | Used on story page? |
|---|---|---|---|
| `public/story/founder-with-dog.png` | asset-55e8628a7d09 (910x683) | Our Clients gallery #1 (man with yellow Labrador) | NO — this is a clients gallery image |
| `public/story/founder-with-white-dog.png` | asset-bd0ff1f1acfe (512x683) | Our Clients gallery #15 (person with small white dog) | NO — this is a clients gallery image |

**Impact:** The story page shows client project photos labeled as "founder with dog" images. These same images also appear in the project gallery (as project-05 and project-06), creating duplicates across pages.

**Note:** The original story page (`ec69494d9113d28d`) has only ONE content image: the founder portrait at 155x155. The rebuilt story page adds 3 extra images that don't exist on the original story page.

**Fix:** Either remove `founder-with-dog.png` and `founder-with-white-dog.png` from the story page, or replace them with actual story-appropriate images. The original story page only had the founder portrait.

---

### MISMATCH 5: Story page uses hero-2.png as a "deck showcase" image

**Problem:** The story page (`src/app/story/page.tsx` line 152) uses `/hero/hero-2.png` (TimberTech deck image) as a "deck showcase" image at the bottom of the story page. This image does not appear on the original story page.

**Fix:** Remove this image from the story page, or replace with an appropriate image. The original story page has no deck showcase image.

---

### MISMATCH 6: Missing image — second home page portrait (asset-f39375af1984)

**Problem:** The original home page (`cc4a84e52c0f0d87`) has TWO portrait photos below the hero (both 320x388):
1. asset-b7c42540480e (IMG_5650_edited_edited.jpg) — founder portrait
2. asset-f39375af1984 (6ECBFC47-E1A7-4AAA-A6E6-A4D6184D5839) — personal/lifestyle photo

The second portrait (asset-f39375af1984, 29,652 bytes) is completely missing from `public/`. It does not appear anywhere on the rebuilt site.

**Fix:** If the rebuilt home page should include this image, copy `start/assets/images/asset-f39375af1984.jpg` to an appropriate location in `public/`. Currently the rebuilt home page uses service images instead of these portraits, so this may be an intentional design change. However, the image is not available even if needed.

---

### MISMATCH 7: Missing image — story page founder portrait at original resolution (asset-6baad66cff25)

**Problem:** The original story page uses a 155x155 cropped version of the founder portrait (asset-6baad66cff25, 14,097 bytes). This exact file is not in `public/`. However, `public/story/founder-portrait.jpg` contains the same image at 320x388 (asset-b7c42540480e), which is a higher-resolution version of the same Wix media ID. This is **acceptable** — using a higher-res version is fine.

---

### MISMATCH 8: Duplicate images across pages

**Problem:** Two images appear on both the clients gallery page AND the story page:

| Image | Gallery file | Story file |
|---|---|---|
| Man with yellow Labrador (910x683) | `public/gallery/project-05.png` | `public/story/founder-with-dog.png` |
| Person with white dog (512x683) | `public/gallery/project-06.png` | `public/story/founder-with-white-dog.png` |

**Impact:** The same photo appears in two places on the site, which looks unintentional.

---

## Summary of Required Fixes

### High priority (wrong images displayed):

1. **Swap service images**: Copy `start/assets/images/asset-da1cc5aa8a95.jpg` → `public/services/construction-management.jpg` and `start/assets/images/asset-d9cd1e8194dc.jpg` → `public/services/construction-planning.jpg`

2. **Remove hero images from gallery**: Delete or replace `public/gallery/project-01.png` and `public/gallery/project-02.png` (they are duplicates of hero-1.png and hero-2.png)

3. **Remove home portrait from gallery**: Delete or replace `public/gallery/project-04.jpg` (it is the founder portrait from the home page, not a project photo)

4. **Fix story page images**: Remove or replace `public/story/founder-with-dog.png` and `public/story/founder-with-white-dog.png` (they are clients gallery images, not story page images). Also remove the `hero-2.png` usage on the story page.

### Medium priority (missing images):

5. **Add missing home page portrait**: Copy `start/assets/images/asset-f39375af1984.jpg` to `public/` if the home page should show both portrait photos as the original did

### Low priority (design decisions):

6. **Renumber gallery files**: After removing project-01, project-02, and project-04, renumber the remaining gallery files (project-03 through project-20) to project-01 through project-17, and update `src/lib/static-projects.ts` accordingly

7. **Update `src/lib/static-projects.ts`**: Remove the entries for project-01 (hero image), project-02 (hero image), and project-04 (home portrait), and renumber the remaining entries

---

## Correct Mapping for Each public/ File

### public/brand/ (correct — no changes needed)

| File | Should contain | Source asset |
|---|---|---|
| `logo.png` | Red's RRC logo (92x83) | asset-08f1ae6a37c3.png |
| `timbertech-platinum.png` | TimberTech PRO Platinum badge (235x215) | asset-bad93a88c178.jpg |

### public/hero/ (correct — no changes needed)

| File | Should contain | Source asset |
|---|---|---|
| `hero-1.png` | DSC05148-HDR deck/patio (1280x729) | asset-f5b8c0f44582.png |
| `hero-2.png` | TimberTech deck with glass railing (1280x729) | asset-564d9d24544c.png |

### public/services/ (ONE fix needed — swap two files)

| File | Should contain | Source asset | Current status |
|---|---|---|---|
| `building-maintenance.jpg` | Handyman image (426x514, alt="Handyman") | asset-341fe01ae24d.jpg | CORRECT |
| `construction-management.jpg` | Construction Management image (427x514, alt="Construction Management") | asset-da1cc5aa8a95.jpg | **WRONG — currently contains asset-d9cd1e8194dc** |
| `construction-planning.jpg` | Building Plans image (427x514, alt="Building Plans") | asset-d9cd1e8194dc.jpg | **WRONG — currently contains asset-da1cc5aa8a95** |

### public/gallery/ (THREE files need removal/replacement)

| File | Should contain | Source asset | Current status |
|---|---|---|---|
| `project-01.png` | Should NOT exist (hero image) | — | **WRONG — contains hero-1.png** |
| `project-02.png` | Should NOT exist (hero image) | — | **WRONG — contains hero-2.png** |
| `project-03.jpg` | Clients gallery #10 (512x683) | asset-2195b9ff40da.jpg | CORRECT |
| `project-04.jpg` | Should NOT exist (home portrait) | — | **WRONG — contains founder portrait** |
| `project-05.png` | Clients gallery #1 (910x683) | asset-55e8628a7d09.png | CORRECT |
| `project-06.png` | Clients gallery #15 (512x683) | asset-bd0ff1f1acfe.png | CORRECT |
| `project-07.png` | Clients gallery #13 (910x683) | asset-601b7744ce0d.png | CORRECT |
| `project-08.jpg` | Clients gallery #6 (910x683) | asset-97055b503e16.jpg | CORRECT |
| `project-09.jpg` | Clients gallery #7 (512x683) | asset-d74d9c72678c.jpg | CORRECT |
| `project-10.png` | Clients gallery #8 (512x683) | asset-e63738766da9.png | CORRECT |
| `project-11.jpg` | Clients gallery #2 (512x683) | asset-9c44b3a4ddd9.jpg | CORRECT |
| `project-12.jpg` | Clients gallery #3 (910x683) | asset-e359098ef4a4.jpg | CORRECT |
| `project-13.jpg` | Clients gallery #4 (512x683) | asset-f711ccbfb1d1.jpg | CORRECT |
| `project-14.jpg` | Clients gallery #5 (910x683) | asset-195dad802798.jpg | CORRECT |
| `project-15.jpg` | Clients gallery #11 (512x683) | asset-bf897de5a38b.jpg | CORRECT |
| `project-16.jpg` | Clients gallery #12 (910x683) | asset-e35c86d48dd2.jpg | CORRECT |
| `project-17.jpg` | Clients gallery #14 (512x683) | asset-2029a74ea09b.jpg | CORRECT |
| `project-18.jpg` | Clients gallery #9 (512x683) | asset-c0a6b8d80d12.jpg | CORRECT |
| `project-19.jpg` | Clients gallery #16 (910x683) | asset-7e856e538174.jpg | CORRECT |
| `project-20.jpg` | Clients gallery #17 (512x683) | asset-3639c8cb0b23.jpg | CORRECT |

### public/story/ (TWO files need removal/replacement)

| File | Should contain | Source asset | Current status |
|---|---|---|---|
| `founder-portrait.jpg` | Founder portrait (320x388 or 155x155) | asset-b7c42540480e.jpg or asset-6baad66cff25.jpg | Acceptable (higher-res version) |
| `founder-with-dog.png` | Should NOT exist (clients gallery image) | — | **WRONG — contains clients gallery image** |
| `founder-with-white-dog.png` | Should NOT exist (clients gallery image) | — | **WRONG — contains clients gallery image** |

### Missing from public/ (not yet copied)

| Asset | Dimensions | Original page | Description |
|---|---|---|---|
| asset-f39375af1984.jpg | 320x388 | Home (cc4a84) | Second home page portrait (6ECBFC47) |
| asset-6baad66cff25.jpg | 155x155 | Our Story | Story page founder portrait (lower-res version of existing founder-portrait.jpg) |
| asset-33c1436f8c40.ico | 16x16 | Home (3d4bed) | Favicon (already exists as `public/favicon.ico`) |
| asset-413ceef82355.png | 1970x1970 | Home (3d4bed) | Wix UI frame overlay (decorative, not needed) |

---

## Screenshots

Screenshots were taken using Playwright and saved to `scripts/screenshots/`:

- `slurped-home2.png` — original home page (from slurped capture)
- `slurped-services.png` — original services page (from slurped capture)
- `slurped-clients.png` — original clients page (from slurped capture)
- `slurped-story.png` — original story page (from slurped capture)
- `original-home.png` — original home page (live site)
- `original-services.png` — original services page (live site)
- `rebuilt-home.png` — rebuilt home page
- `rebuilt-services.png` — rebuilt services page
- `rebuilt-clients.png` — rebuilt clients page
- `rebuilt-story.png` — rebuilt story page

---

## Key Source Code References

- **Service images**: `src/app/services/page.tsx` line 68 — `src={`/services/${service.slug}.jpg`}`
- **Service slugs**: `src/lib/site-config.ts` lines 51-73 — defines `construction-planning`, `construction-management`, `building-maintenance`
- **Home page services summary**: `src/components/marketing/services-summary.tsx` line 29 — uses same service images
- **Hero image**: `src/components/marketing/hero.tsx` line 14 — `src="/hero/hero-1.png"`
- **Story page images**: `src/app/story/page.tsx` lines 50, 92, 105, 152 — founder-portrait, founder-with-dog, founder-with-white-dog, hero-2
- **Gallery images**: `src/lib/static-projects.ts` lines 31-259 — project-01 through project-20
- **Logo**: `src/components/brand/logo.tsx` line 13 — `src="/brand/logo.png"`
