import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, orderBy, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Calendar, Clock, User, CheckCircle2, XCircle, Clock3, Filter, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';

export default function Dashboard() {
  const [user] = useAuthState(auth);
  const [role, setRole] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Fetch user role
    const fetchRole = async () => {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setRole(userDoc.data().role);
      }
    };
    fetchRole();

    // Fetch appointments
    let q;
    if (role === 'admin') {
      q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    } else {
      q = query(
        collection(db, 'appointments'),
        where('uid', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apps = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAppointments(apps);
      setLoading(false);
    }, (err) => {
      console.error('Firestore error:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, role]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'appointments', id), { status });
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              {role === 'admin' ? 'Admin Dashboard' : 'My Appointments'}
            </h1>
            <p className="text-slate-500">
              {role === 'admin' 
                ? 'Manage all patient bookings and schedules.' 
                : 'Track your upcoming visits and dental history.'}
            </p>
          </div>
          {role !== 'admin' && (
            <button className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
              New Appointment
            </button>
          )}
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-12 text-center border border-slate-100 shadow-xl">
            <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Appointments Found</h3>
            <p className="text-slate-500 mb-8">You haven't booked any appointments yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {appointments.map((app) => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${
                    app.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' :
                    app.status === 'cancelled' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {app.status === 'confirmed' ? <CheckCircle2 size={32} /> :
                     app.status === 'cancelled' ? <XCircle size={32} /> : <Clock3 size={32} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{app.service}</h3>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        app.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                        app.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-slate-400" />
                        <span className="font-medium text-slate-700">{app.patientName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-slate-400" />
                        <span>{format(new Date(app.date), 'MMMM do, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-slate-400" />
                        <span>{app.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {role === 'admin' && app.status === 'pending' && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateStatus(app.id, 'confirmed')}
                      className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-all"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateStatus(app.id, 'cancelled')}
                      className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
