
    /* --- Inisialisasi Variabel --- */
    let currentTaskId = "";

    /* --- Kontrol Interaksi Materi --- */
    function toggleDetails(id) {
        document.getElementById(id).classList.toggle('active');
    }

    // [PERBAIKAN]: Tambahkan parameter 'event' di sini
    function toggleDone(event, id) {
        // Mencegah trigger buka-tutup materi saat klik area done
        event.stopPropagation();
        const element = document.querySelector(`#${id} .floating-done`);
        element.classList.toggle('is-done');
        updateGlobalProgress();
    }

    /* --- Manajemen Modal Tugas --- */
    function openModal(title, taskId) {
        currentTaskId = taskId;
        document.getElementById('modalTitle').innerText = title;
        document.getElementById('uploadModal').classList.add('active'); // Memakai class 'active'
    }

    function closeModal() {
        const fileInput = document.getElementById('fileInput');

        // Konfirmasi jika ada file yang sudah dipilih
        if (fileInput.value !== "") {
            Swal.fire({
                title: '<strong style="color: #333333;">Batalkan Unggahan?</strong>',
                html: '<span style="color: #555555;">File yang sudah Anda pilih tidak akan tersimpan.</span>',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#f27a71', // Coral soft untuk aksi membatalkan (hapus)
                cancelButtonColor: '#58a4df',  // Biru pastel untuk aksi aman (kembali)
                confirmButtonText: 'Ya, Batalkan',
                cancelButtonText: 'Kembali',
                reverseButtons: true, // Tombol "Kembali" di kiri, "Batalkan" di kanan
                background: '#ffffff', // MENGUNCI LATAR JADI PUTIH
                color: '#333333'       // MENGUNCI TEKS JADI GELAP
            }).then((result) => {
                if (result.isConfirmed) {
                    resetAndClose();
                }
            });
        } else {
            // Jika tidak ada file yang dipilih, langsung tutup saja tanpa peringatan
            resetAndClose();
        }
    }

    function resetAndClose() {
        document.getElementById('uploadModal').classList.remove('active');
        document.getElementById('fileInput').value = "";
        document.getElementById('fileNameDisplay').innerText = "";
    }

    /* --- Validasi & Pengiriman File --- */
    function updateFileName() {
        const input = document.getElementById('fileInput');
        const display = document.getElementById('fileNameDisplay');
        display.innerText = input.files.length > 0 ? "Siap kirim: " + input.files[0].name : "";
    }

    function submitTask() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    // 1. Validasi jika file kosong
    if (!file) {
        Swal.fire({
            icon: 'warning',
            title: '<strong style="color: #333333;">File Belum Dipilih</strong>',
            html: '<span style="color: #555555;">Silakan lampirkan file tugas terlebih dahulu.</span>',
            confirmButtonColor: '#58a4df',
            background: '#ffffff',
            color: '#333333' 
        });
        return;
    }

    // Hitung ukuran file
    let fileSize = (file.size / 1024).toFixed(1) + ' KB';
    if (file.size > 1024 * 1024) {
        fileSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    }

    // 2. Konfirmasi Pengiriman
    Swal.fire({
        title: '<strong style="color: #333333;">Kirim Tugas?</strong>', // Memastikan judul berwarna gelap tebal
        icon: 'question',
        html: `
            <div style="background-color: #f8fbff; border: 1px solid #eef2f7; border-radius: 16px; padding: 16px; margin: 15px 0 5px 0; display: flex; align-items: center; gap: 16px; text-align: left; box-shadow: 0 4px 12px rgba(88, 164, 223, 0.05);">
                <div style="background-color: #e1effa; width: 48px; height: 48px; border-radius: 12px; display: flex; justify-content: center; align-items: center; color: #58a4df; font-size: 1.5rem; flex-shrink: 0;">
                    <i class="fas fa-file-alt"></i>
                </div>
                <div style="overflow: hidden; flex-grow: 1;">
                    <h4 style="margin: 0 0 4px 0; font-size: 1rem; color: #25396f; font-weight: 700; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;" title="${file.name}">
                        ${file.name}
                    </h4>
                    <span style="font-size: 0.85rem; color: #555555; font-weight: 500;">
                        ${fileSize}
                    </span>
                </div>
            </div>
            <p style="font-size: 0.95rem; color: #555555; margin-top: 15px; font-weight: 500;">Pastikan file yang dilampirkan sudah benar.</p>
        `,
        showCancelButton: true,
        confirmButtonColor: '#58a4df',
        cancelButtonColor: '#f27a71',
        confirmButtonText: 'Ya, Kirim',
        cancelButtonText: 'Batal',
        reverseButtons: true,
        focusConfirm: false,
        background: '#ffffff', 
        color: '#333333'       
    }).then((result) => {
        
        // 3. Jika diklik "Ya, Kirim"
        if (result.isConfirmed) {
            
            let timerInterval;
            Swal.fire({
                title: '<strong style="color: #58a4df;">Sedang Mengunggah...</strong>', // Judul loading biru pastel
                html: '<span style="color: #555555; font-weight: 500;">Mohon tunggu sebentar.</span>', // Teks abu-abu tegas
                timer: 1500,
                timerProgressBar: true,
                allowOutsideClick: false,
                background: '#ffffff', 
                color: '#58a4df',      
                didOpen: () => {
                    Swal.showLoading();
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            }).then(() => {
                
                // Ubah status tombol tugas
                const btn = document.querySelector(`#${currentTaskId} .task-btn`);
                if (btn) {
                    btn.innerHTML = '<i class="fas fa-check"></i> Selesai';
                    btn.classList.add('submitted');
                    btn.onclick = null;
                    btn.style.backgroundColor = '#f0f9eb';
                    btn.style.color = '#52c41a';
                    btn.style.border = '1px solid #e1f3d8';
                }

                // Popup Sukses
                Swal.fire({
                    title: '<strong style="color: #333333;">Berhasil!</strong>',
                    html: '<span style="color: #555555;">File tugas Anda telah diserahkan.</span>',
                    icon: 'success',
                    confirmButtonColor: '#58a4df',
                    background: '#ffffff', 
                    color: '#333333'       
                }).then(() => {
                    resetAndClose();
                    updateGlobalProgress();
                });

            });
        }
    });
}

    /* --- Kalkulasi Progress Bar --- */
    function updateGlobalProgress() {
        const fill = document.getElementById('mainProgress');
        const doneMateri = document.querySelectorAll('.floating-done.is-done').length;
        const doneTugas = document.querySelectorAll('.task-btn.submitted').length;

    let newWidth = 40 + (doneMateri * 10) + (doneTugas * 20);
    if (newWidth > 100) newWidth = 100;

        if (fill) {
            fill.style.width = newWidth + "%";
        }
    }
