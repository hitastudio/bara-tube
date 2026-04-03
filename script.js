// Memastikan script berjalan setelah HTML selesai dimuat (Cukup SATU KALI saja)
document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================================
    // 1. ANIMASI SCROLL (PINDAH SECTION DENGAN HALUS)
    // ========================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Mencegah lompatan kaku bawaan browser
            
            const targetId = this.getAttribute('href');
            
            // Abaikan jika linknya cuma href="#" (seperti logo atas)
            if (targetId === '#') return; 

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Menghitung posisi target dikurangi tinggi header (sekitar 80px)
                // Ini supaya judul section tidak ketutup oleh header yang sticky
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth' // Memicu animasi scroll halus
                });
            }
        });
    });

    // ========================================================
    // 2. SCRIPT UNTUK ICON BACKGROUND MELAYANG DI AREA ABU-ABU
    // ========================================================
    const wrapper = document.querySelector('.content-wrapper');
    const iconClasses = [
        'fa-brands fa-youtube',
        'fa-solid fa-pause',
        'fa-solid fa-play',
        'fa-solid fa-video',
        'fa-regular fa-circle-play',
        'fa-solid fa-forward-step'
    ];
    
    const iconCount = 35; // Jumlah ikon

    // Pastikan element wrapper ada sebelum menjalankan script ikon
    if (wrapper) {
        for (let i = 0; i < iconCount; i++) {
            let icon = document.createElement('div');
            icon.className = 'bg-icon';
            
            let randomClass = iconClasses[Math.floor(Math.random() * iconClasses.length)];
            icon.innerHTML = `<i class="${randomClass}"></i>`;
            
            let size = Math.random() * 4 + 2; 
            icon.style.fontSize = `${size}rem`;
            icon.style.opacity = Math.random() * 0.15 + 0.05; 
            
            icon.style.left = `${Math.random() * 100}%`;
            icon.style.top = `${Math.random() * 100}%`;
            
            wrapper.appendChild(icon);

            function floatIcon() {
                let newLeft = Math.random() * 100;
                let newTop = Math.random() * 100;
                let newRot = Math.random() * 720 - 360; 
                let duration = Math.random() * 15 + 15; 

                icon.style.transition = `top ${duration}s ease-in-out, left ${duration}s ease-in-out, transform ${duration}s linear`;
                icon.style.left = `${newLeft}%`;
                icon.style.top = `${newTop}%`;
                icon.style.transform = `rotate(${newRot}deg)`;

                setTimeout(floatIcon, duration * 1000);
            }

            setTimeout(floatIcon, Math.random() * 3000);
        }
    }

    // ========================================================
    // 3. SCRIPT UNTUK EFEK LOGO MENONJOL SAAT DI TENGAH
    // ========================================================
    const marqueeContainer = document.querySelector('.client-marquee');
    const marqueeImages = document.querySelectorAll('.marquee-items img');

    function updateCenterFocus() {
        if (!marqueeContainer) return;
        
        // Mencari koordinat tengah dari kotak slider
        const containerRect = marqueeContainer.getBoundingClientRect();
        const containerCenter = containerRect.left + (containerRect.width / 2);

        marqueeImages.forEach(img => {
            const imgRect = img.getBoundingClientRect();
            const imgCenter = imgRect.left + (imgRect.width / 2);

            // Menghitung jarak logo ke titik tengah layar
            const distance = Math.abs(containerCenter - imgCenter);

            // Jika jarak logo ke tengah kurang dari 80px
            if (distance < 80) {
                img.classList.add('pop-out'); // Tambahkan efek membesar
            } else {
                img.classList.remove('pop-out'); // Kembalikan ke ukuran normal
            }
        });

        // Loop fungsi ini terus-menerus
        requestAnimationFrame(updateCenterFocus);
    }

    // Mulai jalankan pelacakannya
    updateCenterFocus();

});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu ul li a');

    // 💡 Fungsi Klik Tombol Hamburger
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active'); // Putar garis jadi X
        navMenu.classList.toggle('active');    // Munculkan menu dari samping
    });

    // 💡 Tutup menu otomatis kalau salah satu link diklik (biar gak ganggu)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});