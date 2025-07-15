const CheckboxItem = ({ label, value, checked, onChange }) => (
  <label className="flex items-center gap-2 mb-1 cursor-pointer">
    <input
      type="checkbox"
      value={value}
      checked={checked}
      onChange={() => onChange(value)}
    />
    <span>{label}</span>
  </label>
);

export default CheckboxItem;
