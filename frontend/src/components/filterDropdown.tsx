import "./filterDropdown.css";

interface DropdownProps {
  options: string[];
}

export default function FilterDropdown({ options }: DropdownProps) {
  return (
    <div className="filter-dropdown">
      <select name="filter-select">
        <option value="">Filter</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
