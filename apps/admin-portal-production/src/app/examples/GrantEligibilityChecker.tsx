'use client';

import { useState } from 'react';

/**
 * Example React component for Grant Eligibility Checker
 *
 * This demonstrates how to use the AI workflows from the frontend.
 * You can import and use this in your pages.
 */

interface GrantApplication {
  applicantName: string;
  organizationType: string;
  location: string;
  revenue?: number;
  projectDescription: string;
  fundingAmount: number;
  purpose: string;
}

interface EligibilityResult {
  eligible: boolean;
  score: number;
  reasoning: string;
  matchedCriteria: string[];
  concerns: string[];
  recommendations: string[];
  grantSuggestions?: Array<{
    name: string;
    matchScore: number;
    reason: string;
  }>;
}

export default function GrantEligibilityChecker() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<GrantApplication>({
    applicantName: '',
    organizationType: 'nonprofit',
    location: '',
    revenue: undefined,
    projectDescription: '',
    fundingAmount: 0,
    purpose: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/workflows/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflowId: 'grant-eligibility',
          input: formData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || 'Failed to check eligibility');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'fundingAmount' || name === 'revenue'
        ? value ? parseFloat(value) : undefined
        : value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Grant Eligibility Checker</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-2">
            Organization Name *
          </label>
          <input
            type="text"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Organization Type *
          </label>
          <select
            name="organizationType"
            value={formData.organizationType}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="nonprofit">Nonprofit</option>
            <option value="for-profit">For-Profit</option>
            <option value="government">Government</option>
            <option value="educational">Educational</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            placeholder="e.g., New Orleans, LA"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Annual Revenue (optional)
          </label>
          <input
            type="number"
            name="revenue"
            value={formData.revenue || ''}
            onChange={handleInputChange}
            placeholder="e.g., 150000"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Project Description *
          </label>
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleInputChange}
            required
            rows={4}
            placeholder="Describe your project in detail..."
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Funding Amount Requested *
          </label>
          <input
            type="number"
            name="fundingAmount"
            value={formData.fundingAmount || ''}
            onChange={handleInputChange}
            required
            placeholder="e.g., 50000"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Purpose *
          </label>
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            required
            placeholder="e.g., healthcare, education, community development"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Check Eligibility'}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Eligibility Result</h2>
            <div className="flex items-center gap-4">
              <span
                className={`px-4 py-2 rounded-full font-semibold ${
                  result.eligible
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {result.eligible ? '✓ Eligible' : '✗ Not Eligible'}
              </span>
              <span className="text-3xl font-bold text-blue-600">
                {result.score}/100
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Reasoning</h3>
            <p className="text-gray-700">{result.reasoning}</p>
          </div>

          {result.matchedCriteria.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Matched Criteria</h3>
              <ul className="list-disc list-inside space-y-1">
                {result.matchedCriteria.map((criteria, i) => (
                  <li key={i} className="text-green-700">
                    {criteria}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.concerns.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Concerns</h3>
              <ul className="list-disc list-inside space-y-1">
                {result.concerns.map((concern, i) => (
                  <li key={i} className="text-red-700">
                    {concern}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
              <ul className="list-disc list-inside space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-gray-700">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.grantSuggestions && result.grantSuggestions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Suggested Grants</h3>
              <div className="space-y-3">
                {result.grantSuggestions.map((grant, i) => (
                  <div key={i} className="p-4 bg-blue-50 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{grant.name}</h4>
                      <span className="text-blue-600 font-semibold">
                        {grant.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{grant.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
