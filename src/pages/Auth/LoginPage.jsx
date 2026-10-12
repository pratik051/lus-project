import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useNotification();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please enter both email and password.', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      await login(email, password);
      addToast('Welcome back, Jane Doe.', 'success');
      navigate('/account');
    } catch (err) {
      addToast(err.message || 'Login failed.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsSubmitting(true);
    try {
      await login('jane.doe@example.com', 'demo1234');
      addToast('Logged in as Jane Doe (Demo Session).', 'success');
      navigate('/account');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 flex-grow w-full">
      <div className="bg-surface p-6 sm:p-8 rounded-xl border border-surface-variant shadow-sm space-y-6">
        
        <div className="text-center space-y-1">
          <Link to="/" className="text-2xl font-bold tracking-tight text-primary block">
            LuxStore
          </Link>
          <h1 className="text-xl font-bold text-on-surface">Member Sign In</h1>
          <p className="text-xs text-on-surface-variant">
            Access your order history, saved addresses, and member tier.
          </p>
        </div>

        {/* 1-Click Demo Login Banner */}
        <div className="p-3 bg-surface-container rounded-lg border border-surface-variant flex items-center justify-between gap-3 text-xs">
          <div>
            <strong className="block text-on-surface">Reviewer Fast Login</strong>
            <span className="text-[11px] text-on-surface-variant">Pre-fills verified member profile</span>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="px-3 py-1.5 bg-primary text-white rounded-md text-xs font-semibold hover:bg-primary-hover transition-colors shrink-0 flex items-center gap-1"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Demo In</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-on-surface-variant mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-on-surface-variant absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-medium text-on-surface-variant">Password</label>
              <Link to="/forgot-password" className="text-primary hover:underline text-[11px]">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-on-surface-variant absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors flex items-center justify-center gap-1.5 mt-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-on-surface-variant">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Register here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
