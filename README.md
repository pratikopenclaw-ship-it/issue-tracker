# Issue Tracker Dashboard v1

A lightweight, standalone web-based issue tracking system for managing features, bugs, security findings, and sprint planning. Built with Express.js and vanilla JavaScript.

## Overview

Issue Tracker v1 is the original issue tracking system designed for managing development tasks across multiple projects. It uses a simple JSON file-based storage system - no database required!

### Key Features

- **Dashboard View**: Real-time statistics on total issues, open items, in-progress tasks, closed issues, and blocked items
- **List View**: Filterable and searchable table of all issues with sorting capabilities
- **CRUD Operations**: Full Create, Read, Update, and Delete functionality for issues
- **Categories**: 
  - **FET-***: Feature requests
  - **BUG-***: Bug reports  
  - **SI-***: Security issues/findings
  - **SPRINT-***: Sprint planning
- **Status Tracking**: Open, In Progress, Closed, Blocked
- **Priority Levels**: P0 (Critical), P1 (High), P2 (Medium), P3 (Low)
- **Data Persistence**: Simple JSON file storage (auto-saved)
- **Cyberpunk Theme**: Neon color scheme (Cyan, Magenta, Yellow, Purple)

## Quick Start

### Prerequisites
- Node.js 16+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/pratikopenclaw-ship-it/issue-tracker.git

# Navigate to the project directory
cd issue-tracker

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the server
npm start

# Or run directly with Node
node server.js
```

The application will be available at: **http://localhost:8080**

### Default Data

On first run, the system automatically creates:
- Sample issues (BUG-001, FET-001, SI-001, SPRINT-001)
- Issue counters for auto-numbering
- Sprint tracking data

## Project Structure

```
issue-tracker/
├── server.js              # Express server + API endpoints
├── public/
│   └── index.html         # Single-page frontend application
├── data/
│   ├── issues.json        # Issue data storage
│   ├── counters.json      # Auto-increment counters
│   └── sprints.json       # Sprint management data
├── package.json           # Dependencies
└── README.md              # Documentation
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/issues` | Get all issues (with optional filters) |
| GET | `/api/issues/:id` | Get single issue by ID |
| GET | `/api/issues/:id/history` | Get issue history/activity |
| POST | `/api/issues` | Create new issue |
| PUT | `/api/issues/:id` | Update existing issue |
| DELETE | `/api/issues/:id` | Delete issue |
| GET | `/api/sprints` | Get all sprints |
| GET | `/api/sprints/active` | Get active sprint |
| POST | `/api/sprints` | Create new sprint |
| PUT | `/api/sprints/:id` | Update sprint |
| PATCH | `/api/sprints/:id/complete` | Complete sprint |
| GET | `/api/stats` | Get dashboard statistics |

### Query Parameters (GET /api/issues)

- `status` - Filter by status (open, in-progress, closed, blocked)
- `category` - Filter by category (feature, bug, security, sprint)
- `priority` - Filter by priority (p0, p1, p2, p3)
- `assignee` - Filter by assignee
- `search` - Search in title/description

## Issue Naming Conventions

| Prefix | Type | Example |
|--------|------|---------|
| FET-XXX | Feature Request | FET-001: Add dark mode |
| BUG-XXX | Bug Report | BUG-001: Login button not working |
| SI-XXX | Security Issue | SI-001: XSS vulnerability in input |
| SPRINT-XXX | Sprint Planning | SPRINT-001: Q2 2026 Planning |

## Data Model

### Issue Object
```json
{
  "id": "BUG-001",
  "title": "Frontend Webpack Build Corruption",
  "description": "Detailed description here...",
  "category": "Bug",
  "status": "Open",
  "priority": "P0",
  "assignee": "Frontend Developer",
  "created_at": "2026-03-26T10:00:00Z",
  "updated_at": "2026-03-26T12:00:00Z",
  "comments": [],
  "labels": [],
  "reporter": "System"
}
```

### Sprint Object
```json
{
  "id": "SPRINT-001",
  "name": "Q2 2026 Sprint Planning",
  "description": "Sprint goals...",
  "startDate": "2026-03-01",
  "endDate": "2026-03-15",
  "status": "active",
  "issues": ["BUG-001", "FET-002"]
}
```

## Configuration

### Port
Default port is **8080**. This is configured in `server.js`:
```javascript
const PORT = process.env.PORT || 8080;
```

To use a different port:
```bash
PORT=3000 npm start
```

### Data Directory
Data is stored in `/data/` directory:
- `issues.json` - All issue data
- `counters.json` - Issue ID counters
- `sprints.json` - Sprint data

## Development

### Adding New Features

The application is built as a single-page application (SPA) with:
- **Backend**: Express.js REST API
- **Frontend**: Vanilla JavaScript with Tailwind CSS

To modify the UI:
1. Edit `public/index.html`
2. The JavaScript is embedded in the HTML file
3. Styling uses Tailwind CSS CDN

To modify the API:
1. Edit `server.js`
2. Restart the server

### Environment Variables

- `PORT` - Server port (default: 8080)
- `NODE_ENV` - Environment mode (development/production)

## Comparison with Issue Tracker v2

| Feature | v1 (This) | v2 |
|---------|-----------|-----|
| Authentication | None (open) | JWT with roles |
| Database | JSON files | JSON files (extensible) |
| UI | Vanilla JS | React + TypeScript |
| Multi-project | No | Yes |
| Sprint Management | Basic | Advanced |
| Reports | Basic | Advanced |
| Theme | Cyberpunk | Corporate (Jira-like) |
| Mobile Support | Responsive | Responsive |

## Use Cases

Issue Tracker v1 is ideal for:
- Small teams needing quick issue tracking
- Projects without authentication requirements
- Development environments
- Personal task management
- Integration with agent workflows

## Agent Integration

This issue tracker is designed to work with AI agents:
- Agents can query issues via REST API
- Automatic status updates when agents spawn/complete work
- Integration with WebScout and Product Manager agents
- Supports automated sprint planning

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 8080
lsof -ti:8080 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

### Data Not Saving
- Check write permissions on `/data/` directory
- Ensure disk space is available

### Frontend Not Loading
- Check that `public/index.html` exists
- Verify `server.js` is serving static files correctly

## License

MIT

## Author

Created by pratikopenclaw-ship-it

---

**Note**: This is the legacy v1 version. For a more feature-rich experience with authentication, multi-project support, and React-based UI, see [Issue Tracker v2](https://github.com/pratikopenclaw-ship-it/Issue_tracker_dashboard).

**Last Updated:** 2026-03-28
