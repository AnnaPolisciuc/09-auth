'use client';

import { useAuthStore } from "@/lib/store/authStore";
import css from "./EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { updateMe, uploadImage } from "@/lib/api/clientApi";
import Image from "next/image";
import { AxiosError } from "axios";

export default function EditProfile() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [username, setUsername] = useState(user?.username || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(user?.avatar || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) return <p>Loading...</p>;

  const MAX_SIZE = 2 * 1024 * 1024; // 2MB

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only images are allowed");
      return;
    }

    if (file.size > MAX_SIZE) {
      setError("Max file size 2MB");
      return;
    }

    setError(null);
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreview(null);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let uploadedUrl: string | undefined;

      if (imageFile) {
        uploadedUrl = await uploadImage(imageFile);
      }

      const updatedUser = await updateMe({
        username,
        avatar: uploadedUrl ?? preview ?? undefined,
      });

      setUser(updatedUser);
      router.push("/profile");
    } catch (err: unknown) {
      const error = err as AxiosError;
      console.error(error);
    
      if (error.response?.status === 413) {
        setError("File is too large for the server");
      } else if (error.response?.status === 404) {
        setError("Upload endpoint not found");
      } else {
        setError("Failed to save user");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => router.push("/profile");

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <div className={css.avatarWrapper}>
          {preview ? (
            <Image
              src={preview}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          ) : (
            <div className={css.avatarPlaceholder}>No Avatar</div>
          )}

          <label className={css.uploadLabel}>
            <span>{preview ? "Change photo" : "Upload photo"}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={css.uploadInput}
            />
          </label>

          {preview && (
            <button type="button" className={css.removeButton} onClick={handleRemoveImage}>
              Remove
            </button>
          )}
        </div>

        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <p>Email: {user.email}</p>

          {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button type="submit" className={css.saveButton} disabled={loading}>
              {loading ? "Saving..." : "Save"}
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
