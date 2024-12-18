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
          <label className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">{ label}</label>
          <input onChange={onChange} type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={placeholder} />
    </div>
  )
}

export default InputBox