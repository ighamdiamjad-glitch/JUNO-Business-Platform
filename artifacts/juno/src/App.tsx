import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Activity, ArrowRight, BriefcaseBusiness, Check, ChevronDown,
  CircleHelp, ClipboardList, Compass, FileBarChart, FolderKanban, Globe2,
  LayoutDashboard, Lightbulb, Menu, Megaphone, Moon, PenLine,
  Plus, Settings2, ShieldCheck, Sparkles, Sun, Target,
  Trash2, TrendingUp, Wallet, X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Link, useLocation, useRoute, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
type Locale = 'en' | 'ar';
type Theme = 'dark' | 'light';
type Project = { id: string; name: string; description: string; createdAt: string };
type Copy = Record<string, string>;

const copy: Record<Locale, Copy> = {
  en: {
    dashboard: 'Dashboard', projects: 'Projects', assistant: 'Assistant', business: 'Business plan',
    market: 'Market', finance: 'Finance', marketing: 'Marketing', content: 'Content', campaigns: 'Campaigns',
    trends: 'Trends', tasks: 'Tasks', reports: 'Reports', approvals: 'Approvals', settings: 'Settings',
    overview: 'OVERVIEW', planning: 'BUSINESS PLANNING', growth: 'MARKETING WORKSPACE', manage: 'WORKSPACE',
    slogan: 'From Imagination to Business.', localOnly: 'Your workspace stays on this device.',
    localStorage: 'Local workspace', local: 'Stored locally', theme: 'Appearance', language: 'Language',
    darkMode: 'Dark mode', darkModeDetail: 'Use JUNO’s deep navy workspace theme.',
    languageDetail: 'Choose your interface language.', english: 'English', arabic: 'العربية',
    settingsTitle: 'Workspace preferences', settingsDesc: 'A few choices that shape how JUNO feels on this device.',
    preferencesSaved: 'Preferences are saved in this browser only.',
    welcomeEyebrow: 'YOUR BUSINESS WORKSPACE', welcomeTitle: 'A clear place to move your business forward.',
    welcomeDesc: 'Plan deliberately, keep your work in view, and build from one considered next step.',
    getStarted: 'Create a project', viewAssistant: 'Open assistant', yourProjects: 'Your projects',
    nextSteps: 'A considered next step', noProjects: 'Your workspace is ready for its first project.',
    noProjectsDesc: 'Start with the idea you want to turn into a business. Your project list is stored only on this device.',
    createProject: 'Create your first project', noProjectYet: 'No projects yet', projectsEmptyHint: 'Projects you create will appear here.',
    nextStepTitle: 'Begin with a project', nextStepText: 'Give your idea a name. You can add context as your plan takes shape.',
    workspaceBasis: 'A steady foundation', workspaceBasisText: 'JUNO is being built as a considered space for business planning and marketing work.',
    projectCount: 'projects in this workspace', projectCountOne: 'project in this workspace',
    projectTitle: 'Your projects', projectDesc: 'Keep your business ideas organized in a private workspace on this device.',
    projectName: 'Project name', projectPlaceholder: 'e.g. Northline Studio', projectContext: 'A short description (optional)',
    contextPlaceholder: 'What are you building?', addProject: 'Add project', saveChanges: 'Save changes', cancel: 'Cancel',
    edit: 'Edit', delete: 'Delete', created: 'Created', projectSaved: 'Project saved in this browser.',
    projectNameRequired: 'Add a project name to continue.', deleteConfirm: 'Delete this project from this device?',
    openProject: 'Open project workspace', projectWorkspaceDesc: 'A dedicated workspace for this project. Business tools will be added in later phases.',
    projectWorkspaceEmpty: 'Add a short description from the projects page to keep this idea in context.',
    projectNotFound: 'This project is not saved in this browser.', backToProjects: 'Back to projects',
    assistantTitle: 'JUNO Assistant', assistantDesc: 'A conversation workspace for thinking through your business.',
    assistantNotConnected: 'Not connected in Phase 1', assistantNotConnectedBody: 'The assistant is a layout preview only. Your message will not be sent or saved, and no AI responses are available yet.',
    assistantPlaceholder: 'Messaging is unavailable in this phase', send: 'Send', assistantSideTitle: 'A workspace in progress',
    assistantSideBody: 'The conversation experience will be connected in a later phase. Prompts cannot be entered or sent in Phase 1.',
    phaseOne: 'Phase 1 foundation', stepOne: 'Explore the business and marketing sections.', stepTwo: 'Add projects to your local workspace.', stepThree: 'Your preferences are saved on this device.',
    pageUnavailable: 'Not implemented yet', statusExplain: 'This area is part of JUNO’s planned workspace, but it is not implemented in Phase 1.',
    noConnections: 'No external connections', noData: 'No business data is being collected or displayed here.',
    currentPhase: 'CURRENT PHASE', next: 'What is available now', honestNow: 'This page is an honest starting point, not a connected tool.',
    sectionProjectHint: 'Projects are the only business records available in this phase.',
    marketingPrinciple: 'A workspace for deliberate growth', marketingBody: 'The marketing area is being shaped to sit alongside your business plan. No channels are connected.',
    footerPhase: 'Phase 1 · Foundation', footerLocal: 'Local by design', notFound: 'We couldn’t find that page.',
    goHome: 'Return to dashboard', menu: 'Open navigation', closeMenu: 'Close navigation',
    noProjectCount: 'No projects yet', projectListLabel: 'Saved projects', statusSaved: 'Saved on this device',
    businessTitle: 'Business plan', businessDesc: 'Shape the foundations of your business in one considered place.',
    marketTitle: 'Market', marketDesc: 'A starting point for understanding the market around your idea.',
    financeTitle: 'Finance', financeDesc: 'A future home for business financial planning.',
    marketingTitle: 'Marketing', marketingDesc: 'A focused operating space for your digital marketing work.',
    contentTitle: 'Content', contentDesc: 'A future home for planning and organizing your content.',
    campaignsTitle: 'Campaigns', campaignsDesc: 'A future home for campaign planning and coordination.',
    trendsTitle: 'Trends', trendsDesc: 'A future home for market and channel observations.',
    tasksTitle: 'Tasks', tasksDesc: 'A future home for the work that moves your plans forward.',
    reportsTitle: 'Reports', reportsDesc: 'A future home for clear views of your business work.',
    approvalsTitle: 'Approvals', approvalsDesc: 'A future home for reviewing work with your team.',
    noPublish: 'Publishing is not available', noAnalytics: 'Analytics are not available',
    noTrends: 'Trend data is not connected', noApproval: 'Approval workflows are not available',
  },
  ar: {
    dashboard: 'لوحة المعلومات', projects: 'المشاريع', assistant: 'المساعد', business: 'خطة العمل',
    market: 'السوق', finance: 'المالية', marketing: 'التسويق', content: 'المحتوى', campaigns: 'الحملات',
    trends: 'الاتجاهات', tasks: 'المهام', reports: 'التقارير', approvals: 'الموافقات', settings: 'الإعدادات',
    overview: 'نظرة عامة', planning: 'تخطيط الأعمال', growth: 'مساحة التسويق', manage: 'مساحة العمل',
    slogan: 'From Imagination to Business.', localOnly: 'تبقى مساحة عملك على هذا الجهاز.',
    localStorage: 'مساحة عمل محلية', local: 'محفوظ محلياً', theme: 'المظهر', language: 'اللغة',
    darkMode: 'الوضع الداكن', darkModeDetail: 'استخدم مظهر JUNO الداكن باللون الكحلي.',
    languageDetail: 'اختر لغة واجهة الاستخدام.', english: 'English', arabic: 'العربية',
    settingsTitle: 'تفضيلات مساحة العمل', settingsDesc: 'خيارات بسيطة تحدد شكل JUNO على هذا الجهاز.',
    preferencesSaved: 'تُحفظ التفضيلات في هذا المتصفح فقط.',
    welcomeEyebrow: 'مساحة عملك التجارية', welcomeTitle: 'مساحة واضحة لدفع أعمالك إلى الأمام.',
    welcomeDesc: 'خطط بتأنٍ، وتابع عملك، وابدأ بخطوة تالية مدروسة.',
    getStarted: 'أنشئ مشروعاً', viewAssistant: 'افتح المساعد', yourProjects: 'مشاريعك',
    nextSteps: 'خطوة تالية مدروسة', noProjects: 'مساحة عملك جاهزة لمشروعها الأول.',
    noProjectsDesc: 'ابدأ بالفكرة التي تريد تحويلها إلى عمل. تُحفظ قائمة المشاريع على هذا الجهاز فقط.',
    createProject: 'أنشئ مشروعك الأول', noProjectYet: 'لا توجد مشاريع بعد', projectsEmptyHint: 'ستظهر المشاريع التي تنشئها هنا.',
    nextStepTitle: 'ابدأ بمشروع', nextStepText: 'امنح فكرتك اسماً. يمكنك إضافة تفاصيل مع تطور خطتك.',
    workspaceBasis: 'أساس متين', workspaceBasisText: 'تُبنى JUNO كمساحة مدروسة لتخطيط الأعمال والتسويق.',
    projectCount: 'مشاريع في مساحة العمل', projectCountOne: 'مشروع في مساحة العمل',
    projectTitle: 'مشاريعك', projectDesc: 'نظّم أفكار أعمالك في مساحة خاصة على هذا الجهاز.',
    projectName: 'اسم المشروع', projectPlaceholder: 'مثال: استوديو نورثلاين', projectContext: 'وصف موجز (اختياري)',
    contextPlaceholder: 'ما الذي تعمل على بنائه؟', addProject: 'أضف المشروع', saveChanges: 'احفظ التغييرات', cancel: 'إلغاء',
    edit: 'تعديل', delete: 'حذف', created: 'تاريخ الإنشاء', projectSaved: 'تم حفظ المشروع في هذا المتصفح.',
    projectNameRequired: 'أضف اسم المشروع للمتابعة.', deleteConfirm: 'هل تريد حذف هذا المشروع من هذا الجهاز؟',
    openProject: 'افتح مساحة المشروع', projectWorkspaceDesc: 'مساحة مخصصة لهذا المشروع. ستُضاف أدوات الأعمال في مراحل لاحقة.',
    projectWorkspaceEmpty: 'أضف وصفاً موجزاً من صفحة المشاريع للاحتفاظ بسياق هذه الفكرة.',
    projectNotFound: 'هذا المشروع غير محفوظ في هذا المتصفح.', backToProjects: 'العودة إلى المشاريع',
    assistantTitle: 'مساعد JUNO', assistantDesc: 'مساحة محادثة للتفكير في أعمالك.',
    assistantNotConnected: 'غير متصل في المرحلة الأولى', assistantNotConnectedBody: 'هذه معاينة لتصميم مساحة المساعد فقط. لن تُرسل رسالتك أو تُحفظ، ولا تتوفر ردود الذكاء الاصطناعي بعد.',
    assistantPlaceholder: 'المراسلة غير متاحة في هذه المرحلة', send: 'إرسال', assistantSideTitle: 'مساحة قيد التطوير',
    assistantSideBody: 'سيتم ربط تجربة المحادثة في مرحلة لاحقة. تبقى الرسائل هنا على الشاشة.',
    phaseOne: 'أساس المرحلة الأولى', stepOne: 'استكشف أقسام الأعمال والتسويق.', stepTwo: 'أضف مشاريع إلى مساحة العمل المحلية.', stepThree: 'تُحفظ تفضيلاتك على هذا الجهاز.',
    pageUnavailable: 'لم يُنفذ بعد', statusExplain: 'هذا القسم ضمن مساحة JUNO المخطط لها، لكنه غير متاح في المرحلة الأولى.',
    noConnections: 'لا توجد اتصالات خارجية', noData: 'لا يتم جمع أو عرض بيانات الأعمال هنا.',
    currentPhase: 'المرحلة الحالية', next: 'ما هو متاح الآن', honestNow: 'هذه الصفحة نقطة بداية واضحة وليست أداة متصلة.',
    sectionProjectHint: 'المشاريع هي سجلات الأعمال الوحيدة المتاحة في هذه المرحلة.',
    marketingPrinciple: 'مساحة لنمو مدروس', marketingBody: 'يجري إعداد مساحة التسويق لتعمل بجانب خطة أعمالك. لا توجد قنوات متصلة.',
    footerPhase: 'المرحلة الأولى · الأساس', footerLocal: 'محلي بطبيعته', notFound: 'لم نتمكن من العثور على الصفحة.',
    goHome: 'العودة إلى لوحة المعلومات', menu: 'افتح التنقل', closeMenu: 'أغلق التنقل',
    noProjectCount: 'لا توجد مشاريع بعد', projectListLabel: 'المشاريع المحفوظة', statusSaved: 'محفوظ على هذا الجهاز',
    businessTitle: 'خطة العمل', businessDesc: 'ضع أسس عملك في مساحة واحدة مدروسة.',
    marketTitle: 'السوق', marketDesc: 'نقطة بداية لفهم السوق المحيط بفكرتك.',
    financeTitle: 'المالية', financeDesc: 'مساحة مستقبلية للتخطيط المالي للأعمال.',
    marketingTitle: 'التسويق', marketingDesc: 'مساحة تشغيلية مركزة لأعمال التسويق الرقمي.',
    contentTitle: 'المحتوى', contentDesc: 'مساحة مستقبلية لتخطيط المحتوى وتنظيمه.',
    campaignsTitle: 'الحملات', campaignsDesc: 'مساحة مستقبلية لتخطيط الحملات وتنسيقها.',
    trendsTitle: 'الاتجاهات', trendsDesc: 'مساحة مستقبلية لملاحظات السوق والقنوات.',
    tasksTitle: 'المهام', tasksDesc: 'مساحة مستقبلية للأعمال التي تدفع خططك إلى الأمام.',
    reportsTitle: 'التقارير', reportsDesc: 'مساحة مستقبلية لعرض واضح لأعمالك.',
    approvalsTitle: 'الموافقات', approvalsDesc: 'مساحة مستقبلية لمراجعة العمل مع فريقك.',
    noPublish: 'النشر غير متاح', noAnalytics: 'التحليلات غير متاحة',
    noTrends: 'بيانات الاتجاهات غير متصلة', noApproval: 'سير الموافقات غير متاح',
  },
};

type AppContext = {
  locale: Locale; theme: Theme; projects: Project[]; setLocale: (locale: Locale) => void;
  setTheme: (theme: Theme) => void; addProject: (project: Project) => void;
  updateProject: (project: Project) => void; removeProject: (id: string) => void;
};

const navGroups = [
  { title: 'overview', items: [
    { path: '/', label: 'dashboard', icon: LayoutDashboard },
    { path: '/projects', label: 'projects', icon: FolderKanban },
    { path: '/assistant', label: 'assistant', icon: Sparkles },
  ] },
  { title: 'planning', items: [
    { path: '/business', label: 'business', icon: BriefcaseBusiness },
    { path: '/market', label: 'market', icon: Compass },
    { path: '/finance', label: 'finance', icon: Wallet },
  ] },
  { title: 'growth', items: [
    { path: '/marketing', label: 'marketing', icon: Megaphone },
    { path: '/content', label: 'content', icon: PenLine },
    { path: '/campaigns', label: 'campaigns', icon: Target },
    { path: '/trends', label: 'trends', icon: TrendingUp },
  ] },
  { title: 'manage', items: [
    { path: '/tasks', label: 'tasks', icon: ClipboardList },
    { path: '/reports', label: 'reports', icon: FileBarChart },
    { path: '/approvals', label: 'approvals', icon: ShieldCheck },
    { path: '/settings', label: 'settings', icon: Settings2 },
  ] },
];

function readStorage<T>(key: string, fallback: T): T {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function AppShell({ context }: { context: AppContext }) {
  const [path] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = (key: string) => copy[context.locale][key] ?? key;
  const routeName = navGroups.flatMap((group) => group.items).find((item) => item.path === path)?.label
    ?? (path.startsWith('/projects/') ? 'projects' : undefined);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', context.theme === 'dark');
    document.documentElement.lang = context.locale;
    document.documentElement.dir = context.locale === 'ar' ? 'rtl' : 'ltr';
  }, [context.locale, context.theme]);

  const closeMenu = () => setMenuOpen(false);
  const switchLocale = () => context.setLocale(context.locale === 'en' ? 'ar' : 'en');
  const toggleTheme = () => context.setTheme(context.theme === 'dark' ? 'light' : 'dark');

  return (
    <div className="app-shell" dir={context.locale === 'ar' ? 'rtl' : 'ltr'}>
      {menuOpen && <button type="button" className="mobile-scrim" aria-label={t('closeMenu')} onClick={closeMenu} data-testid="button-close-navigation" />}
      <aside className={`sidebar${menuOpen ? ' open' : ''}`} aria-label={t('overview')} data-testid="navigation-sidebar">
        <Link href="/" className="brand" onClick={closeMenu} data-testid="link-juno-home">
          <span className="brand-mark" aria-hidden="true">J</span>
          <span><span className="brand-name">JUNO</span><span className="brand-sub">{t('slogan')}</span></span>
        </Link>
        <nav aria-label={t('overview')}>
          {navGroups.map((group) => (
            <div className="nav-group" key={group.title}>
              <div className="nav-label">{t(group.title)}</div>
              {group.items.map(({ path: itemPath, label, icon: Icon }) => (
                <Link
                  href={itemPath}
                  key={itemPath}
                   className={`nav-link${path === itemPath || (itemPath === '/projects' && path.startsWith('/projects/')) ? ' active' : ''}`}
                   aria-current={path === itemPath || (itemPath === '/projects' && path.startsWith('/projects/')) ? 'page' : undefined}
                  onClick={closeMenu}
                  data-testid={`link-nav-${label}`}
                >
                  <Icon aria-hidden="true" /><span>{t(label)}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="local-note">
            <div className="local-note-title"><Globe2 size={13} aria-hidden="true" />{t('localStorage')}</div>
            <p>{t('localOnly')}</p>
          </div>
          <div className="sidebar-footer"><span className="local-dot" />{t('local')}<span style={{ marginInlineStart: 'auto' }}>JUNO · 01</span></div>
        </div>
      </aside>
      <div className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button type="button" className="icon-button mobile-menu" aria-label={t('menu')} aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} data-testid="button-open-navigation"><Menu /></button>
            <span className="breadcrumb">{routeName ? t(routeName) : 'JUNO'}{routeName && <span aria-hidden="true"> / </span>}<span>JUNO</span></span>
          </div>
          <div className="topbar-right">
            <button type="button" className="locale-button" onClick={switchLocale} aria-label={context.locale === 'en' ? 'Switch language to Arabic' : 'Switch language to English'} data-testid="button-toggle-language">
              <Globe2 aria-hidden="true" /><span>{context.locale === 'en' ? 'EN' : 'عربي'}</span><ChevronDown size={12} aria-hidden="true" />
            </button>
            <button type="button" className="icon-button" onClick={toggleTheme} aria-label={context.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} title={context.theme === 'dark' ? 'Light theme' : 'Dark theme'} data-testid="button-toggle-theme">
              {context.theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            </button>
          </div>
        </header>
        <RoutedErrorBoundary>
          <Switch>
            <Route path="/"><Dashboard context={context} /></Route>
            <Route path="/projects"><Projects context={context} /></Route>
            <Route path="/projects/:projectId"><ProjectWorkspace context={context} /></Route>
            <Route path="/assistant"><Assistant locale={context.locale} /></Route>
            <Route path="/business"><SectionPage locale={context.locale} page="business" icon={BriefcaseBusiness} /></Route>
            <Route path="/market"><SectionPage locale={context.locale} page="market" icon={Compass} /></Route>
            <Route path="/finance"><SectionPage locale={context.locale} page="finance" icon={Wallet} /></Route>
            <Route path="/marketing"><SectionPage locale={context.locale} page="marketing" icon={Megaphone} /></Route>
            <Route path="/content"><SectionPage locale={context.locale} page="content" icon={PenLine} /></Route>
            <Route path="/campaigns"><SectionPage locale={context.locale} page="campaigns" icon={Target} /></Route>
            <Route path="/trends"><SectionPage locale={context.locale} page="trends" icon={TrendingUp} /></Route>
            <Route path="/tasks"><SectionPage locale={context.locale} page="tasks" icon={ClipboardList} /></Route>
            <Route path="/reports"><SectionPage locale={context.locale} page="reports" icon={FileBarChart} /></Route>
            <Route path="/approvals"><SectionPage locale={context.locale} page="approvals" icon={ShieldCheck} /></Route>
            <Route path="/settings"><SettingsPage locale={context.locale} theme={context.theme} setLocale={context.setLocale} setTheme={context.setTheme} /></Route>
           <Route><NotFoundPage locale={context.locale} /></Route>
          </Switch>
        </RoutedErrorBoundary>
      </div>
    </div>
  );
}

function Dashboard({ context }: { context: AppContext }) {
  const t = (key: string) => copy[context.locale][key] ?? key;
  const hasProjects = context.projects.length > 0;
  return (
    <main className="page-content" data-testid="page-dashboard">
      <section className="welcome-panel" aria-labelledby="welcome-heading">
        <div className="eyebrow">{t('welcomeEyebrow')}</div>
        <h2 id="welcome-heading">{t('welcomeTitle')}</h2>
        <p>{t('welcomeDesc')}</p>
        <div className="welcome-actions">
          <Link href="/projects" className="button-primary" data-testid="link-create-project"><Plus aria-hidden="true" />{t('getStarted')}</Link>
          <Link href="/assistant" className="button-secondary" data-testid="link-open-assistant">{t('viewAssistant')}<ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>
      <div className="dashboard-lower">
        <section className="surface dashboard-card" aria-labelledby="dashboard-projects-heading">
          <div className="card-top">
            <div className="card-title" id="dashboard-projects-heading"><FolderKanban aria-hidden="true" />{t('yourProjects')}</div>
            {hasProjects && <Link className="quiet-link" href="/projects" data-testid="link-view-all-projects">{t('projects')}<ArrowRight aria-hidden="true" /></Link>}
          </div>
          {hasProjects ? (
            <div className="project-list" data-testid="list-dashboard-projects">
              {context.projects.slice(0, 3).map((project) => <ProjectRow key={project.id} project={project} locale={context.locale} compact />)}
              {context.projects.length > 3 && <Link href="/projects" className="quiet-link">{context.projects.length - 3} more <ArrowRight aria-hidden="true" /></Link>}
            </div>
          ) : (
            <div className="empty-inline" data-testid="empty-dashboard-projects">
              <div><FolderKanban aria-hidden="true" /><div>{t('noProjectYet')}</div><span>{t('projectsEmptyHint')}</span></div>
            </div>
          )}
        </section>
        <section className="surface dashboard-card" aria-labelledby="dashboard-next-heading">
          <div className="card-top">
            <div className="card-title" id="dashboard-next-heading"><Lightbulb aria-hidden="true" />{t('nextSteps')}</div>
            <span className="phase-tag">01</span>
          </div>
          <div className="workspace-empty" data-testid="dashboard-next-step">
            <div className="empty-mark"><Plus aria-hidden="true" /></div>
            <div><h3>{hasProjects ? t('workspaceBasis') : t('nextStepTitle')}</h3><p>{hasProjects ? t('workspaceBasisText') : t('nextStepText')}</p></div>
          </div>
        </section>
      </div>
      <div className="footer-line"><span>{t('slogan')}</span><span>{hasProjects ? `${context.projects.length} ${context.projects.length === 1 ? t('projectCountOne') : t('projectCount')}` : t('noProjectCount')}</span></div>
    </main>
  );
}

function ProjectRow({ project, locale, compact = false, onEdit, onDelete }: {
  project: Project; locale: Locale; compact?: boolean; onEdit?: () => void; onDelete?: () => void;
}) {
  const t = (key: string) => copy[locale][key] ?? key;
  const date = new Date(project.createdAt);
  return (
    <div className="project-row" data-testid={`row-project-${project.id}`}>
      <Link href={`/projects/${encodeURIComponent(project.id)}`} className="project-main project-link" aria-label={`${t('openProject')}: ${project.name}`} data-testid={`link-open-project-${project.id}`}>
        <span className="project-symbol"><BriefcaseBusiness aria-hidden="true" /></span>
        <div style={{ minWidth: 0 }}>
          <div className="project-name" data-testid={`text-project-name-${project.id}`}>{project.name}</div>
          <div className="project-meta">{compact ? (project.description || t('statusSaved')) : project.description || `${t('created')} · ${Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString(locale === 'ar' ? 'ar' : 'en', { year: 'numeric', month: 'short', day: 'numeric' })}`}</div>
        </div>
      </Link>
      {!compact && <div className="project-controls">
        <span className="status-pill">{t('statusSaved')}</span>
        <button type="button" className="icon-button" aria-label={`${t('edit')} ${project.name}`} onClick={onEdit} data-testid={`button-edit-project-${project.id}`}><PenLine aria-hidden="true" /></button>
        <button type="button" className="icon-button" aria-label={`${t('delete')} ${project.name}`} onClick={onDelete} data-testid={`button-delete-project-${project.id}`}><Trash2 aria-hidden="true" /></button>
      </div>}
    </div>
  );
}

function Projects({ context }: { context: AppContext }) {
  const t = (key: string) => copy[context.locale][key] ?? key;
  const form = useForm<{ name: string; description: string }>({ defaultValues: { name: '', description: '' } });
  const [editingId, setEditingId] = useState<string | null>(null);

  const resetForm = () => { form.reset({ name: '', description: '' }); setEditingId(null); };
  const beginEdit = (project: Project) => {
    setEditingId(project.id);
    form.reset({ name: project.name, description: project.description });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const submit = (values: { name: string; description: string }) => {
    const normalizedName = values.name.trim();
    if (editingId) {
      const existing = context.projects.find((project) => project.id === editingId);
      if (existing) context.updateProject({ ...existing, name: normalizedName, description: values.description.trim() });
    } else {
      context.addProject({ id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`, name: normalizedName, description: values.description.trim(), createdAt: new Date().toISOString() });
    }
    resetForm();
  };
  const remove = (project: Project) => {
    if (window.confirm(`${t('deleteConfirm')} (${project.name})`)) {
      context.removeProject(project.id);
      if (editingId === project.id) resetForm();
    }
  };

  return (
    <main className="page-content" data-testid="page-projects">
      <PageHeading locale={context.locale} eyebrow="JUNO · WORKSPACE" title="projectTitle" description="projectDesc">
        <span className="status-pill" data-testid="status-project-count">{context.projects.length} · {context.projects.length === 1 ? t('projectCountOne') : t('projectCount')}</span>
      </PageHeading>
      <Form {...form}>
        <form className="form-panel" onSubmit={form.handleSubmit(submit)} noValidate data-testid="form-project">
          <FormField control={form.control} name="name" rules={{
            required: t('projectNameRequired'),
            validate: (value) => value.trim().length > 0 || t('projectNameRequired'),
          }} render={({ field }) => (
            <FormItem className="field">
              <FormLabel>{t('projectName')}</FormLabel>
              <FormControl><input {...field} placeholder={t('projectPlaceholder')} maxLength={90} data-testid="input-project-name" /></FormControl>
              <FormMessage className="form-error" data-testid="error-project-name" />
            </FormItem>
          )} />
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem className="field">
              <FormLabel>{t('projectContext')}</FormLabel>
              <FormControl><input {...field} placeholder={t('contextPlaceholder')} maxLength={180} data-testid="input-project-description" /></FormControl>
              <FormMessage className="form-error" />
            </FormItem>
          )} />
          <button className="button-primary" type="submit" data-testid="button-save-project">
            {editingId ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}{editingId ? t('saveChanges') : t('addProject')}
          </button>
          {editingId && <button className="button-secondary" type="button" onClick={resetForm} data-testid="button-cancel-project-edit"><X aria-hidden="true" />{t('cancel')}</button>}
        </form>
      </Form>
      {context.projects.length ? (
        <section className="project-list" aria-label={t('projectListLabel')} data-testid="list-projects">
          {context.projects.map((project) => (
            <ProjectRow key={project.id} project={project} locale={context.locale}
              onEdit={() => beginEdit(project)} onDelete={() => remove(project)} />
          ))}
        </section>
      ) : (
        <section className="surface section-main-card" data-testid="empty-projects">
          <div className="workspace-empty">
            <div className="empty-mark"><FolderKanban aria-hidden="true" /></div>
            <div><h3>{t('noProjects')}</h3><p>{t('noProjectsDesc')}</p></div>
          </div>
        </section>
      )}
      <div className="footer-line"><span>{t('localOnly')}</span><span>{t('slogan')}</span></div>
    </main>
  );
}

function ProjectWorkspace({ context }: { context: AppContext }) {
  const [, params] = useRoute('/projects/:projectId');
  const t = (key: string) => copy[context.locale][key] ?? key;
  const projectId = params?.projectId ? decodeURIComponent(params.projectId) : '';
  const project = context.projects.find((item) => item.id === projectId);

  if (!project) {
    return (
      <main className="page-content" data-testid="page-project-not-found">
        <div className="eyebrow">JUNO · WORKSPACE</div>
        <h1>{t('projectNotFound')}</h1>
        <Link href="/projects" className="button-primary" style={{ marginTop: 22 }} data-testid="link-back-to-projects">
          <ArrowRight aria-hidden="true" />{t('backToProjects')}
        </Link>
      </main>
    );
  }

  const date = new Date(project.createdAt);
  return (
    <main className="page-content" data-testid={`page-project-workspace-${project.id}`}>
      <header className="page-heading">
        <div>
          <div className="eyebrow">JUNO · WORKSPACE</div>
          <h1>{project.name}</h1>
          <p className="page-description">{project.description || t('projectWorkspaceDesc')}</p>
        </div>
        <Link href="/projects" className="button-secondary" data-testid="link-back-to-projects">
          <ArrowRight aria-hidden="true" />{t('backToProjects')}
        </Link>
      </header>
      <section className="surface project-workspace-card" aria-labelledby="project-workspace-heading">
        <div className="card-title" id="project-workspace-heading"><BriefcaseBusiness aria-hidden="true" />{t('openProject')}</div>
        <p className="project-context">{project.description || t('projectWorkspaceEmpty')}</p>
        <div className="project-workspace-meta">
          <span className="status-pill">{t('statusSaved')}</span>
          <span>{t('created')} · {Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString(context.locale === 'ar' ? 'ar' : 'en', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
        </div>
        <div className="not-ready project-workspace-status">
          <div className="not-ready-symbol"><Activity aria-hidden="true" /></div>
          <div><div className="eyebrow">{t('currentPhase')}</div><h2>{t('pageUnavailable')}</h2><p>{t('projectWorkspaceDesc')}</p></div>
        </div>
      </section>
      <div className="footer-line"><span>{t('footerPhase')}</span><span>{t('localOnly')}</span></div>
    </main>
  );
}

function PageHeading({ locale, eyebrow, title, description, children }: {
  locale: Locale; eyebrow: string; title: string; description: string; children?: ReactNode;
}) {
  const t = (key: string) => copy[locale][key] ?? key;
  return (
    <header className="page-heading">
      <div><div className="eyebrow">{eyebrow}</div><h1>{t(title)}</h1><p className="page-description">{t(description)}</p></div>
      {children}
    </header>
  );
}

function Assistant({ locale }: { locale: Locale }) {
  const t = (key: string) => copy[locale][key] ?? key;
  return (
    <main className="page-content" data-testid="page-assistant">
      <PageHeading locale={locale} eyebrow="JUNO · THINKING SPACE" title="assistantTitle" description="assistantDesc">
        <span className="phase-tag">{t('phaseOne')}</span>
      </PageHeading>
      <div className="assistant-layout">
        <section className="surface chat-card" aria-label={t('assistantTitle')}>
          <div className="chat-header">
            <div className="chat-title">{t('assistantTitle')}</div><div className="connection-tag" data-testid="status-assistant-connection">{t('assistantNotConnected')}</div>
          </div>
          <div className="chat-body">
            <div>
              <div className="chat-orbit"><Sparkles aria-hidden="true" /></div>
              <h2>{t('assistantNotConnected')}</h2>
              <p data-testid="text-assistant-not-connected">{t('assistantNotConnectedBody')}</p>
            </div>
          </div>
          <form className="chat-compose" onSubmit={(event) => event.preventDefault()} aria-label={t('assistantNotConnected')}>
            <input disabled aria-label={t('assistantPlaceholder')} placeholder={t('assistantPlaceholder')} data-testid="input-assistant-message" />
            <button className="button-primary" type="submit" disabled aria-label={t('send')} data-testid="button-send-assistant"><ArrowRight aria-hidden="true" /></button>
          </form>
        </section>
        <aside className="surface assistant-aside">
          <h3>{t('assistantSideTitle')}</h3><p>{t('assistantSideBody')}</p>
          <div className="step-list">
            {[t('stepOne'), t('stepTwo'), t('stepThree')].map((text, index) => <div className="step" key={text}><span className="step-num">{String(index + 1).padStart(2, '0')}</span><span>{text}</span></div>)}
          </div>
        </aside>
      </div>
    </main>
  );
}

const sectionInfo: Record<string, { title: string; desc: string; rows: string[] }> = {
  business: { title: 'businessTitle', desc: 'businessDesc', rows: ['sectionProjectHint', 'honestNow'] },
  market: { title: 'marketTitle', desc: 'marketDesc', rows: ['noData', 'noConnections'] },
  finance: { title: 'financeTitle', desc: 'financeDesc', rows: ['noData', 'sectionProjectHint'] },
  marketing: { title: 'marketingTitle', desc: 'marketingDesc', rows: ['marketingPrinciple', 'noPublish', 'noAnalytics'] },
  content: { title: 'contentTitle', desc: 'contentDesc', rows: ['noPublish', 'noConnections'] },
  campaigns: { title: 'campaignsTitle', desc: 'campaignsDesc', rows: ['noPublish', 'noAnalytics'] },
  trends: { title: 'trendsTitle', desc: 'trendsDesc', rows: ['noTrends', 'noConnections'] },
  tasks: { title: 'tasksTitle', desc: 'tasksDesc', rows: ['honestNow', 'sectionProjectHint'] },
  reports: { title: 'reportsTitle', desc: 'reportsDesc', rows: ['noAnalytics', 'noData'] },
  approvals: { title: 'approvalsTitle', desc: 'approvalsDesc', rows: ['noApproval', 'noConnections'] },
};

function SectionPage({ locale, page, icon: Icon }: { locale: Locale; page: keyof typeof sectionInfo; icon: typeof BriefcaseBusiness }) {
  const t = (key: string) => copy[locale][key] ?? key;
  const info = sectionInfo[page];
  return (
    <main className="page-content" data-testid={`page-${page}`}>
      <PageHeading locale={locale} eyebrow={`JUNO · ${page.toUpperCase()}`} title={info.title} description={info.desc}>
        <span className="phase-tag">{t('phaseOne')}</span>
      </PageHeading>
      <div className="section-grid">
        <section className="surface section-main-card">
          <div className="not-ready" data-testid={`status-${page}-not-implemented`}>
            <div className="not-ready-symbol"><Icon aria-hidden="true" /></div>
            <div><div className="eyebrow">{t('currentPhase')}</div><h2>{t('pageUnavailable')}</h2><p>{t('statusExplain')}</p></div>
          </div>
          <div className="footer-line"><span>{t('slogan')}</span><span>{t('footerPhase')}</span></div>
        </section>
        <aside className="surface section-aside-card">
          <div className="card-title"><Activity aria-hidden="true" />{t('next')}</div>
          <div className="capability-list">
            {info.rows.map((row) => <div className="capability-row" key={row}><CircleHelp aria-hidden="true" /><span>{t(row)}</span></div>)}
          </div>
          {page === 'marketing' && <p className="page-description" style={{ fontSize: 10, marginTop: 13 }}>{t('marketingBody')}</p>}
        </aside>
      </div>
    </main>
  );
}

function SettingsPage({ locale, theme, setLocale, setTheme }: {
  locale: Locale; theme: Theme; setLocale: (locale: Locale) => void; setTheme: (theme: Theme) => void;
}) {
  const t = (key: string) => copy[locale][key] ?? key;
  return (
    <main className="page-content" data-testid="page-settings">
      <PageHeading locale={locale} eyebrow="JUNO · PREFERENCES" title="settingsTitle" description="settingsDesc" />
      <section className="surface settings-card">
        <div className="section-kicker">{t('settings')}</div>
        <div className="settings-row">
          <div><strong>{t('theme')}</strong><span>{t('darkModeDetail')}</span></div>
          <button type="button" className="switch" role="switch" aria-checked={theme === 'dark'} aria-label={t('darkMode')} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} data-testid="switch-dark-mode" />
        </div>
        <div className="settings-row">
          <div><strong>{t('language')}</strong><span>{t('languageDetail')}</span></div>
          <button type="button" className="locale-button" onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')} aria-label={locale === 'en' ? 'Switch language to Arabic' : 'Switch language to English'} data-testid="button-settings-language">
            {locale === 'en' ? t('english') : t('arabic')}<ChevronDown aria-hidden="true" />
          </button>
        </div>
        <div className="settings-row"><div><strong>{t('localStorage')}</strong><span>{t('preferencesSaved')}</span></div><span className="status-pill">{t('local')}</span></div>
      </section>
      <div className="footer-line"><span>{t('slogan')}</span><span>{t('footerLocal')}</span></div>
    </main>
  );
}

function NotFoundPage({ locale }: { locale: Locale }) {
  const t = (key: string) => copy[locale][key] ?? key;
  return (
    <main className="page-content" data-testid="page-not-found">
      <div className="eyebrow">JUNO · 404</div>
      <h1>{t('notFound')}</h1>
      <p className="page-description">{t('statusExplain')}</p>
      <Link href="/" className="button-primary" style={{ marginTop: 22 }} data-testid="link-not-found-home"><ArrowRight aria-hidden="true" />{t('goHome')}</Link>
    </main>
  );
}

function App() {
  const [projects, setProjects] = useState<Project[]>(() => readStorage<Project[]>('juno.projects.v1', []));
  const [locale, setLocale] = useState<Locale>(() => readStorage<Locale>('juno.locale.v1', 'en'));
  const [theme, setTheme] = useState<Theme>(() => readStorage<Theme>('juno.theme.v1', 'dark'));

  useEffect(() => {
    try { window.localStorage.setItem('juno.projects.v1', JSON.stringify(projects)); } catch { /* Local storage may be unavailable in a restricted browser. */ }
  }, [projects]);
  useEffect(() => {
    try { window.localStorage.setItem('juno.locale.v1', JSON.stringify(locale)); } catch { /* Preference remains active for this session. */ }
  }, [locale]);
  useEffect(() => {
    try { window.localStorage.setItem('juno.theme.v1', JSON.stringify(theme)); } catch { /* Preference remains active for this session. */ }
  }, [theme]);

  const context: AppContext = {
    locale, theme, projects, setLocale, setTheme,
    addProject: (project) => setProjects((current) => [project, ...current]),
    updateProject: (project) => setProjects((current) => current.map((item) => item.id === project.id ? project : item)),
    removeProject: (id) => setProjects((current) => current.filter((item) => item.id !== id)),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <AppShell context={context} />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
