import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  PieChart,
  FileText,
  DollarSign,
  Target,
  Award,
  ArrowUp,
  ArrowDown,
  Filter
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Reports: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedReport, setSelectedReport] = useState('overview');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Remove all hardcoded data
  const monthlyData = [];
  const keyMetrics = {
    totalTaxSaved: 0,
    totalSavings: 0,
    savingsRate: 0,
    goalsAchieved: 0,
    totalGoals: 0
  };
  const expenseBreakdown = [];
  const yearlyTrend = [];
  const taxComparisonData = [];

  const generateReport = () => {
    // Simulate report generation
    alert('Report generated successfully! In a real application, this would generate a PDF report.');
  };

  if (!user) return null;

  const renderOverviewReport = () => (
    monthlyData.length === 0 ? (
      <div className="text-center text-gray-500 py-16">No data yet. Add your details to see reports.</div>
    ) : (
      <div className="space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tax Saved</p>
                <p className="text-2xl font-bold text-success-600">₹{keyMetrics.totalTaxSaved.toLocaleString()}</p>
                <p className="text-xs text-success-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +22% from last year
                </p>
              </div>
              <div className="bg-success-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-success-600" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Savings</p>
                <p className="text-2xl font-bold text-primary-600">₹{keyMetrics.totalSavings.toLocaleString()}</p>
                <p className="text-xs text-primary-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +18% from last year
                </p>
              </div>
              <div className="bg-primary-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Savings Rate</p>
                <p className="text-2xl font-bold text-purple-600">{keyMetrics.savingsRate}%</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +5% from last year
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Goals Achieved</p>
                <p className="text-2xl font-bold text-orange-600">{keyMetrics.goalsAchieved}/{keyMetrics.totalGoals}</p>
                <p className="text-xs text-orange-600 flex items-center mt-1">
                  <Award className="h-3 w-3 mr-1" />
                  60% completion rate
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Income vs Savings */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Income vs Savings</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                <Bar dataKey="income" fill="#3B82F6" name="Income" />
                <Bar dataKey="savings" fill="#10B981" name="Savings" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tax Deduction Breakdown */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tax Deduction Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={(entry) => `₹${entry.value.toLocaleString()}`}
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {expenseBreakdown.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Yearly Trend */}
        <div className="card p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">5-Year Tax Savings Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yearlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
              <Line type="monotone" dataKey="taxSaved" stroke="#10B981" strokeWidth={3} name="Tax Saved" />
              <Line type="monotone" dataKey="totalSavings" stroke="#3B82F6" strokeWidth={3} name="Total Savings" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  );

  const renderTaxOptimizationReport = () => (
    <div className="space-y-8">
      <div className="card p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Tax Optimization Analysis</h3>
        
        {/* Tax Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {taxComparisonData.map((item, index) => (
            <div key={index} className="text-center p-6 rounded-xl" style={{ backgroundColor: `${item.color}10` }}>
              <div className="text-3xl font-bold mb-2" style={{ color: item.color }}>
                ₹{item.amount.toLocaleString()}
              </div>
              <div className="text-gray-600">{item.category}</div>
            </div>
          ))}
        </div>

        {/* Optimization Strategies */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Implemented Strategies</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-success-50 border border-success-200 rounded-xl p-4">
              <h5 className="font-semibold text-success-800 mb-2">Section 80C Optimization</h5>
              <p className="text-success-700 text-sm">Maximized ₹1.5L investment in ELSS and PPF</p>
              <div className="text-success-600 font-bold mt-2">Tax Saved: ₹45,000</div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h5 className="font-semibold text-blue-800 mb-2">Home Loan Benefit</h5>
              <p className="text-blue-700 text-sm">Claimed ₹2L home loan interest deduction</p>
              <div className="text-blue-600 font-bold mt-2">Tax Saved: ₹60,000</div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <h5 className="font-semibold text-purple-800 mb-2">Health Insurance</h5>
              <p className="text-purple-700 text-sm">Family health insurance under Section 80D</p>
              <div className="text-purple-600 font-bold mt-2">Tax Saved: ₹7,500</div>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <h5 className="font-semibold text-orange-800 mb-2">NPS Contribution</h5>
              <p className="text-orange-700 text-sm">Additional ₹50k NPS under Section 80CCD(1B)</p>
              <div className="text-orange-600 font-bold mt-2">Tax Saved: ₹15,000</div>
            </div>
          </div>
        </div>

        {/* Future Recommendations */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Future Optimization Opportunities</h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-primary-500 p-1 rounded-full mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <div className="font-medium text-gray-900">Increase HRA claims</div>
                <div className="text-sm text-gray-600">Potential additional saving: ₹25,000/year</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-primary-500 p-1 rounded-full mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <div className="font-medium text-gray-900">Education loan interest</div>
                <div className="text-sm text-gray-600">If applicable, can save up to ₹15,000/year</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-primary-500 p-1 rounded-full mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <div className="font-medium text-gray-900">Charitable donations</div>
                <div className="text-sm text-gray-600">Section 80G donations for additional deductions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Replace the year options with a wider range
  const yearOptions = Array.from({ length: 10 }, (_, i) => (2024 - i).toString());

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
                  <BarChart3 className="h-8 w-8 text-primary-600 mr-3" />
                  Financial Reports
                </h1>
                <p className="text-gray-600">
                  Comprehensive analysis of your tax savings and financial progress
                </p>
              </div>
              <button
                onClick={generateReport}
                className="btn-primary flex items-center"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Report
              </button>
            </div>

            {/* Filters */}
            <div className="card p-6 mb-8">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    {yearOptions.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <select
                    value={selectedReport}
                    onChange={(e) => setSelectedReport(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="overview">Overview Report</option>
                    <option value="tax-optimization">Tax Optimization</option>
                    <option value="savings-analysis">Savings Analysis</option>
                    <option value="goals-progress">Goals Progress</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Report Content */}
            <motion.div
              key={selectedReport}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {selectedReport === 'overview' && renderOverviewReport()}
              {selectedReport === 'tax-optimization' && renderTaxOptimizationReport()}
              {selectedReport === 'savings-analysis' && renderOverviewReport()}
              {selectedReport === 'goals-progress' && renderOverviewReport()}
            </motion.div>

            {/* Summary Card */}
            <div className="card p-8 mt-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  🎉 Congratulations on Your Tax Savings Journey!
                </h2>
                <p className="text-gray-600 mb-6">
                  You've saved ₹{keyMetrics.totalTaxSaved.toLocaleString()} in taxes this year and built a savings corpus of ₹{keyMetrics.totalSavings.toLocaleString()}.
                  That's {keyMetrics.taxOptimization}% optimization in your tax planning!
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => navigate('/tax-calculator')}
                    className="btn-primary"
                  >
                    Optimize Further
                  </button>
                  <button
                    onClick={() => navigate('/savings')}
                    className="btn-secondary"
                  >
                    Set New Goals
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Reports;