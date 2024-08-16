export default function LoadingPage({ children }: { children: JSX.Element }) {
  return (
    <main className="flex h-full w-full items-center justify-center bg-transparent">
      {children}
    </main>
  );
}
