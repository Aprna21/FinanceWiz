import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import TaxCalculator from './pages/TaxCalculator';
import FamilyManager from './pages/FamilyManager';
import ExpenseTracker from './pages/ExpenseTracker';
import SavingsGoals from './pages/SavingsGoals';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen relative overflow-hidden">
          {/* Animated Background for all app pages */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            <div className="absolute inset-0">
              {/* Floating orbs */}
              <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
              <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
              {/* Geometric shapes */}
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white opacity-20 rotate-45 animate-pulse"></div>
              <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-yellow-400 opacity-30 rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-pink-400 opacity-25 rotate-45 animate-pulse" style={{ animationDelay: '3s' }}></div>
              {/* Grid pattern */}
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            </div>
          </div>
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/tax-calculator" element={<PrivateRoute><TaxCalculator /></PrivateRoute>} />
              <Route path="/family" element={<PrivateRoute><FamilyManager /></PrivateRoute>} />
              <Route path="/expenses" element={<PrivateRoute><ExpenseTracker /></PrivateRoute>} />
              <Route path="/savings" element={<PrivateRoute><SavingsGoals /></PrivateRoute>} />
              <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;