import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({
  value,
  onChange,
  options,
  placeholder = "Select",
  disabled = false,
  className = "",
  getOptionStyle,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`w-full px-4 py-2 text-sm rounded-full flex items-center justify-between ${
          error ? "border-red-500" : "border-gray-300"
        } border ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } ${getOptionStyle ? getOptionStyle(value) : "bg-white"} ${className}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span>{selectedOption?.label || placeholder}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-[70] w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  value === option.value ? "bg-gray-50" : ""
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
