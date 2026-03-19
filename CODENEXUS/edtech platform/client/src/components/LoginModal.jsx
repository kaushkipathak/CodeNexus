import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './LoginModal.css';

export default function LoginModal({ isOpen, onClose, onSwitchToSignUp }) {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    const result = await login(email, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-glow-top"></div>

        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-header">
          <div className="modal-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
          </div>
          <h2 className="modal-title">Welcome Back</h2>
          <p className="modal-subtitle">Continue your learning journey</p>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="login-email">Email</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <polyline points="22,4 12,13 2,4"></polyline>
              </svg>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="login-password">Password</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                id="login-password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div className="form-error animate-fade-in">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={`submit-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Signing In...
              </>
            ) : (
              <>
                <span>Sign In</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="modal-footer">
          <p>Don&apos;t have an account?{' '}
            <button className="link-button" onClick={onSwitchToSignUp}>Create One</button>
          </p>
        </div>
      </div>
    </div>
  );
}
