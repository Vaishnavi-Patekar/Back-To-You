(() => {
  "use strict";

  const STORAGE_KEY = "back-to-you-demo-listings-v1";
  const CLAIM_STATUS_KEY = "back-to-you-demo-claim-status-v1";
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
  const CATEGORIES = ["Electronics", "Bags & accessories", "Books & stationery", "ID cards", "Water bottles", "Keys", "Clothing", "Other"];
  const LOCATIONS = ["Library", "Cafeteria", "Computer lab", "Auditorium", "Classroom block", "Sports ground", "Main quad", "Campus security desk"];
  const categoryIcons = {
    "Electronics": "🎧", "Bags & accessories": "🎒", "Books & stationery": "📚",
    "ID cards": "🪪", "Water bottles": "🧴", "Keys": "🔑", "Clothing": "🧥", "Other": "📦"
  };
  const now = Date.now();
  const sampleItems = [
    { id: "sample-1", status: "found", name: "Black wireless earbuds", category: "Electronics", location: "Library", date: new Date(now - 2 * 3600000).toISOString(), description: "Found beside a study table on the second floor.", privateDetail: "Small crescent scratch on the case", handover: "Campus security desk", photo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" },
    { id: "sample-2", status: "lost", name: "Olive canvas tote", category: "Bags & accessories", location: "Cafeteria", date: new Date(now - 5 * 3600000).toISOString(), description: "A soft canvas bag, possibly left near the window seats.", photo: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80" },
    { id: "sample-3", status: "found", name: "Blue stainless water bottle", category: "Water bottles", location: "Sports ground", date: new Date(now - 9 * 3600000).toISOString(), description: "Blue bottle picked up after practice near the bleachers.", privateDetail: "Tiny white star sticker under the lid", handover: "Campus security desk", photo: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80" },
    { id: "sample-4", status: "lost", name: "Silver keyring with two keys", category: "Keys", location: "Classroom block", date: new Date(now - 16 * 3600000).toISOString(), description: "Two silver keys on a plain round keyring. Last seen near a lecture room.", photo: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80" },
    { id: "sample-5", status: "found", name: "Green grid notebook", category: "Books & stationery", location: "Computer lab", date: new Date(now - 23 * 3600000).toISOString(), description: "Notebook left at the end workstation in the computer lab.", privateDetail: "A folded orange receipt tucked inside the back cover", handover: "College office", photo: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80" },
    { id: "sample-6", status: "lost", name: "Grey zip-up hoodie", category: "Clothing", location: "Auditorium", date: new Date(now - 31 * 3600000).toISOString(), description: "May have been left on a seat after the afternoon talk.", photo: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80" },
    { id: "sample-7", status: "found", name: "Student ID card holder", category: "ID cards", location: "Main quad", date: new Date(now - 43 * 3600000).toISOString(), description: "Clear card sleeve found along the garden path. Card details are not shown.", privateDetail: "A tiny pressed flower inside the sleeve", handover: "Campus security desk", photo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" },
    { id: "sample-8", status: "lost", name: "Navy blue backpack", category: "Bags & accessories", location: "Library", date: new Date(now - 54 * 3600000).toISOString(), description: "Dark backpack with a small fabric patch. Please keep identifying details private.", photo: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=800&q=80" },
    { id: "sample-9", status: "found", name: "Red calculator pouch", category: "Electronics", location: "Classroom block", date: new Date(now - 68 * 3600000).toISOString(), description: "A zip pouch was found outside a classroom after a morning lecture.", privateDetail: "A small yellow tag on the zipper pull", handover: "College office", photo: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80" },
    { id: "sample-10", status: "lost", name: "Patterned blue scarf", category: "Clothing", location: "Cafeteria", date: new Date(now - 82 * 3600000).toISOString(), description: "Lightweight scarf, possibly left on a chair near the entrance.", photo: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80" },
    { id: "sample-11", status: "found", name: "Brass key with a green tag", category: "Keys", location: "Auditorium", date: new Date(now - 95 * 3600000).toISOString(), description: "Single key found near the auditorium doors after an event.", privateDetail: "The green tag has a shallow notch at one corner", handover: "Campus security desk", photo: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80" },
    { id: "sample-12", status: "lost", name: "Paperback literature book", category: "Books & stationery", location: "Main quad", date: new Date(now - 110 * 3600000).toISOString(), description: "A paperback with a pale cover, last seen while studying outside.", photo: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80" }
  ];

  const elements = {
    grid: document.querySelector("#listing-grid"),
    count: document.querySelector("#listing-count"),
    empty: document.querySelector("#empty-state"),
    search: document.querySelector("#search-input"),
    category: document.querySelector("#category-filter"),
    status: document.querySelector("#status-filter"),
    location: document.querySelector("#location-filter"),
    sort: document.querySelector("#sort-order"),
    detailsDialog: document.querySelector("#details-dialog"),
    detailsContent: document.querySelector("#details-content"),
    claimDialog: document.querySelector("#claim-dialog"),
    toast: document.querySelector("#toast"),
    reportForm: document.querySelector("#report-form"),
    reportType: document.querySelector("#report-type"),
    foundFields: document.querySelector("#found-fields"),
    formMessage: document.querySelector("#form-message"),
    photoInput: document.querySelector('[name="photo"]'),
    photoPreview: document.querySelector("#photo-preview"),
    photoImage: document.querySelector("#photo-preview-image")
  };
  let items = loadItems();
  let toastTimer;
  let activeClaimItemId = null;
  let detailsOpener = null;
  let selectedPhoto = null;
  let photoPreviewUrl = null;
  let preserveReportMessageOnReset = false;
  const claimedThisSession = new Set();

  function loadItems() {
    let saved = [];
    try {
      const storedItems = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(storedItems) && storedItems.every(isValidStoredItem)) saved = storedItems;
    } catch (error) {
      console.warn("Could not read saved demo listings; loading the sample listings.", error);
    }
    let claimedIds = [];
    try {
      const storedClaims = JSON.parse(localStorage.getItem(CLAIM_STATUS_KEY));
      if (Array.isArray(storedClaims) && storedClaims.every(id => typeof id === "string")) claimedIds = storedClaims;
    } catch (error) {
      console.warn("Could not read saved demo claim statuses; clearing those statuses.", error);
    }
    return [...saved, ...sampleItems.map(item => ({ ...item, claimPending: claimedIds.includes(item.id) }))];
  }

  function isValidStoredItem(item) {
    return item && typeof item.id === "string" && typeof item.name === "string" &&
      typeof item.description === "string" && CATEGORIES.includes(item.category) &&
      LOCATIONS.includes(item.location) && ["lost", "found"].includes(item.status) &&
      typeof item.date === "string";
  }

  function saveItems() {
    const publicRecords = items.filter(item => !item.id.startsWith("sample-")).map(item => ({
      id: item.id,
      status: item.status,
      name: item.name,
      category: item.category,
      location: item.location,
      date: item.date,
      description: item.description,
      claimPending: Boolean(item.claimPending),
      handover: item.handover || "",
      // Uploaded images and private proof details stay in memory only.
      photo: ""
    }));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(publicRecords));
      localStorage.setItem(CLAIM_STATUS_KEY, JSON.stringify(items.filter(item => item.claimPending).map(item => item.id)));
    } catch (error) {
      console.warn("Could not save demo listings to this browser.", error);
      showToast("This listing is available for this session, but browser storage is unavailable.");
    }
  }

  function fillOptions(select, values, firstLabel) {
    select.replaceChildren();
    if (firstLabel) {
      const first = document.createElement("option");
      first.value = "";
      first.textContent = firstLabel;
      select.append(first);
    }
    values.forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.append(option);
    });
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Date not available";
    return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(date);
  }

  function setImage(img, placeholder, source, name) {
    if (!source) {
      placeholder.textContent = categoryIcons[name] || "📦";
      return;
    }
    img.src = source;
    img.alt = `${name} photo`;
    img.addEventListener("error", () => {
      img.remove();
      placeholder.hidden = false;
    }, { once: true });
    placeholder.hidden = true;
  }

  function makeItemCard(item) {
    const article = document.createElement("article");
    article.className = "item-card";
    const imageWrap = document.createElement("div");
    imageWrap.className = "item-image-wrap";
    const placeholder = document.createElement("div");
    placeholder.className = "item-placeholder";
    placeholder.setAttribute("aria-hidden", "true");
    placeholder.textContent = categoryIcons[item.category] || "📦";
    imageWrap.append(placeholder);
    if (item.photo) {
      const image = document.createElement("img");
      image.className = "item-image";
      setImage(image, placeholder, item.photo, item.name);
      imageWrap.append(image);
    }
    const badge = document.createElement("span");
    badge.className = `item-badge${item.status === "lost" ? " is-lost" : ""}`;
    badge.textContent = item.status === "lost" ? "Lost item" : "Found item";
    imageWrap.append(badge);

    const body = document.createElement("div");
    body.className = "item-card-body";
    const category = document.createElement("p");
    category.className = "item-category";
    category.textContent = item.category;
    const title = document.createElement("h3");
    title.className = "item-title";
    title.textContent = item.name;
    const meta = document.createElement("div");
    meta.className = "item-meta";
    meta.textContent = `${item.location} · ${formatDate(item.date)}`;
    const description = document.createElement("p");
    description.className = "item-description";
    description.textContent = item.description;
    const actions = document.createElement("div");
    actions.className = "item-card-actions";
    const detailsButton = document.createElement("button");
    detailsButton.className = "details-button";
    detailsButton.type = "button";
    detailsButton.textContent = "View details ↗";
    detailsButton.addEventListener("click", () => openDetails(item.id, detailsButton));
    actions.append(detailsButton);

    if (item.claimPending) {
      const pending = document.createElement("span");
      pending.className = "item-status-note";
      pending.textContent = "Claim submitted";
      actions.append(pending);
    } else if (item.status === "found" && !claimedThisSession.has(item.id)) {
      const claimButton = document.createElement("button");
      claimButton.className = "claim-shortcut";
      claimButton.type = "button";
      claimButton.textContent = "This is mine";
      claimButton.addEventListener("click", () => openClaim(item.id));
      actions.append(claimButton);
    }
    body.append(category, title, meta, description, actions);
    article.append(imageWrap, body);
    return article;
  }

  function filteredItems() {
    const query = elements.search.value.trim().toLocaleLowerCase();
    const results = items.filter(item => {
      const matchesSearch = !query || `${item.name} ${item.category} ${item.location} ${item.description}`.toLocaleLowerCase().includes(query);
      return matchesSearch &&
        (!elements.category.value || item.category === elements.category.value) &&
        (!elements.status.value || item.status === elements.status.value) &&
        (!elements.location.value || item.location === elements.location.value);
    });
    if (elements.sort.value === "oldest") results.sort((a, b) => new Date(a.date) - new Date(b.date));
    else if (elements.sort.value === "name") results.sort((a, b) => a.name.localeCompare(b.name));
    else results.sort((a, b) => new Date(b.date) - new Date(a.date));
    return results;
  }

  function renderItems() {
    const filtered = filteredItems();
    elements.grid.replaceChildren(...filtered.map(makeItemCard));
    elements.count.textContent = `${filtered.length} ${filtered.length === 1 ? "listing" : "listings"}`;
    elements.empty.hidden = filtered.length !== 0;
    elements.grid.hidden = filtered.length === 0;
  }

  function openDetails(id, opener) {
    const item = items.find(entry => entry.id === id);
    if (!item) return;
    elements.detailsContent.replaceChildren();
    const imageWrap = document.createElement("div");
    imageWrap.className = "details-image";
    const placeholder = document.createElement("div");
    placeholder.className = "item-placeholder";
    placeholder.setAttribute("aria-hidden", "true");
    placeholder.textContent = categoryIcons[item.category] || "📦";
    imageWrap.append(placeholder);
    if (item.photo) {
      const image = document.createElement("img");
      setImage(image, placeholder, item.photo, item.name);
      imageWrap.append(image);
    }
    const body = document.createElement("div");
    body.className = "details-body";
    const badge = document.createElement("span");
    badge.className = `item-badge${item.status === "lost" ? " is-lost" : ""}`;
    badge.textContent = item.status === "lost" ? "Lost item" : "Found item";
    const title = document.createElement("h2");
    title.id = "details-title";
    title.textContent = item.name;
    const meta = document.createElement("div");
    meta.className = "details-meta";
    meta.textContent = `${item.category} · ${item.location} · Reported ${formatDate(item.date)}`;
    const description = document.createElement("p");
    description.className = "details-description";
    description.textContent = item.description;
    const status = document.createElement("p");
    status.className = "details-status";
    status.textContent = item.claimPending
      ? "A demo claim has been submitted. Ownership is not verified."
      : item.status === "found" && item.handover
        ? `Demo handover preference: ${item.handover}.`
        : "Open demo listing. Please arrange any real handover safely.";
    const actions = document.createElement("div");
    actions.className = "details-actions";
    if (item.status === "found" && !item.claimPending && !claimedThisSession.has(item.id)) {
      const claim = document.createElement("button");
      claim.className = "button button-dark";
      claim.type = "button";
      claim.textContent = "Submit a claim";
      claim.addEventListener("click", () => {
        elements.detailsDialog.close();
        openClaim(item.id);
      });
      actions.append(claim);
    } else if (item.status === "lost") {
      const response = document.createElement("a");
      response.className = "button button-outline";
      response.href = "#report";
      response.dataset.reportType = "found";
      response.textContent = "I found a matching item";
      response.addEventListener("click", () => {
        elements.detailsDialog.close();
        setReportType("found");
      });
      actions.append(response);
    }
    body.append(badge, title, meta, description, status, actions);
    elements.detailsContent.append(imageWrap, body);
    elements.detailsDialog.returnValue = "";
    detailsOpener = opener;
    elements.detailsDialog.showModal();
  }

  function openClaim(id) {
    const item = items.find(entry => entry.id === id);
    if (!item || item.status !== "found" || item.claimPending || claimedThisSession.has(id)) return;
    activeClaimItemId = id;
    document.querySelector("#claim-form").reset();
    clearFormErrors(document.querySelector("#claim-form"));
    document.querySelector("#claim-message").textContent = "";
    document.querySelector("#claim-title").textContent = `Could this be your ${item.name.toLocaleLowerCase()}?`;
    elements.claimDialog.showModal();
  }

  function clearFormErrors(form) {
    form.querySelectorAll(".field-error").forEach(error => { error.textContent = ""; });
    form.querySelectorAll("[aria-invalid='true']").forEach(field => field.removeAttribute("aria-invalid"));
  }

  function validateForm(form, fields) {
    clearFormErrors(form);
    let firstInvalid = null;
    fields.forEach(([name, message, predicate]) => {
      const control = form.elements.namedItem(name);
      if (!control) return;
      const invalid = predicate ? !predicate(control) : !control.value.trim();
      if (invalid) {
        const field = control.closest(".field");
        const error = field && field.querySelector(".field-error");
        if (error) error.textContent = message;
        control.setAttribute("aria-invalid", "true");
        if (!firstInvalid) firstInvalid = control;
      }
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => { elements.toast.hidden = true; }, 4200);
  }

  function setReportType(type) {
    elements.reportType.value = type;
    document.querySelectorAll(".toggle-option").forEach(button => {
      const selected = button.dataset.type === type;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    elements.foundFields.hidden = type !== "found";
    const privateField = elements.reportForm.elements.namedItem("privateDetail");
    privateField.required = type === "found";
    document.querySelector("#private-detail-optional").hidden = type === "found";
    document.querySelector("#private-detail-required").hidden = type !== "found";
  }

  function clearPhoto() {
    selectedPhoto = null;
    elements.photoInput.value = "";
    if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    photoPreviewUrl = null;
    elements.photoImage.removeAttribute("src");
    elements.photoPreview.hidden = true;
  }

  function initialize() {
    fillOptions(elements.category, CATEGORIES, "All categories");
    fillOptions(elements.location, LOCATIONS, "All locations");
    fillOptions(elements.reportForm.elements.namedItem("category"), CATEGORIES);
    fillOptions(elements.reportForm.elements.namedItem("location"), LOCATIONS);
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    elements.reportForm.elements.namedItem("date").value = localToday;
    elements.reportForm.elements.namedItem("date").max = localToday;
    document.querySelector("#current-year").textContent = String(new Date().getFullYear());
    renderItems();

    [elements.search, elements.category, elements.status, elements.location, elements.sort].forEach(control => {
      control.addEventListener(control === elements.search ? "input" : "change", renderItems);
    });
    document.querySelector("#reset-filters").addEventListener("click", resetFilters);
    document.querySelector("#empty-reset").addEventListener("click", resetFilters);

    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector("#primary-nav");
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      menuButton.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
      nav.classList.toggle("is-open", !expanded);
    });
    nav.addEventListener("click", event => {
      const link = event.target.closest("a");
      if (!link) return;
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      nav.classList.remove("is-open");
      if (link.dataset.reportType) setReportType(link.dataset.reportType);
    });
    document.querySelectorAll(".hero-actions [data-report-type]").forEach(link => {
      link.addEventListener("click", () => setReportType(link.dataset.reportType));
    });
    document.querySelectorAll("[data-type]").forEach(button => {
      button.addEventListener("click", () => setReportType(button.dataset.type));
    });

    document.querySelector("[data-close-details]").addEventListener("click", () => elements.detailsDialog.close());
    document.querySelector("[data-close-claim]").addEventListener("click", () => elements.claimDialog.close());
    [elements.detailsDialog, elements.claimDialog].forEach(dialog => {
      dialog.addEventListener("click", event => {
        if (event.target === dialog) dialog.close();
      });
    });
    document.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      const openDialog = [elements.detailsDialog, elements.claimDialog].find(dialog => dialog.open);
      if (openDialog) {
        event.preventDefault();
        openDialog.close();
      }
    });
    elements.detailsDialog.addEventListener("close", () => {
      if (detailsOpener && detailsOpener.isConnected) detailsOpener.focus();
      detailsOpener = null;
    });

    elements.reportForm.addEventListener("submit", submitReport);
    elements.reportForm.addEventListener("reset", () => {
      window.setTimeout(() => {
        clearFormErrors(elements.reportForm);
        if (preserveReportMessageOnReset) {
          preserveReportMessageOnReset = false;
        } else {
          elements.formMessage.textContent = "";
          elements.formMessage.classList.remove("is-error");
        }
        clearPhoto();
        setReportType("lost");
        elements.reportForm.elements.namedItem("date").value = localToday;
      }, 0);
    });
    elements.photoInput.addEventListener("change", previewPhoto);
    document.querySelector("#remove-photo").addEventListener("click", clearPhoto);
    document.querySelector("#claim-form").addEventListener("submit", submitClaim);
    elements.claimDialog.addEventListener("close", () => { activeClaimItemId = null; });
    setReportType("lost");
  }

  function resetFilters() {
    elements.search.value = "";
    elements.category.value = "";
    elements.status.value = "";
    elements.location.value = "";
    elements.sort.value = "newest";
    renderItems();
  }

  function previewPhoto() {
    const file = elements.photoInput.files[0];
    const error = elements.photoInput.closest(".field").querySelector(".field-error");
    error.textContent = "";
    elements.photoInput.removeAttribute("aria-invalid");
    if (!file) {
      clearPhoto();
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      error.textContent = "Choose a JPG, PNG, WebP, or GIF image.";
      elements.photoInput.setAttribute("aria-invalid", "true");
      clearPhoto();
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      error.textContent = "That image is larger than 5 MB. Choose a smaller file.";
      elements.photoInput.setAttribute("aria-invalid", "true");
      clearPhoto();
      return;
    }
    selectedPhoto = file;
    photoPreviewUrl = URL.createObjectURL(file);
    elements.photoImage.src = photoPreviewUrl;
    elements.photoPreview.hidden = false;
  }

  function submitReport(event) {
    event.preventDefault();
    const form = elements.reportForm;
    const required = [
      ["name", "Enter an item name."],
      ["category", "Choose a category."],
      ["description", "Add a short description."],
      ["location", "Choose an approximate location."],
      ["date", "Choose the date.", control => Boolean(control.value) && control.value <= control.max]
    ];
    if (elements.reportType.value === "found") required.push(["privateDetail", "Add a private detail to help distinguish this item."]);
    if (!validateForm(form, required)) return;
    if (elements.photoInput.getAttribute("aria-invalid") === "true") {
      elements.photoInput.focus();
      return;
    }

    const data = new FormData(form);
    const date = `${data.get("date")}${data.get("time") ? `T${data.get("time")}` : "T12:00"}`;
    const item = {
      id: `user-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      status: elements.reportType.value,
      name: String(data.get("name")).trim(),
      category: String(data.get("category")),
      description: String(data.get("description")).trim(),
      location: String(data.get("location")),
      date: new Date(date).toISOString(),
      handover: String(data.get("handover") || ""),
      claimPending: false
    };
    if (selectedPhoto) item.photo = URL.createObjectURL(selectedPhoto);
    if (elements.reportType.value === "found") item.privateDetail = String(data.get("privateDetail")).trim();
    items.unshift(item);
    saveItems();
    renderItems();
    showToast("Report added to the demo listings.");
    preserveReportMessageOnReset = true;
    form.reset();
    elements.formMessage.classList.remove("is-error");
    elements.formMessage.textContent = "Your demo listing is live on this page. It has not been sent to anyone.";
    document.querySelector("#explore").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function submitClaim(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const valid = validateForm(form, [
      ["claimant", "Enter your name."],
      ["reason", "Briefly explain why you think this item is yours."],
      ["proof", "Add a private identifying detail."]
    ]);
    if (!valid) return;
    const item = items.find(entry => entry.id === activeClaimItemId);
    if (!item || claimedThisSession.has(item.id)) {
      elements.claimDialog.close();
      showToast("A claim has already been submitted for this item in this session.");
      return;
    }
    // Claim text is intentionally discarded; it is never logged or persisted.
    claimedThisSession.add(item.id);
    item.claimPending = true;
    saveItems();
    renderItems();
    elements.claimDialog.close();
    showToast("Demo claim submitted. Ownership has not been verified.");
  }

  initialize();
})();
