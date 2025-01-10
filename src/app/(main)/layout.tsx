"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools position="right" />
        <Toaster />
      </QueryClientProvider>
    </main>
  );
}
