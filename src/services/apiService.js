import axios from 'axios';
import config from '../config/config';

// API base URL - adjust according to your Spring Boot server
const API_BASE_URL = 'http://localhost:8080/api/customers';

// Create axios instance with default headers
const api = axios.create({
  baseURL: config.BACKEND_API,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to add auth token to every request
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle auth errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      //window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


// Auth API calls
export const customerAPI = {
  createCustomer: customerData => api.post('/cid/customer', customerData),
  searchCustomer: (searchParams) => api.get('/cid/token/',{ params: searchParams }),
   //searchCustomerByToken: (searchParams) => api.get(`/cid/token/${searchParams}`),
   searchCustomerByToken: (searchParams) => api.post('/cid/detokenize',searchParams),
};

// Expenses API calls
export const expenseAPI = {
  getExpenses: () => api.get('/expenses'),
  addExpense: expenseData => api.post('/expenses', expenseData),
  updateExpense: (id, expenseData) => api.put(`/expenses/${id}`, expenseData),
  deleteExpense: id => api.delete(`/expenses/${id}`)
};

// Receive money API calls
export const receiveMoneyAPI = {
  getReceivedMoney: () => api.get('/receivemoney'),
  addReceivedMoney: receiveMoneyData => api.post('/receivemoney', receiveMoneyData),
  updateReceivedMoney: (id, receiveMoneyData) => api.put(`/receivemoney/${id}`, receiveMoneyData),
  deleteReceivedMoney: id => api.delete(`/receivemoney/${id}`)
};

// Send Mail API calls
export const sendEmailAPI = {
  sendMail: mailData => api.post('/sent-mail', mailData),
};

// Simulated API calls - replace these with actual axios calls in your project
export const apiService = {
  createCustomer: async (customerData) => {
    // Replace with: return await axios.post(API_BASE_URL, customerData);
    console.log('Creating customer:', customerData);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { id: Date.now(), ...customerData } });
      }, 1000);
    });
  },
  
  searchCustomer: async (searchParams) => {
    // Replace with: return await axios.get(`${API_BASE_URL}/search`, { params: searchParams });
    console.log('Searching customer:', searchParams);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate search results
        const mockCustomer = {
          id: 1,
          customerName: 'John Doe',
          bankAccountNo: '1234567890',
          email: 'john.doe@example.com',
          address: '123 Main Street, Mumbai, Maharashtra, India',
          mobileNo: '9876543210'
        };
        resolve({ data: mockCustomer });
      }, 800);
    });
  }
};

export default api;