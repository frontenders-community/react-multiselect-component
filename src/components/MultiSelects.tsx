import React, { useEffect, useRef, useState } from "react";
import style from "./MultiSelect.module.css";

interface MultiSelectSimpleProps {
  options: string[];
  onChange: (selectedOptions: string[]) => void;
  value?: string[];
}

const MultiSelect: React.FC<MultiSelectSimpleProps> = ({
  options,
  onChange,
  value = [],
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value);

  const multiSelectRef = useRef<HTMLDivElement>(null);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const toggleOption = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  useEffect(() => {
    setSelectedOptions(value);
  }, [value]);

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
            <label key={item} className={style.option} htmlFor={item}>
              <input
                id={item}
                type="checkbox"
                value={item}
                checked={selectedOptions.includes(item)}
                onChange={() => toggleOption(item)}
              />
              {item}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
