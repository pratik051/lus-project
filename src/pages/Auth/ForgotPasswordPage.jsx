import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { authService } from '../../services/authService';
import { useNotification } from '../../context/NotificationContext';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      await authService.requestPasswordReset(email);
      setIsSent(true);
      addToast(`Reset instructions dispatched to ${email}`, 'success');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 flex-grow w-full">
      <div className="bg-surface p-6 sm:p-8 rounded-xl border border-surface-variant shadow-sm space-y-6">
        
        <div className="text-center space-y-1">
          <Link to="/" className="text-2xl font-bold tracking-tight text-primary block">
            LuxStore
          </Link>
          <h1 className="text-xl font-bold text-on-surface">Password Recovery</h1>
          <p className="text-xs text-on-surface-variant">
            Enter your account email to receive a secure recovery code.
          </p>
        </div>

        {isSent ? (
          <div className="p-4 bg-[#267347]/10 rounded-xl border border-[#267347]/20 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-[#267347] mx-auto" />
            <h4 className="text-sm font-bold text-on-surface">Instructions Dispatched</h4>
            <p className="text-xs text-on-surface-variant">
              If an account exists for <strong className="text-on-surface">{email}</strong>, a recovery link has been delivered to your inbox.
            </p>
            <Link
              to="/login"
              className="inline-block text-xs font-semibold text-primary underline pt-2"
            >
              Return to Member Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-on-surface-variant mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-on-surface-variant absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors"
            >
              {isLoading ? 'Transmitting...' : 'Send Recovery Instructions'}
            </button>
          </form>
        )}

        <div className="text-center pt-2">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-on-surface"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPasswordPage;
