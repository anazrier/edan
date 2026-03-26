async function loadComponent(id, url) {
    const element = document.getElementById(id);
    if (element) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            element.innerHTML = html;

            if (id === 'sidebar-container') {
                setActiveSidebar();
            }

        } catch (error) {
            console.error('Gagal memuat:', url);
        }
    }
}

document.addEventListener('click', function(e) {
    const menuBtn = e.target.closest('#menu-toggle') || e.target.closest('.menu-btn');
    const sidebar = document.getElementById('sidebar-container');
    
    if (menuBtn && sidebar) {
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('active');
        } else {
            sidebar.classList.toggle('collapsed');
        }
        return; 
    }

    if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('active')) {
        if (!sidebar.contains(e.target) && !e.target.closest('.navbar-content')) {
            sidebar.classList.remove('active');
        }
    }
});

function switchTab(tabId, btnElement) {
    let buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    let contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active-tab'));
    
    if(btnElement) btnElement.classList.add('active');
    let targetContent = document.getElementById(tabId);
    if(targetContent) targetContent.classList.add('active-tab');
}

function setActiveSidebar() {
    let currentPath = window.location.pathname.split('/').pop();
    if (currentPath === '' || currentPath === '/') {
        currentPath = 'index.html';
    }

    const menuLinks = document.querySelectorAll('.sidebar-menu a');

    menuLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPath) {
            link.classList.add('active');
        }
    });
}

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

document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('done-btn')) {
        const tombol = event.target;
        
        if (tombol.disabled) return; 

        showEdutrackConfirm(
            'Tandai Selesai?', 
            'Apakah kamu yakin ingin menandai materi ini sebagai selesai dibaca?', 
            'question', 
            'Ya, Selesai', 
            function() {
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

                tombol.innerHTML = '✔ Selesai';
                tombol.style.backgroundColor = '#10B981'; 
                tombol.style.color = 'white';
                tombol.style.borderColor = '#10B981';
                tombol.disabled = true; 
                tombol.style.cursor = 'not-allowed';
            }
        );
    }
});

function switchKrsTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("krs-tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("krs-tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

function toggleAccordion(btn) {
    var item = btn.parentElement;
    item.classList.toggle('active');
}

function switchPortofolioTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("portofolio-tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("portofolio-tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

function switchKuesionerTab(evt, tabId) {
    var tabcontent = document.getElementsByClassName("krs-tab-content");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    var tablinks = document.getElementsByClassName("krs-tab-btn");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    document.getElementById(tabId).style.display = "block";
    
    setTimeout(() => {
        document.getElementById(tabId).classList.add("active");
    }, 10);
    
    evt.currentTarget.classList.add("active");
}

function simpanKRS() {
    const totalSKS = document.querySelector('.total-sks-value').innerText;

    Swal.fire({
        title: 'Simpan Rencana Studi?',
        text: `Pastikan total ${totalSKS} yang kamu pilih sudah sesuai.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#58a4df', 
        cancelButtonColor: '#f27a71', 
        confirmButtonText: 'Ya, Simpan!',
        cancelButtonText: 'Cek Lagi'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Berhasil!',
                text: 'Rencana studi kamu telah tersimpan.',
                icon: 'success',
                confirmButtonColor: '#58a4df'
            }).then(() => {
                
            });
        }
    });
}

function tampilkanUbahSandi() {
    Swal.fire({
        title: 'Ubah Kata Sandi?',
        html: `
            <div style="text-align: left; margin-top: 10px;">
                <label style="font-size: 0.9rem; font-weight: 600; color: #333; margin-bottom: 5px; display: block;">Kata Sandi Lama</label>
                <input type="password" id="old-pass" class="swal2-input" placeholder="Masukkan kata sandi lama" style="margin: 0; width: 100%; box-sizing: border-box; font-size: 0.95rem;">
            </div>
            <div style="text-align: left; margin-top: 15px;">
                <label style="font-size: 0.9rem; font-weight: 600; color: #333; margin-bottom: 5px; display: block;">Kata Sandi Baru</label>
                <input type="password" id="new-pass" class="swal2-input" placeholder="Minimal 6 karakter" style="margin: 0; width: 100%; box-sizing: border-box; font-size: 0.95rem;">
            </div>
            <div style="text-align: left; margin-top: 15px; margin-bottom: 10px;">
                <label style="font-size: 0.9rem; font-weight: 600; color: #333; margin-bottom: 5px; display: block;">Konfirmasi Kata Sandi Baru</label>
                <input type="password" id="confirm-pass" class="swal2-input" placeholder="Ketik ulang kata sandi baru" style="margin: 0; width: 100%; box-sizing: border-box; font-size: 0.95rem;">
            </div>
        `,
        icon: 'info', 
        showCancelButton: true,
        confirmButtonColor: '#58a4df',
        cancelButtonColor: '#f27a71',
        confirmButtonText: 'Ya, Simpan',
        cancelButtonText: 'Batal',
        preConfirm: () => {
            const oldPass = document.getElementById('old-pass').value;
            const newPass = document.getElementById('new-pass').value;
            const confirmPass = document.getElementById('confirm-pass').value;

            if (!oldPass || !newPass || !confirmPass) {
                Swal.showValidationMessage('Semua kolom harus diisi!');
                return false;
            }
            if (newPass.length < 6) {
                Swal.showValidationMessage('Kata sandi baru minimal 6 karakter!');
                return false;
            }
            if (newPass !== confirmPass) {
                Swal.showValidationMessage('Konfirmasi kata sandi tidak cocok!');
                return false;
            }
            return true;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Tersimpan!',
                text: 'Kata sandi Anda berhasil diperbarui.',
                icon: 'success',
                confirmButtonColor: '#58a4df'
            });
        }
    })
}

