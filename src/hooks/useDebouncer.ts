import { useEffect, useState } from "react";

export const useDebouncer = (input: string) => {
  const [debouncedText, setDebouncedText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedText(input);
    }, 500);

    return () => {
      console.log("out");
      clearTimeout(timeout);
    };
  }, [input]);

  return { debouncedText };
};
