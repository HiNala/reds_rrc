# Smart Site QA Checklist

## Per-Page Verification

### https://www.redsrrc.com/home-1

- [ ] Page renders correctly
- [ ] All images load
- [ ] CTAs functional
- [ ] Metadata matches `rebuild/06-metadata-map.json`
- [ ] Copy matches `rebuild/03-page-copy-plan.json`
- [ ] Components match `pages/{page_id}/analysis/components.json`

### https://www.redsrrc.com/services

- [ ] Page renders correctly
- [ ] All images load
- [ ] CTAs functional
- [ ] Metadata matches `rebuild/06-metadata-map.json`
- [ ] Copy matches `rebuild/03-page-copy-plan.json`
- [ ] Components match `pages/{page_id}/analysis/components.json`

### https://www.redsrrc.com/clients

- [ ] Page renders correctly
- [ ] All images load
- [ ] CTAs functional
- [ ] Metadata matches `rebuild/06-metadata-map.json`
- [ ] Copy matches `rebuild/03-page-copy-plan.json`
- [ ] Components match `pages/{page_id}/analysis/components.json`

### https://www.redsrrc.com/service-page/client-callback

- [ ] Page renders correctly
- [ ] All images load
- [ ] CTAs functional
- [ ] Metadata matches `rebuild/06-metadata-map.json`
- [ ] Copy matches `rebuild/03-page-copy-plan.json`
- [ ] Components match `pages/{page_id}/analysis/components.json`

### https://www.redsrrc.com/services-5

- [ ] Page renders correctly
- [ ] All images load
- [ ] CTAs functional
- [ ] Metadata matches `rebuild/06-metadata-map.json`
- [ ] Copy matches `rebuild/03-page-copy-plan.json`
- [ ] Components match `pages/{page_id}/analysis/components.json`

### https://www.redsrrc.com/

- [ ] Page renders correctly
- [ ] All images load
- [ ] CTAs functional
- [ ] Metadata matches `rebuild/06-metadata-map.json`
- [ ] Copy matches `rebuild/03-page-copy-plan.json`
- [ ] Components match `pages/{page_id}/analysis/components.json`

### https://redsrrc.com/book-online

- [ ] Page renders correctly
- [ ] All images load
- [ ] CTAs functional
- [ ] Metadata matches `rebuild/06-metadata-map.json`
- [ ] Copy matches `rebuild/03-page-copy-plan.json`
- [ ] Components match `pages/{page_id}/analysis/components.json`

### https://www.redsrrc.com/story

- [ ] Page renders correctly
- [ ] All images load
- [ ] CTAs functional
- [ ] Metadata matches `rebuild/06-metadata-map.json`
- [ ] Copy matches `rebuild/03-page-copy-plan.json`
- [ ] Components match `pages/{page_id}/analysis/components.json`

## Site-Wide Checks

- [ ] Navigation matches `global/navigation.json`
- [ ] Footer matches `global/footer.json`
- [ ] Resolve 25 SEO warnings from `global/seo-audit.json`
- [ ] All assets from `assets/asset-manifest.json` are deployed
- [ ] Design tokens match `rebuild/design-token-plan.md`
- [ ] Forms submit correctly
- [ ] Analytics events fire on CTA clicks
- [ ] Lighthouse score > 90
- [ ] WCAG 2.1 AA compliance
