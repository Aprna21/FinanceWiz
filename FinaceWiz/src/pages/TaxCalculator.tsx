import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  TrendingDown, 
  PiggyBank, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Target
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

interface TaxCalculation {
  grossIncome: number;
  standardDeduction: number;
  section80C: number;
  section80D: number;
  otherDeductions: number;
  taxableIncome: number;
  taxAmount: number;
  afterTaxIncome: number;
  totalSavings: number;
  optimizedTax: number;
  savingsPercentage: number;
}

const TaxCalculator: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [grossIncome, setGrossIncome] = useState<number | ''>('');
  const [age, setAge] = useState<string>('');
  const [section80C, setSection80C] = useState<number | ''>('');
  const [section80D, setSection80D] = useState<number | ''>('');
  const [homeLoanInterest, setHomeLoanInterest] = useState<number | ''>('');
  const [educationLoan, setEducationLoan] = useState<number | ''>('');
  const [nps, setNps] = useState<number | ''>('');
  const [otherDeductions, setOtherDeductions] = useState<number | ''>('');
  
  // Calculation results
  const [calculation, setCalculation] = useState<TaxCalculation | null>(null);
  const [showResults, setShowResults] = useState(false);

  const deductionOptions = [
    { key: 'section80C', label: 'Section 80C Investments (PPF, EPF, ELSS, etc.)', max: 150000 },
    { key: 'section80D', label: 'Health Insurance Premium (Section 80D)', max: 50000 },
    { key: 'homeLoanInterest', label: 'Home Loan Interest', max: 200000 },
    { key: 'educationLoan', label: 'Education Loan Interest', max: null },
    { key: 'nps', label: 'NPS Contribution (Section 80CCD(1B))', max: 50000 },
    { key: 'otherDeductions', label: 'Other Deductions', max: null },
  ];
  const [selectedDeductions, setSelectedDeductions] = useState<string[]>([]);
  const [deductionValues, setDeductionValues] = useState<Record<string, number | ''>>({});

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Tax calculation logic based on Indian tax slabs for FY 2023-24
  const calculateTax = (): TaxCalculation => {
    let standardDeduction = 50000;
    let basicExemption = 0;

    // Age-based exemptions
    switch (age) {
      case 'below60':
        basicExemption = 250000;
        break;
      case '60to80':
        basicExemption = 300000;
        break;
      case 'above80':
        basicExemption = 500000;
        break;
    }

    // Sum all selected deduction values
    const totalDeductions = standardDeduction + selectedDeductions.reduce((sum, key) => {
      const val = deductionValues[key];
      return sum + (typeof val === 'number' ? val : 0);
    }, 0);
    
    // Taxable income
    const taxableIncome = Math.max(0, grossIncome - basicExemption - totalDeductions);
    
    // Tax calculation based on new regime (for comparison)
    let taxAmount = 0;
    let remainingIncome = taxableIncome;
    
    // Tax slabs for new regime
    if (remainingIncome > 300000) {
      const taxableAt5 = Math.min(remainingIncome - 300000, 300000);
      taxAmount += taxableAt5 * 0.05;
      remainingIncome -= taxableAt5;
    }
    
    if (remainingIncome > 600000) {
      const taxableAt10 = Math.min(remainingIncome - 600000, 300000);
      taxAmount += taxableAt10 * 0.10;
      remainingIncome -= taxableAt10;
    }
    
    if (remainingIncome > 900000) {
      const taxableAt15 = Math.min(remainingIncome - 900000, 300000);
      taxAmount += taxableAt15 * 0.15;
      remainingIncome -= taxableAt15;
    }
    
    if (remainingIncome > 1200000) {
      const taxableAt20 = Math.min(remainingIncome - 1200000, 300000);
      taxAmount += taxableAt20 * 0.20;
      remainingIncome -= taxableAt20;
    }
    
    if (remainingIncome > 1500000) {
      taxAmount += (remainingIncome - 1500000) * 0.30;
    }

    // Add cess (4% on tax amount)
    taxAmount += taxAmount * 0.04;

    // Calculate optimized tax (with maximum deductions)
    const maxSection80C = 150000;
    const maxSection80D = age === 'above60' ? 50000 : 25000;
    const maxHomeLoan = 200000;
    const maxNPS = 50000;
    
    const optimizedDeductions = standardDeduction + maxSection80C + maxSection80D + 
                               maxHomeLoan + educationLoan + maxNPS + otherDeductions;
    
    const optimizedTaxableIncome = Math.max(0, grossIncome - basicExemption - optimizedDeductions);
    let optimizedTax = 0;
    let optimizedRemaining = optimizedTaxableIncome;
    
    // Calculate optimized tax with same logic
    if (optimizedRemaining > 300000) {
      const taxableAt5 = Math.min(optimizedRemaining - 300000, 300000);
      optimizedTax += taxableAt5 * 0.05;
      optimizedRemaining -= taxableAt5;
    }
    
    if (optimizedRemaining > 600000) {
      const taxableAt10 = Math.min(optimizedRemaining - 600000, 300000);
      optimizedTax += taxableAt10 * 0.10;
      optimizedRemaining -= taxableAt10;
    }
    
    if (optimizedRemaining > 900000) {
      const taxableAt15 = Math.min(optimizedRemaining - 900000, 300000);
      optimizedTax += taxableAt15 * 0.15;
      optimizedRemaining -= taxableAt15;
    }
    
    if (optimizedRemaining > 1200000) {
      const taxableAt20 = Math.min(optimizedRemaining - 1200000, 300000);
      optimizedTax += taxableAt20 * 0.20;
      optimizedRemaining -= taxableAt20;
    }
    
    if (optimizedRemaining > 1500000) {
      optimizedTax += (optimizedRemaining - 1500000) * 0.30;
    }

    optimizedTax += optimizedTax * 0.04;

    const afterTaxIncome = grossIncome - optimizedTax;
    const totalSavings = taxAmount - optimizedTax;
    const savingsPercentage = taxAmount > 0 ? (totalSavings / taxAmount) * 100 : 0;

    return {
      grossIncome,
      standardDeduction,
      section80C,
      section80D,
      otherDeductions: homeLoanInterest + educationLoan + nps + otherDeductions,
      taxableIncome,
      taxAmount,
      afterTaxIncome,
      totalSavings,
      optimizedTax,
      savingsPercentage
    };
  };

  const handleCalculate = () => {
    const result = calculateTax();
    setCalculation(result);
    setShowResults(true);
  };

  const handleOptimize = () => {
    // Navigate to family manager for optimization
    navigate('/family');
  };

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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Calculator className="h-8 w-8 text-primary-600 mr-3" />
                Smart Tax Calculator
              </h1>
              <p className="text-gray-600">
                Calculate your taxes and discover how to save up to 70% legally
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Enter Your Details
                </h2>

                <div className="space-y-6">
                  {/* Gross Income */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Gross Income (₹)
                    </label>
                    <input
                      type="number"
                      value={grossIncome}
                      onChange={(e) => setGrossIncome(e.target.value === '' ? '' : Number(e.target.value))}
                      className="input-field"
                      placeholder="Enter your annual income"
                    />
                  </div>

                  {/* Age Group */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age Group
                    </label>
                    <select
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="input-field"
                    >
                      <option value="" disabled>Select age group</option>
                      <option value="below60">Below 60 years</option>
                      <option value="60to80">60-80 years</option>
                      <option value="above80">Above 80 years</option>
                    </select>
                  </div>

                  {/* Add Deduction/Investment Types */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Add Deduction/Investment Types</label>
                    <select
                      className="input-field"
                      value=""
                      onChange={e => {
                        const val = e.target.value;
                        if (val && !selectedDeductions.includes(val)) {
                          setSelectedDeductions([...selectedDeductions, val]);
                        }
                      }}
                    >
                      <option value="" disabled>Select deduction type</option>
                      {deductionOptions.filter(opt => !selectedDeductions.includes(opt.key)).map(opt => (
                        <option key={opt.key} value={opt.key}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Selected Deductions */}
                  {selectedDeductions.map(key => {
                    const opt = deductionOptions.find(o => o.key === key);
                    return (
                      <div key={key} className="flex items-center gap-4 mt-4">
                        <label className="block text-sm font-medium text-gray-700 flex-1">{opt?.label}{opt?.max ? ` (Max ₹${opt.max.toLocaleString()})` : ''}</label>
                        <input
                          type="number"
                          className="input-field flex-1"
                          value={deductionValues[key] ?? ''}
                          onChange={e => {
                            let val = e.target.value === '' ? '' : Number(e.target.value);
                            if (opt?.max && typeof val === 'number' && val > opt.max) val = opt.max;
                            setDeductionValues({ ...deductionValues, [key]: val });
                          }}
                          placeholder={opt?.label}
                          max={opt?.max ?? undefined}
                        />
                        <button type="button" className="text-red-500 ml-2" onClick={() => {
                          setSelectedDeductions(selectedDeductions.filter(d => d !== key));
                          const vals = { ...deductionValues };
                          delete vals[key];
                          setDeductionValues(vals);
                        }}>Remove</button>
                      </div>
                    );
                  })}

                  <button
                    onClick={handleCalculate}
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate Tax & Savings
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                {showResults && calculation && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="card p-8"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Sparkles className="h-6 w-6 text-yellow-500 mr-2" />
                      Your Tax Optimization Results
                    </h2>

                    {/* Tax Savings Highlight */}
                    <div className="bg-gradient-to-r from-success-50 to-green-50 border-2 border-success-200 rounded-2xl p-6 mb-6">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-success-800 mb-2">
                          🎉 Congratulations! You can save:
                        </h3>
                        <div className="text-4xl font-bold text-success-600 mb-2">
                          ₹{calculation.totalSavings.toLocaleString()}
                        </div>
                        <div className="text-success-700">
                          That's {calculation.savingsPercentage.toFixed(1)}% tax reduction!
                        </div>
                      </div>
                    </div>

                    {/* Comparison */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                        <div className="text-red-600 font-semibold mb-1">Without Optimization</div>
                        <div className="text-2xl font-bold text-red-700">
                          ₹{calculation.taxAmount.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                        <div className="text-green-600 font-semibold mb-1">With Optimization</div>
                        <div className="text-2xl font-bold text-green-700">
                          ₹{calculation.optimizedTax.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Detailed Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Gross Income</span>
                        <span className="font-semibold">₹{calculation.grossIncome.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Total Deductions</span>
                        <span className="font-semibold text-green-600">
                          -₹{(calculation.standardDeduction + calculation.section80C + 
                              calculation.section80D + calculation.otherDeductions).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Taxable Income</span>
                        <span className="font-semibold">₹{calculation.taxableIncome.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Optimized Tax</span>
                        <span className="font-semibold text-primary-600">₹{calculation.optimizedTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 font-bold text-lg">
                        <span className="text-gray-900">After-Tax Income</span>
                        <span className="text-success-600">₹{calculation.afterTaxIncome.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <button
                        onClick={handleOptimize}
                        className="btn-primary w-full flex items-center justify-center"
                      >
                        <Target className="h-5 w-5 mr-2" />
                        Optimize Further with Family Planning
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Tips */}
                <div className="card p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2" />
                    Tax Saving Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm text-gray-600">
                        Maximize Section 80C by investing in ELSS, PPF, or EPF
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm text-gray-600">
                        Get family health insurance for Section 80D benefits
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm text-gray-600">
                        Consider NPS for additional ₹50,000 deduction
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm text-gray-600">
                        Home loan interest can save up to ₹2 lakhs
                      </span>
                    </div>
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

export default TaxCalculator;