const form = document.getElementById('tournamentForm');
const confirmation = document.getElementById('confirmation');
const select = form?.querySelector('select[name="course"]');
const description = form?.querySelector('textarea[name="description"]');
const charCount = document.getElementById('charCount');

if (select) {
  window.GOLF_DATA.courses.forEach((course) => {
    const option = document.createElement('option');
    option.value = course;
    option.textContent = course;
    select.appendChild(option);
  });
}

description?.addEventListener('input', () => {
  charCount.textContent = `${description.value.length} / 500`;
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const file = form.image.files[0];
  if (file && file.size > 5 * 1024 * 1024) {
    alert('Please upload an image smaller than 5MB.');
    return;
  }

  const payload = Object.fromEntries(new FormData(form).entries());
  console.log('Submission payload (send to Supabase/Firebase/Airtable):', payload);

  form.hidden = true;
  confirmation.hidden = false;
});
