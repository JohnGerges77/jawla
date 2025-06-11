'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServicesFormInputs from '../_components/ServicesFormInputs';
import { getProfile, updateProfile, updatePassword } from '../servicesApi/ProfileApi';
import Link from 'next/link';

function Page() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    oldpassword: '',
    newpassword: ''
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getProfile();
        setFormData(prev => ({
          ...prev,
          username: userData.username || '',
          email: userData.email || '',
          phone: userData.phone || ''
        }));
      } catch (error) {
        console.error(" Error fetching profile:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      toast.success("Profile updated successfully!");
      setTimeout(() => router.push('/Profile'), 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
  
    if (!formData.oldpassword.trim() || !formData.newpassword.trim()) {
      toast.error("Both current and new passwords are required.");
      return;
    }
  
    try {
      await updatePassword(formData);
      toast.success("Password updated successfully!");
      setFormData(prev => ({ ...prev, oldpassword: '', newpassword: '' }));
    } catch (error) {
      console.error(" Error updating password:", error.response?.data || error.message);
      if (error.response?.data?.errors === "Invalid Password") {
        toast.error("The current password is incorrect. Please try again.");
      } else {
        toast.error(error.response?.data?.errors || "Failed to update password.");
      }
    }
  };

  if (loading) return <p className="text-center text-white">Loading profile...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-gradient-to-br from-[#0c1f47] to-[#161132]  shadow-2xl p-6 sm:p-8 w-full max-w-[800px] rounded-lg">
        <h1 className="text-2xl font-bold text-[#F2CD7E] mb-4 text-center">Settings</h1>

        
        <form className="mt-4" onSubmit={handleUpdateProfile}>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            <ServicesFormInputs label="Username" type="text" name="username" value={formData.username} onChange={handleChange} />
            <ServicesFormInputs label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
            <ServicesFormInputs label="Phone Number" type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <button type="submit" className="w-full md:w-[60%] text-xl font-bold bg-white text-[#1E2D4B] py-2 rounded-lg mt-4 mx-auto block">Save Profile</button>
        </form>

   
        <form className="mt-6" onSubmit={handleUpdatePassword}>
          <h2 className="text-xl font-bold text-[#F2CD7E] mb-4 text-center">Change Password</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            <ServicesFormInputs label="Current Password" type="password" name="oldpassword" value={formData.oldpassword} onChange={handleChange} />
            <ServicesFormInputs label="New Password" type="password" name="newpassword" value={formData.newpassword} onChange={handleChange} />
          </div>
          <button type="submit" className="w-full md:w-[60%] text-xl font-bold bg-white text-[#1E2D4B] py-2 rounded-lg mt-4 mx-auto block">Change Password</button>
        </form>

 
        <div className="mt-6 text-center">
          <Link href='/DeleteAccount'>
            <button className="w-full md:w-[60%] text-xl font-bold bg-red-600 text-white py-2 rounded-lg mx-auto block">Delete Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
