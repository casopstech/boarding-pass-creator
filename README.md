# Boarding Pass Creator

Browser-based generator of **IATA BCBP-style test payloads** and PDF417 / QR barcode previews.

## Website

Once GitHub Pages is enabled, visit: <https://casopstech.github.io/boarding-pass-creator/>.

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
