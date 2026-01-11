interface Option {
  value: string;
  label: string;
}

interface Props {
  id: string;
  label: string; // this will show as the placeholder text
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
}

const SelectField: React.FC<Props> = ({
  id,
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <label
      htmlFor={id}
      className="has-triangle relative mr-2 inline-block leading-5"
    >
      <span className="sr-only">{label}</span>

      <select
        id={id}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="block min-w-30 cursor-pointer appearance-none border-b border-white bg-transparent text-center text-[12px] text-slate-400 backdrop-blur-md outline-none focus:outline-none lg:min-w-80 lg:text-lg"
      >
        <option value="" disabled hidden>
          {label}
        </option>

        {options.map((opt) => (
          <option key={opt.value + Math.random()} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectField;
