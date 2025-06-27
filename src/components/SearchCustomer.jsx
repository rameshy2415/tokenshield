
import { useContext, useState } from 'react';
import { Search, User, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { customerAPI } from '../services/apiService';
import {ApplicationContext} from '../context/ApplicationContext';

const SearchCustomer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('customerName');
  const [customerIdQuery, setCustomerIdQuery] = useState('');
  const [customerData, setCustomerData] = useState(null);


  const {loading,setLoading, error, setError } = useContext(ApplicationContext)

  const handleSearch = async (e) => {
    e.preventDefault();
    
    // Check if either search query or customer ID is provided
    if (!searchQuery.trim() && !customerIdQuery.trim()) {
      setError('Please enter either a search term or customer ID');
      return;
    }

    setLoading(true);
    setError('');
    setCustomerData(null);

    try {
      let searchParams = {};
      let response ;
      // If customer ID is provided, use it (priority over other search)
      if (customerIdQuery.trim()) {
         response = await customerAPI.searchCustomerById(customerIdQuery.trim());
      } else {
        // Otherwise use the regular search
        searchParams = {
          [searchType]: searchQuery.trim()
        };
         response = await customerAPI.searchCustomerByToken(searchParams);
      }
      
     

      if (response.data) {
        setCustomerData(response.data);
      } else {
        setError('No customer found with the provided search criteria');
      }
    } catch (error) {
      console.error('Error searching customer:', error);
      if (error.response?.status === 404) {
        setError('No customer found with the provided search criteria');
      } else {
        setError('Failed to search customer. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setCustomerIdQuery('');
    setCustomerData(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <Search className="w-6 h-6 text-green-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Search Customer</h2>
      </div>

      {/* Search Form */}
      <div className="mb-6">
        {/* Customer ID Search - Optional */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800 mb-3">Quick Search by Customer ID</h3>
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={customerIdQuery}
                onChange={(e) => setCustomerIdQuery(e.target.value)}
                className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Customer ID (optional)"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !customerIdQuery.trim()}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Search by ID
            </button>
          </div>
        </div>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 font-medium">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Regular Search */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Search by Other Fields</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="searchType" className="block text-sm font-medium text-gray-700 mb-2">
                Search By
              </label>
              <select
                id="searchType"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="customerName">Customer Name</option>
                <option value="email">Email</option>
                <option value="mobileNo">Mobile Number</option>
                <option value="bankAccountNo">Account Number</option>
              </select>
            </div>
            
            <div className="flex-2">
              <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 mb-2">
                Search Term
              </label>
              <input
                type="text"
                id="searchQuery"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={`Enter ${searchType === 'customerName' ? 'customer name' : searchType === 'email' ? 'email address' : searchType === 'mobileNo' ? 'mobile number' : 'account number'}`}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSearch}
            disabled={loading || (!searchQuery.trim() && !customerIdQuery.trim())}
            className="flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <Search className="w-5 h-5 mr-2" />
            )}
            {loading ? 'Searching...' : 'Search'}
          </button>
          
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center">
          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
          <span className="text-red-800">{error}</span>
        </div>
      )}

      {/* Customer Details */}
      {customerData && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <label className="block text-sm font-medium text-gray-600">Customer Name</label>
              <p className="mt-1 text-gray-900 font-medium">{customerData.customerName}</p>
            </div>
            
            <div className="bg-white p-4 rounded-md shadow-sm">
              <label className="block text-sm font-medium text-gray-600">Bank Account Number</label>
              <p className="mt-1 text-gray-900 font-medium">{customerData.bankAccountNo}</p>
            </div>
            
            <div className="bg-white p-4 rounded-md shadow-sm">
              <label className="block text-sm font-medium text-gray-600">Email Address</label>
              <p className="mt-1 text-gray-900 font-medium">{customerData.email}</p>
            </div>
            
            <div className="bg-white p-4 rounded-md shadow-sm">
              <label className="block text-sm font-medium text-gray-600">Mobile Number</label>
              <p className="mt-1 text-gray-900 font-medium">{customerData.mobileNo}</p>
            </div>
            
            <div className="bg-white p-4 rounded-md shadow-sm md:col-span-2">
              <label className="block text-sm font-medium text-gray-600">Address</label>
              <p className="mt-1 text-gray-900">{customerData.address}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCustomer