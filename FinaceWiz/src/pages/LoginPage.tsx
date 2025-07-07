import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PiggyBank, Mail, Lock, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useAuth } from '../contexts/AuthContext';

const LOTTIE_PIGGY = 'https://assets10.lottiefiles.com/packages/lf20_0yfsb3a1.json';
const MOTIVATIONAL_QUOTES = [
  'Small savings today, big dreams tomorrow.',
  'Every penny counts. Start your journey!',
  'Smart money, smart future.',
  'Invest in yourself, save for your dreams.',
  'Your financial freedom starts here.'
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [quote] = useState(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  // Social login handler (Google only)
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
              Welcome to FinanceWiz
            </h2>
            <p className="mt-2 text-xs italic text-blue-200 text-center animate-pulse">{quote}</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-xl">
                {error}
              </motion.div>
            )}
            <div className="space-y-4">
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
                    autoComplete="current-password"
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
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-100">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-200 hover:text-white">Forgot your password?</a>
              </div>
            </div>
            <div>
              <button type="submit" disabled={isLoading} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300">
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
            {/* Social logins */}
            <div className="flex flex-col gap-3 mt-4">
              <button type="button" onClick={handleGoogleLogin} className="flex items-center w-full justify-center py-2 px-4 rounded-md bg-white hover:bg-gray-100 border border-gray-300 shadow-sm transition-all">
                <img src="/google.png" alt="Google" className="h-7 w-7" />
              </button>
            </div>
            <div className="text-center">
              <span className="text-blue-100">Don't have an account? </span>
              <Link to="/signup" className="font-medium text-pink-400 hover:text-pink-300">Sign up now</Link>
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

export default LoginPage;