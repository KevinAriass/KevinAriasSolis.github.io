
// ============================================
// FITTRACK PWA - DAILY WORKOUT TRACKER v2
// Con calendario, racha y recompensas
// ============================================

// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

// === Constants ===
const STORAGE_KEY = 'fittrack_data';
const JUMP_GOAL = 1000;
const CALORIES_PER_JUMP = 0.14;
const CALORIES_PER_EXERCISE = 25;

// === Rewards System ===
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

// === Exercise List ===
const EXERCISES = [
    { id: 'pushups', name: 'Push-ups', reps: '3 sets x 10 reps', category: 'Upper Body', calPerSet: 20 },
    { id: 'squats', name: 'Squats', reps: '3 sets x 15 reps', category: 'Lower Body', calPerSet: 30 },
    { id: 'plank', name: 'Plank', reps: '3 sets x 30 seconds', category: 'Core', calPerSet: 15 },
    { id: 'lunges', name: 'Lunges', reps: '3 sets x 10 each leg', category: 'Lower Body', calPerSet: 28 },
    { id: 'burpees', name: 'Burpees', reps: '3 sets x 8 reps', category: 'Full Body', calPerSet: 40 },
    { id: 'mountain_climbers', name: 'Mountain Climbers', reps: '3 sets x 20 reps', category: 'Cardio', calPerSet: 30 },
    { id: 'crunches', name: 'Crunches', reps: '3 sets x 15 reps', category: 'Core', calPerSet: 15 },
    { id: 'jumping_jacks', name: 'Jumping Jacks', reps: '3 sets x 20 reps', category: 'Cardio', calPerSet: 25 },
    { id: 'tricep_dips', name: 'Tricep Dips (chair)', reps: '3 sets x 10 reps', category: 'Upper Body', calPerSet: 20 },
    { id: 'glute_bridge', name: 'Glute Bridge', reps: '3 sets x 15 reps', category: 'Lower Body', calPerSet: 22 },
    { id: 'superman', name: 'Superman Hold', reps: '3 sets x 10 reps', category: 'Core', calPerSet: 18 },
    { id: 'high_knees', name: 'High Knees', reps: '3 sets x 30 seconds', category: 'Cardio', calPerSet: 35 }
];

// === State ===
let appData = {};
let currentView = 'today';
let calendarMonth = new Date().getMonth();
let calendarYear = new Date().getFullYear();

// === Initialize ===
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    initSplashScreen();
    initNavigation();
    setTodayDate();
    renderCurrentView();
});

// === Splash Screen ===
function initSplashScreen() {
    const splash = document.getElementById('splashScreen');
    const app = document.getElementById('app');
    setTimeout(function() {
        splash.classList.add('hidden');
        app.classList.remove('hidden');
    }, 1500);
}

// === Set Today Date ===
function setTodayDate() {
    const today = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    document.getElementById('todayDate').textContent = today.toLocaleDateString('en-US', options);
}

// === Navigation ===
function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            navBtns.forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
            currentView = btn.getAttribute('data-view');
            renderCurrentView();
        });
    });
}

// === Render Views ===
function renderCurrentView() {
    const content = document.getElementById('content');
    switch (currentView) {
        case 'today': renderTodayView(content); break;
        case 'exercises': renderCalendarView(content); break;
        case 'history': renderHistoryView(content); break;
        case 'stats': renderStatsView(content); break;
    }
}

// === TODAY VIEW ===
function renderTodayView(container) {
    const today = getTodayKey();
    const dayData = getDayData(today);
    const jumpCount = dayData.jumpCount || 0;
    const jumpPercent = Math.min((jumpCount / JUMP_GOAL) * 100, 100);
    const jumpStatus = dayData.jumpCompleted ? 'complete' : (dayData.jumpStartTime ? 'active' : 'pending');
    const streak = calculateStreak();

    let statusBadge = '';
    if (jumpStatus === 'pending') statusBadge = '<span class="jump-card-badge badge-pending">Pending</span>';
    else if (jumpStatus === 'active') statusBadge = '<span class="jump-card-badge badge-active">In Progress</span>';
    else statusBadge = '<span class="jump-card-badge badge-complete">✓ Done</span>';

    let html = '<div class="fade-in">';

    // Streak Banner
    if (streak > 0) {
        html += '<div class="streak-banner">';
        html += '  <span class="streak-banner-fire">🔥</span>';
        html += '  <span class="streak-banner-text">' + streak + ' day streak!</span>';
        html += '  <span class="streak-banner-msg">' + getStreakMessage(streak) + '</span>';
        html += '</div>';
    }

    // Jump Rope Section
    html += '<div class="jump-card">';
    html += '  <div class="jump-card-header">';
    html += '    <span class="jump-card-title">🪢 Jump Rope</span>';
    html += '    ' + statusBadge;
    html += '  </div>';

    html += '  <div class="jump-counter">';
    html += '    <div class="jump-count-display">' + jumpCount + '</div>';
    html += '    <div class="jump-count-goal">/ ' + JUMP_GOAL + ' jumps</div>';
    html += '    <div class="jump-progress-bar"><div class="jump-progress-fill" style="width: ' + jumpPercent + '%"></div></div>';
    html += '  </div>';

    // Time info
    html += '  <div class="jump-time-info">';
    html += '    <div class="time-block">';
    html += '      <div class="time-label">Started</div>';
    html += '      <div class="time-value">' + (dayData.jumpStartTime || '--:--') + '</div>';
    html += '    </div>';
    html += '    <div class="time-block">';
    html += '      <div class="time-label">Finished</div>';
    html += '      <div class="time-value">' + (dayData.jumpEndTime || '--:--') + '</div>';
    html += '    </div>';
    html += '    <div class="time-block">';
    html += '      <div class="time-label">Duration</div>';
    html += '      <div class="time-value">' + (dayData.jumpDuration || '--:--') + '</div>';
    html += '    </div>';
    html += '  </div>';

    // Buttons
    if (!dayData.jumpCompleted) {
        html += '  <div class="btn-group">';
        if (!dayData.jumpStartTime) {
            html += '    <button class="btn btn-primary" id="btnStartJump">Start Jumping</button>';
        } else {
            html += '    <button class="btn btn-secondary" id="btnAddJumps">+ Add Jumps</button>';
            html += '    <button class="btn btn-primary" id="btnFinishJump">Finish</button>';
        }
        html += '  </div>';
    }
    html += '</div>';

    // Today's Exercises
    html += '<div class="exercise-section-title">Today\'s Exercises</div>';

    const todayExercises = getTodayExercises();
    todayExercises.forEach(function(exercise) {
        const isCompleted = dayData.exercises && dayData.exercises[exercise.id];
        html += '<div class="exercise-card ' + (isCompleted ? 'completed' : '') + '" data-exercise-id="' + exercise.id + '">';
        html += '  <div class="exercise-checkbox">';
        html += '    <span class="exercise-check-icon">✓</span>';
        html += '  </div>';
        html += '  <div class="exercise-info">';
        html += '    <div class="exercise-name">' + exercise.name + '</div>';
        html += '    <div class="exercise-detail">' + exercise.reps + ' • ~' + exercise.calPerSet + ' cal</div>';
        html += '  </div>';
        if (isCompleted) {
            html += '  <div class="exercise-time">' + dayData.exercises[exercise.id] + '</div>';
        }
        html += '</div>';
    });

    // Today's calories
    const todayCal = calculateDayCalories(dayData);
    if (todayCal > 0) {
        html += '<div class="calories-card">';
        html += '  <div class="calories-header">🔥 Calories Burned Today</div>';
        html += '  <div class="calories-number">' + todayCal + ' cal</div>';
        html += '</div>';
    }

    html += '</div>';
    container.innerHTML = html;

    // Event Listeners
    var btnStart = document.getElementById('btnStartJump');
    if (btnStart) {
        btnStart.addEventListener('click', function() { startJumping(); });
    }

    var btnAdd = document.getElementById('btnAddJumps');
    if (btnAdd) {
        btnAdd.addEventListener('click', function() { addJumps(); });
    }

    var btnFinish = document.getElementById('btnFinishJump');
    if (btnFinish) {
        btnFinish.addEventListener('click', function() { finishJumping(); });
    }

    var exerciseCards = container.querySelectorAll('.exercise-card');
    exerciseCards.forEach(function(card) {
        card.querySelector('.exercise-checkbox').addEventListener('click', function() {
            var exerciseId = card.getAttribute('data-exercise-id');
            toggleExercise(exerciseId);
            renderCurrentView();
        });
    });
}

// === CALENDAR VIEW ===
function renderCalendarView(container) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const today = new Date();
    const todayKey = getTodayKey();
    const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
    const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

    let html = '<div class="fade-in">';

    // Calendar Header
    html += '<div class="calendar-header">';
    html += '  <button class="calendar-nav-btn" id="prevMonth">◀</button>';
    html += '  <span class="calendar-month-title">' + monthNames[calendarMonth] + ' ' + calendarYear + '</span>';
    html += '  <button class="calendar-nav-btn" id="nextMonth">▶</button>';
    html += '</div>';

    // Day names
    html += '<div class="calendar-grid">';
    dayNames.forEach(function(day) {
        html += '<div class="calendar-day-name">' + day + '</div>';
    });

    // Empty cells before first day
    for (var i = 0; i < firstDay; i++) {
        html += '<div class="calendar-cell empty"></div>';
    }

    // Days
    for (var d = 1; d <= daysInMonth; d++) {
        var dateKey = calendarYear + '-' + String(calendarMonth + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
        var dayData = appData[dateKey];
        var cellClass = 'calendar-cell';
        var isToday = dateKey === todayKey;
        var isFuture = new Date(dateKey) > today;

        if (isToday) cellClass += ' today';
        if (isFuture) cellClass += ' future';

        if (dayData && dayData.jumpCompleted) {
            cellClass += ' complete';
        } else if (dayData && dayData.jumpCount > 0) {
            cellClass += ' partial';
        }

        html += '<div class="' + cellClass + '" data-date="' + dateKey + '">';
        html += '  <span class="calendar-day-number">' + d + '</span>';
        if (dayData && dayData.jumpCompleted) {
            html += '  <span class="calendar-day-icon">✓</span>';
        } else if (dayData && dayData.jumpCount > 0) {
            html += '  <span class="calendar-day-icon">◐</span>';
        }
        html += '</div>';
    }

    html += '</div>';

    // Legend
    html += '<div class="calendar-legend">';
    html += '  <div class="legend-item"><span class="legend-dot complete"></span> Completed</div>';
    html += '  <div class="legend-item"><span class="legend-dot partial"></span> Partial</div>';
    html += '  <div class="legend-item"><span class="legend-dot today-dot"></span> Today</div>';
    html += '</div>';

    // Weekly Reward Section
    var weeklyData = getWeeklyData();
    html += '<div class="reward-card">';
    html += '  <div class="reward-header">🏆 Weekly Reward</div>';
    html += '  <div class="reward-progress">';
    html += '    <div class="reward-days">' + weeklyData.completedDays + '/5 days completed</div>';
    html += '    <div class="reward-progress-bar"><div class="reward-progress-fill" style="width: ' + (weeklyData.completedDays / 5 * 100) + '%"></div></div>';
    html += '  </div>';
    html += '  <div class="reward-calories">';
    html += '    <span class="reward-cal-number">' + weeklyData.totalCalories + '</span>';
    html += '    <span class="reward-cal-label">calories burned this week</span>';
    html += '  </div>';

    if (weeklyData.completedDays >= 5) {
        html += '  <div class="reward-unlocked">';
        html += '    <div class="reward-unlocked-title">🎉 Reward Unlocked!</div>';
        html += '    <div class="reward-unlocked-text">You earned a treat! You burned ' + weeklyData.totalCalories + ' cal this week.</div>';
        html += '    <div class="reward-options">';
        REWARDS.forEach(function(reward) {
            if (weeklyData.totalCalories >= reward.calories) {
                html += '      <div class="reward-option">';
                html += '        <span class="reward-emoji">' + reward.emoji + '</span>';
                html += '        <span class="reward-name">' + reward.name + '</span>';
                html += '        <span class="reward-desc">' + reward.description + '</span>';
                html += '      </div>';
            }
        });
        html += '    </div>';
        html += '  </div>';
    } else {
        var remaining = 5 - weeklyData.completedDays;
        html += '  <div class="reward-locked">';
        html += '    <span class="reward-locked-icon">🔒</span>';
        html += '    <span class="reward-locked-text">' + remaining + ' more day' + (remaining > 1 ? 's' : '') + ' to unlock your reward!</span>';
        html += '  </div>';
    }

    html += '</div>';
    html += '</div>';

    container.innerHTML = html;

    // Calendar navigation
    document.getElementById('prevMonth').addEventListener('click', function() {
        calendarMonth--;
        if (calendarMonth < 0) { calendarMonth = 11; calendarYear--; }
        renderCurrentView();
    });

    document.getElementById('nextMonth').addEventListener('click', function() {
        calendarMonth++;
        if (calendarMonth > 11) { calendarMonth = 0; calendarYear++; }
        renderCurrentView();
    });
}

// === HISTORY VIEW ===
function renderHistoryView(container) {
    const days = Object.keys(appData).sort().reverse();

    let html = '<div class="fade-in">';

    if (days.length === 0) {
        html += '<div class="empty-state">';
        html += '  <div class="empty-state-icon">📅</div>';
        html += '  <div class="empty-state-text">No history yet. Start your first workout!</div>';
        html += '</div>';
    } else {
        days.forEach(function(day) {
            var data = appData[day];
            var date = new Date(day + 'T12:00:00');
            var dateStr = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
            var jumpCount = data.jumpCount || 0;
            var isComplete = data.jumpCompleted;
            var dayCal = calculateDayCalories(data);

            html += '<div class="history-day">';
            html += '  <div class="history-day-header">';
            html += '    <span class="history-date">' + dateStr + '</span>';
            if (isComplete) {
                html += '    <span class="history-badge badge-complete">✓ ' + jumpCount + ' jumps</span>';
            } else if (jumpCount > 0) {
                html += '    <span class="history-badge badge-pending">' + jumpCount + '/' + JUMP_GOAL + '</span>';
            } else {
                html += '    <span class="history-badge badge-pending">No jumps</span>';
            }
            html += '  </div>';

            if (data.jumpStartTime) {
                html += '  <div class="history-detail"><span>Started:</span><span>' + data.jumpStartTime + '</span></div>';
            }
            if (data.jumpEndTime) {
                html += '  <div class="history-detail"><span>Finished:</span><span>' + data.jumpEndTime + '</span></div>';
            }
            if (data.jumpDuration) {
                html += '  <div class="history-detail"><span>Duration:</span><span>' + data.jumpDuration + '</span></div>';
            }
            if (dayCal > 0) {
                html += '  <div class="history-detail"><span>Calories:</span><span>🔥 ' + dayCal + ' cal</span></div>';
            }

            if (data.exercises && Object.keys(data.exercises).length > 0) {
                html += '  <div class="history-exercises">';
                Object.keys(data.exercises).forEach(function(exId) {
                    var exercise = EXERCISES.find(function(e) { return e.id === exId; });
                    if (exercise) {
                        html += '    <div class="history-exercise-item">✅ ' + exercise.name + ' — ' + data.exercises[exId] + '</div>';
                    }
                });
                html += '  </div>';
            }

            html += '</div>';
        });
    }

    html += '</div>';
    container.innerHTML = html;
}

// === STATS VIEW ===
function renderStatsView(container) {
    const days = Object.keys(appData);
    const totalDays = days.length;
    const completedDays = days.filter(function(d) { return appData[d].jumpCompleted; }).length;
    const totalJumps = days.reduce(function(sum, d) { return sum + (appData[d].jumpCount || 0); }, 0);
    const totalExercises = days.reduce(function(sum, d) {
        return sum + (appData[d].exercises ? Object.keys(appData[d].exercises).length : 0);
    }, 0);
    const totalCalories = days.reduce(function(sum, d) { return sum + calculateDayCalories(appData[d]); }, 0);
    const streak = calculateStreak();

    let html = '<div class="fade-in">';

    // Streak Card
    html += '<div class="streak-card">';
    html += '  <div class="streak-number">' + streak + ' 🔥</div>';
    html += '  <div class="streak-label">Day Streak</div>';
    html += '  <div class="streak-message">' + getStreakMessage(streak) + '</div>';
    html += '</div>';

    // Stats Grid
    html += '<div class="stats-grid">';
    html += '  <div class="stats-card"><div class="stats-card-number">' + totalJumps.toLocaleString() + '</div><div class="stats-card-label">Total Jumps</div></div>';
    html += '  <div class="stats-card"><div class="stats-card-number">' + completedDays + '</div><div class="stats-card-label">Days Completed</div></div>';
    html += '  <div class="stats-card"><div class="stats-card-number">' + totalCalories.toLocaleString() + '</div><div class="stats-card-label">Total Calories</div></div>';
    html += '  <div class="stats-card"><div class="stats-card-number">' + totalExercises + '</div><div class="stats-card-label">Exercises Done</div></div>';
    html += '</div>';

    // Averages
    var avgJumps = totalDays > 0 ? Math.round(totalJumps / totalDays) : 0;
    var avgCal = totalDays > 0 ? Math.round(totalCalories / totalDays) : 0;
    html += '<div class="stats-grid">';
    html += '  <div class="stats-card"><div class="stats-card-number">' + avgJumps + '</div><div class="stats-card-label">Avg Jumps/Day</div></div>';
    html += '  <div class="stats-card"><div class="stats-card-number">' + avgCal + '</div><div class="stats-card-label">Avg Cal/Day</div></div>';
    html += '</div>';

    // Food equivalents
    if (totalCalories > 0) {
        html += '<div class="exercise-section-title">🍔 You\'ve Earned</div>';
        REWARDS.forEach(function(reward) {
            var times = Math.floor(totalCalories / reward.calories);
            if (times > 0) {
                html += '<div class="exercise-card">';
                html += '  <div class="exercise-info">';
                html += '    <div class="exercise-name">' + reward.emoji + ' ' + times + 'x ' + reward.name + '</div>';
                html += '    <div class="exercise-detail">' + (times * reward.calories) + ' cal equivalent</div>';
                html += '  </div>';
                html += '</div>';
            }
        });
    }

    html += '</div>';
    container.innerHTML = html;
}

// === Jump Functions ===
function startJumping() {
    const today = getTodayKey();
    const dayData = getDayData(today);
    dayData.jumpStartTime = getCurrentTime();
    dayData.jumpCount = dayData.jumpCount || 0;
    appData[today] = dayData;
    saveData();
    renderCurrentView();
}

function addJumps() {
    const input = prompt('How many jumps did you do?', '100');
    if (input === null) return;
    const jumps = parseInt(input);
    if (isNaN(jumps) || jumps <= 0) return;

    const today = getTodayKey();
    const dayData = getDayData(today);
    dayData.jumpCount = (dayData.jumpCount || 0) + jumps;

    if (dayData.jumpCount >= JUMP_GOAL) {
        dayData.jumpCount = JUMP_GOAL;
        dayData.jumpCompleted = true;
        dayData.jumpEndTime = getCurrentTime();
        dayData.jumpDuration = calculateDuration(dayData.jumpStartTime, dayData.jumpEndTime);
    }

    appData[today] = dayData;
    saveData();
    renderCurrentView();
}

function finishJumping() {
    const today = getTodayKey();
    const dayData = getDayData(today);

    if (dayData.jumpCount < JUMP_GOAL) {
        const remaining = JUMP_GOAL - dayData.jumpCount;
        if (!confirm('You have ' + remaining + ' jumps remaining. Mark as complete anyway?')) return;
    }

    dayData.jumpCompleted = true;
    dayData.jumpEndTime = getCurrentTime();
    dayData.jumpDuration = calculateDuration(dayData.jumpStartTime, dayData.jumpEndTime);
    appData[today] = dayData;
    saveData();
    renderCurrentView();
}

// === Exercise Functions ===
function toggleExercise(exerciseId) {
    const today = getTodayKey();
    const dayData = getDayData(today);
    if (!dayData.exercises) dayData.exercises = {};

    if (dayData.exercises[exerciseId]) {
        delete dayData.exercises[exerciseId];
    } else {
        dayData.exercises[exerciseId] = getCurrentTime();
    }

    appData[today] = dayData;
    saveData();
}

function getTodayExercises() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const startIndex = (dayOfYear * 6) % EXERCISES.length;
    let exercises = [];
    for (let i = 0; i < 6; i++) {
        exercises.push(EXERCISES[(startIndex + i) % EXERCISES.length]);
    }
    return exercises;
}

// === Calories ===
function calculateDayCalories(dayData) {
    let cal = 0;
    if (dayData.jumpCount) {
        cal += Math.round(dayData.jumpCount * CALORIES_PER_JUMP);
    }
    if (dayData.exercises) {
        Object.keys(dayData.exercises).forEach(function(exId) {
            var exercise = EXERCISES.find(function(e) { return e.id === exId; });
            if (exercise) cal += exercise.calPerSet;
        });
    }
    return cal;
}

// === Weekly Data ===
function getWeeklyData() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

    let completedDays = 0;
    let totalCalories = 0;

    for (var i = 0; i < 7; i++) {
        var checkDate = new Date(monday);
        checkDate.setDate(monday.getDate() + i);
        var key = checkDate.toISOString().split('T')[0];
        if (appData[key]) {
            if (appData[key].jumpCompleted) completedDays++;
            totalCalories += calculateDayCalories(appData[key]);
        }
    }

    return { completedDays: completedDays, totalCalories: totalCalories };
}

// === Streak ===
function calculateStreak() {
    let streak = 0;
    let checkDate = new Date();

    while (true) {
        var key = checkDate.toISOString().split('T')[0];
        if (appData[key] && appData[key].jumpCompleted) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }
    return streak;
}

function getStreakMessage(streak) {
    if (streak === 0) return 'Start today!';
    if (streak < 3) return 'Good start! Keep going!';
    if (streak < 7) return 'You\'re on fire! 🔥';
    if (streak < 14) return 'One week strong! 💪';
    if (streak < 30) return 'Unstoppable! 🚀';
    if (streak < 60) return 'Legend status! 👑';
    return 'You\'re a machine! 🏆';
}

// === Utility Functions ===
function getTodayKey() {
    return new Date().toISOString().split('T')[0];
}

function getDayData(dateKey) {
    return appData[dateKey] || {};
}

function getCurrentTime() {
    const now = new Date();
    return String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
}

function calculateDuration(startTime, endTime) {
    const start = startTime.split(':');
    const end = endTime.split(':');
    let diff = (parseInt(end[0]) * 60 + parseInt(end[1])) - (parseInt(start[0]) * 60 + parseInt(start[1]));
    if (diff < 0) diff += 1440;
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    if (hours > 0) return hours + 'h ' + mins + 'min';
    return mins + ' min';
}

// === Storage ===
function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}

function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) appData = JSON.parse(saved);
}

