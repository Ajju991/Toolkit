<!-- Add before closing </body> -->
<script>
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
</script>
<script>
  document.querySelector('form').addEventListener('submit', function (e) {
    const name = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();

    if (!name || !email) {
      alert('Please fill in all fields');
      e.preventDefault(); // Stop form from submitting
    }
  });
</script>
