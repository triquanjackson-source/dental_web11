/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import BookingForm from './components/BookingForm';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { motion, AnimatePresence } from 'motion/react';

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <Services />
      <section className="py-24 bg-white" id="booking">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Ready to Smile?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Book your appointment today and take the first step towards a healthier, brighter smile.
          </p>
        </div>
        <BookingForm />
      </section>
      <footer className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">G</span>
                </div>
                <span className="text-xl font-bold tracking-tight">Gye Nyame Dentals</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed">
                Providing exceptional dental care with a focus on patient comfort and advanced technology. Your smile is our top priority.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Contact Info</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li>123 Dental Plaza, Suite 100</li>
                <li>Accra, Ghana</li>
                <li>+233 123 456 789</li>
                <li>info@gyenyamedentals.com</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
            © {new Date().getFullYear()} Gye Nyame Dentals. All rights reserved.
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans selection:bg-emerald-100 selection:text-emerald-900">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<div className="pt-32 pb-20"><BookingForm /></div>} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

