export const mockUser = {
  id: 1,
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  phone: '+234 812 345 6789',
  avatar: 'AJ',
  balance: 24580.50,
  totalSpent: 128450.00,
  referralCode: 'ALEX2024',
  referralBonus: 2500,
  tier: 'Gold',
  joinedDate: '2024-01-15',
  apiKey: 'sk_live_xxxxxxxxxxxxxxxxxxxx',
}

export const mockTransactions = [
  { id: 1, type: 'data', item: 'MTN 10GB - 30 Days', amount: 3000, status: 'completed', date: '2024-07-06 14:30', reference: 'TRX-001' },
  { id: 2, type: 'airtime', item: 'GLO ₦5000 Airtime', amount: 4750, status: 'completed', date: '2024-07-05 09:15', reference: 'TRX-002' },
  { id: 3, type: 'bulksms', item: 'Bulk SMS - 5,000 msgs', amount: 15000, status: 'completed', date: '2024-07-04 16:45', reference: 'TRX-003' },
  { id: 4, type: 'token', item: '100 USDT (TRC20)', amount: 165000, status: 'completed', date: '2024-07-03 11:20', reference: 'TRX-004' },
  { id: 5, type: 'bulkemail', item: 'Email Campaign - 10k', amount: 25000, status: 'pending', date: '2024-07-07 08:00', reference: 'TRX-005' },
  { id: 6, type: 'data', item: 'Airtel 5GB - 7 Days', amount: 1500, status: 'failed', date: '2024-07-02 19:10', reference: 'TRX-006' },
  { id: 7, type: 'airtime', item: '9Mobile ₦2000', amount: 1900, status: 'completed', date: '2024-07-01 13:00', reference: 'TRX-007' },
  { id: 8, type: 'bulksms', item: 'Bulk SMS - 1,000 msgs', amount: 3500, status: 'completed', date: '2024-06-30 10:30', reference: 'TRX-008' },
]

export const dataPlans = [
  { id: 1, network: 'MTN', name: '1GB - 7 Days', price: 300, validity: '7 days', type: 'SME' },
  { id: 2, network: 'MTN', name: '2GB - 30 Days', price: 600, validity: '30 days', type: 'SME' },
  { id: 3, network: 'MTN', name: '5GB - 30 Days', price: 1300, validity: '30 days', type: 'SME' },
  { id: 4, network: 'MTN', name: '10GB - 30 Days', price: 2500, validity: '30 days', type: 'SME' },
  { id: 5, network: 'MTN', name: '20GB - 30 Days', price: 4500, validity: '30 days', type: 'SME' },
  { id: 6, network: 'MTN', name: '40GB - 30 Days', price: 8000, validity: '30 days', type: 'SME' },
  { id: 7, network: 'GLO', name: '1.5GB - 7 Days', price: 500, validity: '7 days', type: 'Gifting' },
  { id: 8, network: 'GLO', name: '3.5GB - 30 Days', price: 1000, validity: '30 days', type: 'Gifting' },
  { id: 9, network: 'GLO', name: '7.5GB - 30 Days', price: 2000, validity: '30 days', type: 'Gifting' },
  { id: 10, network: 'GLO', name: '18GB - 30 Days', price: 4000, validity: '30 days', type: 'Gifting' },
  { id: 11, network: 'Airtel', name: '2GB - 30 Days', price: 700, validity: '30 days', type: 'SME' },
  { id: 12, network: 'Airtel', name: '5GB - 30 Days', price: 1500, validity: '30 days', type: 'SME' },
  { id: 13, network: 'Airtel', name: '10GB - 30 Days', price: 2800, validity: '30 days', type: 'SME' },
  { id: 14, network: '9Mobile', name: '1.5GB - 30 Days', price: 500, validity: '30 days', type: 'SME' },
  { id: 15, network: '9Mobile', name: '4GB - 30 Days', price: 1200, validity: '30 days', type: 'SME' },
]

export const airtimePlans = [
  { id: 1, network: 'MTN', discount: 3, minAmount: 100, maxAmount: 50000 },
  { id: 2, network: 'GLO', discount: 5, minAmount: 100, maxAmount: 50000 },
  { id: 3, network: 'Airtel', discount: 3, minAmount: 100, maxAmount: 50000 },
  { id: 4, network: '9Mobile', discount: 4, minAmount: 100, maxAmount: 50000 },
]

export const tokenPlans = [
  { id: 1, name: 'USDT (TRC20)', symbol: 'USDT', price: 1650, min: 10, max: 10000, icon: '💵' },
  { id: 2, name: 'USDT (ERC20)', symbol: 'USDT', price: 1650, min: 50, max: 50000, icon: '💵' },
  { id: 3, name: 'Bitcoin', symbol: 'BTC', price: 105000000, min: 0.001, max: 10, icon: '₿' },
  { id: 4, name: 'Ethereum', symbol: 'ETH', price: 6200000, min: 0.01, max: 100, icon: 'Ξ' },
  { id: 5, name: 'Binance Coin', symbol: 'BNB', price: 850000, min: 0.1, max: 500, icon: '🔶' },
  { id: 6, name: 'Solana', symbol: 'SOL', price: 280000, min: 0.5, max: 1000, icon: '◎' },
]

export const bulkSMSPricing = [
  { range: '1 - 999', price: 3.5 },
  { range: '1,000 - 4,999', price: 3.0 },
  { range: '5,000 - 9,999', price: 2.5 },
  { range: '10,000 - 49,999', price: 2.0 },
  { range: '50,000 - 99,999', price: 1.8 },
  { range: '100,000+', price: 1.5 },
]

export const bulkEmailPricing = [
  { range: '1 - 999', price: 5.0 },
  { range: '1,000 - 4,999', price: 4.0 },
  { range: '5,000 - 9,999', price: 3.5 },
  { range: '10,000 - 49,999', price: 2.5 },
  { range: '50,000 - 99,999', price: 2.0 },
  { range: '100,000+', price: 1.5 },
]

export const mockContacts = [
  { id: 1, name: 'John Doe', phone: '+2348012345678', email: 'john@example.com', group: 'Customers', dateAdded: '2024-06-01' },
  { id: 2, name: 'Jane Smith', phone: '+2348023456789', email: 'jane@example.com', group: 'Customers', dateAdded: '2024-06-02' },
  { id: 3, name: 'Mike Brown', phone: '+2348034567890', email: 'mike@example.com', group: 'Leads', dateAdded: '2024-06-03' },
  { id: 4, name: 'Sarah Wilson', phone: '+2348045678901', email: 'sarah@example.com', group: 'VIP', dateAdded: '2024-06-04' },
  { id: 5, name: 'David Lee', phone: '+2348056789012', email: 'david@example.com', group: 'Leads', dateAdded: '2024-06-05' },
]

export const mockCampaigns = [
  { id: 1, name: 'Summer Promo', type: 'sms', recipients: 5000, sent: 5000, delivered: 4850, failed: 150, cost: 15000, status: 'completed', date: '2024-07-04' },
  { id: 2, name: 'New Product Launch', type: 'email', recipients: 10000, sent: 10000, delivered: 9200, failed: 800, cost: 25000, status: 'completed', date: '2024-07-03' },
  { id: 3, name: 'Flash Sale Alert', type: 'sms', recipients: 2000, sent: 1500, delivered: 1450, failed: 50, cost: 4500, status: 'running', date: '2024-07-07' },
  { id: 4, name: 'Weekly Newsletter', type: 'email', recipients: 5000, sent: 0, delivered: 0, failed: 0, cost: 12500, status: 'scheduled', date: '2024-07-08' },
]

export const smsTemplates = [
  { id: 1, name: 'Welcome Message', content: 'Welcome to our service! We are excited to have you on board. Reply STOP to opt out.' },
  { id: 2, name: 'Payment Reminder', content: 'Dear {name}, your payment of ₦{amount} is due on {date}. Please pay to avoid service interruption.' },
  { id: 3, name: 'OTP Verification', content: 'Your verification code is: {code}. Valid for 10 minutes. Do not share this code with anyone.' },
  { id: 4, name: 'Promo Alert', content: 'FLASH SALE! Get 50% off all items today only. Visit {link} to shop now. Offer ends midnight!' },
]

export const emailTemplates = [
  { id: 1, name: 'Welcome Email', subject: 'Welcome to Our Platform!', body: '<h1>Welcome!</h1><p>We are thrilled to have you join us. Here is what you can do next...</p>' },
  { id: 2, name: 'Invoice', subject: 'Invoice #{invoice_id}', body: '<h1>Invoice</h1><p>Dear {name}, please find your invoice attached. Amount due: ₦{amount}</p>' },
  { id: 3, name: 'Newsletter', subject: 'Your Weekly Update', body: '<h1>Weekly Newsletter</h1><p>Here is what happened this week...</p>' },
]

export const chartData = [
  { name: 'Jan', data: 4500, airtime: 3200, tokens: 12000, sms: 8000, email: 5000 },
  { name: 'Feb', data: 5200, airtime: 4100, tokens: 15000, sms: 9500, email: 6200 },
  { name: 'Mar', data: 4800, airtime: 3800, tokens: 18000, sms: 11000, email: 7500 },
  { name: 'Apr', data: 6100, airtime: 4500, tokens: 22000, sms: 13500, email: 9000 },
  { name: 'May', data: 5500, airtime: 4200, tokens: 25000, sms: 12000, email: 8500 },
  { name: 'Jun', data: 7200, airtime: 5100, tokens: 30000, sms: 16000, email: 11000 },
  { name: 'Jul', data: 6800, airtime: 4800, tokens: 28000, sms: 15000, email: 10500 },
]
