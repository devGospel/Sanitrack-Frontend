import React from "react";

const Input = ({
  name,
  type,
  placeholder,
  className,
  register,
  errors,
  defaultValue,
  label,
}) => {
  return (
    <div className="text-black w-full flex flex-col items-start">
      {label && (
        <label className="text-gray-500 dark:text-white py-2">{label}</label>
      )}
      <div className="relative w-full">
        <input
          id={name}
          type={type ? type : "text"}
          defaultValue={defaultValue ?? ""}
          placeholder={placeholder ?? name}
          className={
            "border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none bg-white text-black dark:bg-black dark:text-white focus:border-slate-400  " +
            className
          }
          name={name}
          {...register(name, {
            required: `${name} is required`,
          })}
        />
        {errors && errors[name]?.type === "required" && (
          <span className="text-xs text-red-500 ease-out duration-1500 transition-all capitalize">
            {errors?.[name]?.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
