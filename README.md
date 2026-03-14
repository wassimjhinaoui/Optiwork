# 🚀 OptiWork

> **All-in-one platform for remote work efficiency, stress management, and productivity optimization.**

OptiWork empowers organizations to monitor, motivate, and manage their remote workforce through role-based dashboards, smart task assignment, gamification mechanics, and real-time productivity analytics.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Remote work introduces unique challenges: isolation, unclear performance visibility, stress accumulation, and uneven workload distribution. **OptiWork** tackles these head-on with a dual-dashboard system built for both HR managers and engineers, giving each role the tools they actually need.

---

## ✨ Features

### 👔 HR Manager Dashboard
- Full workforce overview with productivity KPIs
- Employee well-being and stress indicators
- Task distribution monitoring across teams
- Performance trends and comparison charts

### 🧑‍💻 Engineer Dashboard
- Personal productivity metrics and progress tracking
- Task queue with priority breakdown
- Gamification system: XP points, badges, leaderboards, and streaks
- Stress and workload balance indicators

### 🤖 Smart Task Assigner
- AI-powered task assignment based on employee availability, skill set, and current workload
- Prevents burnout by detecting overloaded team members
- Ensures balanced and fair distribution across the team

### 🎮 Gamification Engine
- Points and XP for task completion
- Achievement badges and milestone rewards
- Team leaderboards to encourage healthy competition
- Streak tracking for sustained productivity

### 📊 Analytics & Visualizations
- Real-time productivity charts and heatmaps
- Individual vs. team performance comparisons
- Stress level tracking over time
- Task completion rates and bottleneck detection

---

## 🏗️ Architecture

```
OptiWork
├── Frontend          # React-based SPA with role-based routing
│   ├── HR Dashboard
│   └── Engineer Dashboard
├── Backend           # REST API / business logic layer
│   ├── Auth & User Management
│   ├── Task Assignment Engine
│   └── Analytics Service
└── Database          # Persistent storage for users, tasks, and metrics
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js `>= 18.x`
- npm or yarn
- A running database instance (see configuration)

### Installation

```bash
# Clone the repository
git clone https://github.com/wassimjhinaoui/Optiwork.git
cd Optiwork/project

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database URL, API keys, etc.

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## 🚦 Usage

### HR Manager
1. Log in with an HR account
2. Access the **HR Dashboard** to view team-wide productivity metrics
3. Use the **Smart Task Assigner** to distribute tasks based on current employee workload
4. Monitor stress indicators and flag at-risk employees

### Engineer
1. Log in with an engineer account
2. View your **personal dashboard** with tasks, scores, and progress
3. Complete tasks to earn **XP and badges**
4. Track your productivity streak and compare with teammates on the **leaderboard**

---

## 📁 Project Structure

```
project/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Route-level page components
│   │   ├── hr/           # HR Manager views
│   │   └── engineer/     # Engineer views
│   ├── services/         # API calls and business logic
│   ├── store/            # State management
│   └── utils/            # Helpers and constants
├── public/               # Static assets
├── .env.example          # Environment variable template
└── package.json
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<p align="center">Built with ❤️ to make remote work smarter, healthier, and more engaging.</p>
