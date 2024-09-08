"use client";

import { useEffect, useState } from "react";

// Define the type for the hook's argument
interface UseMediaQueryProps {
  query: string;
}

const useMediaQuery = ({ query }: UseMediaQueryProps) => {
  // Initialize state with the result of the media query
  const [matches, setMatches] = useState<boolean>(
    window.matchMedia(query).matches
  );

  useEffect(() => {
    // Create a MediaQueryList object
    const mediaQueryList = window.matchMedia(query);

    // Define a callback function to update the state
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add a listener to handle changes
    mediaQueryList.addEventListener("change", handleChange);

    // Cleanup function to remove the listener
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
