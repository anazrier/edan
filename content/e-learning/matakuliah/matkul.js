 // Fungsi buka tutup materi
 function toggleDetails(id) {
     document.getElementById(id).classList.toggle('active');
 }

 // Fungsi centang selesai
 function toggleDone(id) {
     const item = document.getElementById(id);
     const doneBtn = item.querySelector('.floating-done');
     doneBtn.classList.toggle('is-done');

     // Mencegah trigger buka-tutup materi saat klik done
     event.stopPropagation();
 }
 let currentTaskId = "";

 function toggleDetails(id) {
     document.getElementById(id).classList.toggle('active');
 }

 function toggleDone(id) {
     event.stopPropagation();
     const element = document.querySelector(`#${id} .floating-done`);
     element.classList.toggle('is-done');
     updateGlobalProgress();
 }

 function openModal(title, taskId) {
     currentTaskId = taskId;
     document.getElementById('modalTitle').innerText = title;
     document.getElementById('uploadModal').classList.add('active');
 }

 function closeModal() {
     document.getElementById('uploadModal').classList.remove('active');
     document.getElementById('fileInput').value = "";
     document.getElementById('fileNameDisplay').innerText = "";
 }

 function updateFileName() {
     const input = document.getElementById('fileInput');
     const display = document.getElementById('fileNameDisplay');
     display.innerText = input.files.length > 0 ? "Siap kirim: " + input.files[0].name : "";
 }

 function submitTask() {
     const file = document.getElementById('fileInput').files[0];

     if (!file) {
         // Pop-up peringatan jika file kosong
         Swal.fire({
             icon: 'error',
             title: 'Waduh...',
             text: 'Silakan pilih file tugas dulu ya!',
             confirmButtonColor: '#3a5ccc' // Warna Teal
         });
         return;
     }

     // Ubah tampilan tombol kirim menjadi Selesai
     const btn = document.querySelector(`#${currentTaskId} .task-btn`);
     btn.innerText = "✓ Selesai";
     btn.classList.add('submitted');
     btn.onclick = null;

     // Pop-up Berhasil (Gaya SweetAlert2)
     Swal.fire({
         title: 'Berhasil dikirim!',
         text: `Tugas "${file.name}" sudah kami terima.`,
         icon: 'success',
         showConfirmButton: false,
         timer: 2000, // Hilang otomatis dalam 2 detik
         timerProgressBar: true,
         background: '#ffffff',
         iconColor: '#3a5ccc'
     });

     closeModal();
     updateGlobalProgress();
 }

 function updateGlobalProgress() {
     // Logika sederhana penambah progress bar
     const fill = document.getElementById('mainProgress');
     const doneMateri = document.querySelectorAll('.floating-done.is-done').length;
     const doneTugas = document.querySelectorAll('.task-btn.submitted').length;

     let newWidth = 40 + (doneMateri * 10) + (doneTugas * 20);
     if (newWidth > 100) newWidth = 100;
     fill.style.width = newWidth + "%";
 }

 function closeModal() {
     // Jika input file tidak kosong, tanya dulu
     if (document.getElementById('fileInput').value !== "") {
         Swal.fire({
             title: 'Batalkan unggahan?',
             text: "File yang sudah dipilih tidak akan tersimpan.",
             icon: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#e53e3e', // Merah
             cancelButtonColor: '#94a3b8',
             confirmButtonText: 'Lanjutkan',
             cancelButtonText: 'Ya, Batal'
         }).then((result) => {
             if (result.isConfirmed) {
                 resetAndClose();
             }
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