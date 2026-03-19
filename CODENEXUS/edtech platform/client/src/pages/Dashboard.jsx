import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import XPNotification from '../components/XPNotification';
import ClassSelector from '../components/ClassSelector';
import SkillTree from '../components/SkillTree';
import Leaderboard from '../components/Leaderboard';
import ChallengeInterface from '../components/ChallengeInterface';
import BadgeShowcase from '../components/BadgeShowcase';
import './Dashboard.css';

export default function Dashboard() {
  const { user, isNewUser, clearNewUser, logout } = useAuth();
  const [showXP, setShowXP] = useState(false);
  const [showClassPrompt, setShowClassPrompt] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (isNewUser) {
      const timer = setTimeout(() => setShowXP(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isNewUser]);

  useEffect(() => {
    if (showXP) {
      const timer = setTimeout(() => {
        clearNewUser();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showXP, clearNewUser]);

  const xpPercent = user ? Math.min((user.xp % 1000) / 10, 100) : 0;
  const nextLevelXP = user ? Math.ceil(user.xp / 1000) * 1000 : 1000;

  return (
    <div className="dashboard">
      <XPNotification amount={100} message="Welcome Bonus!" show={showXP} />

      {/* Sidebar */}
      <aside className="dash-sidebar glass-strong">
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <span className="sidebar-name">Code Nexus</span>
        </div>

        <nav className="sidebar-nav">
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }} className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Dashboard
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('courses'); }} className={`nav-item ${activeTab === 'courses' ? 'active' : ''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            Courses
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('challenges'); }} className={`nav-item ${activeTab === 'challenges' ? 'active' : ''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            Challenges
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('leaderboard'); }} className={`nav-item ${activeTab === 'leaderboard' ? 'active' : ''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            Leaderboard
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('settings'); }} className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            Settings
          </a>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={logout}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dash-main">
        {/* Top Bar */}
        <header className="dash-topbar">
          <div>
            <h1 className="dash-greeting">
              Welcome back, <span className="text-gradient">{user?.name || 'Scholar'}</span> 👋
            </h1>
            <p className="dash-tagline">Ready to level up today?</p>
          </div>
          <div className="dash-user-pill">
            <div className="user-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || 'S'}
            </div>
            <div className="user-meta">
              <span className="user-alias">@{user?.userId || 'scholar'}</span>
              <span className="user-level">Level {user?.level || 1}</span>
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <>
            {/* Stats Row */}
            <div className="dash-stats-row">
              <div className="dash-stat-card">
                <div className="stat-card-icon cyan">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <div className="stat-card-data">
                  <span className="stat-card-value">{user?.xp?.toLocaleString() || '100'}</span>
                  <span className="stat-card-label">Total XP</span>
                </div>
              </div>

              <div className="dash-stat-card">
                <div className="stat-card-icon purple">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20V10"></path>
                    <path d="M18 20V4"></path>
                    <path d="M6 20v-4"></path>
                  </svg>
                </div>
                <div className="stat-card-data">
                  <span className="stat-card-value">{user?.level || 1}</span>
                  <span className="stat-card-label">Level</span>
                </div>
              </div>

              <div className="dash-stat-card">
                <div className="stat-card-icon amber">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </div>
                <div className="stat-card-data">
                  <span className="stat-card-value">{user?.badges?.length || 1}</span>
                  <span className="stat-card-label">Badges</span>
                </div>
              </div>

              <div className="dash-stat-card">
                <div className="stat-card-icon green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="stat-card-data">
                  <span className="stat-card-value">{user?.class || 'None'}</span>
                  <span className="stat-card-label">Class</span>
                </div>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="dash-xp-card glass">
              <div className="xp-card-header">
                <span className="xp-card-title">XP Progress to Level {(user?.level || 1) + 1}</span>
                <span className="xp-card-value">{user?.xp || 100} / {nextLevelXP} XP</span>
              </div>
              <div className="xp-card-bar">
                <div className="xp-card-fill" style={{ width: `${xpPercent}%` }}></div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="dash-content-grid">
              <div className="dash-content-main">
                {/* Class Selector */}
                {(!user?.class || showClassPrompt) && (
                  <ClassSelector onSelect={() => setShowClassPrompt(false)} />
                )}

                {/* Skill Tree */}
                <div className="dash-section">
                  <SkillTree onStartChallenge={() => setActiveTab('challenges')} />
                </div>

                {/* Badge Showcase */}
                <div className="dash-section">
                  <BadgeShowcase />
                </div>
              </div>

              <div className="dash-content-side">
                <Leaderboard currentUserId={user?.userId} />
              </div>
            </div>
          </>
        )}

        {activeTab === 'courses' && (
          <div className="dash-section" style={{ padding: '20px' }}>
            <h2>Your Courses & Skill Tree</h2>
            <SkillTree onStartChallenge={() => setActiveTab('challenges')} />
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="dash-section" style={{ padding: '20px' }}>
            <ChallengeInterface />
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="dash-section" style={{ padding: '20px' }}>
            <h2>Global Leaderboard</h2>
            <div style={{ marginTop: '20px' }}>
              <Leaderboard currentUserId={user?.userId} />
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="dash-section" style={{ padding: '20px' }}>
            <h2>Settings</h2>
            <div className="dash-xp-card glass" style={{ marginTop: '20px' }}>
              <p>Account settings and profile customization coming soon.</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
