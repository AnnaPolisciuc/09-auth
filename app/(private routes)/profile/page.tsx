
import Link from "next/link";
import { Metadata } from "next";
import css from "./ProfilePage.module.css";
import Image from 'next/image';
import { getMe } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: 'My profile - NoteHub',
  description:
    "Sorry, the page you're looking for doesn’t exist. Go back to the NoteHub homepage.",
  openGraph: {
    title: 'Page Not Found — NoteHub',
    description:
      "NoteHub is a simple and efficient application designed for managing personal notes.",
    url: "https://9-auth-beige.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub — My profile",
      },
    ],
  },
};

export default async function Profile() {
  const user = await getMe();

    return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}

