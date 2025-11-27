export default function FormInput({ label, type = 'text', value, onChange, ...rest }){
  return (
    <div>
      <label>{label}</label>
      <input className="input" type={type} value={value} onChange={(e)=>onChange(e.target.value)} {...rest} />
    </div>
  );
}
