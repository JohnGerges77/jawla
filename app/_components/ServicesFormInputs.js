"use client";


function ServicesFormInputs({ label, type, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-[#F2CD7E] mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded bg-[#1E2D4B] text-white outline-none border-[1px] border-[#F2CD7E]"
        required
      />
    </div>
  );
}

export default ServicesFormInputs;