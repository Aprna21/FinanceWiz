import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calculator, 
  Users, 
  Receipt, 
  Target, 
  BarChart3, 
  User,
  Zap,
  PiggyBank,
  Menu
} from 'lucide-react';
import { useState } from 'react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Calculator, label: 'Tax Calculator', path: '/tax-calculator' },
    { icon: Users, label: 'Family Manager', path: '/family' },
    { icon: Receipt, label: 'Expense Tracker', path: '/expenses' },
    { icon: Target, label: 'Savings Goals', path: '/savings' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <>
      {/* Hamburger menu for mobile/tablet */}
      <button className="fixed top-4 left-4 z-50 md:hidden bg-white/80 p-2 rounded-full shadow-lg" onClick={() => setOpen(!open)}>
        <Menu className="h-6 w-6 text-primary-600" />
      </button>
      {/* Sidebar */}
      <div className={`sidebar-gradient h-screen w-64 shadow-xl fixed md:static z-40 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-white/20 p-2 rounded-xl">
              <PiggyBank className="h-8 w-8 text-white" style={{ filter: 'drop-shadow(0 0 8px #a855f7)' }} />
            </div>
            <div>
              <h1 className="text-white text-xl font-bold">FinanceWiz</h1>
              <p className="text-blue-200 text-sm">Smart Tax Planning</p>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/20 text-white shadow-lg' 
                      : 'text-blue-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      {/* Overlay for mobile when sidebar is open */}
      {open && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setOpen(false)}></div>}
    </>
  );
};

export default Sidebar;