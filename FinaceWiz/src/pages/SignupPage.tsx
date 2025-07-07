import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PiggyBank, User, Mail, Lock, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useAuth } from '../contexts/AuthContext';

const LOTTIE_PIGGY = 'https://assets10.lottiefiles.com/packages/lf20_0yfsb3a1.json';
const LOTTIE_CONFETTI = 'https://assets2.lottiefiles.com/packages/lf20_jbrw3hcz.json';
const LOTTIE_CHECK = 'https://assets2.lottiefiles.com/packages/lf20_jbrw3hcz.json';
const MOTIVATIONAL_QUOTES = [
  'Start your savings journey today!',
  'Every rupee saved is a rupee earned.',
  'Dream big, save smart.',
  'Your future self will thank you.',
  'FinanceWiz: Where goals become reality.'
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [quote] = useState(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    let score = 0;
    if (val.length > 5) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/\d/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    setPasswordStrength(score);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    try {
      const success = await signup(name, email, password);
      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  // Social signup handler (Google only)
  const handleGoogleLogin = () => {
    window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?...'; // Replace with your Google OAuth URL
  };

  return (
    <div className={
      `min-h-screen relative overflow-hidden flex items-center justify-center transition-colors duration-500 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600'}`
    }>
      {/* Professional Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Professional gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 animate-gradient-move"></div>
        {/* Subtle geometric shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-slate-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        {/* Professional grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px] opacity-20"></div>
        {/* Subtle lines */}
        <svg className="absolute left-0 top-1/2 w-full h-8 opacity-5 animate-wave-move" viewBox="0 0 1440 80"><path fill="#fff" fillOpacity="0.3" d="M0,40 Q360,80 720,40 T1440,40 V80 H0Z"/></svg>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-sm w-full sm:w-[350px] space-y-4 mt-10 mb-10 sm:mt-16 sm:mb-16 px-2 xs:px-4"
        style={{ maxWidth: '95vw', marginLeft: 'auto', marginRight: 'auto' }}
      >
        <div className={`glass-morphism py-2 px-2 sm:py-3 sm:px-4 rounded-[2.2rem] shadow-2xl border border-white/10 ${darkMode ? 'bg-gray-800/80' : ''}`}> 
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-white drop-shadow-lg">{getGreeting()},</span>
              <PiggyBank className="h-7 w-7 text-pink-300" />
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              {darkMode ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5 text-blue-200" />}
            </button>
          </div>
          <div className="flex flex-col items-center">
            <Player autoplay loop src={LOTTIE_PIGGY} style={{ height: 90, width: 90 }} />
            <h2 className="mt-2 text-3xl font-bold text-white text-center drop-shadow-lg">
              Join FinanceWiz
            </h2>
            <p className="mt-2 text-xs italic text-blue-200 text-center animate-pulse">{quote}</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-xl">
                {error}
              </motion.div>
            )}
            {showSuccess && (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1.1 }} className="flex justify-center">
                <Player autoplay keepLastFrame src={LOTTIE_CHECK} style={{ height: 60, width: 60 }} />
              </motion.div>
            )}
            <div className="space-y-4">
              <div className="transition-all duration-300 focus-within:scale-105">
                <label htmlFor="name" className="sr-only">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="input-field pl-10 bg-white/10 border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-primary-500"
                    placeholder="Full Name"
                  />
                </div>
              </div>
              <div className="transition-all duration-300 focus-within:scale-105">
                <label htmlFor="email" className="sr-only">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="input-field pl-10 bg-white/10 border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-primary-500"
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div className="transition-all duration-300 focus-within:scale-105">
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    className="input-field pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-primary-500"
                    placeholder="Password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-white">
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {/* Password strength meter */}
                <div className="mt-2 h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(passwordStrength / 4) * 100}%` }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength <= 1 ? 'bg-red-500' : passwordStrength === 2 ? 'bg-yellow-400' : passwordStrength === 3 ? 'bg-green-400' : 'bg-blue-500'
                    }`}
                  />
                </div>
                <div className="text-xs text-white mt-1">
                  {passwordStrength === 0 && 'Very weak'}
                  {passwordStrength === 1 && 'Weak'}
                  {passwordStrength === 2 && 'Fair'}
                  {passwordStrength === 3 && 'Good'}
                  {passwordStrength === 4 && 'Strong'}
                </div>
              </div>
              <div className="transition-all duration-300 focus-within:scale-105">
                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="input-field pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-primary-500"
                    placeholder="Confirm Password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-gray-400 hover:text-white">
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button type="submit" disabled={isLoading} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300">
                {isLoading ? 'Signing up...' : 'Sign up'}
              </button>
            </div>
            {/* Social signups */}
            <div className="flex flex-col gap-3 mt-4">
              <button type="button" onClick={handleGoogleLogin} className="flex items-center w-full justify-center py-2 px-4 rounded-md bg-white hover:bg-gray-100 border border-gray-300 shadow-sm transition-all">
                <img src="/google.png" alt="Google" className="h-7 w-7" />
              </button>
            </div>
            <div className="text-center">
              <span className="text-blue-100">Already have an account? </span>
              <Link to="/login" className="font-medium text-pink-400 hover:text-pink-300">Sign in now</Link>
            </div>
          </form>
        </div>
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-200 hover:text-white font-medium">← Back to home</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;