# Boarding Pass Creator - Step-by-Step User Guide

**Application:** IATA BCBP Test Boarding Pass Generator  
**Website:** https://casopstech.github.io/boarding-pass-creator/  
**Guide revision:** 26 November 2026  
**Purpose:** Generate synthetic BCBP-style boarding-pass payloads and PDF417 or QR barcode images for scanner and application testing.

> **Testing and privacy notice:** This application is a developer-testing tool, not an airline check-in or boarding-pass issuance system. Do not enter real passenger details unless an authorised testing procedure permits it. To generate barcode images, the website sends the full payload to the third-party OrcaScan barcode endpoint as part of an image URL. A successfully generated barcode does **not** establish that its payload is valid under every IATA or airline-specific rule.

## 1. Quick start: Generate a one-flight (M1) test barcode

1. Open the website. The application initially displays a **single flight leg (M1)** with illustrative sample data.
2. Under **1 - Format & Options**, select **PDF417 - Standard Boarding Pass** or **QR Code - Mobile / alternate scanner**. Leave **Use raw payload** turned **off** for normal form entry. Choose **E - Electronic ticket** or **Blank / not supplied** as required by the test case.
3. Under **2 - Passenger Details**, replace the sample passenger name with a *synthetic* name such as `TEST/PASSENGER`. Enter a test **Default PNR**, such as `ABC123`.
4. Under **3 - Flight Legs**, complete the route, carrier, flight number, travel date, class, seat, sequence and check-in status. Replace the sample values rather than assuming they describe a real flight. Confirm the **PNR** displayed inside Leg 1.
5. Under **4 - Advanced / Optional Fields** and **5 - Remaining Variable Data**, keep only the conditional data required by your test specification. **Important:** Leg 1 is initially populated with sample advanced values and variable data. Clear **all seven advanced/variable fields** for a zero-length conditional-data section.
6. Click **Generate Barcode / QR**. Review any **Fix required** errors or **Generated with warnings** messages.
7. Verify the **Generated Payload**, **Format**, **Length**, **Symbology**, **Barcode Preview** and **Payload Breakdown**. Test the output against the intended scanner or application.
8. Use **Copy Payload**, **Download .txt**, **Zoom**, or **Download Barcode** according to the test case.

**Example (illustrative only):** Passenger `TEST/PASSENGER`; PNR `ABC123`; From `SIN`; To `HEL`; Airline `AY`; Flight No. `132`; Class `Y`; Seat `21A`; Sequence `25`; Status `1`. Choose an appropriate synthetic date using the calendar. The application will apply field padding and convert the date to a three-digit day-of-year value.

## 2. Input field legend - every form field

### Section 1 - Format & Options

| Field / control | What it means | Values / action | Practical guidance |
|---|---|---|---|
| **Barcode Symbology** | Barcode image format used to represent the generated payload. | `PDF417` or `QR Code`. | PDF417 is the default boarding-pass format in this UI. Selecting QR changes the image symbology, **not** the underlying generated text. |
| **Electronic Ticket Indicator** | One-character electronic-ticket flag in the BCBP-style header. | `E` or a single blank space. | `E` is the default. Use the value specified by your test case. |
| **Use raw payload** | Switch between form-building and exact payload-rendering modes. | **Off:** form mode. **On:** raw mode. | When enabled, the passenger/leg/advanced form is hidden. |
| **Raw BCBP payload** | A complete pre-existing BCBP string to render. | Paste text such as an `M1`, `M2`, or `M3` payload. | Visible only in raw mode. The application strips line breaks, but otherwise does not rebuild the text. Preserve spaces. |
| **Load sample M2** | Loads the supplied two-leg sample string. | Button in raw mode. | It also immediately generates the preview. Use synthetic samples for learning. |
| **Load sample M3** | Loads the supplied three-leg sample string. | Button in raw mode. | It also immediately generates the preview. |
| **Clear raw** | Empties the raw-input text area. | Button in raw mode. | It does not itself regenerate an empty output; click **Generate** to refresh validation. |

### Section 2 - Passenger Details

| Field | What it means | Encoded size / example | Rules and cautions |
|---|---|---|---|
| **Passenger Name** | Name in surname/first-name form. | **20 characters**; `TEST/PASSENGER`. | Required. Use `/` between surname and given name. The input box accepts up to 40 characters, but **only the first 20** survive in the generated payload. Longer entries produce a warning. Characters outside letters, digits, spaces and `/` are removed. |
| **Default PNR** | Default passenger name record / booking reference used to populate flight-leg PNRs. | **7-character payload field**; `ABC123`. | The input accepts up to 12 characters, but leg PNR output is truncated to 7 and right-padded with spaces. Editing this field also updates **Leg 1's PNR**; it does not automatically synchronise every existing leg. |

### Section 3 - Flight Legs

A **leg** is one flight segment (for example, `SIN` to `HEL`). Each leg has its own values. The app supports **one to nine** legs in form mode.

| Field / control | Meaning | Encoded size / examples | Validation or behaviour |
|---|---|---|---|
| **Transit / multi-leg mode** | Turns on an itinerary with two or more legs. | Off = M1; On = M2 or more. | Switching on while only one leg exists adds a second sample leg. Switching off keeps only the first leg and discards other legs from the current form. |
| **+ Add leg** | Appends another flight segment. | Up to nine total. | New legs contain illustrative placeholder routes. Edit every new leg as necessary; the app does not automatically enforce onward route continuity. |
| **Remove** | Deletes the selected leg. | Button on each leg card. | Disabled when only one leg remains. |
| **PNR** | Booking reference for this specific leg. | **7 characters**; `ABC123`. | The input can accept 12 characters, but output truncates to 7, with a warning when over 7. Different legs may have different PNRs. |
| **From** | Origin airport code. | **3 characters**; `SIN`. | Required: exactly 3 characters after sanitisation. The app checks length, **not** whether the code is assigned to an airport. |
| **To** | Destination airport code. | **3 characters**; `HEL`. | Required: exactly 3 characters after sanitisation. The app does not verify route feasibility. |
| **Airline** | Airline/operator code as represented in this tool. | **3-character field**; `AY`. | Short values are space-padded; use the carrier identifier prescribed by your test specification. This field is not independently validated against an airline registry. |
| **Flight No.** | Flight number portion without the airline prefix. | **5-character field**; `132`. | Required. Short values are **left-padded with zeros**. Values over 5 characters are truncated with a warning. |
| **Travel Date** | Date of travel for that flight leg. | Calendar date; e.g. `2026-11-26`. | Required. The app converts it into a **3-digit day of year** in the payload; the year is not separately placed in this mandatory field. Check year-sensitive test cases carefully. |
| **Class** | One-character cabin / booking-class code. | **1 character**; `Y`. | Required. Use the code from your test requirements; for example, `Y` may be used for an economy test case. |
| **Seat** | Seat identifier. | **4-character field**; `21A`. | Short values are **left-padded with zeros**, e.g. `21A` becomes `021A`. Values over 4 characters are truncated with a warning. |
| **Sequence** | Passenger/check-in sequence identifier. | **5-character field**; `25`. | Short values are left-padded with zeros, e.g. `00025`. The app does not independently verify the number's operational meaning. |
| **Status** | Check-in status indicator as labelled in the application. | **1 character**. | Options: `1` checked-in/accepted; `0` not checked-in; `2` baggage checked; `3` checked-in + document verified; or **Blank**. Confirm the mapping against the downstream system's rules. |
| **Field Size** | Auto-calculated length of advanced/variable data for this leg. | Read-only, e.g. `0x4A (74)`. | `0x4A` is hexadecimal for 74 characters. It is calculated by the application; **do not enter it manually**. |

### Section 4 - Advanced / Optional Fields

**Important:** These settings are **per leg**, not global. Choose the leg in **Editing** before changing them. The first leg has preloaded sample values; additional legs start with blank advanced values.

| Field / control | Meaning in this interface | Size / sample | Guidance |
|---|---|---|---|
| **Editing** | Selects which leg's advanced fields are displayed and edited. | `Leg 1 (SIN → HEL)`, etc. | Save occurs in the browser form state as values are entered; switch to each leg to inspect its own advanced fields. |
| **Beg of Version No** | Beginning/version marker in the conditional data area. | **1 char**; default first leg `>`. | Leave blank unless a versioned conditional block is part of the test. |
| **Version No** | Version identifier included after the beginning marker. | **1 char**; default first leg `5`. | Use the version defined by your target format; the app does not validate it against an external specification. |
| **Structured Msg Size** | Size value entered for the versioned structured message. | **2 chars**; default first leg `18`. | This is a **manually entered text field**, not the automatically computed **Field Size**. It is not recalculated by the app. |
| **Passenger Description** | Optional passenger classification/description code. | **1 char**; default first leg `0`. | Apply the one-character code defined in your test specification. |
| **Source of Check-In** | Optional check-in-source indicator. | **1 char**; first-leg default is a space. | Source-code values are not explained or validated by this UI. |
| **Source of BP Issuance** | Optional boarding-pass-issuance-source indicator. | **1 char**; first-leg default `O`. | `BP` means boarding pass. Use the value specified by your system's requirements; the tool does not validate permitted source codes. |

### Section 5 - Remaining Variable Data

| Field | What it means | Limits / behaviour | Guidance |
|---|---|---|---|
| **Remaining Variable Data** | Free-text remainder of the optional conditional/security data, for the currently selected leg. | The application combines it with the **six structured fields above** to form variable data. **Combined maximum: 255 characters per leg.** | Preserve required exact characters and spaces. The app does not parse airline-specific conditional/security content or prove its validity. To produce **zero optional data**, clear this field **and all six structured fields**. |
| **Variable-data counter (`n / 255`)** | Shows combined optional/variable-data length for the selected leg. | Counts structured fields plus remaining variable data. | If any structured field is present, the app allocates fixed slots for all six structured fields (7 characters in total) before appending remaining data. |

**Important distinction:** **Structured Msg Size** is a manual, two-character input within the optional section. **Field Size** and the two-character hexadecimal size written before each leg's optional data are generated automatically from the length of the *entire* composed optional section.

## 3. Generate a transit or multi-leg barcode (M2, M3, ...)

1. Complete passenger details as described above.
2. Turn on **Transit / multi-leg mode**. The application adds **Leg 2**, so the output becomes M2.
3. Fill the flight data for both legs. Use **+ Add leg** to create M3, M4, and so on (maximum M9).
4. Check each leg's **PNR**; the top **Default PNR** is not a global lock on all existing legs.
5. Open **Advanced / Optional Fields → Editing** and select **Leg 1**, then **Leg 2**, etc. Review the optional data of every segment individually.
6. Click **Generate Barcode / QR**. Confirm that **Format** displays `M2`, `M3`, etc., and the **Payload Breakdown** includes a mandatory field, size and optional data (if present) for each leg.
7. Run the required scanner checks. If you turn off transit mode, the application retains only Leg 1.

## 4. Reproduce a previously captured test payload (raw mode)

1. Under **Format & Options**, enable **Use raw payload**.
2. Paste your complete BCBP-style test string into **Raw BCBP payload**. Do not inadvertently remove spaces, because spaces may be significant in fixed-width fields.
3. Alternatively, use **Load sample M2** or **Load sample M3**; either button loads and immediately generates a sample.
4. Select PDF417 or QR and click **Generate Barcode / QR** if you entered the string manually.
5. Check **Generated Payload** and the barcode preview. In raw mode the **Payload Breakdown** shows the full string as **Raw payload**; it does not decode the internal flight segments.

**Raw-mode limitations:** The app removes line breaks, rejects an empty payload and warns if the string does not start with `M`. It does **not** comprehensively verify structure, leg count, IATA compliance, checksum/signatures or airline-specific data.

## 5. Output panel and button legend

| Item | Meaning / action | How to use |
|---|---|---|
| **Format** | Detected/generated `M1`, `M2`, `M3`, etc. | Number after `M` is the number of legs shown by the string header. |
| **Length** | Total number of characters in the generated payload. | Useful for comparing expected and actual raw data size. |
| **Symbology** | Selected image type (`PDF417` or `QR`). | Check that it matches the scanner test case. |
| **Generated Payload** | Exact text sent for barcode rendering. | Inspect spacing and character positions; preserve exact output in a `.txt` file when testing. |
| **Copy Payload** | Copies payload text to clipboard. | Paste into a test log. Clipboard access can be blocked by browser permissions. |
| **Download Barcode** | Attempts to download the generated barcode image. | The image is supplied by a third-party endpoint; some browsers may open it in a new tab instead. Use the browser's save-image function if necessary. |
| **Download .txt** | Saves the payload as a plain-text file. | Preferred way to retain exact payload text for comparison or defect reporting. |
| **Barcode Preview** | Displays the generated PDF417/QR image. | Requires access to the OrcaScan image service. The image may fail even when the text payload was generated successfully. |
| **Refresh** | Requests the same barcode image again. | Use when the external image request failed or did not update. |
| **Zoom** | Opens the generated barcode image in a new tab/window. | Useful for scanner or visual inspection. Pop-up blockers may interfere. |
| **Payload Breakdown** | Displays overall format, passenger, e-ticket and, in form mode, each leg's mandatory and variable sections. | Validate structure and expected lengths; this is **not** a formal compliance test. |
| **Validation banner** | Displays **Payload generated successfully**, **Generated with warnings**, or **Fix required**. | Read all messages before using the barcode for a test. |

## 6. Validation rules and troubleshooting

| Message / symptom | Likely cause | Resolution |
|---|---|---|
| `Passenger name is required.` | Empty passenger-name box. | Enter a synthetic name. |
| `From/To airport must be exactly 3 IATA characters.` | Origin/destination not exactly three valid remaining characters after sanitisation. | Enter a three-letter test airport code, e.g. `SIN` or `HEL`. |
| `Travel date is required.` | A leg is missing a date. | Choose its travel date. |
| `Flight number is required.` | Flight No. is empty or spaces only. | Enter a test flight number. |
| `Class/cabin is required.` | Class is empty. | Enter one class character. |
| `Transit mode should contain at least 2 flight legs.` | Transit enabled but only one leg present. | Add a leg, or turn transit mode off. |
| `Optional conditional/security data must be 255 characters or less.` | Combined structured + remaining variable data too long. | Shorten optional data for the leg. |
| `... will be truncated.` | Passenger name, PNR, flight number or seat exceeds the payload field size. | Shorten the input to the field length and regenerate. |
| `Raw payload is empty.` | Raw mode is enabled without text. | Paste a test payload or return to form mode. |
| `Unable to load barcode image.` | External image service unreachable, blocked, or failed. | Check network access; try **Refresh**. Inspect **Generated Payload** separately. |
| Copy button does not work | Browser clipboard permissions/context issue. | Use the `.txt` download or manually select/copy the output. |
| Download Barcode opens a new tab | Cross-origin download handling varies by browser. | Save the displayed image from the browser. |
| M2/M3 shows unexpected sample flights | New legs are seeded with example routes. | Replace all placeholder values and recheck each segment. |

## 7. Working practices for testing

1. Use **synthetic passenger names, PNRs and flight details**; use real records only where explicitly authorised.
2. Record the test case ID, selected barcode symbology, expected leg count, input data and the generated `.txt` payload in your test evidence.
3. Independently validate the result against the **target scanner or application**, not merely the on-screen success banner.
4. For failure diagnosis, compare **raw payload text first**, then image rendering, then scanner interpretation.
5. Do not assume the source codes, optional structured fields or security contents are standard-conformant merely because the app accepts them.
6. The barcode image service receives the payload through an external request. Keep confidential or production passenger data out of this public test tool unless approved.

## 8. Glossary

| Term | Definition |
|---|---|
| **BCBP** | Bar Coded Boarding Pass. This tool generates **BCBP-style** payloads for tests. |
| **IATA** | International Air Transport Association. |
| **PNR** | Passenger Name Record / booking reference. |
| **Leg** | One flight segment, such as Singapore to Helsinki. |
| **M1 / M2 / M3** | This tool's `M` header with one, two or three flight legs. Form mode supports up to M9. |
| **PDF417** | Two-dimensional stacked barcode symbology used for the app's standard boarding-pass preview. |
| **QR Code** | Two-dimensional matrix barcode format offered as an alternative preview. |
| **Hex / hexadecimal** | Base-16 numbering used to encode optional-section length. `0x4A` = 74 decimal. |
| **UAT** | User Acceptance Testing. |

---

**Source basis:** Inspected `index.html` published in the user's `casopstech/boarding-pass-creator` GitHub repository on 26 November 2026. This guide documents **observed application behaviour**; it does not replace an authoritative IATA implementation specification or local operating procedure.