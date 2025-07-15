import React from "react";
import FilterSection from "./FilterSection";
import RadioItem from "./RadioItem";
import CheckboxItem from "./CheckboxItem";

const FilterPanel = ({ filters, onFilterChange }) => {
  const handleCheckbox = (key, value) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange(key, updated);
  };

  const handleRadio = (key, value) => {
    onFilterChange(key, value);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-xs">
      <FilterSection title="Date">
        {["24hrs", "30days", "6months", "1years"].map((val) => (
          <RadioItem
            key={val}
            name="date"
            label={`Last ${val}`}
            value={val}
            selected={filters.date}
            onChange={(val) => handleRadio("date", val)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Product">
        {["In-stock", "Out of stock"].map((val) => (
          <CheckboxItem
            key={val}
            label={val}
            value={val}
            checked={filters.product?.includes(val)}
            onChange={(val) => handleCheckbox("product", val)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Price">
        {["Below 100>", "Above 500<"].map((val) => (
          <CheckboxItem
            key={val}
            label={val}
            value={val}
            checked={filters.price?.includes(val)}
            onChange={(val) => handleCheckbox("price", val)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Stock">
        {["Below 10>", "Above 200<"].map((val) => (
          <CheckboxItem
            key={val}
            label={val}
            value={val}
            checked={filters.stock?.includes(val)}
            onChange={(val) => handleCheckbox("stock", val)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Category">
        {["Personal care", "Food product", "Crystals"].map((val) => (
          <CheckboxItem
            key={val}
            label={val}
            value={val}
            checked={filters.category?.includes(val)}
            onChange={(val) => handleCheckbox("category", val)}
          />
        ))}
      </FilterSection>
    </div>
  );
};

export default FilterPanel;
