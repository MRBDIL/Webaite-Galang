// === Navbar toggle ===
document.addEventListener('DOMContentLoaded', function() {
  const navbarToggle = document.getElementById('navbar-toggle');
  const sidebar = document.getElementById('sidebar');
  const closeSidebar = document.getElementById('close-sidebar');
  const overlay = document.getElementById('overlay');
  const themeToggle = document.getElementById('checkbox');
  const sidebarThemeToggle = document.getElementById('sidebar-checkbox');
/* scroll effect */
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 20) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});
  // Close sidebar on window resize if screen becomes larger
  window.addEventListener('resize', function() {
    if (window.innerWidth > 992 && sidebar.classList.contains('active')) {
      closeSidebarMenu();
    }
  });
    // Toggle sidebar on menu button click
  navbarToggle.addEventListener('click', function() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  // Close sidebar function
  function closeSidebarMenu() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Close sidebar on X button click
  closeSidebar.addEventListener('click', closeSidebarMenu);
  
  // Close sidebar on overlay click
  overlay.addEventListener('click', closeSidebarMenu);
});


document.addEventListener('DOMContentLoaded', function () {

  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;

  // Efek scroll warna + hide/show
  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;

    // ---- Ubah warna ketika scroll > 20px ----
    if (scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }


  });

});


// Scroll button (cek dulu elemennya)
document.addEventListener("DOMContentLoaded", function () {
    const list = document.getElementById("customer-list");
    const btnLeft = document.getElementById("scroll-left");
    const btnRight = document.getElementById("scroll-right");

    const scrollStep = 1000;

    function updateButtons() {
        btnLeft.style.opacity = list.scrollLeft <= 0 ? 0.3 : 1;
        btnRight.style.opacity =
            list.scrollLeft + list.clientWidth >= list.scrollWidth ? 0.3 : 1;
    }

    btnRight.addEventListener("click", () => {
        list.scrollBy({ left: scrollStep, behavior: "smooth" });
        setTimeout(updateButtons, 600);
    });

    btnLeft.addEventListener("click", () => {
        list.scrollBy({ left: -scrollStep, behavior: "smooth" });
        setTimeout(updateButtons, 600);
    });

    list.addEventListener("scroll", updateButtons);

    updateButtons();
});

// Floating Chat
document.addEventListener("DOMContentLoaded", () => {

  const mainFab       = document.getElementById("mainFab");
  const socialMenu    = document.getElementById("socialMenu");
  const waButton      = document.getElementById("waButton");
  const chatPopup     = document.getElementById("chatPopup");
  const closePopupBtn = document.getElementById("closePopupBtn");

  let menuOpen = false; // track status menu utama

  // === TOGGLE MAIN BUTTON ===
  mainFab.addEventListener("click", (e) => {
    e.stopPropagation();
    menuOpen = !menuOpen;

    if (menuOpen) {
      // buka menu
      socialMenu.classList.add("show");
      // PENTING: popup WA TIDAK ditutup
    } else {
      // tutup menu utama
      socialMenu.classList.remove("show");
      // popup WA ikut ditutup
      chatPopup.style.display = "none";
    }
  });

  // === BUKA POPUP WA ===
  waButton.addEventListener("click", (e) => {
    e.stopPropagation();

    // popup WA muncul, tapi menu sosial tidak ditutup
    chatPopup.style.display = "block";
  });

  // === TUTUP POPUP WA DARI TOMBOL X ===
  closePopupBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    chatPopup.style.display = "none";
  });

  // === KLIK LUAR ===
  document.addEventListener("click", () => {
    // hanya tutup popup jika main menu memang sedang ditutup
    if (!menuOpen) {
      chatPopup.style.display = "none";
      socialMenu.classList.remove("show");
    }
  });

  // cegah klik dalam popup menutup semuanya
  chatPopup.addEventListener("click", (e) => e.stopPropagation());
});



// News media
const beritas = document.querySelectorAll('.berita');
const nextBtn = document.querySelector('.news-btn.next');
const prevBtn = document.querySelector('.news-btn.prev');
let currentBerita = 0;

function showBerita(index) {
  beritas.forEach((berita, i) => {
    berita.classList.remove('active');
    if (i === index) berita.classList.add('active');
  });
}

// Tombol Next
nextBtn.addEventListener('click', () => {
  currentBerita = (currentBerita + 1) % beritas.length;
  showBerita(currentBerita);
});

// Tombol Prev
prevBtn.addEventListener('click', () => {
  currentBerita = (currentBerita - 1 + beritas.length) % beritas.length;
  showBerita(currentBerita);
});

// Auto slide tiap 5 detik
setInterval(() => {
  currentBerita = (currentBerita + 1) % beritas.length;
  showBerita(currentBerita);
}, 10000);

const tabs = document.querySelectorAll(".filter-tab");
const beritaGrid = document.getElementById("beritaGrid");
let beritaCards = [];

// Fungsi untuk load berita (fix bug fallback)
function loadBeritaFromStorage() {
    console.log('Memulai loadBeritaFromStorage...');
    try {
        const storedBerita = JSON.parse(localStorage.getItem('berita')) || [];
        console.log('Loading berita dari localStorage:', storedBerita.length, 'item');
        
        if (storedBerita.length > 0) {
            // Jika ada data admin, clear grid dan append dari localStorage
            beritaGrid.innerHTML = '';
            storedBerita.forEach(item => {
                const article = document.createElement('article');
                article.className = 'berita-card';
                article.dataset.date = item.tanggal;
                article.innerHTML = `
                    <a href="#">
                        <img src="${item.gambar}" alt="">
                        <h3>${item.judul}</h3>
                        <p class="konten">${item.konten || 'Tidak ada konten'}</p>
                    </a>
                    <p class="tanggal">${formatTanggal(item.tanggal)}</p>
                `;
                beritaGrid.appendChild(article);
            });
            console.log('Berita dari admin dimuat dan ditampilkan');
        } else {
            // Jika localStorage kosong, gunakan HTML statis (jangan clear grid)
            console.log('localStorage kosong, menggunakan HTML statis');
            // Tidak perlu innerHTML = '', biarkan HTML statis tetap ada
        }
        beritaCards = Array.from(beritaGrid.children); // Ambil dari grid (baik dari admin atau statis)
        console.log('beritaCards setelah load:', beritaCards.length, 'item');
        if (beritaCards.length === 0) {
            console.warn('Tidak ada berita di HTML statis! Pastikan artikel ada di beritaGrid.');
        }
    } catch (error) {
        console.error('Error di loadBeritaFromStorage:', error);
    }
}

// Fungsi format tanggal (sama)
function formatTanggal(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Fungsi sort berita (sama)
function sortBerita(order = "newest") {
    console.log('Sorting berita dengan order:', order, '| beritaCards sebelum sort:', beritaCards.length);
    if (beritaCards.length === 0) {
        console.warn('Tidak ada berita untuk di-sort! Load berita dulu.');
        return;
    }
    
    try {
        const validCards = beritaCards.filter(card => {
            const date = new Date(card.dataset.date);
            const isValid = !isNaN(date.getTime());
            if (!isValid) console.warn('Tanggal invalid di card:', card.dataset.date);
            return isValid;
        });
        
        const sorted = validCards.sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return order === "newest" ? dateB - dateA : dateA - dateB;
        });
        
        console.log('Berita setelah sort:', sorted.length, 'item valid');
        beritaGrid.classList.add("fade");
        setTimeout(() => {
            beritaGrid.innerHTML = "";
            sorted.forEach(card => beritaGrid.appendChild(card));
            beritaGrid.classList.remove("fade");
            beritaCards = Array.from(beritaGrid.children);
            console.log('Grid di-update, beritaCards sekarang:', beritaCards.length);
        }, 250);
    } catch (error) {
        console.error('Error di sortBerita:', error);
    }
}

// Event listener untuk tab filter (sama)
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        console.log('Tab diklik:', tab.dataset.filter);
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        
        const filterType = tab.dataset.filter;
        sortBerita(filterType);
    });
});

// Load dan sort awal
console.log('Inisialisasi halaman...');
loadBeritaFromStorage();
sortBerita("newest");

// Reveal on scroll (sama)
const reveals = document.querySelectorAll(".reveal");
function revealOnScroll() {
    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add("show");
        }
    });
}
window.addEventListener("scroll", revealOnScroll);



// intro 
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".tes").forEach(el => observer.observe(el));
});
var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 3,
    slideShadows: true
  },
  keyboard: { enabled: true },
  mousewheel: { thresholdDelta: 70 },
  loop: true,
  pagination: {
      el: ".swiper-pagination",
      clickable: true
  },
  breakpoints: {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 1 },
    1024: { slidesPerView: 2 },
    1560: { slidesPerView: 3 }
  }
});


feather.replace();
