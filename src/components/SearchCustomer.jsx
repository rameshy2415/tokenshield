
import { useContext, useState } from 'react';
import { Search, User, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { customerAPI } from '../services/apiService';
import {ApplicationContext} from '../context/ApplicationContext';

const SearchCustomer = () => {
  const {loading, setLoading, error, setError} = useContext(ApplicationContext)
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('customerName');
  const [customerData, setCustomerData] = useState(null);
 


  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError('');
    setCustomerData(null);

    try {
      const searchParams = {
        [searchType]: searchQuery.trim()
      };
      
      const response = await customerAPI.searchCustomerByToken(searchParams);

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
              <option value="customerEmail">Email</option>
              <option value="customerPhone">Mobile Number</option>
              <option value="customerAccountNumber">Account Number</option>
              <option value="customerAddress">Customer Address</option>
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

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSearch}
            disabled={loading}
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
              <p className="mt-1 text-gray-900 font-medium">{customerData.customerAccountNumber}</p>
            </div>
            
            <div className="bg-white p-4 rounded-md shadow-sm">
              <label className="block text-sm font-medium text-gray-600">Email Address</label>
              <p className="mt-1 text-gray-900 font-medium">{customerData.customerEmail}</p>
            </div>
            
            <div className="bg-white p-4 rounded-md shadow-sm">
              <label className="block text-sm font-medium text-gray-600">Mobile Number</label>
              <p className="mt-1 text-gray-900 font-medium">{customerData.customerPhone}</p>
            </div>
            
            <div className="bg-white p-4 rounded-md shadow-sm md:col-span-2">
              <label className="block text-sm font-medium text-gray-600">Address</label>
              <p className="mt-1 text-gray-900">{customerData.customerAddress}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCustomer