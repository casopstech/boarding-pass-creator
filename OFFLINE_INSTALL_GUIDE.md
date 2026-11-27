# Install BCBP Test to your phone Home Screen — Offline Guide

Website: <https://casopstech.github.io/boarding-pass-creator/>

**This app generates synthetic/test IATA BCBP payloads and PDF417/QR barcode images. It does not scan barcodes with the camera.**

## Before installation

Connect to Wi-Fi or mobile data for the initial installation. The app needs to download and cache HTML, CSS, JavaScript barcode encoders and icons. **After installing, open the Home Screen app at least once while still online**, especially on iPhone, so its own app context can finish caching. Wait for the **Offline ready** indicator.

No sign-in or GitHub account is needed to use the published app. GitHub Pages must be enabled for this repository.

## iPhone / iPad (Safari)

1. Open **Safari** and go to: https://casopstech.github.io/boarding-pass-creator/
2. Wait for **Offline ready** at the top of the page.
3. Tap the **Share** icon (square with upward arrow).
4. Choose **Add to Home Screen**. Tap **Add**. Depending on your iOS version, enable **Open as Web App** if available.
5. Return to the Home Screen and tap **BCBP Test**.
6. Keep the phone online until you see **Offline ready** **inside the installed app**.
7. Turn on **Airplane Mode**, fully close the app, and launch it again from the Home Screen.
8. Enter a synthetic passenger name, origin, destination, airline code, flight number and departure date. Tap **Generate test barcode**.
9. Confirm a **PDF417 barcode appears while offline**. Test optional QR mode under **More options** as needed.

## Android (Chrome)

1. Open **Chrome** and go to: https://casopstech.github.io/boarding-pass-creator/
2. Wait for **Offline ready**.
3. Tap Chrome's three-dot **⋮** menu, then **Install app** or **Add to Home screen** (wording varies).
4. Confirm **Install** or **Add**.
5. Launch **BCBP Test** from your Home Screen.
6. Keep the phone online until **Offline ready** appears inside the installed app.
7. Turn on **Airplane Mode**, close the app, reopen it, and generate a PDF417 test barcode.

## Mobile fields

| Field | Description | Example |
| --- | --- | --- |
| Passenger name | Synthetic name, surname/first name; 20-character field | TEST/USER |
| Departure airport | IATA three-letter airport code | SIN |
| Destination airport | IATA three-letter airport code | HKG |
| Airline code | Two or three-letter code used by your test format | SQ |
| Flight number | Flight number digits; up to five characters | 123 |
| Departure date | Local flight departure date; UI encodes day-of-year | 2026-11-27 |

Choose **More options** for cabin class, seat, PNR and PDF417/QR format. Choose **Full editor** for additional legs and technical fields.

## Troubleshooting

- **Website unreachable:** First verify GitHub Pages is published at the configured branch: Settings → Pages → main → /(root).
- **Shows 'Preparing offline app…' for too long:** Check internet access, then reload the page and keep it open. The service worker cannot finish caching while required files are unavailable.
- **Home Screen app fails in Airplane Mode:** Open the installed app once online, wait until Offline ready, then test again; if needed remove the Home Screen icon and reinstall it.
- **Barcode generation error:** Reopen online, wait for Offline ready, and try again. Long raw payloads may exceed QR capacity; PDF417 has different capacity and layout.
- **After updates:** With internet restored, reopen the app so updated cached files can install. Clearing website data or uninstalling the app can remove the cache and require reinstallation.

## Privacy and limitations

Barcode generation uses only scripts bundled with the site; it does **not** call the OrcaScan remote image endpoint. User-entered boarding pass data is not synced, and will be lost on refresh. Do not enter genuine passenger data. This app does **not** issue valid boarding passes, confirm a flight, or guarantee scanner acceptance. Device storage cleanup, user actions, and browser policies can evict cached files, so test airplane mode before operational use.
