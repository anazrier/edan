/* --- Inisialisasi Variabel --- */
let currentTaskId = "";

/* --- Kontrol Interaksi Materi --- */
function toggleDetails(id) {
    document.getElementById(id).classList.toggle('active');
}

function toggleDone(id) {
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
    document.getElementById('uploadModal').classList.add('active');
}

function closeModal() {
    const fileInput = document.getElementById('fileInput');

    // Konfirmasi jika ada file yang sudah dipilih
    if (fileInput.value !== "") {
        Swal.fire({
            title: 'Batalkan unggahan?',
            text: "File yang sudah dipilih tidak akan tersimpan.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e53e3e',
            cancelButtonColor: '#94a3b8',
            confirmButtonText: 'Lanjutkan',
            cancelButtonText: 'Ya, Batal'
        }).then((result) => {
            if (result.isConfirmed) resetAndClose();
        });
    } else {
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
    const file = document.getElementById('fileInput').files[0];

    // Validasi file kosong
    if (!file) {
        Swal.fire({
            icon: 'error',
            title: 'Waduh...',
            text: 'Silakan pilih file tugas dulu ya!',
            confirmButtonColor: '#3a5ccc'
        });
        return;
    }

    // Update status tombol tugas
    const btn = document.querySelector(`#${currentTaskId} .task-btn`);
    btn.innerText = "✓ Selesai";
    btn.classList.add('submitted');
    btn.onclick = null;

    // Notifikasi Berhasil (SweetAlert2)
    Swal.fire({
        title: 'Berhasil dikirim!',
        text: `Tugas "${file.name}" sudah kami terima.`,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#ffffff',
        iconColor: '#3a5ccc'
    });

    resetAndClose();
    updateGlobalProgress();
}

/* --- Kalkulasi Progress Bar --- */
function updateGlobalProgress() {
    const fill = document.getElementById('mainProgress');
    const doneMateri = document.querySelectorAll('.floating-done.is-done').length;
    const doneTugas = document.querySelectorAll('.task-btn.submitted').length;

    // Kalkulasi bobot: Base 40% + Materi (10% ea) + Tugas (20% ea)
    let newWidth = 40 + (doneMateri * 10) + (doneTugas * 20);
    if (newWidth > 100) newWidth = 100;

    fill.style.width = newWidth + "%";
}