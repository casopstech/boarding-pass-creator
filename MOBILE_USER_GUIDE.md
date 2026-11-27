# Boarding Pass Creator — Mobile User Guide

**Application:** IATA BCBP Test Boarding Pass Generator  
**Website:** https://casopstech.github.io/boarding-pass-creator/  
**Applies to:** Mobile Quick Mode and Full Editor on narrow screens (up to **767 px** browser viewport width)  
**Guide date:** 27 November 2026  
**Purpose:** Create synthetic, single-flight BCBP-style test payloads and display their PDF417 or QR barcode previews.

> **Use for development and scanner validation only.** This is a **barcode generator**, not a phone-camera boarding-pass scanner or a live check-in system. A displayed barcode is not proof that a payload meets IATA or airline-specific requirements. The barcode preview is generated on-device by bundled JavaScript, including when installed offline. Use **test data only**. Do not enter genuine passenger or booking information without an approved testing procedure.

## 1. Quick start — generate a single-flight test barcode

1. **Open the website** in a mobile browser. On viewports **767 px wide or narrower**, the page automatically shows **Quick boarding pass**. It initially contains example test values; replace those with values for your test case.
2. Enter **Passenger name** (for example, `TEST/USER`), **Departure airport** (`SIN`), **Destination airport** (`HKG`), **Airline code** (`SQ`), **Flight number** (`123`), and **Departure date** using the date picker.
3. Optionally tap **More options · Seat, PNR, barcode type**. You can change **Cabin class**, **Seat**, **PNR / booking reference**, and **Barcode type**. The default barcode type is **PDF417**.
4. Tap **Generate test barcode**. If the input is incomplete, an error message appears above the button. Correct the affected fields and tap Generate again.
5. The page scrolls to **Output**, where it shows a validation message and attempts to display the barcode preview. Use **Refresh**, **Zoom**, or **Save image** as needed.
6. To inspect the generated BCBP string, tap **Show technical details (payload and fields)**. You can then see the payload, length, format, symbology and payload breakdown.

**Worked test example** (replace with your own synthetic test values):

| Field | Example input |
|---|---|
| Passenger name | `TEST/USER` |
| Departure airport | `SIN` |
| Destination airport | `HKG` |
| Airline code | `SQ` |
| Flight number | `123` |
| Departure date | `2026-11-28` (select from calendar) |
| Cabin class | `Y` |
| Seat | `21A` |
| PNR / booking reference | `ABC123` |
| Barcode type | `PDF417` |

**Expected header:** `M1` indicates one flight leg. The interface converts the entered date to the BCBP-style day-of-year value in the generated payload.

## 2. Quick Mode — essential field legend

| Field | What it represents | Entry requirement | Example |
|---|---|---|---|
| **Passenger name** | Name stored in the boarding-pass test payload. | Required; up to **20 characters** in Quick Mode. Use a synthetic `SURNAME/FIRSTNAME` name. | `TEST/USER` |
| **Departure airport** | Origin airport for the flight leg. | Required; exactly **3 letters**. The UI uppercases letters and strips nonletters. This is a format check, not a lookup of real airport codes. | `SIN` |
| **Destination airport** | Arrival airport for the flight leg. | Required; exactly **3 letters**; same formatting behaviour as departure airport. | `HKG` |
| **Airline code** | Airline/operator code in the payload. | Required; **2 or 3 letters** in Quick Mode. The tool does not verify that a real airline uses the code. | `SQ` |
| **Flight number** | Numeric flight identifier; do **not** repeat the airline prefix here. | Required; **1–5 digits**. Non-digit characters are removed. Leading zeros are permitted. | `123`, `0132` |
| **Departure date** | Travel date for this flight leg. | Required; select a calendar date. The display format may vary by browser/phone locale. | `2026-11-28` |

**Tip:** `SQ123` should be entered as **Airline code** `SQ` plus **Flight number** `123`, not `SQ123` in the flight-number box.

## 3. More options — optional field legend

Tap **More options · Seat, PNR, barcode type** to expand the section. It is optional for a standard Quick Mode test; fields may already contain example defaults.

| Field | Meaning | Limit / options | Example |
|---|---|---|---|
| **Cabin class (1 char)** | One-character class/cabin designator stored in the payload. | **1 character**. The underlying full form requires a nonblank class. This tool does not verify airline-specific class codes. | `Y` |
| **Seat (up to 4 chars)** | Seat identifier for the leg. | Up to **4 characters**; exact accepted seat conventions depend on the test case. | `21A` |
| **PNR / booking reference** | Test booking reference for the leg. | Up to **7 characters**. Use synthetic characters only. | `ABC123` |
| **Barcode type** | How the generated payload is shown as an image. | **PDF417 (default)** or **QR code**. Changing this does not change the form's underlying field structure. | `PDF417` |

### What Quick Mode does *not* expose

Quick Mode is intentionally limited to **one flight leg (M1)**. The **Full editor** is required to change the electronic-ticket indicator, check-in status, sequence number, advanced conditional data, raw payload, or transit/multi-leg settings. **Some advanced fields already contain sample data** when the app loads; Quick Mode does not automatically clear or reset them. If your test requires a minimal payload without optional conditional data, review and clear those fields in the Full Editor first.

## 4. Generate and use the result — button legend

| Control / panel | What it does | When to use it |
|---|---|---|
| **Generate test barcode** | Validates Quick Mode essentials and regenerates the test payload and barcode request. | After entering or changing test flight data. |
| **Output** | Displays generation/validation status and barcode preview. | Confirm whether a payload was generated, then test it on your target scanner. |
| **PDF417 Barcode Preview / QR Barcode Preview** | Displays the selected barcode image generated locally. | Use for scanner testing; after offline installation, network access is not required for image generation. |
| **Refresh** | Requests the current barcode image again. | Try if image loading is stalled or failed. |
| **Zoom** | Opens the barcode image in a separate browser tab/window. | For larger display or scanner alignment; browser pop-up behaviour varies. |
| **Save image** | Attempts to save/download the barcode image. | For test evidence; mobile browsers may instead open the image, requiring the browser's Save Image option. |
| **Show technical details (payload and fields)** | Expands the payload text, format/length/symbology metrics, and field breakdown. | For technical validation or issue investigation. |
| **Hide technical details** | Collapses the technical data to focus on the barcode. | For regular mobile use. |
| **Copy Payload** | Copies the exact generated text to the clipboard (within technical details). | For comparison with scanner data or test logs; requires clipboard permission. |
| **Download Barcode** | Attempts to download the barcode from the technical panel. | Alternative to Save image. |
| **Download .txt** | Downloads generated payload text in a `.txt` file. | For retaining exact character spacing or attaching to a bug report. |

**Key distinction:** The message **“Payload generated successfully”** confirms local payload creation, **not** successful retrieval of the barcode image and **not** successful scanning/airline validation.

## 5. Full Editor — edit more boarding-pass details

1. Under the Quick Mode Generate button, tap **Full editor · All boarding pass fields**.
2. Use **Format & Options** to select symbology, the **Electronic Ticket Indicator**, or **Use raw payload**.
3. Use **Passenger Details** to modify the passenger name and default PNR.
4. In **Flight Legs**, edit **PNR**, **From**, **To**, **Airline**, **Flight No.**, **Travel Date**, **Class**, **Seat**, **Sequence**, and **Status**.
5. In **Advanced / Optional Fields**, use **Editing** to choose the leg and configure **Beg of Version No**, **Version No**, **Structured Msg Size**, **Passenger Description**, **Source of Check-In**, and **Source of BP Issuance**. In **Remaining Variable Data**, edit the optional text for that leg. These are technical fields; do not guess codes if your test case does not define them.
6. Tap **Generate Barcode / QR**, then review Output. On mobile, technical data may still be collapsed until you tap **Show technical details**.
7. Tap **← Quick mode** to return to the simplified form. Values are synchronised where possible; they are not automatically reset.

**Multi-leg restriction:** The Full Editor can enable **Transit / multi-leg mode** and add flight legs (M2, M3, ... up to M9). **Quick Mode supports only M1.** If multiple legs remain, the page will prevent returning to Quick Mode until you remove the extra legs or disable transit mode in the Full Editor. Switching back to Quick Mode also turns off raw-payload mode.

## 6. Troubleshooting

| Problem | Likely explanation | What to do |
|---|---|---|
| **Generate button shows an error** | Required Quick Mode field is blank or malformed. | Check name, exactly 3-letter airport codes, 2–3-letter airline code, 1–5-digit flight number and travel date. |
| **Flight number loses the airline letters** | The field accepts digits only. | Put `SQ` in Airline code and `123` in Flight number. |
| **No barcode image appears, but generation is successful** | The local barcode encoder may have failed to load or the payload may be unsupported. | Open the app online once to complete caching, then try Refresh and inspect the displayed error. |
| **Save image opens a tab instead of downloading** | Mobile browsers can handle cross-origin image downloads differently. | Open the image using Zoom and use the browser's Save Image / download action. |
| **Cannot switch back from Full Editor** | More than one flight leg remains. | Remove additional legs or disable Transit / multi-leg mode to return to M1. |
| **Unexpected optional data is present** | The default first leg contains example advanced/variable data. | Open Full Editor and clear all six advanced structured fields **and** Remaining Variable Data for a zero-length optional area. |
| **Layout looks like the desktop form** | The responsive switch is based on browser viewport width, not a phone identity check. | View in portrait or use a browser window narrower than 768 px. |
| **Barcode displays but scanner rejects it** | Display of a barcode does not establish BCBP or airline-specific validity, or the scanner may require a different image/format. | Compare exact payload text and target application requirements; select the required symbology. |

## 7. Safe testing checklist

- [ ] Use fictional passenger names, PNRs and flight details.
- [ ] Verify **one flight leg (M1)** in Quick Mode.
- [ ] Confirm origin/destination, airline, flight number and date.
- [ ] Check optional fields and preloaded advanced data if the test case requires a particular payload structure.
- [ ] Confirm the barcode preview loads; if not, inspect technical details and external network access.
- [ ] Test scanning on the **actual target scanner/app**; do not treat generation as compliance certification.
- [ ] Save the `.txt` payload and test evidence if needed, avoiding real passenger data.

**Privacy:** Barcode generation runs locally with bundled JavaScript and does not call a remote barcode-rendering service. Use only synthetic test data; this is not a live boarding pass system.