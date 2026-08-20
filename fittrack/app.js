
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
    navigator.serviceWorker.register('service-worker.js').catch(function(err) {
        console.log('SW:', err);
    });
}

// === i18n TRANSLATIONS ===
const TRANSLATIONS = {
    en: {
        // Auth
        signInSync: 'Sign in to sync your progress',
        email: 'EMAIL',
        password: '[PASSWORD]',
        emailPlaceholder: 'your@email.com',
        passwordPlaceholder: 'Min. 6 characters',
        login: 'LOGIN',
        createAccount: 'CREATE ACCOUNT',
        dataSyncs: 'Your data syncs across all devices',
        // Nav
        today: 'Today',
        calendar: 'Calendar',
        wellness: 'Wellness',
        stats: 'Stats',
        profile: 'Profile',
        // Today
        jumpRope: 'Jump Rope',
        pending: 'Pending',
        inProgress: 'In Progress',
        done: 'Done',
        jumps: 'jumps',
        started: 'STARTED',
        finished: 'FINISHED',
        duration: 'DURATION',
        startJumping: 'START JUMPING',
        addJumps: '+ Add Jumps',
        finish: 'Finish ✓',
        todayExercises: "Today's Exercises",
        caloriesBurned: 'Calories Burned Today',
        cal: 'cal',
        dayStreak: 'day streak',
        // Calendar
        weeklyReward: 'Weekly Reward',
        daysCompleted: 'days completed',
        caloriesThisWeek: 'calories this week',
        rewardUnlocked: 'Reward Unlocked!',
        moreDaysToUnlock: 'more days to unlock!',
        completed: 'Completed',
        partial: 'Partial',
        // Wellness
        dailyWellnessCheck: 'Daily Wellness Check',
        howFeeling: 'How are you feeling today?',
        mood: 'Mood',
        energyLevel: 'Energy Level',
        fatigueLevel: 'Fatigue Level',
        hungerLevel: 'Hunger Level',
        sleep: 'Sleep',
        hoursSlept: 'Hours slept',
        painDiscomfort: 'Pain / Discomfort',
        painIntensity: 'Pain intensity (1-10)',
        notes: 'Notes',
        notesPlaceholder: 'How do you feel? Any observations...',
        saveWellness: 'Save Wellness Check ✓',
        wellnessSaved: 'Wellness check saved! ✓',
        low: 'Low', medium: 'Medium', high: 'High',
        none: 'None', moderate: 'Moderate', exhausted: 'Exhausted',
        full: 'Full', normal: 'Normal', starving: 'Starving',
        terrible: 'Terrible', ok: 'OK', amazing: 'Amazing',
        mild: 'Mild', severe: 'Severe',
        // Stats
        totalJumps: 'Total Jumps',
        daysCompletedStat: 'Days Completed',
        totalCalories: 'Total Calories',
        exercisesDone: 'Exercises Done',
        weightTrend: 'Weight Trend',
        currentWeight: 'Current Weight',
        since: 'Since',
        noWeightRecords: 'No weight records yet. Add your weight in the Profile tab.',
        wellnessTrends: 'Wellness Trends (Last 7 days)',
        moodHistory: 'Mood History',
        avgEnergy: 'Avg Energy',
        avgSleep: 'Avg Sleep',
        avgFatigue: 'Avg Fatigue',
        daysTracked: 'Days Tracked',
        frequentPain: 'Most Frequent Pain Areas',
        noWellnessData: 'No wellness data yet. Fill your daily check in the Wellness tab.',
        youveEarned: "You've Earned",
        // Leaderboard
        leaderboard: 'Leaderboard',
        rank: 'Rank',
        user: 'User',
        streak: 'Streak',
        you: '(You)',
        noLeaderboard: 'Complete your first day to join the leaderboard!',
        // Profile
        myProfile: 'My Profile',
        account: 'Account',
        memberSince: 'Member since',
        logWeight: 'Log Weight',
        weightKg: 'Weight (kg)',
        date: 'Date',
        logWeightBtn: 'Log Weight ⚖️',
        recentEntries: 'Recent Entries',
        bodyInfo: 'Body Info',
        heightCm: 'Height (cm)',
        age: 'Age',
        gender: 'Gender',
        male: 'Male', female: 'Female', other: 'Other',
        select: 'Select',
        fitnessGoal: 'Fitness Goal',
        loseWeight: 'Lose Weight',
        gainMuscle: 'Gain Muscle',
        stayFit: 'Stay Fit',
        flexibility: 'Flexibility',
        endurance: 'Endurance',
        stressRelief: 'Stress Relief',
        medicalConditions: 'Medical Conditions',
        medicalPlaceholder: 'Any conditions, allergies, injuries...',
        saveProfile: 'Save Profile ✓',
        profileSaved: 'Profile saved! ✓',
        changePassword: 'Change Password',
        newPassword: 'New Password',
        updatePassword: 'Update Password',
        passwordUpdated: 'Password updated! ✓',
        logout: 'Logout',
        language: 'Language',
        // Exercise modal
        howToDoIt: 'How to do it:',
        musclesWorked: 'Muscles worked:',
        tip: 'Tip:',
        rest: 'Rest: 30-60 sec between sets',
        perSet: 'per set',
        // Misc
        howManyJumps: 'How many jumps did you do?',
        jumpsRemaining: 'jumps remaining. Mark as complete?',
        validWeight: 'Please enter a valid weight (20-300 kg)',
        selectDate: 'Please select a date',
        weightLogged: 'Weight logged:',
        enterEmail: 'Please enter your email',
        enterPassword: 'Please enter your password',
        validEmail: 'Please enter a valid email',
        passwordMin: 'Password must be at least 6 characters',
        // Streak messages
        startToday: 'Start today!',
        goodStart: 'Good start!',
        onFire: 'On fire! 🔥',
        oneWeekStrong: 'One week strong! 💪',
        unstoppable: 'Unstoppable! 🚀',
        legend: 'Legend! 👑',
        machine: 'Machine! 🏆',
        // Moods
        happy: 'Happy', motivated: 'Motivated', neutral: 'Neutral',
        tired: 'Tired', stressed: 'Stressed', sad: 'Sad',
        angry: 'Angry', anxious: 'Anxious',
        // Slider labels
        veryLow: 'Very Low', good: 'Good',
        fresh: 'Fresh', slight: 'Slight',
        satisfied: 'Satisfied', hungry: 'Hungry'
    },
    es: {
        // Auth
        signInSync: 'Inicia sesión para sincronizar tu progreso',
        email: 'CORREO',
        password: '[PASSWORD]',
        emailPlaceholder: 'tu@correo.com',
        passwordPlaceholder: 'Mín. 6 caracteres',
        login: 'INICIAR SESIÓN',
        createAccount: 'CREAR CUENTA',
        dataSyncs: 'Tus datos se sincronizan en todos tus dispositivos',
        // Nav
        today: 'Hoy',
        calendar: 'Calendario',
        wellness: 'Bienestar',
        stats: 'Estadísticas',
        profile: 'Perfil',
        // Today
        jumpRope: 'Saltar Cuerda',
        pending: 'Pendiente',
        inProgress: 'En Progreso',
        done: 'Hecho',
        jumps: 'saltos',
        started: 'INICIO',
        finished: 'FIN',
        duration: 'DURACIÓN',
        startJumping: 'EMPEZAR A SALTAR',
        addJumps: '+ Agregar Saltos',
        finish: 'Terminar ✓',
        todayExercises: 'Ejercicios de Hoy',
        caloriesBurned: 'Calorías Quemadas Hoy',
        cal: 'cal',
        dayStreak: 'días de racha',
        // Calendar
        weeklyReward: 'Recompensa Semanal',
        daysCompleted: 'días completados',
        caloriesThisWeek: 'calorías esta semana',
        rewardUnlocked: '¡Recompensa Desbloqueada!',
        moreDaysToUnlock: 'días más para desbloquear!',
        completed: 'Completado',
        partial: 'Parcial',
        // Wellness
        dailyWellnessCheck: 'Chequeo Diario de Bienestar',
        howFeeling: '¿Cómo te sientes hoy?',
        mood: 'Estado de Ánimo',
        energyLevel: 'Nivel de Energía',
        fatigueLevel: 'Nivel de Fatiga',
        hungerLevel: 'Nivel de Hambre',
        sleep: 'Sueño',
        hoursSlept: 'Horas dormidas',
        painDiscomfort: 'Dolor / Molestia',
        painIntensity: 'Intensidad del dolor (1-10)',
        notes: 'Notas',
        notesPlaceholder: '¿Cómo te sientes? Alguna observación...',
        saveWellness: 'Guardar Bienestar ✓',
        wellnessSaved: '¡Bienestar guardado! ✓',
        low: 'Bajo', medium: 'Medio', high: 'Alto',
        none: 'Ninguna', moderate: 'Moderada', exhausted: 'Agotado',
        full: 'Lleno', normal: 'Normal', starving: 'Hambriento',
        terrible: 'Terrible', ok: 'OK', amazing: 'Increíble',
        mild: 'Leve', severe: 'Severo',
        // Stats
        totalJumps: 'Total Saltos',
        daysCompletedStat: 'Días Completados',
        totalCalories: 'Total Calorías',
        exercisesDone: 'Ejercicios Hechos',
        weightTrend: 'Tendencia de Peso',
        currentWeight: 'Peso Actual',
        since: 'Desde',
        noWeightRecords: 'Sin registros de peso. Agrega tu peso en el tab de Perfil.',
        wellnessTrends: 'Tendencias de Bienestar (Últimos 7 días)',
        moodHistory: 'Historial de Ánimo',
        avgEnergy: 'Energía Prom.',
        avgSleep: 'Sueño Prom.',
        avgFatigue: 'Fatiga Prom.',
        daysTracked: 'Días Registrados',
        frequentPain: 'Áreas de Dolor Frecuentes',
        noWellnessData: 'Sin datos de bienestar. Llena tu chequeo diario en el tab de Bienestar.',
        youveEarned: 'Has Ganado',
        // Leaderboard
        leaderboard: 'Tabla de Posiciones',
        rank: 'Pos.',
        user: 'Usuario',
        streak: 'Racha',
        you: '(Tú)',
        noLeaderboard: '¡Completa tu primer día para unirte a la tabla!',
        // Profile
        myProfile: 'Mi Perfil',
        account: 'Cuenta',
        memberSince: 'Miembro desde',
        logWeight: 'Registrar Peso',
        weightKg: 'Peso (kg)',
        date: 'Fecha',
        logWeightBtn: 'Registrar Peso ⚖️',
        recentEntries: 'Entradas Recientes',
        bodyInfo: 'Info Corporal',
        heightCm: 'Altura (cm)',
        age: 'Edad',
        gender: 'Género',
        male: 'Masculino', female: 'Femenino', other: 'Otro',
        select: 'Seleccionar',
        fitnessGoal: 'Meta Fitness',
        loseWeight: 'Bajar de Peso',
        gainMuscle: 'Ganar Músculo',
        stayFit: 'Mantenerme Fit',
        flexibility: 'Flexibilidad',
        endurance: 'Resistencia',
        stressRelief: 'Reducir Estrés',
        medicalConditions: 'Condiciones Médicas',
        medicalPlaceholder: 'Condiciones, alergias, lesiones...',
        saveProfile: 'Guardar Perfil ✓',
        profileSaved: '¡Perfil guardado! ✓',
        changePassword: 'Cambiar Contraseña',
        newPassword: 'Nueva Contraseña',
        updatePassword: 'Actualizar Contraseña',
        passwordUpdated: '¡Contraseña actualizada! ✓',
        logout: 'Cerrar Sesión',
        language: 'Idioma',
        // Exercise modal
        howToDoIt: 'Cómo hacerlo:',
        musclesWorked: 'Músculos trabajados:',
        tip: 'Consejo:',
        rest: 'Descanso: 30-60 seg entre series',
        perSet: 'por serie',
        // Misc
        howManyJumps: '¿Cuántos saltos hiciste?',
        jumpsRemaining: 'saltos restantes. ¿Marcar como completo?',
        validWeight: 'Ingresa un peso válido (20-300 kg)',
        selectDate: 'Selecciona una fecha',
        weightLogged: 'Peso registrado:',
        enterEmail: 'Ingresa tu correo',
        enterPassword: 'Ingresa tu contraseña',
        validEmail: 'Ingresa un correo válido',
        passwordMin: 'La contraseña debe tener al menos 6 caracteres',
        // Streak messages
        startToday: '¡Empieza hoy!',
        goodStart: '¡Buen inicio!',
        onFire: '¡En llamas! 🔥',
        oneWeekStrong: '¡Una semana fuerte! 💪',
        unstoppable: '¡Imparable! 🚀',
        legend: '¡Leyenda! 👑',
        machine: '¡Máquina! 🏆',
        // Moods
        happy: 'Feliz', motivated: 'Motivado', neutral: 'Neutral',
        tired: 'Cansado', stressed: 'Estresado', sad: 'Triste',
        angry: 'Enojado', anxious: 'Ansioso',
        // Slider labels
        veryLow: 'Muy Bajo', good: 'Bien',
        fresh: 'Fresco', slight: 'Leve',
        satisfied: 'Satisfecho', hungry: 'Hambriento'
    }
};

// Translation helper
let currentLang = localStorage.getItem('fittrack_lang') || 'en';
function t(key) { return TRANSLATIONS[currentLang][key] || TRANSLATIONS['en'][key] || key; }

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

// === FULL EXERCISE DATABASE (36 exercises - 12 per rotation) ===
const ALL_EXERCISES = [
    // === SET A (Months: Jan, Apr, Jul, Oct) ===
    { id: 'pushups', name: 'Push-ups', nameEs: 'Flexiones', reps: '3 sets x 10 reps', repsEs: '3 series x 10 reps', category: 'Upper Body', categoryEs: 'Tren Superior', calPerSet: 20, emoji: '🫸', muscles: 'Chest, Triceps, Shoulders', musclesEs: 'Pecho, Tríceps, Hombros', steps: ['Place hands shoulder-width apart on the floor', 'Keep your body straight like a plank', 'Lower your chest until almost touching the floor', 'Push back up to starting position'], stepsEs: ['Coloca las manos al ancho de los hombros en el piso', 'Mantén tu cuerpo recto como una tabla', 'Baja el pecho hasta casi tocar el piso', 'Empuja hacia arriba a la posición inicial'], tip: "Don't let your hips sag or pike up!", tipEs: '¡No dejes que tus caderas se hundan o suban!' },
    { id: 'squats', name: 'Squats', nameEs: 'Sentadillas', reps: '3 sets x 15 reps', repsEs: '3 series x 15 reps', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 30, emoji: '🦵', muscles: 'Quads, Glutes, Hamstrings', musclesEs: 'Cuádriceps, Glúteos, Isquiotibiales', steps: ['Stand with feet shoulder-width apart', 'Push hips back like sitting in a chair', 'Lower until thighs are parallel to floor', 'Drive through heels to stand back up'], stepsEs: ['Párate con los pies al ancho de los hombros', 'Empuja las caderas hacia atrás como sentándote', 'Baja hasta que los muslos estén paralelos al piso', 'Empuja con los talones para levantarte'], tip: 'Keep your knees behind your toes!', tipEs: '¡Mantén las rodillas detrás de los dedos del pie!' },
    { id: 'plank', name: 'Plank', nameEs: 'Plancha', reps: '3 sets x 30 seconds', repsEs: '3 series x 30 seg', category: 'Core', categoryEs: 'Core', calPerSet: 15, emoji: '🧘', muscles: 'Core, Shoulders, Back', musclesEs: 'Core, Hombros, Espalda', steps: ['Place forearms on the floor, elbows under shoulders', 'Extend legs back, toes on the floor', 'Keep body in a straight line from head to heels', 'Hold the position, breathe steadily'], stepsEs: ['Coloca los antebrazos en el piso, codos bajo los hombros', 'Extiende las piernas, puntas en el piso', 'Mantén el cuerpo en línea recta de cabeza a talones', 'Mantén la posición, respira constantemente'], tip: 'Squeeze your glutes and abs tight!', tipEs: '¡Aprieta los glúteos y abdominales!' },
    { id: 'lunges', name: 'Lunges', nameEs: 'Zancadas', reps: '3 sets x 10 each leg', repsEs: '3 series x 10 cada pierna', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 28, emoji: '🚶', muscles: 'Quads, Glutes, Hamstrings', musclesEs: 'Cuádriceps, Glúteos, Isquiotibiales', steps: ['Stand tall with feet hip-width apart', 'Step forward with one leg', 'Lower back knee toward the floor (90° angle)', 'Push off front foot to return to start'], stepsEs: ['Párate derecho con pies al ancho de cadera', 'Da un paso adelante con una pierna', 'Baja la rodilla trasera hacia el piso (90°)', 'Empuja con el pie delantero para volver'], tip: 'Keep your torso upright throughout!', tipEs: '¡Mantén el torso erguido todo el tiempo!' },
    { id: 'burpees', name: 'Burpees', nameEs: 'Burpees', reps: '3 sets x 8 reps', repsEs: '3 series x 8 reps', category: 'Full Body', categoryEs: 'Cuerpo Completo', calPerSet: 40, emoji: '💥', muscles: 'Full Body, Cardio', musclesEs: 'Cuerpo Completo, Cardio', steps: ['Stand tall, then squat down placing hands on floor', 'Jump feet back into plank position', 'Do one push-up (optional)', 'Jump feet forward and explode up with arms overhead'], stepsEs: ['Párate, luego agáchate poniendo manos en el piso', 'Salta los pies atrás a posición de plancha', 'Haz una flexión (opcional)', 'Salta los pies adelante y explota hacia arriba'], tip: 'Land softly on your feet!', tipEs: '¡Aterriza suavemente con los pies!' },
    { id: 'mountain_climbers', name: 'Mountain Climbers', nameEs: 'Escaladores', reps: '3 sets x 20 reps', repsEs: '3 series x 20 reps', category: 'Cardio', categoryEs: 'Cardio', calPerSet: 30, emoji: '⛰️', muscles: 'Core, Shoulders, Hip Flexors', musclesEs: 'Core, Hombros, Flexores de Cadera', steps: ['Start in push-up position', 'Drive one knee toward your chest', 'Quickly switch legs in a running motion', 'Keep hips low and core tight'], stepsEs: ['Empieza en posición de flexión', 'Lleva una rodilla hacia el pecho', 'Cambia rápidamente de pierna como corriendo', 'Mantén las caderas bajas y el core apretado'], tip: 'Go fast but maintain good form!', tipEs: '¡Ve rápido pero mantén buena forma!' },
    { id: 'crunches', name: 'Crunches', nameEs: 'Abdominales', reps: '3 sets x 15 reps', repsEs: '3 series x 15 reps', category: 'Core', categoryEs: 'Core', calPerSet: 15, emoji: '🔥', muscles: 'Abs (Rectus Abdominis)', musclesEs: 'Abdominales (Recto Abdominal)', steps: ['Lie on your back, knees bent, feet flat', 'Place hands behind your head', 'Curl shoulders off the floor using your abs', 'Lower back down with control'], stepsEs: ['Acuéstate boca arriba, rodillas dobladas', 'Coloca las manos detrás de la cabeza', 'Eleva los hombros del piso usando los abdominales', 'Baja con control'], tip: 'Focus on squeezing your abs, not pulling your neck!', tipEs: '¡Enfócate en apretar los abdominales, no jalar el cuello!' },
    { id: 'jumping_jacks', name: 'Jumping Jacks', nameEs: 'Saltos de Tijera', reps: '3 sets x 20 reps', repsEs: '3 series x 20 reps', category: 'Cardio', categoryEs: 'Cardio', calPerSet: 25, emoji: '⭐', muscles: 'Full Body, Cardio', musclesEs: 'Cuerpo Completo, Cardio', steps: ['Stand with feet together, arms at sides', 'Jump feet out wide while raising arms overhead', 'Jump feet back together, arms down', 'Repeat at a steady pace'], stepsEs: ['Párate con pies juntos, brazos a los lados', 'Salta abriendo piernas y subiendo brazos', 'Salta cerrando piernas y bajando brazos', 'Repite a un ritmo constante'], tip: 'Land softly on the balls of your feet!', tipEs: '¡Aterriza suavemente en las puntas de los pies!' },
    { id: 'tricep_dips', name: 'Tricep Dips (chair)', nameEs: 'Fondos de Tríceps (silla)', reps: '3 sets x 10 reps', repsEs: '3 series x 10 reps', category: 'Upper Body', categoryEs: 'Tren Superior', calPerSet: 20, emoji: '💺', muscles: 'Triceps, Shoulders, Chest', musclesEs: 'Tríceps, Hombros, Pecho', steps: ['Sit on edge of a sturdy chair, hands gripping edge', 'Slide hips off the chair, legs extended', 'Lower body by bending elbows to 90°', 'Push back up to starting position'], stepsEs: ['Siéntate en el borde de una silla firme', 'Desliza las caderas fuera de la silla, piernas extendidas', 'Baja doblando los codos a 90°', 'Empuja hacia arriba a la posición inicial'], tip: 'Keep your back close to the chair!', tipEs: '¡Mantén la espalda cerca de la silla!' },
    { id: 'glute_bridge', name: 'Glute Bridge', nameEs: 'Puente de Glúteos', reps: '3 sets x 15 reps', repsEs: '3 series x 15 reps', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 22, emoji: '🍑', muscles: 'Glutes, Hamstrings, Core', musclesEs: 'Glúteos, Isquiotibiales, Core', steps: ['Lie on back, knees bent, feet flat on floor', 'Push through heels to lift hips toward ceiling', 'Squeeze glutes at the top', 'Lower hips back down with control'], stepsEs: ['Acuéstate boca arriba, rodillas dobladas, pies en el piso', 'Empuja con los talones para subir las caderas', 'Aprieta los glúteos arriba', 'Baja las caderas con control'], tip: "Don't arch your lower back at the top!", tipEs: '¡No arquees la espalda baja arriba!' },
    { id: 'superman', name: 'Superman Hold', nameEs: 'Superman', reps: '3 sets x 10 reps', repsEs: '3 series x 10 reps', category: 'Core', categoryEs: 'Core', calPerSet: 18, emoji: '🦸', muscles: 'Lower Back, Glutes, Shoulders', musclesEs: 'Espalda Baja, Glúteos, Hombros', steps: ['Lie face down, arms extended overhead', 'Simultaneously lift arms, chest, and legs off floor', 'Hold for 2-3 seconds at the top', 'Lower back down with control'], stepsEs: ['Acuéstate boca abajo, brazos extendidos', 'Levanta brazos, pecho y piernas del piso simultáneamente', 'Mantén 2-3 segundos arriba', 'Baja con control'], tip: 'Look at the floor to keep neck neutral!', tipEs: '¡Mira al piso para mantener el cuello neutral!' },
    { id: 'high_knees', name: 'High Knees', nameEs: 'Rodillas Altas', reps: '3 sets x 30 seconds', repsEs: '3 series x 30 seg', category: 'Cardio', categoryEs: 'Cardio', calPerSet: 35, emoji: '🏃', muscles: 'Hip Flexors, Core, Cardio', musclesEs: 'Flexores de Cadera, Core, Cardio', steps: ['Stand tall with feet hip-width apart', 'Drive one knee up to hip height', 'Quickly switch to the other knee', 'Pump arms like sprinting'], stepsEs: ['Párate derecho con pies al ancho de cadera', 'Sube una rodilla a la altura de la cadera', 'Cambia rápidamente a la otra rodilla', 'Mueve los brazos como si corrieras'], tip: 'Stay on the balls of your feet!', tipEs: '¡Mantente en las puntas de los pies!' },

    // === SET B (Months: Feb, May, Aug, Nov) ===
    { id: 'diamond_pushups', name: 'Diamond Push-ups', nameEs: 'Flexiones Diamante', reps: '3 sets x 8 reps', repsEs: '3 series x 8 reps', category: 'Upper Body', categoryEs: 'Tren Superior', calPerSet: 25, emoji: '💎', muscles: 'Triceps, Chest, Shoulders', musclesEs: 'Tríceps, Pecho, Hombros', steps: ['Place hands together forming a diamond shape', 'Keep body straight in plank position', 'Lower chest toward your hands', 'Push back up squeezing triceps'], stepsEs: ['Coloca las manos juntas formando un diamante', 'Mantén el cuerpo recto en posición de plancha', 'Baja el pecho hacia las manos', 'Empuja hacia arriba apretando tríceps'], tip: 'Keep elbows close to your body!', tipEs: '¡Mantén los codos cerca del cuerpo!' },
    { id: 'sumo_squats', name: 'Sumo Squats', nameEs: 'Sentadilla Sumo', reps: '3 sets x 15 reps', repsEs: '3 series x 15 reps', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 28, emoji: '🦍', muscles: 'Inner Thighs, Glutes, Quads', musclesEs: 'Muslos Internos, Glúteos, Cuádriceps', steps: ['Stand with feet wider than shoulder-width, toes out', 'Lower hips straight down', 'Keep chest up and knees tracking over toes', 'Push through heels to stand'], stepsEs: ['Párate con pies más anchos que los hombros, puntas afuera', 'Baja las caderas directamente', 'Mantén el pecho arriba y rodillas sobre los dedos', 'Empuja con los talones para pararte'], tip: 'Go as deep as your flexibility allows!', tipEs: '¡Baja tanto como tu flexibilidad permita!' },
    { id: 'bicycle_crunches', name: 'Bicycle Crunches', nameEs: 'Abdominales Bicicleta', reps: '3 sets x 20 reps', repsEs: '3 series x 20 reps', category: 'Core', categoryEs: 'Core', calPerSet: 20, emoji: '🚴', muscles: 'Obliques, Abs, Hip Flexors', musclesEs: 'Oblicuos, Abdominales, Flexores', steps: ['Lie on back, hands behind head, legs raised', 'Bring right elbow toward left knee', 'Extend right leg while twisting', 'Alternate sides in a pedaling motion'], stepsEs: ['Acuéstate, manos detrás de la cabeza, piernas arriba', 'Lleva el codo derecho a la rodilla izquierda', 'Extiende la pierna derecha mientras giras', 'Alterna lados en movimiento de pedaleo'], tip: 'Slow and controlled beats fast and sloppy!', tipEs: '¡Lento y controlado es mejor que rápido y desordenado!' },
    { id: 'wall_sit', name: 'Wall Sit', nameEs: 'Sentadilla en Pared', reps: '3 sets x 30 seconds', repsEs: '3 series x 30 seg', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 20, emoji: '🧱', muscles: 'Quads, Glutes, Calves', musclesEs: 'Cuádriceps, Glúteos, Pantorrillas', steps: ['Lean back against a wall', 'Slide down until thighs are parallel to floor', 'Keep knees at 90° angle', 'Hold the position, breathe steadily'], stepsEs: ['Recárgate contra una pared', 'Deslízate hasta que los muslos estén paralelos al piso', 'Mantén las rodillas a 90°', 'Mantén la posición, respira constantemente'], tip: 'Press your lower back flat against the wall!', tipEs: '¡Presiona la espalda baja contra la pared!' },
    { id: 'pike_pushups', name: 'Pike Push-ups', nameEs: 'Flexiones Pike', reps: '3 sets x 8 reps', repsEs: '3 series x 8 reps', category: 'Upper Body', categoryEs: 'Tren Superior', calPerSet: 22, emoji: '🔺', muscles: 'Shoulders, Triceps, Upper Chest', musclesEs: 'Hombros, Tríceps, Pecho Superior', steps: ['Start in downward dog position (hips high)', 'Bend elbows and lower head toward floor', 'Push back up to starting position', 'Keep legs as straight as possible'], stepsEs: ['Empieza en posición de perro boca abajo (caderas arriba)', 'Dobla los codos y baja la cabeza al piso', 'Empuja hacia arriba a la posición inicial', 'Mantén las piernas lo más rectas posible'], tip: 'The more vertical you are, the harder it gets!', tipEs: '¡Mientras más vertical estés, más difícil es!' },
    { id: 'lateral_lunges', name: 'Lateral Lunges', nameEs: 'Zancadas Laterales', reps: '3 sets x 10 each side', repsEs: '3 series x 10 cada lado', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 26, emoji: '↔️', muscles: 'Inner Thighs, Glutes, Quads', musclesEs: 'Muslos Internos, Glúteos, Cuádriceps', steps: ['Stand tall with feet together', 'Step wide to one side, bending that knee', 'Push hips back, keep other leg straight', 'Push off to return to center'], stepsEs: ['Párate derecho con pies juntos', 'Da un paso amplio a un lado, doblando esa rodilla', 'Empuja las caderas atrás, mantén la otra pierna recta', 'Empuja para volver al centro'], tip: 'Keep your chest up and core tight!', tipEs: '¡Mantén el pecho arriba y el core apretado!' },
    { id: 'flutter_kicks', name: 'Flutter Kicks', nameEs: 'Patadas de Aleteo', reps: '3 sets x 20 reps', repsEs: '3 series x 20 reps', category: 'Core', categoryEs: 'Core', calPerSet: 18, emoji: '🦶', muscles: 'Lower Abs, Hip Flexors', musclesEs: 'Abdominales Bajos, Flexores de Cadera', steps: ['Lie on back, hands under hips for support', 'Lift both legs slightly off the floor', 'Alternate kicking legs up and down', 'Keep lower back pressed to floor'], stepsEs: ['Acuéstate, manos bajo las caderas', 'Levanta ambas piernas ligeramente del piso', 'Alterna pateando piernas arriba y abajo', 'Mantén la espalda baja pegada al piso'], tip: 'Smaller kicks = more ab engagement!', tipEs: '¡Patadas más pequeñas = más trabajo abdominal!' },
    { id: 'squat_jumps', name: 'Squat Jumps', nameEs: 'Sentadillas con Salto', reps: '3 sets x 10 reps', repsEs: '3 series x 10 reps', category: 'Cardio', categoryEs: 'Cardio', calPerSet: 35, emoji: '🦘', muscles: 'Quads, Glutes, Calves, Cardio', musclesEs: 'Cuádriceps, Glúteos, Pantorrillas, Cardio', steps: ['Stand with feet shoulder-width apart', 'Lower into a squat position', 'Explode upward jumping as high as possible', 'Land softly and immediately go into next squat'], stepsEs: ['Párate con pies al ancho de los hombros', 'Baja a posición de sentadilla', 'Explota hacia arriba saltando lo más alto posible', 'Aterriza suavemente e inmediatamente haz otra sentadilla'], tip: 'Land with soft knees to protect joints!', tipEs: '¡Aterriza con rodillas suaves para proteger articulaciones!' },
    { id: 'shoulder_taps', name: 'Shoulder Taps', nameEs: 'Toques de Hombro', reps: '3 sets x 16 reps', repsEs: '3 series x 16 reps', category: 'Core', categoryEs: 'Core', calPerSet: 18, emoji: '👋', muscles: 'Core, Shoulders, Chest', musclesEs: 'Core, Hombros, Pecho', steps: ['Start in push-up position, hands under shoulders', 'Lift one hand and tap opposite shoulder', 'Return hand to floor', 'Alternate sides, keeping hips still'], stepsEs: ['Empieza en posición de flexión, manos bajo hombros', 'Levanta una mano y toca el hombro opuesto', 'Regresa la mano al piso', 'Alterna lados, manteniendo caderas quietas'], tip: 'The wider your feet, the easier the balance!', tipEs: '¡Mientras más anchos los pies, más fácil el balance!' },
    { id: 'calf_raises', name: 'Calf Raises', nameEs: 'Elevaciones de Pantorrilla', reps: '3 sets x 20 reps', repsEs: '3 series x 20 reps', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 15, emoji: '🦶', muscles: 'Calves', musclesEs: 'Pantorrillas', steps: ['Stand on edge of a step or flat floor', 'Rise up onto your toes as high as possible', 'Hold at the top for 1 second', 'Lower back down slowly'], stepsEs: ['Párate en el borde de un escalón o piso plano', 'Sube a las puntas de los pies lo más alto posible', 'Mantén arriba 1 segundo', 'Baja lentamente'], tip: 'Go slow on the way down for more burn!', tipEs: '¡Ve lento al bajar para más quemadura!' },
    { id: 'inchworms', name: 'Inchworms', nameEs: 'Gusanitos', reps: '3 sets x 8 reps', repsEs: '3 series x 8 reps', category: 'Full Body', categoryEs: 'Cuerpo Completo', calPerSet: 25, emoji: '🐛', muscles: 'Core, Shoulders, Hamstrings', musclesEs: 'Core, Hombros, Isquiotibiales', steps: ['Stand tall, bend forward touching the floor', 'Walk hands out to push-up position', 'Do one push-up (optional)', 'Walk hands back to feet and stand up'], stepsEs: ['Párate, inclínate tocando el piso', 'Camina con las manos a posición de flexión', 'Haz una flexión (opcional)', 'Camina con las manos de vuelta y párate'], tip: 'Keep legs as straight as possible!', tipEs: '¡Mantén las piernas lo más rectas posible!' },
    { id: 'skaters', name: 'Skaters', nameEs: 'Patinadores', reps: '3 sets x 20 reps', repsEs: '3 series x 20 reps', category: 'Cardio', categoryEs: 'Cardio', calPerSet: 30, emoji: '⛸️', muscles: 'Glutes, Quads, Balance, Cardio', musclesEs: 'Glúteos, Cuádriceps, Balance, Cardio', steps: ['Stand on one leg', 'Jump laterally to the other leg', 'Land softly on one foot, other leg behind', 'Immediately jump back to the other side'], stepsEs: ['Párate en una pierna', 'Salta lateralmente a la otra pierna', 'Aterriza suavemente en un pie, otra pierna atrás', 'Inmediatamente salta al otro lado'], tip: 'Swing your arms for momentum!', tipEs: '¡Mueve los brazos para impulso!' },

    // === SET C (Months: Mar, Jun, Sep, Dec) ===
    { id: 'wide_pushups', name: 'Wide Push-ups', nameEs: 'Flexiones Amplias', reps: '3 sets x 10 reps', repsEs: '3 series x 10 reps', category: 'Upper Body', categoryEs: 'Tren Superior', calPerSet: 22, emoji: '🤸', muscles: 'Chest, Shoulders, Triceps', musclesEs: 'Pecho, Hombros, Tríceps', steps: ['Place hands wider than shoulder-width', 'Keep body straight in plank position', 'Lower chest toward the floor', 'Push back up focusing on chest squeeze'], stepsEs: ['Coloca las manos más anchas que los hombros', 'Mantén el cuerpo recto en posición de plancha', 'Baja el pecho hacia el piso', 'Empuja hacia arriba enfocándote en apretar el pecho'], tip: 'The wider the hands, the more chest activation!', tipEs: '¡Mientras más anchas las manos, más activación de pecho!' },
    { id: 'bulgarian_split', name: 'Bulgarian Split Squat', nameEs: 'Sentadilla Búlgara', reps: '3 sets x 8 each leg', repsEs: '3 series x 8 cada pierna', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 32, emoji: '🇧🇬', muscles: 'Quads, Glutes, Balance', musclesEs: 'Cuádriceps, Glúteos, Balance', steps: ['Stand in front of a chair or bench', 'Place one foot behind you on the chair', 'Lower front knee to 90° angle', 'Push through front heel to stand'], stepsEs: ['Párate frente a una silla o banco', 'Coloca un pie atrás sobre la silla', 'Baja la rodilla delantera a 90°', 'Empuja con el talón delantero para pararte'], tip: 'Keep most of your weight on the front leg!', tipEs: '¡Mantén la mayoría del peso en la pierna delantera!' },
    { id: 'dead_bug', name: 'Dead Bug', nameEs: 'Bicho Muerto', reps: '3 sets x 12 reps', repsEs: '3 series x 12 reps', category: 'Core', categoryEs: 'Core', calPerSet: 16, emoji: '🪲', muscles: 'Deep Core, Hip Flexors', musclesEs: 'Core Profundo, Flexores de Cadera', steps: ['Lie on back, arms pointing to ceiling', 'Raise legs with knees at 90°', 'Extend opposite arm and leg simultaneously', 'Return to start and alternate sides'], stepsEs: ['Acuéstate, brazos apuntando al techo', 'Levanta piernas con rodillas a 90°', 'Extiende brazo y pierna opuestos simultáneamente', 'Regresa al inicio y alterna lados'], tip: 'Press lower back into the floor the entire time!', tipEs: '¡Presiona la espalda baja contra el piso todo el tiempo!' },
    { id: 'reverse_lunges', name: 'Reverse Lunges', nameEs: 'Zancadas Inversas', reps: '3 sets x 10 each leg', repsEs: '3 series x 10 cada pierna', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 28, emoji: '🔙', muscles: 'Glutes, Quads, Hamstrings', musclesEs: 'Glúteos, Cuádriceps, Isquiotibiales', steps: ['Stand tall with feet hip-width apart', 'Step one foot backward', 'Lower back knee toward the floor', 'Push off back foot to return to start'], stepsEs: ['Párate derecho con pies al ancho de cadera', 'Da un paso hacia atrás con un pie', 'Baja la rodilla trasera hacia el piso', 'Empuja con el pie trasero para volver'], tip: 'Easier on knees than forward lunges!', tipEs: '¡Más fácil para las rodillas que las zancadas hacia adelante!' },
    { id: 'commando_plank', name: 'Commando Plank', nameEs: 'Plancha Comando', reps: '3 sets x 10 reps', repsEs: '3 series x 10 reps', category: 'Core', categoryEs: 'Core', calPerSet: 22, emoji: '🎖️', muscles: 'Core, Shoulders, Triceps', musclesEs: 'Core, Hombros, Tríceps', steps: ['Start in forearm plank position', 'Push up to one hand, then the other (high plank)', 'Lower back to one forearm, then the other', 'Alternate which arm leads each rep'], stepsEs: ['Empieza en plancha de antebrazos', 'Sube a una mano, luego la otra (plancha alta)', 'Baja a un antebrazo, luego el otro', 'Alterna qué brazo lidera cada rep'], tip: 'Keep hips as still as possible!', tipEs: '¡Mantén las caderas lo más quietas posible!' },
    { id: 'donkey_kicks', name: 'Donkey Kicks', nameEs: 'Patadas de Burro', reps: '3 sets x 15 each leg', repsEs: '3 series x 15 cada pierna', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 20, emoji: '🫏', muscles: 'Glutes, Hamstrings, Core', musclesEs: 'Glúteos, Isquiotibiales, Core', steps: ['Start on all fours (hands and knees)', 'Keep knee bent at 90°', 'Lift one leg up toward the ceiling', 'Squeeze glute at the top, lower with control'], stepsEs: ['Empieza en cuatro puntos (manos y rodillas)', 'Mantén la rodilla doblada a 90°', 'Levanta una pierna hacia el techo', 'Aprieta el glúteo arriba, baja con control'], tip: "Don't arch your back - keep core tight!", tipEs: '¡No arquees la espalda - mantén el core apretado!' },
    { id: 'russian_twists', name: 'Russian Twists', nameEs: 'Giros Rusos', reps: '3 sets x 20 reps', repsEs: '3 series x 20 reps', category: 'Core', categoryEs: 'Core', calPerSet: 20, emoji: '🌀', muscles: 'Obliques, Abs, Hip Flexors', musclesEs: 'Oblicuos, Abdominales, Flexores', steps: ['Sit with knees bent, lean back slightly', 'Lift feet off floor (or keep them down)', 'Rotate torso side to side', 'Touch the floor on each side'], stepsEs: ['Siéntate con rodillas dobladas, inclínate ligeramente', 'Levanta los pies del piso (o mantenlos abajo)', 'Rota el torso de lado a lado', 'Toca el piso en cada lado'], tip: 'The more you lean back, the harder it gets!', tipEs: '¡Mientras más te inclines, más difícil es!' },
    { id: 'box_step_ups', name: 'Step-ups (chair)', nameEs: 'Subidas (silla)', reps: '3 sets x 10 each leg', repsEs: '3 series x 10 cada pierna', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 28, emoji: '📦', muscles: 'Quads, Glutes, Calves', musclesEs: 'Cuádriceps, Glúteos, Pantorrillas', steps: ['Stand in front of a sturdy chair or step', 'Step up with one foot, driving through heel', 'Stand fully on top', 'Step back down with control'], stepsEs: ['Párate frente a una silla firme o escalón', 'Sube con un pie, empujando con el talón', 'Párate completamente arriba', 'Baja con control'], tip: 'Use a lower surface if balance is difficult!', tipEs: '¡Usa una superficie más baja si el balance es difícil!' },
    { id: 'bear_crawl', name: 'Bear Crawl', nameEs: 'Gateo de Oso', reps: '3 sets x 30 seconds', repsEs: '3 series x 30 seg', category: 'Full Body', categoryEs: 'Cuerpo Completo', calPerSet: 30, emoji: '🐻', muscles: 'Core, Shoulders, Quads', musclesEs: 'Core, Hombros, Cuádriceps', steps: ['Start on all fours, lift knees 1 inch off floor', 'Move opposite hand and foot forward', 'Then move the other hand and foot', 'Keep hips low and back flat'], stepsEs: ['Empieza en cuatro puntos, levanta rodillas 2cm del piso', 'Mueve mano y pie opuestos hacia adelante', 'Luego mueve la otra mano y pie', 'Mantén las caderas bajas y espalda plana'], tip: 'Keep knees hovering just above the ground!', tipEs: '¡Mantén las rodillas flotando justo sobre el piso!' },
    { id: 'side_plank', name: 'Side Plank', nameEs: 'Plancha Lateral', reps: '3 sets x 20 sec each side', repsEs: '3 series x 20 seg cada lado', category: 'Core', categoryEs: 'Core', calPerSet: 16, emoji: '📐', muscles: 'Obliques, Core, Shoulders', musclesEs: 'Oblicuos, Core, Hombros', steps: ['Lie on your side, forearm on the floor', 'Stack feet or stagger them for balance', 'Lift hips creating a straight line', 'Hold position, breathe steadily'], stepsEs: ['Acuéstate de lado, antebrazo en el piso', 'Apila los pies o escálalos para balance', 'Levanta las caderas creando una línea recta', 'Mantén la posición, respira constantemente'], tip: "Don't let your hips drop!", tipEs: '¡No dejes que tus caderas caigan!' },
    { id: 'tuck_jumps', name: 'Tuck Jumps', nameEs: 'Saltos con Rodillas', reps: '3 sets x 8 reps', repsEs: '3 series x 8 reps', category: 'Cardio', categoryEs: 'Cardio', calPerSet: 38, emoji: '🚀', muscles: 'Quads, Core, Cardio', musclesEs: 'Cuádriceps, Core, Cardio', steps: ['Stand with feet shoulder-width apart', 'Jump up explosively', 'Tuck knees toward chest at peak', 'Land softly with bent knees'], stepsEs: ['Párate con pies al ancho de los hombros', 'Salta explosivamente', 'Lleva las rodillas al pecho en el punto más alto', 'Aterriza suavemente con rodillas dobladas'], tip: 'Start with small tucks and progress!', tipEs: '¡Empieza con tucks pequeños y progresa!' },
    { id: 'fire_hydrants', name: 'Fire Hydrants', nameEs: 'Hidrantes', reps: '3 sets x 15 each leg', repsEs: '3 series x 15 cada pierna', category: 'Lower Body', categoryEs: 'Tren Inferior', calPerSet: 18, emoji: '🚒', muscles: 'Glutes (Medius), Hip Abductors', musclesEs: 'Glúteos (Medio), Abductores de Cadera', steps: ['Start on all fours (hands and knees)', 'Keep knee bent at 90°', 'Lift one leg out to the side', 'Lower with control, repeat'], stepsEs: ['Empieza en cuatro puntos (manos y rodillas)', 'Mantén la rodilla doblada a 90°', 'Levanta una pierna hacia el lado', 'Baja con control, repite'], tip: 'Keep your core tight and hips level!', tipEs: '¡Mantén el core apretado y las caderas niveladas!' }
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
    { id: 'happy', emoji: '😊' },
    { id: 'motivated', emoji: '💪' },
    { id: 'neutral', emoji: '😐' },
    { id: 'tired', emoji: '😴' },
    { id: 'stressed', emoji: '😰' },
    { id: 'sad', emoji: '😢' },
    { id: 'angry', emoji: '😤' },
    { id: 'anxious', emoji: '😟' }
];

const PAIN_AREAS = [
    { id: 'head', en: 'Head', es: 'Cabeza' }, { id: 'neck', en: 'Neck', es: 'Cuello' },
    { id: 'shoulders', en: 'Shoulders', es: 'Hombros' }, { id: 'back_upper', en: 'Upper Back', es: 'Espalda Alta' },
    { id: 'back_lower', en: 'Lower Back', es: 'Espalda Baja' }, { id: 'chest', en: 'Chest', es: 'Pecho' },
    { id: 'arms', en: 'Arms', es: 'Brazos' }, { id: 'wrists', en: 'Wrists', es: 'Muñecas' },
    { id: 'hips', en: 'Hips', es: 'Caderas' }, { id: 'knees', en: 'Knees', es: 'Rodillas' },
    { id: 'legs', en: 'Legs', es: 'Piernas' }, { id: 'ankles', en: 'Ankles', es: 'Tobillos' },
    { id: 'feet', en: 'Feet', es: 'Pies' }, { id: 'stomach', en: 'Stomach', es: 'Estómago' }
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
    if (!email) { showAuthError(t('enterEmail')); return; }
    if (!password) { showAuthError(t('enterPassword')); return; }
    auth.signInWithEmailAndPassword(email, password).catch(function(error) { showAuthError(getAuthErrorMessage(error.code)); });
}

function registerUser() {
    let email = document.getElementById('authEmail').value.trim();
    let password = document.getElementById('authPassword').value;
    hideAuthError();
    if (!email) { showAuthError(t('enterEmail')); return; }
    if (!email.includes('@') || !email.includes('.')) { showAuthError(t('validEmail')); return; }
    if (!password || password.length < 6) { showAuthError(t('passwordMin')); return; }
    auth.createUserWithEmailAndPassword(email, password).catch(function(error) { showAuthError(getAuthErrorMessage(error.code)); });
}

function getAuthErrorMessage(code) {
    switch (code) {
        case 'auth/user-not-found': return currentLang === 'es' ? 'No se encontró cuenta. Click en "Crear Cuenta"' : 'No account found. Click "Create Account"';
        case 'auth/wrong-password': return currentLang === 'es' ? 'Contraseña incorrecta' : 'Incorrect password';
        case 'auth/email-already-in-use': return currentLang === 'es' ? 'Correo ya registrado. Intenta iniciar sesión' : 'Email already registered. Try logging in';
        case 'auth/weak-password': return t('passwordMin');
        case 'auth/invalid-email': return currentLang === 'es' ? 'Correo inválido' : 'Invalid email address';
        case 'auth/too-many-requests': return currentLang === 'es' ? 'Demasiados intentos. Intenta más tarde' : 'Too many attempts. Try again later';
        case 'auth/invalid-credential': return currentLang === 'es' ? 'Correo o contraseña inválidos' : 'Invalid email or password';
        default: return currentLang === 'es' ? 'Ocurrió un error. Intenta de nuevo' : 'An error occurred. Please try again';
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

    // Load leaderboard
    loadLeaderboard();
}

// === Leaderboard Functions ===
function loadLeaderboard() {
    db.collection('leaderboard').orderBy('streak', 'desc').limit(20).get()
        .then(function(snap) {
            leaderboardData = [];
            snap.forEach(function(doc) { leaderboardData.push(doc.data()); });
        })
        .catch(function() { leaderboardData = []; });
}

function updateLeaderboard() {
    if (!currentUser) return;
    let streak = calculateStreak();
    let displayName = currentUser.email.split('@')[0];
    let entry = {
        uid: currentUser.uid,
        displayName: displayName,
        streak: streak,
        lastUpdated: new Date().toISOString()
    };
    db.collection('leaderboard').doc(currentUser.uid).set(entry)
        .then(function() { loadLeaderboard(); })
        .catch(function(e) { console.log('Leaderboard error:', e); });
}

// === Save Functions ===
function saveWorkout() {
    if (!currentUser) return;
    let today = getTodayKey();
    let dayData = appData[today];
    if (dayData) {
        db.collection('users').doc(currentUser.uid).collection('workouts').doc(today).set(dayData)
            .then(function() { updateLeaderboard(); })
            .catch(function(e) { console.log('Save error:', e); });
    }
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
    let locale = currentLang === 'es' ? 'es-ES' : 'en-US';
    let options = { weekday: 'long', day: 'numeric', month: 'short' };
    document.getElementById('todayDate').textContent = today.toLocaleDateString(locale, options);
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
    updateNavLabels();
}

function updateNavLabels() {
    let labels = document.querySelectorAll('.nav-label');
    let views = ['today', 'calendar', 'wellness', 'stats', 'profile'];
    labels.forEach(function(label, index) {
        if (views[index]) label.textContent = t(views[index]);
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
    if (jumpStatus === 'pending') statusBadge = '<span class="jump-card-badge badge-pending">' + t('pending') + '</span>';
    else if (jumpStatus === 'active') statusBadge = '<span class="jump-card-badge badge-active">' + t('inProgress') + '</span>';
    else statusBadge = '<span class="jump-card-badge badge-complete">✓ ' + t('done') + '</span>';

    let html = '<div class="fade-in">';

    if (streak > 0) {
        html += '<div class="streak-banner"><span class="streak-banner-fire">⭐</span><span class="streak-banner-text">' + streak + ' ' + t('dayStreak') + '</span><span class="streak-banner-msg">' + getStreakMessage(streak) + '</span></div>';
    }

    // Monthly set indicator
    let monthNames = currentLang === 'es' ? ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'] : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let currentMonth = new Date().getMonth();
    let setLetter = (currentMonth === 0 || currentMonth === 3 || currentMonth === 6 || currentMonth === 9) ? 'A' : (currentMonth === 1 || currentMonth === 4 || currentMonth === 7 || currentMonth === 10) ? 'B' : 'C';
    html += '<div class="month-set-badge">📅 ' + monthNames[currentMonth] + ' • Set ' + setLetter + '</div>';

    html += '<div class="jump-card"><div class="jump-card-header"><span class="jump-card-title">🪢 ' + t('jumpRope') + '</span>' + statusBadge + '</div>';
    html += '<div class="jump-counter"><div class="jump-count-display">' + jumpCount + '</div><div class="jump-count-goal">/ ' + JUMP_GOAL + ' ' + t('jumps') + '</div>';
    html += '<div class="jump-progress-bar"><div class="jump-progress-fill" style="width: ' + jumpPercent + '%"></div></div></div>';
    html += '<div class="jump-time-info"><div class="time-block"><div class="time-label">' + t('started') + '</div><div class="time-value">' + (dayData.jumpStartTime || '--') + '</div></div>';
    html += '<div class="time-block"><div class="time-label">' + t('finished') + '</div><div class="time-value">' + (dayData.jumpEndTime || '--') + '</div></div>';
    html += '<div class="time-block"><div class="time-label">' + t('duration') + '</div><div class="time-value">' + (dayData.jumpDuration || '--') + '</div></div></div>';

    if (!dayData.jumpCompleted) {
        html += '<div class="btn-group">';
        if (!dayData.jumpStartTime) html += '<button class="btn btn-primary" id="btnStartJump">' + t('startJumping') + '</button>';
        else { html += '<button class="btn btn-secondary" id="btnAddJumps">' + t('addJumps') + '</button>'; html += '<button class="btn btn-primary" id="btnFinishJump">' + t('finish') + '</button>'; }
        html += '</div>';
    }
    html += '</div>';

    html += '<div class="exercise-section-title">' + t('todayExercises') + '</div>';
    let todayExercises = getTodayExercises();
    todayExercises.forEach(function(exercise) {
        let isCompleted = dayData.exercises && dayData.exercises[exercise.id];
        let exName = currentLang === 'es' ? exercise.nameEs : exercise.name;
        let exReps = currentLang === 'es' ? exercise.repsEs : exercise.reps;
        html += '<div class="exercise-card ' + (isCompleted ? 'completed' : '') + '" data-exercise-id="' + exercise.id + '">';
        html += '<div class="exercise-checkbox"><span class="exercise-check-icon">✓</span></div>';
        html += '<div class="exercise-info"><div class="exercise-name">' + exercise.emoji + ' ' + exName + '</div><div class="exercise-detail">' + exReps + ' • ' + exercise.calPerSet + ' ' + t('cal') + '</div></div>';
        if (isCompleted) html += '<div class="exercise-time">' + dayData.exercises[exercise.id] + '</div>';
        html += '<button class="exercise-video-btn" data-exercise-id="' + exercise.id + '">?</button>';
        html += '</div>';
    });

    let todayCal = calculateDayCalories(dayData);
    if (todayCal > 0) {
        html += '<div class="calories-card"><div class="calories-header">🔥 ' + t('caloriesBurned') + '</div><div class="calories-number">' + todayCal + ' ' + t('cal') + '</div></div>';
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

    container.querySelectorAll('.exercise-video-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            let exerciseId = btn.getAttribute('data-exercise-id');
            let exercise = ALL_EXERCISES.find(function(ex) { return ex.id === exerciseId; });
            if (exercise) openExerciseModal(exercise);
        });
    });
}

// === CALENDAR VIEW ===
function renderCalendarView(container) {
    let monthNames = currentLang === 'es' ? ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'] : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let dayNames = currentLang === 'es' ? ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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

    html += '<div class="calendar-legend"><div class="legend-item"><span class="legend-dot complete"></span> ' + t('completed') + '</div><div class="legend-item"><span class="legend-dot partial"></span> ' + t('partial') + '</div><div class="legend-item"><span class="legend-dot today-dot"></span> ' + t('today') + '</div></div>';

    let weeklyData = getWeeklyData();
    html += '<div class="reward-card"><div class="reward-header">🏆 ' + t('weeklyReward') + '</div>';
    html += '<div class="reward-progress"><div class="reward-days">' + weeklyData.completedDays + '/5 ' + t('daysCompleted') + '</div><div class="reward-progress-bar"><div class="reward-progress-fill" style="width: ' + (weeklyData.completedDays / 5 * 100) + '%"></div></div></div>';
    html += '<div class="reward-calories"><span class="reward-cal-number">' + weeklyData.totalCalories + '</span><span class="reward-cal-label"> ' + t('caloriesThisWeek') + '</span></div>';

    if (weeklyData.completedDays >= 5) {
        html += '<div class="reward-unlocked"><div class="reward-unlocked-title">🎉 ' + t('rewardUnlocked') + '</div><div class="reward-options">';
        REWARDS.forEach(function(r) {
            if (weeklyData.totalCalories >= r.calories) {
                let rName = currentLang === 'es' ? r.nameEs : r.name;
                html += '<div class="reward-option"><span class="reward-emoji">' + r.emoji + '</span><span class="reward-name">' + rName + '</span><span class="reward-desc">' + r.description + '</span></div>';
            }
        });
        html += '</div></div>';
    } else {
        html += '<div class="reward-locked"><span class="reward-locked-icon">🔒</span><span class="reward-locked-text">' + (5 - weeklyData.completedDays) + ' ' + t('moreDaysToUnlock') + '</span></div>';
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
    html += '<div class="section-title-main">🧠 ' + t('dailyWellnessCheck') + '</div>';
    html += '<p class="section-subtitle">' + t('howFeeling') + '</p>';

    html += '<div class="wellness-card"><div class="wellness-card-title">😊 ' + t('mood') + '</div><div class="mood-grid">';
    MOOD_OPTIONS.forEach(function(mood) {
        let selected = data.mood === mood.id ? ' selected' : '';
        let label = t(mood.id);
        html += '<button class="mood-btn' + selected + '" data-mood="' + mood.id + '"><span class="mood-emoji">' + mood.emoji + '</span><span class="mood-label">' + label + '</span></button>';
    });
    html += '</div></div>';

    html += '<div class="wellness-card"><div class="wellness-card-title">⚡ ' + t('energyLevel') + '</div>';
    html += '<div class="slider-container"><input type="range" class="wellness-slider" id="energySlider" min="1" max="5" value="' + (data.energy || 3) + '"><div class="slider-labels"><span>' + t('low') + '</span><span>' + t('medium') + '</span><span>' + t('high') + '</span></div></div>';
    html += '<div class="slider-value" id="energyValue">' + getSliderEmoji(data.energy || 3) + '</div></div>';

    html += '<div class="wellness-card"><div class="wellness-card-title">😴 ' + t('fatigueLevel') + '</div>';
    html += '<div class="slider-container"><input type="range" class="wellness-slider" id="fatigueSlider" min="1" max="5" value="' + (data.fatigue || 1) + '"><div class="slider-labels"><span>' + t('none') + '</span><span>' + t('moderate') + '</span><span>' + t('exhausted') + '</span></div></div>';
    html += '<div class="slider-value" id="fatigueValue">' + getFatigueEmoji(data.fatigue || 1) + '</div></div>';

    html += '<div class="wellness-card"><div class="wellness-card-title">🍽️ ' + t('hungerLevel') + '</div>';
    html += '<div class="slider-container"><input type="range" class="wellness-slider" id="hungerSlider" min="1" max="5" value="' + (data.hunger || 3) + '"><div class="slider-labels"><span>' + t('full') + '</span><span>' + t('normal') + '</span><span>' + t('starving') + '</span></div></div>';
    html += '<div class="slider-value" id="hungerValue">' + getHungerEmoji(data.hunger || 3) + '</div></div>';

    html += '<div class="wellness-card"><div class="wellness-card-title">🌙 ' + t('sleep') + '</div>';
    html += '<div class="slider-container"><input type="range" class="wellness-slider" id="sleepSlider" min="1" max="5" value="' + (data.sleepQuality || 3) + '"><div class="slider-labels"><span>' + t('terrible') + '</span><span>' + t('ok') + '</span><span>' + t('amazing') + '</span></div></div>';
    html += '<div class="sleep-hours-group"><label class="auth-label">' + t('hoursSlept') + '</label><input type="number" class="auth-input sleep-input" id="sleepHours" placeholder="8" min="0" max="24" step="0.5" value="' + (data.sleepHours || '') + '"></div></div>';

    html += '<div class="wellness-card"><div class="wellness-card-title">🤕 ' + t('painDiscomfort') + '</div><div class="pain-grid">';
    PAIN_AREAS.forEach(function(area) {
        let active = data.pain && data.pain.indexOf(area.id) > -1 ? ' active' : '';
        let label = currentLang === 'es' ? area.es : area.en;
        html += '<button class="pain-btn' + active + '" data-pain="' + area.id + '">' + label + '</button>';
    });
    html += '</div>';
    if (data.pain && data.pain.length > 0) {
        html += '<div class="pain-intensity"><label class="auth-label">' + t('painIntensity') + '</label><input type="range" class="wellness-slider" id="painIntensity" min="1" max="10" value="' + (data.painIntensity || 5) + '"><div class="slider-labels"><span>' + t('mild') + '</span><span>' + t('moderate') + '</span><span>' + t('severe') + '</span></div></div>';
    }
    html += '</div>';

    html += '<div class="wellness-card"><div class="wellness-card-title">📝 ' + t('notes') + '</div>';
    html += '<textarea class="wellness-notes" id="wellnessNotes" placeholder="' + t('notesPlaceholder') + '">' + (data.notes || '') + '</textarea></div>';

    html += '<button class="btn btn-primary wellness-save-btn" id="btnSaveWellness">' + t('saveWellness') + '</button>';
    html += '</div>';
    container.innerHTML = html;

    // Event listeners
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
        alert(t('wellnessSaved'));
    });
}

// === STATS VIEW (with Leaderboard) ===
function renderStatsView(container) {
    let days = Object.keys(appData);
    let completedDays = days.filter(function(d) { return appData[d].jumpCompleted; }).length;
    let totalJumps = days.reduce(function(sum, d) { return sum + (appData[d].jumpCount || 0); }, 0);
    let totalExercises = days.reduce(function(sum, d) { return sum + (appData[d].exercises ? Object.keys(appData[d].exercises).length : 0); }, 0);
    let totalCalories = days.reduce(function(sum, d) { return sum + calculateDayCalories(appData[d]); }, 0);
    let streak = calculateStreak();

    let html = '<div class="fade-in">';
    html += '<div class="streak-card"><div class="streak-number">' + streak + ' 🔥</div><div class="streak-label">' + t('dayStreak') + '</div><div class="streak-message">' + getStreakMessage(streak) + '</div></div>';

    html += '<div class="stats-grid">';
    html += '<div class="stats-card"><div class="stats-card-number">' + totalJumps.toLocaleString() + '</div><div class="stats-card-label">' + t('totalJumps') + '</div></div>';
    html += '<div class="stats-card"><div class="stats-card-number">' + completedDays + '</div><div class="stats-card-label">' + t('daysCompletedStat') + '</div></div>';
    html += '<div class="stats-card"><div class="stats-card-number">' + totalCalories.toLocaleString() + '</div><div class="stats-card-label">' + t('totalCalories') + '</div></div>';
    html += '<div class="stats-card"><div class="stats-card-number">' + totalExercises + '</div><div class="stats-card-label">' + t('exercisesDone') + '</div></div>';
    html += '</div>';

    // === LEADERBOARD ===
    html += '<div class="exercise-section-title">🏆 ' + t('leaderboard') + '</div>';
    if (leaderboardData.length > 0) {
        html += '<div class="leaderboard-card">';
        html += '<div class="leaderboard-header"><span class="lb-col-rank">' + t('rank') + '</span><span class="lb-col-user">' + t('user') + '</span><span class="lb-col-streak">' + t('streak') + '</span></div>';
        leaderboardData.forEach(function(entry, index) {
            let isMe = currentUser && entry.uid === currentUser.uid;
            let rankEmoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : (index + 1);
            let rowClass = isMe ? 'leaderboard-row me' : 'leaderboard-row';
            html += '<div class="' + rowClass + '">';
            html += '<span class="lb-col-rank">' + rankEmoji + '</span>';
            html += '<span class="lb-col-user">' + entry.displayName + (isMe ? ' ' + t('you') : '') + '</span>';
            html += '<span class="lb-col-streak">' + entry.streak + ' 🔥</span>';
            html += '</div>';
        });
        html += '</div>';
    } else {
        html += '<div class="empty-state"><div class="empty-state-icon">🏆</div><div class="empty-state-text">' + t('noLeaderboard') + '</div></div>';
    }

    // === WEIGHT TREND ===
    html += '<div class="exercise-section-title">⚖️ ' + t('weightTrend') + '</div>';

    if (weightHistory.length > 0) {
        let latest = weightHistory[weightHistory.length - 1];
        let first = weightHistory[0];
        let diff = (latest.weight - first.weight).toFixed(1);
        let diffColor = diff <= 0 ? 'var(--green-primary)' : 'var(--red)';
        let diffSign = diff <= 0 ? '' : '+';
        let arrow = diff <= 0 ? '↓' : '↑';

        html += '<div class="trend-summary">';
        html += '<div class="trend-current"><div class="trend-current-number">' + latest.weight + ' kg</div><div class="trend-current-label">' + t('currentWeight') + '</div></div>';
        html += '<div class="trend-change" style="color: ' + diffColor + '"><div class="trend-change-number">' + arrow + ' ' + diffSign + diff + ' kg</div><div class="trend-change-label">' + t('since') + ' ' + formatDateShort(first.date) + '</div></div>';
        html += '</div>';

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
    } else {
        html += '<div class="empty-state"><div class="empty-state-icon">⚖️</div><div class="empty-state-text">' + t('noWeightRecords') + '</div></div>';
    }

    // === WELLNESS TRENDS ===
    html += '<div class="exercise-section-title">🧠 ' + t('wellnessTrends') + '</div>';

    let wellnessDays = Object.keys(wellnessData).sort().reverse().slice(0, 7).reverse();
    if (wellnessDays.length > 0) {
        html += '<div class="trend-card"><div class="trend-card-title">' + t('moodHistory') + '</div><div class="mood-history">';
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
        html += '<div class="stats-card"><div class="stats-card-number">⚡ ' + avgEnergy + '/5</div><div class="stats-card-label">' + t('avgEnergy') + '</div></div>';
        html += '<div class="stats-card"><div class="stats-card-number">🌙 ' + avgSleep + 'h</div><div class="stats-card-label">' + t('avgSleep') + '</div></div>';
        html += '<div class="stats-card"><div class="stats-card-number">😴 ' + avgFatigue + '/5</div><div class="stats-card-label">' + t('avgFatigue') + '</div></div>';
        html += '<div class="stats-card"><div class="stats-card-number">📅 ' + wellnessDays.length + '</div><div class="stats-card-label">' + t('daysTracked') + '</div></div>';
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
            html += '<div class="trend-card"><div class="trend-card-title">🤕 ' + t('frequentPain') + '</div>';
            painKeys.slice(0, 5).forEach(function(key) {
                let area = PAIN_AREAS.find(function(a) { return a.id === key; });
                let label = area ? (currentLang === 'es' ? area.es : area.en) : key;
                html += '<div class="pain-freq-item"><span class="pain-freq-label">' + label + '</span><span class="pain-freq-count">' + painCount[key] + 'x</span></div>';
            });
            html += '</div>';
        }
    } else {
        html += '<div class="empty-state"><div class="empty-state-icon">🧠</div><div class="empty-state-text">' + t('noWellnessData') + '</div></div>';
    }

    // === REWARDS EARNED ===
    if (totalCalories > 0) {
        html += '<div class="exercise-section-title">🍔 ' + t('youveEarned') + '</div>';
        REWARDS.forEach(function(reward) {
            let times = Math.floor(totalCalories / reward.calories);
            let rName = currentLang === 'es' ? reward.nameEs : reward.name;
            if (times > 0) html += '<div class="exercise-card"><div class="exercise-info"><div class="exercise-name">' + reward.emoji + ' ' + times + 'x ' + rName + '</div><div class="exercise-detail">' + (times * reward.calories) + ' cal</div></div></div>';
        });
    }

    html += '</div>';
    container.innerHTML = html;
}

// === PROFILE VIEW ===
function renderProfileView(container) {
    let html = '<div class="fade-in">';
    html += '<div class="section-title-main">👤 ' + t('myProfile') + '</div>';

    // Language selector
    html += '<div class="profile-card"><div class="profile-card-title">🌐 ' + t('language') + '</div>';
    html += '<div class="language-selector">';
    html += '<button class="lang-btn' + (currentLang === 'en' ? ' active' : '') + '" data-lang="en">🇺🇸 English</button>';
    html += '<button class="lang-btn' + (currentLang === 'es' ? ' active' : '') + '" data-lang="es">🇪🇸 Español</button>';
    html += '</div></div>';

    // Account
    html += '<div class="profile-card"><div class="profile-card-title">📧 ' + t('account') + '</div>';
    html += '<div class="profile-field"><span class="profile-label">Email</span><span class="profile-value">' + (currentUser ? currentUser.email : '') + '</span></div>';
    html += '<div class="profile-field"><span class="profile-label">' + t('memberSince') + '</span><span class="profile-value">' + (currentUser ? new Date(currentUser.metadata.creationTime).toLocaleDateString(currentLang === 'es' ? 'es-ES' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '') + '</span></div>';
    html += '</div>';

    // Weight log
    html += '<div class="profile-card"><div class="profile-card-title">⚖️ ' + t('logWeight') + '</div>';
    html += '<div class="weight-log-form">';
    html += '<div class="profile-input-group"><label class="auth-label">' + t('weightKg') + '</label><input type="number" class="auth-input" id="weightInput" placeholder="70.5" step="0.1"></div>';
    html += '<div class="profile-input-group"><label class="auth-label">' + t('date') + '</label><input type="date" class="auth-input" id="weightDate" value="' + getTodayKey() + '"></div>';
    html += '<button class="btn btn-primary" id="btnLogWeight" style="margin-top: 12px; width: 100%;">' + t('logWeightBtn') + '</button>';
    html += '</div>';

    if (weightHistory.length > 0) {
        html += '<div class="weight-recent-title">' + t('recentEntries') + '</div>';
        html += '<div class="weight-history-list">';
        weightHistory.slice().reverse().slice(0, 5).forEach(function(entry) {
            let date = new Date(entry.date + 'T12:00:00');
            let locale = currentLang === 'es' ? 'es-ES' : 'en-US';
            let dateStr = date.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' });
            html += '<div class="weight-history-item"><span class="weight-history-date">' + dateStr + '</span><span class="weight-history-value">' + entry.weight + ' kg</span></div>';
        });
        html += '</div>';
    }
    html += '</div>';

    // Body info
    html += '<div class="profile-card"><div class="profile-card-title">📏 ' + t('bodyInfo') + '</div>';
    html += '<div class="profile-form-grid">';
    html += '<div class="profile-input-group"><label class="auth-label">' + t('heightCm') + '</label><input type="number" class="auth-input" id="profileHeight" placeholder="170" value="' + (profileData.height || '') + '"></div>';
    html += '<div class="profile-input-group"><label class="auth-label">' + t('age') + '</label><input type="number" class="auth-input" id="profileAge" placeholder="25" value="' + (profileData.age || '') + '"></div>';
    html += '<div class="profile-input-group"><label class="auth-label">' + t('gender') + '</label><select class="auth-input" id="profileGender"><option value="">' + t('select') + '</option><option value="male"' + (profileData.gender === 'male' ? ' selected' : '') + '>' + t('male') + '</option><option value="female"' + (profileData.gender === 'female' ? ' selected' : '') + '>' + t('female') + '</option><option value="other"' + (profileData.gender === 'other' ? ' selected' : '') + '>' + t('other') + '</option></select></div>';
    html += '</div></div>';

    // Fitness goal
    html += '<div class="profile-card"><div class="profile-card-title">🎯 ' + t('fitnessGoal') + '</div><div class="goal-grid">';
    let goals = [
        { id: 'lose_weight', emoji: '⬇️', key: 'loseWeight' },
        { id: 'gain_muscle', emoji: '💪', key: 'gainMuscle' },
        { id: 'stay_fit', emoji: '🏃', key: 'stayFit' },
        { id: 'flexibility', emoji: '🧘', key: 'flexibility' },
        { id: 'endurance', emoji: '🫀', key: 'endurance' },
        { id: 'stress_relief', emoji: '🧘‍♂️', key: 'stressRelief' }
    ];
    goals.forEach(function(goal) {
        let selected = profileData.goal === goal.id ? ' selected' : '';
        html += '<button class="goal-btn' + selected + '" data-goal="' + goal.id + '"><span class="goal-emoji">' + goal.emoji + '</span><span class="goal-label">' + t(goal.key) + '</span></button>';
    });
    html += '</div></div>';

    // Medical
    html += '<div class="profile-card"><div class="profile-card-title">🏥 ' + t('medicalConditions') + '</div>';
    html += '<textarea class="wellness-notes" id="profileMedical" placeholder="' + t('medicalPlaceholder') + '">' + (profileData.medical || '') + '</textarea></div>';

    // Save
    html += '<button class="btn btn-primary wellness-save-btn" id="btnSaveProfile">' + t('saveProfile') + '</button>';

    // Change password
    html += '<div class="profile-card"><div class="profile-card-title">🔒 ' + t('changePassword') + '</div>';
    html += '<div class="profile-input-group"><label class="auth-label">' + t('newPassword') + '</label><input type="password" class="auth-input" id="newPassword" placeholder="' + t('passwordPlaceholder') + '"></div>';
    html += '<button class="btn btn-secondary" id="btnChangePassword" style="margin-top: 12px;">' + t('updatePassword') + '</button></div>';

    // Logout
    html += '<button class="btn btn-danger wellness-save-btn" id="btnLogoutProfile">' + t('logout') + '</button>';
    html += '</div>';
    container.innerHTML = html;

    // Language selector listeners
    container.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            let newLang = btn.getAttribute('data-lang');
            currentLang = newLang;
            localStorage.setItem('fittrack_lang', newLang);
            // Guardar preferencia en Firebase
            if (currentUser) {
                profileData.language = newLang;
                saveProfile();
            }
            updateNavLabels();
            setTodayDate();
            renderCurrentView();
        });
    });

    // Goal buttons
    container.querySelectorAll('.goal-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            container.querySelectorAll('.goal-btn').forEach(function(b) { b.classList.remove('selected'); });
            btn.classList.add('selected');
        });
    });

    // Log weight
    document.getElementById('btnLogWeight').addEventListener('click', function() {
        let weight = parseFloat(document.getElementById('weightInput').value);
        let date = document.getElementById('weightDate').value;
        if (!weight || weight < 20 || weight > 300) { alert(t('validWeight')); return; }
        if (!date) { alert(t('selectDate')); return; }
        saveWeight(weight, date);
        alert(t('weightLogged') + ' ' + weight + ' kg ✓');
        document.getElementById('weightInput').value = '';
        setTimeout(function() { renderCurrentView(); }, 500);
    });

    // Save profile
    document.getElementById('btnSaveProfile').addEventListener('click', function() {
        profileData.height = document.getElementById('profileHeight').value ? parseFloat(document.getElementById('profileHeight').value) : null;
        profileData.age = document.getElementById('profileAge').value ? parseInt(document.getElementById('profileAge').value) : null;
        profileData.gender = document.getElementById('profileGender').value || null;
        profileData.medical = document.getElementById('profileMedical').value || null;
        let selectedGoal = container.querySelector('.goal-btn.selected');
        if (selectedGoal) profileData.goal = selectedGoal.getAttribute('data-goal');
        profileData.updatedAt = new Date().toISOString();
        saveProfile();
        alert(t('profileSaved'));
    });

    // Change password
    document.getElementById('btnChangePassword').addEventListener('click', function() {
        let newPass = document.getElementById('newPassword').value;
        if (!newPass || newPass.length < 6) { alert(t('passwordMin')); return; }
        currentUser.updatePassword(newPass).then(function() { alert(t('passwordUpdated')); document.getElementById('newPassword').value = ''; }).catch(function(err) { alert('Error: ' + err.message); });
    });

    // Logout
    document.getElementById('btnLogoutProfile').addEventListener('click', function() { auth.signOut(); });
}

// === Exercise Info Modal ===
function openExerciseModal(exercise) {
    let modal = document.createElement('div');
    modal.className = 'video-modal';

    let exName = currentLang === 'es' ? exercise.nameEs : exercise.name;
    let exCategory = currentLang === 'es' ? exercise.categoryEs : exercise.category;
    let exMuscles = currentLang === 'es' ? exercise.musclesEs : exercise.muscles;
    let exTip = currentLang === 'es' ? exercise.tipEs : exercise.tip;
    let exSteps = currentLang === 'es' ? exercise.stepsEs : exercise.steps;
    let exReps = currentLang === 'es' ? exercise.repsEs : exercise.reps;

    let stepsHtml = '';
    exSteps.forEach(function(step, index) {
        stepsHtml += '<div class="exercise-step"><span class="step-number">' + (index + 1) + '</span><span class="step-text">' + step + '</span></div>';
    });

    modal.innerHTML = '<div class="video-modal-overlay"></div>' +
        '<div class="video-modal-content exercise-modal-content">' +
        '<button class="video-modal-close">✕</button>' +
        '<div class="exercise-modal-body">' +
        '<div class="exercise-modal-emoji">' + exercise.emoji + '</div>' +
        '<div class="exercise-modal-name">' + exName + '</div>' +
        '<div class="exercise-modal-category">' + exCategory + '</div>' +
        '<div class="exercise-modal-section-title">📋 ' + t('howToDoIt') + '</div>' +
        '<div class="exercise-steps">' + stepsHtml + '</div>' +
        '<div class="exercise-modal-section-title">💪 ' + t('musclesWorked') + '</div>' +
        '<div class="exercise-modal-muscles">' + exMuscles + '</div>' +
        '<div class="exercise-modal-section-title">⚠️ ' + t('tip') + '</div>' +
        '<div class="exercise-modal-tip">' + exTip + '</div>' +
        '<div class="exercise-modal-reps">' + exReps + ' • ' + exercise.calPerSet + ' ' + t('cal') + ' ' + t('perSet') + '</div>' +
        '</div></div>';

    document.body.appendChild(modal);
    setTimeout(function() { modal.classList.add('active'); }, 10);

    modal.querySelector('.video-modal-overlay').addEventListener('click', function() { closeExerciseModal(modal); });
    modal.querySelector('.video-modal-close').addEventListener('click', function() { closeExerciseModal(modal); });
}

function closeExerciseModal(modal) {
    modal.classList.remove('active');
    setTimeout(function() { modal.remove(); }, 300);
}

// === Helper Functions ===
function getSliderEmoji(val) {
    let labels = currentLang === 'es' ? ['', '😫 Muy Bajo', '😕 Bajo', '😐 Normal', '😊 Bien', '🔥 Alto'] : ['', '😫 Very Low', '😕 Low', '😐 Normal', '😊 Good', '🔥 High'];
    return labels[val];
}
function getFatigueEmoji(val) {
    let labels = currentLang === 'es' ? ['', '😊 Fresco', '🙂 Leve', '😐 Moderada', '😩 Alta', '😵 Agotado'] : ['', '😊 Fresh', '🙂 Slight', '😐 Moderate', '😩 High', '😵 Exhausted'];
    return labels[val];
}
function getHungerEmoji(val) {
    let labels = currentLang === 'es' ? ['', '😊 Lleno', '🙂 Satisfecho', '😐 Normal', '😋 Hambriento', '🤤 Muerto de hambre'] : ['', '😊 Full', '🙂 Satisfied', '😐 Normal', '😋 Hungry', '🤤 Starving'];
    return labels[val];
}

function formatDateShort(dateStr) {
    let d = new Date(dateStr + 'T12:00:00');
    let locale = currentLang === 'es' ? 'es-ES' : 'en-US';
    return d.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
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
    let input = prompt(t('howManyJumps'), '100');
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
        let remaining = JUMP_GOAL - dayData.jumpCount;
        if (!confirm(remaining + ' ' + t('jumpsRemaining'))) return;
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
    let monthlyExercises = getMonthlyExercises();
    let today = new Date();
    let dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    let startIndex = (dayOfYear * 6) % monthlyExercises.length;
    let exercises = [];
    for (let i = 0; i < 6; i++) exercises.push(monthlyExercises[(startIndex + i) % monthlyExercises.length]);
    return exercises;
}

function calculateDayCalories(dayData) {
    let cal = 0;
    if (dayData.jumpCount) cal += Math.round(dayData.jumpCount * CALORIES_PER_JUMP);
    if (dayData.exercises) {
        Object.keys(dayData.exercises).forEach(function(exId) {
            let ex = ALL_EXERCISES.find(function(e) { return e.id === exId; });
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
    if (s === 0) return t('startToday');
    if (s < 3) return t('goodStart');
    if (s < 7) return t('onFire');
    if (s < 14) return t('oneWeekStrong');
    if (s < 30) return t('unstoppable');
    if (s < 60) return t('legend');
    return t('machine');
}

function getTodayKey() { return new Date().toISOString().split('T')[0]; }
function getDayData(key) { return appData[key] || {}; }
function getCurrentTime() { let n = new Date(); return String(n.getHours()).padStart(2, '0') + ':' + String(n.getMinutes()).padStart(2, '0'); }
function calculateDuration(s, e) {
    let start = s.split(':'), end = e.split(':');
    let diff = (parseInt(end[0]) * 60 + parseInt(end[1])) - (parseInt(start[0]) * 60 + parseInt(start[1]));
    if (diff < 0) diff += 1440;
    let h = Math.floor(diff / 60), m = diff % 60;
    if (currentLang === 'es') return h > 0 ? h + 'h ' + m + 'min' : m + ' min';
    return h > 0 ? h + 'h ' + m + 'min' : m + ' min';
}


