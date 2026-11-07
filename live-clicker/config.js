/* ===========================================================================
   LIVE CLICKER  ·  CONFIG
   Dr. Sharilyn Rennie · BIO 004
   ---------------------------------------------------------------------------
   1) Create a free Firebase project (see SETUP.md), turn on Realtime Database,
      then paste your web-app config between the braces below.
   2) Pick a room code for the class. Your dashboard and the student page must
      use the SAME code. Change it per class or per day if you like.
   3) POINT_BUDGET is how many confidence points each student spreads across
      the four options (Confidence-Based Testing). 4 is the usual.
   =========================================================================== */

window.FIREBASE_CONFIG = {
  apiKey:            "AIzaSyDYAf05Br0OoBOdNar_yp1hBfuMg7huUX8",
  authDomain:        "tbl-interactive-dashboard.firebaseapp.com",
  databaseURL:       "https://tbl-interactive-dashboard-default-rtdb.firebaseio.com",
  projectId:         "tbl-interactive-dashboard",
  storageBucket:     "tbl-interactive-dashboard.firebasestorage.app",
  messagingSenderId: "187790279963",
  appId:             "1:187790279963:web:b3a0872a1c870768173fbe"
};

window.SESSION      = "cardiac-conduction";   // shared room code
window.POINT_BUDGET = 4;                       // confidence points per question

/* Google Sheet: the Apps Script web app the dashboard posts to with "Send to sheet". */
window.SHEET_URL = "https://script.google.com/macros/s/AKfycbyedRRM9unCmwv1fNHInzyXVGtDwCBAgmunQxEaCVgKLho_2sp068PWHHGhS34LNv_y/exec";

/* Rooms shown as buttons at the top of the dashboard. Each lecture deck has three class sets: A, B and C
   (pick the set on the deck's title bar). Set A uses the plain room, B adds "b", C adds "c",
   so each class answers its own questions and the gradebook stays separate. */
window.ROOMS = {
  "Respiratory": ["resp4", "resp4b", "resp4c"],
  "Lower limb":  ["limb4", "limb4b", "limb4c"],
  "Lymphatic":   ["lymph4", "lymph4b", "lymph4c"],
  "Digestive":   ["gi4", "gi4b", "gi4c"],
  "Blood vessels": ["flow4", "flow4b", "flow4c"],
  "Heart, W9 (BIO 005)": ["heart9", "heart9b", "heart9c"],
  "Vessels, W10 (BIO 005)": ["vessels10", "vessels10b", "vessels10c"],
  "Cardiac":     [window.SESSION]
};
