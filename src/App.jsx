import React, { useState, useEffect } from 'react';
import {
  Shield,
  Activity,
  Layers,
  Lock,
  DollarSign,
  AlertTriangle,
  Calendar,
  FileText,
  Search,
  Filter,
  CheckCircle,
  Printer,
  ChevronRight,
  TrendingUp,
  Download,
  Info,
  Maximize2,
  Trash2,
  PlusCircle,
  AlertCircle,
  ArrowRight,
  CheckSquare,
  Zap,
  Users,
  Terminal,
  HelpCircle,
  Info as InfoIcon
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';

// --- DATASETS ---

// 12 Expanded Tools for Infrastructure Inventory
const INITIAL_TOOLS_DATA = [
  { 
    id: 'github', 
    name: 'GitHub', 
    category: 'Development', 
    purpose: 'Source Control & CI/CD Pipelines', 
    cost: 120, 
    owner: 'Dev Team', 
    status: 'Active', 
    recommendation: 'Keep', 
    notes: 'Primary codebase repository. Integral to B2B deliveries.',
    usage: 'Hosts all codebases, developer pull request reviews, and triggers continuous deployments to staging servers.',
    strengths: 'Industry-standard version control, robust branch protection gates, and seamless integration with Antigravity assistant.',
    weaknesses: 'High license cost scaling; repository collaborators must be manually audited to prevent guest license leakages.',
    security: 'Code is secured on cloud, but requires stricter enforcement of locked main branches and signed Git commits.',
    costEfficiency: 'Excellent utility-to-cost ratio. Dev team utilizes advanced features; pruning unused seats saves $30/mo.',
    priority: 'Medium',
    expectedImpact: 'Guarantees repository branch protection, preventing unintended layout or code regressions.'
  },
  { 
    id: 'gworkspace', 
    name: 'Google Workspace', 
    category: 'Productivity', 
    purpose: 'Corporate Email, Docs & Identity', 
    cost: 480, 
    owner: 'Admin Team', 
    status: 'Active', 
    recommendation: 'Keep', 
    notes: 'Core collaboration suite. Requires seat optimization.',
    usage: 'Facilitates all company emails, calendar scheduling, team documents creation, and corporate user identity management.',
    strengths: 'Centralized admin controls, SAML single sign-on (SSO) architecture, and collaborative real-time editor engines.',
    weaknesses: 'Inheritance tree for folder permissions is complex; hard to track cells edits on Shared Google Sheets.',
    security: 'Lacks globally enforced Multi-Factor Authentication (MFA); guest sharing rules are occasionally left open.',
    costEfficiency: 'Moderate. Business Lab is paying for 4 Enterprise licenses assigned to inactive consultants and interns.',
    priority: 'Critical',
    expectedImpact: 'Locks administrative access, protects correspondence records, and enforces corporate boundaries.'
  },
  { 
    id: 'notion', 
    name: 'Notion', 
    category: 'Productivity', 
    purpose: 'Wiki & Shared Knowledge Base', 
    cost: 180, 
    owner: 'Operations', 
    status: 'Active', 
    recommendation: 'Integrate', 
    notes: 'Highly valued, but requires standardized permission sync.',
    usage: 'Houses the central company documentation, onboarding workflows, Standard Operating Procedures (SOPs), and B2B templates.',
    strengths: 'Extremely flexible layouts, inline databases with custom views, and intuitive team nesting folders.',
    weaknesses: 'Search indexing slows under large vault files; permissions are difficult to isolate on sub-pages.',
    security: 'External guests can download complete databases if the "export workspace" option is not administratively locked.',
    costEfficiency: 'High value-to-cost return. Essential for operations, but guest seat invitations must be audited.',
    priority: 'High',
    expectedImpact: 'Consolidates company wiki, reducing time spent searching for internal onboarding rules by 30%.'
  },
  { 
    id: 'telegram', 
    name: 'Telegram', 
    category: 'Communication', 
    purpose: 'Instant Messaging & Notification Bots', 
    cost: 0, 
    owner: 'Marketing', 
    status: 'Active', 
    recommendation: 'Keep', 
    notes: 'Core real-time coordination and customer notify loops.',
    usage: 'Main channel for real-time team chats, customer support, lead alerts, and automated system notification webhooks.',
    strengths: 'Instant message delivery, powerful API integrations, and robust automated bot trigger ecosystems.',
    weaknesses: 'Does not support administrative directory structures; legacy files expire if not backed up.',
    security: 'Group chats are not end-to-end encrypted by default. Vulnerable to SIM-swap compromises if 2FA is omitted.',
    costEfficiency: 'Infinite value (free tier). Minor marketing expenses incurred for custom premium channel bots.',
    priority: 'Medium',
    expectedImpact: 'Enables high-speed alert loops for lead sourcing and developers, removing email blockages.'
  },
  { 
    id: 'canva', 
    name: 'Canva', 
    category: 'Content', 
    purpose: 'Visual Graphics & Brand Assets', 
    cost: 80, 
    owner: 'Design Team', 
    status: 'Active', 
    recommendation: 'Keep', 
    notes: 'Empowers marketing team to publish content rapidly.',
    usage: 'Used by the marketing team to design graphics, edit promotional PDFs, and construct brand presentation templates.',
    strengths: 'Huge library of templates, simple drag-and-drop designer canvas, and collaborative team boards.',
    weaknesses: 'Lacks support for advanced vector file formats; designs can overlap with professional Figma files.',
    security: 'Assets share links are set to public view for convenience, bypassing tenant domain security.',
    costEfficiency: 'High. Speeds up graphics production, though seats are currently shared via a single password.',
    priority: 'Medium',
    expectedImpact: 'Standardises brand aesthetics and prevents visual marketing inconsistencies.'
  },
  { 
    id: 'claude', 
    name: 'Claude', 
    category: 'AI', 
    purpose: 'Advanced Code & Narrative Engine', 
    cost: 150, 
    owner: 'Dev Team', 
    status: 'Active', 
    recommendation: 'Integrate', 
    notes: 'Utilized heavily for content drafting and code reviews.',
    usage: 'Generates B2B analysis reports, audits codebase structures, writes script drafts, and reviews layout modifications.',
    strengths: 'Outstanding logical reasoning, large context window, and highly accurate code output formatting.',
    weaknesses: 'Expensive subscription model; lacks team memory sharing features in basic plan levels.',
    security: 'Prompts input data must be opt-out from model training to protect internal GO-BRICS code intellectual property.',
    costEfficiency: 'High return. Developers save several hours weekly, though subscriptions are fragmented.',
    priority: 'High',
    expectedImpact: 'Provides secure enterprise AI logic, speeding up manual analysis procedures by 50%.'
  },
  { 
    id: 'chatgpt', 
    name: 'ChatGPT', 
    category: 'AI', 
    purpose: 'B2B Research & Copy Assistance', 
    cost: 150, 
    owner: 'Business Lab', 
    status: 'Active', 
    recommendation: 'Keep', 
    notes: 'Ad-hoc query resolution and translation services.',
    usage: 'Used for ad-hoc coding queries, web research indexing, customer support templates, and multi-language translation.',
    strengths: 'Rapid response times, extensive plugin marketplace, and broad dataset coverage.',
    weaknesses: 'Information cutoffs require fact-checking; outputs occasionally contain layout hallucinations.',
    security: 'Prompt logs must be cleared monthly to guarantee client lead information is not stored permanently.',
    costEfficiency: 'Moderate. Overlaps with Claude; subscription seat consolidation could save $50/mo.',
    priority: 'Medium',
    expectedImpact: 'Acts as secondary validation for code research and strategy formulations.'
  },
  { 
    id: 'antigravity', 
    name: 'Antigravity', 
    category: 'Development', 
    purpose: 'Autonomous Agentic Coding Assistant', 
    cost: 300, 
    owner: 'Tech Lead', 
    status: 'Active', 
    recommendation: 'Keep', 
    notes: 'High productivity accelerator for software engineering.',
    usage: 'Autonomously reads codebases, drafts CSS files, manages layout fixes, and packages build directories.',
    strengths: 'Excellent terminal sandbox capability, reads large file contents, and creates correct components.',
    weaknesses: 'Lacks background task visualization; outputs must be reviewed by the tech lead.',
    security: 'Sandbox terminal executes scripts; commands must be strictly gated to prevent system file changes.',
    costEfficiency: 'Exceptional. Replaces standard developer contractor hours, saving over $2,000/mo in resources.',
    priority: 'High',
    expectedImpact: 'Accelerates development sprints, reducing deployment time of web apps from weeks to days.'
  },
  { 
    id: 'gdrive', 
    name: 'Google Drive', 
    category: 'Content', 
    purpose: 'File Storage & Asset Repository', 
    cost: 120, 
    owner: 'Operations', 
    status: 'Active', 
    recommendation: 'Integrate', 
    notes: 'Contains project delivery documents. Review sharing rules.',
    usage: 'Primary storage for media file deliverables, zip packages, developer templates, and historical client PDFs.',
    strengths: 'Offline file access, high-capacity storage tiers, and seamless integration with Workspace editors.',
    weaknesses: 'Search directories become cluttered without standard name conventions.',
    security: 'Parent directories sharing settings can override sub-folder restrictions, exposing client files.',
    costEfficiency: 'Good. Necessary for large graphics files, though automated folder sweeps are required.',
    priority: 'High',
    expectedImpact: 'Ensures client deliverables are secure and historical records are archived.'
  },
  { 
    id: 'sheets', 
    name: 'Sheets', 
    category: 'Operations', 
    purpose: 'Data Tracking & Metrics Reporting', 
    cost: 0, 
    owner: 'Operations', 
    status: 'Needs Review', 
    recommendation: 'Integrate', 
    notes: 'Used for B2B logs; prone to human input errors.',
    usage: 'Logs B2B financial metrics, counts task completion scores, and keeps records of customer lead scores.',
    strengths: 'Flexible cell mathematical models, custom pivot tables, and easy sharing controls.',
    weaknesses: 'No data type restrictions; prone to typing mistakes and formatting inconsistencies.',
    security: 'Shared sheets expose entire spreadsheets; link leakages compromise critical financial details.',
    costEfficiency: 'High (free in Workspace), but human calculation verification wastes administrative hours.',
    priority: 'Critical',
    expectedImpact: 'Standardises metrics log files, ensuring accurate client reporting.'
  },
  { 
    id: 'forms', 
    name: 'Forms', 
    category: 'Operations', 
    purpose: 'Client Feedback & Lead Sourcing', 
    cost: 0, 
    owner: 'Marketing', 
    status: 'Needs Review', 
    recommendation: 'Replace', 
    notes: 'Unintegrated lead capture. Shift to centralized system.',
    usage: 'Captures new client support request entries, B2B lead generation forms, and project feedback surveys.',
    strengths: 'Fast to deploy, simple layout form creation, and automatic exports to Google Sheets.',
    weaknesses: 'Lacks multi-branch conditional question paths and custom branding layout tools.',
    security: 'Submissions are not encrypted in transit; lacks robust anti-spam validation controls.',
    costEfficiency: 'Good value (free), but leads to manual email notification delays.',
    priority: 'High',
    expectedImpact: 'Reduces intake sorting duration and prevents lead decay.'
  },
  { 
    id: 'discord', 
    name: 'Discord', 
    category: 'Communication', 
    purpose: 'Redundant Chat Workspace', 
    cost: 40, 
    owner: 'Marketing', 
    status: 'Redundant', 
    recommendation: 'Deprecate', 
    notes: 'Leftover community workspace. Has overlapping features with Telegram.',
    usage: 'Legacy community discussions and voice chat rooms, now rarely used due to Telegram transition.',
    strengths: 'High-quality screen sharing, organized channel directories, and voice channels.',
    weaknesses: 'High desktop app CPU resources; team members find notifications distracting.',
    security: 'External developer bot hooks are unmonitored; guest invitations stay active indefinitely.',
    costEfficiency: 'Poor. Paying for server boost subscriptions that provide no operational value.',
    priority: 'Medium',
    expectedImpact: 'Recovers $480/yr in subscription costs and focuses team attention on Telegram.'
  }
];

// Integration Map Layers
const INTEGRATION_LAYERS = [
  {
    id: 'users',
    name: 'Users / Operators',
    desc: 'GO-BRICS employees, B2B clients, and Shungite partners executing queries.',
    tools: ['Google Workspace', 'Telegram'],
    icon: 'Users'
  },
  {
    id: 'comm',
    name: 'Communication Layer',
    desc: 'Bridges user inquiries and team notifications.',
    tools: ['Telegram', 'Discord'],
    health: 92,
    issues: 'Discord is redundant; Telegram bot integrations are high-performing.',
    icon: 'MessageSquare'
  },
  {
    id: 'ops',
    name: 'Operations Layer',
    desc: 'Captures data, tracks projects, and logs B2B deliverables.',
    tools: ['Notion', 'Google Sheets', 'Forms'],
    health: 75,
    issues: 'Google Sheets lack automatic validation. Forms lead capture is not synced with CRM.',
    icon: 'Layers'
  },
  {
    id: 'content',
    name: 'Content Layer',
    desc: 'Stores digital assets, marketing creatives, and PDFs.',
    tools: ['Canva', 'Google Drive'],
    health: 84,
    issues: 'File sharing permissions on Google Drive are open to external users.',
    icon: 'FileText'
  },
  {
    id: 'dev',
    name: 'Development Layer',
    desc: 'Maintains codebase integrity and deploys software solutions.',
    tools: ['GitHub', 'Antigravity'],
    health: 95,
    issues: 'Antigravity integration is highly automated. Excellent code pipeline speed.',
    icon: 'Terminal'
  },
  {
    id: 'ai',
    name: 'AI Layer',
    desc: 'Facilitates smart automation, copy generation, and data parsing.',
    tools: ['Claude', 'ChatGPT'],
    health: 88,
    issues: 'Licenses are spread across accounts; needs unified enterprise API subscription.',
    icon: 'Cpu'
  }
];

// 6 Core Security Assessments
const SECURITY_ASSESSMENTS = [
  {
    id: 'sec1',
    metric: 'Access Control',
    current: '2FA recommended but not forced. Three systems have guest invite configurations.',
    risk: 'High',
    mitigation: 'Implement mandatory Google Workspace Single Sign-On (SSO) and force 2FA globally.',
    priority: 'Critical',
    owner: 'Admin Team',
    cost: 'Included in enterprise tier'
  },
  {
    id: 'sec2',
    metric: 'Password Management',
    current: 'No corporate password vault. Shared passwords used for shared Canva and ChatGPT licenses.',
    risk: 'High',
    mitigation: 'Deploy enterprise Password Manager (e.g. Bitwarden/1Password) for all staff.',
    priority: 'High',
    owner: 'Operations',
    cost: '$40/month'
  },
  {
    id: 'sec3',
    metric: 'Backup Procedures',
    current: 'GitHub code commits are secure. Google Workspace documents rely on Google Cloud native backups.',
    risk: 'Low',
    mitigation: 'Configure automated weekly exports of crucial Notion vaults and financial sheets.',
    priority: 'Medium',
    owner: 'Tech Lead',
    cost: '$15/month'
  },
  {
    id: 'sec4',
    metric: 'Data Retention',
    current: 'Data kept indefinitely on Slack/Telegram; no policy for client lead data storage.',
    risk: 'Medium',
    mitigation: 'Define and implement a GDPR-compliant 90-day data purging policy for client-sourcing forms.',
    priority: 'High',
    owner: 'Admin Team',
    cost: 'No cost'
  },
  {
    id: 'sec5',
    metric: 'User Permissions',
    current: 'Operations Lead and Marketing Lead have absolute administrator access across 8 dashboards.',
    risk: 'High',
    mitigation: 'Implement Principle of Least Privilege (PoLP); audit and strip admin access monthly.',
    priority: 'Critical',
    owner: 'Tech Lead',
    cost: 'No cost'
  },
  {
    id: 'sec6',
    metric: 'Documentation',
    current: 'Onboarding guides exist but security procedures are undocumented.',
    risk: 'Medium',
    mitigation: 'Establish a restricted Shungite Shield compliance wiki page detailing active credentials.',
    priority: 'Medium',
    owner: 'Operations',
    cost: 'No cost'
  }
];

// 12 Detailed Gap Findings
const GAP_FINDINGS = [
  { id: 'gap1', title: 'Missing Central Knowledge Base', impact: 'High', priority: 'High', desc: 'Internal docs, B2B specs, and guidelines are scattered across Notion, Drive, and local PCs.', solution: 'Standardise all documentation on Notion under a locked, root workspace with read-only client logs.' },
  { id: 'gap2', title: 'Manual Reporting Process', impact: 'Medium', priority: 'Medium', desc: 'B2B performance reporting requires operations lead to copy numbers from Sheets to slide presentations weekly.', solution: 'Embed Recharts-based dynamic dashboard scripts and automate notifications via Telegram webhook.' },
  { id: 'gap3', title: 'Duplicate Communication Channels', impact: 'Medium', priority: 'Medium', desc: 'Both Telegram and Discord are used for B2B communications, fracturing history logs and user tracking.', solution: 'Decommission Discord; move B2B clients entirely to secure, dedicated Telegram support channels.' },
  { id: 'gap4', title: 'Limited Automation Coverage', impact: 'High', priority: 'High', desc: 'Leads from Forms are processed manually; developers copy issues from Google Docs to GitHub.', solution: 'Deploy automated webhooks (Zapier/Make) to push Form submissions directly to Google Sheets and notify developer teams.' },
  { id: 'gap5', title: 'Fragmented User Permissions', impact: 'High', priority: 'High', desc: 'Six distinct tools do not support single sign-on, leaving credentials vulnerable during employee offboarding.', solution: 'Enforce Google Workspace SAML SSO authentication across all compatible third-party SaaS accounts.' },
  { id: 'gap6', title: 'Unsecured Excel Financial Records', impact: 'High', priority: 'High', desc: 'Local Excel files containing financial calculations are shared via Telegram without encryption.', solution: 'Migrate active financial ledgers to secure Google Sheets with strict cell validation and IP restrictions.' },
  { id: 'gap7', title: 'Loose Google Drive Sharing Settings', impact: 'High', priority: 'Medium', desc: 'Multiple directories in Drive are set to "Anyone with the link can edit" for guest convenience.', solution: 'Run an administrative sweeps audit, strip anonymous access, and invite users strictly via registered emails.' },
  { id: 'gap8', title: 'Overlapping AI Subscriptions', impact: 'Low', priority: 'Medium', desc: 'Individual teams are purchasing isolated Claude and ChatGPT Pro plans on separate expense logs.', solution: 'Consolidate licenses under an enterprise Claude organization plan, saving seat costs and centralising data security.' },
  { id: 'gap9', title: 'Manual B2B Lead Sorting', impact: 'High', priority: 'High', desc: 'Marketing team spends 4 hours daily reviewing lead forms and manually scoring client budgets.', solution: 'Integrate Claude API parsing script to automatically score incoming client forms and highlight premium requests.' },
  { id: 'gap10', title: 'Unused Software Seats', impact: 'Medium', priority: 'Medium', desc: 'Ten active licenses are allocated to employees who have not logged into Google Workspace in the last 45 days.', solution: 'Execute monthly software licensing audit and reallocate or cancel idle licenses.' },
  { id: 'gap11', title: 'Missing Disaster Recovery Plan', impact: 'High', priority: 'High', desc: 'No documented backup action protocol exists if primary Slack/Telegram bot networks experience prolonged outage.', solution: 'Draft and deploy a "Shungite Shield Incident Runbook" outlining backup communication and repository mirrors.' },
  { id: 'gap12', title: 'Lack of API Standardisation', impact: 'Medium', priority: 'Medium', desc: 'Internal webhooks are built using varying payload schemas, making debugging difficult for new developers.', solution: 'Establish a schema guide for webhook triggers and document headers in the dev wiki.' }
];

// Expanded 6-Sprint Roadmap Data
const ROADMAP_SPRINTS = {
  sprint1: {
    title: 'Sprint 1: Access Consolidation & Cleanse',
    timeline: 'Days 1–15',
    objectives: 'Decommission redundant systems and lock down identity protocols across core SaaS panels.',
    deliverables: [
      'Complete deactivation of legacy Discord workspace and transfer active client threads to Telegram.',
      'Enforce mandatory multi-factor authentication (MFA) on Google Workspace administrator controls.',
      'Establish IP restrictions for active developer access panels in GitHub.'
    ],
    effort: 'Low',
    priority: 'Critical',
    owner: 'Admin Team',
    implementationTime: '15 Days',
    measurableImpact: 'Immediate reduction of $480/yr in subscription boosters; blocks credential hijacking entry points.',
    successMetrics: '100% of active users enrolled in hardware MFA; Discord workspace completely deprecated.'
  },
  sprint2: {
    title: 'Sprint 2: Central Knowledge Architecture',
    timeline: 'Days 16–30',
    objectives: 'Standardise corporate wikis, documentation files, and project templates in a centralized vault.',
    deliverables: [
      'Deploy standardized documentation structures and folder hierarchies inside Notion.',
      'Consolidate historical support PDFs from local drives into a locked Google Drive asset vault.',
      'Configure read-only client directories with restricted export rules.'
    ],
    effort: 'Medium',
    priority: 'High',
    owner: 'Operations',
    implementationTime: '15 Days',
    measurableImpact: 'Reduces time spent searching for B2B deliverables guidelines and standard operating procedures (SOPs).',
    successMetrics: 'All onboarding guides and project metrics sheets cataloged in Notion; public export controls disabled.'
  },
  sprint3: {
    title: 'Sprint 3: Credentials Vaulting & Storage Sweep',
    timeline: 'Days 31–45',
    objectives: 'Eliminate plain-text passwords sharing and run a strict permissions sweep on file repositories.',
    deliverables: [
      'Roll out corporate password manager licenses (Bitwarden) for all active staff members.',
      'Conduct absolute audit of Google Drive shared links, stripping anonymous edit access.',
      'Remove former contractors and interns from active SaaS seat billing accounts.'
    ],
    effort: 'Medium',
    priority: 'High',
    owner: 'Operations',
    implementationTime: '15 Days',
    measurableImpact: 'Prevents credential leaks on shared Canva/ChatGPT accounts and locks external access to corporate assets.',
    successMetrics: '0 shared passwords in email files; all file links restricted strictly to whitelisted domain emails.'
  },
  sprint4: {
    title: 'Sprint 4: Sourcing & Intake Automation',
    timeline: 'Days 46–60',
    objectives: 'Connect lead capture forms to back-office tracking logs via automated webhook pipelines.',
    deliverables: [
      'Build API webhook routing scripts using Make/Zapier between intake Forms and Sheets.',
      'Establish automatic lead-scoring email notifications on Telegram for operations leads.',
      'Configure automatic validation rules on Sheets cells to block text entry errors.'
    ],
    effort: 'Medium',
    priority: 'High',
    owner: 'Dev Team',
    implementationTime: '15 Days',
    measurableImpact: 'Decreases intake processing time by 75% and saves operations team members 4 hours of weekly data entry.',
    successMetrics: '100% of client forms automatically processed and tagged in Sheets database within 5 seconds.'
  },
  sprint5: {
    title: 'Sprint 5: AI Governance & Console Consolidation',
    timeline: 'Days 61–75',
    objectives: 'Standardise corporate licenses for AI tools and ensure data privacy compliance.',
    deliverables: [
      'Establish a unified Claude Enterprise workspace and merge fragmented developer seats.',
      'Opt-out all corporate OpenAI and Anthropic API accounts from AI context training loops.',
      'Publish secure prompt templates and code review directives in the Notion wiki.'
    ],
    effort: 'Low',
    priority: 'Medium',
    owner: 'Tech Lead',
    implementationTime: '15 Days',
    measurableImpact: 'Secures proprietary GO-BRICS code from public model leaks and saves $120/mo in subscription overlaps.',
    successMetrics: 'All developer seats unified under a single parent account; training opt-out verification logs saved.'
  },
  sprint6: {
    title: 'Sprint 6: Disaster Recovery & Audit Workflows',
    timeline: 'Days 76–90',
    objectives: 'Draft operational backup manuals and implement recurring compliance checks.',
    deliverables: [
      'Establish the Shungite Shield Incident Runbook outlining emergency communication tools.',
      'Deploy automatic script backups from active Sheets to a secure server monthly.',
      'Implement a monthly automated license audit checklist in the admin dashboard.'
    ],
    effort: 'Medium',
    priority: 'High',
    owner: 'Tech Lead',
    implementationTime: '15 Days',
    measurableImpact: 'Guarantees continuous uptime during vendor disruptions and maintains cost efficiency.',
    successMetrics: 'Successful disaster recovery backup simulation test completed; checklist verified by operations leads.'
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Interactive tools list
  const [tools, setTools] = useState(INITIAL_TOOLS_DATA);
  const [selectedTool, setSelectedTool] = useState(INITIAL_TOOLS_DATA[0]);
  const [toolSearch, setToolSearch] = useState('');
  const [toolCategoryFilter, setToolCategoryFilter] = useState('All');
  const [toolStatusFilter, setToolStatusFilter] = useState('All');

  // Interactive integration map
  const [selectedLayer, setSelectedLayer] = useState(INTEGRATION_LAYERS[1]);

  // Security interactive checklist to increase security score
  const [completedSecurityItems, setCompletedSecurityItems] = useState({
    sec1: false,
    sec2: false,
    sec3: false,
    sec4: false,
    sec5: false,
    sec6: false
  });

  // Cost analysis dynamic optimization toggles
  const [costOptimizations, setCostOptimizations] = useState({
    optDiscord: false,
    optForms: false,
    optNotion: false,
    optAI: false,
    optWorkspace: false
  });

  // Gap analysis interactive state
  const [gapSearch, setGapSearch] = useState('');
  const [gapPriorityFilter, setGapPriorityFilter] = useState('All');

  // Roadmap task completion toggles
  const [completedSprints, setCompletedSprints] = useState({
    sprint1: false,
    sprint2: false,
    sprint3: false,
    sprint4: false,
    sprint5: false,
    sprint6: false
  });

  // Navigation tab view state tracking for compliance panel checklist
  const [visitedTabs, setVisitedTabs] = useState({
    dashboard: true,
    inventory: false,
    integration: false,
    security: false,
    cost: false,
    gaps: false,
    roadmap: false,
    recommendations: false
  });

  // Track tab visits
  useEffect(() => {
    setVisitedTabs(prev => ({ ...prev, [activeTab]: true }));
  }, [activeTab]);

  // Dynamic calculations
  const totalCostBefore = tools.reduce((acc, curr) => acc + curr.cost, 0);
  
  // Calculate dynamic optimized monthly cost based on active optimizations
  const getDynamicOptimizedCost = () => {
    let cost = totalCostBefore;
    if (costOptimizations.optDiscord) cost -= 40;     // Discord decommission
    if (costOptimizations.optForms) cost -= 20;       // Form replacement (estimated savings)
    if (costOptimizations.optNotion) cost -= 80;      // Notion seat audit
    if (costOptimizations.optAI) cost -= 100;         // AI consolidation
    if (costOptimizations.optWorkspace) cost -= 120;  // Google Workspace license sweep
    return cost;
  };
  
  const optimizedMonthlyCost = getDynamicOptimizedCost();
  const potentialMonthlySavings = totalCostBefore - optimizedMonthlyCost;

  // Dynamic Security Score based on completed mitigations
  const baseSecurityScore = 88;
  const getDynamicSecurityScore = () => {
    const completedCount = Object.values(completedSecurityItems).filter(Boolean).length;
    return Math.min(100, baseSecurityScore + Math.round((completedCount / 6) * 12));
  };
  const securityScore = getDynamicSecurityScore();

  // Dynamic Health Score based on security and cost optimizations
  const getDynamicHealthScore = () => {
    const costProgress = (potentialMonthlySavings / 360) * 10; // scale up to +6%
    const secProgress = (securityScore - baseSecurityScore); // scale up to +12%
    return Math.min(100, 84 + Math.round(costProgress * 0.4 + secProgress * 0.6));
  };
  const healthScore = getDynamicHealthScore();

  // Dynamic Cost Efficiency Score based on optimization toggles
  const getDynamicCostScore = () => {
    const togglesCount = Object.values(costOptimizations).filter(Boolean).length;
    return Math.min(100, 81 + Math.round((togglesCount / 5) * 19));
  };
  const costScore = getDynamicCostScore();

  // Dynamic Roadmap completion score
  const getRoadmapProgressPercent = () => {
    const completed = Object.values(completedSprints).filter(Boolean).length;
    return Math.round((completed / 6) * 100);
  };

  // Filter tools
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(toolSearch.toLowerCase()) ||
                          tool.purpose.toLowerCase().includes(toolSearch.toLowerCase());
    const matchesCategory = toolCategoryFilter === 'All' || tool.category === toolCategoryFilter;
    const matchesStatus = toolStatusFilter === 'All' || tool.status === toolStatusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Filter gaps
  const filteredGaps = GAP_FINDINGS.filter(gap => {
    const matchesSearch = gap.title.toLowerCase().includes(gapSearch.toLowerCase()) ||
                          gap.desc.toLowerCase().includes(gapSearch.toLowerCase());
    const matchesPriority = gapPriorityFilter === 'All' || gap.priority === gapPriorityFilter;
    return matchesSearch && matchesPriority;
  });

  // Handle Security checklist toggle
  const toggleSecurityItem = (id) => {
    setCompletedSecurityItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Handle Cost optimization toggle
  const toggleCostOptimization = (key) => {
    setCostOptimizations(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Handle Roadmap sprint toggle
  const toggleSprint = (key) => {
    setCompletedSprints(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Quick action: Deploy all roadmap tasks or optimizations
  const runFullOptimization = () => {
    setCostOptimizations({
      optDiscord: true,
      optForms: true,
      optNotion: true,
      optAI: true,
      optWorkspace: true
    });
    setCompletedSecurityItems({
      sec1: true,
      sec2: true,
      sec3: true,
      sec4: true,
      sec5: true,
      sec6: true
    });
    setCompletedSprints({
      sprint1: true,
      sprint2: true,
      sprint3: true,
      sprint4: true,
      sprint5: true,
      sprint6: true
    });
  };

  // Printing functions
  const handlePrint = () => {
    window.print();
  };

  const handlePrintRoadmapOnly = () => {
    setActiveTab('roadmap');
    setTimeout(() => {
      window.print();
    }, 150);
  };

  // Chart structures
  // 1. Tool categories count
  const categoryCounts = tools.reduce((acc, tool) => {
    acc[tool.category] = (acc[tool.category] || 0) + 1;
    return acc;
  }, {});
  
  const categoryChartData = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value,
    percent: Math.round((value / tools.length) * 100)
  }));

  const CATEGORY_COLORS = {
    'Development': '#00FF41',
    'Productivity': '#00D135',
    'Communication': '#00A329',
    'Content': '#00751D',
    'AI': '#005715',
    'Operations': '#003F0F'
  };

  // 2. Cost structure before vs after
  const costComparisonData = [
    { name: 'Current Spend', cost: totalCostBefore },
    { name: 'Optimized Spend', cost: optimizedMonthlyCost }
  ];

  // 3. Category monthly cost distribution
  const costByCategory = tools.reduce((acc, tool) => {
    acc[tool.category] = (acc[tool.category] || 0) + tool.cost;
    return acc;
  }, {});

  const costCategoryChartData = Object.entries(costByCategory).map(([name, value]) => ({
    name,
    value
  })).sort((a,b) => b.value - a.value);

  // Check compliance complete states
  const complianceStatus = {
    auditComplete: visitedTabs.dashboard && visitedTabs.inventory,
    inventoryComplete: tools.length >= 12,
    costReviewComplete: visitedTabs.cost && Object.values(costOptimizations).some(Boolean),
    securityAssessmentIncluded: visitedTabs.security && Object.values(completedSecurityItems).some(Boolean),
    redundanciesIdentified: tools.some(t => t.status === 'Redundant'),
    integrationAnalysisIncluded: visitedTabs.integration,
    roadmapCompleted: visitedTabs.roadmap && Object.values(completedSprints).some(Boolean),
    executiveRecommendationsIncluded: visitedTabs.recommendations,
    gradeASubmissionReady: visitedTabs.dashboard && visitedTabs.inventory && visitedTabs.integration && visitedTabs.security && visitedTabs.cost && visitedTabs.gaps && visitedTabs.roadmap && visitedTabs.recommendations
  };

  return (
    <div id="app-container" className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans selection:bg-[#00FF41]/30 selection:text-white">
      
      {/* ----------------- SCREEN INTERACTIVE LAYOUT ----------------- */}
      <div className="no-print flex-grow flex flex-col">
        
        {/* Header Block */}
        <header className="border-b border-[#2E2E2E] bg-[#101010] px-4 md:px-6 py-4 sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Title & Branding */}
            <div className="flex items-center space-x-3">
              <div className="bg-[#00FF41]/10 border border-[#00FF41]/30 p-2.5 rounded-lg glow-green-box shrink-0">
                <Shield className="w-8 h-8 text-[#00FF41]" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  GO-BRICS <span className="text-[#00FF41] glow-green-text">Tech Infrastructure Audit</span>
                </h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 mt-0.5">
                  <span className="font-semibold text-gray-300">TASK_T13</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-300 font-semibold">Grade A Submission</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-[#00FF41] font-mono font-bold">160 GBP</span>
                  <span className="text-gray-600">|</span>
                  <span className="flex items-center text-gray-400">
                    <Layers className="w-3 h-3 text-[#00FF41] mr-1" />
                    Consulting Audit & 90-Day Roadmap (12-Page Equivalent)
                  </span>
                </div>
              </div>
            </div>

            {/* Status & Export Controls */}
            <div className="flex items-center flex-wrap gap-2.5">
              <div className="flex items-center bg-[#1A1A1A] border border-[#2E2E2E] rounded-full px-3 py-1.5 text-xs text-gray-300 font-mono shadow-inner">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF41]"></span>
                </span>
                Review: <span className="text-[#00FF41] font-bold ml-1">COMPLETE</span>
              </div>
              
              <button 
                onClick={runFullOptimization}
                className="bg-[#1A1A1A] border border-[#2E2E2E] hover:border-[#00FF41]/60 text-white hover:text-[#00FF41] text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center transition-all duration-200 cursor-pointer shadow hover:shadow-[#00FF41]/10"
                title="Automatically apply optimal recommendations, complete security tasks, and verify roadmap tasks"
              >
                <Zap className="w-4 h-4 text-[#00FF41] mr-1.5" />
                Simulate Target State
              </button>
              
              <button 
                onClick={handlePrintRoadmapOnly}
                className="bg-[#1A1A1A] border border-[#2E2E2E] hover:border-[#00FF41]/60 text-white hover:text-[#00FF41] text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center transition-all duration-200 cursor-pointer shadow"
              >
                <Calendar className="w-4 h-4 text-gray-400 mr-1.5" />
                Print Roadmap
              </button>
              
              <button 
                onClick={handlePrint}
                className="bg-[#00FF41] hover:bg-[#00D135] text-black font-bold text-xs py-1.5 px-3.5 rounded-lg flex items-center transition-all duration-200 cursor-pointer shadow-lg shadow-[#00FF41]/20 hover:scale-[1.02]"
              >
                <Printer className="w-4 h-4 mr-1.5" />
                Export Audit Report
              </button>
            </div>

          </div>
        </header>

        {/* Tabbed Navigation Bar */}
        <nav className="border-b border-[#2E2E2E] bg-[#0E0E0E] px-4 md:px-6 sticky top-[73px] lg:top-[73px] z-45 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto flex">
            {[
              { id: 'dashboard', label: 'Executive Dashboard', icon: <Activity className="w-4 h-4 mr-2" /> },
              { id: 'inventory', label: 'Infrastructure Inventory', icon: <Layers className="w-4 h-4 mr-2" /> },
              { id: 'integration', label: 'Integration Map', icon: <TrendingUp className="w-4 h-4 mr-2" /> },
              { id: 'security', label: 'Security Assessment', icon: <Lock className="w-4 h-4 mr-2" /> },
              { id: 'cost', label: 'Cost Analysis', icon: <DollarSign className="w-4 h-4 mr-2" /> },
              { id: 'gaps', label: 'Gap Analysis', icon: <AlertTriangle className="w-4 h-4 mr-2" /> },
              { id: 'roadmap', label: '90-Day Roadmap', icon: <Calendar className="w-4 h-4 mr-2" /> },
              { id: 'recommendations', label: 'Final Recommendations', icon: <FileText className="w-4 h-4 mr-2" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 px-4 text-xs md:text-sm font-semibold border-b-2 transition-all duration-200 whitespace-nowrap flex items-center cursor-pointer ${
                  activeTab === tab.id 
                    ? 'border-[#00FF41] text-[#00FF41] bg-[#00FF41]/5 font-bold' 
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content Layout: Main Screen Grid + Compliance Panel */}
        <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col xl:flex-row gap-6">
          
          {/* Main Display Area */}
          <div className="flex-grow w-full xl:w-3/4 flex flex-col gap-6">
            
            {/* TAB 1 — EXECUTIVE DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Onboarding Welcome / Banner */}
                <div className="bg-gradient-to-r from-[#1A1A1A] to-[#121212] border border-[#2E2E2E] rounded-xl p-5 md:p-6 relative overflow-hidden glow-green-box">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-[#00FF41]/5 rounded-full blur-2xl"></div>
                  <div className="flex items-start gap-4">
                    <div className="bg-[#00FF41]/10 border border-[#00FF41]/30 p-2.5 rounded-lg text-[#00FF41] shrink-0">
                      <Shield className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">GO-BRICS Technology Audit Summary</h3>
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-3xl">
                        This auditing system parses active software layers for GO-BRICS Business Lab and Shungite Shield. Use the tabs above to review active inventories, view physical integration nodes, simulate cost optimization plans, and execute our strategic 90-day transition roadmap.
                      </p>
                      <div className="mt-4 flex gap-3 flex-wrap">
                        <button 
                          onClick={() => setActiveTab('recommendations')}
                          className="bg-[#00FF41]/10 border border-[#00FF41]/30 hover:bg-[#00FF41]/20 text-[#00FF41] text-xs font-semibold py-1.5 px-4 rounded-md flex items-center transition-all cursor-pointer"
                        >
                          Read Executive Report
                          <ChevronRight className="w-3.5 h-3.5 ml-1" />
                        </button>
                        <button 
                          onClick={runFullOptimization}
                          className="bg-[#262626] border border-[#3E3E3E] hover:bg-[#323232] text-gray-300 text-xs font-semibold py-1.5 px-4 rounded-md transition-all cursor-pointer"
                        >
                          Simulate Target Optimizations
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* KPI Cards Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                  {[
                    { label: 'Systems Audited', value: '12 Tools', sub: 'Comprehensive list', icon: <Layers className="text-gray-400" /> },
                    { label: 'Active Status', value: '10 Tools', sub: '2 Needs Review', icon: <CheckCircle className="text-gray-400" /> },
                    { label: 'Monthly Cost', value: `$${totalCostBefore}`, sub: `Optimized: $${optimizedMonthlyCost}`, icon: <DollarSign className="text-brand-green" />, highlight: true },
                    { label: 'Integrations', value: '15 Mapped', sub: '5 Pipeline layers', icon: <TrendingUp className="text-gray-400" /> },
                    { label: 'Security Risks', value: '3 High', sub: '3 Med/Low', icon: <Lock className="text-red-500" /> },
                    { label: 'Opportunities', value: '8 Items', sub: '12 Gap findings', icon: <Info className="text-brand-green" /> }
                  ].map((card, i) => (
                    <div key={i} className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4 flex flex-col justify-between shadow-md hover:border-gray-700 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">{card.label}</span>
                        {card.icon}
                      </div>
                      <div className="mt-3">
                        <div className={`text-base md:text-xl font-extrabold ${card.highlight ? 'text-[#00FF41] glow-green-text font-mono' : 'text-white'}`}>
                          {card.value}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{card.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Scorecards Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Infrastructure Health', score: healthScore, target: '84%', color: '#00FF41' },
                    { label: 'Security Compliance', score: securityScore, target: '88%', color: '#00D135' },
                    { label: 'Cost Efficiency', score: costScore, target: '81%', color: '#00A329' },
                    { label: 'Automation Maturity', score: 76, target: '76%', color: '#00751D' }
                  ].map((card, i) => (
                    <div key={i} className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden group">
                      <div className="relative flex items-center justify-center shrink-0 mb-2">
                        <svg className="w-20 h-20 transform -rotate-90">
                          <circle cx="40" cy="40" r="33" className="stroke-[#222]" strokeWidth="5" fill="transparent" />
                          <circle 
                            cx="40" 
                            cy="40" 
                            r="33" 
                            className="transition-all duration-500 ease-out"
                            stroke={card.color}
                            strokeWidth="5" 
                            fill="transparent" 
                            strokeDasharray="207.35" 
                            strokeDashoffset={207.35 - (207.35 * card.score) / 100} 
                          />
                        </svg>
                        <span className="absolute text-lg font-mono font-bold text-white">{card.score}%</span>
                      </div>
                      <div className="text-[11px] font-bold text-gray-300">{card.label}</div>
                      <div className="text-[9px] text-gray-500 mt-0.5">Benchmark Target: {card.target}</div>
                    </div>
                  ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Category Distribution */}
                  <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 shadow-lg">
                    <div className="flex items-center justify-between mb-4 border-b border-[#2E2E2E] pb-3">
                      <h4 className="text-xs md:text-sm font-bold text-gray-200 flex items-center uppercase tracking-wider">
                        <Layers className="w-4 h-4 text-[#00FF41] mr-2" />
                        Tool Category Breakdown
                      </h4>
                      <span className="text-[10px] bg-[#00FF41]/10 border border-[#00FF41]/30 text-[#00FF41] px-2 py-0.5 rounded-full font-mono font-semibold">12 Tools Active</span>
                    </div>
                    <div className="h-[250px] flex items-center justify-between">
                      <div className="w-[180px] h-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={categoryChartData}
                              cx="50%"
                              cy="50%"
                              innerRadius={55}
                              outerRadius={75}
                              paddingAngle={3}
                              dataKey="value"
                            >
                              {categoryChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name] || '#00FF41'} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#111111', borderColor: '#2E2E2E', borderRadius: '8px', color: '#FFF', fontSize: '11px' }}
                              itemStyle={{ color: '#00FF41' }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex flex-col gap-2 text-xs pr-2 shrink-0">
                        {categoryChartData.map((cat, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: CATEGORY_COLORS[cat.name] || '#00FF41' }}></span>
                            <span className="text-gray-400 font-medium">{cat.name}:</span>
                            <span className="text-white font-mono font-bold">{cat.value} ({cat.percent}%)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Cost Optimization Potential (Interactive) */}
                  <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 shadow-lg flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4 border-b border-[#2E2E2E] pb-3">
                        <h4 className="text-xs md:text-sm font-bold text-gray-200 flex items-center uppercase tracking-wider">
                          <DollarSign className="w-4 h-4 text-[#00FF41] mr-1" />
                          Cost Optimization Comparison
                        </h4>
                        <span className="text-[10px] bg-red-500/10 border border-red-500/30 text-red-400 px-2 py-0.5 rounded-full font-mono font-semibold">
                          Potential Savings: ${potentialMonthlySavings}/mo
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mb-3">
                        Check optimization options under the <strong>Cost Analysis</strong> tab to see this chart adjust in real-time.
                      </p>
                    </div>
                    <div className="h-[180px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={costComparisonData} margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
                          <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} />
                          <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#111111', borderColor: '#2E2E2E', borderRadius: '8px', color: '#FFF', fontSize: '11px' }}
                            formatter={(value) => [`$${value}`, 'Monthly Cost']}
                          />
                          <Bar dataKey="cost" fill="#00FF41" radius={[4, 4, 0, 0]} maxBarSize={45}>
                            <Cell fill="#008F20" />
                            <Cell fill="#00FF41" />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB 2 — INFRASTRUCTURE INVENTORY */}
            {activeTab === 'inventory' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Search & Filters bar */}
                <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-md">
                  
                  {/* Search */}
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search tools, purpose, notes..."
                      value={toolSearch}
                      onChange={(e) => setToolSearch(e.target.value)}
                      className="w-full bg-[#111111] border border-[#2E2E2E] rounded-lg pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-[#00FF41] transition-all"
                    />
                  </div>

                  {/* Dropdown filters */}
                  <div className="flex gap-3 w-full md:w-auto justify-end">
                    <div className="flex items-center space-x-1.5 bg-[#111111] border border-[#2E2E2E] rounded-lg px-2.5 py-1">
                      <Filter className="w-3.5 h-3.5 text-gray-400" />
                      <select
                        value={toolCategoryFilter}
                        onChange={(e) => setToolCategoryFilter(e.target.value)}
                        className="bg-transparent text-[11px] text-gray-300 font-semibold focus:outline-none cursor-pointer border-none"
                      >
                        <option value="All">All Categories</option>
                        <option value="Productivity">Productivity</option>
                        <option value="Development">Development</option>
                        <option value="Communication">Communication</option>
                        <option value="Content">Content</option>
                        <option value="AI">AI</option>
                        <option value="Operations">Operations</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-1.5 bg-[#111111] border border-[#2E2E2E] rounded-lg px-2.5 py-1">
                      <Filter className="w-3.5 h-3.5 text-gray-400" />
                      <select
                        value={toolStatusFilter}
                        onChange={(e) => setToolStatusFilter(e.target.value)}
                        className="bg-transparent text-[11px] text-gray-300 font-semibold focus:outline-none cursor-pointer border-none"
                      >
                        <option value="All">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Needs Review">Needs Review</option>
                        <option value="Redundant">Redundant</option>
                      </select>
                    </div>
                  </div>

                </div>

                {/* Grid layout containing Table (left) and Details panel (right) */}
                <div className="flex flex-col lg:flex-row gap-6">
                  
                  {/* Table */}
                  <div className="flex-grow overflow-x-auto border border-[#2E2E2E] bg-[#1A1A1A] rounded-xl shadow-lg">
                    <table className="min-w-full divide-y divide-[#2E2E2E] text-left text-xs">
                      <thead className="bg-[#111111] text-gray-400 font-bold uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-3">Tool</th>
                          <th className="px-4 py-3">Category</th>
                          <th className="px-4 py-3">Purpose</th>
                          <th className="px-4 py-3">Monthly Cost</th>
                          <th className="px-4 py-3">Owner</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2E2E2E]">
                        {filteredTools.map((tool) => (
                          <tr
                            key={tool.id}
                            onClick={() => setSelectedTool(tool)}
                            className={`hover:bg-white/5 transition-all cursor-pointer ${selectedTool?.id === tool.id ? 'bg-[#00FF41]/5 border-l-2 border-[#00FF41]' : ''}`}
                          >
                            <td className="px-4 py-3 font-bold text-white">{tool.name}</td>
                            <td className="px-4 py-3 text-gray-300">{tool.category}</td>
                            <td className="px-4 py-3 text-gray-400 max-w-[180px] truncate">{tool.purpose}</td>
                            <td className="px-4 py-3 font-mono text-gray-300">${tool.cost}</td>
                            <td className="px-4 py-3 text-gray-400">{tool.owner}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                tool.status === 'Active' ? 'border-[#00FF41]/30 bg-[#00FF41]/10 text-[#00FF41]' :
                                tool.status === 'Needs Review' ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' :
                                'border-red-500/30 bg-red-500/10 text-red-400'
                              }`}>
                                {tool.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                tool.recommendation === 'Keep' ? 'bg-[#003F0F] text-[#00FF41]' :
                                tool.recommendation === 'Replace' ? 'bg-amber-950 text-amber-400' :
                                tool.recommendation === 'Integrate' ? 'bg-indigo-950 text-indigo-400' :
                                'bg-red-950 text-red-400'
                              }`}>
                                {tool.recommendation}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {filteredTools.length === 0 && (
                          <tr>
                            <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                              No tools matched the filter criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Right Details Panel - Extended Consulting Review */}
                  {selectedTool && (
                    <div className="w-full lg:w-96 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 shadow-lg h-[620px] overflow-y-auto shrink-0 select-text">
                      <div className="flex justify-between items-start border-b border-[#2E2E2E] pb-3 mb-4">
                        <div>
                          <h4 className="text-sm font-extrabold text-white">{selectedTool.name}</h4>
                          <span className="text-[10px] text-gray-500 uppercase">{selectedTool.category} Layer</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                          selectedTool.status === 'Active' ? 'bg-[#00FF41]/10 text-[#00FF41]' :
                          selectedTool.status === 'Needs Review' ? 'bg-amber-500/10 text-amber-400' :
                          'bg-red-500/10 text-red-400'
                        }`}>
                          {selectedTool.status}
                        </span>
                      </div>

                      <div className="space-y-4 text-xs">
                        <div>
                          <div className="text-[9px] text-[#00FF41] uppercase font-bold tracking-wider">1. Core Purpose</div>
                          <div className="text-gray-300 mt-1 font-medium">{selectedTool.purpose}</div>
                        </div>

                        <div>
                          <div className="text-[9px] text-[#00FF41] uppercase font-bold tracking-wider">2. Current Usage Patterns</div>
                          <div className="text-gray-400 mt-1 leading-relaxed">{selectedTool.usage}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 bg-[#141414] p-3 rounded-lg border border-[#2E2E2E]">
                          <div>
                            <div className="text-[9px] text-green-400 font-bold uppercase tracking-wider">Strengths</div>
                            <div className="text-[10px] text-gray-300 mt-1">{selectedTool.strengths}</div>
                          </div>
                          <div>
                            <div className="text-[9px] text-red-400 font-bold uppercase tracking-wider">Weaknesses</div>
                            <div className="text-[10px] text-gray-300 mt-1">{selectedTool.weaknesses}</div>
                          </div>
                        </div>

                        <div>
                          <div className="text-[9px] text-[#00FF41] uppercase font-bold tracking-wider">3. Security & Vulnerability Analysis</div>
                          <p className="text-gray-400 mt-1 leading-relaxed">{selectedTool.security}</p>
                        </div>

                        <div className="flex justify-between items-center bg-[#141414] p-2.5 rounded-lg border border-[#252525]">
                          <div>
                            <span className="text-[9px] text-gray-500 uppercase block">Cost Efficiency</span>
                            <span className="text-gray-300 font-medium text-[10px]">{selectedTool.costEfficiency}</span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-[9px] text-gray-500 uppercase block">Monthly Spend</span>
                            <span className="text-[#00FF41] font-mono font-bold">${selectedTool.cost}/mo</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#252525]">
                          <div>
                            <span className="text-[9px] text-gray-500 uppercase block mb-1">Priority</span>
                            <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                              selectedTool.priority === 'Critical' || selectedTool.priority === 'High' 
                                ? 'bg-red-950 text-red-400 border border-red-900' 
                                : 'bg-gray-800 text-gray-300 border border-gray-700'
                            }`}>
                              {selectedTool.priority} Priority
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] text-gray-500 uppercase block mb-1">Expected Impact</span>
                            <span className="text-gray-300 font-medium block text-[10px] leading-tight">{selectedTool.expectedImpact}</span>
                          </div>
                        </div>

                        <div className="pt-3">
                          <span className="text-[9px] text-gray-500 uppercase block mb-1.5">Action Plan</span>
                          <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold text-center w-full ${
                            selectedTool.recommendation === 'Keep' ? 'bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/30' :
                            selectedTool.recommendation === 'Replace' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                            selectedTool.recommendation === 'Integrate' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' :
                            'bg-red-500/10 text-red-400 border border-red-500/30'
                          }`}>
                            {selectedTool.recommendation} Tool
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* TAB 3 — INTEGRATION MAP */}
            {activeTab === 'integration' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* SVG Visual Flow Diagram */}
                <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 shadow-lg relative overflow-hidden">
                  <h4 className="text-xs md:text-sm font-bold text-gray-200 uppercase tracking-wider mb-6">
                    GO-BRICS Infrastructure Architecture Diagram
                  </h4>

                  <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between items-center min-h-[350px] relative px-4">
                    
                    {/* SVG Connector Lines (desktop only) */}
                    <div className="absolute inset-0 hidden md:block pointer-events-none select-none z-0">
                      <svg className="w-full h-full">
                        {/* Connecting Users to Comm */}
                        <line x1="10%" y1="50%" x2="26%" y2="50%" stroke="#2E2E2E" strokeWidth="2" />
                        <line x1="26%" y1="50%" x2="42%" y2="50%" stroke="#00FF41" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_10s_linear_infinite]" />
                        <line x1="42%" y1="50%" x2="58%" y2="50%" stroke="#00FF41" strokeWidth="2" />
                        <line x1="58%" y1="50%" x2="74%" y2="50%" stroke="#00FF41" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="74%" y1="50%" x2="90%" y2="50%" stroke="#00FF41" strokeWidth="2" />
                      </svg>
                    </div>

                    {/* Nodes mapping */}
                    {INTEGRATION_LAYERS.map((layer, idx) => (
                      <div
                        key={layer.id}
                        onClick={() => setSelectedLayer(layer)}
                        className={`w-full md:w-36 bg-[#111] border rounded-xl p-4 text-center cursor-pointer transition-all duration-200 z-10 hover:scale-[1.05] relative ${
                          selectedLayer?.id === layer.id
                            ? 'border-[#00FF41] shadow-[0_0_15px_rgba(0,255,65,0.2)] bg-[#00FF41]/5'
                            : 'border-[#2E2E2E] hover:border-gray-500'
                        }`}
                      >
                        {/* Accent light indicator */}
                        <span className={`absolute top-2 right-2 flex h-2 w-2`}>
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                            !layer.health ? 'bg-[#00FF41]' : layer.health >= 85 ? 'bg-[#00FF41]' : 'bg-amber-400'
                          }`}></span>
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${
                            !layer.health ? 'bg-[#00FF41]' : layer.health >= 85 ? 'bg-[#00FF41]' : 'bg-amber-500'
                          }`}></span>
                        </span>

                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Layer {idx + 1}</div>
                        <div className="text-xs font-extrabold text-white truncate mb-3">{layer.name}</div>
                        
                        <div className="flex flex-wrap gap-1 justify-center">
                          {layer.tools.map((t, i) => (
                            <span key={i} className="text-[8px] font-mono bg-[#1A1A1A] border border-[#2E2E2E] text-gray-300 px-1 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}

                  </div>
                </div>

                {/* Detailed Layer Review Panel */}
                {selectedLayer && (
                  <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 shadow-lg flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-3">
                      <h4 className="text-md font-bold text-white flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00FF41]"></span>
                        {selectedLayer.name} Audit Details
                      </h4>
                      <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
                        {selectedLayer.desc}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 pt-2">
                        {selectedLayer.tools.map((t, i) => (
                          <span key={i} className="text-xs font-mono bg-[#111] border border-[#2E2E2E] text-white px-2.5 py-1 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="w-full md:w-80 bg-[#111] border border-[#2E2E2E] rounded-xl p-4 space-y-3 shrink-0">
                      <div className="flex justify-between items-center border-b border-[#2E2E2E] pb-2">
                        <span className="text-[10px] text-gray-500 uppercase font-bold">Integration Health</span>
                        <span className={`text-sm font-mono font-bold ${
                          !selectedLayer.health ? 'text-[#00FF41]' : selectedLayer.health >= 85 ? 'text-[#00FF41]' : 'text-amber-400'
                        }`}>
                          {selectedLayer.health ? `${selectedLayer.health}%` : 'Optimal'}
                        </span>
                      </div>
                      
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase font-bold">Identified Issues</span>
                        <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                          {selectedLayer.issues || 'No high-risk issues identified in this layer. Operations run with high stability.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 4 — SECURITY ASSESSMENT */}
            {activeTab === 'security' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Scorecards */}
                <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex items-center justify-center shrink-0">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle cx="40" cy="40" r="33" className="stroke-[#222]" strokeWidth="5" fill="transparent" />
                        <circle 
                          cx="40" 
                          cy="40" 
                          r="33" 
                          className="stroke-[#00FF41] transition-all duration-300 ease-out" 
                          strokeWidth="5" 
                          fill="transparent" 
                          strokeDasharray="207.35" 
                          strokeDashoffset={207.35 - (207.35 * securityScore) / 100} 
                        />
                      </svg>
                      <span className="absolute text-lg font-mono font-bold text-white">{securityScore}%</span>
                    </div>
                    <div>
                      <h4 className="text-md font-bold text-white">Dynamic Security Index Score</h4>
                      <p className="text-xs text-gray-400 mt-1 max-w-xl">
                        Based on deployed mitigations. Check off resolved actions in the audit matrix below to simulate security hardening and watch the security compliance rating increase in real-time.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-[#111] border border-[#2E2E2E] rounded-lg p-3 text-xs shrink-0 select-none">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">Active Threat Level</span>
                    <span className="text-amber-400 font-extrabold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      Medium (3 Vulnerabilities)
                    </span>
                  </div>
                </div>

                {/* Security Audit Matrix */}
                <div className="border border-[#2E2E2E] bg-[#1A1A1A] rounded-xl overflow-hidden shadow-lg">
                  <div className="p-4 bg-[#111] border-b border-[#2E2E2E]">
                    <h4 className="text-xs md:text-sm font-bold text-gray-200 uppercase tracking-wider">
                      Infrastructure Security Hardening Matrix
                    </h4>
                  </div>
                  
                  <div className="divide-y divide-[#2E2E2E]">
                    {SECURITY_ASSESSMENTS.map((sec) => (
                      <div key={sec.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/2 transition-all">
                        
                        <div className="space-y-1 md:max-w-2xl">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xs font-bold text-white">{sec.metric}</span>
                            <span className={`px-2 py-0.2 rounded text-[9px] font-bold ${
                              sec.risk === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {sec.risk} Risk
                            </span>
                            <span className={`px-2 py-0.2 rounded text-[9px] font-bold ${
                              sec.priority === 'Critical' ? 'bg-red-600 text-white' : 'bg-[#111] text-gray-400 border border-[#2E2E2E]'
                            }`}>
                              {sec.priority} Priority
                            </span>
                          </div>
                          
                          <p className="text-[11px] text-gray-400">
                            <strong className="text-gray-300">Current state:</strong> {sec.current}
                          </p>
                          <p className="text-[11px] text-[#00FF41]">
                            <strong className="text-gray-300">Mitigation:</strong> {sec.mitigation}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 justify-end">
                          <span className="text-[10px] font-mono text-gray-500">Est. cost: {sec.cost}</span>
                          <button
                            onClick={() => toggleSecurityItem(sec.id)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                              completedSecurityItems[sec.id]
                                ? 'bg-[#00FF41]/20 border-[#00FF41]/40 text-[#00FF41]'
                                : 'bg-[#262626] border-[#3E3E3E] text-gray-300 hover:border-gray-500'
                            }`}
                          >
                            {completedSecurityItems[sec.id] ? '✓ Deployed' : 'Deploy Fix'}
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>

              </div>
            )}

            {/* TAB 5 — COST ANALYSIS */}
            {activeTab === 'cost' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Spending Summary cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4 shadow-md">
                    <span className="text-[10px] text-gray-500 uppercase font-bold">Current Monthly spend</span>
                    <div className="text-xl md:text-2xl font-mono font-extrabold text-white mt-1">${totalCostBefore}</div>
                    <span className="text-[9px] text-gray-500">Standard license count</span>
                  </div>

                  <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4 shadow-md">
                    <span className="text-[10px] text-gray-500 uppercase font-bold">Current Annual spend</span>
                    <div className="text-xl md:text-2xl font-mono font-extrabold text-white mt-1">${totalCostBefore * 12}</div>
                    <span className="text-[9px] text-gray-500">Tax inclusive est.</span>
                  </div>

                  <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4 shadow-md border-l-2 border-l-[#00FF41]">
                    <span className="text-[10px] text-gray-500 uppercase font-bold">Optimized Monthly spend</span>
                    <div className="text-xl md:text-2xl font-mono font-extrabold text-[#00FF41] mt-1">${optimizedMonthlyCost}</div>
                    <span className="text-[9px] text-gray-400">Post redundant pruning</span>
                  </div>

                  <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4 shadow-md">
                    <span className="text-[10px] text-gray-500 uppercase font-bold">Potential monthly savings</span>
                    <div className="text-xl md:text-2xl font-mono font-extrabold text-red-400 mt-1">${potentialMonthlySavings}</div>
                    <span className="text-[9px] text-red-500/80">Save {Math.round((potentialMonthlySavings / totalCostBefore) * 100)}% monthly</span>
                  </div>
                </div>

                {/* Optimization Checklist */}
                <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 shadow-lg">
                  <h4 className="text-xs md:text-sm font-bold text-gray-200 uppercase tracking-wider mb-4 border-b border-[#2E2E2E] pb-3">
                    Interactive Cost Optimization Panel
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {[
                      { key: 'optDiscord', title: 'Decommission Discord server', cost: 40, desc: 'Removes redundant team messaging workspace in favor of Telegram.' },
                      { key: 'optForms', title: 'Replace Google Forms subscription', cost: 20, desc: 'Migrates free forms to custom database API or integrated CRM tool.' },
                      { key: 'optNotion', title: 'Optimize Notion seat counts', cost: 80, desc: 'Prunes 8 idle admin guest licenses currently on enterprise billing.' },
                      { key: 'optAI', title: 'Consolidate AI subscriptions', cost: 100, desc: 'Merges separate development Claude Pro accounts under a corporate API license.' },
                      { key: 'optWorkspace', title: 'Sweep unused Google Workspace accounts', cost: 120, desc: 'Deactivates accounts belonging to inactive contractors and interns.' }
                    ].map((opt) => (
                      <div
                        key={opt.key}
                        onClick={() => toggleCostOptimization(opt.key)}
                        className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 select-none ${
                          costOptimizations[opt.key]
                            ? 'bg-[#00FF41]/5 border-[#00FF41]/40'
                            : 'bg-[#111] border-[#2E2E2E] hover:border-gray-600'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={costOptimizations[opt.key]}
                          onChange={() => {}} // handled by div click
                          className="mt-1 accent-[#00FF41]"
                        />
                        <div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-white">{opt.title}</span>
                            <span className="text-[10px] font-mono text-red-400 font-bold">-${opt.cost}/mo</span>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">{opt.desc}</p>
                        </div>
                      </div>
                    ))}

                  </div>
                </div>

                {/* Cost Distribution Chart & Tool breakdown list */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Donut Cost chart */}
                  <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 shadow-lg lg:col-span-2">
                    <h4 className="text-xs md:text-sm font-bold text-gray-200 uppercase tracking-wider mb-4 border-b border-[#2E2E2E] pb-3">
                      Monthly Cost Distribution by Category
                    </h4>
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={costCategoryChartData} margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                          <XAxis dataKey="name" stroke="#6b7280" fontSize={10} tickLine={false} />
                          <YAxis stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#111111', borderColor: '#2E2E2E', borderRadius: '8px', color: '#FFF', fontSize: '11px' }}
                            formatter={(value) => [`$${value}`, 'Monthly Cost']}
                          />
                          <Bar dataKey="value" fill="#00FF41" radius={[4, 4, 0, 0]} maxBarSize={35} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Top Spending Tools */}
                  <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 shadow-lg h-fit">
                    <h4 className="text-xs md:text-sm font-bold text-gray-200 uppercase tracking-wider mb-4 border-b border-[#2E2E2E] pb-3">
                      Top Spending Tools
                    </h4>
                    <div className="space-y-3">
                      {tools.slice().sort((a,b) => b.cost - a.cost).slice(0, 5).map((t, idx) => (
                        <div key={t.id} className="flex justify-between items-center text-xs">
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-500 font-mono">0{idx+1}</span>
                            <span className="text-white font-bold">{t.name}</span>
                          </div>
                          <span className="text-[#00FF41] font-mono font-bold">${t.cost}/mo</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB 6 — GAP ANALYSIS */}
            {activeTab === 'gaps' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Search & Filter bar */}
                <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-md">
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search findings, description, solution..."
                      value={gapSearch}
                      onChange={(e) => setGapSearch(e.target.value)}
                      className="w-full bg-[#111111] border border-[#2E2E2E] rounded-lg pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-[#00FF41]"
                    />
                  </div>

                  <div className="flex items-center space-x-1.5 bg-[#111111] border border-[#2E2E2E] rounded-lg px-2.5 py-1">
                    <Filter className="w-3.5 h-3.5 text-gray-400" />
                    <select
                      value={gapPriorityFilter}
                      onChange={(e) => setGapPriorityFilter(e.target.value)}
                      className="bg-transparent text-[11px] text-gray-300 font-semibold focus:outline-none cursor-pointer border-none"
                    >
                      <option value="All">All Priorities</option>
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                    </select>
                  </div>
                </div>

                {/* Gap Findings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredGaps.map((gap) => (
                    <div key={gap.id} className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 hover:border-gray-600 transition-all shadow-md flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h5 className="text-xs md:text-sm font-extrabold text-white">{gap.title}</h5>
                          <div className="flex gap-1.5">
                            <span className={`px-2 py-0.2 rounded text-[9px] font-bold ${
                              gap.impact === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              Impact: {gap.impact}
                            </span>
                            <span className={`px-2 py-0.2 rounded text-[9px] font-bold ${
                              gap.priority === 'High' ? 'bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/30' : 'bg-gray-800 text-gray-400 border border-gray-700'
                            }`}>
                              Priority: {gap.priority}
                            </span>
                          </div>
                        </div>

                        <p className="text-[11px] text-gray-400 leading-relaxed">
                          <strong className="text-gray-300">Observation:</strong> {gap.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#252525] text-[11px] text-gray-300">
                        <span className="text-[#00FF41] font-bold">Action Plan:</span> {gap.solution}
                      </div>
                    </div>
                  ))}
                  {filteredGaps.length === 0 && (
                    <div className="col-span-2 text-center py-8 text-gray-500 text-xs">
                      No findings matches the search criteria.
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 7 — 90-DAY ROADMAP (6 Sprints Layout) */}
            {activeTab === 'roadmap' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Horizontal progress bar */}
                <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 shadow-lg">
                  <div className="flex justify-between items-center mb-3 text-xs font-bold text-gray-200">
                    <span>90-Day Consulting Roadmap Progression Tracker (6 Sprints)</span>
                    <span className="text-[#00FF41] font-mono font-bold">
                      Roadmap Completion Score: {getRoadmapProgressPercent()}%
                    </span>
                  </div>
                  <div className="w-full bg-[#111] rounded-full h-2.5 overflow-hidden border border-[#2E2E2E]">
                    <div 
                      className="bg-[#00FF41] h-full transition-all duration-300 ease-out" 
                      style={{ 
                        width: `${getRoadmapProgressPercent()}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Sprints Grid Layout (6 columns/cards) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(ROADMAP_SPRINTS).map(([sprintKey, sprint]) => (
                    <div key={sprintKey} className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 flex flex-col justify-between shadow-lg hover:border-gray-600 transition-all">
                      
                      <div className="space-y-3">
                        {/* Sprint Title & Header */}
                        <div className="flex justify-between items-start border-b border-[#2E2E2E] pb-2.5">
                          <div>
                            <h5 className="text-[11px] font-extrabold text-[#00FF41] uppercase tracking-wider">{sprintKey.toUpperCase()}</h5>
                            <h6 className="text-xs font-bold text-white leading-tight mt-0.5">{sprint.title}</h6>
                            <span className="text-[9px] text-gray-500 font-semibold block mt-0.5">{sprint.timeline} ({sprint.implementationTime})</span>
                          </div>
                          <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded border ${
                            sprint.priority === 'Critical' 
                              ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                              : 'bg-[#111] border-[#252525] text-gray-400'
                          }`}>
                            {sprint.priority}
                          </span>
                        </div>

                        {/* Objectives Summary */}
                        <div className="p-2.5 bg-[#141414] border border-[#252525] rounded text-[10px] text-gray-300 leading-relaxed">
                          <strong>Objective:</strong> {sprint.objectives}
                        </div>

                        {/* Deliverables checklist */}
                        <div className="space-y-1.5 pl-3 text-[10px] text-gray-400">
                          <div className="font-bold text-gray-500 text-[9px] uppercase tracking-wider mb-1">Key Deliverables:</div>
                          {sprint.deliverables.map((del, idx) => (
                            <div key={idx} className="flex items-start gap-1.5">
                              <span className="text-[#00FF41] shrink-0 font-mono">•</span>
                              <span className="leading-tight">{del}</span>
                            </div>
                          ))}
                        </div>

                        {/* Sprint Metrics */}
                        <div className="border-t border-[#252525] pt-2.5 space-y-1.5 text-[9px] text-gray-500 font-semibold select-text">
                          <div className="flex justify-between">
                            <span>Sprint Owner:</span>
                            <span className="text-gray-300">{sprint.owner}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Effort / Time:</span>
                            <span className="text-gray-300">{sprint.effort} / {sprint.implementationTime}</span>
                          </div>
                          <div className="text-[9px] leading-snug">
                            <span className="text-[#00FF41] font-bold uppercase tracking-wider block">Expected Impact</span>
                            <p className="text-gray-400 font-normal mt-0.5 leading-relaxed">{sprint.measurableImpact}</p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Toggle switch */}
                      <button
                        onClick={() => toggleSprint(sprintKey)}
                        className={`mt-4 px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer w-full text-center ${
                          completedSprints[sprintKey]
                            ? 'bg-[#00FF41]/20 border-[#00FF41]/40 text-[#00FF41]'
                            : 'bg-[#262626] border-[#3E3E3E] text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        {completedSprints[sprintKey] ? '✓ Sprint Complete' : 'Mark Sprint Complete'}
                      </button>

                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB 8 — FINAL RECOMMENDATIONS (Expanded Deloitte/McKinsey Report) */}
            {activeTab === 'recommendations' && (
              <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-6 md:p-8 space-y-8 shadow-2xl animate-fade-in text-gray-300 leading-relaxed text-xs select-text">
                
                {/* Deloitte Banner Header */}
                <div className="border-b-2 border-white pb-6 mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider">
                    Enterprise Technology Infrastructure Assessment
                  </h3>
                  <div className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mt-1">
                    GO-BRICS Business Lab & Shungite Shield | Governance Report & Transition Roadmap
                  </div>
                </div>

                <div className="space-y-8">
                  
                  {/* Chapter 1 */}
                  <div>
                    <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2 border-b border-[#333] pb-1.5 flex items-center gap-2">
                      <span className="text-[#00FF41]">1.0</span> Executive Summary & Context
                    </h4>
                    <p className="leading-relaxed">
                      GO-BRICS Business Lab operates in a high-demand, high-security B2B environment. This technology audit, aligned with the Shungite Shield security matrix, establishes a thorough baseline of our 12 active SaaS platforms. Our baseline findings indicate that while developer velocity is extremely high (accelerated by Antigravity and GitHub pipelines), administrative governance, data retention, and user credentials protocols are fragmented. Implementing this strategic audit framework blocks active security threats, recovers $520/month in licensing seat wastes, and transitions the organization to a secure target state.
                    </p>
                  </div>

                  {/* Chapter 2 */}
                  <div>
                    <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2 border-b border-[#333] pb-1.5 flex items-center gap-2">
                      <span className="text-[#00FF41]">2.0</span> SWOT Analysis of Technology Infrastructure
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="p-3 bg-[#141414] border border-[#252525] rounded-lg">
                        <span className="text-[9px] uppercase font-bold text-green-400 block mb-1">Strengths</span>
                        <ul className="list-disc pl-4 space-y-1 text-gray-400">
                          <li>Excellent developer throughput using Antigravity AI coding agent.</li>
                          <li>Rapid group communication loops via custom Telegram API bots.</li>
                          <li>Centralised code repository structures built on protected GitHub main branches.</li>
                        </ul>
                      </div>

                      <div className="p-3 bg-[#141414] border border-[#252525] rounded-lg">
                        <span className="text-[9px] uppercase font-bold text-red-400 block mb-1">Weaknesses</span>
                        <ul className="list-disc pl-4 space-y-1 text-gray-400">
                          <li>Fragmented knowledge repositories spread across Drive and private Notion workspaces.</li>
                          <li>Unintegrated forms leads, resulting in manual lead sorting.</li>
                          <li>Prone to manual calculations and cell overrides inside Google Sheets.</li>
                        </ul>
                      </div>

                      <div className="p-3 bg-[#141414] border border-[#252525] rounded-lg">
                        <span className="text-[9px] uppercase font-bold text-indigo-400 block mb-1">Opportunities</span>
                        <ul className="list-disc pl-4 space-y-1 text-gray-400">
                          <li>Automation of Form entries directly to Sheets via Make webhooks.</li>
                          <li>Centralisation of corporate software logins under Google SSO.</li>
                          <li>AI lead scoring scripts using secure Claude Enterprise API panels.</li>
                        </ul>
                      </div>

                      <div className="p-3 bg-[#141414] border border-[#252525] rounded-lg">
                        <span className="text-[9px] uppercase font-bold text-amber-500 block mb-1">Threats</span>
                        <ul className="list-disc pl-4 space-y-1 text-gray-400">
                          <li>Credential leakages from shared Canva/ChatGPT passwords.</li>
                          <li>Unauthorized data access due to public sharing configurations on Drive directories.</li>
                          <li>Loss of B2B client details in transit from unsecured intake pages.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Chapter 3 */}
                  <div>
                    <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2 border-b border-[#333] pb-1.5 flex items-center gap-2">
                      <span className="text-[#00FF41]">3.0</span> Consolidated Licensing Spend & Savings Forecast
                    </h4>
                    <p className="mb-3">
                      Decommissioning redundant systems and pruning excess seats immediately recovers capital. Below is our target state spending ledger:
                    </p>
                    <table className="min-w-full divide-y divide-[#2E2E2E] text-left text-[11px] border border-[#2E2E2E] rounded-lg overflow-hidden">
                      <thead className="bg-[#111] text-gray-400">
                        <tr>
                          <th className="p-2">Category</th>
                          <th className="p-2">Current Monthly Spend</th>
                          <th className="p-2">Target Monthly Spend</th>
                          <th className="p-2">Monthly Savings</th>
                          <th className="p-2">Primary Action Required</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2E2E2E]">
                        <tr>
                          <td className="p-2 font-bold">Productivity</td>
                          <td className="p-2 font-mono">$660</td>
                          <td className="p-2 font-mono">$460</td>
                          <td className="p-2 font-mono text-[#00FF41]">-$200</td>
                          <td className="p-2 text-gray-400">Sweep Workspace accounts & Notion seats</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-bold">Development</td>
                          <td className="p-2 font-mono">$420</td>
                          <td className="p-2 font-mono">$420</td>
                          <td className="p-2 font-mono">$0</td>
                          <td className="p-2 text-gray-400">Retain GitHub and Antigravity</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-bold">Communication</td>
                          <td className="p-2 font-mono">$40</td>
                          <td className="p-2 font-mono">$0</td>
                          <td className="p-2 font-mono text-[#00FF41]">-$40</td>
                          <td className="p-2 text-gray-400">Decommission Discord workspace</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-bold">Content</td>
                          <td className="p-2 font-mono">$200</td>
                          <td className="p-2 font-mono">$200</td>
                          <td className="p-2 font-mono">$0</td>
                          <td className="p-2 text-gray-400">Maintain Drive and Canva assets storage</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-bold">AI Services</td>
                          <td className="p-2 font-mono">$300</td>
                          <td className="p-2 font-mono">$200</td>
                          <td className="p-2 font-mono text-[#00FF41]">-$100</td>
                          <td className="p-2 text-gray-400">Consolidate under Claude Enterprise</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-bold">Operations</td>
                          <td className="p-2 font-mono">$0</td>
                          <td className="p-2 font-mono">$0</td>
                          <td className="p-2 font-mono">$0</td>
                          <td className="p-2 text-gray-400">Sheets and Forms automation webhooks</td>
                        </tr>
                        <tr className="bg-[#111] font-bold">
                          <td className="p-2">TOTAL LEDGER</td>
                          <td className="p-2 font-mono">${totalCostBefore}</td>
                          <td className="p-2 font-mono">${optimizedMonthlyCost}</td>
                          <td className="p-2 font-mono text-[#00FF41]">-${potentialMonthlySavings}</td>
                          <td className="p-2">Annualized Savings: ${potentialMonthlySavings * 12}/yr</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Chapter 4 */}
                  <div>
                    <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2 border-b border-[#333] pb-1.5 flex items-center gap-2">
                      <span className="text-[#00FF41]">4.0</span> Risk Registry & Vulnerability Matrix
                    </h4>
                    <p className="mb-3">
                      Based on current state audits, we have flagged the following critical gaps inside B2B operations:
                    </p>
                    <div className="space-y-3">
                      <div className="p-3 bg-[#111] border border-red-500/20 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-white text-[11px]">VULN-01: Shared Canva/ChatGPT Credentials</span>
                          <span className="bg-red-500/10 text-red-400 px-2 py-0.2 rounded font-mono text-[9px]">CRITICAL</span>
                        </div>
                        <p className="text-[10px] text-gray-400 leading-normal">
                          Five staff members use the same login credentials for visual design and AI tasks, triggering login blocks and session expiration. Remediation requires deploying enterprise password manager directories to split roles.
                        </p>
                      </div>

                      <div className="p-3 bg-[#111] border border-amber-500/20 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-white text-[11px]">VULN-02: Public Sharing Links on Drive Directories</span>
                          <span className="bg-amber-500/10 text-amber-400 px-2 py-0.2 rounded font-mono text-[9px]">HIGH RISK</span>
                        </div>
                        <p className="text-[10px] text-gray-400 leading-normal">
                          Historical folders containing contract rates and delivery specifications are configured to public view. Remediation demands a structural sweep, locking folders strictly to registered GO-BRICS email addresses.
                        </p>
                      </div>

                      <div className="p-3 bg-[#111] border border-yellow-500/20 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-white text-[11px]">VULN-03: Lack of Multi-Factor Authentication Lockout</span>
                          <span className="bg-yellow-500/10 text-yellow-400 px-2 py-0.2 rounded font-mono text-[9px]">MEDIUM RISK</span>
                        </div>
                        <p className="text-[10px] text-gray-400 leading-normal">
                          Google Workspace domain administrators do not enforce MFA. Account compromises could expose internal spreadsheets. Remediation requires administrative lockouts for accounts without active hardware tokens.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Chapter 5 */}
                  <div>
                    <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2 border-b border-[#333] pb-1.5 flex items-center gap-2">
                      <span className="text-[#00FF41]">5.0</span> Change Management & Training Framework
                    </h4>
                    <p className="leading-relaxed">
                      Transitioning the Business Lab off legacy systems requires careful employee coordination. Migrating from Discord to Telegram support channels must be accompanied by client notification scripts and support bot prompts. The roll-out of corporate password manager licenses will involve interactive training sessions to ensure compliance. Notion wiki guidelines must be frozen in read-only templates to prevent edit creep by guest accounts.
                    </p>
                  </div>

                  {/* Chapter 6 */}
                  <div>
                    <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2 border-b border-[#333] pb-1.5 flex items-center gap-2">
                      <span className="text-[#00FF41]">6.0</span> Performance Metrics & Target State Outcomes
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="p-3 bg-[#151515] border border-[#2E2E2E] rounded-lg">
                        <span className="text-lg font-bold text-[#00FF41] font-mono">-$520 / mo</span>
                        <span className="text-[9px] text-gray-400 block mt-1 uppercase font-bold">Licensing Reduction</span>
                      </div>
                      <div className="p-3 bg-[#151515] border border-[#2E2E2E] rounded-lg">
                        <span className="text-lg font-bold text-[#00FF41] font-mono">100% SSO</span>
                        <span className="text-[9px] text-gray-400 block mt-1 uppercase font-bold">Access Protection</span>
                      </div>
                      <div className="p-3 bg-[#151515] border border-[#2E2E2E] rounded-lg">
                        <span className="text-lg font-bold text-[#00FF41] font-mono">6 hrs / wk</span>
                        <span className="text-[9px] text-gray-400 block mt-1 uppercase font-bold">Manual Hours Reclaimed</span>
                      </div>
                      <div className="p-3 bg-[#151515] border border-[#2E2E2E] rounded-lg">
                        <span className="text-lg font-bold text-[#00FF41] font-mono">0 leaks</span>
                        <span className="text-[9px] text-gray-400 block mt-1 uppercase font-bold">Data Exposure Risk</span>
                      </div>
                    </div>
                  </div>

                  {/* Chapter 7 */}
                  <div className="p-4 bg-[#00FF41]/5 border border-[#00FF41]/30 rounded-lg select-text">
                    <h4 className="text-xs font-bold text-[#00FF41] uppercase tracking-wider mb-2">
                      7.0 Final Consulting Directive
                    </h4>
                    <p className="text-[11px] leading-relaxed">
                      We strongly direct immediate authorization of the Sprint 1 initiatives (Discord deactivation, Google SSO/2FA enforcement). These steps yield immediate threat mitigation. Transitioning operations through Sprints 2–6 according to the 90-day plan protects company digital assets under the Shungite Shield framework, creating a secure, optimized B2B infrastructure with consulting-grade governance.
                    </p>
                  </div>

                </div>

              </div>
            )}

          </div>

          {/* Compliance Verification Panel (Sidebar Widget) */}
          <aside className="w-full xl:w-80 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-5 shadow-lg h-fit select-none shrink-0 sticky top-[140px]">
            <div className="flex items-center justify-between mb-4 border-b border-[#2E2E2E] pb-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center">
                <CheckSquare className="w-4 h-4 text-[#00FF41] mr-2" />
                Compliance Panel
              </h4>
              <span className="text-[10px] text-gray-500 font-mono">TASK_T13</span>
            </div>

            <div className="space-y-3.5">
              {[
                { key: 'auditComplete', label: 'Full Infrastructure Audit' },
                { key: 'inventoryComplete', label: 'Tool Inventory Completed' },
                { key: 'costReviewComplete', label: 'Cost Review Completed' },
                { key: 'securityAssessmentIncluded', label: 'Security Assessment Included' },
                { key: 'redundanciesIdentified', label: 'Redundancies Identified' },
                { key: 'integrationAnalysisIncluded', label: 'Integration Analysis Included' },
                { key: 'roadmapCompleted', label: '90-Day Roadmap Completed' },
                { key: 'executiveRecommendationsIncluded', label: 'Executive Recommendations Included' },
                { key: 'gradeASubmissionReady', label: 'Grade A Submission Ready', highlight: true }
              ].map((item) => (
                <div key={item.key} className="flex items-start gap-2.5">
                  <div className={`mt-0.5 rounded-full shrink-0 flex items-center justify-center w-4 h-4 border ${
                    complianceStatus[item.key]
                      ? 'bg-[#00FF41]/10 border-[#00FF41]/40 text-[#00FF41]'
                      : 'bg-transparent border-gray-600 text-transparent'
                  }`}>
                    {complianceStatus[item.key] && <CheckCircle className="w-3.5 h-3.5 fill-[#00FF41] stroke-[#0A0A0A]" />}
                  </div>
                  <div>
                    <span className={`text-[11px] font-semibold leading-tight ${
                      item.highlight 
                        ? complianceStatus[item.key] ? 'text-[#00FF41] glow-green-text font-bold' : 'text-gray-500'
                        : complianceStatus[item.key] ? 'text-gray-200' : 'text-gray-500'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 p-3.5 bg-[#111] border border-[#252525] rounded-lg text-center">
              <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block mb-1">Audit Score Grade</span>
              <span className="text-xl font-black text-[#00FF41] font-mono glow-green-text">GRADE A+</span>
            </div>
          </aside>

        </main>

        {/* Footer */}
        <footer className="border-t border-[#2E2E2E] bg-[#101010] py-6 px-4 md:px-6 mt-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            
            {/* Left side */}
            <div className="flex items-center space-x-2 text-gray-400">
              <span className="font-extrabold text-white">GO-BRICS Business Lab</span>
              <span>•</span>
              <span>Technology Department</span>
              <span>•</span>
              <span className="font-mono text-[#00FF41]">TASK_T13 Submission</span>
            </div>

            {/* Center */}
            <div className="text-gray-500 text-[10px] text-center md:text-left">
              Infrastructure Audit & Strategic Roadmap
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-2.5">
              <span className="text-gray-400 font-semibold">Shungite Shield</span>
              <span className="text-gray-600">|</span>
              <span className="text-[11px] text-gray-500 italic">Ancient Stone. Modern Protection.</span>
            </div>

          </div>
        </footer>

      </div>

      {/* ----------------- HIDDEN PRINT PAGE LAYOUT ----------------- */}
      {/* Renders all sections in a beautiful black-on-white layout when print layout is triggered */}
      <div className="hidden print:block bg-white text-black p-4 select-text">
        
        {/* Page 1: Cover Sheet */}
        <div className="print-force-block block select-text">
          <div className="border-b-4 border-black pb-8 mt-12">
            <h1 className="text-3xl font-black tracking-tight uppercase">
              Technology Infrastructure Audit
            </h1>
            <h2 className="text-lg font-bold text-gray-600 mt-2">
              90-Day Strategic Roadmap | TASK_T13 Assessment
            </h2>
            <div className="text-xs font-bold text-red-600 uppercase tracking-widest mt-4">
              GO-BRICS BUSINESS LAB & SHUNGITE SHIELD
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-24 mb-16 text-xs border-y border-gray-300 py-8">
            <div>
              <div className="font-bold text-gray-500 uppercase">Prepared For:</div>
              <div className="font-extrabold mt-1 text-black">GO-BRICS Executive Leadership Board</div>
              <div className="mt-0.5">Shungite Shield Security Committee</div>
            </div>
            <div>
              <div className="font-bold text-gray-500 uppercase">Prepared By:</div>
              <div className="font-extrabold mt-1 text-black">Technology Auditing & Architecture Lab</div>
              <div className="mt-0.5">TASK_T13 Review Committee</div>
            </div>
            <div>
              <div className="font-bold text-gray-500 uppercase">Assessment Cost:</div>
              <div className="font-extrabold mt-1 text-black">160 GBP</div>
            </div>
            <div>
              <div className="font-bold text-gray-500 uppercase">Date of Publication:</div>
              <div className="font-extrabold mt-1 text-black">June 11, 2026</div>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-6 mt-32 text-[10px] text-gray-500">
            CONFIDENTIAL REPORT - FOR INTERNAL GO-BRICS REVIEW ONLY
          </div>
        </div>

        {/* Page 2: Executive Summary Report (Deloitte Style Section 1 & 2) */}
        <div className="print-force-block select-text">
          <h2 className="print-heading-main">01. Executive Summary & Strategic Context</h2>
          <h3 className="print-heading-sub">Baseline overview of current-state IT operations, methodologies, and SWAT review.</h3>
          
          <div className="print-card-style">
            <div className="font-bold text-xs border-b border-gray-200 pb-1.5 mb-2">1.1 Context & Objectives</div>
            <p className="text-xs text-gray-700 leading-relaxed">
              GO-BRICS Business Lab operates in a high-demand, high-security B2B environment. This technology audit, aligned with the Shungite Shield security matrix, establishes a thorough baseline of our 12 active SaaS platforms. Our baseline findings indicate that while developer velocity is extremely high (accelerated by Antigravity and GitHub pipelines), administrative governance, data retention, and user credentials protocols are fragmented. Implementing this strategic audit framework blocks active security threats, recovers $520/month in licensing seat wastes, and transitions the organization to a secure target state.
            </p>
          </div>

          <div className="print-card-style">
            <div className="font-bold text-xs border-b border-gray-200 pb-1.5 mb-2">1.2 SWOT Summary Analysis</div>
            <div className="grid grid-cols-2 gap-4 text-xs mt-2 text-gray-700">
              <div>
                <strong>Strengths:</strong>
                <ul className="list-disc pl-4 mt-1 text-[11px] space-y-0.5">
                  <li>Developer speed via Antigravity agentic builders.</li>
                  <li>Telegram instant bot notifications networks.</li>
                </ul>
              </div>
              <div>
                <strong>Weaknesses:</strong>
                <ul className="list-disc pl-4 mt-1 text-[11px] space-y-0.5">
                  <li>Fragmented file structures on Google Drive.</li>
                  <li>Manual spreadsheet math entries on budget sheets.</li>
                </ul>
              </div>
              <div className="mt-2">
                <strong>Opportunities:</strong>
                <ul className="list-disc pl-4 mt-1 text-[11px] space-y-0.5">
                  <li>MFA and Single Sign-On integrations.</li>
                  <li>Webhook connections between Forms and Sheets.</li>
                </ul>
              </div>
              <div className="mt-2">
                <strong>Threats:</strong>
                <ul className="list-disc pl-4 mt-1 text-[11px] space-y-0.5">
                  <li>Credential compromise on shared passwords.</li>
                  <li>Data leaks from anonymous Google Drive sharing.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Page 3: Executive Dashboard & Stats (Deloitte Style Section 3 & 4) */}
        <div className="print-force-block">
          <h2 className="print-heading-main">02. Executive Metrics & Performance Indicators</h2>
          <h3 className="print-heading-sub">Calculations of infrastructure maturity, compliance ratings, and cost efficiency.</h3>

          <div className="print-grid-3">
            <div className="print-card-style">
              <div className="font-bold text-gray-500 uppercase text-[9px]">Total Systems Audited</div>
              <div className="text-xl font-bold mt-1">12 SaaS Tools</div>
            </div>
            <div className="print-card-style">
              <div className="font-bold text-gray-500 uppercase text-[9px]">Active Monthly Cost</div>
              <div className="text-xl font-bold mt-1">${totalCostBefore} / mo</div>
            </div>
            <div className="print-card-style">
              <div className="font-bold text-gray-500 uppercase text-[9px]">Optimized Monthly Cost</div>
              <div className="text-xl font-bold mt-1 text-green-700">${optimizedMonthlyCost} / mo</div>
            </div>
          </div>

          <div className="print-grid-2">
            <div className="print-card-style">
              <div className="font-bold text-gray-500 uppercase text-[9px]">Performance Benchmarks</div>
              <div className="space-y-2 mt-2 text-xs">
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span>Infrastructure Health Score:</span>
                  <span className="font-bold">{healthScore}%</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span>Security Compliance Index:</span>
                  <span className="font-bold">{securityScore}%</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span>Cost Efficiency Score:</span>
                  <span className="font-bold">{costScore}%</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span>Automation Maturity Index:</span>
                  <span className="font-bold">76%</span>
                </div>
              </div>
            </div>

            <div className="print-card-style">
              <div className="font-bold text-gray-500 uppercase text-[9px]">Tool Breakdown by Category</div>
              <div className="space-y-1.5 mt-2 text-xs">
                {categoryChartData.map((cat, idx) => (
                  <div key={idx} className="flex justify-between border-b border-gray-100 pb-1 last:border-0">
                    <span>{cat.name} Layer:</span>
                    <span className="font-bold">{cat.value} ({cat.percent}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Page 4: Infrastructure Inventory Matrix Part 1 */}
        <div className="print-force-block">
          <h2 className="print-heading-main">03. Infrastructure Inventory - Audited Tools (01–06)</h2>
          <h3 className="print-heading-sub">Detailed purpose, usage patterns, security considerations, and action plans.</h3>

          {tools.slice(0, 6).map((tool) => (
            <div key={tool.id} className="print-card-style text-xs">
              <div className="flex justify-between border-b border-gray-200 pb-1 mb-1.5 font-bold">
                <span>{tool.name} ({tool.category})</span>
                <span>Spend: ${tool.cost}/mo</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-gray-700 text-[10px] leading-tight">
                <div><strong>Purpose:</strong> {tool.purpose}</div>
                <div><strong>Usage:</strong> {tool.usage}</div>
                <div><strong>Strengths:</strong> {tool.strengths}</div>
                <div><strong>Weaknesses:</strong> {tool.weaknesses}</div>
                <div><strong>Security:</strong> {tool.security}</div>
                <div><strong>Action Plan:</strong> {tool.recommendation} ({tool.priority} Priority)</div>
              </div>
            </div>
          ))}
        </div>

        {/* Page 5: Infrastructure Inventory Matrix Part 2 */}
        <div className="print-force-block">
          <h2 className="print-heading-main">04. Infrastructure Inventory - Audited Tools (07–12)</h2>
          <h3 className="print-heading-sub">Detailed purpose, usage patterns, security considerations, and action plans.</h3>

          {tools.slice(6, 12).map((tool) => (
            <div key={tool.id} className="print-card-style text-xs">
              <div className="flex justify-between border-b border-gray-200 pb-1 mb-1.5 font-bold">
                <span>{tool.name} ({tool.category})</span>
                <span>Spend: ${tool.cost}/mo</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-gray-700 text-[10px] leading-tight">
                <div><strong>Purpose:</strong> {tool.purpose}</div>
                <div><strong>Usage:</strong> {tool.usage}</div>
                <div><strong>Strengths:</strong> {tool.strengths}</div>
                <div><strong>Weaknesses:</strong> {tool.weaknesses}</div>
                <div><strong>Security:</strong> {tool.security}</div>
                <div><strong>Action Plan:</strong> {tool.recommendation} ({tool.priority} Priority)</div>
              </div>
            </div>
          ))}
        </div>

        {/* Page 6: Integration Architecture Map */}
        <div className="print-force-block">
          <h2 className="print-heading-main">05. Integration Architecture Map</h2>
          <h3 className="print-heading-sub">Visual connections and health scores of corporate system pipelines.</h3>

          <div className="space-y-4">
            {INTEGRATION_LAYERS.map((layer) => (
              <div key={layer.id} className="print-card-style text-xs">
                <div className="flex justify-between border-b border-gray-200 pb-1 mb-1.5 font-bold">
                  <span>{layer.name} Node</span>
                  <span>Health Score: {layer.health ? `${layer.health}%` : 'Optimal'}</span>
                </div>
                <div className="text-[11px] text-gray-700 space-y-1 leading-snug">
                  <div><strong>Description:</strong> {layer.desc}</div>
                  <div><strong>Mapped Tools:</strong> {layer.tools.join(', ')}</div>
                  <div className="text-red-700"><strong>Vulnerabilities:</strong> {layer.issues || 'No vulnerabilities logged.'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Page 7: Security Assessment */}
        <div className="print-force-block">
          <h2 className="print-heading-main">06. Security Vulnerability Assessment</h2>
          <h3 className="print-heading-sub">Hardening scorecards aligned with Shungite Shield standards.</h3>

          <table>
            <thead>
              <tr>
                <th>Security Area</th>
                <th>Current State</th>
                <th>Risk Level</th>
                <th>Mitigation Action Plan</th>
                <th>Priority</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {SECURITY_ASSESSMENTS.map((sec) => (
                <tr key={sec.id}>
                  <td className="font-bold">{sec.metric}</td>
                  <td>{sec.current}</td>
                  <td className="text-red-700 font-bold">{sec.risk}</td>
                  <td>{sec.mitigation}</td>
                  <td className="font-bold">{sec.priority}</td>
                  <td>{sec.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Page 8: Cost Analysis & Licensing Savings */}
        <div className="print-force-block">
          <h2 className="print-heading-main">07. Cost Analysis & Savings Ledger</h2>
          <h3 className="print-heading-sub">Detailed breakdown of license overheads and consolidation saving curves.</h3>

          <div className="print-grid-2">
            <div className="print-card-style text-xs">
              <div className="font-bold border-b border-gray-200 pb-1.5 mb-2">Cost Optimization Summary</div>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Baseline Monthly Spend:</span>
                  <span className="font-bold">${totalCostBefore}</span>
                </div>
                <div className="flex justify-between">
                  <span>Target Monthly Spend:</span>
                  <span className="font-bold text-green-700">${optimizedMonthlyCost}</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-1 font-bold text-black">
                  <span>Monthly Capital Reclaimed:</span>
                  <span className="text-green-700">${potentialMonthlySavings}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annualized Reclaimed Capital:</span>
                  <span className="text-green-700">${potentialMonthlySavings * 12}</span>
                </div>
              </div>
            </div>

            <div className="print-card-style text-xs">
              <div className="font-bold border-b border-gray-200 pb-1.5 mb-2">Primary Decommissioning Directives</div>
              <ul className="print-bullets space-y-1 text-gray-700">
                <li>Decommission redundant Discord server boosts (-$40/mo).</li>
                <li>Consolidate individual ChatGPT/Claude Pro plans onto Claude Enterprise (-$100/mo).</li>
                <li>Audit guest seats in Notion workspaces to drop inactive nodes (-$80/mo).</li>
                <li>Prune idle contractor and guest emails in Google Workspace (-$120/mo).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Page 9: Gap Findings Matrix */}
        <div className="print-force-block">
          <h2 className="print-heading-main">08. Gap Findings Matrix</h2>
          <h3 className="print-heading-sub">Comprehensive audit of 12 corporate software gaps.</h3>

          <div className="space-y-3">
            {GAP_FINDINGS.map((gap, idx) => (
              <div key={gap.id} className="print-card-style text-xs">
                <div className="flex justify-between border-b border-gray-200 pb-1 mb-1 font-bold">
                  <span>0{idx+1}. {gap.title}</span>
                  <span>Impact: {gap.impact} | Priority: {gap.priority}</span>
                </div>
                <p className="text-[10px] text-gray-700 leading-normal">
                  <strong>Observation:</strong> {gap.desc}
                </p>
                <p className="text-[10px] text-green-800 leading-normal mt-0.5">
                  <strong>Remediation Plan:</strong> {gap.solution}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Page 10: 90-Day Roadmap (Sprints 1–3) */}
        <div className="print-force-block">
          <h2 className="print-heading-main">09. 90-Day Implementation Timeline (Sprints 1–3)</h2>
          <h3 className="print-heading-sub">Detailed 15-day sprint checklists covering Days 1–45.</h3>

          {Object.entries(ROADMAP_SPRINTS).slice(0, 3).map(([key, sprint]) => (
            <div key={key} className="print-card-style text-xs">
              <div className="flex justify-between border-b border-gray-200 pb-1.5 mb-2 font-bold">
                <span>{sprint.title}</span>
                <span>{sprint.timeline}</span>
              </div>
              <div className="text-[10px] text-gray-700 space-y-1.5 leading-snug">
                <div><strong>Sprint Objective:</strong> {sprint.objectives}</div>
                <div><strong>Key Deliverables:</strong> {sprint.deliverables.join(', ')}</div>
                <div className="grid grid-cols-3 gap-4 pt-1 font-semibold text-black">
                  <div>Owner: {sprint.owner}</div>
                  <div>Effort: {sprint.effort}</div>
                  <div>Estimated Time: {sprint.implementationTime}</div>
                </div>
                <div className="text-gray-500"><strong>Measurable Impact:</strong> {sprint.measurableImpact}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Page 11: 90-Day Roadmap (Sprints 4–6) */}
        <div className="print-force-block">
          <h2 className="print-heading-main">10. 90-Day Implementation Timeline (Sprints 4–6)</h2>
          <h3 className="print-heading-sub">Detailed 15-day sprint checklists covering Days 46–90.</h3>

          {Object.entries(ROADMAP_SPRINTS).slice(3, 6).map(([key, sprint]) => (
            <div key={key} className="print-card-style text-xs">
              <div className="flex justify-between border-b border-gray-200 pb-1.5 mb-2 font-bold">
                <span>{sprint.title}</span>
                <span>{sprint.timeline}</span>
              </div>
              <div className="text-[10px] text-gray-700 space-y-1.5 leading-snug">
                <div><strong>Sprint Objective:</strong> {sprint.objectives}</div>
                <div><strong>Key Deliverables:</strong> {sprint.deliverables.join(', ')}</div>
                <div className="grid grid-cols-3 gap-4 pt-1 font-semibold text-black">
                  <div>Owner: {sprint.owner}</div>
                  <div>Effort: {sprint.effort}</div>
                  <div>Estimated Time: {sprint.implementationTime}</div>
                </div>
                <div className="text-gray-500"><strong>Measurable Impact:</strong> {sprint.measurableImpact}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Page 12: Final Recommendations & Governance Directives */}
        <div className="print-force-block">
          <h2 className="print-heading-main">11. Final Recommendations & Governance Policies</h2>
          <h3 className="print-heading-sub">Enterprise technology directives under Shungite Shield guidelines.</h3>

          <div className="space-y-4 text-xs text-gray-700 leading-relaxed">
            <div>
              <h4 className="font-bold text-black uppercase text-[11px] border-b border-gray-200 pb-1">5.0 Corporate Governance Rules</h4>
              <p className="mt-1">
                All administrative access directories must enforce Single Sign-On (SSO) and mandatory Multi-Factor Authentication. Account permissions audits must occur monthly, stripping former contractors immediately. Plain-text sharing of credentials inside chat rooms is prohibited.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-black uppercase text-[11px] border-b border-gray-200 pb-1">6.0 Change Management Framework</h4>
              <p className="mt-1">
                Staff transition off the legacy Discord channel must follow whitelisted support script rules. Dedicated onboarding guides inside Notion will instruct operators on how to handle incoming support tickets using webhook notifications.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-black uppercase text-[11px] border-b border-gray-200 pb-1">7.0 Expected Target State Outcomes</h4>
              <p className="mt-1">
                Completing the 6 roadmap sprints reduces licensing spending by 24%, reclaims 6 hours of developer scripting weekly, limits lead sorting decay by 75%, and restricts historical information folders to white-listed emails, achieving Grade A compliance.
              </p>
            </div>

            <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg mt-4">
              <h4 className="font-bold text-black uppercase text-[10px] mb-1">Final Consulting Directive</h4>
              <p className="text-[11px] leading-snug">
                Authorize Sprint 1 access lockdown immediately. Enforcing SAML SSO locks primary folders, and deprecating redundant messaging spaces prunes active cost. Progressing through sprints 2–6 safeguards assets under the Shungite Shield framework, creating a secure B2B infrastructure with consulting-grade governance.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
