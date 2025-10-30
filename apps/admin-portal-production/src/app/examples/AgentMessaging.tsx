'use client';

import { useState, useEffect } from 'react';

/**
 * Example React component for Agent Messaging
 *
 * This demonstrates how agents can communicate through the system.
 * Useful for coordinating between Vercel, GitHub, and other services.
 */

interface AgentMessage {
  id: string;
  from: string;
  to: string;
  type: 'request' | 'response' | 'event' | 'command';
  payload: Record<string, any>;
  timestamp: string;
  correlationId?: string;
}

interface Agent {
  id: string;
  name: string;
  capabilities: string[];
  endpoint?: string;
  lastSeen: Date;
}

export default function AgentMessaging() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newAgent, setNewAgent] = useState({
    id: '',
    name: '',
    capabilities: '',
  });

  const [newMessage, setNewMessage] = useState({
    from: '',
    to: '',
    type: 'request' as const,
    action: '',
    data: '',
  });

  // Load agents on mount
  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      const response = await fetch('/api/agents/register');
      const data = await response.json();
      if (data.success) {
        setAgents(data.agents);
      }
    } catch (err) {
      console.error('Failed to load agents:', err);
    }
  };

  const registerAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/agents/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: newAgent.id,
          name: newAgent.name,
          capabilities: newAgent.capabilities.split(',').map((c) => c.trim()),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNewAgent({ id: '', name: '', capabilities: '' });
        await loadAgents();
      } else {
        setError(data.error || 'Failed to register agent');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const message: AgentMessage = {
        id: `msg-${Date.now()}`,
        from: newMessage.from,
        to: newMessage.to,
        type: newMessage.type,
        payload: {
          action: newMessage.action,
          data: newMessage.data ? JSON.parse(newMessage.data) : {},
        },
        timestamp: new Date().toISOString(),
      };

      const response = await fetch('/api/agents/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });

      const data = await response.json();

      if (data.success) {
        setNewMessage({ from: '', to: '', type: 'request', action: '', data: '' });
        // Optionally refresh messages
        if (newMessage.from) {
          await loadMessages(newMessage.from);
        }
      } else {
        setError(data.error || 'Failed to send message');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (agentId: string) => {
    try {
      const response = await fetch(`/api/agents/message?agentId=${agentId}&limit=50`);
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Agent Communication Dashboard</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Register Agent */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Register New Agent</h2>
          <form onSubmit={registerAgent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Agent ID *</label>
              <input
                type="text"
                value={newAgent.id}
                onChange={(e) => setNewAgent({ ...newAgent, id: e.target.value })}
                required
                placeholder="e.g., github-agent"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Agent Name *</label>
              <input
                type="text"
                value={newAgent.name}
                onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                required
                placeholder="e.g., GitHub Integration"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Capabilities (comma-separated) *
              </label>
              <input
                type="text"
                value={newAgent.capabilities}
                onChange={(e) =>
                  setNewAgent({ ...newAgent, capabilities: e.target.value })
                }
                required
                placeholder="e.g., pull-requests, issues, deployments"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              Register Agent
            </button>
          </form>
        </div>

        {/* Send Message */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Send Message</h2>
          <form onSubmit={sendMessage} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">From Agent *</label>
              <select
                value={newMessage.from}
                onChange={(e) => setNewMessage({ ...newMessage, from: e.target.value })}
                required
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select agent...</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">To Agent *</label>
              <input
                type="text"
                value={newMessage.to}
                onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
                required
                placeholder="Agent ID or 'broadcast'"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message Type *</label>
              <select
                value={newMessage.type}
                onChange={(e) =>
                  setNewMessage({
                    ...newMessage,
                    type: e.target.value as any,
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="request">Request</option>
                <option value="response">Response</option>
                <option value="event">Event</option>
                <option value="command">Command</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Action *</label>
              <input
                type="text"
                value={newMessage.action}
                onChange={(e) => setNewMessage({ ...newMessage, action: e.target.value })}
                required
                placeholder="e.g., deploy, create-pr, notify"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Data (JSON, optional)
              </label>
              <textarea
                value={newMessage.data}
                onChange={(e) => setNewMessage({ ...newMessage, data: e.target.value })}
                placeholder='{"key": "value"}'
                rows={3}
                className="w-full px-3 py-2 border rounded-md font-mono text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Registered Agents */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Registered Agents ({agents.length})</h2>
          <button
            onClick={loadAgents}
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            Refresh
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div key={agent.id} className="p-4 border rounded-md">
              <h3 className="font-semibold">{agent.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{agent.id}</p>
              <div className="flex flex-wrap gap-1">
                {agent.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                  >
                    {cap}
                  </span>
                ))}
              </div>
              <button
                onClick={() => loadMessages(agent.id)}
                className="mt-3 text-sm text-blue-600 hover:text-blue-700"
              >
                View Messages
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      {messages.length > 0 && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Messages ({messages.length})</h2>
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="p-4 border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{msg.from}</span>
                    <span className="text-gray-400">→</span>
                    <span className="font-semibold">{msg.to}</span>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      msg.type === 'request'
                        ? 'bg-yellow-100 text-yellow-800'
                        : msg.type === 'response'
                        ? 'bg-green-100 text-green-800'
                        : msg.type === 'event'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {msg.type}
                  </span>
                </div>
                <pre className="text-sm bg-gray-50 p-2 rounded overflow-x-auto">
                  {JSON.stringify(msg.payload, null, 2)}
                </pre>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(msg.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
