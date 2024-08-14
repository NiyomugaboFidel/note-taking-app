import { ButtonProps } from "@/types/inputPropType"

const Button:React.FC<ButtonProps> = ({
   label,
   value,
   className,
   type,
   disabled
}) => {
  return (

          <button
           value={value} 
           type={type} 
           disabled ={disabled}
           className={className 
            ? className : 'font-semibold bg-black mt-[20px] cursor-pointer border border-gray-300 text-white text-sm rounded-lg block w-full p-2.5' }>
            {label}
         </button>  
  )
}
export default Button