"use client";

import { useEffect, useState } from "react";

export default function LoadingMessage() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!showMessage) return null;

  return (
    <div className="text-center p-4">
      <p className="text-lg font-semibold">
        🚀 Backend is waking up...
      </p>

      <p className="text-sm text-gray-500 mt-2">
        First request may take around 30–50 seconds because the free server sleeps.
      </p>
    </div>
  );
}
