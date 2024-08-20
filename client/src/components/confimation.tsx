import {
  faCircleQuestion,
  faInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Confimation({
  closeModal,
  onConfirm,
  title,
  context,
  withInputBox,
  label,
  icon,
  children,
}: {
  closeModal: () => void;
  onConfirm: (value: string) => void;
  title: string;
  context?: string;
  withInputBox?: boolean;
  label: string;
  icon: "danger" | "question" | "info";
  children?: JSX.Element;
}) {
  return (
    <>
      <div className="fixed z-20 h-dvh w-full bg-primary opacity-70" />
      <main className="fixed left-1/2 top-1/2 z-20 flex w-11/12 max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col gap-8 rounded-2xl bg-white px-8 pb-8 pt-10 sm:w-full">
        <span className="flex flex-col gap-2 text-xl text-darker lg:text-2xl">
          <span className="flex items-center gap-2 font-medium text-darker">
            <h1 className="">{title}</h1>
            {icon === "question" ? (
              <FontAwesomeIcon
                icon={faCircleQuestion}
                className="text-primarylight"
              />
            ) : null}
            {icon === "info" ? (
              <FontAwesomeIcon icon={faInfo} className="text-primarylight" />
            ) : null}
            {icon === "danger" ? (
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="text-red-400 shadow-red-400"
              />
            ) : null}
          </span>
          <h1 className="font-redhat text-sm text-gray-700">{context}</h1>
        </span>
        {children ? (
          children
        ) : (
          <>
            {withInputBox ? (
              <span className="flex flex-col gap-2">
                <label className="font-redhat text-xs text-gray-700">
                  {label}
                </label>
                <input
                  type="password"
                  id="inputBox"
                  required
                  className="h-10 rounded border-b-8 bg-gray-100 px-2 text-sm text-primary outline-none ring-primarylight focus:border-b-4 focus:ring focus:ring-primarylight"
                />
              </span>
            ) : null}
          </>
        )}

        <span className="flex justify-end gap-4">
          <button
            className="rounded px-2 py-1 shadow active:ring"
            onClick={closeModal}
          >
            cancel
          </button>
          <button
            className="rounded bg-red-400 px-2 py-1 text-white shadow ring-red-200 active:ring"
            onClick={() => {
              const inputBox = document.getElementById(
                "inputBox",
              ) as HTMLInputElement;
              if (inputBox.value) onConfirm(inputBox.value);
            }}
          >
            confirm
          </button>
        </span>
      </main>
    </>
  );
}
