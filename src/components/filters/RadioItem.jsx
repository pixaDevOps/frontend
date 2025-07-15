const RadioItem = ({ name, value, label, selected, onChange }) => (
  <label className="flex items-center gap-2 mb-2 cursor-pointer">
    <input
      type="radio"
      name={name}
      value={value}
      checked={selected === value}
      onChange={() => onChange(value)}
    />
    <span>{label}</span>
  </label>
);

export default RadioItem;
