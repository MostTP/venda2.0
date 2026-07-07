import { useState, useContext } from 'react'
import { Phone, Search, Check, Smartphone, Zap, Percent } from 'lucide-react'
import toast from 'react-hot-toast'
import { AppContext } from '../App'
import { airtimePlans } from '../data/mockData'

const networkColors = {
  MTN: 'bg-yellow-500',
  GLO: 'bg-green-600',
  Airtel: 'bg-red-500',
  '9Mobile': 'bg-green-500',
}

const networkBgColors = {
  MTN: 'from-yellow-500 to-yellow-600',
  GLO: 'from-green-600 to-green-700',
  Airtel: 'from-red-500 to-red-600',
  '9Mobile': 'from-green-500 to-green-600',
}

export default function Airtime() {
  const { user, addTransaction } = useContext(AppContext)
  const [selectedNetwork, setSelectedNetwork] = useState(null)
  const [amount, setAmount] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const selectedPlan = airtimePlans.find(p => p.network === selectedNetwork)
  const discountedAmount = selectedPlan && amount ? Math.round(amount * (1 - selectedPlan.discount / 100)) : 0
  const savings = selectedPlan && amount ? amount - discountedAmount : 0

  const handlePurchase = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number')
      return
    }
    if (!amount || amount < 100) {
      toast.error('Minimum amount is ₦100')
      return
    }
    if (user.balance < discountedAmount) {
      toast.error('Insufficient balance. Please fund your wallet.')
      return
    }

    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))

    addTransaction({
      id: Date.now(),
      type: 'airtime',
      item: `${selectedNetwork} ₦${amount} Airtime`,
      amount: discountedAmount,
      status: 'completed',
      date: new Date().toLocaleString(),
      reference: `TRX-${Date.now().toString().slice(-6)}`
    })

    toast.success(`Successfully purchased ₦${amount} ${selectedNetwork} airtime for ₦${discountedAmount} (Saved ₦${savings})`)
    setShowConfirm(false)
    setAmount('')
    setPhoneNumber('')
    setSelectedNetwork(null)
    setIsProcessing(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Discounted Airtime</h1>
            <p className="text-green-200">Save up to 5% on every airtime purchase</p>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-xs text-green-200">Discount</p>
            <p className="text-lg font-bold">3-5%</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-xs text-green-200">Min Amount</p>
            <p className="text-lg font-bold">₦100</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-xs text-green-200">Max Amount</p>
            <p className="text-lg font-bold">₦50,000</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Network Selection */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Select Network</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {airtimePlans.map((plan) => (
                <button
                  key={plan.network}
                  onClick={() => setSelectedNetwork(plan.network)}
                  className={`relative p-5 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedNetwork === plan.network
                      ? 'border-green-500 bg-green-50 shadow-lg shadow-green-500/20'
                      : 'border-slate-200 bg-white hover:border-green-300'
                  }`}
                >
                  <div className={`w-12 h-12 ${networkColors[plan.network]} rounded-xl flex items-center justify-center mb-3`}>
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-slate-900">{plan.network}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Percent className="w-3 h-3 text-green-600" />
                    <span className="text-sm font-bold text-green-600">{plan.discount}% OFF</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Amount & Phone Input */}
          {selectedNetwork && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 ${networkColors[selectedNetwork]} rounded-lg flex items-center justify-center`}>
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-slate-900">{selectedNetwork}</span>
                <span className="text-sm text-green-600 font-medium">({selectedPlan.discount}% discount)</span>
              </div>

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

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Amount (₦)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₦</span>
                  <input
                    type="number"
                    placeholder="Enter amount (100 - 50000)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="100"
                    max="50000"
                    className="input-field pl-8"
                  />
                </div>
              </div>

              {/* Quick Amounts */}
              <div className="flex flex-wrap gap-2">
                {[500, 1000, 2000, 5000, 10000].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt.toString())}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      amount === amt.toString()
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    ₦{amt.toLocaleString()}
                  </button>
                ))}
              </div>

              {amount && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Face Value</span>
                    <span className="font-medium">₦{parseInt(amount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Discount ({selectedPlan.discount}%)</span>
                    <span className="font-medium text-green-600">-₦{savings.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-green-200 pt-2 flex justify-between">
                    <span className="font-medium text-slate-700">You Pay</span>
                    <span className="font-bold text-xl text-green-700">₦{discountedAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">You Save</span>
                    <span className="font-bold text-green-600">₦{savings.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => setShowConfirm(true)}
                disabled={!amount || !phoneNumber}
                className="w-full btn-primary bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Purchase
              </button>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h4 className="font-semibold text-slate-900 mb-4">How It Works</h4>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Select Network', desc: 'Choose your mobile network provider' },
                { step: '2', title: 'Enter Details', desc: 'Input phone number and amount' },
                { step: '3', title: 'Get Discount', desc: 'Automatic discount applied at checkout' },
                { step: '4', title: 'Instant Delivery', desc: 'Airtime delivered in seconds' },
              ].map(item => (
                <div key={item.step} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white">
            <h4 className="font-semibold mb-2">Refer & Earn</h4>
            <p className="text-sm text-slate-300 mb-4">Share your referral code and earn 2% on every purchase your friends make.</p>
            <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
              <span className="font-mono text-sm">{user.referralCode}</span>
              <button className="text-xs text-primary-300 hover:text-primary-200 font-medium">Copy</button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && selectedNetwork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="text-center mb-6">
              <div className={`w-16 h-16 bg-gradient-to-br ${networkBgColors[selectedNetwork]} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Confirm Purchase</h3>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Network</span>
                <span className="font-medium">{selectedNetwork}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Phone Number</span>
                <span className="font-medium">{phoneNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Face Value</span>
                <span className="font-medium">₦{parseInt(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Discount</span>
                <span className="font-medium text-green-600">{selectedPlan.discount}%</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between">
                <span className="font-medium text-slate-700">Total to Pay</span>
                <span className="font-bold text-xl text-slate-900">₦{discountedAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 btn-secondary">Cancel</button>
              <button
                onClick={handlePurchase}
                disabled={isProcessing}
                className="flex-1 btn-primary bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Check className="w-4 h-4" /> Confirm</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
