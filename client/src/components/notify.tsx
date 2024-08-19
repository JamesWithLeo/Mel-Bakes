export default function Notify({
  text,
  type,
}: {
  text: string;
  type: "danger" | "information";
}) {
  const style =
    type === "information"
      ? "gap-1 rounded bg-primary px-1 font-[Raleway] text-xs font-bold text-white px-2 py-1"
      : "gap-1 rounded bg-red-400 px-1 font-[Raleway] text-xs font-bold text-white px-2 py-1";
  return <h1 className={style}>{text}</h1>;
}
