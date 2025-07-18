import { ChangeEvent } from "react"

interface InputProps{
    label: string,
    placeholder: string,
    type: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputBox = ({label, placeholder, type, onChange}:InputProps) => {
  return (
      <div className="p-2">
          <label className="block mb-2 text-lg font-bold text-black">{ label}</label>
          <input onChange={onChange} type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg
              block w-full p-2.5 
              "
              placeholder={placeholder} />
    </div>
  )
}

export default InputBox