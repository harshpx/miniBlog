import React from 'react'

const Input = React.forwardRef(
   ({label, type = "text", className = "", ...props}, ref) => {
        const id = React.useId();
        return (
            <div className="flex flex-wrap justify-center w-full">
                {label && <label htmlFor={id} className="block">{label}</label>}

                <input type={type} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} ref={ref} id={id} {...props}/>
            </div>
        )
   }
)

export default Input;