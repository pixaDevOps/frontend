const FilterSection = ({ title, children }) => (
  <div className="mb-4">
    <h4 className="text-sm font-bold mb-2">{title}</h4>
    {children}
  </div>
);

export default FilterSection;
