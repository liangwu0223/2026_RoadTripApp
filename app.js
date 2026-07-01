// ============================================================
//  2026 Family Road Trip — App
//  To update the itinerary: edit data.js
//  To add photos: place files in photos/<stop-id>/ and add
//                 filenames to the stop's photos[] array in data.js
// ============================================================

let lang       = 'zh';          // 'zh' | 'en'
let activeDay  = 0;             // 0 = overview, 1..N = day index
let map;
let markers    = {};            // stop.id -> Leaflet marker
let routeLines = [];            // Leaflet polylines
let activeStopId = null;
let lbPhotos   = [];            // current lightbox photo list
let lbIndex    = 0;

// ── Boot ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  buildTabs();
  selectDay(0);
  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight);
  document.addEventListener('keydown', onKey);
});

function syncHeaderHeight() {
  const h = document.getElementById('header').offsetHeight;
  document.documentElement.style.setProperty('--header-h', h + 'px');
}

// ── Map init ─────────────────────────────────────────────────
function initMap() {
  map = L.map('map', {
    zoomControl: false,
    attributionControl: false
  });

  // Clean, readable tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap &copy; CartoDB'
  }).addTo(map);

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  L.control.attribution({ position: 'bottomleft', prefix: false })
    .addAttribution('© <a href="https://www.openstreetmap.org/copyright">OSM</a> © CartoDB')
    .addTo(map);
}

// ── Tabs ─────────────────────────────────────────────────────
function buildTabs() {
  const nav = document.getElementById('day-tabs');
  nav.innerHTML = '';

  // Overview tab
  nav.appendChild(makeTab(0,
    lang === 'zh' ? '全程' : 'All',
    lang === 'zh' ? '總覽' : 'Overview',
    '#4A5568'
  ));

  TRIP_DATA.days.forEach((d, i) => {
    nav.appendChild(makeTab(
      i + 1,
      lang === 'zh' ? d.date : d.dateEn,
      lang === 'zh' ? d.weekday : d.weekdayEn,
      d.color
    ));
  });

  // Re-apply active state
  highlightTab(activeDay);
}

function makeTab(index, label, sub, color) {
  const btn = document.createElement('button');
  btn.className = 'day-tab';
  btn.role = 'tab';
  btn.dataset.index = index;
  btn.innerHTML = `<span class="tab-date">${label}</span><span class="tab-label">${sub}</span>`;
  btn.onclick = () => selectDay(index);
  return btn;
}

function highlightTab(index) {
  document.querySelectorAll('.day-tab').forEach(t => {
    const i = parseInt(t.dataset.index);
    if (i === index) {
      t.classList.add('active');
      const color = index === 0 ? '#4A5568' : TRIP_DATA.days[index - 1].color;
      t.style.background = color;
    } else {
      t.classList.remove('active');
      t.style.background = '';
    }
  });
}

// ── Select day ───────────────────────────────────────────────
function selectDay(index) {
  activeDay = index;
  activeStopId = null;
  highlightTab(index);
  renderTimeline(index);
  renderMap(index);
  scrollTabIntoView(index);
}

function scrollTabIntoView(index) {
  const tab = document.querySelector(`.day-tab[data-index="${index}"]`);
  if (tab) tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

// ── Timeline ─────────────────────────────────────────────────
function renderTimeline(dayIndex) {
  const container = document.getElementById('timeline-inner');
  container.innerHTML = '';

  const days = dayIndex === 0
    ? TRIP_DATA.days
    : [TRIP_DATA.days[dayIndex - 1]];

  days.forEach((day, localI) => {
    const realDayIdx = dayIndex === 0 ? localI : dayIndex - 1;
    container.appendChild(buildDayGroup(day, realDayIdx));
  });
}

function buildDayGroup(day, dayIdx) {
  const group = document.createElement('div');
  group.className = 'day-group';
  group.dataset.dayIdx = dayIdx;

  // Header
  const hdr = document.createElement('div');
  hdr.className = 'day-group-header';
  hdr.style.background = day.color;
  hdr.innerHTML = `
    <span class="dgh-icon">📍</span>
    <div>
      <div class="dgh-date">${lang === 'zh' ? day.date + ' ' + day.weekday : day.dateEn + ' · ' + day.weekdayEn}</div>
      <div class="dgh-theme">${lang === 'zh' ? day.theme : day.themeEn}</div>
    </div>
  `;
  hdr.onclick = () => {
    // Zoom map to this day
    if (activeDay !== dayIdx + 1) selectDay(dayIdx + 1);
  };
  group.appendChild(hdr);

  // Day note
  if (day.note) {
    const note = document.createElement('div');
    note.className = 'day-note';
    note.textContent = lang === 'zh' ? day.note : (day.noteEn || day.note);
    group.appendChild(note);
  }

  // Stop cards
  day.stops.forEach((stop, si) => {
    group.appendChild(buildStopCard(stop, si + 1, day.color));
  });

  // Accommodation
  if (day.accommodation) {
    const strip = document.createElement('div');
    strip.className = 'accom-strip';
    strip.innerHTML = `
      <span class="accom-icon">🏠</span>
      <div>
        <div class="accom-name">${lang === 'zh' ? '住宿' : 'Stay'}: ${day.accommodation.name}</div>
        <div class="accom-addr">${day.accommodation.address}</div>
      </div>
    `;
    group.appendChild(strip);
  }

  return group;
}

function buildStopCard(stop, num, color) {
  const card = document.createElement('div');
  card.className = 'stop-card';
  card.id = `card-${stop.id}`;
  card.style.setProperty('--day-color', color);

  const name    = lang === 'zh' ? stop.name    : stop.nameEn;
  const nameAlt = lang === 'zh' ? stop.nameEn  : stop.name;
  const time    = lang === 'zh' ? stop.time    : stop.timeEn;
  const intro   = lang === 'zh' ? stop.intro   : stop.introEn;
  const hasPhotos = stop.photos && stop.photos.length > 0;

  card.innerHTML = `
    <div class="sc-row">
      <div class="sc-num" style="background:${color}">${num}</div>
      <div class="sc-body">
        <div class="sc-name">${name}</div>
        <div class="sc-name-alt">${nameAlt}</div>
        <span class="sc-time">🕐 ${time}</span>
      </div>
    </div>
    <div class="sc-intro">${intro}</div>
    <div class="sc-toggle">${lang === 'zh' ? '點擊展開 ▾' : 'Tap to expand ▾'}</div>
    ${hasPhotos ? buildPhotoGrid(stop) : ''}
  `;

  card.onclick = (e) => {
    if (e.target.classList.contains('sc-photo')) return;
    const expanded = card.classList.toggle('expanded');
    card.querySelector('.sc-toggle').textContent =
      expanded
        ? (lang === 'zh' ? '收起 ▴' : 'Collapse ▴')
        : (lang === 'zh' ? '點擊展開 ▾' : 'Tap to expand ▾');
    focusStop(stop, color);
  };

  return card;
}

function buildPhotoGrid(stop) {
  const thumbs = stop.photos.map((p, i) =>
    `<img class="sc-photo" src="photos/${stop.id}/${p}" alt=""
          onclick="openLightbox('${stop.id}', ${i})"
          onerror="this.style.display='none'">`
  ).join('');
  return `<div class="sc-photos">${thumbs}</div>`;
}

// ── Map rendering ─────────────────────────────────────────────
function renderMap(dayIndex) {
  // Clear
  Object.values(markers).forEach(m => m.remove());
  markers = {};
  routeLines.forEach(l => l.remove());
  routeLines = [];

  const days = dayIndex === 0
    ? TRIP_DATA.days
    : [TRIP_DATA.days[dayIndex - 1]];

  const allCoords = [];
  const seenCoords = new Set();

  days.forEach((day) => {
    const dayCoords = [];

    day.stops.forEach((stop, si) => {
      if (!stop.coords) return;
      const key = stop.coords.join(',');
      if (!seenCoords.has(key)) {
        seenCoords.add(key);
        allCoords.push(stop.coords);
      }
      dayCoords.push(stop.coords);
      const m = createMarker(stop, si + 1, day.color);
      markers[stop.id] = m;
    });

    // Day-colored route segment
    if (dayCoords.length > 1) {
      const line = L.polyline(dayCoords, {
        color: day.color,
        weight: 3,
        opacity: 0.6,
        dashArray: '6 9',
        lineJoin: 'round'
      }).addTo(map);
      routeLines.push(line);
    }
  });

  // Fit bounds
  if (allCoords.length === 1) {
    map.setView(allCoords[0], 13);
  } else if (allCoords.length > 1) {
    map.fitBounds(L.latLngBounds(allCoords), {
      padding: [48, 48],
      maxZoom: 14
    });
  }

  // Show/hide legend
  const legend = document.getElementById('map-legend');
  if (dayIndex === 0) {
    legend.style.display = 'block';
    legend.innerHTML = TRIP_DATA.days.map(d =>
      `<div class="legend-item">
        <div class="legend-dot" style="background:${d.color}"></div>
        <span>${lang === 'zh' ? d.date : d.dateEn} ${lang === 'zh' ? d.theme : d.themeEn}</span>
      </div>`
    ).join('');
  } else {
    legend.style.display = 'none';
  }
}

function createMarker(stop, num, color) {
  const icon = L.divIcon({
    className: '',
    html: `<div class="map-marker" style="background:${color}">
             <div class="map-marker-inner">${num}</div>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [10, 32],
    popupAnchor: [6, -32]
  });

  const marker = L.marker(stop.coords, { icon }).addTo(map);
  marker.bindPopup(buildPopup(stop, num, color), {
    maxWidth: 260,
    className: 'trip-popup'
  });

  marker.on('click', () => {
    focusStop(stop, color);
    scrollToCard(stop.id);
  });

  return marker;
}

function buildPopup(stop, num, color) {
  const name    = lang === 'zh' ? stop.name    : stop.nameEn;
  const nameAlt = lang === 'zh' ? stop.nameEn  : stop.name;
  const time    = lang === 'zh' ? stop.time    : stop.timeEn;
  const intro   = lang === 'zh' ? stop.intro   : stop.introEn;
  const hasPhotos = stop.photos && stop.photos.length > 0;

  const photoHtml = hasPhotos
    ? `<div class="popup-photos">${
        stop.photos.slice(0, 3).map((p, i) =>
          `<img class="popup-photo" src="photos/${stop.id}/${p}" alt=""
                onclick="openLightbox('${stop.id}', ${i})"
                onerror="this.style.display='none'">`
        ).join('')
      }</div>`
    : '';

  return `
    <div class="popup-wrap">
      <div class="popup-color-bar" style="background:${color}"></div>
      <div class="popup-body">
        <div class="popup-badge" style="background:${color}">
          Day ${num} · ${lang === 'zh' ? stop.time : stop.timeEn}
        </div>
        <div class="popup-name">${name}</div>
        <div class="popup-name-alt">${nameAlt}</div>
        <div class="popup-divider"></div>
        <div class="popup-intro">${intro}</div>
        ${photoHtml}
      </div>
    </div>
  `;
}

// ── Focus / scroll helpers ────────────────────────────────────
function focusStop(stop, color) {
  if (!stop.coords) return;
  activeStopId = stop.id;

  // Fly map
  map.flyTo(stop.coords, Math.max(map.getZoom(), 13), { duration: 0.7 });

  // Open popup
  if (markers[stop.id]) markers[stop.id].openPopup();

  // Highlight card
  document.querySelectorAll('.stop-card.active').forEach(c => c.classList.remove('active'));
  const card = document.getElementById(`card-${stop.id}`);
  if (card) card.classList.add('active');
}

function scrollToCard(stopId) {
  const card = document.getElementById(`card-${stopId}`);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ── Language toggle ───────────────────────────────────────────
function toggleLang() {
  lang = lang === 'zh' ? 'en' : 'zh';

  document.getElementById('lang-btn').textContent = lang === 'zh' ? 'EN' : '中';
  document.getElementById('trip-title').textContent =
    lang === 'zh' ? TRIP_DATA.title : TRIP_DATA.titleEn;
  document.getElementById('trip-subtitle').textContent =
    lang === 'zh' ? TRIP_DATA.subtitle : TRIP_DATA.subtitleEn;

  buildTabs();
  renderTimeline(activeDay);
  renderMap(activeDay);
}

// ── Lightbox ──────────────────────────────────────────────────
function openLightbox(stopId, photoIndex) {
  const day = TRIP_DATA.days.find(d => d.stops.some(s => s.id === stopId));
  if (!day) return;
  const stop = day.stops.find(s => s.id === stopId);
  if (!stop || !stop.photos.length) return;

  lbPhotos = stop.photos.map(p => `photos/${stopId}/${p}`);
  lbIndex  = photoIndex;
  showLightboxPhoto();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';

  const hasPrev = stop.photos.length > 1;
  document.getElementById('lightbox-prev').style.display = hasPrev ? 'flex' : 'none';
  document.getElementById('lightbox-next').style.display = hasPrev ? 'flex' : 'none';
}

function showLightboxPhoto() {
  document.getElementById('lightbox-img').src = lbPhotos[lbIndex];
}

function lightboxNav(dir) {
  lbIndex = (lbIndex + dir + lbPhotos.length) % lbPhotos.length;
  showLightboxPhoto();
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('lightbox-img').src = '';
}

function onKey(e) {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   lightboxNav(-1);
  if (e.key === 'ArrowRight')  lightboxNav(1);
}
