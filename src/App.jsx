import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect, createContext } from 'react'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import DataPlans from './pages/DataPlans'
import Airtime from './pages/Airtime'
import Tokens from './pages/Tokens'
import BulkSMS from './pages/BulkSMS'
import BulkEmail from './pages/BulkEmail'
import Transactions from './pages/Transactions'
import Wallet from './pages/Wallet'
import Settings from './pages/Settings'
import Auth from './pages/Auth'
import { api } from './services/api'

export const AppContext = createContext()

function App() {
  const [user, setUser] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [contacts, setContacts] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData()
    } else {
      setLoading(false)
    }
  }, [isAuthenticated])

  const fetchUserData = async () => {
    try {
      const [userRes, txRes, contactRes, campaignRes] = await Promise.all([
        api.getMe(),
        api.getTransactions({ limit: 50 }),
        api.getContacts(),
        api.getCampaigns(),
      ])
      setUser(userRes.user)
      setTransactions(txRes.data || [])
      setContacts(contactRes.data || [])
      setCampaigns(campaignRes.data || [])
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      if (error.message.includes('token') || error.message.includes('unauthorized')) {
        logout()
      }
    } finally {
      setLoading(false)
    }
  }

  const login = (token, userData) => {
    localStorage.setItem('token', token)
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setTransactions([])
    setContacts([])
    setCampaigns([])
    setIsAuthenticated(false)
  }

  const addTransaction = (transaction) => {
    setTransactions(prev => [transaction, ...prev])
    if (user) {
      setUser(prev => ({
        ...prev,
        balance: prev.balance - transaction.amount,
        totalSpent: prev.totalSpent + transaction.amount
      }))
    }
  }

  const addCampaign = (campaign) => {
    setCampaigns(prev => [campaign, ...prev])
  }

  const addContact = (contact) => {
    setContacts(prev => [...prev, contact])
  }

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }))
  }

  const refreshData = () => {
    if (isAuthenticated) fetchUserData()
  }

  if (loading && isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <AppContext.Provider value={{ 
      user, transactions, contacts, campaigns,
      addTransaction, addCampaign, addContact, updateUser,
      isAuthenticated, login, logout, refreshData
    }}>
      <Routes>
        <Route path="/auth" element={!isAuthenticated ? <Auth /> : <Navigate to="/" replace />} />
        <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/auth" replace />}>
          <Route index element={<Dashboard />} />
          <Route path="data" element={<DataPlans />} />
          <Route path="airtime" element={<Airtime />} />
          <Route path="tokens" element={<Tokens />} />
          <Route path="bulksms" element={<BulkSMS />} />
          <Route path="bulkemail" element={<BulkEmail />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#fff',
            borderRadius: '12px',
          },
        }}
      />
    </AppContext.Provider>
  )
}

export default App
