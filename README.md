# باقة الحب — Pack Amour LP

Landing page Next.js mono-produit pour le Pack Amour (bijoux COD Maroc).

## Commande dev

```bash
npm run dev
# → http://localhost:3002
```

## Structure dossiers

```
/app              → pages & layout RTL
/components
  /sections       → sections LP (CP2+)
  /ui             → StickyCTA, WhatsAppFloat
  /shared         → Footer, SmoothScrollProvider
/lib
  /data           → product.ts, content.ts, testimonials.ts (source of truth)
  /schemas        → validation Zod (CP final)
/public
  /images/pack-amour    → 7 photos produit (01-hero.webp → 07.webp)
  /testimonials         → 3 captures WhatsApp réelles (01.jpg → 03.jpg)
```

## État

| CP | Statut | Contenu |
|----|--------|---------|
| CP1 | ✅ Done | Setup, foundation, layout RTL, composants de base |
| CP2 | ⏳ Next | Section Hero |
| CP3–7 | 🔜 | Sections LP (Contents, Galerie, WhyUs, Témoignages, FAQ) |
| CP8 | 🔜 | Formulaire commande + API |

## Notes

- Numéro WhatsApp `+212600000000` = **placeholder** — remplacer avant launch
- Photos produit à placer dans `/public/images/pack-amour/` (01-hero.webp → 07.webp)
- Témoignages WhatsApp à placer dans `/public/testimonials/` (01.jpg → 03.jpg)
- Zéro photo de personnes sur la LP — règle stricte
