import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function LoadingComponents() {
  return (
    <>
      <div className="fixed z-50 flex h-svh w-full items-center justify-center">
        <FontAwesomeIcon
          icon={faSpinner}
          className="animate-spin text-6xl text-primary"
        />
      </div>
    </>
  );
}
export default LoadingComponents;
