# Boarding Pass Creator

Browser-based generator of **IATA BCBP-style test payloads** and PDF417 / QR barcode previews.

## Website

Once GitHub Pages is enabled, visit: <https://casopstech.github.io/boarding-pass-creator/>.

## User guide


For phone users, read the [Mobile User Guide](MOBILE_USER_GUIDE.md) for Quick Mode, each field, generating barcodes, More options, Full Editor, and troubleshooting.

Read the full [step-by-step user guide and field legend](USER_GUIDE.md), including examples, raw mode, multi-leg generation, output controls, and troubleshooting.

## Mobile quick mode

The site automatically uses a simplified interface on viewports **767 px wide or narrower** (phones). Desktop and wider windows retain the complete editor.

On a phone:
1. Enter a **test passenger name**, **departure airport**, **destination airport**, **airline code**, **flight number**, and **departure date**.
2. Tap **Generate test barcode** to view a PDF417 preview.
3. Expand **More options** to change the cabin class, seat, PNR, or barcode type (PDF417/QR).
4. Tap **Full editor** for raw BCBP mode, multi-leg itineraries, advanced conditional fields, or other testing parameters.
5. Under the result, tap **Show technical details** for raw payload, metadata, copy/download buttons, and field breakdown.

Quick mode is designed for a **single flight**; multi-leg settings can be edited only in Full editor and are never silently discarded when switching back. Both modes use the same payload-generation and validation functions.

## Hosting

This is a static single-page website: no server, packages, or build process are needed.

To enable GitHub Pages: open **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, set branch **main**, folder **/(root)**, then save.

## Local use

Open `index.html` in your browser, or serve the directory with:

```sh
python3 -m http.server 8000
```

## Testing and data notice

For **developer/scanner testing only**. Do not enter real passenger data. Barcode previews are requested from the external OrcaScan barcode image service using the generated payload encoded as a URL parameter; therefore, generated payload data is disclosed to that service.

## Source attribution and rights

Published from the user-supplied project archive. Its original README referenced <https://xiaaohau.github.io/boarding-pass-creator/>. Verify you have permission to redistribute third-party code; no additional license rights are granted by this repository.
