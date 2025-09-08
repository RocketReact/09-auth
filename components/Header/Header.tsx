"use client";
import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "@/components/TagsMenu/TagsMenu";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";
import { useAuthStore } from "@/lib/store/authStore";
export default function Header() {
  const { isAuthenticated } = useAuthStore();
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>

      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          {isAuthenticated && <TagsMenu />}
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}
