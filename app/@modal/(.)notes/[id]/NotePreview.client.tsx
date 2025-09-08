"use client";
import css from "./NotePreview.module.css";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import Modal from "@/components/Modal/Modal";

type NotePreviewClientProps = {
  id: string;
};

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleCloseModal = () => router.back();

  return (
    <Modal closeModal={handleCloseModal}>
      {note && (
        <div className={css.item}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footerPreviewModal}>
            <span className={css.tag}>{note.tag}</span>
            <p className={css.date}>{note.createdAt}</p>
          </div>
          <button className={css.backBtn} onClick={handleCloseModal}>
            Back
          </button>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Ops something went wrong... {error.message}</p>}
    </Modal>
  );
}
