import { Metadata } from "next";

export const metadata: Metadata = {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
  }

export default function NotFound() {
    return (
       <div className="flex min-h-screen items-center justify-center bg-screenWhite font-body">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start gap-4 py-32 px-16 bg-screenWhite sm:items-start">
            <h1 className="font-title text-3xl font-bold border-b border-white">404 - Page Not Found</h1>
            <p className="font-subtitle text-sm text-gray-500">The page you are looking for does not exist.</p>
        </main>
       </div>
    );
}