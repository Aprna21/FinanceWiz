import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  X,
  Shield,
  Bell,
  CreditCard,
  Award,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    panCard: '',
    aadhaarCard: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    taxReminders: true,
    goalUpdates: true
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // Do not auto-fill formData; keep default values until user enters them
  }, [user, navigate]);

  const handleSave = () => {
    // In a real application, this would update the user profile via API
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const achievements = [
    { title: 'Tax Optimizer', description: '', icon: Award, color: 'text-yellow-500', earned: false },
    { title: 'Smart Saver', description: '', icon: TrendingUp, color: 'text-green-500', earned: false },
    { title: 'Goal Crusher', description: '', icon: Award, color: 'text-blue-500', earned: false },
    { title: 'Master Planner', description: '', icon: Calendar, color: 'text-purple-500', earned: false }
  ];

  const stats = [
    { label: 'Total Tax Saved', value: '', color: 'text-success-600' },
    { label: 'Savings Rate', value: '', color: 'text-primary-600' },
    { label: 'Goals Achieved', value: '', color: 'text-orange-600' },
    { label: 'Years on Platform', value: '', color: 'text-purple-600' }
  ];

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
                  <User className="h-8 w-8 text-primary-600 mr-3" />
                  My Profile
                </h1>
                <p className="text-gray-600">
                  Manage your personal information and preferences
                </p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center ${isEditing ? 'btn-secondary' : 'btn-primary'}`}
              >
                {isEditing ? (
                  <>
                    <X className="h-5 w-5 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit className="h-5 w-5 mr-2" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Information */}
              <div className="lg:col-span-2 space-y-8">
                {/* Personal Information */}
                <div className="card p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="input-field"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                          <User className="h-5 w-5 text-gray-400" />
                          <span>{formData.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="input-field"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <span>{formData.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="input-field"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                          <Phone className="h-5 w-5 text-gray-400" />
                          <span>{formData.phone}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                          className="input-field"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <span>{new Date(formData.dateOfBirth).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      {isEditing ? (
                        <textarea
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="input-field"
                          rows={3}
                        />
                      ) : (
                        <div className="flex items-start space-x-2 p-3 bg-gray-50 rounded-xl">
                          <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                          <span>{formData.address}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end mt-6">
                      <button onClick={handleSave} className="btn-primary flex items-center">
                        <Save className="h-5 w-5 mr-2" />
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                {/* Tax Information */}
                <div className="card p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Shield className="h-5 w-5 text-primary-600 mr-2" />
                    Tax Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PAN Card Number
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.panCard}
                          onChange={(e) => setFormData({ ...formData, panCard: e.target.value.toUpperCase() })}
                          className="input-field"
                          placeholder="ABCDE1234F"
                          maxLength={10}
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                          <CreditCard className="h-5 w-5 text-gray-400" />
                          <span>{formData.panCard}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Aadhaar Number
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.aadhaarCard}
                          onChange={(e) => setFormData({ ...formData, aadhaarCard: e.target.value })}
                          className="input-field"
                          placeholder="1234-5678-9012"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                          <Shield className="h-5 w-5 text-gray-400" />
                          <span>{formData.aadhaarCard}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notification Preferences */}
                <div className="card p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Bell className="h-5 w-5 text-primary-600 mr-2" />
                    Notification Preferences
                  </h2>
                  
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <div className="font-medium text-gray-900">
                            {key === 'emailNotifications' && 'Email Notifications'}
                            {key === 'smsNotifications' && 'SMS Notifications'}
                            {key === 'taxReminders' && 'Tax Reminders'}
                            {key === 'goalUpdates' && 'Goal Updates'}
                          </div>
                          <div className="text-sm text-gray-600">
                            {key === 'emailNotifications' && 'Receive updates via email'}
                            {key === 'smsNotifications' && 'Receive updates via SMS'}
                            {key === 'taxReminders' && 'Get reminders for tax deadlines'}
                            {key === 'goalUpdates' && 'Updates on your savings goals'}
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleNotificationChange(key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-8">
                {/* Profile Stats */}
                <div className="card p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Your Stats</h3>
                  <div className="space-y-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{stat.label}</span>
                        <span className={`font-bold ${stat.color}`}>{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="card p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Achievements</h3>
                  <div className="space-y-3">
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
                            <div className={`font-semibold text-sm ${
                              achievement.earned ? 'text-success-800' : 'text-gray-600'
                            }`}>
                              {achievement.title}
                            </div>
                            <div className={`text-xs ${
                              achievement.earned ? 'text-success-600' : 'text-gray-500'
                            }`}>
                              {achievement.description}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="card p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => navigate('/tax-calculator')}
                      className="w-full text-left p-3 rounded-xl bg-primary-50 hover:bg-primary-100 text-primary-700 transition-colors"
                    >
                      Calculate Tax
                    </button>
                    <button
                      onClick={() => navigate('/savings')}
                      className="w-full text-left p-3 rounded-xl bg-success-50 hover:bg-success-100 text-success-700 transition-colors"
                    >
                      Set New Goal
                    </button>
                    <button
                      onClick={() => navigate('/reports')}
                      className="w-full text-left p-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors"
                    >
                      View Reports
                    </button>
                    <button
                      onClick={logout}
                      className="w-full text-left p-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;