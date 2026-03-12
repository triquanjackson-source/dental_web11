import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Activity, Shield, Heart, Zap, Smile } from 'lucide-react';

const services = [
  {
    title: 'General Dentistry',
    description: 'Comprehensive exams, cleanings, and preventive care for the whole family.',
    icon: Activity,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Cosmetic Dentistry',
    description: 'Transform your smile with whitening, veneers, and aesthetic bonding.',
    icon: Sparkles,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Orthodontics',
    description: 'Straighten your teeth with modern braces or clear aligners like Invisalign.',
    icon: Smile,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Oral Surgery',
    description: 'Expert extractions, implants, and surgical procedures with minimal discomfort.',
    icon: Shield,
    color: 'bg-red-50 text-red-600',
  },
  {
    title: 'Emergency Care',
    description: 'Immediate attention for toothaches, broken teeth, and dental trauma.',
    icon: Zap,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Pediatric Care',
    description: 'Gentle and fun dental experiences designed specifically for children.',
    icon: Heart,
    color: 'bg-pink-50 text-pink-600',
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">Our Expertise</h2>
          <p className="text-4xl font-bold text-slate-900 mb-6">Comprehensive Dental Care for Every Need</p>
          <p className="text-slate-600 text-lg">
            We offer a wide range of dental services using the latest technology to ensure your oral health is at its best.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {service.description}
              </p>
              <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-2">
                Learn More
                <div className="w-5 h-px bg-emerald-600 group-hover:w-8 transition-all" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
