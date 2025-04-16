import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Category, HelpStatus } from "@/types/enums";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (key: string, value: string, defaultValue: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value === defaultValue) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    setSearchParams(newParams);
  };

  const sortValue = searchParams.get("sort") || "desc";
  const categoryValue = searchParams.get("category") || "ALL";
  const statusValue = searchParams.get("status") || "ALL";

  return (
    <div className="flex flex-wrap gap-4 items-center justify-end w-full mb-3 mb:mb-0">
      {/* Sort */}
      <div className="flex gap-2 items-center">
        <Label htmlFor="sort-select" className="py-3 pl-3 cursor-pointer">
          Sort
        </Label>
        <Select
          value={sortValue}
          onValueChange={(value) => handleChange("sort", value, "desc")}
        >
          <SelectTrigger id="sort-select" className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Created Desc</SelectItem>
            <SelectItem value="asc">Created Asc</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category */}
      <div className="flex gap-2 items-center">
        <Label htmlFor="category-select" className="py-3 pl-3  cursor-pointer">
          Category
        </Label>
        <Select
          value={categoryValue}
          onValueChange={(value) => handleChange("category", value, "ALL")}
        >
          <SelectTrigger id="category-select" className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-80">
            <SelectItem value="ALL">All</SelectItem>
            {Object.values(Category).map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className="flex gap-2 items-center">
        <Label htmlFor="status-select" className="py-3 pl-3  cursor-pointer">
          Status
        </Label>
        <Select
          value={statusValue}
          onValueChange={(value) => handleChange("status", value, "ALL")}
        >
          <SelectTrigger id="status-select" className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            {Object.values(HelpStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default Filter;
