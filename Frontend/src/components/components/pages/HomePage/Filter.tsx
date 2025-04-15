import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Category, HelpStatus } from "@/types/enums";

function Filter() {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-end w-full mb-3 mb:mb-0">
      {/* Sort */}
      <div className="flex gap-2">
        <Label htmlFor="sort-select">Sort</Label>
        <Select defaultValue="desc">
          <SelectTrigger id="sort-select">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Created Desc</SelectItem>
            <SelectItem value="asc">Created Asc</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category */}
      <div className="flex gap-2">
        <Label htmlFor="category-select">Category</Label>
        <Select defaultValue="ALL">
          <SelectTrigger id="category-select">
            <SelectValue placeholder="Category" />
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
      <div className="flex gap-2">
        <Label htmlFor="status-select">Status</Label>
        <Select defaultValue="ALL">
          <SelectTrigger id="status-select">
            <SelectValue placeholder="Status" />
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
