import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
export default function LoadingPage() {
  return (
    <main className="flex h-full w-full items-center justify-center bg-transparent">
      <FontAwesomeIcon
        icon={faSpinner}
        className="animate-spin text-3xl text-primary"
      />
    </main>
  );
}
