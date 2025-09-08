import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchServerNoteById } from "@/lib/api/serverApi";
import { dehydrate } from "@tanstack/query-core";
import NotePreviewClient from "@/app/@modal/(.)notes/[id]/NotePreview.client";

interface NotePreviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreviewPage({
  params,
}: NotePreviewPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchServerNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}
