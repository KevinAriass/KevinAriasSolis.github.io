
// ============================================
// FITTRACK PWA - DAILY WORKOUT TRACKER v7
// Firebase + i18n + Leaderboard + Wellness + Monthly Rotation
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
    navigator.serviceWorker.register('service-worker.js').catch(function(err) { console.log('SW:', err); });
}

// === i18n TRANSLATIONS ===
const TRANSLATIONS = {
    en: {
        signInSync: 'Sign in to sync your progress', email: 'EMAIL', password: 'PASSWORD',
        emailPlaceholder: 'your@email.com', passwordPlaceholder: 'Min. 6 characters',
        login: 'LOGIN', createAccount: 'CREATE ACCOUNT', dataSyncs: 'Your data syncs across all devices',
        today: 'Today', calendar: 'Calendar', wellness: 'Wellness', stats: 'Stats', profile: 'Profile',
        jumpRope: 'Jump Rope', pending: 'Pending', inProgress: 'In Progress', done: 'Done',
        jumps: 'jumps', started: 'STARTED', finished: 'FINISHED', duration: 'DURATION',
        startJumping: 'START JUMPING', addJumps: '+ Add Jumps', finish: 'Finish ✓',
        todayExercises: "Today's Exercises", caloriesBurned: 'Calories Burned Today', cal: 'cal',
        dayStreak: 'day streak', weeklyReward: 'Weekly Reward', daysCompleted: 'days completed',
        caloriesThisWeek: 'calories this week', rewardUnlocked: 'Reward Unlocked!',
        moreDaysToUnlock: 'more days to unlock!', completed: 'Completed', partial: 'Partial',
        dailyWellnessCheck: 'Daily Wellness Check', howFeeling: 'How are you feeling today?',
        mood: 'Mood', energyLevel: 'Energy Level', fatigueLevel: 'Fatigue Level',
        hungerLevel: 'Hunger Level', sleep: 'Sleep', hoursSlept: 'Hours slept',
        painDiscomfort: 'Pain / Discomfort', painIntensity: 'Pain intensity (1-10)',
        notes: 'Notes', notesPlaceholder: 'How do you feel? Any observations...',
        saveWellness: 'Save Wellness Check ✓', wellnessSaved: 'Wellness check saved! ✓',
        low: 'Low', medium: 'Medium', high: 'High', none: 'None', moderate: 'Moderate',
        exhausted: 'Exhausted', full: 'Full', normal: 'Normal', starving: 'Starving',
        terrible: 'Terrible', ok: 'OK', amazing: 'Amazing', mild: 'Mild', severe: 'Severe',
        totalJumps: 'Total Jumps', daysCompletedStat: 'Days Completed', totalCalories: 'Total Calories',
        exercisesDone: 'Exercises Done', weightTrend: 'Weight Trend', currentWeight: 'Current Weight',
        since: 'Since', noWeightRecords: 'No weight records yet. Add your weight in the Profile tab.',
        wellnessTrends: 'Wellness Trends (Last 7 days)', moodHistory: 'Mood History',
        avgEnergy: 'Avg Energy', avgSleep: 'Avg Sleep', avgFatigue: 'Avg Fatigue',
        daysTracked: 'Days Tracked', frequentPain: 'Most Frequent Pain Areas',
        noWellnessData: 'No wellness data yet. Fill your daily check in the Wellness tab.',
        youveEarned: "You've Earned", leaderboard: 'Leaderboard', rank: 'Rank', user: 'User',
        streak: 'Streak', you: '(You)', noLeaderboard: 'Complete your first day to join the leaderboard!',
        myProfile: 'My Profile', account: 'Account', memberSince: 'Member since',
        logWeight: 'Log Weight', weightKg: 'Weight (kg)', date: 'Date', logWeightBtn: 'Log Weight ⚖️',
        recentEntries: 'Recent Entries', bodyInfo: 'Body Info', heightCm: 'Height (cm)',
        age: 'Age', gender: 'Gender', male: 'Male', female: 'Female', other: 'Other', select: 'Select',
        fitnessGoal: 'Fitness Goal', loseWeight: 'Lose Weight', gainMuscle: 'Gain Muscle',
        stayFit: 'Stay Fit', flexibility: 'Flexibility', endurance: 'Endurance', stressRelief: 'Stress Relief',
        medicalConditions: 'Medical Conditions', medicalPlaceholder: 'Any conditions, allergies, injuries...',
        saveProfile: 'Save Profile ✓', profileSaved: 'Profile saved! ✓',
        changePassword: 'Change Password', newPassword: 'New Password', updatePassword: 'Update Password',
        passwordUpdated: 'Password updated! ✓', logout: 'Logout', language: 'Language',
        howToDoIt: 'How to do it:', musclesWorked: 'Muscles worked:', tip: 'Tip:',
        perSet: 'per set', howManyJumps: 'How many jumps did you do?',
        jumpsRemaining: 'jumps remaining. Mark as complete?',
        validWeight: 'Please enter a valid weight (20-300 kg)', selectDate: 'Please select a date',
        weightLogged: 'Weight logged:', enterEmail: 'Please enter your email',
        enterPassword: 'Please enter your password', validEmail: 'Please enter a valid email',
        passwordMin: 'Password must be at least 6 characters',
        startToday: 'Start today!', goodStart: 'Good start!', onFire: 'On fire! 🔥',
        oneWeekStrong: 'One week strong! 💪', unstoppable: 'Unstoppable! 🚀',
        legend: 'Legend! 👑', machine: 'Machine! 🏆',
        happy: 'Happy', motivated: 'Motivated', neutral: 'Neutral', tired: 'Tired',
        stressed: 'Stressed', sad: 'Sad', angry: 'Angry', anxious: 'Anxious'
    },
    es: {
        signInSync: 'Inicia sesión para sincronizar tu progreso', email: 'CORREO', password: '[PASSWORD]',
        emailPlaceholder: 'tu@correo.com', passwordPlaceholder: 'Mín. 6 caracteres',
        login: 'INICIAR SESIÓN', createAccount: 'CREAR CUENTA',
        dataSyncs: 'Tus datos se sincronizan en todos tus dispositivos',
        today: 'Hoy', calendar: 'Calendario', wellness: 'Bienestar', stats: 'Estadísticas', profile: 'Perfil',
        jumpRope: 'Saltar Cuerda', pending: 'Pendiente', inProgress: 'En Progreso', done: 'Hecho',
        jumps: 'saltos', started: 'INICIO', finished: 'FIN', duration: 'DURACIÓN',
        startJumping: 'EMPEZAR A SALTAR', addJumps: '+ Agregar Saltos', finish: 'Terminar ✓',
        todayExercises: 'Ejercicios de Hoy', caloriesBurned: 'Calorías Quemadas Hoy', cal: 'cal',
        dayStreak: 'días de racha', weeklyReward: 'Recompensa Semanal', daysCompleted: 'días completados',
        caloriesThisWeek: 'calorías esta semana', rewardUnlocked: '¡Recompensa Desbloqueada!',
        moreDaysToUnlock: 'días más para desbloquear!', completed: 'Completado', partial: 'Parcial',
        dailyWellnessCheck: 'Chequeo Diario de Bienestar', howFeeling: '¿Cómo te sientes hoy?',
        mood: 'Estado de Ánimo', energyLevel: 'Nivel de Energía', fatigueLevel: 'Nivel de Fatiga',
        hungerLevel: 'Nivel de Hambre', sleep: 'Sueño', hoursSlept: 'Horas dormidas',
        painDiscomfort: 'Dolor / Molestia', painIntensity: 'Intensidad del dolor (1-10)',
        notes: 'Notas', notesPlaceholder: '¿Cómo te sientes? Alguna observación...',
        saveWellness: 'Guardar Bienestar ✓', wellnessSaved: '¡Bienestar guardado! ✓',
        low: 'Bajo', medium: 'Medio', high: 'Alto', none: 'Ninguna', moderate: 'Moderada',
        exhausted: 'Agotado', full: 'Lleno', normal: 'Normal', starving: 'Hambriento',
        terrible: 'Terrible', ok: 'OK', amazing: 'Increíble', mild: 'Leve', severe: 'Severo',
        totalJumps: 'Total Saltos', daysCompletedStat: 'Días Completados', totalCalories: 'Total Calorías',
        exercisesDone: 'Ejercicios Hechos', weightTrend: 'Tendencia de Peso', currentWeight: 'Peso Actual',
        since: 'Desde', noWeightRecords: 'Sin registros de peso. Agrega tu peso en Perfil.',
        wellnessTrends: 'Tendencias de Bienestar (Últimos 7 días)', moodHistory: 'Historial de Ánimo',
        avgEnergy: 'Energía Prom.', avgSleep: 'Sueño Prom.', avgFatigue: 'Fatiga Prom.',
        daysTracked: 'Días Registrados', frequentPain: 'Áreas de Dolor Frecuentes',
        noWellnessData: 'Sin datos de bienestar. Llena tu chequeo en Bienestar.',
        youveEarned: 'Has Ganado', leaderboard: 'Tabla de Posiciones', rank: 'Pos.', user: 'Usuario',
        streak: 'Racha', you: '(Tú)', noLeaderboard: '¡Completa tu primer día para unirte!',
        myProfile: 'Mi Perfil', account: 'Cuenta', memberSince: 'Miembro desde',
        logWeight: 'Registrar Peso', weightKg: 'Peso (kg)', date: 'Fecha', logWeightBtn: 'Registrar Peso ⚖️',
        recentEntries: 'Entradas Recientes', bodyInfo: 'Info Corporal', heightCm: 'Altura (cm)',
        age: 'Edad', gender: 'Género', male: 'Masculino', female: 'Femenino', other: 'Otro', select: 'Seleccionar',
        fitnessGoal: 'Meta Fitness', loseWeight: 'Bajar de Peso', gainMuscle: 'Ganar Músculo',
        stayFit: 'Mantenerme Fit', flexibility: 'Flexibilidad', endurance: 'Resistencia', stressRelief: 'Reducir Estrés',
        medicalConditions: 'Condiciones Médicas', medicalPlaceholder: 'Condiciones, alergias, lesiones...',
        saveProfile: 'Guardar Perfil ✓', profileSaved: '¡Perfil guardado! ✓',
        changePassword: 'Cambiar Contraseña', newPassword: 'Nueva Contraseña', updatePassword: 'Actualizar Contraseña',
        passwordUpdated: '¡Contraseña actualizada! ✓', logout: 'Cerrar Sesión', language: 'Idioma',
        howToDoIt: 'Cómo hacerlo:', musclesWorked: 'Músculos trabajados:', tip: 'Consejo:',
        perSet: 'por serie', howManyJumps: '¿Cuántos saltos hiciste?',
        jumpsRemaining: 'saltos restantes. ¿Marcar como completo?',
        validWeight: 'Ingresa un peso válido (20-300 kg)', selectDate: 'Selecciona una fecha',
        weightLogged: 'Peso registrado:', enterEmail: 'Ingresa tu correo',
        enterPassword: 'Ingresa tu contraseña', validEmail: 'Ingresa un correo válido',
        passwordMin: 'La contraseña debe tener al menos 6 caracteres',
        startToday: '¡Empieza hoy!', goodStart: '¡Buen inicio!', onFire: '¡En llamas! 🔥',
        oneWeekStrong: '¡Una semana fuerte! 💪', unstoppable: '¡Imparable! 🚀',
        legend: '¡Leyenda! 👑', machine: '¡Máquina! 🏆',
        happy: 'Feliz', motivated: 'Motivado', neutral: 'Neutral', tired: 'Cansado',
        stressed: 'Estresado', sad: 'Triste', angry: 'Enojado', anxious: 'Ansioso'
    }
};

let currentLang = localStorage.getItem('fittrack_lang') || 'en';
function t(key) { return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || TRANSLATIONS['en'][key] || key; }

// === Constants ===
const JUMP_GOAL = 1000;
const CALORIES_PER_JUMP = 0.14;
const REWARDS = [
    { calories: 200, emoji: '🍦', name: 'Ice cream scoop', nameEs: 'Helado', description: '~200 cal' },
    { calories: 350, emoji: '🍕', name: 'Slice of pizza', nameEs: 'Rebanada de pizza', description: '~350 cal' },
    { calories: 500, emoji: '🍔', name: 'Hamburger', nameEs: 'Hamburguesa', description: '~500 cal' },
    { calories: 600, emoji: '🌮', name: '3 Tacos', nameEs: '3 Tacos', description: '~600 cal' },
    { calories: 700, emoji: '🍟', name: 'Large fries + soda', nameEs: 'Papas grandes + soda', description: '~700 cal' },
    { calories: 800, emoji: '🍩', name: '4 Donuts', nameEs: '4 Donas', description: '~800 cal' },
    { calories: 900, emoji: '🎂', name: 'Slice of cake', nameEs: 'Rebanada de pastel', description: '~900 cal' },
    { calories: 1000, emoji: '🍝', name: 'Pasta Alfredo', nameEs: 'Pasta Alfredo', description: '~1000 cal' }
];

// === EXERCISES (36 total - 12 per set) ===
const ALL_EXERCISES = [
    // SET A (Jan, Apr, Jul, Oct)
    { id: 'pushups', name: 'Push-ups', nameEs: 'Flexiones', reps: '3x10', repsEs: '3x10', category: 'Upper Body', categoryEs: 'Tren Superior', calPerSet: 20, emoji: '🫸', muscles: 'Chest, Triceps, Shoulders', musclesEs: 'Pecho, Tríceps, Hombros', steps: ['Hands shoulder-width apart on floor', 'Keep body straight like a plank', 'Lower chest to floor', 'Push back up'], stepsEs: ['Manos al ancho de hombros en el piso', 'Cuerpo recto como tabla', 'Baja el pecho al piso', 'Empuja hacia arriba'], tip: 'Keep hips level!', tipEs: '¡Mantén caderas niveladas!' },
    { id: 'squats', name: 'Squats', nameEs: 'Sentadillas', reps: '3x15', repsEs: '3x15', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 30, emoji: '🦵', muscles: 'Quads, Glutes, Hamstrings', musclesEs: 'Cuádriceps, Glúteos, Isquiotibiales', steps: ['Feet shoulder-width apart', 'Push hips back like sitting', 'Lower until thighs parallel', 'Drive through heels to stand'], stepsEs: ['Pies al ancho de hombros', 'Caderas atrás como sentándote', 'Baja hasta muslos paralelos', 'Empuja con talones para subir'], tip: 'Knees behind toes!', tipEs: '¡Rodillas detrás de los dedos!' },
    { id: 'plank', name: 'Plank', nameEs: 'Plancha', reps: '3x30s', repsEs: '3x30s', category: 'Core', categoryEs: 'Core', calPerSet: 15, emoji: '🧘', muscles: 'Core, Shoulders, Back', musclesEs: 'Core, Hombros, Espalda', steps: ['Forearms on floor, elbows under shoulders', 'Extend legs back, toes on floor', 'Straight line head to heels', 'Hold and breathe'], stepsEs: ['Antebrazos en piso, codos bajo hombros', 'Piernas extendidas, puntas en piso', 'Línea recta de cabeza a talones', 'Mantén y respira'], tip: 'Squeeze glutes and abs!', tipEs: '¡Aprieta glúteos y abdominales!' },
    { id: 'lunges', name: 'Lunges', nameEs: 'Zancadas', reps: '3x10 each', repsEs: '3x10 c/pierna', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 28, emoji: '🚶', muscles: 'Quads, Glutes, Hamstrings', musclesEs: 'Cuádriceps, Glúteos, Isquiotibiales', steps: ['Stand tall, feet hip-width', 'Step forward with one leg', 'Lower back knee to 90°', 'Push off front foot to return'], stepsEs: ['Párate derecho', 'Paso adelante con una pierna', 'Baja rodilla trasera a 90°', 'Empuja con pie delantero'], tip: 'Keep torso upright!', tipEs: '¡Torso erguido!' },
    { id: 'burpees', name: 'Burpees', nameEs: 'Burpees', reps: '3x8', repsEs: '3x8', category: 'Full Body', categoryEs: 'Cuerpo Completo', calPerSet: 40, emoji: '💥', muscles: 'Full Body, Cardio', musclesEs: 'Cuerpo Completo, Cardio', steps: ['Squat down, hands on floor', 'Jump feet back to plank', 'Do one push-up', 'Jump feet forward, explode up'], stepsEs: ['Agáchate, manos al piso', 'Salta pies atrás a plancha', 'Haz una flexión', 'Salta pies adelante, explota arriba'], tip: 'Land softly!', tipEs: '¡Aterriza suave!' },
    { id: 'mountain_climbers', name: 'Mountain Climbers', nameEs: 'Escaladores', reps: '3x20', repsEs: '3x20', category: 'Cardio', categoryEs: 'Cardio', calPerSet: 30, emoji: '⛰️', muscles: 'Core, Shoulders, Hip Flexors', musclesEs: 'Core, Hombros, Flexores', steps: ['Push-up position', 'Drive knee to chest', 'Switch legs quickly', 'Keep hips low'], stepsEs: ['Posición de flexión', 'Rodilla al pecho', 'Cambia piernas rápido', 'Caderas bajas'], tip: 'Go fast, keep form!', tipEs: '¡Rápido pero con forma!' },
    { id: 'crunches', name: 'Crunches', nameEs: 'Abdominales', reps: '3x15', repsEs: '3x15', category: 'Core', categoryEs: 'Core', calPerSet: 15, emoji: '🔥', muscles: 'Abs', musclesEs: 'Abdominales', steps: ['Lie on back, knees bent', 'Hands behind head', 'Curl shoulders off floor', 'Lower with control'], stepsEs: ['Acuéstate, rodillas dobladas', 'Manos detrás de cabeza', 'Eleva hombros del piso', 'Baja con control'], tip: 'Squeeze abs, not neck!', tipEs: '¡Aprieta abdominales, no cuello!' },
    { id: 'jumping_jacks', name: 'Jumping Jacks', nameEs: 'Saltos de Tijera', reps: '3x20', repsEs: '3x20', category: 'Cardio', categoryEs: 'Cardio', calPerSet: 25, emoji: '⭐', muscles: 'Full Body, Cardio', musclesEs: 'Cuerpo Completo, Cardio', steps: ['Feet together, arms at sides', 'Jump feet out, arms up', 'Jump feet together, arms down', 'Repeat steadily'], stepsEs: ['Pies juntos, brazos a lados', 'Salta abriendo piernas y brazos', 'Salta cerrando', 'Repite constantemente'], tip: 'Land on balls of feet!', tipEs: '¡Aterriza en puntas!' },
    { id: 'tricep_dips', name: 'Tricep Dips', nameEs: 'Fondos Tríceps', reps: '3x10', repsEs: '3x10', category: 'Upper Body', categoryEs: 'Tren Superior', calPerSet: 20, emoji: '💺', muscles: 'Triceps, Shoulders', musclesEs: 'Tríceps, Hombros', steps: ['Hands on chair edge', 'Slide hips off, legs extended', 'Lower by bending elbows to 90°', 'Push back up'], stepsEs: ['Manos en borde de silla', 'Desliza caderas, piernas extendidas', 'Baja doblando codos a 90°', 'Empuja arriba'], tip: 'Back close to chair!', tipEs: '¡Espalda cerca de la silla!' },
    { id: 'glute_bridge', name: 'Glute Bridge', nameEs: 'Puente Glúteos', reps: '3x15', repsEs: '3x15', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 22, emoji: '🍑', muscles: 'Glutes, Hamstrings, Core', musclesEs: 'Glúteos, Isquiotibiales, Core', steps: ['Lie on back, knees bent', 'Push through heels, lift hips', 'Squeeze glutes at top', 'Lower with control'], stepsEs: ['Acuéstate, rodillas dobladas', 'Empuja con talones, sube caderas', 'Aprieta glúteos arriba', 'Baja con control'], tip: 'No arch lower back!', tipEs: '¡No arquees espalda baja!' },
    { id: 'superman', name: 'Superman Hold', nameEs: 'Superman', reps: '3x10', repsEs: '3x10', category: 'Core', categoryEs: 'Core', calPerSet: 18, emoji: '🦸', muscles: 'Lower Back, Glutes', musclesEs: 'Espalda Baja, Glúteos', steps: ['Lie face down, arms extended', 'Lift arms, chest, legs off floor', 'Hold 2-3 seconds', 'Lower with control'], stepsEs: ['Boca abajo, brazos extendidos', 'Levanta brazos, pecho y piernas', 'Mantén 2-3 segundos', 'Baja con control'], tip: 'Look at floor for neutral neck!', tipEs: '¡Mira al piso, cuello neutral!' },
    { id: 'high_knees', name: 'High Knees', nameEs: 'Rodillas Altas', reps: '3x30s', repsEs: '3x30s', category: 'Cardio', categoryEs: 'Cardio', calPerSet: 35, emoji: '🏃', muscles: 'Hip Flexors, Core, Cardio', musclesEs: 'Flexores, Core, Cardio', steps: ['Stand tall, feet hip-width', 'Drive knee to hip height', 'Switch quickly', 'Pump arms like sprinting'], stepsEs: ['Párate derecho', 'Sube rodilla a la cadera', 'Cambia rápido', 'Mueve brazos como corriendo'], tip: 'Stay on balls of feet!', tipEs: '¡En puntas de pies!' },
    // SET B (Feb, May, Aug, Nov)
    { id: 'diamond_pushups', name: 'Diamond Push-ups', nameEs: 'Flexiones Diamante', reps: '3x8', repsEs: '3x8', category: 'Upper Body', categoryEs: 'Tren Superior', calPerSet: 25, emoji: '💎', muscles: 'Triceps, Chest', musclesEs: 'Tríceps, Pecho', steps: ['Hands together forming diamond', 'Body straight in plank', 'Lower chest to hands', 'Push up squeezing triceps'], stepsEs: ['Manos juntas formando diamante', 'Cuerpo recto en plancha', 'Baja pecho a las manos', 'Sube apretando tríceps'], tip: 'Elbows close to body!', tipEs: '¡Codos cerca del cuerpo!' },
    { id: 'sumo_squats', name: 'Sumo Squats', nameEs: 'Sentadilla Sumo', reps: '3x15', repsEs: '3x15', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 28, emoji: '🦍', muscles: 'Inner Thighs, Glutes', musclesEs: 'Muslos Internos, Glúteos', steps: ['Feet wider than shoulders, toes out', 'Lower hips straight down', 'Chest up, knees over toes', 'Push through heels'], stepsEs: ['Pies más anchos que hombros, puntas afuera', 'Baja caderas directo', 'Pecho arriba, rodillas sobre dedos', 'Empuja con talones'], tip: 'Go deep as flexibility allows!', tipEs: '¡Baja tanto como puedas!' },
    { id: 'bicycle_crunches', name: 'Bicycle Crunches', nameEs: 'Abdominales Bicicleta', reps: '3x20', repsEs: '3x20', category: 'Core', categoryEs: 'Core', calPerSet: 20, emoji: '🚴', muscles: 'Obliques, Abs', musclesEs: 'Oblicuos, Abdominales', steps: ['Lie on back, hands behind head', 'Right elbow to left knee', 'Extend right leg while twisting', 'Alternate in pedaling motion'], stepsEs: ['Acuéstate, manos detrás de cabeza', 'Codo derecho a rodilla izquierda', 'Extiende pierna derecha girando', 'Alterna en pedaleo'], tip: 'Slow and controlled!', tipEs: '¡Lento y controlado!' },
    { id: 'wall_sit', name: 'Wall Sit', nameEs: 'Sentadilla Pared', reps: '3x30s', repsEs: '3x30s', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 20, emoji: '🧱', muscles: 'Quads, Glutes, Calves', musclesEs: 'Cuádriceps, Glúteos, Pantorrillas', steps: ['Lean against wall', 'Slide down, thighs parallel', 'Knees at 90°', 'Hold and breathe'], stepsEs: ['Recárgate en pared', 'Deslízate, muslos paralelos', 'Rodillas a 90°', 'Mantén y respira'], tip: 'Press lower back to wall!', tipEs: '¡Espalda baja contra pared!' },
    { id: 'pike_pushups', name: 'Pike Push-ups', nameEs: 'Flexiones Pike', reps: '3x8', repsEs: '3x8', category: 'Upper Body', categoryEs: 'Tren Superior', calPerSet: 22, emoji: '🔺', muscles: 'Shoulders, Triceps', musclesEs: 'Hombros, Tríceps', steps: ['Downward dog position (hips high)', 'Bend elbows, lower head to floor', 'Push back up', 'Keep legs straight'], stepsEs: ['Posición perro boca abajo', 'Dobla codos, baja cabeza', 'Empuja arriba', 'Piernas rectas'], tip: 'More vertical = harder!', tipEs: '¡Más vertical = más difícil!' },
    { id: 'lateral_lunges', name: 'Lateral Lunges', nameEs: 'Zancadas Laterales', reps: '3x10 each', repsEs: '3x10 c/lado', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 26, emoji: '↔️', muscles: 'Inner Thighs, Glutes', musclesEs: 'Muslos Internos, Glúteos', steps: ['Stand with feet together', 'Step wide to one side', 'Bend that knee, other leg straight', 'Push off to return'], stepsEs: ['Pies juntos', 'Paso amplio a un lado', 'Dobla esa rodilla, otra pierna recta', 'Empuja para volver'], tip: 'Chest up, core tight!', tipEs: '¡Pecho arriba, core apretado!' },
    { id: 'flutter_kicks', name: 'Flutter Kicks', nameEs: 'Patadas Aleteo', reps: '3x20', repsEs: '3x20', category: 'Core', categoryEs: 'Core', calPerSet: 18, emoji: '🦶', muscles: 'Lower Abs, Hip Flexors', musclesEs: 'Abdominales Bajos, Flexores', steps: ['Lie on back, hands under hips', 'Lift legs slightly off floor', 'Alternate kicking up and down', 'Lower back pressed to floor'], stepsEs: ['Acuéstate, manos bajo caderas', 'Levanta piernas del piso', 'Alterna patadas arriba y abajo', 'Espalda baja pegada al piso'], tip: 'Smaller kicks = more abs!', tipEs: '¡Patadas pequeñas = más abdomen!' },
    { id: 'squat_jumps', name: 'Squat Jumps', nameEs: 'Sentadillas Salto', reps: '3x10', repsEs: '3x10', category: 'Cardio', categoryEs: 'Cardio', calPerSet: 35, emoji: '🦘', muscles: 'Quads, Glutes, Cardio', musclesEs: 'Cuádriceps, Glúteos, Cardio', steps: ['Feet shoulder-width', 'Lower into squat', 'Explode up jumping high', 'Land softly, repeat'], stepsEs: ['Pies al ancho de hombros', 'Baja a sentadilla', 'Explota saltando alto', 'Aterriza suave, repite'], tip: 'Soft knees on landing!', tipEs: '¡Rodillas suaves al aterrizar!' },
    { id: 'shoulder_taps', name: 'Shoulder Taps', nameEs: 'Toques Hombro', reps: '3x16', repsEs: '3x16', category: 'Core', categoryEs: 'Core', calPerSet: 18, emoji: '👋', muscles: 'Core, Shoulders', musclesEs: 'Core, Hombros', steps: ['Push-up position', 'Lift hand, tap opposite shoulder', 'Return hand to floor', 'Alternate, keep hips still'], stepsEs: ['Posición de flexión', 'Levanta mano, toca hombro opuesto', 'Regresa mano al piso', 'Alterna, caderas quietas'], tip: 'Wider feet = easier balance!', tipEs: '¡Pies más anchos = más fácil!' },
    { id: 'calf_raises', name: 'Calf Raises', nameEs: 'Elevaciones Pantorrilla', reps: '3x20', repsEs: '3x20', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 15, emoji: '🦶', muscles: 'Calves', musclesEs: 'Pantorrillas', steps: ['Stand on flat floor or step edge', 'Rise onto toes as high as possible', 'Hold 1 second at top', 'Lower slowly'], stepsEs: ['Párate en piso o borde de escalón', 'Sube a puntas lo más alto', 'Mantén 1 segundo arriba', 'Baja lentamente'], tip: 'Slow on the way down!', tipEs: '¡Lento al bajar!' },
    { id: 'inchworms', name: 'Inchworms', nameEs: 'Gusanitos', reps: '3x8', repsEs: '3x8', category: 'Full Body', categoryEs: 'Cuerpo Completo', calPerSet: 25, emoji: '🐛', muscles: 'Core, Shoulders, Hamstrings', musclesEs: 'Core, Hombros, Isquiotibiales', steps: ['Stand, bend forward touch floor', 'Walk hands out to plank', 'Do one push-up (optional)', 'Walk hands back, stand up'], stepsEs: ['Párate, inclínate toca piso', 'Camina manos a plancha', 'Haz una flexión (opcional)', 'Camina manos de vuelta, párate'], tip: 'Keep legs straight!', tipEs: '¡Piernas rectas!' },
    { id: 'skaters', name: 'Skaters', nameEs: 'Patinadores', reps: '3x20', repsEs: '3x20', category: 'Cardio', categoryEs: 'Cardio', calPerSet: 30, emoji: '⛸️', muscles: 'Glutes, Quads, Balance', musclesEs: 'Glúteos, Cuádriceps, Balance', steps: ['Stand on one leg', 'Jump laterally to other leg', 'Land softly on one foot', 'Jump back immediately'], stepsEs: ['Párate en una pierna', 'Salta lateral a otra pierna', 'Aterriza suave en un pie', 'Salta de vuelta'], tip: 'Swing arms for momentum!', tipEs: '¡Mueve brazos para impulso!' },
    // SET C (Mar, Jun, Sep, Dec)
    { id: 'wide_pushups', name: 'Wide Push-ups', nameEs: 'Flexiones Amplias', reps: '3x10', repsEs: '3x10', category: 'Upper Body', categoryEs: 'Tren Superior', calPerSet: 22, emoji: '🤸', muscles: 'Chest, Shoulders', musclesEs: 'Pecho, Hombros', steps: ['Hands wider than shoulders', 'Body straight in plank', 'Lower chest to floor', 'Push up, squeeze chest'], stepsEs: ['Manos más anchas que hombros', 'Cuerpo recto en plancha', 'Baja pecho al piso', 'Sube, aprieta pecho'], tip: 'Wider = more chest!', tipEs: '¡Más ancho = más pecho!' },
    { id: 'bulgarian_split', name: 'Bulgarian Split Squat', nameEs: 'Sentadilla Búlgara', reps: '3x8 each', repsEs: '3x8 c/pierna', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 32, emoji: '🇧🇬', muscles: 'Quads, Glutes, Balance', musclesEs: 'Cuádriceps, Glúteos, Balance', steps: ['Stand in front of chair', 'Place one foot behind on chair', 'Lower front knee to 90°', 'Push through front heel'], stepsEs: ['Párate frente a silla', 'Pon un pie atrás en silla', 'Baja rodilla delantera a 90°', 'Empuja con talón delantero'], tip: 'Weight on front leg!', tipEs: '¡Peso en pierna delantera!' },
    { id: 'dead_bug', name: 'Dead Bug', nameEs: 'Bicho Muerto', reps: '3x12', repsEs: '3x12', category: 'Core', categoryEs: 'Core', calPerSet: 16, emoji: '🪲', muscles: 'Deep Core, Hip Flexors', musclesEs: 'Core Profundo, Flexores', steps: ['Lie on back, arms to ceiling', 'Legs raised, knees at 90°', 'Extend opposite arm and leg', 'Return and alternate'], stepsEs: ['Acuéstate, brazos al techo', 'Piernas arriba, rodillas a 90°', 'Extiende brazo y pierna opuestos', 'Regresa y alterna'], tip: 'Lower back stays on floor!', tipEs: '¡Espalda baja en el piso!' },
    { id: 'reverse_lunges', name: 'Reverse Lunges', nameEs: 'Zancadas Inversas', reps: '3x10 each', repsEs: '3x10 c/pierna', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 28, emoji: '🔙', muscles: 'Glutes, Quads', musclesEs: 'Glúteos, Cuádriceps', steps: ['Stand tall', 'Step one foot backward', 'Lower back knee to floor', 'Push off back foot to return'], stepsEs: ['Párate derecho', 'Paso atrás con un pie', 'Baja rodilla trasera al piso', 'Empuja con pie trasero'], tip: 'Easier on knees than forward!', tipEs: '¡Más fácil para rodillas!' },
    { id: 'commando_plank', name: 'Commando Plank', nameEs: 'Plancha Comando', reps: '3x10', repsEs: '3x10', category: 'Core', categoryEs: 'Core', calPerSet: 22, emoji: '🎖️', muscles: 'Core, Shoulders, Triceps', musclesEs: 'Core, Hombros, Tríceps', steps: ['Start in forearm plank', 'Push up to one hand, then other', 'Lower to one forearm, then other', 'Alternate leading arm'], stepsEs: ['Empieza en plancha antebrazos', 'Sube a una mano, luego otra', 'Baja a un antebrazo, luego otro', 'Alterna brazo líder'], tip: 'Keep hips still!', tipEs: '¡Caderas quietas!' },
    { id: 'donkey_kicks', name: 'Donkey Kicks', nameEs: 'Patadas de Burro', reps: '3x15 each', repsEs: '3x15 c/pierna', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 20, emoji: '🫏', muscles: 'Glutes, Hamstrings', musclesEs: 'Glúteos, Isquiotibiales', steps: ['On all fours', 'Keep knee bent at 90°', 'Lift leg toward ceiling', 'Squeeze glute, lower with control'], stepsEs: ['En cuatro puntos', 'Rodilla doblada a 90°', 'Levanta pierna al techo', 'Aprieta glúteo, baja con control'], tip: 'No arch back!', tipEs: '¡No arquees espalda!' },
    { id: 'russian_twists', name: 'Russian Twists', nameEs: 'Giros Rusos', reps: '3x20', repsEs: '3x20', category: 'Core', categoryEs: 'Core', calPerSet: 20, emoji: '🌀', muscles: 'Obliques, Abs', musclesEs: 'Oblicuos, Abdominales', steps: ['Sit, knees bent, lean back', 'Lift feet off floor', 'Rotate torso side to side', 'Touch floor each side'], stepsEs: ['Siéntate, rodillas dobladas, inclínate', 'Levanta pies del piso', 'Rota torso lado a lado', 'Toca piso cada lado'], tip: 'More lean = harder!', tipEs: '¡Más inclinación = más difícil!' },
    { id: 'step_ups', name: 'Step-ups', nameEs: 'Subidas', reps: '3x10 each', repsEs: '3x10 c/pierna', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 28, emoji: '📦', muscles: 'Quads, Glutes, Calves', musclesEs: 'Cuádriceps, Glúteos, Pantorrillas', steps: ['Stand in front of chair/step', 'Step up with one foot', 'Stand fully on top', 'Step back down with control'], stepsEs: ['Párate frente a silla/escalón', 'Sube con un pie', 'Párate completamente arriba', 'Baja con control'], tip: 'Lower surface if balance is hard!', tipEs: '¡Superficie más baja si es difícil!' },
    { id: 'bear_crawl', name: 'Bear Crawl', nameEs: 'Gateo de Oso', reps: '3x30s', repsEs: '3x30s', category: 'Full Body', categoryEs: 'Cuerpo Completo', calPerSet: 30, emoji: '🐻', muscles: 'Core, Shoulders, Quads', musclesEs: 'Core, Hombros, Cuádriceps', steps: ['All fours, lift knees 1 inch', 'Move opposite hand and foot forward', 'Then other hand and foot', 'Keep hips low, back flat'], stepsEs: ['Cuatro puntos, levanta rodillas 2cm', 'Mueve mano y pie opuestos', 'Luego otra mano y pie', 'Caderas bajas, espalda plana'], tip: 'Knees hover above ground!', tipEs: '¡Rodillas flotan sobre el piso!' },
    { id: 'side_plank', name: 'Side Plank', nameEs: 'Plancha Lateral', reps: '3x20s each', repsEs: '3x20s c/lado', category: 'Core', categoryEs: 'Core', calPerSet: 16, emoji: '📐', muscles: 'Obliques, Core, Shoulders', musclesEs: 'Oblicuos, Core, Hombros', steps: ['Lie on side, forearm on floor', 'Stack or stagger feet', 'Lift hips, straight line', 'Hold and breathe'], stepsEs: ['De lado, antebrazo en piso', 'Apila o escala pies', 'Sube caderas, línea recta', 'Mantén y respira'], tip: 'Hips up, no dropping!', tipEs: '¡Caderas arriba, no caigan!' },
    { id: 'tuck_jumps', name: 'Tuck Jumps', nameEs: 'Saltos Rodillas', reps: '3x8', repsEs: '3x8', category: 'Cardio', categoryEs: 'Cardio', calPerSet: 38, emoji: '🚀', muscles: 'Quads, Core, Cardio', musclesEs: 'Cuádriceps, Core, Cardio', steps: ['Feet shoulder-width', 'Jump up explosively', 'Tuck knees to chest at peak', 'Land softly with bent knees'], stepsEs: ['Pies al ancho de hombros', 'Salta explosivamente', 'Rodillas al pecho en el punto alto', 'Aterriza suave, rodillas dobladas'], tip: 'Start small, progress!', tipEs: '¡Empieza pequeño, progresa!' },
    { id: 'fire_hydrants', name: 'Fire Hydrants', nameEs: 'Hidrantes', reps: '3x15 each', repsEs: '3x15 c/pierna', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 18, emoji: '🚒', muscles: 'Glutes, Hip Abductors', musclesEs: 'Glúteos, Abductores', steps: ['On all fours', 'Keep knee bent at 90°', 'Lift leg out to side', 'Lower with control'], stepsEs: ['En cuatro puntos', 'Rodilla doblada a 90°', 'Levanta pierna al lado', 'Baja con control'], tip: 'Core tight, hips level!', tipEs: '¡Core apretado, caderas niveladas!' }
];

function getMonthlyExercises() {
    let month = new Date().getMonth();
    let setIndex;
    if (month === 0 || month === 3 || month === 6 || month === 9) setIndex = 0;
    else if (month === 1 || month === 4 || month === 7 || month === 10) setIndex = 1;
    else setIndex = 2;
    return ALL_EXERCISES.slice(setIndex * 12, (setIndex + 1) * 12);
}

const MOOD_OPTIONS = [
    { id: 'happy', emoji: '😊' }, { id: 'motivated', emoji: '💪' }, { id: 'neutral', emoji: '😐' },
    { id: 'tired', emoji: '😴' }, { id: 'stressed', emoji: '😰' }, { id: 'sad', emoji: '😢' },
    { id: 'angry', emoji: '😤' }, { id: 'anxious', emoji: '😟' }
];

const PAIN_AREAS = [
    { id: 'head', en: 'Head', es: 'Cabeza' }, { id: 'neck', en: 'Neck', es: 'Cuello' },
    { id: 'shoulders', en: 'Shoulders', es: 'Hombros' }, { id: 'back_upper', en: 'Upper Back', es: 'Espalda Alta' },
    { id: 'back_lower', en: 'Lower Back', es: 'Espalda Baja' }, { id: 'knees', en: 'Knees', es: 'Rodillas' },
    { id: 'legs', en: 'Legs', es: 'Piernas' }, { id: 'ankles', en: 'Ankles', es: 'Tobillos' }
];

// === State ===
let appData = {};
let wellnessData = {};
let profileData = {};
let weightHistory = [];
let leaderboardData = [];
let currentView = 'today';
let calendarMonth = new Date().getMonth();
let calendarYear = new Date().getFullYear();
let currentUser = null;


// === Initialize ===
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() { document.getElementById('splashScreen').classList.add('hidden'); }, 1500);
    auth.onAuthStateChanged(function(user) {
        if (user) { currentUser = user; showApp(); loadAllData(); }
        else { currentUser = null; showAuthScreen(); }
    });
    document.getElementById('authForm').addEventListener('submit', function(e) { e.preventDefault(); loginUser(); });
    document.getElementById('btnRegister').addEventListener('click', function() { registerUser(); });
    document.getElementById('btnLogout').addEventListener('click', function() { auth.signOut(); });
});

function loginUser() {
    let email = document.getElementById('authEmail').value.trim();
    let password = document.getElementById('authPassword').value;
    if (!email) { showAuthError(t('enterEmail')); return; }
    if (!password) { showAuthError(t('enterPassword')); return; }
    auth.signInWithEmailAndPassword(email, password).catch(function(e) { showAuthError(getAuthErrorMsg(e.code)); });
}

function registerUser() {
    let email = document.getElementById('authEmail').value.trim();
    let password = document.getElementById('authPassword').value;
    if (!email || !email.includes('@')) { showAuthError(t('validEmail')); return; }
    if (!password || password.length < 6) { showAuthError(t('passwordMin')); return; }
    auth.createUserWithEmailAndPassword(email, password).catch(function(e) { showAuthError(getAuthErrorMsg(e.code)); });
}

function getAuthErrorMsg(code) {
    if (code === 'auth/user-not-found') return currentLang === 'es' ? 'Cuenta no encontrada' : 'Account not found';
    if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') return currentLang === 'es' ? 'Correo o contraseña inválidos' : 'Invalid email or password';
    if (code === 'auth/email-already-in-use') return currentLang === 'es' ? 'Correo ya registrado' : 'Email already registered';
    if (code === 'auth/too-many-requests') return currentLang === 'es' ? 'Demasiados intentos' : 'Too many attempts';
    return currentLang === 'es' ? 'Error. Intenta de nuevo' : 'Error. Try again';
}

function showAuthError(msg) { let el = document.getElementById('authError'); el.textContent = msg; el.classList.remove('hidden'); }
function showAuthScreen() { document.getElementById('authScreen').classList.remove('hidden'); document.getElementById('app').classList.add('hidden'); }
function showApp() { document.getElementById('authScreen').classList.add('hidden'); document.getElementById('app').classList.remove('hidden'); initNavigation(); setTodayDate(); }

function loadAllData() {
    if (!currentUser) return;
    let uid = currentUser.uid;
    db.collection('users').doc(uid).collection('workouts').get().then(function(snap) { appData = {}; snap.forEach(function(doc) { appData[doc.id] = doc.data(); }); renderCurrentView(); }).catch(function() { renderCurrentView(); });
    db.collection('users').doc(uid).collection('wellness').get().then(function(snap) { wellnessData = {}; snap.forEach(function(doc) { wellnessData[doc.id] = doc.data(); }); }).catch(function() {});
    db.collection('users').doc(uid).collection('weightLog').orderBy('date', 'asc').get().then(function(snap) { weightHistory = []; snap.forEach(function(doc) { weightHistory.push(doc.data()); }); }).catch(function() {});
    db.collection('users').doc(uid).get().then(function(doc) { if (doc.exists) { profileData = doc.data(); if (profileData.language) { currentLang = profileData.language; localStorage.setItem('fittrack_lang', currentLang); updateNavLabels(); } } }).catch(function() {});
    loadLeaderboard();
}

function loadLeaderboard() {
    db.collection('leaderboard').orderBy('streak', 'desc').limit(20).onSnapshot(function(snap) {
        leaderboardData = [];
        snap.forEach(function(doc) { leaderboardData.push(doc.data()); });
        if (currentView === 'stats') { renderCurrentView(); }
    }, function(err) { console.log('Leaderboard error:', err); leaderboardData = []; });
}

function updateLeaderboard() {
    if (!currentUser) return;
    let streak = calculateStreak();
    let entry = { uid: currentUser.uid, displayName: currentUser.email.split('@')[0], streak: streak, lastUpdated: new Date().toISOString() };
    db.collection('leaderboard').doc(currentUser.uid).set(entry).then(function() { loadLeaderboard(); }).catch(function() {});
}

function saveWorkout() { if (!currentUser) return; let today = getTodayKey(); if (appData[today]) db.collection('users').doc(currentUser.uid).collection('workouts').doc(today).set(appData[today]).then(function() { updateLeaderboard(); }).catch(function() {}); }
function saveWellness() { if (!currentUser) return; let today = getTodayKey(); if (wellnessData[today]) db.collection('users').doc(currentUser.uid).collection('wellness').doc(today).set(wellnessData[today]).catch(function() {}); }
function saveProfile() { if (!currentUser) return; db.collection('users').doc(currentUser.uid).set(profileData, { merge: true }).catch(function() {}); }
function saveWeight(weight, date) { if (!currentUser) return; let entry = { weight: weight, date: date, timestamp: new Date().toISOString() }; db.collection('users').doc(currentUser.uid).collection('weightLog').doc(date).set(entry).then(function() { let i = weightHistory.findIndex(function(w) { return w.date === date; }); if (i > -1) weightHistory[i] = entry; else { weightHistory.push(entry); weightHistory.sort(function(a, b) { return a.date.localeCompare(b.date); }); } }).catch(function() {}); }
function loadLeaderboard() {
    db.collection('leaderboard').orderBy('streak', 'desc').limit(20).get().then(function(snap) { leaderboardData = []; snap.forEach(function(doc) { leaderboardData.push(doc.data()); }); }).catch(function() { leaderboardData = []; });
}

function updateLeaderboard() {
    if (!currentUser) return;
    var streak = calculateStreak();
    var entry = { uid: currentUser.uid, displayName: currentUser.email.split('@'), streak: streak, lastUpdated: new Date().toISOString() };
    db.collection('leaderboard').doc(currentUser.uid).set(entry).then(function() { loadLeaderboard(); }).catch(function() {});
}

// === Navigation ===
function setTodayDate() { let today = new Date(); document.getElementById('todayDate').textContent = today.toLocaleDateString(currentLang === 'es' ? 'es-ES' : 'en-US', { weekday: 'long', day: 'numeric', month: 'short' }); }

function initNavigation() {
    let navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(function(btn) { btn.addEventListener('click', function() { navBtns.forEach(function(b) { b.classList.remove('active'); }); btn.classList.add('active'); currentView = btn.getAttribute('data-view'); renderCurrentView(); }); });
    updateNavLabels();
}

function updateNavLabels() { let labels = document.querySelectorAll('.nav-label'); let views = ['today', 'calendar', 'wellness', 'stats', 'profile']; labels.forEach(function(label, i) { if (views[i]) label.textContent = t(views[i]); }); }
function renderCurrentView() { let c = document.getElementById('content'); if (currentView === 'today') renderTodayView(c); else if (currentView === 'calendar') renderCalendarView(c); else if (currentView === 'wellness') renderWellnessView(c); else if (currentView === 'stats') renderStatsView(c); else if (currentView === 'profile') renderProfileView(c); }

// === TODAY VIEW ===
function renderTodayView(container) {
    let today = getTodayKey(); let dayData = getDayData(today);
    let jumpCount = dayData.jumpCount || 0; let jumpPercent = Math.min((jumpCount / JUMP_GOAL) * 100, 100);
    let jumpStatus = dayData.jumpCompleted ? 'complete' : (dayData.jumpStartTime ? 'active' : 'pending');
    let streak = calculateStreak();
    let statusBadge = jumpStatus === 'complete' ? '<span class="jump-card-badge badge-complete">✓ ' + t('done') + '</span>' : jumpStatus === 'active' ? '<span class="jump-card-badge badge-active">' + t('inProgress') + '</span>' : '<span class="jump-card-badge badge-pending">' + t('pending') + '</span>';
    let html = '<div class="fade-in">';
    if (streak > 0) html += '<div class="streak-banner"><span class="streak-banner-fire">⭐</span><span class="streak-banner-text">' + streak + ' ' + t('dayStreak') + '</span><span class="streak-banner-msg">' + getStreakMessage(streak) + '</span></div>';
    let monthNames = currentLang === 'es' ? ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'] : ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let cm = new Date().getMonth(); let setLetter = (cm===0||cm===3||cm===6||cm===9)?'A':(cm===1||cm===4||cm===7||cm===10)?'B':'C';
    html += '<div class="month-set-badge">📅 ' + monthNames[cm] + ' • Set ' + setLetter + '</div>';
    html += '<div class="jump-card"><div class="jump-card-header"><span class="jump-card-title">🪢 ' + t('jumpRope') + '</span>' + statusBadge + '</div>';
    html += '<div class="jump-counter"><div class="jump-count-display">' + jumpCount + '</div><div class="jump-count-goal">/ ' + JUMP_GOAL + ' ' + t('jumps') + '</div>';
    html += '<div class="jump-progress-bar"><div class="jump-progress-fill" style="width:' + jumpPercent + '%"></div></div></div>';
    html += '<div class="jump-time-info"><div class="time-block"><div class="time-label">' + t('started') + '</div><div class="time-value">' + (dayData.jumpStartTime||'--') + '</div></div>';
    html += '<div class="time-block"><div class="time-label">' + t('finished') + '</div><div class="time-value">' + (dayData.jumpEndTime||'--') + '</div></div>';
    html += '<div class="time-block"><div class="time-label">' + t('duration') + '</div><div class="time-value">' + (dayData.jumpDuration||'--') + '</div></div></div>';
    if (!dayData.jumpCompleted) { html += '<div class="btn-group">'; if (!dayData.jumpStartTime) html += '<button class="btn btn-primary" id="btnStartJump">' + t('startJumping') + '</button>'; else { html += '<button class="btn btn-secondary" id="btnAddJumps">' + t('addJumps') + '</button>'; html += '<button class="btn btn-primary" id="btnFinishJump">' + t('finish') + '</button>'; } html += '</div>'; }
    html += '</div>';
    html += '<div class="exercise-section-title">' + t('todayExercises') + '</div>';
    let todayExercises = getTodayExercises();
    todayExercises.forEach(function(ex) { let done = dayData.exercises && dayData.exercises[ex.id]; let name = currentLang==='es'?ex.nameEs:ex.name; let reps = currentLang==='es'?ex.repsEs:ex.reps; html += '<div class="exercise-card' + (done?' completed':'') + '" data-exercise-id="' + ex.id + '"><div class="exercise-checkbox"><span class="exercise-check-icon">✓</span></div><div class="exercise-info"><div class="exercise-name">' + ex.emoji + ' ' + name + '</div><div class="exercise-detail">' + reps + ' • ' + ex.calPerSet + ' ' + t('cal') + '</div></div>' + (done?'<div class="exercise-time">' + dayData.exercises[ex.id] + '</div>':'') + '<button class="exercise-video-btn" data-exercise-id="' + ex.id + '">?</button></div>'; });
    let todayCal = calculateDayCalories(dayData);
    if (todayCal > 0) html += '<div class="calories-card"><div class="calories-header">🔥 ' + t('caloriesBurned') + '</div><div class="calories-number">' + todayCal + ' ' + t('cal') + '</div></div>';
    html += '</div>'; container.innerHTML = html;
    let bs = document.getElementById('btnStartJump'); if (bs) bs.addEventListener('click', startJumping);
    let ba = document.getElementById('btnAddJumps'); if (ba) ba.addEventListener('click', addJumps);
    let bf = document.getElementById('btnFinishJump'); if (bf) bf.addEventListener('click', finishJumping);
    container.querySelectorAll('.exercise-card').forEach(function(card) { card.querySelector('.exercise-checkbox').addEventListener('click', function() { toggleExercise(card.getAttribute('data-exercise-id')); renderCurrentView(); }); });
    container.querySelectorAll('.exercise-video-btn').forEach(function(btn) { btn.addEventListener('click', function(e) { e.stopPropagation(); let ex = ALL_EXERCISES.find(function(x) { return x.id === btn.getAttribute('data-exercise-id'); }); if (ex) openExerciseModal(ex); }); });
}

// === CALENDAR VIEW ===
function renderCalendarView(container) {
    let monthNames = currentLang==='es'?['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']:['January','February','March','April','May','June','July','August','September','October','November','December'];
    let dayNames = currentLang==='es'?['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    let today = new Date(); let todayKey = getTodayKey();
    let firstDay = new Date(calendarYear, calendarMonth, 1).getDay(); let daysInMonth = new Date(calendarYear, calendarMonth+1, 0).getDate();
    let html = '<div class="fade-in"><div class="calendar-header"><button class="calendar-nav-btn" id="prevMonth">◀</button><span class="calendar-month-title">' + monthNames[calendarMonth] + ' ' + calendarYear + '</span><button class="calendar-nav-btn" id="nextMonth">▶</button></div><div class="calendar-grid">';
    dayNames.forEach(function(d) { html += '<div class="calendar-day-name">' + d + '</div>'; });
    for (let i = 0; i < firstDay; i++) html += '<div class="calendar-cell empty"></div>';
    for (let d = 1; d <= daysInMonth; d++) { let dk = calendarYear+'-'+String(calendarMonth+1).padStart(2,'0')+'-'+String(d).padStart(2,'0'); let dd = appData[dk]; let cls = 'calendar-cell'; if (dk===todayKey) cls+=' today'; if (new Date(dk)>today) cls+=' future'; if (dd&&dd.jumpCompleted) cls+=' complete'; else if (dd&&dd.jumpCount>0) cls+=' partial'; html += '<div class="'+cls+'"><span class="calendar-day-number">'+d+'</span>'; if (dd&&dd.jumpCompleted) html+='<span class="calendar-day-icon">✓</span>'; else if (dd&&dd.jumpCount>0) html+='<span class="calendar-day-icon">◐</span>'; html+='</div>'; }
    html += '</div><div class="calendar-legend"><div class="legend-item"><span class="legend-dot complete"></span> '+t('completed')+'</div><div class="legend-item"><span class="legend-dot partial"></span> '+t('partial')+'</div></div>';
    let wd = getWeeklyData();
    html += '<div class="reward-card"><div class="reward-header">🏆 '+t('weeklyReward')+'</div><div class="reward-progress"><div class="reward-days">'+wd.completedDays+'/5 '+t('daysCompleted')+'</div><div class="reward-progress-bar"><div class="reward-progress-fill" style="width:'+((wd.completedDays/5)*100)+'%"></div></div></div><div class="reward-calories"><span class="reward-cal-number">'+wd.totalCalories+'</span> '+t('caloriesThisWeek')+'</div>';
    if (wd.completedDays >= 5) { html += '<div class="reward-unlocked"><div class="reward-unlocked-title">🎉 '+t('rewardUnlocked')+'</div><div class="reward-options">'; REWARDS.forEach(function(r) { if (wd.totalCalories >= r.calories) { html += '<div class="reward-option"><span class="reward-emoji">'+r.emoji+'</span><span class="reward-name">'+(currentLang==='es'?r.nameEs:r.name)+'</span></div>'; } }); html += '</div></div>'; }
    else html += '<div class="reward-locked">🔒 '+(5-wd.completedDays)+' '+t('moreDaysToUnlock')+'</div>';
    html += '</div></div>'; container.innerHTML = html;
    document.getElementById('prevMonth').addEventListener('click', function() { calendarMonth--; if (calendarMonth<0){calendarMonth=11;calendarYear--;} renderCurrentView(); });
    document.getElementById('nextMonth').addEventListener('click', function() { calendarMonth++; if (calendarMonth>11){calendarMonth=0;calendarYear++;} renderCurrentView(); });
}

// === WELLNESS VIEW ===
function renderWellnessView(container) {
    let today = getTodayKey(); let data = wellnessData[today] || {};
    let html = '<div class="fade-in"><div class="section-title-main">🧠 '+t('dailyWellnessCheck')+'</div><p class="section-subtitle">'+t('howFeeling')+'</p>';
    html += '<div class="wellness-card"><div class="wellness-card-title">😊 '+t('mood')+'</div><div class="mood-grid">';
    MOOD_OPTIONS.forEach(function(m) { html += '<button class="mood-btn'+(data.mood===m.id?' selected':'')+'" data-mood="'+m.id+'"><span class="mood-emoji">'+m.emoji+'</span><span class="mood-label">'+t(m.id)+'</span></button>'; });
    html += '</div></div>';
    html += '<div class="wellness-card"><div class="wellness-card-title">⚡ '+t('energyLevel')+'</div><div class="slider-container"><input type="range" class="wellness-slider" id="energySlider" min="1" max="5" value="'+(data.energy||3)+'"><div class="slider-labels"><span>'+t('low')+'</span><span>'+t('high')+'</span></div></div></div>';
    html += '<div class="wellness-card"><div class="wellness-card-title">😴 '+t('fatigueLevel')+'</div><div class="slider-container"><input type="range" class="wellness-slider" id="fatigueSlider" min="1" max="5" value="'+(data.fatigue||1)+'"><div class="slider-labels"><span>'+t('none')+'</span><span>'+t('exhausted')+'</span></div></div></div>';
    html += '<div class="wellness-card"><div class="wellness-card-title">🍽️ '+t('hungerLevel')+'</div><div class="slider-container"><input type="range" class="wellness-slider" id="hungerSlider" min="1" max="5" value="'+(data.hunger||3)+'"><div class="slider-labels"><span>'+t('full')+'</span><span>'+t('starving')+'</span></div></div></div>';
    html += '<div class="wellness-card"><div class="wellness-card-title">🌙 '+t('sleep')+'</div><div class="slider-container"><input type="range" class="wellness-slider" id="sleepSlider" min="1" max="5" value="'+(data.sleepQuality||3)+'"><div class="slider-labels"><span>'+t('terrible')+'</span><span>'+t('amazing')+'</span></div></div><div class="sleep-hours-group"><label class="auth-label">'+t('hoursSlept')+'</label><input type="number" class="auth-input" id="sleepHours" placeholder="8" min="0" max="24" step="0.5" value="'+(data.sleepHours||'')+'"></div></div>';
    html += '<div class="wellness-card"><div class="wellness-card-title">🤕 '+t('painDiscomfort')+'</div><div class="pain-grid">';
    PAIN_AREAS.forEach(function(a) { let active = data.pain&&data.pain.indexOf(a.id)>-1?' active':''; html += '<button class="pain-btn'+active+'" data-pain="'+a.id+'">'+(currentLang==='es'?a.es:a.en)+'</button>'; });
    html += '</div></div>';
    html += '<div class="wellness-card"><div class="wellness-card-title">📝 '+t('notes')+'</div><textarea class="wellness-notes" id="wellnessNotes" placeholder="'+t('notesPlaceholder')+'">'+(data.notes||'')+'</textarea></div>';
    html += '<button class="btn btn-primary wellness-save-btn" id="btnSaveWellness">'+t('saveWellness')+'</button></div>';
    container.innerHTML = html;
    container.querySelectorAll('.mood-btn').forEach(function(btn) { btn.addEventListener('click', function() { container.querySelectorAll('.mood-btn').forEach(function(b){b.classList.remove('selected');}); btn.classList.add('selected'); }); });
    container.querySelectorAll('.pain-btn').forEach(function(btn) { btn.addEventListener('click', function() { btn.classList.toggle('active'); }); });
    document.getElementById('btnSaveWellness').addEventListener('click', function() {
        let d = {}; let sm = container.querySelector('.mood-btn.selected'); if (sm) d.mood = sm.getAttribute('data-mood');
        d.energy = parseInt(document.getElementById('energySlider').value); d.fatigue = parseInt(document.getElementById('fatigueSlider').value);
        d.hunger = parseInt(document.getElementById('hungerSlider').value); d.sleepQuality = parseInt(document.getElementById('sleepSlider').value);
        let sh = document.getElementById('sleepHours').value; if (sh) d.sleepHours = parseFloat(sh);
        d.pain = []; container.querySelectorAll('.pain-btn.active').forEach(function(b){d.pain.push(b.getAttribute('data-pain'));});
        d.notes = document.getElementById('wellnessNotes').value; d.timestamp = new Date().toISOString();
        wellnessData[today] = d; saveWellness(); alert(t('wellnessSaved'));
    });
}

// === STATS VIEW ===
function renderStatsView(container) {
    let days = Object.keys(appData); let completedDays = days.filter(function(d){return appData[d].jumpCompleted;}).length;
    let totalJumps = days.reduce(function(s,d){return s+(appData[d].jumpCount||0);},0);
    let totalExercises = days.reduce(function(s,d){return s+(appData[d].exercises?Object.keys(appData[d].exercises).length:0);},0);
    let totalCalories = days.reduce(function(s,d){return s+calculateDayCalories(appData[d]);},0);
    let streak = calculateStreak();
    let html = '<div class="fade-in"><div class="streak-card"><div class="streak-number">'+streak+' 🔥</div><div class="streak-label">'+t('dayStreak')+'</div><div class="streak-message">'+getStreakMessage(streak)+'</div></div>';
    html += '<div class="stats-grid"><div class="stats-card"><div class="stats-card-number">'+totalJumps.toLocaleString()+'</div><div class="stats-card-label">'+t('totalJumps')+'</div></div>';
    html += '<div class="stats-card"><div class="stats-card-number">'+completedDays+'</div><div class="stats-card-label">'+t('daysCompletedStat')+'</div></div>';
    html += '<div class="stats-card"><div class="stats-card-number">'+totalCalories.toLocaleString()+'</div><div class="stats-card-label">'+t('totalCalories')+'</div></div>';
    html += '<div class="stats-card"><div class="stats-card-number">'+totalExercises+'</div><div class="stats-card-label">'+t('exercisesDone')+'</div></div></div>';
    // Leaderboard
    html += '<div class="exercise-section-title">🏆 '+t('leaderboard')+'</div>';
    if (leaderboardData.length > 0) { html += '<div class="leaderboard-card"><div class="leaderboard-header"><span class="lb-col-rank">'+t('rank')+'</span><span class="lb-col-user">'+t('user')+'</span><span class="lb-col-streak">'+t('streak')+'</span></div>';
        leaderboardData.forEach(function(entry, i) { let isMe = currentUser&&entry.uid===currentUser.uid; let rank = i===0?'🥇':i===1?'🥈':i===2?'🥉':(i+1); html += '<div class="leaderboard-row'+(isMe?' me':'')+'"><span class="lb-col-rank">'+rank+'</span><span class="lb-col-user">'+entry.displayName+(isMe?' '+t('you'):'')+'</span><span class="lb-col-streak">'+entry.streak+' 🔥</span></div>'; });
        html += '</div>'; } else { html += '<div class="empty-state"><div class="empty-state-icon">🏆</div><div class="empty-state-text">'+t('noLeaderboard')+'</div></div>'; }
    // Weight trend
    html += '<div class="exercise-section-title">⚖️ '+t('weightTrend')+'</div>';
    if (weightHistory.length > 0) { let latest = weightHistory[weightHistory.length-1]; let first = weightHistory[0]; let diff = (latest.weight-first.weight).toFixed(1); let arrow = diff<=0?'↓':'↑'; let sign = diff<=0?'':'+';
        html += '<div class="trend-summary"><div class="trend-current"><div class="trend-current-number">'+latest.weight+' kg</div><div class="trend-current-label">'+t('currentWeight')+'</div></div><div class="trend-change"><div class="trend-change-number">'+arrow+' '+sign+diff+' kg</div><div class="trend-change-label">'+t('since')+' '+formatDateShort(first.date)+'</div></div></div>';
        html += '<div class="weight-chart">'; let maxW = Math.max.apply(null,weightHistory.map(function(w){return w.weight;})); let minW = Math.min.apply(null,weightHistory.map(function(w){return w.weight;})); let range = maxW-minW||1;
        weightHistory.slice(-10).forEach(function(entry) { let h = Math.round(((entry.weight-minW)/range)*60+30); html += '<div class="weight-bar-group"><div class="weight-bar-value">'+entry.weight+'</div><div class="weight-bar" style="height:'+h+'px;min-height:'+h+'px;max-height:'+h+'px;"></div><div class="weight-bar-date">'+formatDateShort(entry.date)+'</div></div>'; });
        html += '</div>'; } else { html += '<div class="empty-state"><div class="empty-state-icon">⚖️</div><div class="empty-state-text">'+t('noWeightRecords')+'</div></div>'; }
    // Wellness trends
    html += '<div class="exercise-section-title">🧠 '+t('wellnessTrends')+'</div>';
    let wDays = Object.keys(wellnessData).sort().reverse().slice(0,7).reverse();
    if (wDays.length > 0) { html += '<div class="trend-card"><div class="trend-card-title">'+t('moodHistory')+'</div><div class="mood-history">';
        wDays.forEach(function(day) { let w = wellnessData[day]; let mo = MOOD_OPTIONS.find(function(m){return m.id===w.mood;}); html += '<div class="mood-history-item"><div class="mood-history-emoji">'+(mo?mo.emoji:'❓')+'</div><div class="mood-history-date">'+formatDateShort(day)+'</div></div>'; });
        html += '</div></div>'; let avgE=0,avgS=0,avgF=0,cnt=0; wDays.forEach(function(day){let w=wellnessData[day];if(w.energy){avgE+=w.energy;cnt++;}if(w.sleepHours)avgS+=w.sleepHours;if(w.fatigue)avgF+=w.fatigue;}); if(cnt>0){avgE=(avgE/cnt).toFixed(1);avgS=(avgS/cnt).toFixed(1);avgF=(avgF/cnt).toFixed(1);}
        html += '<div class="stats-grid"><div class="stats-card"><div class="stats-card-number">⚡'+avgE+'/5</div><div class="stats-card-label">'+t('avgEnergy')+'</div></div><div class="stats-card"><div class="stats-card-number">🌙'+avgS+'h</div><div class="stats-card-label">'+t('avgSleep')+'</div></div><div class="stats-card"><div class="stats-card-number">😴'+avgF+'/5</div><div class="stats-card-label">'+t('avgFatigue')+'</div></div></div>';
    } else { html += '<div class="empty-state"><div class="empty-state-icon">🧠</div><div class="empty-state-text">'+t('noWellnessData')+'</div></div>'; }
    // Rewards earned
    if (totalCalories > 0) { html += '<div class="exercise-section-title">🍔 '+t('youveEarned')+'</div>'; REWARDS.forEach(function(r) { let times = Math.floor(totalCalories/r.calories); if (times>0) html += '<div class="exercise-card"><div class="exercise-info"><div class="exercise-name">'+r.emoji+' '+times+'x '+(currentLang==='es'?r.nameEs:r.name)+'</div><div class="exercise-detail">'+(times*r.calories)+' cal</div></div></div>'; }); }
    html += '</div>'; container.innerHTML = html;
}

// === PROFILE VIEW ===
function renderProfileView(container) {
    let html = '<div class="fade-in"><div class="section-title-main">👤 '+t('myProfile')+'</div>';
    // Language
    html += '<div class="profile-card"><div class="profile-card-title">🌐 '+t('language')+'</div><div class="language-selector"><button class="lang-btn'+(currentLang==='en'?' active':'')+'" data-lang="en">🇺🇸 English</button><button class="lang-btn'+(currentLang==='es'?' active':'')+'" data-lang="es">🇪🇸 Español</button></div></div>';
    // Account
    html += '<div class="profile-card"><div class="profile-card-title">📧 '+t('account')+'</div><div class="profile-field"><span class="profile-label">Email</span><span class="profile-value">'+(currentUser?currentUser.email:'')+'</span></div><div class="profile-field"><span class="profile-label">'+t('memberSince')+'</span><span class="profile-value">'+(currentUser?new Date(currentUser.metadata.creationTime).toLocaleDateString(currentLang==='es'?'es-ES':'en-US',{day:'numeric',month:'short',year:'numeric'}):'')+'</span></div></div>';
    // Weight log
    html += '<div class="profile-card"><div class="profile-card-title">⚖️ '+t('logWeight')+'</div><div class="weight-log-form"><div class="profile-input-group"><label class="auth-label">'+t('weightKg')+'</label><input type="number" class="auth-input" id="weightInput" placeholder="70.5" step="0.1"></div><div class="profile-input-group"><label class="auth-label">'+t('date')+'</label><input type="date" class="auth-input" id="weightDate" value="'+getTodayKey()+'"></div><button class="btn btn-primary" id="btnLogWeight" style="margin-top:12px;width:100%;">'+t('logWeightBtn')+'</button></div>';
    if (weightHistory.length > 0) { html += '<div class="weight-recent-title">'+t('recentEntries')+'</div><div class="weight-history-list">'; weightHistory.slice().reverse().slice(0,5).forEach(function(e) { html += '<div class="weight-history-item"><span class="weight-history-date">'+formatDateShort(e.date)+'</span><span class="weight-history-value">'+e.weight+' kg</span></div>'; }); html += '</div>'; }
    html += '</div>';
    // Body info
    html += '<div class="profile-card"><div class="profile-card-title">📏 '+t('bodyInfo')+'</div><div class="profile-form-grid"><div class="profile-input-group"><label class="auth-label">'+t('heightCm')+'</label><input type="number" class="auth-input" id="profileHeight" placeholder="170" value="'+(profileData.height||'')+'"></div><div class="profile-input-group"><label class="auth-label">'+t('age')+'</label><input type="number" class="auth-input" id="profileAge" placeholder="25" value="'+(profileData.age||'')+'"></div><div class="profile-input-group"><label class="auth-label">'+t('gender')+'</label><select class="auth-input" id="profileGender"><option value="">'+t('select')+'</option><option value="male"'+(profileData.gender==='male'?' selected':'')+'>'+t('male')+'</option><option value="female"'+(profileData.gender==='female'?' selected':'')+'>'+t('female')+'</option><option value="other"'+(profileData.gender==='other'?' selected':'')+'>'+t('other')+'</option></select></div></div></div>';
    // Goal
    html += '<div class="profile-card"><div class="profile-card-title">🎯 '+t('fitnessGoal')+'</div><div class="goal-grid">';
    [{id:'lose_weight',emoji:'⬇️',key:'loseWeight'},{id:'gain_muscle',emoji:'💪',key:'gainMuscle'},{id:'stay_fit',emoji:'🏃',key:'stayFit'},{id:'flexibility',emoji:'🧘',key:'flexibility'},{id:'endurance',emoji:'🫀',key:'endurance'},{id:'stress_relief',emoji:'🧘‍♂️',key:'stressRelief'}].forEach(function(g) { html += '<button class="goal-btn'+(profileData.goal===g.id?' selected':'')+'" data-goal="'+g.id+'"><span class="goal-emoji">'+g.emoji+'</span><span class="goal-label">'+t(g.key)+'</span></button>'; });
    html += '</div></div>';
    // Medical
    html += '<div class="profile-card"><div class="profile-card-title">🏥 '+t('medicalConditions')+'</div><textarea class="wellness-notes" id="profileMedical" placeholder="'+t('medicalPlaceholder')+'">'+(profileData.medical||'')+'</textarea></div>';
    html += '<button class="btn btn-primary wellness-save-btn" id="btnSaveProfile">'+t('saveProfile')+'</button>';
    // Password
    html += '<div class="profile-card"><div class="profile-card-title">🔒 '+t('changePassword')+'</div><div class="profile-input-group"><label class="auth-label">'+t('newPassword')+'</label><input type="password" class="auth-input" id="newPassword" placeholder="'+t('passwordPlaceholder')+'"></div><button class="btn btn-secondary" id="btnChangePassword" style="margin-top:12px;">'+t('updatePassword')+'</button></div>';
    html += '<button class="btn btn-danger wellness-save-btn" id="btnLogoutProfile">'+t('logout')+'</button></div>';
    container.innerHTML = html;
    // Listeners
    container.querySelectorAll('.lang-btn').forEach(function(btn) { btn.addEventListener('click', function() { currentLang = btn.getAttribute('data-lang'); localStorage.setItem('fittrack_lang', currentLang); profileData.language = currentLang; saveProfile(); updateNavLabels(); setTodayDate(); renderCurrentView(); }); });
    container.querySelectorAll('.goal-btn').forEach(function(btn) { btn.addEventListener('click', function() { container.querySelectorAll('.goal-btn').forEach(function(b){b.classList.remove('selected');}); btn.classList.add('selected'); }); });
    document.getElementById('btnLogWeight').addEventListener('click', function() { let w = parseFloat(document.getElementById('weightInput').value); let d = document.getElementById('weightDate').value; if (!w||w<20||w>300){alert(t('validWeight'));return;} if (!d){alert(t('selectDate'));return;} saveWeight(w,d); alert(t('weightLogged')+' '+w+' kg ✓'); document.getElementById('weightInput').value=''; setTimeout(function(){renderCurrentView();},500); });
    document.getElementById('btnSaveProfile').addEventListener('click', function() { profileData.height=document.getElementById('profileHeight').value?parseFloat(document.getElementById('profileHeight').value):null; profileData.age=document.getElementById('profileAge').value?parseInt(document.getElementById('profileAge').value):null; profileData.gender=document.getElementById('profileGender').value||null; profileData.medical=document.getElementById('profileMedical').value||null; let sg=container.querySelector('.goal-btn.selected'); if(sg)profileData.goal=sg.getAttribute('data-goal'); profileData.updatedAt=new Date().toISOString(); saveProfile(); alert(t('profileSaved')); });
    document.getElementById('btnChangePassword').addEventListener('click', function() { let np=document.getElementById('newPassword').value; if(!np||np.length<6){alert(t('passwordMin'));return;} currentUser.updatePassword(np).then(function(){alert(t('passwordUpdated'));document.getElementById('newPassword').value='';}).catch(function(e){alert('Error: '+e.message);}); });
    document.getElementById('btnLogoutProfile').addEventListener('click', function() { auth.signOut(); });
}

// === Exercise Modal ===
function openExerciseModal(exercise) {
    let modal = document.createElement('div'); modal.className = 'video-modal';
    let name = currentLang==='es'?exercise.nameEs:exercise.name; let cat = currentLang==='es'?exercise.categoryEs:exercise.category;
    let muscles = currentLang==='es'?exercise.musclesEs:exercise.muscles; let tip = currentLang==='es'?exercise.tipEs:exercise.tip;
    let steps = currentLang==='es'?exercise.stepsEs:exercise.steps; let reps = currentLang==='es'?exercise.repsEs:exercise.reps;
    let stepsHtml = ''; steps.forEach(function(s,i){stepsHtml+='<div class="exercise-step"><span class="step-number">'+(i+1)+'</span><span class="step-text">'+s+'</span></div>';});
    modal.innerHTML = '<div class="video-modal-overlay"></div><div class="video-modal-content exercise-modal-content"><button class="video-modal-close">✕</button><div class="exercise-modal-body"><div class="exercise-modal-emoji">'+exercise.emoji+'</div><div class="exercise-modal-name">'+name+'</div><div class="exercise-modal-category">'+cat+'</div><div class="exercise-modal-section-title">📋 '+t('howToDoIt')+'</div><div class="exercise-steps">'+stepsHtml+'</div><div class="exercise-modal-section-title">💪 '+t('musclesWorked')+'</div><div class="exercise-modal-muscles">'+muscles+'</div><div class="exercise-modal-section-title">⚠️ '+t('tip')+'</div><div class="exercise-modal-tip">'+tip+'</div><div class="exercise-modal-reps">'+reps+' • '+exercise.calPerSet+' '+t('cal')+' '+t('perSet')+'</div></div></div>';
    document.body.appendChild(modal); setTimeout(function(){modal.classList.add('active');},10);
    modal.querySelector('.video-modal-overlay').addEventListener('click',function(){modal.classList.remove('active');setTimeout(function(){modal.remove();},300);});
    modal.querySelector('.video-modal-close').addEventListener('click',function(){modal.classList.remove('active');setTimeout(function(){modal.remove();},300);});
}

// === Helper Functions ===
function formatDateShort(dateStr) { let d = new Date(dateStr+'T12:00:00'); return d.toLocaleDateString(currentLang==='es'?'es-ES':'en-US',{day:'numeric',month:'short'}); }
function startJumping() { let today=getTodayKey(); let d=getDayData(today); d.jumpStartTime=getCurrentTime(); d.jumpCount=d.jumpCount||0; appData[today]=d; saveWorkout(); renderCurrentView(); }
function addJumps() { let input=prompt(t('howManyJumps'),'100'); if(input===null)return; let j=parseInt(input); if(isNaN(j)||j<=0)return; let today=getTodayKey(); let d=getDayData(today); d.jumpCount=(d.jumpCount||0)+j; if(d.jumpCount>=JUMP_GOAL){d.jumpCount=JUMP_GOAL;d.jumpCompleted=true;d.jumpEndTime=getCurrentTime();d.jumpDuration=calculateDuration(d.jumpStartTime,d.jumpEndTime);} appData[today]=d; saveWorkout(); renderCurrentView(); }
function finishJumping() { let today=getTodayKey(); let d=getDayData(today); if(d.jumpCount<JUMP_GOAL){if(!confirm((JUMP_GOAL-d.jumpCount)+' '+t('jumpsRemaining')))return;} d.jumpCompleted=true; d.jumpEndTime=getCurrentTime(); d.jumpDuration=calculateDuration(d.jumpStartTime,d.jumpEndTime); appData[today]=d; saveWorkout(); renderCurrentView(); }
function toggleExercise(id) { let today=getTodayKey(); let d=getDayData(today); if(!d.exercises)d.exercises={}; if(d.exercises[id])delete d.exercises[id]; else d.exercises[id]=getCurrentTime(); appData[today]=d; saveWorkout(); }
function getTodayExercises() { let me=getMonthlyExercises(); let today=new Date(); let doy=Math.floor((today-new Date(today.getFullYear(),0,0))/86400000); let si=(doy*6)%me.length; let ex=[]; for(let i=0;i<6;i++)ex.push(me[(si+i)%me.length]); return ex; }
function calculateDayCalories(d) { let c=0; if(d.jumpCount)c+=Math.round(d.jumpCount*CALORIES_PER_JUMP); if(d.exercises)Object.keys(d.exercises).forEach(function(id){let e=ALL_EXERCISES.find(function(x){return x.id===id;}); if(e)c+=e.calPerSet;}); return c; }
function getWeeklyData() { let today=new Date(); let dow=today.getDay(); let mon=new Date(today); mon.setDate(today.getDate()-((dow+6)%7)); let cd=0,tc=0; for(let i=0;i<7;i++){let ck=new Date(mon);ck.setDate(mon.getDate()+i);let k=ck.toISOString().split('T')[0];if(appData[k]){if(appData[k].jumpCompleted)cd++;tc+=calculateDayCalories(appData[k]);}} return{completedDays:cd,totalCalories:tc}; }
function calculateStreak() { let s=0; let d=new Date(); while(true){let k=d.toISOString().split('T')[0]; if(appData[k]&&appData[k].jumpCompleted){s++;d.setDate(d.getDate()-1);}else break;} return s; }
function getStreakMessage(s) { if(s===0)return t('startToday'); if(s<3)return t('goodStart'); if(s<7)return t('onFire'); if(s<14)return t('oneWeekStrong'); if(s<30)return t('unstoppable'); if(s<60)return t('legend'); return t('machine'); }
function getTodayKey() { return new Date().toISOString().split('T')[0]; }
function getDayData(key) { return appData[key] || {}; }
function getCurrentTime() { let n=new Date(); return String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0'); }
function calculateDuration(s,e) { let st=s.split(':'),en=e.split(':'); let diff=(parseInt(en[0])*60+parseInt(en[1]))-(parseInt(st[0])*60+parseInt(st[1])); if(diff<0)diff+=1440; let h=Math.floor(diff/60),m=diff%60; return h>0?h+'h '+m+'min':m+' min'; }
