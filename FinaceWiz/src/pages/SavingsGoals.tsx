import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Target, 
  Plus, 
  Trophy, 
  Calendar,
  TrendingUp,
  Edit,
  Trash2,
  Star,
  ArrowRight,
  Award,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
  targetDate: string;
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  taxBenefit: string;
}

const SavingsGoals: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [goals, setGoals] = useState<SavingsGoal[]>([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    category: '',
    targetDate: '',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    description: '',
    taxBenefit: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const categories = ['Tax Saving', 'Emergency', 'Retirement', 'Education', 'Home', 'Travel', 'Other'];
  const taxBenefitOptions = [
    'None',
    'Section 80C - Up to ₹1.5L deduction',
    'Section 80D - Health Insurance',
    'Section 80CCD(1B) - NPS',
    'Section 24(b) - Home Loan Interest',
    'ELSS - Equity Linked Savings Scheme'
  ];

  const handleAddGoal = () => {
    if (!formData.title || !formData.targetAmount || !formData.targetDate || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    const newGoal: SavingsGoal = {
      id: Date.now().toString(),
      title: formData.title,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount) || 0,
      category: formData.category,
      targetDate: formData.targetDate,
      priority: formData.priority,
      description: formData.description,
      taxBenefit: formData.taxBenefit
    };

    setGoals([...goals, newGoal]);
    setFormData({ 
      title: '', 
      targetAmount: '', 
      currentAmount: '', 
      category: '', 
      targetDate: '', 
      priority: 'Medium', 
      description: '', 
      taxBenefit: '' 
    });
    setShowAddForm(false);
  };

  const handleEditGoal = (goal: SavingsGoal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      category: goal.category,
      targetDate: goal.targetDate,
      priority: goal.priority,
      description: goal.description,
      taxBenefit: goal.taxBenefit
    });
    setShowAddForm(true);
  };

  const handleUpdateGoal = () => {
    if (!editingGoal) return;

    const updatedGoal = {
      ...editingGoal,
      title: formData.title,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount) || 0,
      category: formData.category,
      targetDate: formData.targetDate,
      priority: formData.priority,
      description: formData.description,
      taxBenefit: formData.taxBenefit
    };

    setGoals(goals.map(goal => 
      goal.id === editingGoal.id ? updatedGoal : goal
    ));
    
    setEditingGoal(null);
    setFormData({ 
      title: '', 
      targetAmount: '', 
      currentAmount: '', 
      category: '', 
      targetDate: '', 
      priority: 'Medium', 
      description: '', 
      taxBenefit: '' 
    });
    setShowAddForm(false);
  };

  const handleDeleteGoal = (id: string) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      setGoals(goals.filter(goal => goal.id !== id));
    }
  };

  const totalTargetAmount = 0;
  const totalCurrentAmount = 0;
  const overallProgress = 0;
  const achievedGoals = 0;
  const pendingGoals = 0;

  if (!user) return null;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      
      <div className="flex-1">
        <Navbar />
        
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                  <Target className="h-8 w-8 text-primary-600 mr-3" />
                  Savings Goals
                </h1>
                <p className="text-gray-600">
                  Set and track your financial goals with gamification
                </p>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Goal
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Goals</p>
                    <p className="text-3xl font-bold text-primary-600">{goals.length}</p>
                  </div>
                  <div className="bg-primary-100 p-3 rounded-full">
                    <Target className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Achieved</p>
                    <p className="text-3xl font-bold text-success-600">{achievedGoals}</p>
                  </div>
                  <div className="bg-success-100 p-3 rounded-full">
                    <Trophy className="h-6 w-6 text-success-600" />
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                    <p className="text-3xl font-bold text-orange-600">{pendingGoals}</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                    <p className="text-3xl font-bold text-purple-600">{overallProgress.toFixed(0)}%</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="card p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Overall Savings Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success-600 mb-2">
                    ₹{totalCurrentAmount.toLocaleString()}
                  </div>
                  <div className="text-gray-600">Current Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    ₹{totalTargetAmount.toLocaleString()}
                  </div>
                  <div className="text-gray-600">Target Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    ₹{(totalTargetAmount - totalCurrentAmount).toLocaleString()}
                  </div>
                  <div className="text-gray-600">Remaining</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress to all goals</span>
                  <span>{overallProgress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-success-500 h-4 rounded-full"
                    style={{ width: `${Math.min(overallProgress, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Add/Edit Form */}
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-8 mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingGoal ? 'Edit Savings Goal' : 'Add New Savings Goal'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Goal Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="input-field"
                      placeholder="Enter goal title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Amount (₹) *
                    </label>
                    <input
                      type="number"
                      value={formData.targetAmount}
                      onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                      className="input-field"
                      placeholder="Enter target amount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.currentAmount}
                      onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
                      className="input-field"
                      placeholder="Enter current amount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Date *
                    </label>
                    <input
                      type="date"
                      value={formData.targetDate}
                      onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'High' | 'Medium' | 'Low' })}
                      className="input-field"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tax Benefit
                    </label>
                    <select
                      value={formData.taxBenefit}
                      onChange={(e) => setFormData({ ...formData, taxBenefit: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Select tax benefit</option>
                      {taxBenefitOptions.map(benefit => (
                        <option key={benefit} value={benefit}>{benefit}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="input-field"
                      rows={3}
                      placeholder="Enter goal description"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingGoal(null);
                      setFormData({ 
                        title: '', 
                        targetAmount: '', 
                        currentAmount: '', 
                        category: '', 
                        targetDate: '', 
                        priority: 'Medium', 
                        description: '', 
                        taxBenefit: '' 
                      });
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingGoal ? handleUpdateGoal : handleAddGoal}
                    className="btn-primary"
                  >
                    {editingGoal ? 'Update Goal' : 'Add Goal'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Goals List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {goals.map((goal, index) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100;
                const isAchieved = progress >= 100;
                const daysLeft = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`card p-6 ${isAchieved ? 'ring-2 ring-success-500 bg-success-50' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{goal.title}</h3>
                          {isAchieved && <Award className="h-5 w-5 text-success-600" />}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            goal.priority === 'High' ? 'bg-red-100 text-red-800' :
                            goal.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {goal.priority}
                          </span>
                          <span>{goal.category}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditGoal(goal)}
                          className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteGoal(goal.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="font-semibold">{progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${isAchieved ? 'bg-success-500' : 'bg-primary-500'}`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">₹{goal.currentAmount.toLocaleString()}</span>
                        <span className="font-semibold">₹{goal.targetAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                        </span>
                        {goal.taxBenefit !== 'None' && goal.taxBenefit && (
                          <Star className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      {goal.description && (
                        <p className="text-sm text-gray-600 mt-2">{goal.description}</p>
                      )}
                      {goal.taxBenefit !== 'None' && goal.taxBenefit && (
                        <p className="text-xs text-success-600 mt-1 font-medium">{goal.taxBenefit}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Next Step */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to See Your Complete Financial Picture?
              </h2>
              <p className="text-gray-600 mb-6">
                Generate comprehensive reports to track your progress and optimize your tax savings strategy.
              </p>
              <button
                onClick={() => navigate('/reports')}
                className="btn-primary flex items-center"
              >
                Generate Detailed Reports
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SavingsGoals;