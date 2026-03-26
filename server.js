const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;
const DATA_FILE = path.join(__dirname, 'data', 'issues.json');
const COUNTERS_FILE = path.join(__dirname, 'data', 'counters.json');
const SPRINTS_FILE = path.join(__dirname, 'data', 'sprints.json');

// Default issues with Agile workflow enhancements
const DEFAULT_ISSUES = [
    {
        id: 'BUG-001',
        title: 'Frontend Webpack Build Corruption',
        description: 'Frontend experiences intermittent HTTP 500 errors due to missing webpack chunk ./819.js. Build artifacts appear corrupted.',
        category: 'Bug',
        status: 'In Progress',
        priority: 'P0',
        assignee: 'Frontend Developer',
        assignedAgent: 'Frontend Developer Agent',
        sprintId: 'SPRINT-001',
        qaStatus: null,
        created_at: '2026-03-25T20:46:00.000Z',
        updated_at: '2026-03-26T14:30:00.000Z',
        comments: [
            {
                author: 'System',
                timestamp: '2026-03-25T20:46:00.000Z',
                message: 'Issue created and auto-assigned to Frontend Developer Agent based on category: Bug + Frontend'
            },
            {
                author: 'Frontend Developer Agent',
                timestamp: '2026-03-26T14:30:00.000Z',
                message: 'Investigating webpack configuration. Found corrupted cache in node_modules/.cache'
            }
        ],
        activityLog: [
            {
                action: 'Created',
                timestamp: '2026-03-25T20:46:00.000Z',
                details: 'Issue reported by system monitoring'
            },
            {
                action: 'Auto-Assigned',
                timestamp: '2026-03-25T20:46:00.000Z',
                details: 'Assigned to Frontend Developer Agent based on category: Bug + Frontend'
            },
            {
                action: 'Sprint Assignment',
                timestamp: '2026-03-26T08:00:00.000Z',
                details: 'Added to Sprint 1 - Dashboard Core'
            },
            {
                action: 'Status Changed',
                timestamp: '2026-03-26T14:30:00.000Z',
                from: 'Open',
                to: 'In Progress'
            }
        ]
    },
    {
        id: 'BUG-002',
        title: 'API Response Time Too Slow',
        description: 'API endpoints taking ~4 seconds to respond, far exceeding acceptable thresholds. Target: <500ms, Actual: ~4s.',
        category: 'Bug',
        status: 'Closed',
        priority: 'P1',
        assignee: 'Backend Developer',
        assignedAgent: 'Backend Developer Agent',
        qaAssignedAgent: 'QA Agent',
        sprintId: 'SPRINT-001',
        qaStatus: 'Passed',
        labels: ['QA Verified'],
        created_at: '2026-03-25T20:46:00.000Z',
        updated_at: '2026-03-26T16:30:00.000Z',
        comments: [
            {
                author: 'System',
                timestamp: '2026-03-25T20:46:00.000Z',
                message: 'Issue created and auto-assigned to Backend Developer Agent based on category: Bug + Backend'
            },
            {
                author: 'Backend Developer Agent',
                timestamp: '2026-03-26T09:00:00.000Z',
                message: 'Identified N+1 query problem in the stock price fetcher. Adding database indexes.'
            },
            {
                author: 'Backend Developer Agent',
                timestamp: '2026-03-26T10:15:00.000Z',
                message: 'Fixed by optimizing database queries and adding Redis caching layer. Response time now <200ms. Marking as Ready for QA.'
            },
            {
                author: 'System',
                timestamp: '2026-03-26T10:15:00.000Z',
                message: 'Issue marked Ready for QA. Auto-assigned to QA Agent for testing.'
            },
            {
                author: 'QA Agent',
                timestamp: '2026-03-26T16:30:00.000Z',
                message: '✅ QA Verification Passed: Tested API endpoints with 100 concurrent requests. Average response time: 180ms. All test cases passed.'
            }
        ],
        activityLog: [
            {
                action: 'Created',
                timestamp: '2026-03-25T20:46:00.000Z',
                details: 'Performance issue reported'
            },
            {
                action: 'Auto-Assigned',
                timestamp: '2026-03-25T20:46:00.000Z',
                details: 'Assigned to Backend Developer Agent based on category: Bug + Backend'
            },
            {
                action: 'Sprint Assignment',
                timestamp: '2026-03-26T08:00:00.000Z',
                details: 'Added to Sprint 1 - Dashboard Core'
            },
            {
                action: 'Status Changed',
                timestamp: '2026-03-26T09:00:00.000Z',
                from: 'Open',
                to: 'In Progress'
            },
            {
                action: 'Status Changed',
                timestamp: '2026-03-26T10:15:00.000Z',
                from: 'In Progress',
                to: 'Ready for QA'
            },
            {
                action: 'QA Assigned',
                timestamp: '2026-03-26T10:15:00.000Z',
                details: 'Assigned to QA Agent for testing'
            },
            {
                action: 'Status Changed',
                timestamp: '2026-03-26T10:20:00.000Z',
                from: 'Ready for QA',
                to: 'In QA Review'
            },
            {
                action: 'QA Complete',
                timestamp: '2026-03-26T16:30:00.000Z',
                details: 'QA Passed. Issue verified and ready for closure.'
            },
            {
                action: 'Status Changed',
                timestamp: '2026-03-26T16:30:00.000Z',
                from: 'In QA Review',
                to: 'Closed',
                resolution: 'Fixed N+1 query issue and added Redis caching. Average response time reduced from 4s to 180ms. QA Verified.'
            }
        ]
    },
    {
        id: 'SI-001',
        title: 'Client-Side Auth Only',
        description: 'Authentication checks are client-side only (React useEffect). Server-side middleware needed for robust security.',
        category: 'Security',
        status: 'Open',
        priority: 'P1',
        assignee: 'Security Developer',
        assignedAgent: 'Security Developer Agent',
        sprintId: 'SPRINT-002',
        qaStatus: null,
        created_at: '2026-03-25T20:50:00.000Z',
        updated_at: '2026-03-25T20:50:00.000Z',
        comments: [
            {
                author: 'System',
                timestamp: '2026-03-25T20:50:00.000Z',
                message: 'Issue created and auto-assigned to Security Developer Agent based on category: Security'
            }
        ],
        activityLog: [
            {
                action: 'Created',
                timestamp: '2026-03-25T20:50:00.000Z',
                details: 'Security vulnerability identified'
            },
            {
                action: 'Auto-Assigned',
                timestamp: '2026-03-25T20:50:00.000Z',
                details: 'Assigned to Security Developer Agent based on category: Security'
            },
            {
                action: 'Sprint Assignment',
                timestamp: '2026-03-26T09:00:00.000Z',
                details: 'Added to Sprint 2 - Security & Performance'
            }
        ]
    },
    {
        id: 'BUG-003',
        title: 'Yahoo Finance API Blocked',
        description: 'Yahoo Finance API blocked on current network. System falls back to mock data. Limited to mock data for indices.',
        category: 'Bug',
        status: 'Open',
        priority: 'P2',
        assignee: 'Data Integration Team',
        assignedAgent: 'Data Team Agent',
        sprintId: 'SPRINT-002',
        qaStatus: null,
        created_at: '2026-03-25T19:40:00.000Z',
        updated_at: '2026-03-25T19:40:00.000Z',
        comments: [
            {
                author: 'System',
                timestamp: '2026-03-25T19:40:00.000Z',
                message: 'Issue created and auto-assigned to Data Team Agent based on category: Bug + Data'
            }
        ],
        activityLog: [
            {
                action: 'Created',
                timestamp: '2026-03-25T19:40:00.000Z',
                details: 'External API dependency issue reported'
            },
            {
                action: 'Auto-Assigned',
                timestamp: '2026-03-25T19:40:00.000Z',
                details: 'Assigned to Data Team Agent based on category: Bug + Data'
            },
            {
                action: 'Sprint Assignment',
                timestamp: '2026-03-26T09:00:00.000Z',
                details: 'Added to Sprint 2 - Security & Performance'
            }
        ]
    },
    {
        id: 'FET-001',
        title: 'Loading Spinner Timeout',
        description: 'Loading states may persist indefinitely on slow connections without timeout. Need 10 second timeout and error state.',
        category: 'Feature',
        status: 'In Review',
        priority: 'P2',
        assignee: 'Architecture Review',
        assignedAgent: 'Architecture Agent',
        sprintId: 'SPRINT-001',
        qaStatus: null,
        created_at: '2026-03-25T20:50:00.000Z',
        updated_at: '2026-03-26T16:00:00.000Z',
        comments: [
            {
                author: 'System',
                timestamp: '2026-03-25T20:50:00.000Z',
                message: 'Feature request created and assigned to Architecture Agent for feasibility review'
            },
            {
                author: 'Architecture Agent',
                timestamp: '2026-03-26T11:00:00.000Z',
                message: 'Feasibility Review: This feature is technically feasible. Recommend adding configurable timeout with retry logic. Low implementation risk.'
            },
            {
                author: 'System',
                timestamp: '2026-03-26T16:00:00.000Z',
                message: 'Feature approved by user. Status changed to In Review awaiting implementation assignment.'
            }
        ],
        activityLog: [
            {
                action: 'Created',
                timestamp: '2026-03-25T20:50:00.000Z',
                details: 'Feature request submitted'
            },
            {
                action: 'Auto-Assigned',
                timestamp: '2026-03-25T20:50:00.000Z',
                details: 'Assigned to Architecture Agent for feasibility review (Feature workflow)'
            },
            {
                action: 'Sprint Assignment',
                timestamp: '2026-03-26T08:00:00.000Z',
                details: 'Added to Sprint 1 - Dashboard Core'
            },
            {
                action: 'Status Changed',
                timestamp: '2026-03-26T16:00:00.000Z',
                from: 'Open',
                to: 'In Review'
            }
        ]
    },
    {
        id: 'SPRINT-001-TASK',
        title: 'Q2 2026 Sprint Planning',
        description: 'Plan and organize development sprints for Q2 2026. Include resource allocation and milestone definitions.',
        category: 'Sprint',
        status: 'Open',
        priority: 'P1',
        assignee: 'Project Management',
        assignedAgent: 'Project Manager Agent',
        sprintId: null,
        qaStatus: null,
        created_at: '2026-03-26T08:00:00.000Z',
        updated_at: '2026-03-26T08:00:00.000Z',
        comments: [
            {
                author: 'System',
                timestamp: '2026-03-26T08:00:00.000Z',
                message: 'Issue created and auto-assigned to Project Manager Agent based on category: Sprint'
            }
        ],
        activityLog: [
            {
                action: 'Created',
                timestamp: '2026-03-26T08:00:00.000Z',
                details: 'Sprint planning initiated'
            },
            {
                action: 'Auto-Assigned',
                timestamp: '2026-03-26T08:00:00.000Z',
                details: 'Assigned to Project Manager Agent based on category: Sprint'
            }
        ]
    },
    {
        id: 'BUG-004',
        title: 'Login Form Validation Missing',
        description: 'Login form allows submission without validating email format or minimum password length.',
        category: 'Bug',
        status: 'Reopened',
        priority: 'P1',
        assignee: 'Frontend Developer',
        assignedAgent: 'Frontend Developer Agent',
        sprintId: 'SPRINT-001',
        qaStatus: 'Failed',
        originalDevAgent: 'Frontend Developer Agent',
        created_at: '2026-03-24T10:00:00.000Z',
        updated_at: '2026-03-26T18:00:00.000Z',
        comments: [
            {
                author: 'System',
                timestamp: '2026-03-24T10:00:00.000Z',
                message: 'Issue created and auto-assigned to Frontend Developer Agent based on category: Bug + Frontend'
            },
            {
                author: 'Frontend Developer Agent',
                timestamp: '2026-03-25T14:00:00.000Z',
                message: 'Added basic validation to login form. Ready for QA.'
            },
            {
                author: 'QA Agent',
                timestamp: '2026-03-26T18:00:00.000Z',
                message: '❌ QA Failed: Email validation not working for international domains (e.g., user@tëst.com). Password minimum length check missing - currently accepts 3 characters instead of required 8. Reassigning to developer.'
            }
        ],
        activityLog: [
            {
                action: 'Created',
                timestamp: '2026-03-24T10:00:00.000Z',
                details: 'Bug reported during user testing'
            },
            {
                action: 'Auto-Assigned',
                timestamp: '2026-03-24T10:00:00.000Z',
                details: 'Assigned to Frontend Developer Agent based on category: Bug + Frontend'
            },
            {
                action: 'Sprint Assignment',
                timestamp: '2026-03-24T12:00:00.000Z',
                details: 'Added to Sprint 1 - Dashboard Core'
            },
            {
                action: 'Status Changed',
                timestamp: '2026-03-25T14:00:00.000Z',
                from: 'In Progress',
                to: 'Ready for QA'
            },
            {
                action: 'QA Assigned',
                timestamp: '2026-03-25T14:00:00.000Z',
                details: 'Assigned to QA Agent for testing'
            },
            {
                action: 'Status Changed',
                timestamp: '2026-03-25T14:05:00.000Z',
                from: 'Ready for QA',
                to: 'In QA Review'
            },
            {
                action: 'QA Complete',
                timestamp: '2026-03-26T18:00:00.000Z',
                details: 'QA Failed. Issues found with email validation and password length. Reopening issue.'
            },
            {
                action: 'Status Changed',
                timestamp: '2026-03-26T18:00:00.000Z',
                from: 'In QA Review',
                to: 'Reopened'
            },
            {
                action: 'Reassigned',
                timestamp: '2026-03-26T18:00:00.000Z',
                details: 'Reassigned to Frontend Developer Agent to address QA findings'
            }
        ]
    }
];

// Default sprints
const DEFAULT_SPRINTS = [
    {
        id: 'SPRINT-001',
        name: 'Sprint 1 - Dashboard Core',
        startDate: '2026-03-20',
        endDate: '2026-04-03',
        status: 'Active',
        goals: 'Complete core dashboard features and fix critical bugs',
        issueIds: ['BUG-001', 'FET-001', 'BUG-002', 'BUG-004']
    },
    {
        id: 'SPRINT-002',
        name: 'Sprint 2 - Security & Performance',
        startDate: '2026-04-07',
        endDate: '2026-04-21',
        status: 'Planned',
        goals: 'Implement security hardening and optimize API performance',
        issueIds: ['SI-001', 'BUG-003']
    }
];

// Category prefixes
const CATEGORY_PREFIXES = {
    'Feature': 'FET',
    'Bug': 'BUG',
    'Security': 'SI',
    'Sprint': 'SPRINT'
};

// Agent assignment rules
const AGENT_ASSIGNMENTS = {
    'Bug': {
        'Frontend': 'Frontend Developer Agent',
        'Backend': 'Backend Developer Agent',
        'Data': 'Data Team Agent'
    },
    'Security': 'Security Developer Agent',
    'Feature': 'Architecture Agent',
    'Sprint': 'Project Manager Agent'
};

// Agent avatars
const AGENT_AVATARS = {
    'Frontend Developer Agent': { icon: 'fa-code', color: '#00c8d4' },
    'Backend Developer Agent': { icon: 'fa-server', color: '#00ff88' },
    'Data Team Agent': { icon: 'fa-database', color: '#c8c400' },
    'Security Developer Agent': { icon: 'fa-shield-alt', color: '#d400d4' },
    'Architecture Agent': { icon: 'fa-drafting-compass', color: '#ff6600' },
    'Project Manager Agent': { icon: 'fa-tasks', color: '#ff0040' },
    'QA Agent': { icon: 'fa-check-double', color: '#00c8d4' }
};

// Status workflow
const STATUS_WORKFLOW = {
    'Open': ['In Progress', 'Blocked'],
    'In Progress': ['Open', 'Ready for QA', 'Blocked'],
    'Ready for QA': ['In Progress', 'In QA Review'],
    'In QA Review': ['Reopened', 'Closed'],
    'Reopened': ['In Progress', 'Blocked'],
    'Blocked': ['Open', 'In Progress'],
    'Closed': ['Reopened']
};

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Ensure data directory and file exist
function ensureDataFile() {
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_ISSUES, null, 2));
        console.log('Initialized issues database with default issues');
    }
    ensureCountersFile();
    ensureSprintsFile();
}

// Ensure counters file exists
function ensureCountersFile() {
    if (!fs.existsSync(COUNTERS_FILE)) {
        const counters = {
            'FET': 1,
            'BUG': 4,
            'SI': 1,
            'SPRINT': 1
        };
        fs.writeFileSync(COUNTERS_FILE, JSON.stringify(counters, null, 2));
    }
}

// Ensure sprints file exists
function ensureSprintsFile() {
    if (!fs.existsSync(SPRINTS_FILE)) {
        fs.writeFileSync(SPRINTS_FILE, JSON.stringify(DEFAULT_SPRINTS, null, 2));
        console.log('Initialized sprints database');
    }
}

// Get counters
function getCounters() {
    ensureCountersFile();
    const data = fs.readFileSync(COUNTERS_FILE, 'utf8');
    return JSON.parse(data);
}

// Save counters
function saveCounters(counters) {
    fs.writeFileSync(COUNTERS_FILE, JSON.stringify(counters, null, 2));
}

// Read all issues
function getIssues() {
    ensureDataFile();
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const issues = JSON.parse(data);
    if (issues.length === 0) {
        saveIssues(DEFAULT_ISSUES);
        return DEFAULT_ISSUES;
    }
    return issues;
}

// Write all issues
function saveIssues(issues) {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(issues, null, 2));
}

// Read all sprints
function getSprints() {
    ensureDataFile();
    const data = fs.readFileSync(SPRINTS_FILE, 'utf8');
    return JSON.parse(data);
}

// Save sprints
function saveSprints(sprints) {
    fs.writeFileSync(SPRINTS_FILE, JSON.stringify(sprints, null, 2));
}

// Generate unique ID based on category
function generateId(category) {
    const prefix = CATEGORY_PREFIXES[category] || 'ISS';
    const counters = getCounters();
    counters[prefix] = (counters[prefix] || 0) + 1;
    saveCounters(counters);
    return `${prefix}-${String(counters[prefix]).padStart(3, '0')}`;
}

// Auto-assign agent based on category
function assignAgent(category, scope = '') {
    const now = new Date().toISOString();
    
    if (category === 'Bug') {
        const scopeLower = scope.toLowerCase();
        let bugType = 'Frontend';
        if (scopeLower.includes('backend') || scopeLower.includes('api') || scopeLower.includes('server')) {
            bugType = 'Backend';
        } else if (scopeLower.includes('data') || scopeLower.includes('database') || scopeLower.includes('integration')) {
            bugType = 'Data';
        }
        
        const agent = AGENT_ASSIGNMENTS.Bug[bugType];
        return {
            assignedAgent: agent,
            assignee: agent.replace(' Agent', ''),
            logEntry: {
                action: 'Auto-Assigned',
                timestamp: now,
                details: `Assigned to ${agent} based on category: Bug + ${bugType}`
            },
            comment: {
                author: 'System',
                timestamp: now,
                message: `Issue created and auto-assigned to ${agent} based on category: Bug + ${bugType}`
            }
        };
    }
    
    if (AGENT_ASSIGNMENTS[category]) {
        const agent = AGENT_ASSIGNMENTS[category];
        const details = category === 'Feature' 
            ? `Assigned to ${agent} for feasibility review (Feature workflow)`
            : `Assigned to ${agent} based on category: ${category}`;
        
        return {
            assignedAgent: agent,
            assignee: category === 'Sprint' ? 'Project Management' : 
                     category === 'Feature' ? 'Architecture Review' : 
                     category === 'Security' ? 'Security Developer' : agent.replace(' Agent', ''),
            logEntry: {
                action: 'Auto-Assigned',
                timestamp: now,
                details: details
            },
            comment: {
                author: 'System',
                timestamp: now,
                message: category === 'Feature' 
                    ? `Feature request created and assigned to ${agent} for feasibility review`
                    : `Issue created and auto-assigned to ${agent} based on category: ${category}`
            }
        };
    }
    
    return null;
}

// Log activity
function logActivity(issue, action, details = {}) {
    const now = new Date().toISOString();
    const logEntry = {
        action,
        timestamp: now,
        ...details
    };
    
    if (!issue.activityLog) {
        issue.activityLog = [];
    }
    issue.activityLog.push(logEntry);
    issue.updated_at = now;
}

// Add comment
function addComment(issue, author, message) {
    const now = new Date().toISOString();
    const comment = {
        author,
        timestamp: now,
        message
    };
    
    if (!issue.comments) {
        issue.comments = [];
    }
    issue.comments.push(comment);
    issue.updated_at = now;
    return comment;
}

// API Routes

// Get all issues
app.get('/api/issues', (req, res) => {
    try {
        const issues = getIssues();
        res.json(issues);
    } catch (error) {
        console.error('Error fetching issues:', error);
        res.status(500).json({ error: 'Failed to fetch issues' });
    }
});

// Get single issue
app.get('/api/issues/:id', (req, res) => {
    try {
        const issues = getIssues();
        const issue = issues.find(i => i.id === req.params.id);
        if (!issue) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        res.json(issue);
    } catch (error) {
        console.error('Error fetching issue:', error);
        res.status(500).json({ error: 'Failed to fetch issue' });
    }
});

// Get agents list
app.get('/api/agents', (req, res) => {
    try {
        const agents = Object.keys(AGENT_AVATARS).map(name => ({
            name,
            ...AGENT_AVATARS[name]
        }));
        res.json(agents);
    } catch (error) {
        console.error('Error fetching agents:', error);
        res.status(500).json({ error: 'Failed to fetch agents' });
    }
});

// Get status workflow
app.get('/api/workflow', (req, res) => {
    try {
        res.json(STATUS_WORKFLOW);
    } catch (error) {
        console.error('Error fetching workflow:', error);
        res.status(500).json({ error: 'Failed to fetch workflow' });
    }
});

// Create new issue
app.post('/api/issues', (req, res) => {
    try {
        const { title, description, category, status, priority, scope, sprintId } = req.body;
        
        if (!title || !category) {
            return res.status(400).json({ error: 'Title and category are required' });
        }
        
        const now = new Date().toISOString();
        const assignment = assignAgent(category, title + ' ' + (description || '') + ' ' + scope);
        
        const newIssue = {
            id: generateId(category),
            title,
            description: description || '',
            category,
            status: status || 'Open',
            priority: priority || 'P2',
            assignee: assignment ? assignment.assignee : (scope || ''),
            assignedAgent: assignment ? assignment.assignedAgent : null,
            sprintId: sprintId || null,
            qaStatus: null,
            created_at: now,
            updated_at: now,
            comments: assignment ? [assignment.comment] : [],
            activityLog: [
                {
                    action: 'Created',
                    timestamp: now,
                    details: 'Issue created via Issue Tracker Dashboard'
                }
            ]
        };
        
        if (assignment) {
            newIssue.activityLog.push(assignment.logEntry);
        }
        
        // Add sprint assignment log if applicable
        if (sprintId) {
            const sprints = getSprints();
            const sprint = sprints.find(s => s.id === sprintId);
            if (sprint) {
                newIssue.activityLog.push({
                    action: 'Sprint Assignment',
                    timestamp: now,
                    details: `Added to ${sprint.name}`
                });
                // Update sprint with new issue
                sprint.issueIds.push(newIssue.id);
                saveSprints(sprints);
            }
        }
        
        const issues = getIssues();
        issues.push(newIssue);
        saveIssues(issues);
        res.status(201).json(newIssue);
    } catch (error) {
        console.error('Error creating issue:', error);
        res.status(500).json({ error: 'Failed to create issue' });
    }
});

// Update issue
app.put('/api/issues/:id', (req, res) => {
    try {
        const issues = getIssues();
        const index = issues.findIndex(i => i.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        
        const { title, description, category, status, priority, assignee, assignedAgent, resolution, sprintId } = req.body;
        const issue = issues[index];
        const oldStatus = issue.status;
        
        // Track changes for activity log
        if (status && status !== oldStatus) {
            const logDetails = { from: oldStatus, to: status };
            if (resolution && status === 'Closed') {
                logDetails.resolution = resolution;
            }
            logActivity(issue, 'Status Changed', logDetails);
        }
        
        // Track sprint assignment
        if (sprintId !== undefined && sprintId !== issue.sprintId) {
            const sprints = getSprints();
            
            // Remove from old sprint
            if (issue.sprintId) {
                const oldSprint = sprints.find(s => s.id === issue.sprintId);
                if (oldSprint) {
                    oldSprint.issueIds = oldSprint.issueIds.filter(id => id !== issue.id);
                }
            }
            
            // Add to new sprint
            if (sprintId) {
                const newSprint = sprints.find(s => s.id === sprintId);
                if (newSprint) {
                    newSprint.issueIds.push(issue.id);
                    logActivity(issue, 'Sprint Assignment', { details: `Added to ${newSprint.name}` });
                }
            }
            
            saveSprints(sprints);
            issue.sprintId = sprintId;
        }
        
        // Update fields
        issue.title = title !== undefined ? title : issue.title;
        issue.description = description !== undefined ? description : issue.description;
        issue.category = category !== undefined ? category : issue.category;
        issue.status = status !== undefined ? status : issue.status;
        issue.priority = priority !== undefined ? priority : issue.priority;
        issue.assignee = assignee !== undefined ? assignee : issue.assignee;
        issue.assignedAgent = assignedAgent !== undefined ? assignedAgent : issue.assignedAgent;
        
        // Ensure comments and activityLog arrays exist
        if (!issue.comments) issue.comments = [];
        if (!issue.activityLog) issue.activityLog = [];
        
        saveIssues(issues);
        res.json(issue);
    } catch (error) {
        console.error('Error updating issue:', error);
        res.status(500).json({ error: 'Failed to update issue' });
    }
});

// Delete issue
app.delete('/api/issues/:id', (req, res) => {
    try {
        let issues = getIssues();
        const index = issues.findIndex(i => i.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        
        const issue = issues[index];
        
        // Remove from sprint if assigned
        if (issue.sprintId) {
            const sprints = getSprints();
            const sprint = sprints.find(s => s.id === issue.sprintId);
            if (sprint) {
                sprint.issueIds = sprint.issueIds.filter(id => id !== issue.id);
                saveSprints(sprints);
            }
        }
        
        issues.splice(index, 1);
        saveIssues(issues);
        res.json({ message: 'Issue deleted successfully' });
    } catch (error) {
        console.error('Error deleting issue:', error);
        res.status(500).json({ error: 'Failed to delete issue' });
    }
});

// Add comment to issue
app.post('/api/issues/:id/comments', (req, res) => {
    try {
        const { author, message } = req.body;
        
        if (!author || !message) {
            return res.status(400).json({ error: 'Author and message are required' });
        }
        
        const issues = getIssues();
        const index = issues.findIndex(i => i.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        
        const issue = issues[index];
        const comment = addComment(issue, author, message);
        
        saveIssues(issues);
        res.status(201).json(comment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

// Add activity log entry
app.post('/api/issues/:id/activity', (req, res) => {
    try {
        const { action, details } = req.body;
        
        if (!action) {
            return res.status(400).json({ error: 'Action is required' });
        }
        
        const issues = getIssues();
        const index = issues.findIndex(i => i.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        
        const issue = issues[index];
        logActivity(issue, action, details || {});
        
        saveIssues(issues);
        res.status(201).json(issue.activityLog[issue.activityLog.length - 1]);
    } catch (error) {
        console.error('Error adding activity:', error);
        res.status(500).json({ error: 'Failed to add activity' });
    }
});

// Mark as Ready for QA
app.post('/api/issues/:id/ready-for-qa', (req, res) => {
    try {
        const { agent, message } = req.body;
        
        const issues = getIssues();
        const index = issues.findIndex(i => i.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        
        const issue = issues[index];
        const oldStatus = issue.status;
        const now = new Date().toISOString();
        
        // Store original dev agent for potential reopen
        if (!issue.originalDevAgent) {
            issue.originalDevAgent = issue.assignedAgent;
        }
        
        // Update status
        issue.status = 'Ready for QA';
        issue.updated_at = now;
        
        // Add activity log
        if (!issue.activityLog) issue.activityLog = [];
        issue.activityLog.push({
            action: 'Status Changed',
            timestamp: now,
            from: oldStatus,
            to: 'Ready for QA'
        });
        
        // Assign to QA Agent
        issue.assignedAgent = 'QA Agent';
        issue.assignee = 'QA Agent';
        issue.qaAssignedAgent = 'QA Agent';
        
        issue.activityLog.push({
            action: 'QA Assigned',
            timestamp: now,
            details: 'Assigned to QA Agent for testing'
        });
        
        // Add comment
        if (!issue.comments) issue.comments = [];
        issue.comments.push({
            author: agent || issue.assignedAgent || 'Developer Agent',
            timestamp: now,
            message: message || 'Development complete. Marking as Ready for QA.'
        });
        
        issue.comments.push({
            author: 'System',
            timestamp: now,
            message: 'Issue marked Ready for QA. Auto-assigned to QA Agent for testing.'
        });
        
        saveIssues(issues);
        res.json(issue);
    } catch (error) {
        console.error('Error marking ready for QA:', error);
        res.status(500).json({ error: 'Failed to mark ready for QA' });
    }
});

// Start QA Review
app.post('/api/issues/:id/start-qa', (req, res) => {
    try {
        const issues = getIssues();
        const index = issues.findIndex(i => i.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        
        const issue = issues[index];
        const oldStatus = issue.status;
        const now = new Date().toISOString();
        
        // Update status
        issue.status = 'In QA Review';
        issue.updated_at = now;
        
        // Add activity log
        if (!issue.activityLog) issue.activityLog = [];
        issue.activityLog.push({
            action: 'Status Changed',
            timestamp: now,
            from: oldStatus,
            to: 'In QA Review'
        });
        
        saveIssues(issues);
        res.json(issue);
    } catch (error) {
        console.error('Error starting QA:', error);
        res.status(500).json({ error: 'Failed to start QA' });
    }
});

// QA Pass
app.post('/api/issues/:id/qa-pass', (req, res) => {
    try {
        const { message } = req.body;
        
        const issues = getIssues();
        const index = issues.findIndex(i => i.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        
        const issue = issues[index];
        const oldStatus = issue.status;
        const now = new Date().toISOString();
        
        // Update status to Closed
        issue.status = 'Closed';
        issue.qaStatus = 'Passed';
        issue.updated_at = now;
        
        // Add QA Verified label
        if (!issue.labels) issue.labels = [];
        if (!issue.labels.includes('QA Verified')) {
            issue.labels.push('QA Verified');
        }
        
        // Add activity log
        if (!issue.activityLog) issue.activityLog = [];
        issue.activityLog.push({
            action: 'Status Changed',
            timestamp: now,
            from: oldStatus,
            to: 'Closed',
            resolution: 'QA Passed - Issue verified and approved'
        });
        
        issue.activityLog.push({
            action: 'QA Complete',
            timestamp: now,
            details: 'QA Passed. Issue verified and ready for closure.'
        });
        
        // Add comment
        if (!issue.comments) issue.comments = [];
        issue.comments.push({
            author: 'QA Agent',
            timestamp: now,
            message: message || '✅ QA Verification Passed: All test cases passed. Issue approved for closure.'
        });
        
        saveIssues(issues);
        res.json(issue);
    } catch (error) {
        console.error('Error QA pass:', error);
        res.status(500).json({ error: 'Failed to complete QA pass' });
    }
});

// QA Fail
app.post('/api/issues/:id/qa-fail', (req, res) => {
    try {
        const { message, findings } = req.body;
        
        const issues = getIssues();
        const index = issues.findIndex(i => i.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        
        const issue = issues[index];
        const oldStatus = issue.status;
        const now = new Date().toISOString();
        
        // Update status to Reopened
        issue.status = 'Reopened';
        issue.qaStatus = 'Failed';
        issue.updated_at = now;
        
        // Reassign to original dev agent
        const originalDev = issue.originalDevAgent || issue.assignedAgent;
        if (originalDev && originalDev !== 'QA Agent') {
            issue.assignedAgent = originalDev;
            issue.assignee = originalDev.replace(' Agent', '');
        }
        
        // Add activity log
        if (!issue.activityLog) issue.activityLog = [];
        issue.activityLog.push({
            action: 'Status Changed',
            timestamp: now,
            from: oldStatus,
            to: 'Reopened'
        });
        
        issue.activityLog.push({
            action: 'QA Complete',
            timestamp: now,
            details: 'QA Failed. Issues found. Reopening for developer fixes.'
        });
        
        issue.activityLog.push({
            action: 'Reassigned',
            timestamp: now,
            details: `Reassigned to ${issue.assignedAgent} to address QA findings`
        });
        
        // Add comment with QA findings
        if (!issue.comments) issue.comments = [];
        issue.comments.push({
            author: 'QA Agent',
            timestamp: now,
            message: message || `❌ QA Failed: ${findings || 'Issues found during testing. Reassigning to developer.'}`
        });
        
        saveIssues(issues);
        res.json(issue);
    } catch (error) {
        console.error('Error QA fail:', error);
        res.status(500).json({ error: 'Failed to process QA fail' });
    }
});

// Approve feature (for Feature workflow)
app.post('/api/issues/:id/approve', (req, res) => {
    try {
        const issues = getIssues();
        const index = issues.findIndex(i => i.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        
        const issue = issues[index];
        const oldStatus = issue.status;
        const now = new Date().toISOString();
        
        // Update status
        issue.status = 'Open';
        issue.updated_at = now;
        
        // Reassign to appropriate dev agent based on scope
        if (issue.category === 'Feature') {
            const scope = issue.description.toLowerCase();
            if (scope.includes('backend') || scope.includes('api')) {
                issue.assignedAgent = 'Backend Developer Agent';
                issue.assignee = 'Backend Developer';
            } else if (scope.includes('data')) {
                issue.assignedAgent = 'Data Team Agent';
                issue.assignee = 'Data Integration Team';
            } else {
                issue.assignedAgent = 'Frontend Developer Agent';
                issue.assignee = 'Frontend Developer';
            }
        }
        
        // Add activity log
        if (!issue.activityLog) issue.activityLog = [];
        issue.activityLog.push({
            action: 'Status Changed',
            timestamp: now,
            from: oldStatus,
            to: 'Open',
            details: 'Feature approved. Ready for implementation.'
        });
        
        issue.activityLog.push({
            action: 'Reassigned',
            timestamp: now,
            details: `Assigned to ${issue.assignedAgent} for implementation`
        });
        
        // Add approval comment
        if (!issue.comments) issue.comments = [];
        issue.comments.push({
            author: 'System',
            timestamp: now,
            message: `✅ Feature approved! Assigned to ${issue.assignedAgent} for implementation.`
        });
        
        saveIssues(issues);
        res.json(issue);
    } catch (error) {
        console.error('Error approving feature:', error);
        res.status(500).json({ error: 'Failed to approve feature' });
    }
});

// ===== SPRINT MANAGEMENT ENDPOINTS =====

// Get all sprints
app.get('/api/sprints', (req, res) => {
    try {
        const sprints = getSprints();
        res.json(sprints);
    } catch (error) {
        console.error('Error fetching sprints:', error);
        res.status(500).json({ error: 'Failed to fetch sprints' });
    }
});

// Get single sprint
app.get('/api/sprints/:id', (req, res) => {
    try {
        const sprints = getSprints();
        const sprint = sprints.find(s => s.id === req.params.id);
        if (!sprint) {
            return res.status(404).json({ error: 'Sprint not found' });
        }
        
        // Get full issue details for the sprint
        const issues = getIssues();
        const sprintIssues = sprint.issueIds.map(id => issues.find(i => i.id === id)).filter(Boolean);
        
        // Calculate statistics
        const stats = {
            total: sprintIssues.length,
            todo: sprintIssues.filter(i => i.status === 'Open').length,
            inProgress: sprintIssues.filter(i => i.status === 'In Progress').length,
            inQA: sprintIssues.filter(i => i.status === 'Ready for QA' || i.status === 'In QA Review').length,
            done: sprintIssues.filter(i => i.status === 'Closed').length,
            velocity: sprintIssues.filter(i => i.status === 'Closed').length
        };
        
        res.json({
            ...sprint,
            issues: sprintIssues,
            statistics: stats
        });
    } catch (error) {
        console.error('Error fetching sprint:', error);
        res.status(500).json({ error: 'Failed to fetch sprint' });
    }
});

// Create new sprint
app.post('/api/sprints', (req, res) => {
    try {
        const { name, startDate, endDate, goals } = req.body;
        
        if (!name || !startDate || !endDate) {
            return res.status(400).json({ error: 'Name, start date, and end date are required' });
        }
        
        const counters = getCounters();
        counters['SPRINT'] = (counters['SPRINT'] || 0) + 1;
        saveCounters(counters);
        
        const newSprint = {
            id: `SPRINT-${String(counters['SPRINT']).padStart(3, '0')}`,
            name,
            startDate,
            endDate,
            status: 'Planned',
            goals: goals || '',
            issueIds: []
        };
        
        const sprints = getSprints();
        sprints.push(newSprint);
        saveSprints(sprints);
        
        res.status(201).json(newSprint);
    } catch (error) {
        console.error('Error creating sprint:', error);
        res.status(500).json({ error: 'Failed to create sprint' });
    }
});

// Update sprint
app.put('/api/sprints/:id', (req, res) => {
    try {
        const { name, startDate, endDate, status, goals, issueIds } = req.body;
        
        const sprints = getSprints();
        const index = sprints.findIndex(s => s.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Sprint not found' });
        }
        
        const sprint = sprints[index];
        
        if (name !== undefined) sprint.name = name;
        if (startDate !== undefined) sprint.startDate = startDate;
        if (endDate !== undefined) sprint.endDate = endDate;
        if (status !== undefined) sprint.status = status;
        if (goals !== undefined) sprint.goals = goals;
        if (issueIds !== undefined) sprint.issueIds = issueIds;
        
        saveSprints(sprints);
        res.json(sprint);
    } catch (error) {
        console.error('Error updating sprint:', error);
        res.status(500).json({ error: 'Failed to update sprint' });
    }
});

// Delete sprint
app.delete('/api/sprints/:id', (req, res) => {
    try {
        let sprints = getSprints();
        const index = sprints.findIndex(s => s.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Sprint not found' });
        }
        
        const sprint = sprints[index];
        
        // Remove sprint reference from all issues
        const issues = getIssues();
        issues.forEach(issue => {
            if (issue.sprintId === sprint.id) {
                issue.sprintId = null;
            }
        });
        saveIssues(issues);
        
        sprints.splice(index, 1);
        saveSprints(sprints);
        
        res.json({ message: 'Sprint deleted successfully' });
    } catch (error) {
        console.error('Error deleting sprint:', error);
        res.status(500).json({ error: 'Failed to delete sprint' });
    }
});

// Assign issue to sprint
app.post('/api/sprints/:sprintId/issues/:issueId', (req, res) => {
    try {
        const sprints = getSprints();
        const sprintIndex = sprints.findIndex(s => s.id === req.params.sprintId);
        
        if (sprintIndex === -1) {
            return res.status(404).json({ error: 'Sprint not found' });
        }
        
        const issues = getIssues();
        const issueIndex = issues.findIndex(i => i.id === req.params.issueId);
        
        if (issueIndex === -1) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        
        const sprint = sprints[sprintIndex];
        const issue = issues[issueIndex];
        
        // Remove from old sprint if applicable
        if (issue.sprintId && issue.sprintId !== sprint.id) {
            const oldSprint = sprints.find(s => s.id === issue.sprintId);
            if (oldSprint) {
                oldSprint.issueIds = oldSprint.issueIds.filter(id => id !== issue.id);
            }
        }
        
        // Add to new sprint
        if (!sprint.issueIds.includes(issue.id)) {
            sprint.issueIds.push(issue.id);
        }
        
        // Update issue
        issue.sprintId = sprint.id;
        
        // Add activity log
        const now = new Date().toISOString();
        if (!issue.activityLog) issue.activityLog = [];
        issue.activityLog.push({
            action: 'Sprint Assignment',
            timestamp: now,
            details: `Added to ${sprint.name}`
        });
        issue.updated_at = now;
        
        saveSprints(sprints);
        saveIssues(issues);
        
        res.json({ sprint, issue });
    } catch (error) {
        console.error('Error assigning issue to sprint:', error);
        res.status(500).json({ error: 'Failed to assign issue to sprint' });
    }
});

// Remove issue from sprint
app.delete('/api/sprints/:sprintId/issues/:issueId', (req, res) => {
    try {
        const sprints = getSprints();
        const sprintIndex = sprints.findIndex(s => s.id === req.params.sprintId);
        
        if (sprintIndex === -1) {
            return res.status(404).json({ error: 'Sprint not found' });
        }
        
        const issues = getIssues();
        const issueIndex = issues.findIndex(i => i.id === req.params.issueId);
        
        if (issueIndex === -1) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        
        const sprint = sprints[sprintIndex];
        const issue = issues[issueIndex];
        
        // Remove from sprint
        sprint.issueIds = sprint.issueIds.filter(id => id !== issue.id);
        issue.sprintId = null;
        
        // Add activity log
        const now = new Date().toISOString();
        if (!issue.activityLog) issue.activityLog = [];
        issue.activityLog.push({
            action: 'Sprint Unassigned',
            timestamp: now,
            details: `Removed from ${sprint.name}`
        });
        issue.updated_at = now;
        
        saveSprints(sprints);
        saveIssues(issues);
        
        res.json({ message: 'Issue removed from sprint' });
    } catch (error) {
        console.error('Error removing issue from sprint:', error);
        res.status(500).json({ error: 'Failed to remove issue from sprint' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Issue Tracker server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
    console.log('Initializing data file if needed...');
    ensureDataFile();
    console.log('✅ Agile Workflow Engine initialized');
    console.log('✅ QA Workflow: Dev → Ready for QA → QA Agent → Pass/Fail');
    console.log('✅ Sprint Management: Kanban board with To Do, In Progress, In QA, Done');
    console.log('✅ Auto-assignment rules loaded');
});