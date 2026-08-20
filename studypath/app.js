
// ============================================
// STUDYPATH PWA - LEARNING PLAN
// Main Application Logic
// ============================================

// Registrar Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

// === Constants ===
const STORAGE_KEY = 'studypath_progress';
const STREAK_KEY = 'studypath_streak';
const LAST_ACTIVITY_KEY = 'studypath_last_activity';

// === Study Plan Data ===
const STUDY_PLAN = [
    {
        id: 0,
        name: 'Setup & Preparation',
        icon: '⚙️',
        week: 'Week 1',
        tasks: [
            {
                id: 't0-1',
                title: 'Install Node.js (v20+)',
                description: 'JavaScript runtime for React/Next.js',
                resource: { name: 'nodejs.org', url: 'https://nodejs.org' }
            },
            {
                id: 't0-2',
                title: 'Install VS Code + Extensions',
                description: 'ES7 React Snippets, Tailwind IntelliSense, Prettier',
                resource: { name: 'code.visualstudio.com', url: 'https://code.visualstudio.com' }
            },
            {
                id: 't0-3',
                title: 'Create GitHub Account',
                description: 'Version control for your projects',
                resource: { name: 'github.com', url: 'https://github.com' }
            },
            {
                id: 't0-4',
                title: 'Create Vercel Account',
                description: 'Free deployment platform',
                resource: { name: 'vercel.com', url: 'https://vercel.com' }
            },
            {
                id: 't0-5',
                title: 'Create OpenAI Account',
                description: 'Get your API key for GPT-4',
                resource: { name: 'platform.openai.com', url: 'https://platform.openai.com' }
            },
            {
                id: 't0-6',
                title: 'Learn Git Basics',
                description: 'init, add, commit, push, pull',
                resource: { name: 'Git en 30 min (YouTube)', url: 'https://www.youtube.com/results?search_query=git+github+en+30+minutos+espa%C3%B1ol' }
            }
        ]
    },
    {
        id: 1,
        name: 'React Fundamentals',
        icon: '⚛️',
        week: 'Weeks 2-4',
        tasks: [
            {
                id: 't1-1',
                title: 'JSX Syntax',
                description: 'HTML inside JavaScript, expressions, fragments',
                resource: { name: 'react.dev/learn', url: 'https://react.dev/learn' }
            },
            {
                id: 't1-2',
                title: 'Functional Components',
                description: 'Create and compose components',
                resource: { name: 'react.dev', url: 'https://react.dev/learn/your-first-component' }
            },
            {
                id: 't1-3',
                title: 'Props & Data Flow',
                description: 'Pass data between components',
                resource: { name: 'react.dev', url: 'https://react.dev/learn/passing-props-to-a-component' }
            },
            {
                id: 't1-4',
                title: 'Conditional Rendering & Lists',
                description: 'if/ternary, .map() for lists, keys',
                resource: { name: 'react.dev', url: 'https://react.dev/learn/conditional-rendering' }
            },
            {
                id: 't1-5',
                title: 'useState Hook',
                description: 'Manage state that changes over time',
                resource: { name: 'react.dev', url: 'https://react.dev/learn/state-a-components-memory' }
            },
            {
                id: 't1-6',
                title: 'useEffect Hook',
                description: 'Side effects, API calls, timers',
                resource: { name: 'react.dev', url: 'https://react.dev/learn/synchronizing-with-effects' }
            },
            {
                id: 't1-7',
                title: 'Events & Forms',
                description: 'onClick, onChange, onSubmit, controlled inputs',
                resource: { name: 'react.dev', url: 'https://react.dev/learn/responding-to-events' }
            },
            {
                id: 't1-8',
                title: 'Midudev React Course',
                description: 'Complete course in Spanish (YouTube)',
                resource: { name: 'Midudev React (YouTube)', url: 'https://www.youtube.com/watch?v=7iobxzd_2wY&list=PLUofhDIg_38q4D0xNWp7FEHOTcZRWJuk-' }
            },
            {
                id: 't1-9',
                title: 'Practice Project: Card Generator',
                description: 'Input text generates a visual card in real time',
                resource: null
            }
        ]
    },
    {
        id: 2,
        name: 'Tailwind CSS',
        icon: '🎨',
        week: 'Week 5',
        tasks: [
            {
                id: 't2-1',
                title: 'Utility Classes Basics',
                description: 'flex, grid, padding, margin, colors, sizing',
                resource: { name: 'tailwindcss.com/docs', url: 'https://tailwindcss.com/docs/utility-first' }
            },
            {
                id: 't2-2',
                title: 'Responsive Design',
                description: 'sm:, md:, lg: breakpoints',
                resource: { name: 'Responsive Design', url: 'https://tailwindcss.com/docs/responsive-design' }
            },
            {
                id: 't2-3',
                title: 'Flexbox & Grid with Tailwind',
                description: 'Layout systems using utility classes',
                resource: { name: 'Flexbox & Grid', url: 'https://tailwindcss.com/docs/flex' }
            },
            {
                id: 't2-4',
                title: 'Dark Mode & Theming',
                description: 'dark: variant, custom colors',
                resource: { name: 'Dark Mode', url: 'https://tailwindcss.com/docs/dark-mode' }
            },
            {
                id: 't2-5',
                title: 'Animations & Transitions',
                description: 'animate-, transition-, duration-',
                resource: { name: 'Animation', url: 'https://tailwindcss.com/docs/animation' }
            },
            {
                id: 't2-6',
                title: 'Midudev Tailwind Course',
                description: 'Tailwind CSS in 1 hour (YouTube, Spanish)',
                resource: { name: 'Midudev Tailwind', url: 'https://www.youtube.com/results?search_query=midudev+tailwind+css' }
            },
            {
                id: 't2-7',
                title: 'Practice: Recreate a Dashboard',
                description: 'Rebuild a dashboard project in React + Tailwind',
                resource: null
            }
        ]
    },
    {
        id: 3,
        name: 'Next.js',
        icon: '▲',
        week: 'Weeks 6-7',
        tasks: [
            {
                id: 't3-1',
                title: 'Project Structure (App Router)',
                description: 'app/ directory, layouts, pages, loading states',
                resource: { name: 'Next.js Learn', url: 'https://nextjs.org/learn' }
            },
            {
                id: 't3-2',
                title: 'File-based Routing',
                description: 'Dynamic routes, route groups, nested layouts',
                resource: { name: 'Routing Docs', url: 'https://nextjs.org/docs/app/building-your-application/routing' }
            },
            {
                id: 't3-3',
                title: 'Server vs Client Components',
                description: '"use client" directive, when to use each',
                resource: { name: 'Server Components', url: 'https://nextjs.org/docs/app/building-your-application/rendering/server-components' }
            },
            {
                id: 't3-4',
                title: 'API Routes',
                description: 'Create backend endpoints in app/api/',
                resource: { name: 'Route Handlers', url: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers' }
            },
            {
                id: 't3-5',
                title: 'Data Fetching',
                description: 'Server-side fetch, client-side SWR, caching',
                resource: { name: 'Data Fetching', url: 'https://nextjs.org/docs/app/building-your-application/data-fetching' }
            },
            {
                id: 't3-6',
                title: 'Environment Variables',
                description: '.env.local, NEXT_PUBLIC_ prefix, secrets',
                resource: { name: 'Env Variables', url: 'https://nextjs.org/docs/app/building-your-application/configuring/environment-variables' }
            },
            {
                id: 't3-7',
                title: 'Next.js Official Course',
                description: 'Interactive tutorial from Vercel',
                resource: { name: 'nextjs.org/learn', url: 'https://nextjs.org/learn' }
            },
            {
                id: 't3-8',
                title: 'Practice: AI Notes App',
                description: 'Write a note, AI improves/summarizes it',
                resource: null
            }
        ]
    },
    {
        id: 4,
        name: 'AI Integration',
        icon: '🤖',
        week: 'Weeks 8-9',
        tasks: [
            {
                id: 't4-1',
                title: 'OpenAI API Basics',
                description: 'Chat completions, models, tokens, pricing',
                resource: { name: 'OpenAI Docs', url: 'https://platform.openai.com/docs/guides/text-generation' }
            },
            {
                id: 't4-2',
                title: 'Prompt Engineering',
                description: 'System prompts, few-shot examples, structured output',
                resource: { name: 'Prompt Engineering Guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering' }
            },
            {
                id: 't4-3',
                title: 'Streaming Responses',
                description: 'Real-time text generation with SSE',
                resource: { name: 'Streaming', url: 'https://platform.openai.com/docs/guides/text-generation' }
            },
            {
                id: 't4-4',
                title: 'Anthropic Claude API',
                description: 'Alternative AI provider, Messages API',
                resource: { name: 'Anthropic Docs', url: 'https://docs.anthropic.com/en/docs/initial-setup' }
            },
            {
                id: 't4-5',
                title: 'AI SDK by Vercel',
                description: 'Unified SDK for multiple AI providers in Next.js',
                resource: { name: 'AI SDK', url: 'https://sdk.vercel.ai/docs/introduction' }
            },
            {
                id: 't4-6',
                title: 'Code Generation with AI',
                description: 'System prompts for HTML/CSS/JS generation',
                resource: null
            },
            {
                id: 't4-7',
                title: 'Sandbox Rendering (iframe)',
                description: 'Safely render AI-generated code in preview',
                resource: null
            },
            {
                id: 't4-8',
                title: 'Build AI Apps with Next.js',
                description: 'Vercel YouTube tutorial series',
                resource: { name: 'Vercel YouTube', url: 'https://www.youtube.com/results?search_query=vercel+build+ai+apps+next.js' }
            },
            {
                id: 't4-9',
                title: 'Prototype: App Generator v0.1',
                description: 'Text input, AI generates page, live preview',
                resource: null
            }
        ]
    },
    {
        id: 5,
        name: 'Database & Auth',
        icon: '🔐',
        week: 'Weeks 10-11',
        tasks: [
            {
                id: 't5-1',
                title: 'Supabase Setup',
                description: 'Create project, understand dashboard',
                resource: { name: 'supabase.com', url: 'https://supabase.com/docs/guides/getting-started' }
            },
            {
                id: 't5-2',
                title: 'Create Tables',
                description: 'Users, projects, generated apps schema',
                resource: { name: 'Database Guide', url: 'https://supabase.com/docs/guides/database/overview' }
            },
            {
                id: 't5-3',
                title: 'CRUD Operations',
                description: 'Insert, select, update, delete from Next.js',
                resource: { name: 'CRUD Docs', url: 'https://supabase.com/docs/reference/javascript/select' }
            },
            {
                id: 't5-4',
                title: 'File Storage',
                description: 'Upload images, generated code files',
                resource: { name: 'Storage', url: 'https://supabase.com/docs/guides/storage' }
            },
            {
                id: 't5-5',
                title: 'Authentication Setup',
                description: 'Login with Google/GitHub using Supabase Auth',
                resource: { name: 'Auth Guide', url: 'https://supabase.com/docs/guides/auth' }
            },
            {
                id: 't5-6',
                title: 'Protected Routes',
                description: 'Middleware, session management, redirects',
                resource: { name: 'Auth with Next.js', url: 'https://supabase.com/docs/guides/auth/server-side/nextjs' }
            },
            {
                id: 't5-7',
                title: 'Row Level Security (RLS)',
                description: 'Users can only access their own data',
                resource: { name: 'RLS Guide', url: 'https://supabase.com/docs/guides/database/postgres/row-level-security' }
            },
            {
                id: 't5-8',
                title: 'Practice: Save User Projects',
                description: 'Users register, create projects, data persists',
                resource: null
            }
        ]
    },
    {
        id: 6,
        name: 'Deploy MVP',
        icon: '🚀',
        week: 'Week 12',
        tasks: [
            {
                id: 't6-1',
                title: 'Deploy to Vercel',
                description: 'Connect GitHub repo, auto-deploy on push',
                resource: { name: 'Vercel Deploy', url: 'https://vercel.com/docs/deployments/overview' }
            },
            {
                id: 't6-2',
                title: 'Configure Environment Variables',
                description: 'API keys, Supabase URL in Vercel dashboard',
                resource: { name: 'Env Vars in Vercel', url: 'https://vercel.com/docs/projects/environment-variables' }
            },
            {
                id: 't6-3',
                title: 'Custom Domain (Optional)',
                description: 'Connect your own domain (~$10/year)',
                resource: { name: 'Custom Domains', url: 'https://vercel.com/docs/projects/domains' }
            },
            {
                id: 't6-4',
                title: 'Create Product Landing Page',
                description: 'Marketing page for your app',
                resource: null
            },
            {
                id: 't6-5',
                title: 'Basic Testing',
                description: 'Test all flows: register, create, publish, share',
                resource: null
            },
            {
                id: 't6-6',
                title: 'Performance Optimization',
                description: 'Lighthouse audit, image optimization, lazy loading',
                resource: { name: 'Next.js Optimization', url: 'https://nextjs.org/docs/app/building-your-application/optimizing' }
            },
            {
                id: 't6-7',
                title: 'MVP Launch! 🎉',
                description: 'Share with friends, get feedback, iterate',
                resource: null
            }
        ]
    }
];

// === State ===
let completedTasks = {};
let currentView = 'plan';
let currentPhase = 'all';
let expandedPhases = {};

// === Initialize App ===
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();
    initSplashScreen();
    initNavigation();
    initPhaseNav();
    renderCurrentView();
    updateProgress();
    updateStreak();
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

// === Phase Navigation ===
function initPhaseNav() {
    const phaseTabs = document.querySelectorAll('.phase-tab');
    phaseTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            phaseTabs.forEach(function(t) { t.classList.remove('active'); });
            tab.classList.add('active');
            currentPhase = tab.getAttribute('data-phase');
            renderCurrentView();
        });
    });
}

// === Render Views ===
function renderCurrentView() {
    const content = document.getElementById('content');
    const phaseNav = document.querySelector('.phase-nav');

    switch (currentView) {
        case 'plan':
            phaseNav.style.display = 'block';
            renderPlanView(content);
            break;
        case 'resources':
            phaseNav.style.display = 'none';
            renderResourcesView(content);
            break;
        case 'stats':
            phaseNav.style.display = 'none';
            renderStatsView(content);
            break;
    }
}

// === Plan View ===
function renderPlanView(container) {
    let phases = STUDY_PLAN;
    if (currentPhase !== 'all') {
        phases = STUDY_PLAN.filter(function(p) { return p.id === parseInt(currentPhase); });
    }

    let html = '';
    phases.forEach(function(phase) {
        const phaseCompleted = getPhaseCompletedCount(phase);
        const phaseTotal = phase.tasks.length;
        const isExpanded = expandedPhases[phase.id] || false;
        const isComplete = phaseCompleted === phaseTotal;

        html += '<div class="phase-card ' + (isExpanded ? 'expanded' : '') + ' fade-in" data-phase-id="' + phase.id + '">';
        html += '  <div class="phase-header">';
        html += '    <div class="phase-header-left">';
        html += '      <div class="phase-icon">' + phase.icon + '</div>';
        html += '      <div class="phase-info">';
        html += '        <span class="phase-name">' + phase.name + '</span>';
        html += '        <span class="phase-week">' + phase.week + '</span>';
        html += '      </div>';
        html += '    </div>';
        html += '    <span class="phase-progress-badge ' + (isComplete ? 'complete' : '') + '">' + phaseCompleted + '/' + phaseTotal + '</span>';
        html += '    <span class="phase-chevron">▼</span>';
        html += '  </div>';
        html += '  <div class="phase-tasks">';

        phase.tasks.forEach(function(task) {
            const isCompleted = completedTasks[task.id] || false;
            html += '    <div class="task-item ' + (isCompleted ? 'completed' : '') + '" data-task-id="' + task.id + '">';
            html += '      <div class="task-checkbox">';
            html += '        <span class="task-checkbox-icon">✓</span>';
            html += '      </div>';
            html += '      <div class="task-content">';
            html += '        <div class="task-title">' + task.title + '</div>';
            html += '        <div class="task-description">' + task.description + '</div>';
            if (task.resource) {
                html += '        <a href="' + task.resource.url + '" target="_blank" rel="noopener" class="task-resource">🔗 ' + task.resource.name + '</a>';
            }
            html += '      </div>';
            html += '    </div>';
        });

        html += '  </div>';
        html += '</div>';
    });

    container.innerHTML = html;

    // Event listeners para expandir fases
    const phaseHeaders = container.querySelectorAll('.phase-header');
    phaseHeaders.forEach(function(header) {
        header.addEventListener('click', function() {
            const card = header.closest('.phase-card');
            const phaseId = card.getAttribute('data-phase-id');
            expandedPhases[phaseId] = !expandedPhases[phaseId];
            card.classList.toggle('expanded');
        });
    });

    // Event listeners para checkboxes
    const checkboxes = container.querySelectorAll('.task-checkbox');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('click', function(e) {
            e.stopPropagation();
            const taskItem = checkbox.closest('.task-item');
            const taskId = taskItem.getAttribute('data-task-id');
            toggleTask(taskId);
            taskItem.classList.toggle('completed');
            updateProgress();
            updateStreak();
            // Actualizar badge de la fase
            const card = taskItem.closest('.phase-card');
            const phaseId = parseInt(card.getAttribute('data-phase-id'));
            const phase = STUDY_PLAN.find(function(p) { return p.id === phaseId; });
            const completed = getPhaseCompletedCount(phase);
            const total = phase.tasks.length;
            const badge = card.querySelector('.phase-progress-badge');
            badge.textContent = completed + '/' + total;
            if (completed === total) {
                badge.classList.add('complete');
            } else {
                badge.classList.remove('complete');
            }
        });
    });
}

// === Resources View ===
function renderResourcesView(container) {
    const categories = [
        {
            name: '📺 Video Courses (Spanish)',
            items: [
                { icon: '⚛️', name: 'Midudev - React Course', type: 'YouTube (Free)', url: 'https://www.youtube.com/watch?v=7iobxzd_2wY&list=PLUofhDIg_38q4D0xNWp7FEHOTcZRWJuk-' },
                { icon: '🎨', name: 'Midudev - Tailwind CSS', type: 'YouTube (Free)', url: 'https://www.youtube.com/results?search_query=midudev+tailwind+css' },
                { icon: '▲', name: 'Midudev - Next.js Course', type: 'YouTube (Free)', url: 'https://www.youtube.com/results?search_query=midudev+nextjs+14+curso' },
                { icon: '🎓', name: 'Fernando Herrera - React', type: 'Udemy (Paid)', url: 'https://www.udemy.com/course/react-cero-experto/' }
            ]
        },
        {
            name: '📖 Official Documentation',
            items: [
                { icon: '⚛️', name: 'React Official Docs', type: 'Interactive Tutorial', url: 'https://react.dev/learn' },
                { icon: '🎨', name: 'Tailwind CSS Docs', type: 'Reference', url: 'https://tailwindcss.com/docs' },
                { icon: '▲', name: 'Next.js Learn', type: 'Interactive Course', url: 'https://nextjs.org/learn' },
                { icon: '🤖', name: 'OpenAI API Docs', type: 'API Reference', url: 'https://platform.openai.com/docs' },
                { icon: '🔐', name: 'Supabase Docs', type: 'Guides & Reference', url: 'https://supabase.com/docs' }
            ]
        },
        {
            name: '🛠️ Tools & Platforms',
            items: [
                { icon: '💻', name: 'VS Code', type: 'Code Editor', url: 'https://code.visualstudio.com' },
                { icon: '🐙', name: 'GitHub', type: 'Version Control', url: 'https://github.com' },
                { icon: '🚀', name: 'Vercel', type: 'Deployment', url: 'https://vercel.com' },
                { icon: '🗄️', name: 'Supabase', type: 'Database & Auth', url: 'https://supabase.com' },
                { icon: '🤖', name: 'OpenAI Platform', type: 'AI API', url: 'https://platform.openai.com' }
            ]
        },
        {
            name: '🎯 Inspiration & Reference',
            items: [
                { icon: '⚡', name: 'Bolt.new', type: 'AI App Generator', url: 'https://bolt.new' },
                { icon: '🎨', name: 'v0.dev', type: 'AI UI Generator', url: 'https://v0.dev' },
                { icon: '💡', name: 'Cursor', type: 'AI Code Editor', url: 'https://cursor.sh' },
                { icon: '❤️', name: 'Lovable.dev', type: 'AI App Builder', url: 'https://lovable.dev' }
            ]
        }
    ];

    let html = '<div class="resources-view fade-in">';

    categories.forEach(function(category) {
        html += '<div class="resource-category">';
        html += '  <h3 class="resource-category-title">' + category.name + '</h3>';

        category.items.forEach(function(item) {
            html += '  <a href="' + item.url + '" target="_blank" rel="noopener" class="resource-item">';
            html += '    <div class="resource-icon">' + item.icon + '</div>';
            html += '    <div class="resource-info">';
            html += '      <div class="resource-name">' + item.name + '</div>';
            html += '      <div class="resource-type">' + item.type + '</div>';
            html += '    </div>';
            html += '    <span class="resource-arrow">→</span>';
            html += '  </a>';
        });

        html += '</div>';
    });

    html += '</div>';
    container.innerHTML = html;
}

// === Stats View ===
function renderStatsView(container) {
    const totalTasks = getTotalTasks();
    const completedCount = getCompletedCount();
    const percent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
    const streak = getStreak();

    let html = '<div class="stats-view fade-in">';

    // Stats Grid
    html += '<div class="stats-grid">';
    html += '  <div class="stats-card">';
    html += '    <div class="stats-card-number">' + percent + '%</div>';
    html += '    <div class="stats-card-label">Complete</div>';
    html += '  </div>';
    html += '  <div class="stats-card">';
    html += '    <div class="stats-card-number">' + completedCount + '/' + totalTasks + '</div>';
    html += '    <div class="stats-card-label">Tasks Done</div>';
    html += '  </div>';
    html += '  <div class="stats-card">';
    html += '    <div class="stats-card-number">' + streak + ' 🔥</div>';
    html += '    <div class="stats-card-label">Day Streak</div>';
    html += '  </div>';
    html += '  <div class="stats-card">';
    html += '    <div class="stats-card-number">' + getCompletedPhases() + '/7</div>';
    html += '    <div class="stats-card-label">Phases Done</div>';
    html += '  </div>';
    html += '</div>';

    // Phase Progress
    html += '<h3 class="stats-phases-title">Phase Progress</h3>';

    STUDY_PLAN.forEach(function(phase) {
        const phaseCompleted = getPhaseCompletedCount(phase);
        const phaseTotal = phase.tasks.length;
        const phasePercent = Math.round((phaseCompleted / phaseTotal) * 100);

        html += '<div class="stats-phase-item">';
        html += '  <span>' + phase.icon + '</span>';
        html += '  <span class="stats-phase-name">' + phase.name + '</span>';
        html += '  <div class="stats-phase-bar-container">';
        html += '    <div class="stats-phase-bar" style="width: ' + phasePercent + '%"></div>';
        html += '  </div>';
        html += '  <span class="stats-phase-percent">' + phasePercent + '%</span>';
        html += '</div>';
    });

    html += '</div>';
    container.innerHTML = html;
}

// === Task Management ===
function toggleTask(taskId) {
    if (completedTasks[taskId]) {
        delete completedTasks[taskId];
    } else {
        completedTasks[taskId] = true;
    }
    saveProgress();
}

// === Progress Calculations ===
function getTotalTasks() {
    let total = 0;
    STUDY_PLAN.forEach(function(phase) {
        total += phase.tasks.length;
    });
    return total;
}

function getCompletedCount() {
    return Object.keys(completedTasks).length;
}

function getPhaseCompletedCount(phase) {
    let count = 0;
    phase.tasks.forEach(function(task) {
        if (completedTasks[task.id]) {
            count++;
        }
    });
    return count;
}

function getCompletedPhases() {
    let count = 0;
    STUDY_PLAN.forEach(function(phase) {
        if (getPhaseCompletedCount(phase) === phase.tasks.length) {
            count++;
        }
    });
    return count;
}

function updateProgress() {
    const total = getTotalTasks();
    const completed = getCompletedCount();
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    document.getElementById('progressPercent').textContent = percent + '%';
    document.getElementById('progressBar').style.width = percent + '%';
    document.getElementById('completedCount').textContent = completed;
    document.getElementById('totalCount').textContent = total;
}

// === Streak Management ===
function updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
    let streak = parseInt(localStorage.getItem(STREAK_KEY)) || 0;

    if (getCompletedCount() > 0) {
        if (lastActivity !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (lastActivity === yesterdayStr || !lastActivity) {
                streak++;
            } else if (lastActivity !== today) {
                streak = 1;
            }

            localStorage.setItem(LAST_ACTIVITY_KEY, today);
            localStorage.setItem(STREAK_KEY, streak.toString());
        }
    }

    document.getElementById('currentStreak').textContent = streak;
}

function getStreak() {
    return parseInt(localStorage.getItem(STREAK_KEY)) || 0;
}

// === Storage ===
function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedTasks));
}

function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        completedTasks = JSON.parse(saved);
    }
}

