import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './SignUpModal.css';

export default function SignUpModal({ isOpen, onClose, onSwitchToLogin }) {
  const { signup, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userId: '',
    password: '',
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.userId || !formData.password) {
      setError('All fields are required');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const result = await signup(formData);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container animate-scale-in" onClick={(e) => e.stopPropagation()}>
        {/* Decorative elements */}
        <div className="modal-glow-top"></div>
        <div className="modal-glow-bottom"></div>

        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Header */}
        <div className="modal-header">
          <div className="modal-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <h2 className="modal-title">Begin Your Journey</h2>
          <p className="modal-subtitle">Join the Code Nexus community</p>
        </div>

        {/* Form */}
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="signup-name">What should we call you?</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                id="signup-name"
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="signup-email">Your academic or personal email</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <polyline points="22,4 12,13 2,4"></polyline>
              </svg>
              <input
                id="signup-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="signup-userid">Choose your coder alias</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              <input
                id="signup-userid"
                type="text"
                name="userId"
                placeholder="e.g. code_wizard_42"
                value={formData.userId}
                onChange={handleChange}
                autoComplete="username"
              />
            </div>
            <span className="input-hint">This will appear on the leaderboards</span>
          </div>

          <div className="input-group">
            <label htmlFor="signup-password">Create a password</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                id="signup-password"
                type="password"
                name="password"
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
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
                Forging Profile...
              </>
            ) : (
              <>
                <span>Create Account</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="modal-footer">
          <p>Already have an account?{' '}
            <button className="link-button" onClick={onSwitchToLogin}>Sign In</button>
          </p>
        </div>
      </div>
    </div>
  );
}
