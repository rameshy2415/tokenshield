
import React, { useState } from 'react';
import { Search, User, Save, AlertCircle, CheckCircle } from 'lucide-react';

import { customerAPI } from '../services/apiService';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerAccountNumber: '',
    customerEmail: '',
    customerAddress: '',
    customerPhone: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  

  // Validation rules
  const validateForm = () => {
    const newErrors = {};

    // Customer Name validation
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    } else if (formData.customerName.trim().length < 2) {
      newErrors.customerName = 'Customer name must be at least 2 characters';
    }

    // Bank Account Number validation
    if (!formData.customerAccountNumber.trim()) {
      newErrors.customerAccountNumber = 'Bank account number is required';
    } else if (!/^\d{9,18}$/.test(formData.customerAccountNumber.trim())) {
      newErrors.customerAccountNumber = 'Bank account number must be 9-18 digits';
    }

    // Email validation
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail.trim())) {
      newErrors.customerEmail = 'Please enter a valid customerEmail customerAddress';
    }

    // Address validation
    if (!formData.customerAddress.trim()) {
      newErrors.customerAddress = 'Address is required';
    } else if (formData.customerAddress.trim().length < 10) {
      newErrors.customerAddress = 'Address must be at least 10 characters';
    }

    // Mobile Number validation
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.customerPhone.trim())) {
      newErrors.customerPhone = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const response = await customerAPI.createCustomer(formData);
      console.log('Customer created:', response.data);
      
      setSuccess(true);
      // Reset form
      setFormData({
        customerName: '',
        customerAccountNumber: '',
        customerEmail: '',
        customerAddress: '',
        customerPhone: ''
      });
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error creating customer:', error);
      setErrors({ submit: 'Failed to create customer. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <User className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Add New Customer</h2>
      </div>

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
          <span className="text-green-800">Customer created successfully!</span>
        </div>
      )}

      {errors.submit && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center">
          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
          <span className="text-red-800">{errors.submit}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Customer Name */}
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
            Customer Name *
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.customerName ? 'border-red-300 focus:border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter customer name"
          />
          {errors.customerName && (
            <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
          )}
        </div>

        {/* Bank Account Number */}
        <div>
          <label htmlFor="customerAccountNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Bank Account Number *
          </label>
          <input
            type="text"
            id="customerAccountNumber"
            name="customerAccountNumber"
            value={formData.customerAccountNumber}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.customerAccountNumber ? 'border-red-300 focus:border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter bank account number"
          />
          {errors.customerAccountNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.customerAccountNumber}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="customerEmail"
            id="customerEmail"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.customerEmail ? 'border-red-300 focus:border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter customerEmail customerAddress"
          />
          {errors.customerEmail && (
            <p className="mt-1 text-sm text-red-600">{errors.customerEmail}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>
          <textarea
            id="customerAddress"
            name="customerAddress"
            value={formData.customerAddress}
            onChange={handleInputChange}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.customerAddress ? 'border-red-300 focus:border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter complete customerAddress"
          />
          {errors.customerAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.customerAddress}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number *
          </label>
          <input
            type="tel"
            id="customerPhone"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.customerPhone ? 'border-red-300 focus:border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter 10-digit mobile number"
          />
          {errors.customerPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.customerPhone}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          ) : (
            <Save className="w-5 h-5 mr-2" />
          )}
          {loading ? 'Creating...' : 'Create Customer'}
        </button>
      </div>
    </div>
  );
};

export default CustomerForm