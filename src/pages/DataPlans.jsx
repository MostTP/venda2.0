import { useState, useContext } from 'react'
import { Wifi, Search, Check, AlertCircle, ChevronDown, Smartphone, Zap } from 'lucide-react'
import toast from 'react-hot-toast'
import { AppContext } from '../App'
import { dataPlans } from '../data/mockData'

const networks = ['All', 'MTN', 'GLO', 'Airtel', '9Mobile']

export default function DataPlans() {
  const { user, addTransaction } = useContext(AppContext)
  const [selectedNetwork, setSelectedNetwork] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const filteredPlans = dataPlans.filter(plan => {
    const matchNetwork = selectedNetwork === 'All' || plan.network === selectedNetwork
    const matchSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       plan.network.toLowerCase().includes(searchQuery.toLowerCase())
    return matchNetwork && matchSearch
  })

  const handlePurchase = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number')
      return
    }
    if (user.balance < selectedPlan.price) {
      toast.error('Insufficient balance. Please fund your wallet.')
      return
    }

    setIsProcessing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    addTransaction({
      id: Date.now(),
      type: 'data',
      item: `${selectedPlan.network} ${selectedPlan.name}`,
      amount: selectedPlan.price,
      status: 'completed',
      date: new Date().toLocaleString(),
      reference: `TRX-${Date.now().toString().slice(-6)}`
    })

    toast.success(`Successfully purchased ${selectedPlan.network} ${selectedPlan.name} for ${phoneNumber}`)
    setShowConfirm(false)
    setSelectedPlan(null)
    setPhoneNumber('')
    setIsProcessing(false)
  }

  const networkColors = {
    MTN: 'bg-yellow-500',
    GLO: 'bg-green-600',
    Airtel: 'bg-red-500',
    '9Mobile': 'bg-green-500',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Wifi className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Cheap Data Plans</h1>
            <p className="text-blue-200">SME & Gifting data at unbeatable prices</p>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-xs text-blue-200">Starting from</p>
            <p className="text-lg font-bold">₦300/GB</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-xs text-blue-200">Validity</p>
            <p className="text-lg font-bold">7 - 30 Days</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-xs text-blue-200">Networks</p>
            <p className="text-lg font-bold">4 Major</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search data plans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {networks.map(network => (
            <button
              key={network}
              onClick={() => setSelectedNetwork(network)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedNetwork === network
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {network}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => { setSelectedPlan(plan); setShowConfirm(true); }}
            className="bg-white rounded-xl border border-slate-200 p-5 cursor-pointer card-hover hover:border-primary-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${networkColors[plan.network]} rounded-lg flex items-center justify-center text-white font-bold text-xs`}>
                {plan.network.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                {plan.type}
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">{plan.name}</h3>
            <p className="text-sm text-slate-500 mb-4">{plan.validity}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-slate-900">₦{plan.price.toLocaleString()}</p>
                <p className="text-xs text-slate-400">per plan</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all">
                <Zap className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Purchase Modal */}
      {showConfirm && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="text-center mb-6">
              <div className={`w-16 h-16 ${networkColors[selectedPlan.network]} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Purchase Data</h3>
              <p className="text-sm text-slate-500 mt-1">
                {selectedPlan.network} {selectedPlan.name} - ₦{selectedPlan.price.toLocaleString()}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="e.g. 08012345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Plan</span>
                  <span className="font-medium">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Validity</span>
                  <span className="font-medium">{selectedPlan.validity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Type</span>
                  <span className="font-medium">{selectedPlan.type}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between">
                  <span className="font-medium text-slate-700">Total</span>
                  <span className="font-bold text-lg text-slate-900">₦{selectedPlan.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePurchase}
                  disabled={isProcessing}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4" /> Confirm Purchase
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
