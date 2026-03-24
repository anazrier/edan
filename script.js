// Fungsi untuk memuat file HTML ke dalam container
async function loadComponent(id, url) {
    const element = document.getElementById(id);
    if (element) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            element.innerHTML = html;

            // --- INI TAMBAHAN BARUNYA ---
            // Jika yang baru saja dimuat adalah sidebar, jalankan fungsi deteksi menu aktif
            if (id === 'sidebar-container') {
                setActiveSidebar();
            }

        } catch (error) {
            console.error('Gagal memuat:', url);
        }
    }
}

// Fungsi toggle sidebar untuk Mobile
// function toggleMenu() {
//     const sidebar = document.getElementById('sidebar-container');
//     const navbar = document.querySelector('.navbar-content');
    
//     if (sidebar) {
//         sidebar.classList.toggle('active');
//         // Jika kamu ingin navbar ikut bergeser dan tidak tertutup:
//         // navbar.classList.toggle('sidebar-open'); 
//     }
// }

// Menunggu sampai seluruh halaman dimuat
// Gantikan blok document.addEventListener('DOMContentLoaded', ...) yang lama dengan ini:

document.addEventListener('click', function(e) {
    // 1. Deteksi apakah yang diklik adalah tombol menu burger (atau ikon di dalamnya)
    const menuBtn = e.target.closest('#menu-toggle') || e.target.closest('.menu-btn');
    const sidebar = document.getElementById('sidebar-container');
    
    // Jika tombol burger diklik
    if (menuBtn && sidebar) {
        if (window.innerWidth <= 768) {
            // Mode HP: Munculkan / Sembunyikan sidebar
            sidebar.classList.toggle('active');
        } else {
            // Mode Laptop/PC: Ciutkan / Lebarkan sidebar
            sidebar.classList.toggle('collapsed');
        }
        return; // Hentikan eksekusi di sini agar tidak terdeteksi sebagai "klik di luar"
    }

    // 2. Fitur Tambahan: Tutup sidebar di HP jika klik area di luar sidebar
    if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('active')) {
        // Jika elemen yang diklik BUKAN bagian dari sidebar dan BUKAN tombol navbar
        if (!sidebar.contains(e.target) && !e.target.closest('.navbar-content')) {
            sidebar.classList.remove('active');
        }
    }
});

// Fungsi untuk ganti tab di halaman Biodata
function switchTab(tabId, btnElement) {
    let buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    let contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active-tab'));
    
    if(btnElement) btnElement.classList.add('active');
    let targetContent = document.getElementById(tabId);
    if(targetContent) targetContent.classList.add('active-tab');
}

// --- FUNGSI BARU UNTUK MENDETEKSI MENU AKTIF ---
function setActiveSidebar() {
    // Ambil nama file dari URL browser saat ini (contoh: 'biodata.html')
    // Jika kosong (hanya '/'), anggap saja sedang di 'index.html'
    let currentPath = window.location.pathname.split('/').pop();
    if (currentPath === '' || currentPath === '/') {
        currentPath = 'index.html';
    }

    // Ambil semua link (tag <a>) yang ada di dalam sidebar
    const menuLinks = document.querySelectorAll('.sidebar-menu a');

    menuLinks.forEach(link => {
        // 1. Bersihkan class 'active' dari semua menu biar nggak ada yang dobel
        link.classList.remove('active');

        // 2. Cek apakah isi href menu sama dengan URL saat ini
        const linkHref = link.getAttribute('href');
        
        // 3. Jika cocok, tambahkan class 'active' ke menu tersebut
        if (linkHref === currentPath) {
            link.classList.add('active');
        }
    });
}

// FUNGSI GLOBAL UNTUK SWEETALERT EDUTRACK
function showEdutrackConfirm(title, text, iconType, confirmText, actionCallback) {
    Swal.fire({
        title: title,
        text: text,
        icon: iconType, 
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: 'Batal',
        buttonsStyling: false, 
        customClass: {
            popup: 'eureka-swal-popup',
            title: 'eureka-swal-title',
            confirmButton: 'eureka-btn-confirm',
            cancelButton: 'eureka-btn-cancel'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            actionCallback();
        }
    });
}

// MEMANTAU KLIK UNTUK TOMBOL YANG DIMUAT SECARA DINAMIS
document.addEventListener('click', function(event) {
    // Mengecek apakah elemen yang diklik memiliki class 'done-btn'
    if (event.target && event.target.classList.contains('done-btn')) {
        
        const tombol = event.target;

        // Mencegah pop-up muncul lagi jika tombol sudah berstatus selesai
        if (tombol.disabled) return; 

        // Memanggil fungsi Swal yang sudah kita buat sebelumnya
        showEdutrackConfirm(
            'Tandai Selesai?', 
            'Apakah kamu yakin ingin menandai materi ini sebagai selesai dibaca?', 
            'question', 
            'Ya, Selesai', 
            function() {
                // 1. Munculkan Notifikasi Sukses
                Swal.fire({ 
                    title: 'Selesai!', 
                    text: 'Progress belajar kamu sudah diperbarui.', 
                    icon: 'success', 
                    customClass: { 
                        popup: 'eureka-swal-popup', 
                        title: 'eureka-swal-title', 
                        confirmButton: 'eureka-btn-confirm' 
                    }, 
                    buttonsStyling: false 
                });

                // 2. Ubah Tampilan Tombol Menjadi Hijau
                tombol.innerHTML = '✔ Selesai';
                tombol.style.backgroundColor = '#10B981'; /* Warna hijau */
                tombol.style.color = 'white';
                tombol.style.borderColor = '#10B981';
                tombol.disabled = true; /* Matikan tombol agar tidak bisa diklik lagi */
                tombol.style.cursor = 'not-allowed';
            }
        );
    }
});