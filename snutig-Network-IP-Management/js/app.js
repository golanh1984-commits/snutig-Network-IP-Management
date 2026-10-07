"use strict";

/* =========================================================
   snutig GmbH
   Network & IP Management
   Demo Application
========================================================= */

const STORAGE_KEY = "snutig_network_management_v2";


/* =========================================================
   DEMO USERS
========================================================= */

const USERS = [
    {
        username: "Admin_Demo",
        password: "EnglischDemoBKLK",
        name: "Laurens Hasan",
        role: "Administrator",
        permissions: "Vollzugriff"
    },
    {
        username: "Geschaeftsfuehrer_DEMO",
        password: "EnglischDemoBKLK1",
        name: "Geschäftsführer",
        role: "Geschäftsführer",
        permissions: "Vollzugriff"
    },
    {
        username: "Normal_Demo",
        password: "EnglischDemoBKLK0",
        name: "Normalmitarbeiter",
        role: "Normalmitarbeiter",
        permissions: "Nur freigegebene Bereiche"
    }
];


/* =========================================================
   DEMO DATA
========================================================= */

const DEFAULT_DATA = {

    customers: [
        {
            id: "C001",
            number: "K-10001",
            name: "PP Herford",
            contact: "IT-Ansprechpartner",
            email: "it@example.local",
            phone: "+49 5221 000000",
            location: "Herford",
            network: "PP-HERFORD"
        },
        {
            id: "C002",
            number: "K-10002",
            name: "Kunde Bielefeld",
            contact: "IT-Verantwortlicher",
            email: "technik@example.local",
            phone: "+49 521 000000",
            location: "Bielefeld",
            network: "BIELEFELD-LAN"
        },
        {
            id: "C003",
            number: "K-10003",
            name: "Kunde Minden",
            contact: "Administration",
            email: "admin@example.local",
            phone: "+49 571 000000",
            location: "Minden",
            network: "MINDEN-LAN"
        }
    ],

    devices: [
        {
            id: "D001",
            name: "PP-HF-PC-001",
            type: "PC",
            employee: "Max Mustermann",
            customerId: "C001",
            ip: "192.168.10.21",
            mac: "00:1A:2B:3C:4D:01",
            location: "Herford – Büro 1",
            network: "PP-HERFORD",
            status: "active",
            serial: "SN-HF-001928",
            lastActivity: "07.10.2026 10:42"
        },
        {
            id: "D002",
            name: "PP-HF-LAP-002",
            type: "Laptop",
            employee: "Anna Beispiel",
            customerId: "C001",
            ip: "192.168.10.22",
            mac: "00:1A:2B:3C:4D:02",
            location: "Herford – Büro 2",
            network: "PP-HERFORD",
            status: "active",
            serial: "SN-HF-002771",
            lastActivity: "07.10.2026 10:39"
        },
        {
            id: "D003",
            name: "PP-HF-PRN-001",
            type: "Drucker",
            employee: "—",
            customerId: "C001",
            ip: "192.168.10.50",
            mac: "00:1A:2B:3C:4D:03",
            location: "Herford – Druckerraum",
            network: "PP-HERFORD",
            status: "unknown",
            serial: "PRN-HF-55821",
            lastActivity: "06.10.2026 16:12"
        },
        {
            id: "D004",
            name: "BIE-PC-004",
            type: "PC",
            employee: "David Beispiel",
            customerId: "C002",
            ip: "10.20.10.44",
            mac: "00:1A:2B:3C:5D:04",
            location: "Bielefeld – Büro 4",
            network: "BIELEFELD-LAN",
            status: "active",
            serial: "SN-BI-443921",
            lastActivity: "07.10.2026 09:58"
        },
        {
            id: "D005",
            name: "BIE-SRV-001",
            type: "Server",
            employee: "—",
            customerId: "C002",
            ip: "10.20.10.10",
            mac: "00:1A:2B:3C:5D:10",
            location: "Bielefeld – Serverraum",
            network: "BIELEFELD-LAN",
            status: "active",
            serial: "SRV-BI-10220",
            lastActivity: "07.10.2026 10:45"
        },
        {
            id: "D006",
            name: "MI-PC-002",
            type: "PC",
            employee: "Sarah Beispiel",
            customerId: "C003",
            ip: "172.16.5.22",
            mac: "00:1A:2B:3C:6D:22",
            location: "Minden – Büro 2",
            network: "MINDEN-LAN",
            status: "inactive",
            serial: "SN-MI-222881",
            lastActivity: "03.10.2026 14:03"
        }
    ],

    networks: [
        {
            name: "PP-HERFORD",
            subnet: "192.168.10.0/24",
            gateway: "192.168.10.1",
            dhcp: "192.168.10.100 – 200",
            status: "active",
            devices: 3
        },
        {
            name: "BIELEFELD-LAN",
            subnet: "10.20.10.0/24",
            gateway: "10.20.10.1",
            dhcp: "10.20.10.100 – 200",
            status: "active",
            devices: 2
        },
        {
            name: "MINDEN-LAN",
            subnet: "172.16.5.0/24",
            gateway: "172.16.5.1",
            dhcp: "172.16.5.100 – 200",
            status: "active",
            devices: 1
        }
    ],

    wifi: [
        {
            name: "PP-HF-AP-01",
            ssid: "PP-Herford-Internal",
            location: "Herford – EG",
            ip: "192.168.10.5",
            status: "active",
            lastActivity: "07.10.2026 10:43"
        },
        {
            name: "BIE-AP-01",
            ssid: "Bielefeld-Internal",
            location: "Bielefeld – EG",
            ip: "10.20.10.5",
            status: "active",
            lastActivity: "07.10.2026 10:40"
        }
    ],

    printers: [
        {
            name: "PP-HF-PRN-001",
            model: "Business Printer",
            location: "Herford – Druckerraum",
            ip: "192.168.10.50",
            status: "unknown"
        },
        {
            name: "BIE-PRN-001",
            model: "Office Printer",
            location: "Bielefeld – Büro",
            ip: "10.20.10.50",
            status: "active"
        }
    ],

    cameras: [
        {
            name: "PP-HF-CAM-01",
            location: "Herford – Eingang",
            ip: "192.168.10.70",
            model: "Indoor 2K Pan/Tilt",
            status: "active"
        },
        {
            name: "BIE-CAM-01",
            location: "Bielefeld – Eingang",
            ip: "10.20.10.70",
            model: "Indoor Camera",
            status: "active"
        }
    ],

    servers: [
        {
            name: "BIE-SRV-001",
            role: "File / Application",
            ip: "10.20.10.10",
            location: "Bielefeld – Serverraum",
            status: "active"
        }
    ],

    alerts: [
        {
            id: "A001",
            severity: "yellow",
            title: "Prüfung erforderlich",
            customer: "PP Herford",
            device: "PP-HF-PRN-001",
            date: "07.10.2026 09:30",
            status: "offen"
        },
        {
            id: "A002",
            severity: "red",
            title: "Gerät nicht erreichbar",
            customer: "Kunde Minden",
            device: "MI-PC-002",
            date: "06.10.2026 15:02",
            status: "offen"
        }
    ],

    logs: [
        {
            time: "07.10.2026 10:45",
            user: "System",
            action: "Synchronisierung",
            target: "Netzwerk",
            detail: "Netzwerkstatus aktualisiert"
        },
        {
            time: "07.10.2026 10:39",
            user: "Laurens Hasan",
            action: "Geräteprüfung",
            target: "PP-HF-LAP-002",
            detail: "Gerät erreichbar"
        }
    ]
};


/* =========================================================
   APPLICATION STATE
========================================================= */

let currentUser = null;
let data = null;
let currentPage = "dashboard";


/* =========================================================
   HELPERS
========================================================= */

function cloneData(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
        try {
            data = JSON.parse(saved);
        } catch {
            data = cloneData(DEFAULT_DATA);
        }
    } else {
        data = cloneData(DEFAULT_DATA);
    }
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function escapeHTML(value) {
    if (value === null || value === undefined) return "";

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function canManage() {
    return currentUser &&
        (
            currentUser.role === "Administrator" ||
            currentUser.role === "Geschäftsführer"
        );
}

function getCustomer(id) {
    return data.customers.find(c => c.id === id);
}

function getDevice(id) {
    return data.devices.find(d => d.id === id);
}

function showToast(message) {
    const root = document.getElementById("toastRoot");

    root.innerHTML = `
        <div class="toast">${escapeHTML(message)}</div>
    `;

    setTimeout(() => {
        root.innerHTML = "";
    }, 2800);
}

function statusHTML(status) {

    const map = {
        active: ["status-active", "Aktiv"],
        unknown: ["status-unknown", "Prüfung erforderlich"],
        inactive: ["status-inactive", "Inaktiv"],
        offline: ["status-offline", "Außer Betrieb"]
    };

    const item = map[status] || map.unknown;

    return `
        <span class="status ${item[0]}">
            <span class="status-dot"></span>
            ${item[1]}
        </span>
    `;
}

function pageHeader(title, subtitle, actions = "") {
    return `
        <div class="page-header">
            <div>
                <h1>${escapeHTML(title)}</h1>
                <p>${escapeHTML(subtitle)}</p>
            </div>

            <div class="page-actions">
                ${actions}
            </div>
        </div>
    `;
}

function iconForDevice(type) {
    const icons = {
        PC: "▣",
        Laptop: "▱",
        Drucker: "▤",
        Server: "▥",
        Kamera: "▣",
        "Access Point": "◉"
    };

    return icons[type] || "□";
}


/* =========================================================
   LOGIN
========================================================= */

function login() {

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    const user = USERS.find(
        u => u.username === username && u.password === password
    );

    const error = document.getElementById("loginError");

    if (!user) {
        error.textContent = "Benutzername oder Passwort ist falsch.";
        return;
    }

    currentUser = { ...user };

    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("appShell").classList.remove("hidden");

    document.getElementById("topUserName").textContent = user.name;
    document.getElementById("topUserRole").textContent = user.role;
    document.getElementById("userAvatar").textContent =
        user.name.charAt(0).toUpperCase();

    renderPage("dashboard");

    showToast(`Willkommen, ${user.name}`);
}

function logout() {

    currentUser = null;

    document.getElementById("appShell").classList.add("hidden");
    document.getElementById("loginScreen").classList.remove("hidden");

    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
    document.getElementById("loginError").textContent = "";
}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    const active = data.devices.filter(d => d.status === "active").length;
    const alerts = data.alerts.filter(a => a.status === "offen").length;

    document.getElementById("mainContent").innerHTML = `

        <section class="hero">

            <div class="hero-copy">

                <span class="eyebrow">SNUTIG GMBH · IT MANAGEMENT</span>

                <h1>Network & IP Management</h1>

                <p>
                    Zentrale Übersicht über Kunden, Geräte, IP-Adressen,
                    Netzwerke und die technische Infrastruktur.
                </p>

            </div>

            <div class="hero-project">
                <small>Projekt</small>
                <strong>Erstellt für snutig GmbH</strong>
                <span>von Laurens Hasan</span>
                <span>Demo- und Beispieldaten</span>
            </div>

        </section>


        <section class="stats-grid">

            <div class="stat-card">
                <div class="stat-top">
                    <span>Geräte gesamt</span>
                    <div class="stat-icon">▣</div>
                </div>
                <strong>${data.devices.length}</strong>
                <small>Alle verwalteten Geräte</small>
            </div>

            <div class="stat-card">
                <div class="stat-top">
                    <span>Aktive Geräte</span>
                    <div class="stat-icon">✓</div>
                </div>
                <strong>${active}</strong>
                <small>Aktuell erreichbar</small>
            </div>

            <div class="stat-card">
                <div class="stat-top">
                    <span>Netzwerke</span>
                    <div class="stat-icon">◇</div>
                </div>
                <strong>${data.networks.length}</strong>
                <small>Verwaltete Netzwerke</small>
            </div>

            <div class="stat-card">
                <div class="stat-top">
                    <span>Offene Warnungen</span>
                    <div class="stat-icon">!</div>
                </div>
                <strong>${alerts}</strong>
                <small>Prüfung erforderlich</small>
            </div>

        </section>


        <section class="dashboard-grid">

            <div class="panel">

                <div class="panel-head">
                    <h2>Kunden</h2>
                    <span>${data.customers.length} Kunden</span>
                </div>

                <div class="panel-body">

                    <div class="customer-grid">

                        ${data.customers.map(customer => {

                            const devices =
                                data.devices.filter(
                                    d => d.customerId === customer.id
                                );

                            return `
                                <div
                                    class="customer-card"
                                    onclick="openCustomer('${customer.id}')"
                                >

                                    <div class="customer-top">
                                        <span class="customer-number">
                                            ${escapeHTML(customer.number)}
                                        </span>

                                        <span class="badge badge-green">
                                            AKTIV
                                        </span>
                                    </div>

                                    <h3>${escapeHTML(customer.name)}</h3>

                                    <p>
                                        ${escapeHTML(customer.location)}
                                    </p>

                                    <div class="customer-meta">

                                        <div>
                                            Geräte
                                            <strong>${devices.length}</strong>
                                        </div>

                                        <div>
                                            Netzwerk
                                            <strong>${escapeHTML(customer.network)}</strong>
                                        </div>

                                    </div>

                                </div>
                            `;

                        }).join("")}

                    </div>

                </div>

            </div>


            <div class="panel">

                <div class="panel-head">
                    <h2>Letzte Aktivitäten</h2>
                    <span>Live-Demo</span>
                </div>

                <div class="panel-body">

                    ${data.logs.slice(0, 6).map(log => `
                        <div class="alert-row">

                            <div class="alert-icon yellow">
                                •
                            </div>

                            <div class="alert-content">
                                <strong>
                                    ${escapeHTML(log.action)}
                                </strong>

                                <span>
                                    ${escapeHTML(log.detail)}
                                    · ${escapeHTML(log.time)}
                                </span>
                            </div>

                        </div>
                    `).join("")}

                </div>

            </div>

        </section>


        <section class="panel" style="margin-top:15px;">

            <div class="panel-head">
                <h2>Geräteübersicht</h2>

                <button
                    class="btn btn-small"
                    onclick="renderPage('devices')"
                >
                    Alle Geräte →
                </button>
            </div>

            <div class="table-wrap">

                <table class="data-table">

                    <thead>
                        <tr>
                            <th>Gerät</th>
                            <th>Kunde</th>
                            <th>Mitarbeiter</th>
                            <th>IP-Adresse</th>
                            <th>Status</th>
                            <th>Aktion</th>
                        </tr>
                    </thead>

                    <tbody>

                        ${data.devices.slice(0, 6).map(device => {

                            const customer = getCustomer(device.customerId);

                            return `
                                <tr>

                                    <td>
                                        <span
                                            class="device-link"
                                            onclick="openDevice('${device.id}')"
                                        >
                                            ${escapeHTML(device.name)}
                                        </span>
                                    </td>

                                    <td>
                                        ${escapeHTML(customer?.name || "—")}
                                    </td>

                                    <td>
                                        ${escapeHTML(device.employee)}
                                    </td>

                                    <td class="mono">
                                        ${escapeHTML(device.ip)}
                                    </td>

                                    <td>
                                        ${statusHTML(device.status)}
                                    </td>

                                    <td>

                                        <button
                                            class="btn btn-small"
                                            onclick="openDevice('${device.id}')"
                                        >
                                            Öffnen
                                        </button>

                                    </td>

                                </tr>
                            `;

                        }).join("")}

                    </tbody>

                </table>

            </div>

        </section>


        <section class="panel" style="margin-top:15px;">

            <div class="panel-body">

                <strong style="font-size:11px;">
                    Hinweis zum Projekt
                </strong>

                <p style="
                    margin-top:7px;
                    color:#7d8795;
                    font-size:10px;
                    line-height:1.6;
                ">
                    Diese Anwendung wurde für die snutig GmbH als
                    internes Demo-Projekt erstellt. Die angezeigten
                    Kundendaten, IP-Adressen, MAC-Adressen und Geräte
                    sind ausschließlich Beispiel- bzw. Demodaten.
                </p>

            </div>

        </section>
    `;
}


/* =========================================================
   CUSTOMERS
========================================================= */

function renderCustomers() {

    document.getElementById("mainContent").innerHTML =

        pageHeader(
            "Kunden",
            "Kunden, Standorte und zugehörige IT-Infrastruktur."
        ) +

        `
        <div class="customer-grid">

            ${data.customers.map(customer => {

                const devices =
                    data.devices.filter(
                        d => d.customerId === customer.id
                    );

                return `
                    <div
                        class="customer-card"
                        onclick="openCustomer('${customer.id}')"
                    >

                        <div class="customer-top">

                            <span class="customer-number">
                                ${escapeHTML(customer.number)}
                            </span>

                            <span class="badge badge-green">
                                AKTIV
                            </span>

                        </div>

                        <h3>${escapeHTML(customer.name)}</h3>

                        <p>
                            ${escapeHTML(customer.location)}
                        </p>

                        <div class="customer-meta">

                            <div>
                                Ansprechpartner
                                <strong>
                                    ${escapeHTML(customer.contact)}
                                </strong>
                            </div>

                            <div>
                                Geräte
                                <strong>
                                    ${devices.length}
                                </strong>
                            </div>

                        </div>

                    </div>
                `;

            }).join("")}

        </div>
        `;
}


/* =========================================================
   CUSTOMER DETAIL
========================================================= */

function openCustomer(customerId) {

    const customer = getCustomer(customerId);

    if (!customer) return;

    const devices =
        data.devices.filter(
            d => d.customerId === customer.id
        );

    document.getElementById("mainContent").innerHTML = `

        <div class="page-header">

            <div>
                <h1>${escapeHTML(customer.name)}</h1>

                <p>
                    Kundenübersicht · ${escapeHTML(customer.number)}
                </p>
            </div>

            <div class="page-actions">

                <button
                    class="btn"
                    onclick="renderPage('customers')"
                >
                    ← Kunden
                </button>

            </div>

        </div>


        <section class="customer-header">

            <div style="width:100%;">

                <div class="customer-number">
                    ${escapeHTML(customer.number)}
                </div>

                <h1 style="margin-top:7px;">
                    ${escapeHTML(customer.name)}
                </h1>

                <p>
                    ${escapeHTML(customer.location)}
                </p>

                <div class="customer-details">

                    <div class="detail-box">
                        <span>Ansprechpartner</span>
                        <strong>${escapeHTML(customer.contact)}</strong>
                    </div>

                    <div class="detail-box">
                        <span>E-Mail</span>
                        <strong>${escapeHTML(customer.email)}</strong>
                    </div>

                    <div class="detail-box">
                        <span>Telefon</span>
                        <strong>${escapeHTML(customer.phone)}</strong>
                    </div>

                    <div class="detail-box">
                        <span>Netzwerk</span>
                        <strong>${escapeHTML(customer.network)}</strong>
                    </div>

                </div>

            </div>

        </section>


        <section class="panel">

            <div class="panel-head">

                <h2>Geräte dieses Kunden</h2>

                <span>
                    ${devices.length} Geräte
                </span>

            </div>

            <div class="table-wrap">

                <table class="data-table">

                    <thead>
                        <tr>
                            <th>Gerät</th>
                            <th>Typ</th>
                            <th>Mitarbeiter</th>
                            <th>IP</th>
                            <th>Standort</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>

                        ${
                            devices.length
                                ? devices.map(device => `
                                    <tr>

                                        <td>
                                            <span
                                                class="device-link"
                                                onclick="openDevice('${device.id}')"
                                            >
                                                ${escapeHTML(device.name)}
                                            </span>
                                        </td>

                                        <td>${escapeHTML(device.type)}</td>

                                        <td>${escapeHTML(device.employee)}</td>

                                        <td class="mono">
                                            ${escapeHTML(device.ip)}
                                        </td>

                                        <td>${escapeHTML(device.location)}</td>

                                        <td>
                                            ${statusHTML(device.status)}
                                        </td>

                                        <td>
                                            <button
                                                class="btn btn-small"
                                                onclick="openDevice('${device.id}')"
                                            >
                                                Details
                                            </button>
                                        </td>

                                    </tr>
                                `).join("")
                                :
                                `
                                <tr>
                                    <td colspan="7">
                                        <div class="empty-state">
                                            Keine Geräte vorhanden.
                                        </div>
                                    </td>
                                </tr>
                                `
                        }

                    </tbody>

                </table>

            </div>

        </section>
    `;

    updateTopTitle(customer.name);
}


/* =========================================================
   DEVICES
========================================================= */

function renderDevices(search = "") {

    let devices = [...data.devices];

    if (search) {

        const q = search.toLowerCase();

        devices = devices.filter(device => {

            const customer = getCustomer(device.customerId);

            return [
                device.name,
                device.type,
                device.employee,
                device.ip,
                device.mac,
                device.serial,
                device.location,
                device.network,
                customer?.name,
                customer?.number
            ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(q);

        });
    }

    document.getElementById("mainContent").innerHTML =

        pageHeader(
            "Geräte",
            "Alle verwalteten Computer, Laptops, Drucker und Server.",
            canManage()
                ? `
                    <button
                        class="btn btn-primary"
                        onclick="openDeviceModal('add')"
                    >
                        + Gerät hinzufügen
                    </button>
                `
                : ""
        ) +

        `

        <section class="panel">

            <div class="panel-head">

                <h2>Geräteverwaltung</h2>

                <span>
                    ${devices.length} Ergebnisse
                </span>

            </div>

            <div class="table-wrap">

                <table class="data-table">

                    <thead>
                        <tr>
                            <th>Gerät</th>
                            <th>Typ</th>
                            <th>Kunde</th>
                            <th>Mitarbeiter</th>
                            <th>IP-Adresse</th>
                            <th>MAC</th>
                            <th>Status</th>
                            <th>Aktion</th>
                        </tr>
                    </thead>

                    <tbody>

                        ${devices.map(device => {

                            const customer =
                                getCustomer(device.customerId);

                            return `
                                <tr>

                                    <td>
                                        <span
                                            class="device-link"
                                            onclick="openDevice('${device.id}')"
                                        >
                                            ${escapeHTML(device.name)}
                                        </span>
                                    </td>

                                    <td>
                                        ${escapeHTML(device.type)}
                                    </td>

                                    <td>
                                        ${escapeHTML(customer?.name || "—")}
                                    </td>

                                    <td>
                                        ${escapeHTML(device.employee)}
                                    </td>

                                    <td class="mono">
                                        ${escapeHTML(device.ip)}
                                    </td>

                                    <td class="mono">
                                        ${escapeHTML(device.mac)}
                                    </td>

                                    <td>
                                        ${statusHTML(device.status)}
                                    </td>

                                    <td>

                                        <button
                                            class="btn btn-small"
                                            onclick="openDevice('${device.id}')"
                                        >
                                            Öffnen
                                        </button>

                                    </td>

                                </tr>
                            `;

                        }).join("")}

                    </tbody>

                </table>

            </div>

        </section>

        <div style="
            margin-top:12px;
            color:#687384;
            font-size:9px;
        ">
            ${
                canManage()
                    ? "Administrator/Geschäftsführer: Geräte können geöffnet, bearbeitet und gelöscht werden."
                    : "Normalmitarbeiter: Geräte können angesehen werden. Änderungen sind nicht freigegeben."
            }
        </div>
        `;
}


/* =========================================================
   DEVICE DETAIL
========================================================= */

function openDevice(deviceId) {

    const device = getDevice(deviceId);

    if (!device) return;

    const customer = getCustomer(device.customerId);

    document.getElementById("modalRoot").innerHTML = `

        <div class="modal-overlay" onclick="closeModal(event)">

            <div class="modal" onclick="event.stopPropagation()">

                <div class="modal-head">

                    <h2>Gerätedetails</h2>

                    <button
                        class="modal-close"
                        onclick="closeModal()"
                    >
                        ×
                    </button>

                </div>


                <div class="modal-body">

                    <div class="device-detail-top">

                        <div class="device-icon-large">
                            ${iconForDevice(device.type)}
                        </div>

                        <div>
                            <h2>
                                ${escapeHTML(device.name)}
                            </h2>

                            <p>
                                ${escapeHTML(device.type)}
                                ·
                                ${escapeHTML(customer?.name || "Kein Kunde")}
                            </p>
                        </div>

                        <div style="margin-left:auto;">
                            ${statusHTML(device.status)}
                        </div>

                    </div>


                    <div class="detail-grid">

                        ${detailItem("Gerätename", device.name)}
                        ${detailItem("Gerätetyp", device.type)}
                        ${detailItem("Kunde", customer?.name || "—")}
                        ${detailItem("Mitarbeiter", device.employee)}
                        ${detailItem("IP-Adresse", device.ip)}
                        ${detailItem("MAC-Adresse", device.mac)}
                        ${detailItem("Standort", device.location)}
                        ${detailItem("Netzwerk", device.network)}
                        ${detailItem("Seriennummer", device.serial)}
                        ${detailItem("Letzte Aktivität", device.lastActivity)}

                    </div>


                    <div class="qr-box">

                        ${generateDemoQR(device)}

                        <div>
                            <strong>
                                Geräte-QR / Authentifizierungskennung
                            </strong>

                            <p>
                                Demo-Darstellung für das interne Projekt.
                                Eine echte sichere Authentifizierung benötigt
                                später ein Backend.
                            </p>

                            <p class="mono">
                                DEVICE-${escapeHTML(device.id)}
                            </p>
                        </div>

                    </div>

                </div>


                <div class="modal-footer">

                    <button
                        class="btn"
                        onclick="closeModal()"
                    >
                        Schließen
                    </button>

                    ${
                        canManage()
                            ? `
                                <button
                                    class="btn btn-danger"
                                    onclick="deleteDevice('${device.id}')"
                                >
                                    Löschen
                                </button>

                                <button
                                    class="btn btn-primary"
                                    onclick="openDeviceModal('edit','${device.id}')"
                                >
                                    Bearbeiten
                                </button>
                            `
                            : ""
                    }

                </div>

            </div>

        </div>
    `;
}

function detailItem(label, value) {

    return `
        <div class="detail-box">

            <span>${escapeHTML(label)}</span>

            <strong>
                ${escapeHTML(value || "—")}
            </strong>

        </div>
    `;
}


/* =========================================================
   ADD / EDIT DEVICE
========================================================= */

function openDeviceModal(mode, deviceId = null) {

    if (!canManage()) {
        showToast("Du hast keine Berechtigung für diese Änderung.");
        return;
    }

    const device =
        mode === "edit"
            ? getDevice(deviceId)
            : {
                id: "",
                name: "",
                type: "PC",
                employee: "",
                customerId: data.customers[0]?.id || "",
                ip: "",
                mac: "",
                location: "",
                network: data.networks[0]?.name || "",
                status: "active",
                serial: "",
                lastActivity: new Date().toLocaleString("de-DE")
            };

    document.getElementById("modalRoot").innerHTML = `

        <div class="modal-overlay" onclick="closeModal(event)">

            <div class="modal" onclick="event.stopPropagation()">

                <div class="modal-head">

                    <h2>
                        ${mode === "edit" ? "Gerät bearbeiten" : "Gerät hinzufügen"}
                    </h2>

                    <button
                        class="modal-close"
                        onclick="closeModal()"
                    >
                        ×
                    </button>

                </div>


                <form
                    class="modal-body"
                    onsubmit="saveDevice(event, '${mode}', '${deviceId || ""}')"
                >

                    <div class="form-grid">

                        ${formInput("Gerätename", "name", device.name, true)}

                        <div class="form-field">
                            <label>Gerätetyp</label>

                            <select name="type">

                                ${[
                                    "PC",
                                    "Laptop",
                                    "Drucker",
                                    "Server",
                                    "Kamera",
                                    "Access Point"
                                ].map(type => `
                                    <option
                                        ${device.type === type ? "selected" : ""}
                                    >
                                        ${type}
                                    </option>
                                `).join("")}

                            </select>
                        </div>


                        ${formInput(
                            "Mitarbeiter",
                            "employee",
                            device.employee
                        )}

                        <div class="form-field">

                            <label>Kunde</label>

                            <select name="customerId">

                                ${data.customers.map(customer => `
                                    <option
                                        value="${customer.id}"
                                        ${device.customerId === customer.id ? "selected" : ""}
                                    >
                                        ${escapeHTML(customer.name)}
                                    </option>
                                `).join("")}

                            </select>

                        </div>


                        ${formInput("IP-Adresse", "ip", device.ip)}

                        ${formInput("MAC-Adresse", "mac", device.mac)}

                        ${formInput("Standort", "location", device.location)}

                        ${formInput("Netzwerk", "network", device.network)}

                        ${formInput("Seriennummer", "serial", device.serial)}

                        <div class="form-field">

                            <label>Status</label>

                            <select name="status">

                                <option value="active"
                                    ${device.status === "active" ? "selected" : ""}>
                                    Aktiv
                                </option>

                                <option value="unknown"
                                    ${device.status === "unknown" ? "selected" : ""}>
                                    Prüfung erforderlich
                                </option>

                                <option value="inactive"
                                    ${device.status === "inactive" ? "selected" : ""}>
                                    Inaktiv
                                </option>

                                <option value="offline"
                                    ${device.status === "offline" ? "selected" : ""}>
                                    Außer Betrieb
                                </option>

                            </select>

                        </div>

                    </div>

                    <div class="modal-footer" style="
                        margin:20px -22px -22px;
                    ">

                        <button
                            type="button"
                            class="btn"
                            onclick="closeModal()"
                        >
                            Abbrechen
                        </button>

                        <button
                            type="submit"
                            class="btn btn-primary"
                        >
                            ${mode === "edit" ? "Änderungen speichern" : "Gerät erstellen"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    `;
}

function formInput(label, name, value, required = false) {

    return `
        <div class="form-field">

            <label>${escapeHTML(label)}</label>

            <input
                name="${escapeHTML(name)}"
                value="${escapeHTML(value || "")}"
                ${required ? "required" : ""}
            >

        </div>
    `;
}

function saveDevice(event, mode, deviceId) {

    event.preventDefault();

    if (!canManage()) return;

    const form = event.target;
    const formData = new FormData(form);

    const deviceData = {
        name: formData.get("name").trim(),
        type: formData.get("type"),
        employee: formData.get("employee").trim() || "—",
        customerId: formData.get("customerId"),
        ip: formData.get("ip").trim(),
        mac: formData.get("mac").trim(),
        location: formData.get("location").trim(),
        network: formData.get("network").trim(),
        status: formData.get("status"),
        serial: formData.get("serial").trim(),
        lastActivity: new Date().toLocaleString("de-DE")
    };

    if (mode === "add") {

        deviceData.id =
            "D" +
            Date.now().toString().slice(-6);

        data.devices.unshift(deviceData);

        addLog(
            "Gerät erstellt",
            deviceData.name,
            "Neues Gerät wurde angelegt."
        );

        showToast("Gerät wurde hinzugefügt.");

    } else {

        const index =
            data.devices.findIndex(
                d => d.id === deviceId
            );

        if (index !== -1) {

            data.devices[index] = {
                ...data.devices[index],
                ...deviceData
            };

            addLog(
                "Gerät geändert",
                deviceData.name,
                "Gerätedaten wurden geändert."
            );

            showToast("Änderungen wurden gespeichert.");
        }
    }

    saveData();
    closeModal();
    renderPage("devices");
}


/* =========================================================
   DELETE DEVICE
========================================================= */

function deleteDevice(deviceId) {

    if (!canManage()) return;

    const device = getDevice(deviceId);

    if (!device) return;

    const confirmed = confirm(
        `Soll das Gerät "${device.name}" wirklich gelöscht werden?`
    );

    if (!confirmed) return;

    data.devices =
        data.devices.filter(
            d => d.id !== deviceId
        );

    addLog(
        "Gerät gelöscht",
        device.name,
        "Gerät wurde aus der Verwaltung entfernt."
    );

    saveData();

    closeModal();

    renderPage("devices");

    showToast("Gerät wurde gelöscht.");
}


/* =========================================================
   OTHER PAGES
========================================================= */

function renderIPs() {

    document.getElementById("mainContent").innerHTML =

        pageHeader(
            "IP-Adressen",
            "Übersicht über IP, MAC, Netzwerk und zugehörige Geräte."
        ) +

        `
        <section class="panel">

            <div class="table-wrap">

                <table class="data-table">

                    <thead>
                        <tr>
                            <th>IP</th>
                            <th>Gerät</th>
                            <th>Mitarbeiter</th>
                            <th>Standort</th>
                            <th>MAC</th>
                            <th>Netzwerk</th>
                            <th>Status</th>
                            <th>Letzte Aktivität</th>
                        </tr>
                    </thead>

                    <tbody>

                        ${data.devices.map(device => `

                            <tr>

                                <td class="mono">
                                    ${escapeHTML(device.ip)}
                                </td>

                                <td>
                                    <span
                                        class="device-link"
                                        onclick="openDevice('${device.id}')"
                                    >
                                        ${escapeHTML(device.name)}
                                    </span>
                                </td>

                                <td>
                                    ${escapeHTML(device.employee)}
                                </td>

                                <td>
                                    ${escapeHTML(device.location)}
                                </td>

                                <td class="mono">
                                    ${escapeHTML(device.mac)}
                                </td>

                                <td>
                                    ${escapeHTML(device.network)}
                                </td>

                                <td>
                                    ${statusHTML(device.status)}
                                </td>

                                <td>
                                    ${escapeHTML(device.lastActivity)}
                                </td>

                            </tr>

                        `).join("")}

                    </tbody>

                </table>

            </div>

        </section>
        `;
}


function renderNetworks() {

    document.getElementById("mainContent").innerHTML =

        pageHeader(
            "Netzwerke",
            "Subnetze, Gateways, DHCP-Bereiche und Netzwerkstatus."
        ) +

        `
        <section class="panel">

            <div class="table-wrap">

                <table class="data-table">

                    <thead>
                        <tr>
                            <th>Netzwerk</th>
                            <th>Subnetz</th>
                            <th>Gateway</th>
                            <th>DHCP</th>
                            <th>Geräte</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        ${data.networks.map(network => `

                            <tr>

                                <td>
                                    <strong>
                                        ${escapeHTML(network.name)}
                                    </strong>
                                </td>

                                <td class="mono">
                                    ${escapeHTML(network.subnet)}
                                </td>

                                <td class="mono">
                                    ${escapeHTML(network.gateway)}
                                </td>

                                <td class="mono">
                                    ${escapeHTML(network.dhcp)}
                                </td>

                                <td>
                                    ${network.devices}
                                </td>

                                <td>
                                    ${statusHTML(network.status)}
                                </td>

                            </tr>

                        `).join("")}

                    </tbody>

                </table>

            </div>

        </section>
        `;
}


function renderWifi() {

    document.getElementById("mainContent").innerHTML =

        pageHeader(
            "Access Points / WLAN",
            "Übersicht über WLAN-Access-Points und deren Erreichbarkeit."
        ) +

        simpleTable(
            ["Access Point", "SSID", "Standort", "IP", "Status", "Letzte Aktivität"],
            data.wifi.map(item => [
                item.name,
                item.ssid,
                item.location,
                item.ip,
                statusHTML(item.status),
                item.lastActivity
            ])
        );
}


function renderPrinters() {

    document.getElementById("mainContent").innerHTML =

        pageHeader(
            "Drucker",
            "Verwaltete Netzwerkdrucker."
        ) +

        simpleTable(
            ["Drucker", "Modell", "Standort", "IP", "Status"],
            data.printers.map(item => [
                item.name,
                item.model,
                item.location,
                item.ip,
                statusHTML(item.status)
            ])
        );
}


function renderCameras() {

    document.getElementById("mainContent").innerHTML =

        pageHeader(
            "Kameras",
            "Netzwerkkameras und deren aktueller Status."
        ) +

        simpleTable(
            ["Kamera", "Modell", "Standort", "IP", "Status"],
            data.cameras.map(item => [
                item.name,
                item.model,
                item.location,
                item.ip,
                statusHTML(item.status)
            ])
        );
}


function renderServers() {

    document.getElementById("mainContent").innerHTML =

        pageHeader(
            "Server",
            "Server und zentrale Systeme."
        ) +

        simpleTable(
            ["Server", "Rolle", "IP", "Standort", "Status"],
            data.servers.map(item => [
                item.name,
                item.role,
                item.ip,
                item.location,
                statusHTML(item.status)
            ])
        );
}


function simpleTable(headers, rows) {

    return `
        <section class="panel">

            <div class="table-wrap">

                <table class="data-table">

                    <thead>
                        <tr>
                            ${headers.map(h => `<th>${escapeHTML(h)}</th>`).join("")}
                        </tr>
                    </thead>

                    <tbody>

                        ${rows.map(row => `
                            <tr>
                                ${row.map(cell => `
                                    <td>${escapeHTMLIfNeeded(cell)}</td>
                                `).join("")}
                            </tr>
                        `).join("")}

                    </tbody>

                </table>

            </div>

        </section>
    `;
}

function escapeHTMLIfNeeded(value) {

    if (
        typeof value === "string" &&
        value.startsWith("<span")
    ) {
        return value;
    }

    return escapeHTML(value);
}


/* =========================================================
   ALERTS
========================================================= */

function renderAlerts() {

    document.getElementById("mainContent").innerHTML =

        pageHeader(
            "Probleme / Warnungen",
            "Technische Auffälligkeiten und Prüfungen."
        ) +

        `
        <section class="panel">

            ${
                data.alerts.length
                    ? data.alerts.map(alert => `

                        <div class="alert-row">

                            <div class="alert-icon ${alert.severity}">
                                !
                            </div>

                            <div class="alert-content">

                                <strong>
                                    ${escapeHTML(alert.title)}
                                </strong>

                                <span>
                                    ${escapeHTML(alert.customer)}
                                    ·
                                    ${escapeHTML(alert.device)}
                                    ·
                                    ${escapeHTML(alert.date)}
                                </span>

                            </div>

                            <span class="
                                badge
                                ${
                                    alert.status === "offen"
                                        ? "badge-red"
                                        : "badge-green"
                                }
                            ">
                                ${escapeHTML(alert.status)}
                            </span>

                            ${
                                canManage() && alert.status === "offen"
                                    ? `
                                        <button
                                            class="btn btn-small"
                                            onclick="resolveAlert('${alert.id}')"
                                        >
                                            Erledigt
                                        </button>
                                    `
                                    : ""
                            }

                        </div>

                    `).join("")
                    :
                    `
                        <div class="empty-state">
                            <strong>Keine offenen Probleme</strong>
                            Aktuell wurden keine Warnungen gefunden.
                        </div>
                    `
            }

        </section>
        `;
}


function resolveAlert(id) {

    if (!canManage()) return;

    const alert = data.alerts.find(a => a.id === id);

    if (!alert) return;

    alert.status = "erledigt";

    addLog(
        "Warnung erledigt",
        alert.device,
        "Warnung wurde als erledigt markiert."
    );

    saveData();

    updateAlertCount();

    renderPage("alerts");

    showToast("Warnung wurde erledigt.");
}


/* =========================================================
   LOGS
========================================================= */

function renderLogs() {

    document.getElementById("mainContent").innerHTML =

        pageHeader(
            "Änderungsprotokoll",
            "Nachvollziehbare Änderungen innerhalb der Demo-Anwendung."
        ) +

        simpleTable(
            ["Zeitpunkt", "Benutzer", "Aktion", "Ziel", "Details"],
            data.logs.map(log => [
                log.time,
                log.user,
                log.action,
                log.target,
                log.detail
            ])
        );
}


function addLog(action, target, detail) {

    data.logs.unshift({
        time: new Date().toLocaleString("de-DE"),
        user: currentUser?.name || "System",
        action,
        target,
        detail
    });

    data.logs = data.logs.slice(0, 100);
}


/* =========================================================
   USERS
========================================================= */

function renderUsers() {

    document.getElementById("mainContent").innerHTML =

        pageHeader(
            "Benutzer & Berechtigungen",
            "Übersicht über die Rollen innerhalb der Demo-Anwendung."
        ) +

        `
        <section class="panel">

            <div class="table-wrap">

                <table class="data-table">

                    <thead>
                        <tr>
                            <th>Benutzer</th>
                            <th>Rolle</th>
                            <th>Berechtigung</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        ${USERS.map(user => `

                            <tr>

                                <td>
                                    <strong>
                                        ${escapeHTML(user.username)}
                                    </strong>
                                </td>

                                <td>
                                    ${escapeHTML(user.role)}
                                </td>

                                <td>
                                    ${escapeHTML(user.permissions)}
                                </td>

                                <td>
                                    <span class="badge badge-green">
                                        DEMO AKTIV
                                    </span>
                                </td>

                            </tr>

                        `).join("")}

                    </tbody>

                </table>

            </div>

        </section>


        <div style="
            margin-top:12px;
            color:#687384;
            font-size:9px;
        ">
            Passwörter werden absichtlich nicht in der Benutzerverwaltung angezeigt.
        </div>
        `;
}


/* =========================================================
   PAGE ROUTER
========================================================= */

function renderPage(page) {

    currentPage = page;

    document.querySelectorAll(".nav-item").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === page
        );

    });

    updateTopTitle();

    switch (page) {

        case "dashboard":
            renderDashboard();
            break;

        case "customers":
            renderCustomers();
            break;

        case "devices":
            renderDevices();
            break;

        case "ips":
            renderIPs();
            break;

        case "networks":
            renderNetworks();
            break;

        case "wifi":
            renderWifi();
            break;

        case "printers":
            renderPrinters();
            break;

        case "cameras":
            renderCameras();
            break;

        case "servers":
            renderServers();
            break;

        case "alerts":
            renderAlerts();
            break;

        case "logs":
            renderLogs();
            break;

        case "users":
            renderUsers();
            break;

        default:
            renderDashboard();
    }
}


function updateTopTitle(customTitle = null) {

    const titles = {
        dashboard: "Dashboard",
        customers: "Kunden",
        devices: "Geräte",
        ips: "IP-Adressen",
        networks: "Netzwerke",
        wifi: "Access Points / WLAN",
        printers: "Drucker",
        cameras: "Kameras",
        servers: "Server",
        alerts: "Probleme / Warnungen",
        logs: "Änderungsprotokoll",
        users: "Benutzer & Berechtigungen"
    };

    document.getElementById("pageTitleTop").textContent =
        customTitle || titles[currentPage] || "Dashboard";
}


/* =========================================================
   SEARCH
========================================================= */

function globalSearch() {

    const input =
        document.getElementById("globalSearch");

    const value = input.value.trim();

    if (!value) return;

    renderDevices(value);

    updateTopTitle("Gerätesuche");

    document.querySelectorAll(".nav-item").forEach(button => {
        button.classList.remove("active");
    });

    showToast(`${value}: Suche in Geräten gestartet.`);
}


/* =========================================================
   MODAL
========================================================= */

function closeModal(event) {

    if (
        event &&
        event.target &&
        !event.target.classList.contains("modal-overlay")
    ) {
        return;
    }

    document.getElementById("modalRoot").innerHTML = "";
}


/* =========================================================
   DEMO QR
========================================================= */

function generateDemoQR(device) {

    const size = 21;
    let cells = "";

    let hash = 0;

    for (let i = 0; i < device.id.length; i++) {
        hash =
            ((hash << 5) - hash) +
            device.id.charCodeAt(i);

        hash |= 0;
    }

    function finder(x, y) {

        let result = "";

        for (let row = 0; row < 7; row++) {

            for (let col = 0; col < 7; col++) {

                const outer =
                    row === 0 ||
                    row === 6 ||
                    col === 0 ||
                    col === 6;

                const inner =
                    row >= 2 &&
                    row <= 4 &&
                    col >= 2 &&
                    col <= 4;

                if (outer || inner) {

                    result += `
                        <rect
                            x="${x + col}"
                            y="${y + row}"
                            width="1"
                            height="1"
                            fill="#111"
                        />
                    `;
                }
            }
        }

        return result;
    }

    cells += finder(0, 0);
    cells += finder(14, 0);
    cells += finder(0, 14);

    for (let y = 0; y < size; y++) {

        for (let x = 0; x < size; x++) {

            const inFinder =
                (x < 7 && y < 7) ||
                (x >= 14 && y < 7) ||
                (x < 7 && y >= 14);

            if (inFinder) continue;

            const value =
                Math.abs(
                    hash +
                    x * 31 +
                    y * 17 +
                    x * y
                ) % 7;

            if (value < 3) {

                cells += `
                    <rect
                        x="${x}"
                        y="${y}"
                        width="1"
                        height="1"
                        fill="#111"
                    />
                `;
            }
        }
    }

    return `
        <svg
            class="demo-qr"
            viewBox="0 0 21 21"
            xmlns="http://www.w3.org/2000/svg"
        >
            ${cells}
        </svg>
    `;
}


/* =========================================================
   ALERT COUNTER
========================================================= */

function updateAlertCount() {

    const count =
        data.alerts.filter(
            a => a.status === "offen"
        ).length;

    document.getElementById("alertCount").textContent = count;
}


/* =========================================================
   EVENT LISTENERS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadData();

    updateAlertCount();


    document
        .getElementById("loginForm")
        .addEventListener("submit", event => {

            event.preventDefault();
            login();

        });


    document
        .getElementById("logoutButton")
        .addEventListener("click", logout);


    document
        .querySelectorAll(".nav-item")
        .forEach(button => {

            button.addEventListener("click", () => {

                renderPage(
                    button.dataset.page
                );

            });

        });


    document
        .getElementById("globalSearch")
        .addEventListener("keydown", event => {

            if (event.key === "Enter") {
                globalSearch();
            }

        });

});