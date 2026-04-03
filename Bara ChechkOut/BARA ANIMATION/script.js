/* ==========================================================================
   HAMBURGER MENU TOGGLE (Animasi X & Dropdown)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function() {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const mainNav = document.getElementById("main-nav");
    const navLinks = mainNav.querySelectorAll("a");

    // Jika tombol diklik
    hamburgerBtn.addEventListener("click", function() {
        hamburgerBtn.classList.toggle("active"); // Putar garis jadi X
        mainNav.classList.toggle("active");      // Turunkan menu dropdown
    });

    // Jika salah satu menu ditekan, otomatis tutup
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            hamburgerBtn.classList.remove("active"); // Balikin X jadi garis 3
            mainNav.classList.remove("active");      // Naikkan menu
        });
    });
});
// --- ANIMASI SCROLL MULUS (FIX BERANDA) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            let targetPosition;

            // 💡 KUNCI: Cek apakah yang diklik itu Beranda atau bukan
            if (targetId === "#beranda") {
                // Kalau Beranda, langsung tancap gas ke paling atas layar
                targetPosition = 30;
            } else {
                // Kalau section lain, baru kita hitung jarak aman dari header
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // Atur extraGap di sini (jangan pakai minus kalau mau nurun ke bawah)
                // 20 sampai 40 biasanya sudah cukup manis
                const extraGap = -130; 
                targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (headerHeight + extraGap);
            }

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth' 
            });
        }
    });
});
// ========================================================
// 1. SCRIPT IKON BERTEBANGAN
// ========================================================
const wrapper = document.getElementById('floating-icon-wrapper');
const iconClasses = ['fa-brands fa-youtube', 'fa-solid fa-pause', 'fa-solid fa-play', 'fa-solid fa-video', 'fa-regular fa-circle-play', 'fa-solid fa-forward-step'];

if (wrapper) {
    for (let i = 0; i < 25; i++) {
        let icon = document.createElement('div');
        icon.className = 'bg-icon';
        let randomClass = iconClasses[Math.floor(Math.random() * iconClasses.length)];
        icon.innerHTML = `<i class="${randomClass}"></i>`;
        icon.style.fontSize = `${Math.random() * 4 + 2}rem`;
        icon.style.opacity = Math.random() * 0.08 + 0.02; 
        icon.style.left = `${Math.random() * 100}%`;
        icon.style.top = `${Math.random() * 100}%`;
        wrapper.appendChild(icon);
        function floatIcon() {
            let duration = Math.random() * 15 + 15; 
            icon.style.transition = `top ${duration}s ease-in-out, left ${duration}s ease-in-out, transform ${duration}s linear`;
            icon.style.left = `${Math.random() * 100}%`;
            icon.style.top = `${Math.random() * 100}%`;
            icon.style.transform = `rotate(${Math.random() * 720 - 360}deg)`;
            setTimeout(floatIcon, duration * 1000);
        }
        setTimeout(floatIcon, Math.random() * 3000);
    }
}

// ========================================================
// 2. SCRIPT YOUTUBE API (LONG, SHORT & VFX)
// ========================================================
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var playerLong, playerShort, playerVfx;

function onYouTubeIframeAPIReady() {
    // Player 1 (Long)
    playerLong = new YT.Player('yt-player-long', {
        videoId: '0O-C_U5kK_4',
        playerVars: { 'autoplay': 0, 'controls': 0, 'mute': 1, 'loop': 1, 'playlist': '0O-C_U5kK_4' },
        events: { 'onReady': (e) => setupControls(e, 'mute-btn-long', 'section-long', playerLong) }
    });

    // Player 2 (Short)
    playerShort = new YT.Player('yt-player-short', {
        videoId: 'Jyj08s03jrk', 
        playerVars: { 'autoplay': 0, 'controls': 0, 'mute': 1, 'loop': 1, 'playlist': 'Jyj08s03jrk' },
        events: { 'onReady': (e) => setupControls(e, 'mute-btn-short', 'section-short', playerShort) }
    });

    // Player 3 (VFX 2D)
    playerVfx = new YT.Player('yt-player-vfx', {
        videoId: 'IJ1XJDuerVI', 
        playerVars: { 'autoplay': 0, 'controls': 0, 'mute': 1, 'loop': 1, 'playlist': 'IJ1XJDuerVI' },
        events: { 'onReady': (e) => setupControls(e, 'mute-btn-vfx', 'vfx-2d', playerVfx) }
    });
}

// INI DIA MESIN PENGGERAKNYA (Jangan sampai hilang ya Mbak! 😆)
function setupControls(event, btnId, sectionId, playerInstance) {
    const section = document.getElementById(sectionId);
    if (section) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    playerInstance.playVideo(); // Muter otomatis pas discroll
                } else {
                    playerInstance.pauseVideo(); // Pause pas ditinggal
                }
            });
        }, { threshold: 0.3 });
        observer.observe(section);
    }

    const btnMute = document.getElementById(btnId);
    if (btnMute) {
        btnMute.addEventListener('click', function(e) {
            e.preventDefault();
            if (playerInstance.isMuted()) {
                playerInstance.unMute();
                btnMute.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            } else {
                playerInstance.mute();
                btnMute.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            }
        });
    }
}
// ========================================================
// 3. SCRIPT KHUSUS VIDEO MP4 LOKAL (GAME & STORYBOARD)
// ========================================================
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi universal untuk handle Video Lokal (Mute & Scroll Autoplay)
    function handleLocalVideo(videoId, btnId, sectionId) {
        const video = document.getElementById(videoId);
        const btn = document.getElementById(btnId);
        const section = document.getElementById(sectionId);

        if (video && btn) {
            // 1. Fungsi Tombol Mute
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                if (video.muted) {
                    video.muted = false;
                    btn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
                } else {
                    video.muted = true;
                    btn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
                }
            });

            // 2. Fungsi Autoplay saat di-scroll (Intersection Observer)
            if (section) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            video.play(); // Muter pas kelihatan
                        } else {
                            video.pause(); // Berhenti pas nggak kelihatan
                        }
                    });
                }, { threshold: 0.3 });
                observer.observe(section);
            }
        }
    }

    // Jalankan untuk Video Game
    handleLocalVideo('local-video-game', 'mute-btn-game', 'section-game');

    // Jalankan untuk Video Storyboard
    handleLocalVideo('local-video-sb', 'mute-btn-sb', 'storyboard');
});

// ========================================================
// 4. SCRIPT SLIDER ARTBOOK (UPDATE: GESER PER 2 FOTO)
// ========================================================
document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('slider-track');
    const btnPrev = document.getElementById('slider-prev');
    const btnNext = document.getElementById('slider-next');
    const dotsContainer = document.getElementById('slider-dots');

    if (!track) return;

    const slides = track.querySelectorAll('.artbook-slide');
    const totalSlides = slides.length;
    let currentPage = 0;
    let autoTimer;

    function getItemsPerPage() {
        return window.innerWidth <= 768 ? 1 : 2;
    }

    function setupDots() {
        dotsContainer.innerHTML = '';
        const totalPages = Math.ceil(totalSlides / getItemsPerPage());
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => {
                goTo(i);
                resetTimer();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function goTo(pageIndex) {
        const itemsPerPage = getItemsPerPage();
        const totalPages = Math.ceil(totalSlides / itemsPerPage);

        if (pageIndex < 0) pageIndex = totalPages - 1;
        if (pageIndex >= totalPages) pageIndex = 0;
        currentPage = pageIndex;

        const slideWidth = slides[0].offsetWidth;
        const indexToScroll = currentPage * itemsPerPage;
        track.scrollTo({ left: (slideWidth + 20) * indexToScroll, behavior: 'smooth' });

        // 💡 KUNCI FIX: Hanya ubah dot yang ada di dalam slider Artbook
        dotsContainer.querySelectorAll('.slider-dot').forEach((d, i) => {
            d.classList.toggle('active', i === currentPage);
        });
    }

    function resetTimer() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => goTo(currentPage + 1), 5000); 
    }

    btnPrev.addEventListener('click', () => {
        goTo(currentPage - 1);
        resetTimer();
    });

    btnNext.addEventListener('click', () => {
        goTo(currentPage + 1);
        resetTimer();
    });

    window.addEventListener('resize', () => {
        setupDots();
        goTo(0);
    });

    setupDots();
    resetTimer();
});

// ========================================================
// 5. SCRIPT SLIDER VOICE ACTOR (UPDATE: 4 DI HP, 8 DI PC)
// ========================================================
document.addEventListener('DOMContentLoaded', function () {
    const trackVA = document.getElementById('va-track');
    const btnPrevVA = document.getElementById('va-prev');
    const btnNextVA = document.getElementById('va-next');
    const dotsContainerVA = document.getElementById('va-dots');

    if (!trackVA) return;

    const slidesVA = trackVA.querySelectorAll('.va-slide');
    const totalSlidesVA = slidesVA.length;
    let currentVA = 0;

    // Deteksi: Buka di HP (1 slide = 4 org) atau PC (2 slide = 8 org)
    function getVAItemsPerPage() {
        return window.innerWidth <= 768 ? 1 : 2;
    }

    function setupVADots() {
        dotsContainerVA.innerHTML = '';
        const totalPages = Math.ceil(totalSlidesVA / getVAItemsPerPage());
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToVA(i));
            dotsContainerVA.appendChild(dot);
        }
    }

    function goToVA(pageIndex) {
        const itemsPerPage = getVAItemsPerPage();
        const totalPages = Math.ceil(totalSlidesVA / itemsPerPage);

        if (pageIndex < 0) pageIndex = totalPages - 1;
        if (pageIndex >= totalPages) pageIndex = 0;
        currentVA = pageIndex;

        const slideWidth = slidesVA[0].offsetWidth;
        const indexToScroll = currentVA * itemsPerPage;
        
        trackVA.scrollTo({ left: slideWidth * indexToScroll, behavior: 'smooth' });

        dotsContainerVA.querySelectorAll('.slider-dot').forEach((d, i) => {
            d.classList.toggle('active', i === currentVA);
        });
    }

    btnPrevVA.addEventListener('click', () => goToVA(currentVA - 1));
    btnNextVA.addEventListener('click', () => goToVA(currentVA + 1));

    window.addEventListener('resize', () => {
        setupVADots();
        goToVA(0);
    });

    setupVADots();
});