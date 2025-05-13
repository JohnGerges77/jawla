import axios from 'axios';

const API_BASE_URL = 'https://aldeeb.runasp.net/api/Profile';

export const getProfile = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(API_BASE_URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};


export const updateProfile = async (formData) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found. Please log in again.');
  }

  try {
    const response = await axios.put(
      `${API_BASE_URL}/update`,
      {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error.response?.data || error.message);
    throw new Error(error.response?.data?.title || 'Failed to update profile. Please try again.');
  }
};

// ✅ تحديث كلمة المرور
export const updatePassword = async (formData) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found. Please log in again.');
  }

  if (!formData.oldpassword.trim() || !formData.newpassword.trim()) {
    throw new Error('Both current and new passwords are required.');
  }

  try {
    const response = await axios.put(
      `${API_BASE_URL}/change-password`,
      {
        oldpassword: formData.oldpassword,
        newpassword: formData.newpassword
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating password:', error.response?.data || error.message);
    throw new Error(error.response?.data?.title || 'Failed to update password. Please try again.');
  }
};







export const deleteProfile = async (password) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found. Please log in again.');
  }

  if (!password || password.trim() === '') {
    throw new Error('Password is required to delete the account.');
  }

  try {
    const response = await axios.delete(`${API_BASE_URL}/delete`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // تأكد من ضبط نوع المحتوى
      },
      data: { password } // إرسال كلمة المرور في body
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting profile:', error.response?.data || error.message);
    throw new Error(error.response?.data?.errors || 'Failed to delete profile. Please try again.');
  }
};
