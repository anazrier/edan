// Fungsi untuk memuat file HTML ke dalam container
async function loadComponent(id, url) {
    const element = document.getElementById(id);
    if (element) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            element.innerHTML = html;
        } catch (error) {
            console.error('Gagal memuat:', url);
        }
    }
}

// Fungsi toggle sidebar untuk Mobile
function toggleMenu() {
    const sidebar = document.getElementById('sidebar-container');
    sidebar.classList.toggle('active');
}
const notifBtn = document.getElementById("notifBtn");
const notifPopup = document.getElementById("notifPopup");

if (notifBtn && notifPopup) {
    notifBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        notifPopup.classList.toggle("show");
    });

    document.addEventListener("click", function() {
        notifPopup.classList.remove("show");
    });

    notifPopup.addEventListener("click", function(e) {
        e.stopPropagation();
    });
}

function toggleMenu() {
    console.log("Menu diklik");
}