'use client';

import { useState, useEffect } from 'react';

interface Item {
  id: number;
  name: string;
  description: string;
}

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [health, setHealth] = useState<{ status: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [healthRes, itemsRes] = await Promise.all([
        fetch('/api/health'),
        fetch('/api/items')
      ]);

      if (healthRes.ok) {
        setHealth(await healthRes.json());
      } else {
        setHealth({ status: 'Error' });
      }

      if (itemsRes.ok) {
        setItems(await itemsRes.json());
      } else {
        setError('Failed to fetch items');
      }
    } catch {
      setError('Connection error');
      setHealth({ status: 'Offline' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName) return;

    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newItemName, description: newItemDesc })
      });

      if (res.ok) {
        const addedItem = await res.json();
        setItems([...items, addedItem]);
        setNewItemName('');
        setNewItemDesc('');
      }
    } catch {
      console.error('Failed to add item');
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            DevOps Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">API Status:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${health?.status === 'OK' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'
              }`}>
              {health ? health.status : 'Checking...'}
            </span>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Add Item Form */}
          <section className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-6">Add New Item</h2>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Item Name</label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  placeholder="Enter description..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors"
              >
                Add Item
              </button>
            </form>
          </section>

          {/* Items List */}
          <section className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-6">Items Feed</h2>
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-700 rounded-lg" />)}
              </div>
            ) : error ? (
              <p className="text-red-400">{error}</p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {items.length === 0 && <p className="text-gray-500 italic">No items found.</p>}
                {items.map(item => (
                  <div key={item.id} className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/50 hover:border-blue-500/30 transition-all">
                    <h3 className="font-bold text-blue-400">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
