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
      </Router>
    </AuthProvider>
  );
}

export default App;