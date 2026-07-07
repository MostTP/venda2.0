const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token')
    const url = `${this.baseURL}${endpoint}`

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body)
    }

    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong')
    }

    return data
  }

  login(credentials) {
    return this.request('/auth/login', { method: 'POST', body: credentials })
  }

  register(userData) {
    return this.request('/auth/register', { method: 'POST', body: userData })
  }

  getMe() {
    return this.request('/auth/me')
  }

  getBalance() {
    return this.request('/wallet/balance')
  }

  fundWallet(data) {
    return this.request('/wallet/fund', { method: 'POST', body: data })
  }

  verifyPayment(reference) {
    return this.request('/wallet/verify', { method: 'POST', body: { reference } })
  }

  getDataPlans(network) {
    const query = network && network !== 'All' ? `?network=${network}` : ''
    return this.request(`/data/plans${query}`)
  }

  purchaseData(data) {
    return this.request('/data/purchase', { method: 'POST', body: data })
  }

  getAirtimePlans() {
    return this.request('/airtime/plans')
  }

  purchaseAirtime(data) {
    return this.request('/airtime/purchase', { method: 'POST', body: data })
  }

  getTokenPlans() {
    return this.request('/tokens/plans')
  }

  purchaseToken(data) {
    return this.request('/tokens/purchase', { method: 'POST', body: data })
  }

  getSMSTemplates() {
    return this.request('/bulksms/templates')
  }

  createSMSTemplate(data) {
    return this.request('/bulksms/templates', { method: 'POST', body: data })
  }

  sendBulkSMS(data) {
    return this.request('/bulksms/send', { method: 'POST', body: data })
  }

  getSMSCampaigns() {
    return this.request('/bulksms/campaigns')
  }

  getEmailTemplates() {
    return this.request('/bulkemail/templates')
  }

  createEmailTemplate(data) {
    return this.request('/bulkemail/templates', { method: 'POST', body: data })
  }

  sendBulkEmail(data) {
    return this.request('/bulkemail/send', { method: 'POST', body: data })
  }

  getEmailCampaigns() {
    return this.request('/bulkemail/campaigns')
  }

  getContacts(params = {}) {
    const query = new URLSearchParams(params).toString()
    return this.request(`/contacts?${query}`)
  }

  createContact(data) {
    return this.request('/contacts', { method: 'POST', body: data })
  }

  importContacts(contacts) {
    return this.request('/contacts/import', { method: 'POST', body: { contacts } })
  }

  getTransactions(params = {}) {
    const query = new URLSearchParams(params).toString()
    return this.request(`/transactions?${query}`)
  }

  getCampaigns(params = {}) {
    const query = new URLSearchParams(params).toString()
    return this.request(`/campaigns?${query}`)
  }

  cancelCampaign(id) {
    return this.request(`/campaigns/${id}/cancel`, { method: 'PUT' })
  }

  getDashboardStats() {
    return this.request('/dashboard/stats')
  }
}

export const api = new ApiService()
