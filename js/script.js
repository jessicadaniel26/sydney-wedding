// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
const navOverlay = document.getElementById('navOverlay');

function closeNav() {
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  siteNav.classList.remove('open');
  navOverlay.classList.remove('open');
}

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navOverlay.classList.toggle('open', isOpen);
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navOverlay.addEventListener('click', closeNav);
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', closeNav));

// ===== Countdown =====
const WEDDING_DATE = new Date('2026-10-18T17:45:00+11:00'); // Sydney time, ceremony arrival

function updateCountdown() {
  const now = new Date();
  const diff = WEDDING_DATE - now;

  const els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins: document.getElementById('cd-mins'),
    secs: document.getElementById('cd-secs'),
  };

  if (diff <= 0) {
    els.days.textContent = '0';
    els.hours.textContent = '0';
    els.mins.textContent = '0';
    els.secs.textContent = '0';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  els.days.textContent = days;
  els.hours.textContent = hours;
  els.mins.textContent = mins;
  els.secs.textContent = secs;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== Add to Calendar (multi-provider dropdown) =====
const EVENT = {
  title: "Jessica & Daniel's Wedding",
  description: "Guest arrival 5:30pm, chuppah 5:45pm sharp. Semi-formal (no ties). Don't forget your dancing shoes!",
  location: 'Zest Waterfront Venues, Spit Road, Mosman NSW, Australia',
  // Sydney is UTC+11 (AEDT) on 18 Oct 2026
  startUTC: '20261018T063000Z',
  endUTC: '20261018T123000Z',
  startLocal: '20261018T173000',
  endLocal: '20261018T233000',
};

const calendarToggle = document.getElementById('calendarToggle');
const calendarMenu = document.getElementById('calendarMenu');
const calDropdown = document.getElementById('calDropdown');

if (calendarToggle) {
  calendarToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = calendarMenu.classList.toggle('open');
    calendarToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (e) => {
    if (!calDropdown.contains(e.target)) {
      calendarMenu.classList.remove('open');
      calendarToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Google Calendar
  document.getElementById('calGoogle').href =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    `&text=${encodeURIComponent(EVENT.title)}` +
    `&dates=${EVENT.startUTC}/${EVENT.endUTC}` +
    `&details=${encodeURIComponent(EVENT.description)}` +
    `&location=${encodeURIComponent(EVENT.location)}`;

  // Outlook.com / Office 365
  document.getElementById('calOutlook').href =
    'https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent' +
    `&subject=${encodeURIComponent(EVENT.title)}` +
    `&startdt=${EVENT.startUTC.replace('Z', '')}Z` +
    `&enddt=${EVENT.endUTC.replace('Z', '')}Z` +
    `&body=${encodeURIComponent(EVENT.description)}` +
    `&location=${encodeURIComponent(EVENT.location)}`;

  // Yahoo Calendar
  document.getElementById('calYahoo').href =
    'https://calendar.yahoo.com/?v=60&view=d&type=20' +
    `&title=${encodeURIComponent(EVENT.title)}` +
    `&st=${EVENT.startUTC}` +
    '&dur=0600' +
    `&desc=${encodeURIComponent(EVENT.description)}` +
    `&in_loc=${encodeURIComponent(EVENT.location)}`;

  // Apple / Outlook desktop (.ics download)
  document.getElementById('calApple').addEventListener('click', (e) => {
    e.preventDefault();
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART;TZID=Australia/Sydney:${EVENT.startLocal}`,
      `DTEND;TZID=Australia/Sydney:${EVENT.endLocal}`,
      `SUMMARY:${EVENT.title}`,
      `LOCATION:${EVENT.location.replace(/,/g, '\\,')}`,
      `DESCRIPTION:${EVENT.description}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jessica-daniel-wedding.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    calendarMenu.classList.remove('open');
  });
}

// ===== Accordion (Q&A) =====
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const panel = trigger.nextElementSibling;
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    trigger.setAttribute('aria-expanded', String(!isOpen));
    panel.style.maxHeight = isOpen ? null : panel.scrollHeight + 'px';
  });
});
