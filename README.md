# Boarding Pass Creator (BCBP Test)

A browser-based IATA BCBP-style **test payload and barcode generator** for PDF417 and QR scanner/application UAT. This is not a camera scanner or a system that issues real airline boarding passes.

## Open the app

**Website:** https://casopstech.github.io/boarding-pass-creator/

The website uses a simplified Quick Mode on phone-sized screens (767 px wide or narrower), and the Full Editor on desktop. On mobile, tap **Full editor** for advanced fields and multi-leg test payloads.

The synthetic default passenger name is **`TAN/WEIMING`**.

## User guides

- **[Mobile Quick Start - green and red validation screens](MOBILE_QUICK_START.md)** (simple instructions, with screenshot PDF supplied separately)
- [Detailed Mobile User Guide](MOBILE_USER_GUIDE.md) - every Quick Mode field and output control
- [Full User Guide and Field Legend](USER_GUIDE.md) - advanced fields, raw payloads and multi-leg testing
- [Home Screen Installation / Offline Guide](OFFLINE_INSTALL_GUIDE.md) - iPhone Safari and Android Chrome

## Green versus red validation

- **Green - Payload generated successfully:** valid generator input and a generated test payload.
- **Red - Fix required / form error:** missing or invalid data, or a barcode-generation failure.

Neither colour tells you whether an airport scanner or airline system accepted the boarding pass. Use a separate scanner/UAT validation process for that.

## Offline support

The site is an installable Progressive Web App (PWA). It generates PDF417 and QR barcodes **locally** with bundled JavaScript. It does **not** send the generated barcode payload to OrcaScan or another barcode-rendering service.

1. Open the website online and wait for **Offline ready**.
2. On iPhone Safari, tap Share > Add to Home Screen; on Android Chrome, use Install app / Add to Home screen.
3. Open the installed icon while online and confirm Offline ready.
4. Test in Airplane Mode.

Cached content can be evicted or refreshed by the browser. After updates, open the app online so the new cache version can install.

For a separate, self-contained backup file, see [offline-standalone.html](offline-standalone.html). A downloaded HTML file is not a substitute for the installed PWA on all phones.

## Hosting

This repository uses **GitHub Pages**, deployed from **`main`** at **`/(root)`**. The app is plain HTML/CSS/JavaScript and needs no build process or backend.

## Safety, privacy, and attribution

Use **synthetic test data only**. Barcode generation does not verify flights, check-in, airline authorizations, IATA compliance, or real-world boarding eligibility.

Third-party local encoder libraries and their license notices are in [vendor/THIRD_PARTY_NOTICES.md](vendor/THIRD_PARTY_NOTICES.md).

Published from the supplied project archive. Verify authorization to redistribute all parts of the original code; publishing does not confer new intellectual property rights.
