import { useRouteError } from "react-router-dom";
import React, { useEffect } from "react";

export default function ErrorPage() {
  const error = useRouteError();
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-secondarylight">
      <h1 className="text-6xl font-bold text-primary">Error</h1>
      <div className="flex flex-row">
        <h1 className="text-base text-primary">
          {error.status} {error.statusText}
        </h1>
      </div>
    </div>
  );
}
