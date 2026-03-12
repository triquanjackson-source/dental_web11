import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, ShieldCheck, Star } from 'lucide-react';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore, if not create profile
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          role: 'patient', // Default role
          createdAt: serverTimestamp(),
        });
      }

      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Failed to login with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4 bg-slate-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100"
      >
        <div className="p-8 lg:p-12">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200">
              <span className="text-white font-bold text-3xl">G</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500">Join Gye Nyame Dentals for personalized care.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm disabled:opacity-50 group"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-slate-300 border-t-emerald-600 rounded-full animate-spin" />
            ) : (
              <>
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Continue with Google
              </>
            )}
          </button>

          <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-slate-500">
              <ShieldCheck size={18} className="text-emerald-600" />
              <span className="text-xs font-medium">Secure Login</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Star size={18} className="text-emerald-600" />
              <span className="text-xs font-medium">Patient Portal</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
