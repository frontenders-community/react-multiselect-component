import React, { useEffect, useRef, useState } from "react";
import style from "./MultiSelect.module.css";

interface MultiSelectSimpleProps<T> {
  options: T[];
  onChange: (selectedOptions: T[]) => void;
  value: T[];
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string | number;
}

const MultiSelect = <T,>({
  options,
  onChange,
  value,
  getOptionLabel,
  getOptionValue
}: MultiSelectSimpleProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const multiSelectRef = useRef<HTMLDivElement>(null);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const toggleOption = (option: T) => {
    const optionValue = getOptionValue(option);
    const updatedOptions = value.some(selectedOption => optionValue === getOptionValue(selectedOption))
      ? value.filter((selectedOption) => getOptionValue(selectedOption) !== optionValue)
      : [...value, option];
    onChange(updatedOptions);
  };


  const handleClickOutside = (event: MouseEvent): void => {
    if (!multiSelectRef.current?.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={style.multiselect} ref={multiSelectRef}>
      {/* Select trigger */}
      <div className={style.selectTrigger} onClick={toggleSelect}>
        <span>Seleziona una opzione</span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="16"
            height="16"
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </span>
      </div>

      {/* Options */}
      {isOpen && (
        <div className={style.selectOptions}>
          {options.map((item) => (
            <label key={getOptionValue(item).toString()} className={style.option} htmlFor={getOptionValue(item).toString()}>
              <input
                id={getOptionValue(item).toString()}
                type="checkbox"
                value={getOptionValue(item)}
                checked={value.some((selectedOption) => getOptionValue(selectedOption) === getOptionValue(item))}
                onChange={() => toggleOption(item)}
              />
              {getOptionValue(item).toString()}  {getOptionLabel(item)}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
