import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Receipt, 
  Plus, 
  TrendingUp, 
  Calendar,
  Tag,
  DollarSign,
  Edit,
  Trash2,
  Filter,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  taxDeductible: boolean;
  section: string;
}

const ExpenseTracker: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    amount: '',
    date: '',
    taxDeductible: false,
    section: ''
  });
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const categories = [
    { value: 'Investment', section: '80C', maxDeduction: 150000 },
    { value: 'Health', section: '80D', maxDeduction: 25000 },
    { value: 'Home', section: '24(b)', maxDeduction: 200000 },
    { value: 'Education', section: '80E', maxDeduction: 0 },
    { value: 'NPS', section: '80CCD(1B)', maxDeduction: 50000 },
    { value: 'Other', section: 'Various', maxDeduction: 0 }
  ];

  const handleAddExpense = () => {
    if (!formData.category || !formData.description || !formData.amount || !formData.date) {
      alert('Please fill in all required fields');
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      category: formData.category,
      description: formData.description,
      amount: parseFloat(formData.amount),
      date: formData.date,
      taxDeductible: formData.taxDeductible,
      section: formData.section
    };

    setExpenses([...expenses, newExpense]);
    setFormData({ category: '', description: '', amount: '', date: '', taxDeductible: false, section: '' });
    setShowAddForm(false);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setFormData({
      category: expense.category,
      description: expense.description,
      amount: expense.amount.toString(),
      date: expense.date,
      taxDeductible: expense.taxDeductible,
      section: expense.section
    });
    setShowAddForm(true);
  };

  const handleUpdateExpense = () => {
    if (!editingExpense) return;

    const updatedExpense = {
      ...editingExpense,
      category: formData.category,
      description: formData.description,
      amount: parseFloat(formData.amount),
      date: formData.date,
      taxDeductible: formData.taxDeductible,
      section: formData.section
    };

    setExpenses(expenses.map(expense => 
      expense.id === editingExpense.id ? updatedExpense : expense
    ));
    
    setEditingExpense(null);
    setFormData({ category: '', description: '', amount: '', date: '', taxDeductible: false, section: '' });
    setShowAddForm(false);
  };

  const handleDeleteExpense = (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(expense => expense.id !== id));
    }
  };

  const filteredExpenses = [];
  const totalExpenses = 0;
  const taxDeductibleExpenses = 0;
  const deductionsBySection = {};

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
                  <Receipt className="h-8 w-8 text-primary-600 mr-3" />
                  Expense Tracker
                </h1>
                <p className="text-gray-600">
                  Track your expenses and maximize tax-deductible savings
                </p>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Expense
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                    <p className="text-3xl font-bold text-gray-900">₹{totalExpenses.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tax Deductible</p>
                    <p className="text-3xl font-bold text-success-600">₹{taxDeductibleExpenses.toLocaleString()}</p>
                  </div>
                  <div className="bg-success-100 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-success-600" />
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Potential Tax Savings</p>
                    <p className="text-3xl font-bold text-orange-600">₹{Math.round(taxDeductibleExpenses * 0.3).toLocaleString()}</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Deduction Summary */}
            <div className="card p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Deduction Summary by Section</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(deductionsBySection).map(([section, amount]) => {
                  const category = categories.find(cat => cat.section === section);
                  const maxDeduction = category?.maxDeduction || 0;
                  const utilisationPercentage = maxDeduction > 0 ? (amount / maxDeduction) * 100 : 0;
                  
                  return (
                    <div key={section} className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-900">Section {section}</span>
                        <span className="text-lg font-bold text-primary-600">₹{amount.toLocaleString()}</span>
                      </div>
                      {maxDeduction > 0 && (
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Utilization</span>
                            <span>{utilisationPercentage.toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${utilisationPercentage >= 100 ? 'bg-success-500' : 'bg-primary-500'}`}
                              style={{ width: `${Math.min(utilisationPercentage, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
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
                  {editingExpense ? 'Edit Expense' : 'Add New Expense'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => {
                        const selectedCategory = categories.find(cat => cat.value === e.target.value);
                        setFormData({ 
                          ...formData, 
                          category: e.target.value,
                          section: selectedCategory?.section || '',
                          taxDeductible: true
                        });
                      }}
                      className="input-field"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.value} (Section {category.section})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (₹) *
                    </label>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="input-field"
                      placeholder="Enter amount"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="input-field"
                      placeholder="Enter expense description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="taxDeductible"
                      checked={formData.taxDeductible}
                      onChange={(e) => setFormData({ ...formData, taxDeductible: e.target.checked })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="taxDeductible" className="ml-2 text-sm text-gray-700">
                      Tax Deductible
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingExpense(null);
                      setFormData({ category: '', description: '', amount: '', date: '', taxDeductible: false, section: '' });
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingExpense ? handleUpdateExpense : handleAddExpense}
                    className="btn-primary"
                  >
                    {editingExpense ? 'Update Expense' : 'Add Expense'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Filter and Expenses List */}
            <div className="card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Expense History</h2>
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>{category.value}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredExpenses.map((expense) => (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${expense.taxDeductible ? 'bg-success-100' : 'bg-gray-200'}`}>
                          <Tag className={`h-4 w-4 ${expense.taxDeductible ? 'text-success-600' : 'text-gray-500'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{expense.description}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(expense.date).toLocaleDateString()}
                            </span>
                            <span>{expense.category}</span>
                            {expense.taxDeductible && (
                              <span className="text-success-600 font-medium">Section {expense.section}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-gray-900">₹{expense.amount.toLocaleString()}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditExpense(expense)}
                          className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Next Step */}
            <div className="mt-8">
              <button
                onClick={() => navigate('/savings')}
                className="btn-primary flex items-center"
              >
                Set Savings Goals for Next Year
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;