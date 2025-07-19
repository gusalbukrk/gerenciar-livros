interface LivroFormFieldProps {
  label: string;
  type: "text" | "number";
  name: string;
  minlength?: number;
  value: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

function LivroFormField({
  label,
  type,
  name,
  minlength,
  value,
  handleChange,
}: LivroFormFieldProps) {
  return (
    <div className="form-control mb-4">
      <label className="label mb-2">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        minLength={minlength}
        value={value}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />
    </div>
  );
}

export default LivroFormField;
