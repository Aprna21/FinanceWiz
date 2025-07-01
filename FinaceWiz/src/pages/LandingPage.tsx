import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, 
  TrendingUp, 
  Shield, 
  Users, 
  Calculator, 
  Target,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Calculator,
      title: 'Smart Tax Calculator',
      description: 'Advanced algorithms to minimize your tax burden legally'
    },
    {
      icon: Users,
      title: 'Family Planning',
      description: 'Optimize taxes for your entire family with smart planning'
    },
    {
      icon: Target,
      title: 'Savings Goals',
      description: 'Set and achieve ambitious savings targets with gamification'
    },
    {
      icon: Shield,
      title: 'Legal Compliance',
      description: 'All strategies are 100% legal and government compliant'
    },
    {
      icon: TrendingUp,
      title: 'Wealth Growth',
      description: 'Turn saved taxes into long-term wealth building'
    },
    {
      icon: Zap,
      title: 'Maximum Savings',
      description: 'Save up to 60-70% on your annual tax liability'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Software Engineer',
      content: 'Reduced my tax from ₹1,00,000 to just ₹35,000! Amazing platform.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Business Owner',
      content: 'Perfect for family tax planning. Saved over ₹2 lakhs this year.',
      rating: 5
    },
    {
      name: 'Amit Patel',
      role: 'Student',
      content: 'Great for students and families. Easy to use and very effective.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
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
      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen">
        <div className="glass-morphism p-10 rounded-2xl max-w-md w-full mx-auto flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">Welcome to FinanceWiz</h2>
          <p className="text-blue-100 mb-8 text-center">Experience smarter tax optimization and maximize your savings with our AI-powered platform. Legal, smart, and incredibly effective.</p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link to="/login" className="btn-primary w-full sm:w-auto text-lg px-8 py-3 text-center">Login</Link>
            <Link to="/signup" className="btn-secondary w-full sm:w-auto text-lg px-8 py-3 text-center">Sign Up</Link>
            </div>
          </div>
      </div>
    </div>
  );
};

export default LandingPage;