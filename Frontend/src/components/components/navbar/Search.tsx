import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useNavigate, useLocation } from "react-router-dom";

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const debounced = useDebouncedCallback((query: string) => {
    if (query.length < 3) {
      if (location.pathname !== "/") {
        navigate("/", { replace: true });
      } else {
        navigate("?", { replace: true });
      }
    } else {
      if (location.pathname !== "/") {
        navigate(`/?search=${query}`, { replace: true });
      } else {
        navigate(`?search=${query}`, { replace: true });
      }
    }
  }, 500); // 0.5 second debounce for faster feel

  return (
    <Input
      type="text"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        debounced(e.target.value);
      }}
      placeholder="Type to search help"
    />
  );
}
