
document.addEventListener('DOMContentLoaded', () => {

// ========================================================
    // 0. LOADING SCREEN — (SUPER RINGAN, ANTI NGE-HANG)
    // ========================================================
    const preloader = document.getElementById('preloader');
    const loadingBar = document.querySelector('.loading-bar');
    const loadingNumber = document.querySelector('.loading-number');
    const loadingText = document.querySelector('.loading-text');

    document.body.classList.add('no-scroll');

    const images = Array.from(document.images);
    const totalAssets = images.length; // KITA HITUNG FOTO SAJA BIAR CEPAT & RINGAN
    let loadedAssets = 0;

    function finishLoading() {
        if (loadingBar) loadingBar.style.width = '100%';
        if (loadingNumber) loadingNumber.innerText = '100%';
        if (loadingText) loadingText.innerText = 'SEMUA SIAP!';

        setTimeout(() => {
            if (preloader) preloader.classList.add('hilang');
            setTimeout(() => {
                document.body.classList.remove('no-scroll');
            }, 1000);
        }, 500);
    }

    function updateProgress() {
        loadedAssets++;
        const percent = Math.min(Math.floor((loadedAssets / totalAssets) * 100), 100);
        if (loadingBar) loadingBar.style.width = percent + '%';
        if (loadingNumber) loadingNumber.innerText = percent + '%';
        if (loadedAssets >= totalAssets) finishLoading();
    }

    if (totalAssets === 0) {
        finishLoading();
    } else {
        images.forEach(img => {
            img.removeAttribute('loading'); // Hilangkan sifat malas
            if (img.complete) {
                updateProgress();
            } else {
                img.addEventListener('load', updateProgress);
                img.addEventListener('error', updateProgress);
            }
        });
    }

    // Darurat: maksimal 8 detik kebuka paksa
    setTimeout(() => {
        if (document.body.classList.contains('no-scroll') && preloader) {
            finishLoading();
        }
    }, 8000);
    // ========================================================
    // 1. SMOOTH SCROLL NAVIGASI
    // ========================================================
    document.querySelectorAll('nav a[href^="#"], .hero a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================================
    // 2. IKON MELAYANG
    // ========================================================
    const wrapper = document.querySelector('.content-wrapper');
    const iconClasses = [
        'fa-brands fa-youtube', 'fa-solid fa-pause', 'fa-solid fa-play',
        'fa-solid fa-video', 'fa-regular fa-circle-play', 'fa-solid fa-forward-step'
    ];
    if (wrapper) {
        for (let i = 0; i < 35; i++) {
            let icon = document.createElement('div');
            icon.className = 'bg-icon';
            icon.innerHTML = `<i class="${iconClasses[Math.floor(Math.random() * iconClasses.length)]}"></i>`;
            icon.style.fontSize = `${Math.random() * 4 + 2}rem`;
            icon.style.opacity = Math.random() * 0.15 + 0.05;
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
    // 3. SLIDER FOTO PRODUK
    // ========================================================
    const track = document.getElementById('productTrack');
    const btnNext = document.getElementById('btnNext');
    const btnPrev = document.getElementById('btnPrev');

    if (track && btnNext && btnPrev) {
        const slides = document.querySelectorAll('#productTrack .slider-slide');
        const totalSlides = slides.length;
        let currentIndex = 0;

        btnNext.addEventListener('click', () => {
            currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
            updateSlider();
        });
        btnPrev.addEventListener('click', () => {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
            updateSlider();
        });

        function updateSlider() {
            track.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;
            slides.forEach((slide, i) => slide.classList.toggle('active', i === currentIndex));
        }
        updateSlider();
    }

// ========================================================
    // 3B. SLIDER FOTO MODEL (SISTEM GRID 4 FOTO)
    // ========================================================
    const modelTrack = document.getElementById('modelTrack');
    const btnModelNext = document.getElementById('btnModelNext');
    const btnModelPrev = document.getElementById('btnModelPrev');

    if (modelTrack && btnModelNext && btnModelPrev) {
        // Yang dihitung sekarang adalah grup-nya (.ig-slide-group), bukan per foto
        const modelGroups = document.querySelectorAll('#modelTrack .ig-slide-group');
        const totalModelGroups = modelGroups.length;
        let currentModelIndex = 0;

        btnModelNext.addEventListener('click', () => {
            currentModelIndex = currentModelIndex < totalModelGroups - 1 ? currentModelIndex + 1 : 0;
            updateModelSlider();
        });
        
        btnModelPrev.addEventListener('click', () => {
            currentModelIndex = currentModelIndex > 0 ? currentModelIndex - 1 : totalModelGroups - 1;
            updateModelSlider();
        });

        function updateModelSlider() {
            // Geser track sebesar 100% per klik (100% = 1 grup isi 4 foto)
            modelTrack.style.transform = `translate3d(-${currentModelIndex * 100}%, 0, 0)`;
        }
        
        // Pastikan posisi awal benar
        updateModelSlider(); 
    }


// ========================================================
    // 3C. SLIDER SERIES & GANTI EPISODE (MESIN TERBARU)
    // ========================================================
    const seriesTracks = document.querySelectorAll('.series-track');
    const btnSeriesNext = document.getElementById('btnSeriesNext');
    const btnSeriesPrev = document.getElementById('btnSeriesPrev');
    const seriesTitleDisplay = document.getElementById('seriesTitleDisplay');
    const epButtons = document.querySelectorAll('.ep-btn');

    if (seriesTracks.length > 0 && btnSeriesNext && btnSeriesPrev) {
        let currentSeriesIndex = 0;
        let currentEpisode = '1';

        function updateSeriesDisplay() {
            let activeTrack = null;
            let activeSlides = [];

            // 1. Matikan semua track, nyalakan track yang sesuai Episode
            seriesTracks.forEach(track => {
                if (track.getAttribute('data-episode') === currentEpisode) {
                    track.style.display = 'flex'; // Nyalakan kandangnya
                    activeTrack = track;
                    activeSlides = track.querySelectorAll('.slider-slide');
                } else {
                    track.style.display = 'none'; // Sembunyikan yang lain
                }
            });

            if (activeTrack && activeSlides.length > 0) {
                // Jaga-jaga kalau ganti episode, jumlah seriesnya lebih dikit
                if (currentSeriesIndex >= activeSlides.length) {
                    currentSeriesIndex = 0; 
                }

                // 2. Geser track aktif ke gambar yang dipilih
                activeTrack.style.transform = `translate3d(-${currentSeriesIndex * 100}%, 0, 0)`;
                
                // 3. Update efek terang/pudar
                activeSlides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === currentSeriesIndex);
                });

                // 4. Update Teks Judul
                const currentSlide = activeSlides[currentSeriesIndex];
                if (seriesTitleDisplay && currentSlide) {
                    seriesTitleDisplay.innerText = currentSlide.getAttribute('data-title');
                }
            }
        }

        // Tombol Geser Kanan
        btnSeriesNext.addEventListener('click', () => {
            const activeTrack = document.querySelector(`.series-track[data-episode="${currentEpisode}"]`);
            if (activeTrack) {
                const activeSlides = activeTrack.querySelectorAll('.slider-slide');
                currentSeriesIndex = currentSeriesIndex < activeSlides.length - 1 ? currentSeriesIndex + 1 : 0;
                updateSeriesDisplay();
            }
        });
        
        // Tombol Geser Kiri
        btnSeriesPrev.addEventListener('click', () => {
            const activeTrack = document.querySelector(`.series-track[data-episode="${currentEpisode}"]`);
            if (activeTrack) {
                const activeSlides = activeTrack.querySelectorAll('.slider-slide');
                currentSeriesIndex = currentSeriesIndex > 0 ? currentSeriesIndex - 1 : activeSlides.length - 1;
                updateSeriesDisplay();
            }
        });

        // Tombol Klik Pindah Episode
        epButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Ganti warna tombol episode yang nyala
                epButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                // Set episode baru & kembalikan ke gambar pertama
                currentEpisode = e.target.getAttribute('data-ep');
                currentSeriesIndex = 0; 
                updateSeriesDisplay();
            });
        });

        // Jalankan pertama kali saat web dibuka
        updateSeriesDisplay();
    }
    
// ========================================================
    // 4. CAROUSEL KONTEN KREATOR (GESER MANUAL & SENSOR PLAY)
    // ========================================================
    const ccTrack = document.getElementById('ccTrack');
    const btnCcPrev = document.getElementById('btnCcPrev');
    const btnCcNext = document.getElementById('btnCcNext');
    const ccSection = document.getElementById('content-creator'); // Ambil sectionnya untuk sensor

    if (!ccTrack || !btnCcNext || !btnCcPrev) return;

    const originalSlides = Array.from(ccTrack.querySelectorAll('.cc-carousel-slide'));
    const slideCount = originalSlides.length;
    const slideWidth = 300; 

    // Kloning untuk efek Infinite Loop saat digeser manual
    const CLONE_COUNT = 2;
    for (let c = 0; c < CLONE_COUNT; c++) {
        originalSlides.forEach(slide => {
            ccTrack.appendChild(slide.cloneNode(true));
        });
        [...originalSlides].reverse().forEach(slide => {
            ccTrack.insertBefore(slide.cloneNode(true), ccTrack.firstChild);
        });
    }

    const allSlides = Array.from(ccTrack.querySelectorAll('.cc-carousel-slide'));
    let currentCcIndex = CLONE_COUNT * slideCount;
    let isTransitioning = false;
    let isSectionVisible = false; // Penanda apakah section sedang dilihat

    function getOffset(index) {
        const containerWidth = ccTrack.parentElement.offsetWidth;
        return (containerWidth / 2) - (slideWidth / 2) - (index * slideWidth);
    }

    function updateCcSlider(withTransition = true) {
        ccTrack.style.transition = withTransition ? 'transform 0.65s cubic-bezier(0.33, 1, 0.68, 1)' : 'none';
        ccTrack.style.transform = `translate3d(${getOffset(currentCcIndex)}px, 0, 0)`;

        allSlides.forEach((slide, i) => {
            const vid = slide.querySelector('video');
            const isActive = i === currentCcIndex;
            slide.classList.toggle('active', isActive);
            
            if (isActive) {
                // HANYA PLAY JIKA SECTION SEDANG DILIHAT
                if (vid && isSectionVisible) {
                    vid.play().catch(() => {});
                } else if (vid && !isSectionVisible) {
                    vid.pause();
                }
                
                // Update Tulisan Caption
                const captionText = slide.getAttribute('data-caption');
                const captionDisplay = document.getElementById('videoCaptionDisplay');
                if (captionDisplay && captionText) {
                    captionDisplay.innerText = captionText; 
                }
            } else {
                // Pause video yang tidak aktif (di kiri/kanan)
                if (vid) {
                    vid.pause();
                    vid.currentTime = 0;
                }
            }
        });
    }

    function checkAndTeleport() {
        const buffer = CLONE_COUNT * slideCount;
        if (currentCcIndex >= buffer + slideCount) {
            currentCcIndex -= slideCount;
            updateCcSlider(false);
        }
        if (currentCcIndex < buffer) {
            currentCcIndex += slideCount;
            updateCcSlider(false);
        }
    }

    ccTrack.addEventListener('transitionend', () => {
        isTransitioning = false;
        checkAndTeleport();
    });

    // Tombol geser manual
    btnCcNext.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentCcIndex++;
        updateCcSlider(true);
    });

    btnCcPrev.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentCcIndex--;
        updateCcSlider(true);
    });

    // Tombol Mute/Unmute
    ccTrack.addEventListener('click', (e) => {
        const btn = e.target.closest('.mute-btn');
        if (!btn) return;
        e.preventDefault();
        e.stopPropagation();
        const video = btn.closest('.cc-carousel-slide').querySelector('video');
        const icon = btn.querySelector('i');
        video.muted = !video.muted;
        icon.className = video.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
    });

    // SENSOR SCROLL: Matikan video saat keluar dari section Content Creator
    if (ccSection) {
        const ccObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    isSectionVisible = true; // Tandai section sedang dilihat
                    updateCcSlider(false);   // Panggil fungsi untuk play video yang aktif
                } else {
                    isSectionVisible = false; // Tandai section ditinggalkan
                    // Pause SEMUA video di dalam carousel
                    allSlides.forEach(slide => {
                        const vid = slide.querySelector('video');
                        if (vid) vid.pause();
                    });
                }
            });
        }, {
            threshold: 0.2 // Sensor aktif saat 20% section masuk layar
        });

        ccObserver.observe(ccSection);
    }

    window.addEventListener('resize', () => updateCcSlider(false));
    updateCcSlider(false); // Inisiasi awal
    // ========================================================
    // 5. SLIDER INSTAGRAM FEED (CONTENT CREATOR)
    // ========================================================
    const igTrack = document.getElementById('igTrack');
    const btnIgNext = document.getElementById('btnIgNext');
    const btnIgPrev = document.getElementById('btnIgPrev');

    if (igTrack && btnIgNext && btnIgPrev) {
        const igSlideGroups = document.querySelectorAll('#igTrack .ig-slide-group');
        const totalIgGroups = igSlideGroups.length;
        let currentIgIndex = 0;

        function updateIgSlider() {
            igTrack.style.transform = `translate3d(-${currentIgIndex * 100}%, 0, 0)`;
        }

        btnIgNext.addEventListener('click', () => {
            currentIgIndex = currentIgIndex < totalIgGroups - 1 ? currentIgIndex + 1 : 0;
            updateIgSlider();
        });
        
        btnIgPrev.addEventListener('click', () => {
            currentIgIndex = currentIgIndex > 0 ? currentIgIndex - 1 : totalIgGroups - 1;
            updateIgSlider();
        });
    }


// ... (Kode Mbak yang lain di atas) ...

}); // <--- INI ADALAH PENUTUP DOMContentLoaded. 

// ========================================================
// 6. REMOTE CONTROL YOUTUBE API & TOMBOL MUTE
// (KODE INI WAJIB DI LUAR / DI BAWAH PENUTUP DI ATAS)
// ========================================================
// Pakai cara aman untuk memanggil script YouTube
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag); // <--- Saya perbaiki bagian ini biar lebih aman

var ytPlayer;

function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('youtube-player', {
        videoId: '6OKbHpT1HII', 
        playerVars: {
            'autoplay': 1,
            'controls': 0, 
            'mute': 1,     
            'loop': 1,
            'playlist': '6OKbHpT1HII', 
            'modestbranding': 1,
            'rel': 0
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // 1. Hubungkan Tombol Mute
    const btnMute = document.getElementById('movieMuteBtn');
    if (btnMute) {
        btnMute.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (ytPlayer.isMuted()) {
                ytPlayer.unMute(); 
                btnMute.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            } else {
                ytPlayer.mute();   
                btnMute.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            }
        });
    }

    // 2. Sensor Pintar
    const shortMovieSection = document.getElementById('short-movie');
    if (shortMovieSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    ytPlayer.playVideo();
                } else {
                    ytPlayer.pauseVideo();
                }
            });
        }, { threshold: 0.3 });
        observer.observe(shortMovieSection);
    }
}