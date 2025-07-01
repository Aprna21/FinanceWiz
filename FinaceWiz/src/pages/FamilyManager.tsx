import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Zap,
  Calculator,
  Trophy,
  Target,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: number;
  income: number;
  hasHealthInsurance: boolean;
  investments: number;
  potentialSavings: number;
}

const FamilyManager: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    relation: '',
    age: '',
    income: '',
    hasHealthInsurance: false,
    investments: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const calculatePotentialSavings = (income: number, investments: number, hasInsurance: boolean) => {
    const maxDeduction = Math.min(investments, 150000);
    const insuranceDeduction = hasInsurance ? 25000 : 0;
    const totalDeductions = maxDeduction + insuranceDeduction;
    
    // Simplified tax calculation
    const taxableIncome = Math.max(0, income - 250000 - totalDeductions);
    const taxSavings = totalDeductions * 0.3; // Assuming 30% tax bracket
    
    return Math.round(taxSavings);
  };

  const handleAddMember = () => {
    if (!formData.name || !formData.relation || !formData.age || !formData.income) {
      alert('Please fill in all required fields');
      return;
    }

    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: formData.name,
      relation: formData.relation,
      age: parseInt(formData.age),
      income: parseFloat(formData.income),
      hasHealthInsurance: formData.hasHealthInsurance,
      investments: parseFloat(formData.investments) || 0,
      potentialSavings: calculatePotentialSavings(
        parseFloat(formData.income),
        parseFloat(formData.investments) || 0,
        formData.hasHealthInsurance
      )
    };

    setFamilyMembers([...familyMembers, newMember]);
    setFormData({ name: '', relation: '', age: '', income: '', hasHealthInsurance: false, investments: '' });
    setShowAddForm(false);
  };

  const handleEditMember = (member: FamilyMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      relation: member.relation,
      age: member.age.toString(),
      income: member.income.toString(),
      hasHealthInsurance: member.hasHealthInsurance,
      investments: member.investments.toString()
    });
    setShowAddForm(true);
  };

  const handleUpdateMember = () => {
    if (!editingMember) return;

    const updatedMember = {
      ...editingMember,
      name: formData.name,
      relation: formData.relation,
      age: parseInt(formData.age),
      income: parseFloat(formData.income),
      hasHealthInsurance: formData.hasHealthInsurance,
      investments: parseFloat(formData.investments) || 0,
      potentialSavings: calculatePotentialSavings(
        parseFloat(formData.income),
        parseFloat(formData.investments) || 0,
        formData.hasHealthInsurance
      )
    };

    setFamilyMembers(familyMembers.map(member => 
      member.id === editingMember.id ? updatedMember : member
    ));
    
    setEditingMember(null);
    setFormData({ name: '', relation: '', age: '', income: '', hasHealthInsurance: false, investments: '' });
    setShowAddForm(false);
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm('Are you sure you want to remove this family member?')) {
      setFamilyMembers(familyMembers.filter(member => member.id !== id));
    }
  };

  const totalFamilyIncome = 0;
  const totalPotentialSavings = 0;

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
                  <Users className="h-8 w-8 text-primary-600 mr-3" />
                  Family Tax Planning
                </h1>
                <p className="text-gray-600">
                  Manage your family members and optimize everyone's tax savings
                </p>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Family Member
              </button>
            </div>

            {/* Family Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Family Members</p>
                    <p className="text-3xl font-bold text-primary-600">{familyMembers.length}</p>
                  </div>
                  <div className="bg-primary-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Family Income</p>
                    <p className="text-3xl font-bold text-success-600">₹{totalFamilyIncome.toLocaleString()}</p>
                  </div>
                  <div className="bg-success-100 p-3 rounded-full">
                    <Zap className="h-6 w-6 text-success-600" />
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Potential Savings</p>
                    <p className="text-3xl font-bold text-orange-600">₹{totalPotentialSavings.toLocaleString()}</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Trophy className="h-6 w-6 text-orange-600" />
                  </div>
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
                  {editingMember ? 'Edit Family Member' : 'Add New Family Member'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                      placeholder="Enter name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relation *
                    </label>
                    <select
                      value={formData.relation}
                      onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Select relation</option>
                      <option value="Self">Self</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Child">Child</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age *
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="input-field"
                      placeholder="Enter age"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Income (₹) *
                    </label>
                    <input
                      type="number"
                      value={formData.income}
                      onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                      className="input-field"
                      placeholder="Enter annual income"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Investments (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.investments}
                      onChange={(e) => setFormData({ ...formData, investments: e.target.value })}
                      className="input-field"
                      placeholder="PPF, ELSS, etc."
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hasInsurance"
                      checked={formData.hasHealthInsurance}
                      onChange={(e) => setFormData({ ...formData, hasHealthInsurance: e.target.checked })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hasInsurance" className="ml-2 text-sm text-gray-700">
                      Has Health Insurance
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingMember(null);
                      setFormData({ name: '', relation: '', age: '', income: '', hasHealthInsurance: false, investments: '' });
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingMember ? handleUpdateMember : handleAddMember}
                    className="btn-primary"
                  >
                    {editingMember ? 'Update Member' : 'Add Member'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Family Members List or Empty State */}
            {familyMembers.length === 0 ? (
              <div className="card p-12 text-center">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Family Members Added</h3>
                <p className="text-gray-500 mb-6">Start by adding your family members to optimize tax planning for everyone.</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn-primary"
                >
                  Add Your First Family Member
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {familyMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.relation} • {member.age} years</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditMember(member)}
                          className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Annual Income</span>
                        <span className="font-semibold">₹{member.income.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Investments</span>
                        <span className="font-semibold">₹{member.investments.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Health Insurance</span>
                        <span className={`text-sm font-semibold ${member.hasHealthInsurance ? 'text-green-600' : 'text-red-600'}`}>
                          {member.hasHealthInsurance ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Potential Savings</span>
                          <span className="text-lg font-bold text-success-600">
                            ₹{member.potentialSavings.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Next Steps */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Next Steps to Maximize Savings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => navigate('/expenses')}
                  className="flex items-center p-6 bg-primary-50 hover:bg-primary-100 rounded-xl transition-colors text-left"
                >
                  <div className="bg-primary-500 p-3 rounded-full mr-4">
                    <Calculator className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary-900">Track Expenses</h3>
                    <p className="text-sm text-primary-700">Add deductible expenses for maximum savings</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary-600" />
                </button>

                <button
                  onClick={() => navigate('/savings')}
                  className="flex items-center p-6 bg-success-50 hover:bg-success-100 rounded-xl transition-colors text-left"
                >
                  <div className="bg-success-500 p-3 rounded-full mr-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-success-900">Set Savings Goals</h3>
                    <p className="text-sm text-success-700">Plan investment targets for next year</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-success-600" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FamilyManager;