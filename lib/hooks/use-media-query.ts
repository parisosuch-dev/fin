import { useEffect, useState } from "react";

interface UseMediaQueryProps {
  query: string;
}

const useMediaQuery = ({ query }: UseMediaQueryProps) => {
  // State to store the result of the media query
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Create a MediaQueryList object
      const mediaQueryList = window.matchMedia(query);

      // Update the state with the initial media query result
      setMatches(mediaQueryList.matches);

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
    }
  }, [query]);

  return matches;
};

export default useMediaQuery;
