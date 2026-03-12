import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-100/50 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold mb-6">
              <Star size={14} className="mr-1 fill-emerald-700" />
              Trusted by 5,000+ Patients
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Your Smile, Our <span className="text-emerald-600">Passion.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
              Experience world-class dental care at Gye Nyame Dentals. We combine advanced technology with a gentle touch to give you the smile you deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 group"
              >
                Book Appointment
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all"
              >
                Our Services
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-100 pt-8">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900">15+</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Years Exp</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900">10k+</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Happy Patients</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900">4.9</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Google Rating</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 lg:mt-0 relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1629909606655-326fb7a9577a?auto=format&fit=crop&q=80&w=1000"
                alt="Modern Dental Office"
                className="w-full h-[500px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Certified Care</p>
                <p className="text-xs text-slate-500">Professional Standards</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">24/7 Support</p>
                <p className="text-xs text-slate-500">Emergency Services</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
