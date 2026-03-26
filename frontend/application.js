// ========================================
// Passport Seva+ — Application Page Script
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Step Navigation ----
    const allSteps = document.querySelectorAll('.app-step');

    function showStep(stepId) {
        allSteps.forEach(s => s.classList.remove('active'));
        const target = document.getElementById('step-' + stepId);
        if (target) {
            target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Remove validation error
    function clearErrors(container) {
        container.querySelectorAll('.validation-error').forEach(e => e.remove());
        container.querySelectorAll('.input-error').forEach(e => e.classList.remove('input-error'));
    }

    // Show validation error
    function showError(container, message) {
        clearErrors(container);
        const div = document.createElement('div');
        div.className = 'validation-error';
        div.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + message;
        const formCard = container.querySelector('.form-card') || container;
        formCard.insertBefore(div, formCard.children[1] || formCard.firstChild);
    }

    // ---- STEP VALIDATION FUNCTIONS ----

    // Step 1: Personal Details
    function validateStep1() {
        const fields = [
            { id: 'fullName', label: 'Full Name' },
            { id: 'dob', label: 'Date of Birth' },
            { id: 'gender', label: 'Gender' },
            { id: 'maritalStatus', label: 'Marital Status' },
            { id: 'fatherName', label: "Father's Name" },
            { id: 'motherName', label: "Mother's Name" },
            { id: 'placeOfBirth', label: 'Place of Birth' },
            { id: 'mobile', label: 'Mobile Number' }
        ];
        const step = document.getElementById('step-1');
        clearErrors(step);

        for (const f of fields) {
            const el = document.getElementById(f.id);
            if (!el || !el.value.trim()) {
                el && el.classList.add('input-error');
                showError(step, f.label + ' is required. Please fill all mandatory fields.');
                el && el.focus();
                return false;
            }
        }
        return true;
    }

    // Step 2: Address Information
    function validateStep2() {
        const fields = [
            { id: 'houseNo', label: 'House / Flat No.' },
            { id: 'street', label: 'Street / Area' },
            { id: 'city', label: 'City' },
            { id: 'district', label: 'District' },
            { id: 'pinCode', label: 'PIN Code' },
            { id: 'state', label: 'State' }
        ];
        const step = document.getElementById('step-2');
        clearErrors(step);

        for (const f of fields) {
            const el = document.getElementById(f.id);
            if (!el || !el.value.trim()) {
                el && el.classList.add('input-error');
                showError(step, f.label + ' is required. Please fill all mandatory fields.');
                el && el.focus();
                return false;
            }
        }
        return true;
    }

    // Step 3: Passport Type — always valid (has defaults)
    function validateStep3() {
        return true;
    }

    // Step 4: Document Upload
    function validateStep4() {
        const files = [
            { id: 'fileAadhar', label: 'Aadhar Card' },
            { id: 'filePhoto', label: 'Passport Size Photo' },
            { id: 'fileBirth', label: 'Birth Certificate' },
            { id: 'fileAddress', label: 'Address Proof' }
        ];
        const step = document.getElementById('step-4');
        clearErrors(step);

        for (const f of files) {
            const el = document.getElementById(f.id);
            if (!el || el.files.length === 0) {
                showError(step, f.label + ' is required. Please upload all mandatory documents.');
                return false;
            }
        }
        return true;
    }

    // Step 5: Book Appointment
    function validateStep5() {
        const step = document.getElementById('step-5');
        clearErrors(step);

        const city = document.getElementById('selectCity');
        if (!city || !city.value) {
            city && city.classList.add('input-error');
            showError(step, 'Please select a city.');
            city && city.focus();
            return false;
        }

        const psk = document.getElementById('selectPSK');
        if (!psk || !psk.value) {
            psk && psk.classList.add('input-error');
            showError(step, 'Please select a PSK Centre.');
            psk && psk.focus();
            return false;
        }

        const date = document.getElementById('appointmentDate');
        if (!date || !date.value) {
            date && date.classList.add('input-error');
            showError(step, 'Please select a preferred date.');
            date && date.focus();
            return false;
        }

        const selectedSlot = document.querySelector('.time-slot.selected');
        if (!selectedSlot) {
            showError(step, 'Please select a time slot.');
            return false;
        }

        return true;
    }

    // Map of step validators
    const validators = {
        '1': validateStep1,
        '2': validateStep2,
        '3': validateStep3,
        '4': validateStep4,
        '5': validateStep5
    };

    // Get current step number from the button's parent
    function getCurrentStepNum(btn) {
        const section = btn.closest('.app-step');
        if (section) {
            const id = section.id; // e.g. "step-3"
            return id.replace('step-', '');
        }
        return null;
    }

    // ---- Populate Success Page ----
    function populateSuccessPage() {
        const appId = 'PS-2025-' + Math.floor(100000 + Math.random() * 900000);
        const name = document.getElementById('fullName').value || 'Applicant';
        const appType = document.querySelector('input[name="appType"]:checked');
        const procType = document.querySelector('input[name="procType"]:checked');
        const city = document.getElementById('selectCity');
        const psk = document.getElementById('selectPSK');
        const date = document.getElementById('appointmentDate');
        const slot = document.querySelector('.time-slot.selected');

        // Application Details
        document.getElementById('successAppId').textContent = appId;
        document.getElementById('successName').textContent = name;
        document.getElementById('successAppType').textContent =
            appType && appType.value === 'fresh' ? 'Fresh Passport' : 'Renewal';
        document.getElementById('successProcessing').textContent =
            procType && procType.value === 'normal' ? 'Normal (30–45 days)' : 'Tatkal (1–3 days)';

        const now = new Date();
        const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
        document.getElementById('successDate').textContent = dateStr + ', ' + timeStr;
        document.getElementById('successStatus').textContent = 'Pending Verification';

        // Appointment Details
        const cityText = city ? city.options[city.selectedIndex].text : 'N/A';
        const pskText = psk ? psk.options[psk.selectedIndex].text : 'N/A';
        document.getElementById('successCentre').textContent = 'PSK ' + cityText;

        if (date && date.value) {
            const d = new Date(date.value);
            document.getElementById('successAppointDate').textContent =
                d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
        }

        document.getElementById('successTimeSlot').textContent = slot ? slot.textContent : 'N/A';
        document.getElementById('successToken').textContent = 'T-' + Math.floor(100 + Math.random() * 900);
        document.getElementById('successAddress').textContent = pskText + ', ' + cityText;
    }

    // ---- Start Application ----
    const btnStart = document.getElementById('btnStartApp');
    if (btnStart) {
        btnStart.addEventListener('click', () => showStep('1'));
    }

    // ---- Continue Buttons ----
    document.querySelectorAll('.btn-continue').forEach(btn => {
        btn.addEventListener('click', () => {
            const stepNum = getCurrentStepNum(btn);
            const nextStep = btn.getAttribute('data-next');

            // Run validator for current step
            if (stepNum && validators[stepNum]) {
                if (!validators[stepNum]()) return;
            }

            if (nextStep === 'success') {
                populateSuccessPage();
                showStep('success');
            } else if (nextStep) {
                showStep(nextStep);
            }
        });
    });

    // ---- Option Cards (Step 3) ----
    document.querySelectorAll('.option-grid').forEach(grid => {
        const cards = grid.querySelectorAll('.option-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                cards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                const radio = card.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;
            });
        });
    });

    // ---- File Upload Names ----
    const fileInputs = [
        { input: 'fileAadhar', name: 'nameAadhar' },
        { input: 'filePhoto', name: 'namePhoto' },
        { input: 'fileBirth', name: 'nameBirth' },
        { input: 'fileAddress', name: 'nameAddress' }
    ];

    fileInputs.forEach(({ input, name }) => {
        const el = document.getElementById(input);
        const label = document.getElementById(name);
        if (el && label) {
            el.addEventListener('change', () => {
                if (el.files.length > 0) {
                    label.textContent = el.files[0].name;
                    label.style.color = '#16a34a';
                } else {
                    label.textContent = 'No file chosen';
                    label.style.color = '#9ca3af';
                }
            });
        }
    });

    // ---- Time Slot Selection (Step 5) ----
    const slotsGrid = document.getElementById('timeSlotsGrid');
    if (slotsGrid) {
        slotsGrid.addEventListener('click', (e) => {
            const slot = e.target.closest('.time-slot');
            if (!slot || slot.disabled || slot.classList.contains('taken')) return;

            slotsGrid.querySelectorAll('.time-slot:not(.taken)').forEach(s => {
                s.classList.remove('selected');
                s.classList.add('available');
            });

            slot.classList.remove('available');
            slot.classList.add('selected');
        });
    }

    // ---- Action Buttons on Success Page ----
    const btnDownload = document.getElementById('btnDownloadPDF');
    if (btnDownload) {
        btnDownload.addEventListener('click', () => {
            alert('Receipt PDF download started! (Demo)');
        });
    }

    const btnShare = document.getElementById('btnShareId');
    if (btnShare) {
        btnShare.addEventListener('click', () => {
            const appId = document.getElementById('successAppId').textContent;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(appId);
                alert('Application ID ' + appId + ' copied to clipboard!');
            } else {
                alert('Your Application ID: ' + appId);
            }
        });
    }

    const btnTrack = document.getElementById('btnTrackStatus');
    if (btnTrack) {
        btnTrack.addEventListener('click', () => {
            alert('Redirecting to Track Application... (Demo)');
        });
    }

    // ---- Clear error on input focus ----
    document.querySelectorAll('.form-input-app').forEach(input => {
        input.addEventListener('focus', () => {
            input.classList.remove('input-error');
        });
    });

});
