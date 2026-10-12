import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addToast } = useNotification();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      addToast('Passwords do not match.', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      await register(formData);
      addToast('Account created successfully! Welcome to LuxStore.', 'success');
      navigate('/account');
    } catch (err) {
      addToast(err.message || 'Registration failed.', 'error');
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
          <h1 className="text-xl font-bold text-on-surface">Create an Account</h1>
          <p className="text-xs text-on-surface-variant">
            Join the Atelier for private seasonal previews and complimentary express shipping.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-on-surface-variant mb-1">First Name</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="Jane"
                className="w-full px-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-medium text-on-surface-variant mb-1">Last Name</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                placeholder="Doe"
                className="w-full px-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-on-surface-variant mb-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="jane.doe@example.com"
              className="w-full px-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block font-medium text-on-surface-variant mb-1">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Minimum 8 characters"
              className="w-full px-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block font-medium text-on-surface-variant mb-1">Confirm Password</label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              placeholder="Re-enter password"
              className="w-full px-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors flex items-center justify-center gap-1.5 mt-2"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-on-surface-variant">
          Already registered?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
