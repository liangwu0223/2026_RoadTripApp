// ============================================================
//  2026 Family Road Trip — App
//  To update the itinerary: edit data.js
//  To add photos: place files in photos/<stop-id>/ and add
//                 filenames to the stop's photos[] array in data.js
// ============================================================

let lang        = 'zh';
let activeDay   = 0;
let map;
let markers     = {};
let accomMarkers = {};
let routeLines  = [];
let activeStopId = null;
let lbPhotos    = [];
let lbIndex     = 0;

// ── Boot ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  buildTabs();
  selectDay(0);
  syncHeaderHeight();
  document.fonts.ready.then(syncHeaderHeight);
  window.addEventListener('resize', syncHeaderHeight);
  document.addEventListener('keydown', onKey);
});

function syncHeaderHeight() {
  const h = document.getElementById('header').offsetHeight;
  document.documentElement.style.setProperty('--header-h', h + 'px');
}

// ── Map init ─────────────────────────────────────────────────
function initMap() {
  map = L.map('map', { zoomControl: false, attributionControl: false });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19
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

  highlightTab(activeDay);
}

function makeTab(index, label, sub, color) {
  const btn = document.createElement('button');
  btn.className = 'day-tab';
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
      t.style.background = index === 0 ? '#4A5568' : TRIP_DATA.days[index - 1].color;
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

// ── Helpers ───────────────────────────────────────────────────
function stopName(stop) {
  // Chinese mode: "中文名 English Name" (omit English suffix when names are identical)
  if (lang === 'zh') {
    if (stop.name === stop.nameEn) return stop.name;
    return `${stop.name} <span class="name-en-inline">${stop.nameEn}</span>`;
  }
  return stop.nameEn;
}

function stopNameAlt(stop) {
  // Subtitle row: English mode shows Chinese; Chinese mode omitted (already in title)
  return lang === 'zh' ? '' : stop.name;
}

function t(zh, en) { return lang === 'zh' ? zh : en; }

function gmapsUrl(coords) {
  return `https://maps.google.com/?q=${coords[0]},${coords[1]}`;
}

// ── Timeline ─────────────────────────────────────────────────
function renderTimeline(dayIndex) {
  const container = document.getElementById('timeline-inner');
  container.innerHTML = '';

  const days = dayIndex === 0 ? TRIP_DATA.days : [TRIP_DATA.days[dayIndex - 1]];
  days.forEach((day, localI) => {
    const realIdx = dayIndex === 0 ? localI : dayIndex - 1;
    container.appendChild(buildDayGroup(day, realIdx));
  });
}

function buildDayGroup(day, dayIdx) {
  const group = document.createElement('div');
  group.className = 'day-group';

  // Header
  const hdr = document.createElement('div');
  hdr.className = 'day-group-header';
  hdr.style.background = day.color;
  hdr.innerHTML = `
    <div class="dgh-left">
      <div class="dgh-date">${t(day.date + ' ' + day.weekday, day.dateEn + ' · ' + day.weekdayEn)}</div>
      <div class="dgh-theme">${t(day.theme, day.themeEn)}</div>
    </div>
    ${day.drive ? `
    <div class="dgh-drive">
      <div class="drive-icon">🚗</div>
      <div class="drive-info">
        <div class="drive-dist">${t(day.drive.distance, day.drive.distanceEn)}</div>
        <div class="drive-time">${t(day.drive.time, day.drive.timeEn)}</div>
      </div>
    </div>` : ''}
  `;
  hdr.onclick = () => { if (activeDay !== dayIdx + 1) selectDay(dayIdx + 1); };
  group.appendChild(hdr);

  // Day note
  if (day.note) {
    const note = document.createElement('div');
    note.className = 'day-note';
    note.textContent = t(day.note, day.noteEn || day.note);
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
    const hasCoords = !!day.accommodation.coords;
    strip.innerHTML = `
      <span class="accom-icon">🏠</span>
      <div class="accom-text">
        <div class="accom-name">${t('住宿', 'Stay')}: ${day.accommodation.name}</div>
        <div class="accom-addr">${day.accommodation.address}</div>
      </div>
      ${hasCoords ? `<a class="gmaps-btn accom-gmaps" href="${gmapsUrl(day.accommodation.coords)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">📍 Maps</a>` : ''}
    `;
    if (hasCoords) {
      strip.style.cursor = 'pointer';
      strip.onclick = () => {
        map.flyTo(day.accommodation.coords, 14, { duration: 0.7 });
        if (accomMarkers[day.accommodation.name]) {
          accomMarkers[day.accommodation.name].openPopup();
        }
      };
    }
    group.appendChild(strip);
  }

  return group;
}

function buildStopCard(stop, num, color) {
  const card = document.createElement('div');
  card.className = 'stop-card';
  card.id = `card-${stop.id}`;
  card.style.setProperty('--day-color', color);

  const intro    = t(stop.intro, stop.introEn);
  const time     = t(stop.time,  stop.timeEn);
  const hasPhotos = stop.photos && stop.photos.length > 0;
  const hasCoords = !!stop.coords;

  card.innerHTML = `
    <div class="sc-row">
      <div class="sc-num" style="background:${color}">${num}</div>
      <div class="sc-body">
        <div class="sc-name">${stopName(stop)}</div>
        ${stopNameAlt(stop) ? `<div class="sc-name-alt">${stopNameAlt(stop)}</div>` : ''}
        <div class="sc-meta">
          <span class="sc-time">🕐 ${time}</span>
          ${hasCoords ? `<a class="gmaps-btn" href="${gmapsUrl(stop.coords)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">📍 Google Maps</a>` : ''}
        </div>
      </div>
    </div>
    <div class="sc-intro">${intro}</div>
    <div class="sc-toggle">${t('點擊展開 ▾', 'Tap to expand ▾')}</div>
    ${hasPhotos ? buildPhotoGrid(stop) : ''}
  `;

  card.onclick = (e) => {
    if (e.target.classList.contains('sc-photo') || e.target.classList.contains('gmaps-btn')) return;
    const expanded = card.classList.toggle('expanded');
    card.querySelector('.sc-toggle').textContent =
      expanded ? t('收起 ▴', 'Collapse ▴') : t('點擊展開 ▾', 'Tap to expand ▾');
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

// ── Map ───────────────────────────────────────────────────────
function renderMap(dayIndex) {
  Object.values(markers).forEach(m => m.remove());
  Object.values(accomMarkers).forEach(m => m.remove());
  markers = {};
  accomMarkers = {};
  routeLines.forEach(l => l.remove());
  routeLines = [];

  const days = dayIndex === 0 ? TRIP_DATA.days : [TRIP_DATA.days[dayIndex - 1]];
  const allCoords = [];

  days.forEach((day) => {
    const dayCoords = [];

    // Stop markers
    day.stops.forEach((stop, si) => {
      if (!stop.coords) return;
      dayCoords.push(stop.coords);
      allCoords.push(stop.coords);
      markers[stop.id] = createStopMarker(stop, si + 1, day.color);
    });

    // Accommodation marker
    if (day.accommodation && day.accommodation.coords) {
      const ac = day.accommodation;
      if (!accomMarkers[ac.name]) {
        accomMarkers[ac.name] = createAccomMarker(ac, day.color);
      }
      // Extend route to accommodation
      if (dayCoords.length > 0) {
        dayCoords.push(ac.coords);
      }
      allCoords.push(ac.coords);
    }

    // Day-colored route segment
    if (dayCoords.length > 1) {
      const line = L.polyline(dayCoords, {
        color: day.color, weight: 3, opacity: 0.65,
        dashArray: '6 9', lineJoin: 'round'
      }).addTo(map);
      routeLines.push(line);
    }
  });

  // Deduplicate allCoords for bounds
  const uniqueCoords = allCoords.filter((c, i, arr) =>
    arr.findIndex(x => x[0] === c[0] && x[1] === c[1]) === i
  );

  if (uniqueCoords.length === 1) {
    map.setView(uniqueCoords[0], 13);
  } else if (uniqueCoords.length > 1) {
    map.fitBounds(L.latLngBounds(uniqueCoords), { padding: [48, 48], maxZoom: 14 });
  }

  // Legend (overview only)
  const legend = document.getElementById('map-legend');
  if (dayIndex === 0) {
    legend.style.display = 'block';
    legend.innerHTML = TRIP_DATA.days.map(d =>
      `<div class="legend-item">
        <div class="legend-dot" style="background:${d.color}"></div>
        <span>${t(d.date + ' ' + d.theme, d.dateEn + ' ' + d.themeEn)}</span>
      </div>`
    ).join('');
  } else {
    legend.style.display = 'none';
  }
}

function createStopMarker(stop, num, color) {
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
  marker.bindPopup(buildStopPopup(stop, num, color), { maxWidth: 260 });
  marker.on('click', () => {
    focusStop(stop, color);
    scrollToCard(stop.id);
  });
  return marker;
}

function createAccomMarker(ac, color) {
  const icon = L.divIcon({
    className: '',
    html: `<div class="map-marker accom-marker" style="background:${color}; border-color:white;">
             <div class="map-marker-inner">🏠</div>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -34]
  });

  const marker = L.marker(ac.coords, { icon }).addTo(map);
  const mapsLink = `<a href="${gmapsUrl(ac.coords)}" target="_blank" rel="noopener" style="color:#4A90D9;font-size:11px;">📍 Google Maps</a>`;
  marker.bindPopup(`
    <div class="popup-wrap">
      <div class="popup-color-bar" style="background:${color}"></div>
      <div class="popup-body">
        <div class="popup-badge" style="background:${color}">🏠 ${t('住宿', 'Accommodation')}</div>
        <div class="popup-name">${ac.name}</div>
        <div class="popup-name-alt">${ac.address}</div>
        <div class="popup-divider"></div>
        ${mapsLink}
      </div>
    </div>
  `, { maxWidth: 240 });
  return marker;
}

function buildStopPopup(stop, num, color) {
  const intro    = t(stop.intro, stop.introEn);
  const time     = t(stop.time,  stop.timeEn);
  const hasPhotos = stop.photos && stop.photos.length > 0;
  const mapsLink = stop.coords
    ? `<a href="${gmapsUrl(stop.coords)}" target="_blank" rel="noopener" class="popup-gmaps">📍 Google Maps</a>`
    : '';

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
        <div class="popup-badge" style="background:${color}">Stop ${num} · ${time}</div>
        <div class="popup-name">${stopName(stop)}</div>
        ${stopNameAlt(stop) ? `<div class="popup-name-alt">${stopNameAlt(stop)}</div>` : ''}
        <div class="popup-divider"></div>
        <div class="popup-intro">${intro}</div>
        ${photoHtml}
        ${mapsLink ? `<div style="margin-top:8px">${mapsLink}</div>` : ''}
      </div>
    </div>
  `;
}

// ── Focus helpers ─────────────────────────────────────────────
function focusStop(stop, color) {
  if (!stop.coords) return;
  activeStopId = stop.id;
  map.flyTo(stop.coords, Math.max(map.getZoom(), 13), { duration: 0.7 });
  if (markers[stop.id]) markers[stop.id].openPopup();
  document.querySelectorAll('.stop-card.active').forEach(c => c.classList.remove('active'));
  const card = document.getElementById(`card-${stop.id}`);
  if (card) card.classList.add('active');
}

function scrollToCard(stopId) {
  const card = document.getElementById(`card-${stopId}`);
  if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── Language toggle ───────────────────────────────────────────
function toggleLang() {
  lang = lang === 'zh' ? 'en' : 'zh';
  document.getElementById('lang-btn').textContent = lang === 'zh' ? 'EN' : '中';
  document.getElementById('trip-title').textContent   = t(TRIP_DATA.title,    TRIP_DATA.titleEn);
  document.getElementById('trip-subtitle').textContent = t(TRIP_DATA.subtitle, TRIP_DATA.subtitleEn);
  buildTabs();
  renderTimeline(activeDay);
  renderMap(activeDay);
}

// ── Lightbox ──────────────────────────────────────────────────
function openLightbox(stopId, photoIndex) {
  const stop = TRIP_DATA.days.flatMap(d => d.stops).find(s => s.id === stopId);
  if (!stop || !stop.photos.length) return;
  lbPhotos = stop.photos.map(p => `photos/${stopId}/${p}`);
  lbIndex  = photoIndex;
  showLightboxPhoto();
  document.getElementById('lightbox').classList.add('open');
  const multi = stop.photos.length > 1;
  document.getElementById('lightbox-prev').style.display = multi ? 'flex' : 'none';
  document.getElementById('lightbox-next').style.display = multi ? 'flex' : 'none';
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
  document.getElementById('lightbox-img').src = '';
}

function onKey(e) {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  lightboxNav(-1);
  if (e.key === 'ArrowRight') lightboxNav(1);
}
