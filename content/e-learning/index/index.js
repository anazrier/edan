const events = {
    '2026-03-02': 'deadline',
    '2026-03-05': 'deadline',
    '2026-03-10': 'jadwal',
    '2026-03-30': 'selesai',
};

let currentDate = new Date();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    document.getElementById('calTitle').textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    const container = document.getElementById('calDays');
    container.innerHTML = '';

    for (let i = 0; i < startOffset; i++) {
        container.innerHTML += `<div></div>`;
    }

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

function changeMonth(dir) {
    currentDate.setMonth(currentDate.getMonth() + dir);
    renderCalendar();
}

function tryRenderCalendar() {
    if (document.getElementById('calTitle') && document.getElementById('calDays')) {
        renderCalendar();
    } else {
        setTimeout(tryRenderCalendar, 100);
    }
}

tryRenderCalendar();