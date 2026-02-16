const data = window.GOLF_DATA;
const grid = document.getElementById('tournamentsGrid');
const featured = document.getElementById('featuredCourses');
const dateFilter = document.getElementById('dateFilter');
const regionFilter = document.getElementById('regionFilter');
const typeFilter = document.getElementById('typeFilter');
const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const heroSlideshow = document.getElementById('heroSlideshow');
const filterToggle = document.getElementById('filterToggle');
const filterBar = document.getElementById('filterBar');

if (heroSlideshow) {
  data.heroImages.forEach((src, i) => {
    const img = document.createElement('div');
    img.className = `slide ${i === 0 ? 'active' : ''}`;
    img.style.backgroundImage = `url(${src})`;
    heroSlideshow.appendChild(img);
  });

  let idx = 0;
  setInterval(() => {
    const slides = document.querySelectorAll('.slide');
    slides[idx].classList.remove('active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('active');
  }, 4500);
}

const formatDate = (value) =>
  new Date(value).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });

function renderTournaments(items) {
  grid.innerHTML = '';
  if (!items.length) {
    grid.innerHTML = '<p class="muted">No tournaments match the selected filters.</p>';
    return;
  }

  items.forEach((tournament, i) => {
    const card = document.createElement('article');
    card.className = 'card reveal';
    card.style.animationDelay = `${i * 80}ms`;
    card.innerHTML = `
      <a href="tournament.html?id=${tournament.id}" class="card-link" aria-label="View ${tournament.name}">
        <img src="${tournament.image}" alt="${tournament.course}" />
        <div class="card-body">
          <div class="meta-row"><span class="badge ${tournament.registrationOpen ? 'open' : 'closed'}">${tournament.registrationOpen ? 'Open' : 'Closed'}</span><span>${tournament.type}</span></div>
          <h3>${tournament.name}</h3>
          <p>${formatDate(tournament.date)}</p>
          <p>${tournament.course} • ${tournament.city}</p>
          <strong>${tournament.fee}</strong>
        </div>
      </a>
    `;
    grid.appendChild(card);
  });
}

function applyFilters() {
  const days = dateFilter.value;
  const region = regionFilter.value;
  const type = typeFilter.value;
  const now = new Date();

  const filtered = data.tournaments.filter((tournament) => {
    const datePass = days === 'all' || new Date(tournament.date) <= new Date(now.getTime() + Number(days) * 24 * 60 * 60 * 1000);
    const regionPass = region === 'all' || tournament.region === region;
    const typePass = type === 'all' || tournament.type === type;
    return datePass && regionPass && typePass;
  });

  renderTournaments(filtered);
}

if (grid) {
  grid.innerHTML = '<div class="skeleton card-skeleton"></div><div class="skeleton card-skeleton"></div>';
  setTimeout(() => renderTournaments(data.tournaments), 450);
  [dateFilter, regionFilter, typeFilter].forEach((select) => select?.addEventListener('change', applyFilters));
}

if (featured) {
  data.featuredCourses.forEach((course) => {
    const card = document.createElement('div');
    card.className = 'course-card reveal';
    card.innerHTML = `<img src="${course.image}" alt="${course.name}" /><h4>${course.name}</h4>`;
    featured.appendChild(card);
  });
}

window.addEventListener('scroll', () => {
  if (!header) return;
  header.classList.toggle('solid', window.scrollY > 24);
});

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.classList.toggle('open');
  });
}

if (filterToggle && filterBar) {
  filterToggle.addEventListener('click', () => filterBar.classList.toggle('open'));
}

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal, .fade-in-up').forEach((el) => observer.observe(el));
