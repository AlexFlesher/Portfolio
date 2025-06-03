//--------------------------------------------- Intro Animation ---------------------------------------------------//

window.addEventListener("load", () => {
  const overlay = document.getElementById("introOverlay");
  const typingText = document.getElementById("typingText");
  const typingContainer = document.querySelector('.typingContainer');
  const messages = [
    "> Initializing portfolio...",
    "> Loading UI modules...",
    "> Injecting creativity...",
    "> System ready. Welcome, User!"
  ];

  let skipped = false;
  let sequenceDone = false;

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  async function typeMessage(message) {
    typingText.textContent = "";
    for (let i = 0; i <= message.length; i++) {
      if (skipped) return;
      typingText.textContent = message.slice(0, i);
      await delay(30);
    }
  }

  async function eraseMessage() {
    while (typingText.textContent.length > 0) {
      if (skipped) return;
      typingText.textContent = typingText.textContent.slice(0, -1);
      await delay(15);
    }
  }

  async function runSequence() {
    for (let i = 0; i < messages.length - 1 && !skipped; i++) {
      await typeMessage(messages[i]);
      await delay(1000);
      await eraseMessage();
      await delay(300);
    }

    // Final message
    if (!skipped) {
      await typeMessage(messages[messages.length - 1]);
      await delay(1000);
    }

    typingText.textContent = messages[messages.length - 1];
    typingContainer.classList.add('glow-green');
    document.getElementById('skipHint').classList.add('fade-out');
    await delay(1500);
    typingContainer.style.opacity = "0";
    overlay.style.opacity = "0";
    await delay(1000);
    overlay.style.display = "none";
    sequenceDone = true;
  }

  function skipToEnd() {
    if (!sequenceDone && !skipped) {
      skipped = true;
    }
  }

  overlay.addEventListener("click", skipToEnd);
  runSequence();
});

//---------------------------------------------------------------------------------------------------//

//-------------------------------- Hamburger Menu (For Mobile) --------------------------------------//

const hamburger = document.getElementById("hamburger");
const navContainer = document.querySelector(".navContainer");

hamburger.addEventListener("click", () => {
  navContainer.classList.toggle("open");
});

//---------------------------------------------------------------------------------------------------//

//-------------------------------------- Theme Toggle -----------------------------------------------//

const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-mode');
  cursorIcon.src = getCursorIcon(currentMode);

  if (isLight) {
    // We're in light mode now → show moon icon
    themeToggle.classList.remove('uil-sun');
    themeToggle.classList.add('uil-moon');
  } else {
    // Back to dark mode → show sun icon
    themeToggle.classList.remove('uil-moon');
    themeToggle.classList.add('uil-sun');
  }
});

//---------------------------------------------------------------------------------------------------//

//------------------------------------- Cursor Trail Toggle -----------------------------------------//

const cursorIcon = document.getElementById('cursorToggle');
const trailContainer = document.getElementById('cursor-trail-container');

// Modes with matching icons
const trailModes = [
  { name: 'none', icon: 'assets/icons/cursor-none.svg' },
  { name: 'red', icon: 'assets/icons/cursor-red.svg' },
  { name: 'green', icon: 'assets/icons/cursor-green.svg' },
  { name: 'blue', icon: 'assets/icons/cursor-blue.svg' }
];

let currentIndex = 0;
let currentMode = trailModes[currentIndex].name;

// Cycle modes on click
cursorIcon.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % trailModes.length;
  currentMode = trailModes[currentIndex].name;

  // Update icon
  cursorIcon.src = getCursorIcon(currentMode);
});

// Generate trail on mousemove
document.addEventListener('mousemove', (e) => {
  if (currentMode === 'none') return;

  const dot = document.createElement('div');
  dot.classList.add('trail-dot');

  switch (currentMode) {
    case 'red':
      dot.classList.add('trail-red');
      break;
    case 'green':
      dot.classList.add('trail-green');
      break;
    case 'blue':
      dot.classList.add('trail-blue');
      break;
  }

  dot.style.left = `${e.clientX}px`;
  dot.style.top = `${e.clientY}px`;

  trailContainer.appendChild(dot);

  setTimeout(() => {
    trailContainer.removeChild(dot);
  }, 600);
});

function getCursorIcon(mode) {
  const isLight = document.body.classList.contains('light-mode');

  if (mode === 'none') {
    return isLight ? 'assets/icons/cursor-none-black.svg' : 'assets/icons/cursor-none.svg';
  }

  return `assets/icons/cursor-${mode}.svg`;
}

cursorIcon.src = getCursorIcon(currentMode);

//---------------------------------------------------------------------------------------------------//

//---------------------------------- Home Reveal Animation ------------------------------------------//

function initHomeObserver() {
  const homeElements = document.querySelectorAll('.homeText > *, .homeAvatar img');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('show');
        }, index * 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  homeElements.forEach(el => observer.observe(el));
}

function waitForIntroToFinishAndRevealHome() {
  const overlay = document.getElementById("introOverlay");
  const check = () => {
    if (overlay.style.display === "none") {
      initHomeObserver();
    } else {
      requestAnimationFrame(check); // efficient re-check
    }
  };
  check();
}

document.addEventListener("DOMContentLoaded", waitForIntroToFinishAndRevealHome);

//---------------------------------------------------------------------------------------------------//

//---------------------------------------- About Button Toggle ---------------------------------------------//

const toggleBtn = document.getElementById('toggleAbout');
const professional = document.querySelector('.aboutContent.professional');
const personal = document.querySelector('.aboutContent.personal');

toggleBtn.addEventListener('click', () => {
  const showingProfessional = professional.classList.contains('active');

  // Fade out current
  const outgoing = showingProfessional ? professional : personal;
  const incoming = showingProfessional ? personal : professional;

  outgoing.classList.remove('active');
  setTimeout(() => {
    incoming.classList.add('active');
  }, 50); // slight delay helps avoid overlap

  // Update button text
  toggleBtn.textContent = showingProfessional ? 'Switch to Professional' : 'Switch to Personal';
});

//---------------------------------------------------------------------------------------------------//

//----------------------------------------------- About Section Animation -------------------------------------------------//

document.addEventListener("DOMContentLoaded", () => {
  const aboutBox = document.querySelector('.aboutText');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutBox.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(aboutBox);
});

//---------------------------------------------------------------------------------------------------//

//--------------------------------------- Skill Section Animation -------------------------------------------//

document.addEventListener("DOMContentLoaded", () => {
  const skillTiles = document.querySelectorAll('.skillTile');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add delay based on index to stagger the animations
        setTimeout(() => {
          entry.target.classList.add('show');
        }, index * 150); // 150ms between each tile

        observer.unobserve(entry.target); // only animate once
      }
    });
  }, {
    threshold: 1
  });

  skillTiles.forEach(tile => {
    observer.observe(tile);
  });
});

//---------------------------------------------------------------------------------------------------//

//---------------------------------------- Pixel Pets Download PDF ---------------------------------------------//

function confirmDownload() {
  const confirmed = confirm("Do you want to download this PDF?");
  if (confirmed) {
    const link = document.createElement('a');
    link.href = 'assets/PixelPets.pdf';
    link.download = 'PixelPets_Code.pdf';
    link.click();
  }
}

//---------------------------------------------------------------------------------------------------//

//------------------------------------ Schedule Call Button -----------------------------------------//

document.querySelector('.contactEmail').addEventListener('click', () => {
  window.location.href = 'mailto:alexflesher03@gmail.com?subject=Schedule%20a%20Call&body=Hi%20Alex,%0AI\'d%20like%20to%20schedule%20a%20call%20with%20you.';
});

//---------------------------------------------------------------------------------------------------//
