import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { Input } from "../ui/input";

export const SearchInputForm = ({ searchString, setSearchString }) => {
  return (
    <Field
      orientation="horizontal"
      className="w-full bg-white rounded-full p-2 h-15"
    >
      <Input
        type="text"
        placeholder="Vị trí tuyển dụng, tên công ty"
        className="border-none focus-visible:ring-0"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <div className="h-7 w-px mx-1 bg-border"></div>
      <Button className="text-white px-5 h-11 flex items-center gap-1 rounded-full bg-primary text-sm">
        <i className="fa-solid fa-magnifying-glass"></i>
        Tìm kiếm
      </Button>
    </Field>
  );
};
