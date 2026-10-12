import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export const ContactPage = () => {
  const { addToast } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Order & Product Inquiry',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Your inquiry has been relayed to the Atelier Concierge team.', 'success');
    setFormData({
      name: '',
      email: '',
      subject: 'Order & Product Inquiry',
      message: '',
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Client Advisory
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
          Contact LuxStore Concierge
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
          Questions regarding tailoring specifications, sizing, leather care, or bespoke commissions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Info Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-5 bg-surface rounded-xl border border-surface-variant space-y-2 text-xs">
            <Mail className="w-4 h-4 text-primary" />
            <span className="font-bold block text-on-surface">Electronic Mail</span>
            <span className="text-on-surface-variant">concierge@luxstore.internal</span>
            <span className="text-[10px] text-on-surface-variant block">Typical response time: under 4 hours</span>
          </div>

          <div className="p-5 bg-surface rounded-xl border border-surface-variant space-y-2 text-xs">
            <Phone className="w-4 h-4 text-primary" />
            <span className="font-bold block text-on-surface">Private Telephone Desk</span>
            <span className="text-on-surface-variant">+39 02 8940 1200 (Milan)</span>
            <span className="text-[10px] text-on-surface-variant block">Mon – Sat, 9:00 AM – 7:00 PM CET</span>
          </div>

          <div className="p-5 bg-surface rounded-xl border border-surface-variant space-y-2 text-xs">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-bold block text-on-surface">Studio Headquarters</span>
            <span className="text-on-surface-variant">Via Sant'Andrea 18, 20121 Milan, Italy</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 bg-surface p-6 rounded-xl border border-surface-variant shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-on-surface-variant mb-1">Your Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Jane Doe"
                className="w-full px-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
              />
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
              <label className="block font-medium text-on-surface-variant mb-1">Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
              >
                <option>Order & Product Inquiry</option>
                <option>Custom Sizing Advice</option>
                <option>Leather Care Consultation</option>
                <option>Press & Editorial Inquiries</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-on-surface-variant mb-1">Your Message</label>
              <textarea
                rows="4"
                required
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="How may our concierge assist you?"
                className="w-full px-3 py-2.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
