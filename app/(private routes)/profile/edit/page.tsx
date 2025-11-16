"use client";

import { useAuthStore } from '@/lib/store/authStore';
import css from './EditProfilePage.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { updateMe } from '@/lib/api/clientApi';
import Image from 'next/image';

export default function EditProfile() {

  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  const [username, setUsername] = useState(user?.username || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const updateUser = await updateMe({ username });
      setUser(updateUser);
      router.push("/profile");
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const handleCancel = () => {
    router.push("/profile");
  };
  
  if (!user) return <p>Loading...</p>;

  return (
    <main className={css.mainContent}>
    <div className={css.profileCard}>
      <h1 className={css.formTitle}>Edit Profile</h1>
  
      <Image
        src={user.avatar}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
  
      <form className={css.profileInfo} onSubmit={handleSave}>
        <div className={css.usernameWrapper}>
          <label htmlFor="username">Username:</label>
          <input id="username"
            type="text"
            className={css.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
  
        <p>Email: {user.email}</p>
        {error && <p className={css.error}>Failed to update username.</p>}
  
        <div className={css.actions}>
          <button type="submit" className={css.saveButton} disabled={loading}>
            Save
          </button>
          <button type="button" className={css.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  </main>
  
  );
}
