import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Wifi, Phone, Coins, MessageSquare, Mail, TrendingUp, 
  TrendingDown, ArrowUpRight, Users, Send, Clock, CheckCircle2,
  AlertCircle, Zap, ChevronRight, BarChart3
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { AppContext } from '../App'
import { chartData } from '../data/mockData'

const stats = [
  { label: 'Data Purchased', value: '45.2 GB', icon: Wifi, color: 'bg-blue-500', trend: '+12%', up: true },
  { label: 'Airtime Top-up', value: '₦128.5K', icon: Phone, color: 'bg-green-500', trend: '+8%', up: true },
  { label: 'SMS Sent', value: '12.4K', icon: MessageSquare, color: 'bg-purple-500', trend: '+24%', up: true },
  { label: 'Emails Sent', value: '8.7K', icon: Mail, color: 'bg-orange-500', trend: '-3%', up: false },
]

const quickActions = [
  { label: 'Buy Data', path: '/data', icon: Wifi, color: 'from-blue-500 to-blue-600', desc: 'Cheap SME data plans' },
  { label: 'Buy Airtime', path: '/airtime', icon: Phone, color: 'from-green-500 to-green-600', desc: 'Discounted airtime' },
  { label: 'Buy Tokens', path: '/tokens', icon: Coins, color: 'from-amber-500 to-amber-600', desc: 'Crypto & utility tokens' },
  { label: 'Send Bulk SMS', path: '/bulksms', icon: MessageSquare, color: 'from-purple-500 to-purple-600', desc: 'Reach thousands instantly' },
  { label: 'Send Bulk Email', path: '/bulkemail', icon: Mail, color: 'from-pink-500 to-pink-600', desc: 'Professional campaigns' },
  { label: 'Fund Wallet', path: '/wallet', icon: Zap, color: 'from-primary-500 to-primary-600', desc: 'Add money instantly' },
]

const pieData = [
  { name: 'Data', value: 35, color: '#3b82f6' },
  { name: 'Airtime', value: 25, color: '#22c55e' },
  { name: 'SMS', value: 20, color: '#a855f7' },
  { name: 'Email', value: 15, color: '#f97316' },
  { name: 'Tokens', value: 5, color: '#f59e0b' },
]

export default function Dashboard() {
  const { user, transactions } = useContext(AppContext)
  const [chartFilter, setChartFilter] = useState('all')

  const recentTransactions = transactions.slice(0, 5)

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case 'pending': return <Clock className="w-4 h-4 text-amber-500" />
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-500" />
      default: return <Clock className="w-4 h-4 text-slate-400" />
    }
  }

  const getStatusBadge = (status) => {
    const styles = {
      completed: 'bg-green-50 text-green-700 border-green-200',
      pending: 'bg-amber-50 text-amber-700 border-amber-200',
      failed: 'bg-red-50 text-red-700 border-red-200',
    }
    return styles[status] || 'bg-slate-50 text-slate-700 border-slate-200'
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 rounded-2xl p-6 lg:p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-primary-300 font-medium mb-1">{user.tier} Member</p>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
              <p className="text-slate-300 max-w-md">
                You have saved ₦{user.totalSpent.toLocaleString()} worth of digital services. 
                Keep enjoying discounted rates on all products.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-sm text-slate-300 mb-1">Wallet Balance</p>
                <p className="text-2xl font-bold">₦{user.balance.toLocaleString()}</p>
              </div>
              <Link to="/wallet" className="btn-primary bg-white text-slate-900 hover:bg-slate-100 shadow-none">
                Fund Wallet
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-xl p-5 border border-slate-200 card-hover">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.trend}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.label}
                to={action.path}
                className="group bg-white rounded-xl p-5 border border-slate-200 card-hover hover:border-primary-200"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">{action.label}</h4>
                <p className="text-xs text-slate-500">{action.desc}</p>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Charts & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Spending Overview</h3>
              <p className="text-sm text-slate-500">Your monthly spending across all services</p>
            </div>
            <div className="flex gap-2">
              {['all', 'data', 'airtime', 'sms'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setChartFilter(filter)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                    chartFilter === filter 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAirtime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="data" stroke="#3b82f6" fillOpacity={1} fill="url(#colorData)" strokeWidth={2} />
                <Area type="monotone" dataKey="airtime" stroke="#22c55e" fillOpacity={1} fill="url(#colorAirtime)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Pie Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Usage Distribution</h3>
          <p className="text-sm text-slate-500 mb-6">Breakdown by service type</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
            <p className="text-sm text-slate-500">Your latest purchases and activities</p>
          </div>
          <Link to="/transactions" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Service</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Item</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                        {tx.type === 'data' && <Wifi className="w-4 h-4 text-blue-500" />}
                        {tx.type === 'airtime' && <Phone className="w-4 h-4 text-green-500" />}
                        {tx.type === 'token' && <Coins className="w-4 h-4 text-amber-500" />}
                        {tx.type === 'bulksms' && <MessageSquare className="w-4 h-4 text-purple-500" />}
                        {tx.type === 'bulkemail' && <Mail className="w-4 h-4 text-pink-500" />}
                      </div>
                      <span className="text-sm font-medium text-slate-900 capitalize">{tx.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{tx.item}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">₦{tx.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(tx.status)}`}>
                      {getStatusIcon(tx.status)}
                      <span className="capitalize">{tx.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
