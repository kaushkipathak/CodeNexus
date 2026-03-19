import { useState, useEffect, useMemo } from 'react';
import SignUpModal from '../components/SignUpModal';
import LoginModal from '../components/LoginModal';
import './LandingPage.css';

function Particle({ index, total }) {
  const style = useMemo(() => ({
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 8}s`,
    animationDuration: `${6 + Math.random() * 8}s`,
    width: `${2 + Math.random() * 3}px`,
    height: `${2 + Math.random() * 3}px`,
  }), []);

  return <span className="particle" style={style}></span>;
}

export default function LandingPage() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const switchToSignUp = () => { setShowLogin(false); setShowSignUp(true); };
  const switchToLogin = () => { setShowSignUp(false); setShowLogin(true); };

  return (
    <div className="landing">
      {/* Background Effects */}
      <div className="landing-bg">
        <div className="grid-overlay"></div>
        <div className="radial-glow"></div>
        <div className="radial-glow-2"></div>
        <div className="particles-container">
          {[...Array(20)].map((_, i) => <Particle key={i} index={i} total={20} />)}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`landing-nav ${mounted ? 'visible' : ''}`}>
        <div className="nav-brand">
          <div className="nav-logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <span className="nav-name">Code Nexus</span>
        </div>
        <button className="nav-signin" onClick={() => setShowLogin(true)}>Sign In</button>
      </nav>

      {/* Hero Section */}
      <main className="landing-hero">
        <div className={`hero-content ${mounted ? 'visible' : ''}`}>
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Level up your coding skills
          </div>

          <h1 className="hero-title">
            Master Algorithms.
            <br />
            <span className="text-gradient">Earn XP.</span>
            <br />
            Crush Interviews.
          </h1>

          <p className="hero-subtitle">
            A gamified platform where every algorithm you master earns you XP,
            unlocks new data structures, and pushes you up the leaderboard. Choose your path.
            Build your skill tree. Become an Algorithmist.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => setShowSignUp(true)}>
              <span>Start Journey</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <button className="btn-secondary" onClick={() => setShowLogin(true)}>
              I have an account
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Scholars</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Challenges</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">Paths</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className={`hero-visual ${mounted ? 'visible' : ''}`}>
          <div className="hero-card glass">
            <div className="hero-card-header">
              <div className="hc-avatar">QD</div>
              <div className="hc-info">
                <span className="hc-name">quantum_dev</span>
                <span className="hc-class">Algorithmist • Lv. 12</span>
              </div>
              <div className="hc-rank">#1</div>
            </div>
            <div className="hc-xp-section">
              <div className="hc-xp-header">
                <span>XP Progress</span>
                <span className="hc-xp-value">4,850 / 5,000</span>
              </div>
              <div className="hc-xp-bar">
                <div className="hc-xp-fill" style={{ width: '97%' }}></div>
              </div>
            </div>
            <div className="hc-badges">
              <span className="hc-badge">🏆 Champion</span>
              <span className="hc-badge">🔥 30-Day Streak</span>
              <span className="hc-badge">⚡ Speed Coder</span>
            </div>
          </div>

          {/* Floating elements */}
          <div className="floating-xp">+250 XP</div>
          <div className="floating-badge">🎯 Achievement Unlocked!</div>
        </div>
      </main>

      {/* Features */}
      <section className={`landing-features ${mounted ? 'visible' : ''}`}>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(6, 182, 212, 0.1)', borderColor: 'rgba(6, 182, 212, 0.2)' }}>🎮</div>
            <h3>Gamified Learning</h3>
            <p>Every challenge completed earns XP and unlocks new skill tree nodes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.2)' }}>🌳</div>
            <h3>Skill Trees</h3>
            <p>Visual progression paths customized to your chosen DSA specialization</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>🏆</div>
            <h3>Leaderboards</h3>
            <p>Compete with fellow scholars and climb the global ranking</p>
          </div>
        </div>
      </section>

      {/* Modals */}
      <SignUpModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSwitchToLogin={switchToLogin}
      />
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignUp={switchToSignUp}
      />
    </div>
  );
}
