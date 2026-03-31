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