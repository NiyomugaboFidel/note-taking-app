import { InputProps } from "@/types/inputPropType";

const Input: React.FC<InputProps> = ({
    label,
    id,
    htmlFor,
    onChange,
    value,
    placeholder,
    type,
    className
  }) => {
    return (
      <div className="mb-5">
        <label
          htmlFor={htmlFor}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <input
          type={type}
          id={id}
          className={`${className ? className :
              ' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
           }
          `}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          required
        />
      </div>
    );
  };
  
  export default Input;
  