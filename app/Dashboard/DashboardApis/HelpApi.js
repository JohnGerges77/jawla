import axios from 'axios';

export const fetchHelpIssues = async () => {
  try {
    const response = await axios.get('https://aldeeb.runasp.net/api/HelpIssue');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch help issues');
  }
};
