import "./App.css";
import { useState } from "react";
import CustomerForm from "./components/CustomerForm";
import SearchCustomer from "./components/SearchCustomer";

const App = () => {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">TokenShield Customer Management</h1>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'create' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Create Customer
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'search' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Search Customer
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'create' && <CustomerForm />}
        {activeTab === 'search' && <SearchCustomer />}
      </div>
    </div>
  );
};


export default App;
