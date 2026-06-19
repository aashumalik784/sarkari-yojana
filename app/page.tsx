'use client';
import { useEffect, useState } from 'react';

interface Scheme {
  id: number;
  name: string;
  category: string;
  description: string;
  benefits: string;
  eligibility: string;
  launch_date: string;
  url: string;
}

interface CSCService {
  name: string;
  icon: string;
  url: string;
  category: string;
}

export default function Home() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('schemes'); // 'schemes', 'csc', 'settings'

  const cscServices: CSCService[] = [
    { name: 'Aadhaar Card', icon: '', url: 'https://myaadhaar.uidai.gov.in', category: 'Identity' },
    { name: 'PAN Card', icon: '💳', url: 'https://www.tin-nsdl.com', category: 'Identity' },
    { name: 'Driving Licence', icon: '🚗', url: 'https://parivahan.gov.in', category: 'Transport' },
    { name: 'Voter Card', icon: '🗳️', url: 'https://voters.eci.gov.in', category: 'Identity' },
    { name: 'Passport', icon: '🛂', url: 'https://passportindia.gov.in', category: 'Travel' },
    { name: 'UPBOCW', icon: '🏗️', url: 'https://upbocw.in', category: 'Labour' },
    { name: 'Ration Card', icon: '🍚', url: 'https://fcs.up.gov.in', category: 'Food' },
    { name: 'eShram Card', icon: '👷', url: 'https://eshram.gov.in', category: 'Labour' },
    { name: 'ABHA Card', icon: '🏥', url: 'https://abha.abdm.gov.in', category: 'Health' },
    { name: 'Ayushman Card', icon: '💊', url: 'https://pmjay.gov.in', category: 'Health' },
    { name: 'Electricity Bill', icon: '💡', url: 'https://www.uppower.org.in', category: 'Utility' },
    { name: 'Water Bill', icon: '💧', url: 'https://jalboard.up.nic.in', category: 'Utility' },
    { name: 'Property Tax', icon: '🏠', url: 'https://upnagarik.in', category: 'Tax' },
    { name: 'Birth Certificate', icon: '👶', url: 'https://upbirthdeath.in', category: 'Certificate' },
    { name: 'Caste Certificate', icon: '📜', url: 'https://edistrict.up.gov.in', category: 'Certificate' },
    { name: 'Income Certificate', icon: '💰', url: 'https://edistrict.up.gov.in', category: 'Certificate' },
    { name: 'Domicile Certificate', icon: '🏡', url: 'https://edistrict.up.gov.in', category: 'Certificate' },
    { name: 'Land Records', icon: '📋', url: 'https://upbhulekh.gov.in', category: 'Land' },
    { name: 'Khatauni', icon: '📄', url: 'https://upbhulekh.gov.in', category: 'Land' },    { name: 'Encumbrance Certificate', icon: '🔍', url: 'https://igrsup.gov.in', category: 'Land' },
  ];

  useEffect(() => {
    if (activeTab === 'schemes') {
      fetchSchemes();
    }
  }, [search, activeTab]);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/schemes?q=${search}&limit=100`);
      const data = await res.json();
      setSchemes(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const triggerUpdate = async () => {
    setUpdating(true);
    setUpdateMessage('');
    try {
      const res = await fetch('/api/cron/auto-update', { method: 'POST' });
      const data = await res.json();
      setUpdateMessage(data.message || 'Update successful!');
      setTimeout(() => {
        fetchSchemes();
        setUpdating(false);
      }, 2000);
    } catch (error) {
      setUpdateMessage('Update failed. Try again.');
      setUpdating(false);
    }
  };

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg bg-orange-100 hover:bg-orange-200 transition"
            >
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-orange-600">🇮🇳 सरकारी योजना Hub</h1>
              <p className="text-xs text-gray-600">Auto-Updated Government Schemes Directory</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('settings')}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Side Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMenu}></div>
          <div className="relative bg-white w-64 h-full shadow-xl overflow-y-auto">
            <div className="p-4 bg-orange-500 text-white">
              <h2 className="text-xl font-bold">Menu</h2>
              <p className="text-sm text-orange-100">Navigate to sections</p>
            </div>
            <nav className="p-4 space-y-2">
              <button
                onClick={() => { setActiveTab('schemes'); setShowMenu(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition ${activeTab === 'schemes' ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'}`}
              >
                <span className="text-2xl">📋</span>
                <div>
                  <p className="font-semibold">Government Schemes</p>
                  <p className="text-xs text-gray-500">{schemes.length} schemes available</p>
                </div>
              </button>
              <button
                onClick={() => { setActiveTab('csc'); setShowMenu(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition ${activeTab === 'csc' ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'}`}              >
                <span className="text-2xl">🏛️</span>
                <div>
                  <p className="font-semibold">CSC Services</p>
                  <p className="text-xs text-gray-500">{cscServices.length} services</p>
                </div>
              </button>
              <button
                onClick={() => { setActiveTab('settings'); setShowMenu(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition ${activeTab === 'settings' ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'}`}
              >
                <span className="text-2xl">⚙️</span>
                <div>
                  <p className="font-semibold">Settings</p>
                  <p className="text-xs text-gray-500">App preferences</p>
                </div>
              </button>
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50 border-t">
              <p className="text-xs text-gray-500 text-center">© 2026 Sarkari Yojana Hub</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Schemes Tab */}
        {activeTab === 'schemes' && (
          <div>
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="🔍 योजना खोजें..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 p-4 rounded-xl border-2 border-orange-200 focus:border-orange-500 outline-none"
              />
              <button
                onClick={triggerUpdate}
                disabled={updating}
                className="bg-orange-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-orange-600 disabled:bg-gray-400 transition"
              >
                {updating ? '⏳ Updating...' : '🔄 Update Now'}
              </button>
            </div>

            {updateMessage && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl text-center">
                ✅ {updateMessage}              </div>
            )}

            {loading ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading {schemes.length} schemes...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    onClick={() => openLink(scheme.url || `https://www.google.com/search?q=${encodeURIComponent(scheme.name + ' official website site:gov.in')}`)}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border-l-4 border-orange-500 cursor-pointer transform hover:scale-105"
                  >
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded font-semibold">
                      {scheme.category}
                    </span>
                    <h2 className="text-lg font-bold mt-3 mb-2 text-gray-900">
                      {scheme.name}
                    </h2>
                    <p className="text-sm text-gray-600 mb-3">
                      {scheme.description}
                    </p>
                    {scheme.benefits && (
                      <p className="text-sm text-green-600 mb-2 font-medium bg-green-50 p-2 rounded">
                        💰 {scheme.benefits}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mb-3">
                      📅 {scheme.launch_date}
                    </p>
                    <p className="text-xs text-orange-600 font-bold">
                      🔗 Click for Official Website →
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CSC Services Tab */}
        {activeTab === 'csc' && (
          <div>
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-orange-600 mb-2">🏛️ CSC Services</h2>
              <p className="text-gray-600">Common Service Centre - All Online Services</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cscServices.map((service, index) => (
                <div
                  key={index}
                  onClick={() => openLink(service.url)}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border-l-4 border-blue-500 cursor-pointer transform hover:scale-105"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-4xl">{service.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {service.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Click to apply online for {service.name}
                  </p>
                  <p className="text-xs text-blue-600 font-bold mt-3">
                    🔗 Visit Official Portal →
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-orange-600 mb-2">⚙️ Settings</h2>
              <p className="text-gray-600">Manage your preferences</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-3">📱 App Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Version:</span>
                    <span className="font-medium">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Schemes:</span>
                    <span className="font-medium">{schemes.length}</span>
                  </div>
                  <div className="flex justify-between">                    <span className="text-gray-600">CSC Services:</span>
                    <span className="font-medium">{cscServices.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Update:</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-3">🔔 Notifications</h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Enable auto-update notifications</span>
                  <input type="checkbox" className="w-5 h-5 text-orange-500 rounded" defaultChecked />
                </div>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-3">🌐 Language</h3>
                <select className="w-full p-3 border rounded-lg focus:border-orange-500 outline-none">
                  <option>हिंदी (Hindi)</option>
                  <option>English</option>
                </select>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">📞 Contact & Support</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => openLink('https://www.mygov.in')}
                    className="w-full p-3 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition text-left"
                  >
                    🔗 MyGov Helpdesk
                  </button>
                  <button
                    onClick={() => openLink('https://www.csc.gov.in')}
                    className="w-full p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-left"
                  >
                    🔗 CSC Support
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-gray-500 text-center">
                  © 2026 Sarkari Yojana Hub | All Rights Reserved
                </p>
              </div>
            </div>          </div>
        )}
      </div>
    </main>
  );
                }
