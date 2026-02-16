const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const tournament = window.GOLF_DATA.tournaments.find((item) => item.id === id) || window.GOLF_DATA.tournaments[0];
const main = document.getElementById('detailPage');

const date = new Date(tournament.date).toLocaleString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit'
});

main.innerHTML = `
  <section class="detail-hero" style="background-image:url('${tournament.image}')">
    <div class="detail-overlay"></div>
    <div class="container detail-hero-content">
      <h1>${tournament.name}</h1>
      <p>${date}</p>
      <p>${tournament.course} • ${tournament.city}</p>
    </div>
  </section>
  <section class="section container detail-grid">
    <article>
      <h2>About this tournament</h2>
      <p>${tournament.description}</p>
      <p><strong>Entry fee:</strong> ${tournament.fee}</p>
      <p><strong>Included:</strong> ${tournament.includes}</p>
    </article>
    <aside class="detail-panel">
      <h3>Contact</h3>
      <p>Email: <a href="mailto:${tournament.email}">${tournament.email}</a></p>
      <p>Phone: ${tournament.phone || 'N/A'}</p>
      ${
        tournament.registrationUrl
          ? `<a class="btn btn-gold" href="${tournament.registrationUrl}" target="_blank" rel="noopener">External Registration</a>`
          : '<p class="muted">Registration opens soon.</p>'
      }
    </aside>
  </section>
  <section class="container section">
    <h2>Course Location</h2>
    <iframe title="${tournament.course} map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=${encodeURIComponent(
      tournament.course + ' ' + tournament.city + ' Puerto Rico'
    )}&t=&z=12&ie=UTF8&iwloc=&output=embed"></iframe>
  </section>
`;

document.title = `${tournament.name} | GolfPR`;
