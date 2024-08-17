import { useRouteError } from "react-router-dom";
import * as React from "react";
import { useEffect } from "react";

export default function ErrorPage() {
  const error = useRouteError() as Error;
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-secondarylight">
      <h1 className="text-6xl font-bold text-primary">Error</h1>
      <h1 className="text-center text-base text-primary">
        {error.name}: {error.message}
      </h1>
      <h1 className="text-center text-xs text-primary">
        please contact the{" "}
        <a href="https://www.facebook.com/JAMES.ocampoGI" className="underline">
          developer
        </a>
        .
      </h1>
      <button
        onClick={(e) => {
          e.currentTarget.style.cursor = "wait";
          e.currentTarget.disabled = true;
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        }}
        className="mt-2 rounded bg-white px-2 py-1 text-sm text-primary active:ring"
      >
        Refresh
      </button>
    </div>
  );
}
