// Service Detail
function showServiceDetail(title, description) {
    document.getElementById('modalServiceTitle').innerText = title;
    document.getElementById('modalServiceDesc').innerText = description;
    const modal = new bootstrap.Modal(document.getElementById('serviceModal'));
    modal.show();
}

// gallery
function filterGallery(category, btnElement) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    const items = document.querySelectorAll('.gallery-card');
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// calculator estimasi biaya
        function calculateTax() {
            var pkbInput = document.getElementById('calc-pkb');
            var serviceInput = document.getElementById('calc-service');
            var typeInput = document.getElementById('calc-type');
            var totalDisplay = document.getElementById('calc-total');
            var detailDisplay = document.getElementById('calc-detail');

            if (!pkbInput || !serviceInput || !typeInput || !totalDisplay) return;

            var pkb = parseFloat(pkbInput.value) || 0;
            var serviceType = serviceInput.value;
            var vehicleType = typeInput.value;

            var swdkllj = vehicleType === 'motor' ? 35000 : 143000;
            var adminFee = 100000;

            if (serviceType === 'pajak5') {
                adminFee = 150000;
            } else if (serviceType === 'baliknama') {
                if (vehicleType === 'motor') {
                    // Motor: Plat & STNK (160rb) + Ganti BPKB (450rb) + Cek Fisik (150rb) + Admin (200rb)
                    adminFee = 160000 + 450000 + 150000 + 200000;
                } else {
                    // Mobil: Plat & STNK (300rb) + Cek Fisik (250rb) + Ganti BPKB (600rb) + Admin (250rb)
                    adminFee = 300000 + 250000 + 600000 + 250000;
                }
            }

            var total = pkb + swdkllj + adminFee;
            totalDisplay.innerText = 'Rp ' + Math.round(total).toLocaleString('id-ID');

            if (detailDisplay) {
                detailDisplay.innerText = '*Rincian: PKB Rp ' + Math.round(pkb).toLocaleString('id-ID') + 
                    ' + SWDKLLJ Rp ' + swdkllj.toLocaleString('id-ID') + 
                    ' + Biaya Kelengkapan/Administrasi Rp ' + adminFee.toLocaleString('id-ID');
            }
        }

// Form
function handleAuthSubmit(event, message) {
    event.preventDefault();
    alert(message);
}

// dom calculator
document.addEventListener('DOMContentLoaded', function() {
    calculateTax();
});

//login
/**
 * hide password
 * @param {string} inputId
 * @param {HTMLElement} toggleIcon
 */
function togglePasswordVisibility(inputId, toggleIcon) {
    const inputElement = document.getElementById(inputId);
    const icon = toggleIcon.querySelector('i');

    if (inputElement.type === 'password') {
        inputElement.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        inputElement.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

/**
 * Notif
 * @param {string} message 
 * @param {string} type 
 */
function showToast(message, type = 'info') {
    const toastElement = document.getElementById('liveToast');
    const toastMessage = document.getElementById('toastMessage');

    toastElement.classList.remove('bg-primary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info');

    switch (type) {
        case 'success':
            toastElement.classList.add('bg-success');
            break;
        case 'danger':
            toastElement.classList.add('bg-danger');
            break;
        case 'warning':
            toastElement.classList.add('bg-warning', 'text-dark');
            break;
        case 'info':
        default:
            toastElement.classList.add('bg-info');
            break;
    }

    toastMessage.textContent = message;

    // Inisialisasi dan tampilkan Toast Bootstrap
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}

/**
 * Handle Form Login Submit
 * @param {Event} event 
 */
function handleLoginSubmit(event) {
    event.preventDefault();

    const identifier = document.getElementById('login-identifier').value.trim();
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    if (!identifier || !password) {
        showToast('Mohon isi semua bidang formulir!', 'danger');
        return;
    }

    // Simulasi respons login
    showToast('Proses login berhasil...', 'success');
    console.log('Login Payload:', { identifier, password, rememberMe });
    setTimeout(() => {
    }, 1500);
}

/**
 * mengatur form login
 * @param {Event} event 
 */
function handleRegisterSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('reg-name').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;

    if (!name || !phone || !email || !password) {
        showToast('Mohon lengkapi semua data pendaftaran!', 'danger');
        return;
    }

    if (password.length < 6) {
        showToast('Kata sandi minimal 6 karakter!', 'warning');
        return;
    }

    // Simulasi registrasi berhasil
    showToast('Pendaftaran berhasil! Silakan masuk.', 'success');
    console.log('Register Payload:', { name, phone, email, password });
    document.getElementById('form-register').reset();
    setTimeout(() => {
        const loginTab = new bootstrap.Tab(document.getElementById('pills-login-tab'));
        loginTab.show();
    }, 1500);
}