import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Calendar, Clock, User, Mail, Stethoscope, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const services = [
  'General Checkup',
  'Teeth Whitening',
  'Dental Implants',
  'Root Canal',
  'Braces / Invisalign',
  'Emergency Care',
];

export default function BookingForm() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    patientName: user?.displayName || '',
    email: user?.email || '',
    date: '',
    time: '',
    service: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Please login to book an appointment.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, 'appointments'), {
        ...formData,
        uid: user.uid,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setFormData({
        patientName: user?.displayName || '',
        email: user?.email || '',
        date: '',
        time: '',
        service: '',
      });
    } catch (err: any) {
      console.error('Booking error:', err);
      setError('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-[2.5rem] shadow-2xl text-center max-w-xl mx-auto border border-emerald-100"
      >
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Booking Confirmed!</h2>
        <p className="text-slate-600 mb-8">
          Your appointment request has been received. We will contact you shortly to confirm the details.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all"
        >
          Book Another
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-2xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Book Your Visit</h2>
        <p className="text-slate-500">Fill out the form below to schedule your dental appointment.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <User size={16} className="text-emerald-600" />
              Full Name
            </label>
            <input
              required
              type="text"
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Mail size={16} className="text-emerald-600" />
              Email Address
            </label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <Stethoscope size={16} className="text-emerald-600" />
            Service Required
          </label>
          <select
            required
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all appearance-none"
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Calendar size={16} className="text-emerald-600" />
              Preferred Date
            </label>
            <input
              required
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Clock size={16} className="text-emerald-600" />
              Preferred Time
            </label>
            <input
              required
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 text-sm"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          disabled={loading}
          type="submit"
          className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Confirm Booking'
          )}
        </button>

        {!user && (
          <p className="text-center text-sm text-slate-500 mt-4">
            You must be logged in to book an appointment.
          </p>
        )}
      </form>
    </div>
  );
}
