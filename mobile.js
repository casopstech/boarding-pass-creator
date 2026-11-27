/* Mobile quick-entry layer. Reuses the original BCBP generator and its validators. */
(() => {
  "use strict";
  const mobileViewport = window.matchMedia("(max-width: 767px)");
  const builderCard = document.querySelector(".layout > section.card");
  const editorFirstSection = builderCard?.querySelector(":scope > .step-card");
  const formPanel = document.getElementById("formPanel");
  const outputCard = document.querySelector(".layout > aside.output-card");
  if (!builderCard || !editorFirstSection || !formPanel || !outputCard) return;
  builderCard.id = "builderCard";
  outputCard.id = "outputCard";

  // Group existing controls without replacing or cloning any of their IDs.
  const desktopEditor = document.createElement("div");
  desktopEditor.id = "desktopEditor";
  builderCard.insertBefore(desktopEditor, editorFirstSection);
  desktopEditor.appendChild(editorFirstSection);
  desktopEditor.appendChild(formPanel);

  const backBar = document.createElement("div");
  backBar.id = "mobileBackBar";
  backBar.className = "mobile-only";
  backBar.innerHTML = `<strong>Full boarding pass editor</strong><button type="button" id="mobileBackBtn">← Quick mode</button>`;
  builderCard.insertBefore(backBar, desktopEditor);

  const quick = document.createElement("section");
  quick.id = "mobileQuickPanel";
  quick.className = "mobile-only";
  quick.setAttribute("aria-label", "Mobile quick boarding pass generator");
  quick.innerHTML = `
    <div class="mobile-quick-heading">
      <div><h2>Quick boarding pass</h2><p>Enter the flight details, then generate a test barcode.</p></div>
      <span class="mobile-quick-tag">Single flight</span>
    </div>
    <form id="mobileQuickForm" novalidate>
      <div class="mobile-quick-grid">
        <div class="field wide"><label for="quickPassenger">Passenger name</label>
          <input id="quickPassenger" name="passenger" maxlength="20" required autocomplete="off" spellcheck="false" placeholder="SURNAME/FIRSTNAME" />
          <div class="mobile-field-help">Test name only · 20 characters max</div></div>
      </div>
      <div class="mobile-route-label">Journey</div>
      <div class="mobile-quick-grid">
        <div class="field"><label for="quickFrom">Departure airport</label>
          <input id="quickFrom" name="from" maxlength="3" required autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="SIN" /></div>
        <div class="field"><label for="quickTo">Destination airport</label>
          <input id="quickTo" name="to" maxlength="3" required autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="HKG" /></div>
        <div class="field"><label for="quickAirline">Airline code</label>
          <input id="quickAirline" name="airline" maxlength="3" required autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="SQ" /></div>
        <div class="field"><label for="quickFlight">Flight number</label>
          <input id="quickFlight" name="flight" maxlength="5" required inputmode="numeric" autocomplete="off" spellcheck="false" placeholder="123" /></div>
        <div class="field wide"><label for="quickDate">Departure date</label>
          <input id="quickDate" name="date" type="date" required /></div>
      </div>
      <details class="mobile-extras" id="mobileExtraDetails">
        <summary>More options · Seat, PNR, barcode type</summary>
        <div class="mobile-extra-grid">
          <div class="field"><label for="quickCabin">Cabin class (1 char)</label><input id="quickCabin" name="cabin" maxlength="1" placeholder="Y" autocapitalize="characters" /></div>
          <div class="field"><label for="quickSeat">Seat (up to 4 chars)</label><input id="quickSeat" name="seat" maxlength="4" placeholder="21A" autocapitalize="characters" /></div>
          <div class="field wide"><label for="quickPnr">PNR / booking reference</label><input id="quickPnr" name="pnr" maxlength="7" autocomplete="off" autocapitalize="characters" placeholder="ABC123" /></div>
          <div class="field wide"><label for="quickFormat">Barcode type</label><select id="quickFormat" name="format"><option value="pdf417">PDF417 (default)</option><option value="qr">QR code</option></select></div>
        </div>
      </details>
      <div id="mobileQuickError" role="alert"></div>
      <button type="submit" class="mobile-submit" id="mobileGenerateBtn">Generate test barcode</button>
      <button type="button" class="mobile-full-link" id="mobileFullBtn">Full editor · All boarding pass fields</button>
      <p class="mobile-quick-footnote">Test data only · Barcode preview uses an external service</p>
    </form>`;
  builderCard.insertBefore(quick, backBar);

  // Mark output sections so CSS can prioritize the barcode preview on phones.
  const outputPanels = outputCard.querySelectorAll(":scope > .output-panel");
  if (outputPanels.length === 3) {
    outputPanels[0].id = "payloadOutputPanel";
    outputPanels[1].id = "barcodeOutputPanel";
    outputPanels[2].id = "breakdownOutputPanel";
  }
  const techToggle = document.createElement("button");
  techToggle.type = "button";
  techToggle.className = "mobile-only";
  techToggle.id = "mobileTechToggle";
  techToggle.setAttribute("aria-expanded", "false");
  techToggle.textContent = "Show technical details (payload and fields)";
  outputCard.insertBefore(techToggle, outputCard.querySelector(".output-meta"));
  techToggle.addEventListener("click", () => {
    const open = outputCard.classList.toggle("mobile-show-details");
    techToggle.setAttribute("aria-expanded", String(open));
    techToggle.textContent = open ? "Hide technical details" : "Show technical details (payload and fields)";
  });
  const previewActions = outputCard.querySelector(".preview-actions");
  if (previewActions) {
    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.className = "secondary small mobile-only mobile-save-btn";
    saveButton.textContent = "Save image";
    saveButton.addEventListener("click", downloadBarcodeImage);
    previewActions.appendChild(saveButton);
  }

  const quickForm = document.getElementById("mobileQuickForm");
  const quickError = document.getElementById("mobileQuickError");
  const mappings = { passenger: "passengerName", format: "formatType" };
  const legFields = ["from", "to", "airline", "flight", "date", "cabin", "seat", "pnr"];
  const getQuickInput = (name) => quickForm.elements.namedItem(name);
  const getLegInput = (name) => document.querySelector(`[data-leg-card] [data-field="${name}"]`);
  const uppercase = new Set(["passenger", "from", "to", "airline", "cabin", "seat", "pnr"]);

  function syncQuickFromEditor() {
    syncStateFromDom();
    getQuickInput("passenger").value = document.getElementById(mappings.passenger).value;
    getQuickInput("format").value = document.getElementById(mappings.format).value;
    for (const name of legFields) getQuickInput(name).value = name === "flight" ? (getLegInput(name)?.value ?? "").trim() : (getLegInput(name)?.value ?? "");
    // The default desktop test flight includes a trailing pad character. Normalize it for quick entry.
    if (mobileViewport.matches) updateEditorField("flight", getQuickInput("flight").value);
    quickError.classList.remove("is-visible");
    quickError.textContent = "";
  }

  function updateEditorField(name, raw) {
    let value = String(raw ?? "");
    if (uppercase.has(name)) value = value.toUpperCase();
    if (name === "from" || name === "to" || name === "airline") value = value.replace(/[^A-Z]/g, "");
    if (name === "flight") value = value.replace(/[^0-9]/g, "");
    getQuickInput(name).value = value;
    if (name === "passenger") {
      document.getElementById("passengerName").value = value;
      updateTextCounters();
    } else if (name === "format") {
      const select = document.getElementById("formatType");
      select.value = value;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    } else if (legFields.includes(name)) {
      const original = getLegInput(name);
      if (original) {
        original.value = value;
        original.dispatchEvent(new Event("input", { bubbles: true }));
      }
      if (name === "pnr") {
        document.getElementById("defaultPnr").value = value;
        updateTextCounters();
      }
    }
  }
  for (const name of ["passenger", "format", ...legFields]) {
    const input = getQuickInput(name);
    input.addEventListener(name === "format" ? "change" : "input", () => updateEditorField(name, input.value));
  }

  function setFullEditor(open) {
    if (!open && state.legs.length > 1) {
      alert("Quick mode supports a single flight only. Remove additional legs in the full editor before returning.");
      return;
    }
    if (!open && document.getElementById("rawMode").checked) {
      const raw = document.getElementById("rawMode");
      raw.checked = false;
      raw.dispatchEvent(new Event("change", { bubbles: true }));
    }
    if (!open) syncQuickFromEditor();
    builderCard.classList.toggle("mobile-full-mode", open);
    if (mobileViewport.matches) builderCard.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  document.getElementById("mobileFullBtn").addEventListener("click", () => setFullEditor(true));
  document.getElementById("mobileBackBtn").addEventListener("click", () => setFullEditor(false));

  function showQuickError(message) {
    quickError.textContent = message;
    quickError.classList.add("is-visible");
  }
  quickForm.addEventListener("submit", (event) => {
    event.preventDefault();
    quickError.textContent = "";
    quickError.classList.remove("is-visible");
    if (state.legs.length !== 1) {
      showQuickError("Quick mode supports one flight. Open Full editor to adjust transit legs.");
      return;
    }
    if (document.getElementById("rawMode").checked) {
      showQuickError("Raw payload mode is active. Open Full editor to switch back to form mode.");
      return;
    }
    const name = getQuickInput("passenger").value.trim();
    const from = getQuickInput("from").value;
    const to = getQuickInput("to").value;
    const airline = getQuickInput("airline").value;
    const flight = getQuickInput("flight").value;
    const date = getQuickInput("date").value;
    if (!name || !/^[A-Z]{3}$/.test(from) || !/^[A-Z]{3}$/.test(to) || !/^[A-Z]{2,3}$/.test(airline) || !/^[0-9]{1,5}$/.test(flight) || !date) {
      showQuickError("Complete the passenger name, 3-letter airport codes, 2–3 letter airline code, 1–5 digit flight number, and departure date.");
      return;
    }
    generate();
    if (mobileViewport.matches) outputCard.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  syncQuickFromEditor();
  mobileViewport.addEventListener("change", () => {
    // Keep a single data model when switching between mobile and desktop widths.
    if (mobileViewport.matches && !builderCard.classList.contains("mobile-full-mode")) syncQuickFromEditor();
  });
})();
