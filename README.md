# Issue Tracker Dashboard

A standalone web-based Issue Tracker for managing features, bugs, security findings, and sprints.

## Features

- **Dashboard View**: Statistics on total issues, open, in-progress, closed, and blocked items
- **List View**: Filterable and searchable table of all issues
- **CRUD Operations**: Create, read, update, and delete issues
- **Categories**: Features, Bugs, Security Findings, Sprints
- **Status Tracking**: Open, In Progress, Closed, Blocked
- **Priority Levels**: P0 (Critical), P1 (High), P2 (Medium), P3 (Low)
- **Data Persistence**: Simple JSON file storage (no database required)

## Installation

```bash
# Navigate to the project directory
cd /Users/admin/.openclaw/workspace/issue-tracker

# Install dependencies
npm install
```

## Running the Application

```bash
# Start the server
npm start

# Or directly
node server.js
```

The application will be available at **http://localhost:8080**

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/issues` | Get all issues |
| GET | `/api/issues/:id` | Get single issue |
| POST | `/api/issues` | Create new issue |
| PUT | `/api/issues/:id` | Update issue |
| DELETE | `/api/issues/:id` | Delete issue |

## Data Model

- **id**: Unique identifier
- **title**: Issue title (required)
- **description**: Issue details
- **category**: Feature | Bug | Security | Sprint
- **status**: Open | In Progress | Closed | Blocked
- **priority**: P0 | P1 | P2 | P3
- **assignee**: Assigned person
- **created_at**: Creation timestamp
- **updated_at**: Last update timestamp

## File Structure

```
issue-tracker/
├── server.js          # Express server
├── public/
│   └── index.html     # Frontend UI
├── data/
│   └── issues.json    # Data storage (auto-created)
├── package.json       # Dependencies
└── README.md          # Documentation
```

## Port Configuration

The application runs on **port 8080** by default. Do not change this port as port 7010 is reserved for the Agent Dashboard.
