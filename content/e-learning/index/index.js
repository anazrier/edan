/* --- Data Event Kalender --- */
const events = {
    '2026-03-02': 'deadline',
    '2026-03-05': 'deadline',
    '2026-03-10': 'jadwal',
    '2026-03-30': 'selesai',
};

let currentDate = new Date();

/* --- Fungsi Render Kalender --- */
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    document.getElementById('calTitle').textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Penyesuaian mulai hari Senin
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    const container = document.getElementById('calDays');
    container.innerHTML = '';

    // Render kotak kosong sebelum tanggal 1
    for (let i = 0; i < startOffset; i++) {
        container.innerHTML += `<div></div>`;
    }

    // Render tanggal dan indikator event
    for (let d = 1; d <= daysInMonth; d++) {
        const key = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        const eventType = events[key];

        let dot = '';
        if (eventType === 'deadline') dot = '<span class="dot dot-red"></span>';
        else if (eventType === 'jadwal') dot = '<span class="dot dot-blue"></span>';
        else if (eventType === 'selesai') dot = '<span class="dot dot-green"></span>';

        container.innerHTML += `
                <div class="cal-date ${isToday ? 'cal-today' : ''}">
                    ${d}
                    ${dot}
                </div>`;
    }
}

/* --- Navigasi Bulan --- */
function changeMonth(dir) {
    currentDate.setMonth(currentDate.getMonth() + dir);
    renderCalendar();
}

/* --- Inisialisasi Kalender (Cek Ketersediaan DOM) --- */
function tryRenderCalendar() {
    if (document.getElementById('calTitle') && document.getElementById('calDays')) {
        renderCalendar();
    } else {
        setTimeout(tryRenderCalendar, 100);
    }
}

tryRenderCalendar();

/* --- Fungsi Modal Mata Kuliah --- */
function openAllCourses() {
    document.getElementById('allCoursesModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAllCourses() {
    document.getElementById('allCoursesModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

/* --- Fitur Filter Pencarian --- */
function filterCourses() {
    let input = document.getElementById('courseSearch').value.toLowerCase();
    let cards = document.querySelectorAll('#modalCourseGrid .el-card');

    cards.forEach(card => {
        let title = card.querySelector('.el-card-title').innerText.toLowerCase();
        card.style.display = title.includes(input) ? "block" : "none";
    });
}