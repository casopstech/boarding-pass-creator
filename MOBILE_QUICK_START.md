# BCBP Test — Simplified Mobile User Guide

**Website:** https://casopstech.github.io/boarding-pass-creator/  
**Updated:** 27 November 2026  
**Purpose:** Generate synthetic single-flight PDF417 / QR boarding-pass test barcodes on your phone. This is a **generator**, not a camera scanner.

## 1. Open Quick Mode

Open the website on your phone, or tap your installed **BCBP Test** Home Screen app. On screens narrower than 768 pixels, the **Quick boarding pass** form appears automatically.

## 2. Enter example test values

| Field | Example | Requirement |
| --- | --- | --- |
| Passenger name | `TAN/WEIMING` | Synthetic surname/first name, up to 20 characters |
| Departure airport | `SIN` | Exactly 3 letters |
| Destination airport | `HKG` | Exactly 3 letters |
| Airline code | `SQ` | 2 or 3 letters |
| Flight number | `123` | 1–5 digits |
| Departure date | `2026-11-27` | Choose a date |

These are **test data**, not an actual booking.

## 3. How to get the GREEN screen

1. Make sure all six required fields have valid values, such as those above.
2. Tap the blue **Generate test barcode** button.
3. Scroll (automatically) to **Output**.
4. A pale-green **Payload generated successfully** message appears above the barcode. The PDF417 (or selected QR) image is displayed.
5. Use **Save image**, **Zoom**, or **Refresh** as needed.

**GREEN means the generator constructed a payload without reporting validation errors. It does not mean an airport scanner has accepted the boarding pass.**

## 4. How to get the RED screen

### Quick Mode: the easiest way

1. Return to **Quick boarding pass**.
2. Delete the **Passenger name** so it is blank.
3. Tap **Generate test barcode**.
4. A pale-red message appears **above the Generate button**, asking you to complete the required fields.
5. Enter `TAN/WEIMING` again and tap Generate to obtain the green result.

### Full Editor: red output status

1. Tap **Full editor · All boarding pass fields**.
2. Under **Passenger Details**, clear **Passenger Name**.
3. Tap **Generate Barcode**.
4. At **Output**, a red **Fix required: Passenger name is required.** box appears. No new barcode is generated.
5. Restore the name and tap Generate to resolve the error.

**RED means an input/validation or barcode-generation problem inside this tool—not a live airport scanner rejection.** The green circular icon beside the Output heading is decorative; read the status message itself.

## 5. More options

Expand **More options · Seat, PNR, barcode type** to change cabin class, seat, PNR, and PDF417/QR format. For further fields, raw payload mode or multi-leg cases, select **Full editor**.

## 6. Use it without internet

1. Visit the site while online.
2. **iPhone Safari:** Share → Add to Home Screen. **Android Chrome:** Menu → Install app / Add to Home screen.
3. Open **BCBP Test** from the Home Screen while online. Wait for **Offline ready**.
4. Turn on Airplane Mode, close and reopen the app, and try generating a test barcode.
5. If it fails, reconnect, reopen the installed app, and wait for **Offline ready** before repeating the test. Updates and browser cache eviction can require an online refresh.

## Screenshot guide

The accompanying **4-page PDF guide** contains five captures of the mobile interface:
1. Quick Mode and example fields.
2. Green successful-generation message and PDF417 preview.
3. Red Quick Mode input error.
4. Red Full Editor `Fix required` output.
5. Expanded More Options.

The PDF and screenshots are supplied alongside this GitHub guide.

## Safety and privacy

Only use synthetic test information. The site generates barcode images locally using bundled JavaScript, without contacting an external barcode-rendering API. A generated image is **not** proof of IATA/airline compliance or boarding authorization.
