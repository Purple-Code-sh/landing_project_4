// Mobile menu toggle with smooth animation
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
let isAnimating = false;

function closeMenu() {
  if (isAnimating) return;
  isAnimating = true;

  // Closing animation
  mobileMenu.style.opacity = '1';
  mobileMenu.style.transform = 'translateY(0)';
  mobileMenu.style.transition = 'all 0.3s ease-in-out';

  setTimeout(() => {
    mobileMenu.style.opacity = '0';
    mobileMenu.style.transform = 'translateY(-1rem)';
  }, 0);

  setTimeout(() => {
    mobileMenu.classList.add('hidden');
    menuIcon.innerHTML = `
      <line x1="4" y1="12" x2="20" y2="12"></line>
      <line x1="4" y1="6" x2="20" y2="6"></line>
      <line x1="4" y1="18" x2="20" y2="18"></line>
    `;
    isAnimating = false;
  }, 300);
}

function openMenu() {
  if (isAnimating) return;
  isAnimating = true;

  // Opening animation
  mobileMenu.classList.remove('hidden');
  mobileMenu.style.opacity = '0';
  mobileMenu.style.transform = 'translateY(-1rem)';
  mobileMenu.style.transition = 'all 0.3s ease-in-out';

  setTimeout(() => {
    mobileMenu.style.opacity = '1';
    mobileMenu.style.transform = 'translateY(0)';
    menuIcon.innerHTML = `
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    `;
  }, 0);

  setTimeout(() => {
    isAnimating = false;
  }, 300);
}

mobileMenuButton.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

const menuItems = mobileMenu.querySelectorAll('a');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    if (!mobileMenu.classList.contains('hidden')) {
      closeMenu();
    }
  });
});
