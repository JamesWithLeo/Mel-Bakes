export default function Notify({ text }: { text: string }) {
  return (
    <h1 className="gap-1 rounded bg-primary px-1 font-[Raleway] text-xs font-bold text-white">
      {text}!
    </h1>
  );
}
