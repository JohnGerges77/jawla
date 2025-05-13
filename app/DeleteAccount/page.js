'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { deleteProfile } from '../servicesApi/ProfileApi';

function Page() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      toast.error('Please enter your password to delete your account.');
      return;
    }

    try {
      await deleteProfile(password);
      toast.success('Account deleted successfully!');
      setTimeout(() => router.push('/LogIn'), 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center bg-[#F2CD7E] h-[90vh]'>
      <div className="w-fit h-fit py-[3em] px-[3em] bg-primary text-white rounded-lg">
        <h2 className="w-full text-center text-[1.3em] font-bold text-[#F2CD7E] mb-4">Delete The Account</h2>
        <div>
          <span className="text-xl font-bold block">Are you sure you want to delete your account?</span>
          <span className="max-w-[30em] block mt-[1em]">
            Deleting your account will permanently remove all of your content and data associated with your account.
          </span>
        </div>
        <form className="mt-[1em]" onSubmit={handleDelete}>
          <label className="block text-[#F2CD7E] mb-2">Confirm Password</label>
          <input
            type="password"
            className="w-[70%] p-2 rounded bg-[#1E2D4B] text-white block mx-auto mt-[1em] outline-none border-[1px] border-[#F2CD7E]"
            required
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-[10em] text-[1em] block mx-auto font-bold text-[white] bg-red-600 text-center py-2 rounded-lg mt-[1em]"
          >
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
