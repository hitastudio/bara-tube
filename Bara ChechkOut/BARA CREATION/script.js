/* ==========================================================================
   HAMBURGER MENU TOGGLE (Khusus HP)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function() {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const mainNav = document.getElementById("main-nav");
    const navLinks = mainNav.querySelectorAll("a");

    // Jika tombol garis 3 diklik
    hamburgerBtn.addEventListener("click", function() {
        mainNav.classList.toggle("active"); // Buka/Tutup menu
        
        // Ubah ikon garis 3 jadi tanda silang (X) pas terbuka
        const icon = hamburgerBtn.querySelector("i");
        if (mainNav.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });

    // Kalau salah satu menu diklik, otomatis tutup dropdown-nya
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            mainNav.classList.remove("active");
            const icon = hamburgerBtn.querySelector("i");
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        });
    });
});
/* ==========================================================================
   SCROLL REVEAL ANIMATION (Mendeteksi saat section masuk layar)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Pilih semua elemen penting yang mau kita animasikan
    // Kita akan menganimasikan Judul, Kontainer Gambar/Slider, dan Grid Harga
    const elementsToReveal = document.querySelectorAll(`
        .section-title, 
        .comic-container, 
        .ilustrasi-main-container, 
        .mascot-container, 
        .logo-slider-wrapper, .logo-card-container,
        .poster-container,
        .infografis-container,
        .picto-slider-wrapper, .picto-main-container,
        .ppt-slider-wrapper, .ppt-container,
        .brosur-slider-wrapper, .brosur-container,
        .mockup-slider-wrapper, .mockup-container
    `);

    // 2. Tambahkan class 'reveal-on-scroll' ke elemen-elemen tersebut secara otomatis
    elementsToReveal.forEach(el => {
        el.classList.add('reveal-on-scroll');
    });

    // 3. Buat Observer (Pengamat layar)
    const revealOptions = {
        threshold: 0.15, // Elemen mulai muncul saat 15% bagiannya sudah masuk layar
        rootMargin: "0px 0px -50px 0px" // Sedikit margin bawah biar gak terlalu cepat muncul
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return; // Jika belum masuk layar, diamkan
            } else {
                // Jika masuk layar, tambahkan class 'is-visible' untuk memutar animasi
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Hapus komen ini jika animasi cuma mau jalan 1x (tidak berulang saat di-scroll naik turun)
            }
        });
    }, revealOptions);

    // 4. Perintahkan pengamat untuk mulai mengawasi elemen-elemen tadi
    elementsToReveal.forEach(el => {
        revealObserver.observe(el);
    });
});

// ========================================================
// SCRIPT IKON BERTEBANGAN KHUSUS BARA CREATION
// ========================================================

// Mengambil elemen wrapper berdasarkan ID yang sudah ditambahkan di HTML
const wrapper = document.getElementById('floating-icon-wrapper');

// Daftar Class Ikon Diganti Sesuai Tema Bara Creation (Web, Desain, UI/UX, dll)
    const iconClasses = [
        'fa-brands fa-youtube',
        'fa-solid fa-pause',
        'fa-solid fa-play',
        'fa-solid fa-video',
        'fa-regular fa-circle-play',
        'fa-solid fa-forward-step'
    ];

// Jumlah ikon yang akan dibuat
const iconCount = 25; 

// Menjalankan script hanya jika elemen wrapper ditemukan
if (wrapper) {
    for (let i = 0; i < iconCount; i++) {
        // 1. Membuat elemen div untuk ikon
        let icon = document.createElement('div');
        icon.className = 'bg-icon';
        
        // 2. Memilih class ikon secara acak dari daftar
        let randomClass = iconClasses[Math.floor(Math.random() * iconClasses.length)];
        icon.innerHTML = `<i class="${randomClass}"></i>`;
        
        // 3. Menentukan ukuran ikon secara acak (2rem - 6rem)
        let size = Math.random() * 4 + 2; 
        icon.style.fontSize = `${size}rem`;
        
        // 4. Menentukan transparansi ikon (sangat tipis 0.02 - 0.1)
        icon.style.opacity = Math.random() * 0.08 + 0.02; 
        
        // 5. Menentukan posisi awal secara acak
        icon.style.left = `${Math.random() * 100}%`;
        icon.style.top = `${Math.random() * 100}%`;
        
        // 6. Memasukkan ikon ke dalam wrapper
        wrapper.appendChild(icon);

        // Fungsi untuk menggerakkan ikon ke posisi baru secara terus-menerus
        function floatIcon() {
            let newLeft = Math.random() * 100;
            let newTop = Math.random() * 100;
            // Rotasi acak (-360 hingga 360 derajat)
            let newRot = Math.random() * 720 - 360; 
            // Durasi gerakan acak (15s - 30s) agar tidak seragam
            let duration = Math.random() * 15 + 15; 

            // Menerapkan transisi CSS secara dinamis
            icon.style.transition = `top ${duration}s ease-in-out, left ${duration}s ease-in-out, transform ${duration}s linear`;
            
            // Menerapkan posisi dan rotasi baru
            icon.style.left = `${newLeft}%`;
            icon.style.top = `${newTop}%`;
            icon.style.transform = `rotate(${newRot}deg)`;

            // Memanggil kembali fungsi ini setelah durasi gerakan selesai (rekursif)
            setTimeout(floatIcon, duration * 1000);
        }

        // Mulai menggerakkan ikon dengan penundaan acak agar tidak mulai bersamaan
        setTimeout(floatIcon, Math.random() * 3000);
    }
}

/* ==========================================================================
   FUNGSI 3D CAROUSEL UNTUK SECTION LOGO
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.logo-slide');
    if(slides.length === 0) return; // Jika tidak ada slider, abaikan

    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateSlider() {
        slides.forEach((slide, index) => {
            // Hapus semua class status
            slide.classList.remove('active', 'prev', 'next', 'hidden');
            
            // Logika muter
            if (index === currentSlide) {
                slide.classList.add('active'); // Tengah
            } else if (index === (currentSlide - 1 + totalSlides) % totalSlides) {
                slide.classList.add('prev'); // Kiri
            } else if (index === (currentSlide + 1) % totalSlides) {
                slide.classList.add('next'); // Kanan
            } else {
                slide.classList.add('hidden'); // Sembunyi di belakang
            }
        });
    }

    // Fungsi ini dipanggil dari onclick di HTML
    window.moveLogoSlider = function(direction) {
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        updateSlider();
    }

    // Jalankan pertama kali saat web dibuka
    updateSlider();
});

// --- SCRIPT UNTUK SLIDER ILUSTRASI ---
let currentIlustrasiIndex = 0;

function moveIlustrasiSlider(direction) {
    const slides = document.querySelectorAll('.ilustrasi-slide');
    if (slides.length === 0) return;

    let totalSlides = slides.length;
    
    // Logika muter index
    currentIlustrasiIndex = (currentIlustrasiIndex + direction + totalSlides) % totalSlides;
    
    slides.forEach((slide, index) => {
        // Reset
        slide.className = 'ilustrasi-slide'; 
        
        // Atur posisi baru
        if (index === currentIlustrasiIndex) {
            slide.classList.add('active'); // Fokus di tengah
        } else if (index === (currentIlustrasiIndex + 1) % totalSlides) {
            slide.classList.add('next'); // Sisi kanan
        } else if (index === (currentIlustrasiIndex - 1 + totalSlides) % totalSlides) {
            slide.classList.add('prev'); // Sisi kiri
        } else {
            slide.classList.add('hidden'); // Sisanya ngantri di belakang
        }
    });
}

let currentPictoIndex = 0;

function movePictoSlider(direction) {
    const slides = document.querySelectorAll('.picto-slide');
    if (slides.length === 0) return;

    let total = slides.length;
    // Update index (Muter balik kalau sudah sampai ujung)
    currentPictoIndex = (currentPictoIndex + direction + total) % total;

    slides.forEach((slide, index) => {
        // Reset semua class dulu
        slide.className = 'picto-slide';

        if (index === currentPictoIndex) {
            slide.classList.add('active');
        } else if (index === (currentPictoIndex + 1) % total) {
            slide.classList.add('next');
        } else if (index === (currentPictoIndex - 1 + total) % total) {
            slide.classList.add('prev');
        } else {
            slide.classList.add('hidden');
        }
    });
}

let currentPPTIndex = 0;
function movePPTSlider(direction) {
    const slides = document.querySelectorAll('.ppt-slide');
    if (slides.length === 0) return;
    let total = slides.length;
    currentPPTIndex = (currentPPTIndex + direction + total) % total;
    slides.forEach((slide, index) => {
        slide.className = 'ppt-slide';
        if (index === currentPPTIndex) slide.classList.add('active');
        else if (index === (currentPPTIndex + 1) % total) slide.classList.add('next');
        else if (index === (currentPPTIndex - 1 + total) % total) slide.classList.add('prev');
        else slide.classList.add('hidden');
    });
}

let currentBrosurIndex = 0;
function moveBrosurSlider(direction) {
    const slides = document.querySelectorAll('.brosur-slide');
    if (slides.length === 0) return;
    let total = slides.length;
    currentBrosurIndex = (currentBrosurIndex + direction + total) % total;
    slides.forEach((slide, index) => {
        slide.className = 'brosur-slide';
        if (index === currentBrosurIndex) slide.classList.add('active');
        else if (index === (currentBrosurIndex + 1) % total) slide.classList.add('next');
        else if (index === (currentBrosurIndex - 1 + total) % total) slide.classList.add('prev');
        else slide.classList.add('hidden');
    });
}

let currentMockupIndex = 0;

function moveMockupSlider(direction) {
    const slides = document.querySelectorAll('#mock-up .mockup-slide'); 
    if (slides.length === 0) return;
    
    let total = slides.length;
    // Logika berputar melingkar (Carousel)
    currentMockupIndex = (currentMockupIndex + direction + total) % total;
    
    slides.forEach((slide, index) => {
        slide.className = 'mockup-slide'; // Reset class
        
        if (index === currentMockupIndex) {
            slide.classList.add('active'); // Tengah
        } else if (index === (currentMockupIndex + 1) % total) {
            slide.classList.add('next'); // Kanan
        } else if (index === (currentMockupIndex - 1 + total) % total) {
            slide.classList.add('prev'); // Kiri
        } else {
            slide.classList.add('hidden'); // Sisanya sembunyi
        }
    });
}