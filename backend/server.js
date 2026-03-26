// ========================================
// Passport Seva+ — Backend Server
// ========================================

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Middleware ----
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- Serve Frontend Static Files ----
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// ---- Demo User ----
const DEMO_USER = {
    email: 'hire-me@anshumat.org',
    password: 'HireMe@2025!',
    name: 'Demo User'
};

// ---- In-Memory Store ----
let applications = [];
let nextAppId = 100001;

// ========================================
// API ROUTES
// ========================================

// ---- Auth: Login ----
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required.'
        });
    }

    if (email === DEMO_USER.email && password === DEMO_USER.password) {
        return res.json({
            success: true,
            message: 'Login successful',
            user: {
                email: DEMO_USER.email,
                name: DEMO_USER.name
            }
        });
    }

    return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
    });
});

// ---- Submit Application ----
app.post('/api/application/submit', (req, res) => {
    const {
        fullName,
        dob,
        gender,
        maritalStatus,
        fatherName,
        motherName,
        placeOfBirth,
        mobile,
        houseNo,
        street,
        city,
        district,
        pinCode,
        state,
        applicationType,
        processingType,
        bookletSize,
        appointmentCity,
        pskCentre,
        appointmentDate,
        timeSlot
    } = req.body;

    // Validate required fields
    const requiredFields = {
        fullName, dob, gender, maritalStatus, fatherName,
        motherName, placeOfBirth, mobile, houseNo, street,
        city, district, pinCode, state
    };

    for (const [key, value] of Object.entries(requiredFields)) {
        if (!value || !String(value).trim()) {
            return res.status(400).json({
                success: false,
                message: `${key} is required.`
            });
        }
    }

    // Create application
    const applicationId = `PS-2025-${nextAppId++}`;
    const tokenNumber = `T-${Math.floor(100 + Math.random() * 900)}`;
    const submittedOn = new Date().toISOString();

    const application = {
        applicationId,
        tokenNumber,
        submittedOn,
        status: 'Pending Verification',
        personalDetails: {
            fullName, dob, gender, maritalStatus,
            fatherName, motherName, placeOfBirth, mobile
        },
        address: {
            houseNo, street, city, district, pinCode, state
        },
        passportDetails: {
            applicationType: applicationType || 'fresh',
            processingType: processingType || 'normal',
            bookletSize: bookletSize || '36'
        },
        appointment: {
            city: appointmentCity || '',
            centre: pskCentre || '',
            date: appointmentDate || '',
            timeSlot: timeSlot || ''
        }
    };

    applications.push(application);

    return res.status(201).json({
        success: true,
        message: 'Application submitted successfully!',
        data: {
            applicationId,
            tokenNumber,
            submittedOn,
            status: 'Pending Verification',
            applicantName: fullName,
            applicationType: application.passportDetails.applicationType === 'fresh' ? 'Fresh Passport' : 'Renewal',
            processingType: application.passportDetails.processingType === 'normal' ? 'Normal (30-45 days)' : 'Tatkal (1-3 days)',
            appointment: application.appointment
        }
    });
});

// ---- Get Application by ID ----
app.get('/api/application/:id', (req, res) => {
    const app = applications.find(a => a.applicationId === req.params.id);

    if (!app) {
        return res.status(404).json({
            success: false,
            message: 'Application not found.'
        });
    }

    return res.json({
        success: true,
        data: app
    });
});

// ---- Get All Applications ----
app.get('/api/applications', (req, res) => {
    return res.json({
        success: true,
        count: applications.length,
        data: applications
    });
});

// ---- Health Check ----
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// ---- Catch-all: Serve Frontend ----
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════╗
║       🛂  Passport Seva+ Server Running       ║
╠═══════════════════════════════════════════════╣
║  Local:   http://localhost:${PORT}               ║
║  Status:  Ready                               ║
║  Mode:    Development                         ║
╚═══════════════════════════════════════════════╝

Demo Login:
  Email:    hire-me@anshumat.org
  Password: HireMe@2025!

API Endpoints:
  POST /api/auth/login          → Login
  POST /api/application/submit  → Submit application
  GET  /api/application/:id     → Get application by ID
  GET  /api/applications        → List all applications
  GET  /api/health              → Health check
    `);
});
