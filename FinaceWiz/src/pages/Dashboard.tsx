import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Target,
  Zap,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500"></div>
      </div>
    );
  }

  if (!user) return null;

  // Define types for quickActions and achievements
  type QuickAction = {
    icon: React.ElementType;
    path: string;
    color: string;
    title: string;
    description: string;
  };
  type Achievement = {
    icon: React.ElementType;
    title: string;
    description: string;
    earned: boolean;
  };

  const quickActions: QuickAction[] = [];
  const achievements: Achievement[] = [];

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      {/* Professional Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
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
      <Sidebar />
      <div className="flex-1 relative z-10">
        <Navbar />
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Welcome Section */}
            <div className="mb-8 text-center">
              <p className="text-pink-100 text-lg font-medium">Let's start optimizing your taxes and maximizing your savings.</p>
            </div>
            {/* Feature Cards */}
            {/* All feature cards removed as requested */}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tax Saved</p>
                    <p className="text-2xl font-bold text-success-600">₹0</p>
                    <p className="text-xs text-gray-500">Start saving now!</p>
                  </div>
                  <div className="bg-success-100 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-success-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Savings</p>
                    <p className="text-2xl font-bold text-primary-600">₹0</p>
                    <p className="text-xs text-gray-500">Begin your journey</p>
                  </div>
                  <div className="bg-primary-100 p-3 rounded-full">
                    <Zap className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Family Members</p>
                    <p className="text-2xl font-bold text-purple-600">0</p>
                    <p className="text-xs text-gray-500">Add family members</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Goal Progress</p>
                    <p className="text-2xl font-bold text-orange-600">0%</p>
                    <p className="text-xs text-gray-500">Set your first goal</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Target className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Actions */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="card p-6"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quickActions.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <motion.button
                          key={index}
                          onClick={() => navigate(action.path)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 text-left"
                        >
                          <div className={`p-3 rounded-full ${action.color} mr-4`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{action.title}</h3>
                            <p className="text-sm text-gray-600">{action.description}</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="card p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements</h2>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={index}
                        className={`flex items-center p-3 rounded-xl ${
                          achievement.earned 
                            ? 'bg-success-50 border border-success-200' 
                            : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className={`p-2 rounded-full ${
                          achievement.earned ? 'bg-success-500' : 'bg-gray-400'
                        } mr-3`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h3 className={`font-semibold ${
                            achievement.earned ? 'text-success-800' : 'text-gray-600'
                          }`}>
                            {achievement.title}
                          </h3>
                          <p className={`text-xs ${
                            achievement.earned ? 'text-success-600' : 'text-gray-500'
                          }`}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="card p-6 mt-8"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Get Started</h2>
              <div className="text-center py-8">
                <Zap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Welcome to FinanceWiz!</h3>
                <p className="text-gray-500 mb-6">Start by calculating your taxes or adding family members to begin your savings journey.</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => navigate('/tax-calculator')}
                    className="btn-primary"
                  >
                    Calculate Tax
                  </button>
                  <button
                    onClick={() => navigate('/family')}
                    className="btn-secondary"
                  >
                    Add Family
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;