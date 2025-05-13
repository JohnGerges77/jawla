'use client';
import React, { useEffect, useState } from 'react';
import { fetchHelpIssues } from '../DashboardApis/HelpApi';

function Help() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getIssues = async () => {
      try {
        const data = await fetchHelpIssues();
        setIssues(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getIssues();
  }, []);

  return (
    <div className="text-white p-5">
      <h1 className="text-2xl font-bold mb-4">Help Issues</h1>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : issues.length > 0 ? (
        <ul className="space-y-4">
          {issues.map((issue) => (
            <li key={issue.id} className="bg-gray-800 p-4 rounded-lg shadow">
              <p className="text-lg font-semibold">{issue.description}</p>
              <p className="text-sm text-gray-400">{issue.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No help issues found.</p>
      )}
    </div>
  );
}

export default Help;
