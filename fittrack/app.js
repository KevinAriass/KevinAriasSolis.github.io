
// ============================================
// FITTRACK PWA - DAILY WORKOUT TRACKER v4
// Firebase + Wellness + Profile + Weight + Trends + Videos
// ============================================

// === Firebase Configuration ===
const firebaseConfig = {
    apiKey: "AIzaSyCKCee_1RoJwtGOGQcgyrhNU-FJ7Z7bBEs",
    authDomain: "fittrack-899e8.firebaseapp.com",
    projectId: "fittrack-899e8",
    storageBucket: "fittrack-899e8.firebasestorage.app",
    messagingSenderId: "598492494330",
    appId: "1:598492494330:web:cc8dbbfb71eb1be07b0c43",
    measurementId: "G-FR1DHKDTTP"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
db.settings({ cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED });

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(function(err) {
        console.log('SW:', err);
    });
}

// === Constants ===
const JUMP_GOAL = 1000;
const CALORIES_PER_JUMP = 0.14;

const REWARDS = [
    { calories: 200, emoji: '🍦', name: 'Ice cream scoop', description: '~200 cal' },
    { calories: 350, emoji: '🍕', name: 'Slice of pizza', description: '~350 cal' },
    { calories: 500, emoji: '🍔', name: 'Hamburger', description: '~500 cal' },
    { calories: 600, emoji: '🌮', name: '3 Tacos', description: '~600 cal' },
    { calories: 700, emoji: '🍟', name: 'Large fries + soda', description: '~700 cal' },
    { calories: 800, emoji: '🍩', name: '4 Donuts', description: '~800 cal' },
    { calories: 900, emoji: '🎂', name: 'Slice of cake', description: '~900 cal' },
    { calories: 1000, emoji: '🍝', name: 'Pasta Alfredo', description: '~1000 cal' }
];

const EXERCISES = [
    { id: 'pushups', name: 'Push-ups', reps: '3 sets x 10 reps', category: 'Upper Body', calPerSet: 20, video: 'https://www.youtube.com/shorts/IODxDxX7oi4' },
    { id: 'squats', name: 'Squats', reps: '3 sets x 15 reps', category: 'Lower Body', calPerSet: 30, video: 'https://www.youtube.com/shorts/YaXPRqUwItQ' },
    { id: 'plank', name: 'Plank', reps: '3 sets x 30 seconds', category: 'Core', calPerSet: 15, video: 'https://www.youtube.com/shorts/yeKv5oX_6GY' },
    { id: 'lunges', name: 'Lunges', reps: '3 sets x 10 each leg', category: 'Lower Body', calPerSet: 28, video: 'https://www.youtube.com/shorts/QOVaHwm-Q6U' },
    { id: 'burpees', name: 'Burpees', reps: '3 sets x 8 reps', category: 'Full Body', calPerSet: 40, video: 'https://www.youtube.com/shorts/dZgVxmf6jkA' },
    { id: 'mountain_climbers', name: 'Mountain Climbers', reps: '3 sets x 20 reps', category: 'Cardio', calPerSet: 30, video: 'https://www.youtube.com/shorts/nmwgirgXLYM' },
    { id: 'crunches', name: 'Crunches', reps: '3 sets x 15 reps', category: 'Core', calPerSet: 15, video: 'https://www.youtube.com/shorts/1fbU_MkV7NE' },
    { id: 'jumping_jacks', name: 'Jumping Jacks', reps: '3 sets x 20 reps', category: 'Cardio', calPerSet: 25, video: 'https://www.youtube.com/shorts/CWpmIW6l-YA' },
    { id: 'tricep_dips', name: 'Tricep Dips (chair)', reps: '3 sets x 10 reps', category: 'Upper Body', calPerSet: 20, video: 'https://www.youtube.com/shorts/6kALZikXxLc' },
    { id: 'glute_bridge', name: 'Glute Bridge', reps: '3 sets x 15 reps', category: 'Lower Body', calPerSet: 22, video: 'https://www.youtube.com/shorts/OUgsJ8-Vi0E' },
    { id: 'superman', name: 'Superman Hold', reps: '3 sets x 10 reps', category: 'Core', calPerSet: 18, video: 'https://www.youtube.com/shorts/z6PJMT2y8GQ' },
    { id: 'high_knees', name: 'High Knees', reps: '3 sets x 30 seconds', category: 'Cardio', calPerSet: 35, video: 'https://www.youtube.com/shorts/tx5rgpDAJRI' }
];

const MOOD_OPTIONS = [
    { id: 'happy', emoji: '😊', label: 'Happy' },
    { id: 'motivated', emoji: '💪', label: 'Motivated' },
    { id: 'neutral', emoji: '😐', label: 'Neutral' },
    { id: 'tired', emoji: '😴', label: 'Tired' },
    { id: 'stressed', emoji: '😰', label: 'Stressed' },
    { id: 'sad', emoji: '😢', label: 'Sad' },
    { id: 'angry', emoji: '😤', label: 'Angry' },
    { id: 'anxious', emoji: '😟', label: 'Anxious' }
];

const PAIN_AREAS = [
    { id: 'head', label: 'Head' }, { id: 'neck', label: 'Neck' },
    { id: 'shoulders', label: 'Shoulders' }, { id: 'back_upper', label: 'Upper Back' },
    { id: 'back_lower', label: 'Lower Back' }, { id: 'chest', label: 'Chest' },
    { id: 'arms', label: 'Arms' }, { id: 'wrists', label: 'Wrists' },
    { id: 'hips', label: 'Hips' }, { id: 'knees', label: 'Knees' },
    { id: 'legs', label: 'Legs' }, { id: 'ankles', label: 'Ankles' },
    { id: 'feet', label: 'Feet' }, { id: 'stomach', label: 'Stomach' }
];

// === State ===
let appData = {};
let wellnessData = {};
let profileData = {};
let weightHistory = [];
let currentView = 'today';
let calendarMonth = new Date().getMonth();
let calendarYear = new Date().getFullYear();
let currentUser = null;

// === Initialize ===
document.addEventListener('DOMContentLoaded', function() {
    initSplashScreen();
    initAuth();
});

function initSplashScreen() {
    setTimeout(function() {
        document.getElementById('splashScreen').classList.add('hidden');
    }, 1500);
}

// === Authentication ===
function initAuth() {
    auth.onAuthStateChanged(function(user) {
        if (user) { currentUser = user; showApp(); loadAllData(); }
        else { currentUser = null; showAuthScreen(); }
    });

    document.getElementById('authForm').addEventListener('submit', function(e) { e.preventDefault(); loginUser(); });
    document.getElementById('btnRegister').addEventListener('click', function() { registerUser(); });
    document.getElementById('btnLogout').addEventListener('click', function() { auth.signOut(); });
}

function loginUser() {
    let email = document.getElementById('authEmail').value.trim();
    let password = document.getElementById('authPassword').value;
    hideAuthError();
    if (!email) { showAuthError('Please enter your email'); return; }
    if (!password) { showAuthError('Please enter your password'); return; }
    auth.signInWithEmailAndPassword(email, password).catch(function(error) { showAuthError(getAuthErrorMessage(error.code)); });
}

function registerUser() {
    let email = document.getElementById('authEmail').value.trim();
    let password = document.getElementById('authPassword').value;
    hideAuthError();
    if (!email) { showAuthError('Please enter your email'); return; }
    if (!email.includes('@') || !email.includes('.')) { showAuthError('Please enter a valid email'); return; }
    if (!password || password.length < 6) { showAuthError('Password must be at least 6 characters'); return; }
    auth.createUserWithEmailAndPassword(email, password).catch(function(error) { showAuthError(getAuthErrorMessage(error.code)); });
}

function getAuthErrorMessage(code) {
    switch (code) {
        case 'auth/user-not-found': return 'No account found. Click "Create Account"';
        case 'auth/wrong-password': return 'Incorrect password';
        case 'auth/email-already-in-use': return 'Email already registered. Try logging in';
        case 'auth/weak-password': return 'Password must be at least 6 characters';
        case 'auth/invalid-email': return 'Invalid email address';
        case 'auth/too-many-requests': return 'Too many attempts. Try again later';
        case 'auth/invalid-credential': return 'Invalid email or password';
        default: return 'An error occurred. Please try again';
    }
}

function showAuthError(msg) { let el = document.getElementById('authError'); el.textContent = msg; el.classList.remove('hidden'); }
function hideAuthError() { document.getElementById('authError').classList.add('hidden'); }
function showAuthScreen() { document.getElementById('authScreen').classList.remove('hidden'); document.getElementById('app').classList.add('hidden'); }

function showApp() {
    document.getElementById('authScreen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    initNavigation();
    setTodayDate();
}

// === Load All Data ===
function loadAllData() {
    if (!currentUser) return;
    let uid = currentUser.uid;

    db.collection('users').doc(uid).collection('workouts').get()
        .then(function(snap) { appData = {}; snap.forEach(function(doc) { appData[doc.id] = doc.data(); }); renderCurrentView(); })
        .catch(function() { renderCurrentView(); });

    db.collection('users').doc(uid).collection('wellness').get()
        .then(function(snap) { wellnessData = {}; snap.forEach(function(doc) { wellnessData[doc.id] = doc.data(); }); })
        .catch(function() {});

    db.collection('users').doc(uid).collection('weightLog').orderBy('date', 'asc').get()
        .then(function(snap) { weightHistory = []; snap.forEach(function(doc) { weightHistory.push(doc.data()); }); })
        .catch(function() {});

    db.collection('users').doc(uid).get()
        .then(function(doc) { if (doc.exists) profileData = doc.data(); else profileData = {}; })
        .catch(function() {});
}

// === Save Functions ===
function saveWorkout() {
    if (!currentUser) return;
    let today = getTodayKey();
    let dayData = appData[today];
    if (dayData) db.collection('users').doc(currentUser.uid).collection('workouts').doc(today).set(dayData).catch(function(e) { console.log('Save error:', e); });
}

function saveWellness() {
    if (!currentUser) return;
    let today = getTodayKey();
    let data = wellnessData[today];
    if (data) db.collection('users').doc(currentUser.uid).collection('wellness').doc(today).set(data).catch(function(e) { console.log('Save error:', e); });
}

function saveProfile() {
    if (!currentUser) return;
    db.collection('users').doc(currentUser.uid).set(profileData, { merge: true }).catch(function(e) { console.log('Save error:', e); });
}

function saveWeight(weight, date) {
    if (!currentUser) return;
    let entry = { weight: weight, date: date, timestamp: new Date().toISOString() };
    db.collection('users').doc(currentUser.uid).collection('weightLog').doc(date).set(entry)
        .then(function() {
            let existing = weightHistory.findIndex(function(w) { return w.date === date; });
            if (existing > -1) weightHistory[existing] = entry;
            else { weightHistory.push(entry); weightHistory.sort(function(a, b) { return a.date.localeCompare(b.date); }); }
        })
        .catch(function(e) { console.log('Weight save error:', e); });
}

// === Navigation ===
function setTodayDate() {
    let today = new Date();
    let options = { weekday: 'long', day: 'numeric', month: 'short' };
    document.getElementById('todayDate').textContent = today.toLocaleDateString('en-US', options);
}

function initNavigation() {
    let navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            navBtns.forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
            currentView = btn.getAttribute('data-view');
            renderCurrentView();
        });
    });
}

function renderCurrentView() {
    let content = document.getElementById('content');
    switch (currentView) {
        case 'today': renderTodayView(content); break;
        case 'calendar': renderCalendarView(content); break;
        case 'wellness': renderWellnessView(content); break;
        case 'stats': renderStatsView(content); break;
        case 'profile': renderProfileView(content); break;
    }
}

// === TODAY VIEW ===
function renderTodayView(container) {
    let today = getTodayKey();
    let dayData = getDayData(today);
    let jumpCount = dayData.jumpCount || 0;
    let jumpPercent = Math.min((jumpCount / JUMP_GOAL) * 100, 100);
    let jumpStatus = dayData.jumpCompleted ? 'complete' : (dayData.jumpStartTime ? 'active' : 'pending');
    let streak = calculateStreak();

    let statusBadge = '';
    if (jumpStatus === 'pending') statusBadge = '<span class="jump-card-badge badge-pending">Pending</span>';
    else if (jumpStatus === 'active') statusBadge = '<span class="jump-card-badge badge-active">In Progress</span>';
    else statusBadge = '<span class="jump-card-badge badge-complete">✓ Done</span>';

    let html = '<div class="fade-in">';

    if (streak > 0) {
        html += '<div class="streak-banner"><span class="streak-banner-fire">⭐</span><span class="streak-banner-text">' + streak + ' day streak</span><span class="streak-banner-msg">' + getStreakMessage(streak) + '</span></div>';
    }

    html += '<div class="jump-card"><div class="jump-card-header"><span class="jump-card-title">🪢 Jump Rope</span>' + statusBadge + '</div>';
    html += '<div class="jump-counter"><div class="jump-count-display">' + jumpCount + '</div><div class="jump-count-goal">/ ' + JUMP_GOAL + ' jumps</div>';
    html += '<div class="jump-progress-bar"><div class="jump-progress-fill" style="width: ' + jumpPercent + '%"></div></div></div>';
    html += '<div class="jump-time-info"><div class="time-block"><div class="time-label">STARTED</div><div class="time-value">' + (dayData.jumpStartTime || '--') + '</div></div>';
    html += '<div class="time-block"><div class="time-label">FINISHED</div><div class="time-value">' + (dayData.jumpEndTime || '--') + '</div></div>';
    html += '<div class="time-block"><div class="time-label">DURATION</div><div class="time-value">' + (dayData.jumpDuration || '--') + '</div></div></div>';

    if (!dayData.jumpCompleted) {
        html += '<div class="btn-group">';
        if (!dayData.jumpStartTime) html += '<button class="btn btn-primary" id="btnStartJump">START JUMPING</button>';
        else { html += '<button class="btn btn-secondary" id="btnAddJumps">+ Add Jumps</button>'; html += '<button class="btn btn-primary" id="btnFinishJump">Finish ✓</button>'; }
        html += '</div>';
    }
    html += '</div>';

    html += '<div class="exercise-section-title">Today\'s Exercises</div>';
    let todayExercises = getTodayExercises();
    todayExercises.forEach(function(exercise) {
        let isCompleted = dayData.exercises && dayData.exercises[exercise.id];
        html += '<div class="exercise-card ' + (isCompleted ? 'completed' : '') + '" data-exercise-id="' + exercise.id + '">';
        html += '<div class="exercise-checkbox"><span class="exercise-check-icon">✓</span></div>';
        html += '<div class="exercise-info"><div class="exercise-name">' + exercise.name + '</div><div class="exercise-detail">' + exercise.reps + ' • ' + exercise.calPerSet + ' cal</div></div>';
        if (isCompleted) html += '<div class="exercise-time">' + dayData.exercises[exercise.id] + '</div>';
        html += '<button class="exercise-video-btn" data-video="' + exercise.video + '">▶</button>';
        html += '</div>';
    });

    let todayCal = calculateDayCalories(dayData);
    if (todayCal > 0) {
        html += '<div class="calories-card"><div class="calories-header">🔥 Calories Burned Today</div><div class="calories-number">' + todayCal + ' cal</div></div>';
    }

    html += '</div>';
    container.innerHTML = html;

    let btnStart = document.getElementById('btnStartJump');
    if (btnStart) btnStart.addEventListener('click', startJumping);
    let btnAdd = document.getElementById('btnAddJumps');
    if (btnAdd) btnAdd.addEventListener('click', addJumps);
    let btnFinish = document.getElementById('btnFinishJump');
    if (btnFinish) btnFinish.addEventListener('click', finishJumping);

    container.querySelectorAll('.exercise-card').forEach(function(card) {
        card.querySelector('.exercise-checkbox').addEventListener('click', function() {
            toggleExercise(card.getAttribute('data-exercise-id'));
            renderCurrentView();
        });
    });

    // Video button listeners
    container.querySelectorAll('.exercise-video-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            let videoUrl = btn.getAttribute('data-video');
            openVideoModal(videoUrl);
        });
    });
}

// === CALENDAR VIEW ===
function renderCalendarView(container) {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let today = new Date();
    let todayKey = getTodayKey();
    let firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
    let daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

    let html = '<div class="fade-in">';
    html += '<div class="calendar-header"><button class="calendar-nav-btn" id="prevMonth">◀</button><span class="calendar-month-title">' + monthNames[calendarMonth] + ' ' + calendarYear + '</span><button class="calendar-nav-btn" id="nextMonth">▶</button></div>';
    html += '<div class="calendar-grid">';
    dayNames.forEach(function(d) { html += '<div class="calendar-day-name">' + d + '</div>'; });
    for (let i = 0; i < firstDay; i++) html += '<div class="calendar-cell empty"></div>';

    for (let d = 1; d <= daysInMonth; d++) {
        let dateKey = calendarYear + '-' + String(calendarMonth + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
        let dayData = appData[dateKey];
        let cellClass = 'calendar-cell';
        if (dateKey === todayKey) cellClass += ' today';
        if (new Date(dateKey) > today) cellClass += ' future';
        if (dayData && dayData.jumpCompleted) cellClass += ' complete';
        else if (dayData && dayData.jumpCount > 0) cellClass += ' partial';

        html += '<div class="' + cellClass + '"><span class="calendar-day-number">' + d + '</span>';
        if (dayData && dayData.jumpCompleted) html += '<span class="calendar-day-icon">✓</span>';
        else if (dayData && dayData.jumpCount > 0) html += '<span class="calendar-day-icon">◐</span>';
        html += '</div>';
    }
    html += '</div>';

    html += '<div class="calendar-legend"><div class="legend-item"><span class="legend-dot complete"></span> Completed</div><div class="legend-item"><span class="legend-dot partial"></span> Partial</div><div class="legend-item"><span class="legend-dot today-dot"></span> Today</div></div>';

    let weeklyData = getWeeklyData();
    html += '<div class="reward-card"><div class="reward-header">🏆 Weekly Reward</div>';
    html += '<div class="reward-progress"><div class="reward-days">' + weeklyData.completedDays + '/5 days completed</div><div class="reward-progress-bar"><div class="reward-progress-fill" style="width: ' + (weeklyData.completedDays / 5 * 100) + '%"></div></div></div>';
    html += '<div class="reward-calories"><span class="reward-cal-number">' + weeklyData.totalCalories + '</span><span class="reward-cal-label"> calories this week</span></div>';

    if (weeklyData.completedDays >= 5) {
        html += '<div class="reward-unlocked"><div class="reward-unlocked-title">🎉 Reward Unlocked!</div><div class="reward-options">';
        REWARDS.forEach(function(r) { if (weeklyData.totalCalories >= r.calories) html += '<div class="reward-option"><span class="reward-emoji">' + r.emoji + '</span><span class="reward-name">' + r.name + '</span><span class="reward-desc">' + r.description + '</span></div>'; });
        html += '</div></div>';
    } else {
        html += '<div class="reward-locked"><span class="reward-locked-icon">🔒</span><span class="reward-locked-text">' + (5 - weeklyData.completedDays) + ' more days to unlock!</span></div>';
    }
    html += '</div></div>';
    container.innerHTML = html;

    document.getElementById('prevMonth').addEventListener('click', function() { calendarMonth--; if (calendarMonth < 0) { calendarMonth = 11; calendarYear--; } renderCurrentView(); });
    document.getElementById('nextMonth').addEventListener('click', function() { calendarMonth++; if (calendarMonth > 11) { calendarMonth = 0; calendarYear++; } renderCurrentView(); });
}

// === WELLNESS VIEW ===
function renderWellnessView(container) {
    let today = getTodayKey();
    let data = wellnessData[today] || {};

    let html = '<div class="fade-in">';
    html += '<div class="section-title-main">🧠 Daily Wellness Check</div>';
    html += '<p class="section-subtitle">How are you feeling today?</p>';

    html += '<div class="wellness-card"><div class="wellness-card-title">😊 Mood</div><div class="mood-grid">';
    MOOD_OPTIONS.forEach(function(mood) {
        let selected = data.mood === mood.id ? ' selected' : '';
        html += '<button class="mood-btn' + selected + '" data-mood="' + mood.id + '"><span class="mood-emoji">' + mood.emoji + '</span><span class="mood-label">' + mood.label + '</span></button>';
    });
    html += '</div></div>';

    html += '<div class="wellness-card"><div class="wellness-card-title">⚡ Energy Level</div>';
    html += '<div class="slider-container"><input type="range" class="wellness-slider" id="energySlider" min="1" max="5" value="' + (data.energy || 3) + '"><div class="slider-labels"><span>Low</span><span>Medium</span><span>High</span></div></div>';
    html += '<div class="slider-value" id="energyValue">' + getSliderEmoji(data.energy || 3) + '</div></div>';

    html += '<div class="wellness-card"><div class="wellness-card-title">😴 Fatigue Level</div>';
    html += '<div class="slider-container"><input type="range" class="wellness-slider" id="fatigueSlider" min="1" max="5" value="' + (data.fatigue || 1) + '"><div class="slider-labels"><span>None</span><span>Moderate</span><span>Exhausted</span></div></div>';
    html += '<div class="slider-value" id="fatigueValue">' + getFatigueEmoji(data.fatigue || 1) + '</div></div>';

    html += '<div class="wellness-card"><div class="wellness-card-title">🍽️ Hunger Level</div>';
    html += '<div class="slider-container"><input type="range" class="wellness-slider" id="hungerSlider" min="1" max="5" value="' + (data.hunger || 3) + '"><div class="slider-labels"><span>Full</span><span>Normal</span><span>Starving</span></div></div>';
    html += '<div class="slider-value" id="hungerValue">' + getHungerEmoji(data.hunger || 3) + '</div></div>';

    html += '<div class="wellness-card"><div class="wellness-card-title">🌙 Sleep</div>';
    html += '<div class="slider-container"><input type="range" class="wellness-slider" id="sleepSlider" min="1" max="5" value="' + (data.sleepQuality || 3) + '"><div class="slider-labels"><span>Terrible</span><span>OK</span><span>Amazing</span></div></div>';
    html += '<div class="sleep-hours-group"><label class="auth-label">Hours slept</label><input type="number" class="auth-input sleep-input" id="sleepHours" placeholder="8" min="0" max="24" step="0.5" value="' + (data.sleepHours || '') + '"></div></div>';

    html += '<div class="wellness-card"><div class="wellness-card-title">🤕 Pain / Discomfort</div><div class="pain-grid">';
    PAIN_AREAS.forEach(function(area) {
        let active = data.pain && data.pain.indexOf(area.id) > -1 ? ' active' : '';
        html += '<button class="pain-btn' + active + '" data-pain="' + area.id + '">' + area.label + '</button>';
    });
    html += '</div>';
    if (data.pain && data.pain.length > 0) {
        html += '<div class="pain-intensity"><label class="auth-label">Pain intensity (1-10)</label><input type="range" class="wellness-slider" id="painIntensity" min="1" max="10" value="' + (data.painIntensity || 5) + '"><div class="slider-labels"><span>Mild</span><span>Moderate</span><span>Severe</span></div></div>';
    }
    html += '</div>';

    html += '<div class="wellness-card"><div class="wellness-card-title">📝 Notes</div>';
    html += '<textarea class="wellness-notes" id="wellnessNotes" placeholder="How do you feel? Any observations...">' + (data.notes || '') + '</textarea></div>';

    html += '<button class="btn btn-primary wellness-save-btn" id="btnSaveWellness">Save Wellness Check ✓</button>';
    html += '</div>';
    container.innerHTML = html;

    container.querySelectorAll('.mood-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            container.querySelectorAll('.mood-btn').forEach(function(b) { b.classList.remove('selected'); });
            btn.classList.add('selected');
        });
    });

    container.querySelectorAll('.pain-btn').forEach(function(btn) {
        btn.addEventListener('click', function() { btn.classList.toggle('active'); });
    });

    ['energySlider', 'fatigueSlider', 'hungerSlider', 'sleepSlider'].forEach(function(id) {
        let slider = document.getElementById(id);
        if (slider) {
            slider.addEventListener('input', function() {
                if (id === 'energySlider') document.getElementById('energyValue').textContent = getSliderEmoji(parseInt(slider.value));
                if (id === 'fatigueSlider') document.getElementById('fatigueValue').textContent = getFatigueEmoji(parseInt(slider.value));
                if (id === 'hungerSlider') document.getElementById('hungerValue').textContent = getHungerEmoji(parseInt(slider.value));
            });
        }
    });

    document.getElementById('btnSaveWellness').addEventListener('click', function() {
        let todayData = {};
        let selectedMood = container.querySelector('.mood-btn.selected');
        if (selectedMood) todayData.mood = selectedMood.getAttribute('data-mood');
        todayData.energy = parseInt(document.getElementById('energySlider').value);
        todayData.fatigue = parseInt(document.getElementById('fatigueSlider').value);
        todayData.hunger = parseInt(document.getElementById('hungerSlider').value);
        todayData.sleepQuality = parseInt(document.getElementById('sleepSlider').value);
        let sleepH = document.getElementById('sleepHours').value;
        if (sleepH) todayData.sleepHours = parseFloat(sleepH);
        todayData.pain = [];
        container.querySelectorAll('.pain-btn.active').forEach(function(btn) { todayData.pain.push(btn.getAttribute('data-pain')); });
        let painInt = document.getElementById('painIntensity');
        if (painInt) todayData.painIntensity = parseInt(painInt.value);
        todayData.notes = document.getElementById('wellnessNotes').value;
        todayData.timestamp = new Date().toISOString();

        wellnessData[today] = todayData;
        saveWellness();
        alert('Wellness check saved! ✓');
    });
}

// === STATS VIEW (with Trends) ===
function renderStatsView(container) {
    let days = Object.keys(appData);
    let totalDays = days.length;
    let completedDays = days.filter(function(d) { return appData[d].jumpCompleted; }).length;
    let totalJumps = days.reduce(function(sum, d) { return sum + (appData[d].jumpCount || 0); }, 0);
    let totalExercises = days.reduce(function(sum, d) { return sum + (appData[d].exercises ? Object.keys(appData[d].exercises).length : 0); }, 0);
    let totalCalories = days.reduce(function(sum, d) { return sum + calculateDayCalories(appData[d]); }, 0);
    let streak = calculateStreak();

    let html = '<div class="fade-in">';
    html += '<div class="streak-card"><div class="streak-number">' + streak + ' 🔥</div><div class="streak-label">Day Streak</div><div class="streak-message">' + getStreakMessage(streak) + '</div></div>';

    html += '<div class="stats-grid">';
    html += '<div class="stats-card"><div class="stats-card-number">' + totalJumps.toLocaleString() + '</div><div class="stats-card-label">Total Jumps</div></div>';
    html += '<div class="stats-card"><div class="stats-card-number">' + completedDays + '</div><div class="stats-card-label">Days Completed</div></div>';
    html += '<div class="stats-card"><div class="stats-card-number">' + totalCalories.toLocaleString() + '</div><div class="stats-card-label">Total Calories</div></div>';
    html += '<div class="stats-card"><div class="stats-card-number">' + totalExercises + '</div><div class="stats-card-label">Exercises Done</div></div>';
    html += '</div>';

    // === WEIGHT TREND ===
    html += '<div class="exercise-section-title">⚖️ Weight Trend</div>';

    if (weightHistory.length > 0) {
        let latest = weightHistory[weightHistory.length - 1];
        let first = weightHistory[0];
        let diff = (latest.weight - first.weight).toFixed(1);
        let diffColor = diff <= 0 ? 'var(--green-primary)' : 'var(--red)';
        let diffSign = diff <= 0 ? '' : '+';
        let arrow = diff <= 0 ? '↓' : '↑';

        html += '<div class="trend-summary">';
        html += '<div class="trend-current"><div class="trend-current-number">' + latest.weight + ' kg</div><div class="trend-current-label">Current Weight</div></div>';
        html += '<div class="trend-change" style="color: ' + diffColor + '"><div class="trend-change-number">' + arrow + ' ' + diffSign + diff + ' kg</div><div class="trend-change-label">Since ' + formatDateShort(first.date) + '</div></div>';
        html += '</div>';

        // Weight chart
        html += '<div class="weight-chart">';
        let maxWeight = Math.max.apply(null, weightHistory.map(function(w) { return w.weight; }));
        let minWeight = Math.min.apply(null, weightHistory.map(function(w) { return w.weight; }));
        let range = maxWeight - minWeight || 1;

        let recentWeights = weightHistory.slice(-10);
        recentWeights.forEach(function(entry) {
            let height = Math.round(((entry.weight - minWeight) / range) * 60 + 30);
            let dateLabel = formatDateShort(entry.date);
            html += '<div class="weight-bar-group">';
            html += '<div class="weight-bar-value">' + entry.weight + '</div>';
            html += '<div class="weight-bar" style="height: ' + height + 'px; min-height: ' + height + 'px; max-height: ' + height + 'px;"></div>';
            html += '<div class="weight-bar-date">' + dateLabel + '</div>';
            html += '</div>';
        });
        html += '</div>';

        html += '<div class="weight-history-list">';
        weightHistory.slice().reverse().slice(0, 8).forEach(function(entry) {
            let date = new Date(entry.date + 'T12:00:00');
            let dateStr = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
            html += '<div class="weight-history-item"><span class="weight-history-date">' + dateStr + '</span><span class="weight-history-value">' + entry.weight + ' kg</span></div>';
        });
        html += '</div>';
    } else {
        html += '<div class="empty-state"><div class="empty-state-icon">⚖️</div><div class="empty-state-text">No weight records yet. Add your weight in the Profile tab.</div></div>';
    }

    // === WELLNESS TRENDS ===
    html += '<div class="exercise-section-title">🧠 Wellness Trends (Last 7 days)</div>';

    let wellnessDays = Object.keys(wellnessData).sort().reverse().slice(0, 7).reverse();
    if (wellnessDays.length > 0) {
        html += '<div class="trend-card"><div class="trend-card-title">Mood History</div><div class="mood-history">';
        wellnessDays.forEach(function(day) {
            let w = wellnessData[day];
            let moodObj = MOOD_OPTIONS.find(function(m) { return m.id === w.mood; });
            let emoji = moodObj ? moodObj.emoji : '❓';
            let dateLabel = formatDateShort(day);
            html += '<div class="mood-history-item"><div class="mood-history-emoji">' + emoji + '</div><div class="mood-history-date">' + dateLabel + '</div></div>';
        });
        html += '</div></div>';

        let avgEnergy = 0, avgSleep = 0, avgFatigue = 0, count = 0;
        wellnessDays.forEach(function(day) {
            let w = wellnessData[day];
            if (w.energy) { avgEnergy += w.energy; count++; }
            if (w.sleepHours) avgSleep += w.sleepHours;
            if (w.fatigue) avgFatigue += w.fatigue;
        });
        if (count > 0) {
            avgEnergy = (avgEnergy / count).toFixed(1);
            avgSleep = (avgSleep / count).toFixed(1);
            avgFatigue = (avgFatigue / count).toFixed(1);
        }

        html += '<div class="stats-grid">';
        html += '<div class="stats-card"><div class="stats-card-number">⚡ ' + avgEnergy + '/5</div><div class="stats-card-label">Avg Energy</div></div>';
        html += '<div class="stats-card"><div class="stats-card-number">🌙 ' + avgSleep + 'h</div><div class="stats-card-label">Avg Sleep</div></div>';
        html += '<div class="stats-card"><div class="stats-card-number">😴 ' + avgFatigue + '/5</div><div class="stats-card-label">Avg Fatigue</div></div>';
        html += '<div class="stats-card"><div class="stats-card-number">📅 ' + wellnessDays.length + '</div><div class="stats-card-label">Days Tracked</div></div>';
        html += '</div>';

        let painCount = {};
        Object.keys(wellnessData).forEach(function(day) {
            let w = wellnessData[day];
            if (w.pain && w.pain.length > 0) {
                w.pain.forEach(function(p) { painCount[p] = (painCount[p] || 0) + 1; });
            }
        });

        let painKeys = Object.keys(painCount).sort(function(a, b) { return painCount[b] - painCount[a]; });
        if (painKeys.length > 0) {
            html += '<div class="trend-card"><div class="trend-card-title">🤕 Most Frequent Pain Areas</div>';
            painKeys.slice(0, 5).forEach(function(key) {
                let area = PAIN_AREAS.find(function(a) { return a.id === key; });
                let label = area ? area.label : key;
                html += '<div class="pain-freq-item"><span class="pain-freq-label">' + label + '</span><span class="pain-freq-count">' + painCount[key] + 'x</span></div>';
            });
            html += '</div>';
        }
    } else {
        html += '<div class="empty-state"><div class="empty-state-icon">🧠</div><div class="empty-state-text">No wellness data yet. Fill your daily check in the Wellness tab.</div></div>';
    }

    // === REWARDS EARNED ===
    if (totalCalories > 0) {
        html += '<div class="exercise-section-title">🍔 You\'ve Earned</div>';
        REWARDS.forEach(function(reward) {
            let times = Math.floor(totalCalories / reward.calories);
            if (times > 0) html += '<div class="exercise-card"><div class="exercise-info"><div class="exercise-name">' + reward.emoji + ' ' + times + 'x ' + reward.name + '</div><div class="exercise-detail">' + (times * reward.calories) + ' cal equivalent</div></div></div>';
        });
    }

    html += '</div>';
    container.innerHTML = html;
}

// === PROFILE VIEW ===
function renderProfileView(container) {
    let html = '<div class="fade-in">';
    html += '<div class="section-title-main">👤 My Profile</div>';

    html += '<div class="profile-card"><div class="profile-card-title">📧 Account</div>';
    html += '<div class="profile-field"><span class="profile-label">Email</span><span class="profile-value">' + (currentUser ? currentUser.email : '') + '</span></div>';
    html += '<div class="profile-field"><span class="profile-label">Member since</span><span class="profile-value">' + (currentUser ? new Date(currentUser.metadata.creationTime).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '') + '</span></div>';
    html += '</div>';

    // Weight Log
    html += '<div class="profile-card"><div class="profile-card-title">⚖️ Log Weight</div>';
    html += '<div class="weight-log-form">';
    html += '<div class="profile-input-group"><label class="auth-label">Weight (kg)</label><input type="number" class="auth-input" id="weightInput" placeholder="70.5" step="0.1"></div>';
    html += '<div class="profile-input-group"><label class="auth-label">Date</label><input type="date" class="auth-input" id="weightDate" value="' + getTodayKey() + '"></div>';
    html += '<button class="btn btn-primary" id="btnLogWeight" style="margin-top: 12px; width: 100%;">Log Weight ⚖️</button>';
    html += '</div>';

    if (weightHistory.length > 0) {
        html += '<div class="weight-recent-title">Recent Entries</div>';
        html += '<div class="weight-history-list">';
        weightHistory.slice().reverse().slice(0, 5).forEach(function(entry) {
            let date = new Date(entry.date + 'T12:00:00');
            let dateStr = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
            html += '<div class="weight-history-item"><span class="weight-history-date">' + dateStr + '</span><span class="weight-history-value">' + entry.weight + ' kg</span></div>';
        });
        html += '</div>';
    }
    html += '</div>';

    // Body info
    html += '<div class="profile-card"><div class="profile-card-title">📏 Body Info</div>';
    html += '<div class="profile-form-grid">';
    html += '<div class="profile-input-group"><label class="auth-label">Height (cm)</label><input type="number" class="auth-input" id="profileHeight" placeholder="170" value="' + (profileData.height || '') + '"></div>';
    html += '<div class="profile-input-group"><label class="auth-label">Age</label><input type="number" class="auth-input" id="profileAge" placeholder="25" value="' + (profileData.age || '') + '"></div>';
    html += '<div class="profile-input-group"><label class="auth-label">Gender</label><select class="auth-input" id="profileGender"><option value="">Select</option><option value="male"' + (profileData.gender === 'male' ? ' selected' : '') + '>Male</option><option value="female"' + (profileData.gender === 'female' ? ' selected' : '') + '>Female</option><option value="other"' + (profileData.gender === 'other' ? ' selected' : '') + '>Other</option></select></div>';
    html += '</div></div>';

    // Fitness goal
    html += '<div class="profile-card"><div class="profile-card-title">🎯 Fitness Goal</div><div class="goal-grid">';
    let goals = [
        { id: 'lose_weight', emoji: '⬇️', label: 'Lose Weight' },
        { id: 'gain_muscle', emoji: '💪', label: 'Gain Muscle' },
        { id: 'stay_fit', emoji: '🏃', label: 'Stay Fit' },
        { id: 'flexibility', emoji: '🧘', label: 'Flexibility' },
        { id: 'endurance', emoji: '🫀', label: 'Endurance' },
        { id: 'stress_relief', emoji: '🧘‍♂️', label: 'Stress Relief' }
    ];
    goals.forEach(function(goal) {
        let selected = profileData.goal === goal.id ? ' selected' : '';
        html += '<button class="goal-btn' + selected + '" data-goal="' + goal.id + '"><span class="goal-emoji">' + goal.emoji + '</span><span class="goal-label">' + goal.label + '</span></button>';
    });
    html += '</div></div>';

    // Medical
    html += '<div class="profile-card"><div class="profile-card-title">🏥 Medical Conditions</div>';
    html += '<textarea class="wellness-notes" id="profileMedical" placeholder="Any conditions, allergies, injuries...">' + (profileData.medical || '') + '</textarea></div>';

    // Save
    html += '<button class="btn btn-primary wellness-save-btn" id="btnSaveProfile">Save Profile ✓</button>';

    // Change password
    html += '<div class="profile-card"><div class="profile-card-title">🔒 Change Password</div>';
    html += '<div class="profile-input-group"><label class="auth-label">New Password</label><input type="password" class="auth-input" id="newPassword" placeholder="Min 6 characters"></div>';
    html += '<button class="btn btn-secondary" id="btnChangePassword" style="margin-top: 12px;">Update Password</button></div>';

    // Logout
    html += '<button class="btn btn-danger wellness-save-btn" id="btnLogoutProfile">Logout</button>';
    html += '</div>';
    container.innerHTML = html;

    container.querySelectorAll('.goal-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            container.querySelectorAll('.goal-btn').forEach(function(b) { b.classList.remove('selected'); });
            btn.classList.add('selected');
        });
    });

    document.getElementById('btnLogWeight').addEventListener('click', function() {
        let weight = parseFloat(document.getElementById('weightInput').value);
        let date = document.getElementById('weightDate').value;
        if (!weight || weight < 20 || weight > 300) { alert('Please enter a valid weight (20-300 kg)'); return; }
        if (!date) { alert('Please select a date'); return; }
        saveWeight(weight, date);
        alert('Weight logged: ' + weight + ' kg ✓');
        document.getElementById('weightInput').value = '';
        setTimeout(function() { renderCurrentView(); }, 500);
    });

    document.getElementById('btnSaveProfile').addEventListener('click', function() {
        profileData.height = document.getElementById('profileHeight').value ? parseFloat(document.getElementById('profileHeight').value) : null;
        profileData.age = document.getElementById('profileAge').value ? parseInt(document.getElementById('profileAge').value) : null;
        profileData.gender = document.getElementById('profileGender').value || null;
        profileData.medical = document.getElementById('profileMedical').value || null;
        let selectedGoal = container.querySelector('.goal-btn.selected');
        if (selectedGoal) profileData.goal = selectedGoal.getAttribute('data-goal');
        profileData.updatedAt = new Date().toISOString();
        saveProfile();
        alert('Profile saved! ✓');
    });

    document.getElementById('btnChangePassword').addEventListener('click', function() {
        let newPass = document.getElementById('newPassword').value;
        if (!newPass || newPass.length < 6) { alert('Password must be at least 6 characters'); return; }
        currentUser.updatePassword(newPass).then(function() { alert('Password updated! ✓'); document.getElementById('newPassword').value = ''; }).catch(function(err) { alert('Error: ' + err.message); });
    });

    document.getElementById('btnLogoutProfile').addEventListener('click', function() { auth.signOut(); });
}

// === Video Modal ===
function openVideoModal(url) {
    let videoId = '';
    if (url.indexOf('shorts/') > -1) {
        videoId = url.split('shorts/')[1].split('?')[0];
    } else if (url.indexOf('v=') > -1) {
        videoId = url.split('v=')[1].split('&')[0];
    }

    let modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = '<div class="video-modal-overlay"></div>' +
        '<div class="video-modal-content">' +
        '<button class="video-modal-close">✕</button>' +
        '<div class="video-modal-player">' +
        '<iframe src="https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1" ' +
        'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>' +
        '</div></div>';

    document.body.appendChild(modal);
    setTimeout(function() { modal.classList.add('active'); }, 10);

    modal.querySelector('.video-modal-overlay').addEventListener('click', function() { closeVideoModal(modal); });
    modal.querySelector('.video-modal-close').addEventListener('click', function() { closeVideoModal(modal); });
}

function closeVideoModal(modal) {
    modal.classList.remove('active');
    setTimeout(function() { modal.remove(); }, 300);
}

// === Helper Functions ===
function getSliderEmoji(val) { return ['', '😫 Very Low', '😕 Low', '😐 Normal', '😊 Good', '🔥 High'][val]; }
function getFatigueEmoji(val) { return ['', '😊 Fresh', '🙂 Slight', '😐 Moderate', '😩 High', '😵 Exhausted'][val]; }
function getHungerEmoji(val) { return ['', '😊 Full', '🙂 Satisfied', '😐 Normal', '😋 Hungry', '🤤 Starving'][val]; }

function formatDateShort(dateStr) {
    let d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
}

// === Jump Functions ===
function startJumping() {
    let today = getTodayKey();
    let dayData = getDayData(today);
    dayData.jumpStartTime = getCurrentTime();
    dayData.jumpCount = dayData.jumpCount || 0;
    appData[today] = dayData;
    saveWorkout();
    renderCurrentView();
}

function addJumps() {
    let input = prompt('How many jumps did you do?', '100');
    if (input === null) return;
    let jumps = parseInt(input);
    if (isNaN(jumps) || jumps <= 0) return;
    let today = getTodayKey();
    let dayData = getDayData(today);
    dayData.jumpCount = (dayData.jumpCount || 0) + jumps;
    if (dayData.jumpCount >= JUMP_GOAL) {
        dayData.jumpCount = JUMP_GOAL;
        dayData.jumpCompleted = true;
        dayData.jumpEndTime = getCurrentTime();
        dayData.jumpDuration = calculateDuration(dayData.jumpStartTime, dayData.jumpEndTime);
    }
    appData[today] = dayData;
    saveWorkout();
    renderCurrentView();
}

function finishJumping() {
    let today = getTodayKey();
    let dayData = getDayData(today);
    if (dayData.jumpCount < JUMP_GOAL) {
        if (!confirm('You have ' + (JUMP_GOAL - dayData.jumpCount) + ' jumps remaining. Mark as complete?')) return;
    }
    dayData.jumpCompleted = true;
    dayData.jumpEndTime = getCurrentTime();
    dayData.jumpDuration = calculateDuration(dayData.jumpStartTime, dayData.jumpEndTime);
    appData[today] = dayData;
    saveWorkout();
    renderCurrentView();
}

function toggleExercise(exerciseId) {
    let today = getTodayKey();
    let dayData = getDayData(today);
    if (!dayData.exercises) dayData.exercises = {};
    if (dayData.exercises[exerciseId]) delete dayData.exercises[exerciseId];
    else dayData.exercises[exerciseId] = getCurrentTime();
    appData[today] = dayData;
    saveWorkout();
}

function getTodayExercises() {
    let today = new Date();
    let dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    let startIndex = (dayOfYear * 6) % EXERCISES.length;
    let exercises = [];
    for (let i = 0; i < 6; i++) exercises.push(EXERCISES[(startIndex + i) % EXERCISES.length]);
    return exercises;
}

function calculateDayCalories(dayData) {
    let cal = 0;
    if (dayData.jumpCount) cal += Math.round(dayData.jumpCount * CALORIES_PER_JUMP);
    if (dayData.exercises) {
        Object.keys(dayData.exercises).forEach(function(exId) {
            let ex = EXERCISES.find(function(e) { return e.id === exId; });
            if (ex) cal += ex.calPerSet;
        });
    }
    return cal;
}

function getWeeklyData() {
    let today = new Date();
    let dayOfWeek = today.getDay();
    let monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
    let completedDays = 0, totalCalories = 0;
    for (let i = 0; i < 7; i++) {
        let checkDate = new Date(monday);
        checkDate.setDate(monday.getDate() + i);
        let key = checkDate.toISOString().split('T')[0];
        if (appData[key]) {
            if (appData[key].jumpCompleted) completedDays++;
            totalCalories += calculateDayCalories(appData[key]);
        }
    }
    return { completedDays: completedDays, totalCalories: totalCalories };
}

function calculateStreak() {
    let streak = 0;
    let checkDate = new Date();
    while (true) {
        let key = checkDate.toISOString().split('T')[0];
        if (appData[key] && appData[key].jumpCompleted) { streak++; checkDate.setDate(checkDate.getDate() - 1); }
        else break;
    }
    return streak;
}

function getStreakMessage(s) {
    if (s === 0) return 'Start today!';
    if (s < 3) return 'Good start!';
    if (s < 7) return 'On fire! 🔥';
    if (s < 14) return 'One week strong! 💪';
    if (s < 30) return 'Unstoppable! 🚀';
    if (s < 60) return 'Legend! 👑';
    return 'Machine! 🏆';
}

function getTodayKey() { return new Date().toISOString().split('T')[0]; }
function getDayData(key) { return appData[key] || {}; }
function getCurrentTime() { let n = new Date(); return String(n.getHours()).padStart(2, '0') + ':' + String(n.getMinutes()).padStart(2, '0'); }
function calculateDuration(s, e) {
    let start = s.split(':'), end = e.split(':');
    let diff = (parseInt(end[0]) * 60 + parseInt(end[1])) - (parseInt(start[0]) * 60 + parseInt(start[1]));
    if (diff < 0) diff += 1440;
    let h = Math.floor(diff / 60), m = diff % 60;
    return h > 0 ? h + 'h ' + m + 'min' : m + ' min';
}

