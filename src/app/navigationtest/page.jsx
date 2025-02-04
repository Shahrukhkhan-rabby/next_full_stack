"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const NavigationTestPage = () => {
  return (
    <div>
      <h1>Navigation Test Page</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <NavigationTestContent />
      </Suspense>
    </div>
  );
};

const NavigationTestContent = () => {
  const searchParams = useSearchParams(); // ✅ Now inside Suspense
  return <p>Search Params: {searchParams.toString()}</p>;
};

export default NavigationTestPage;
