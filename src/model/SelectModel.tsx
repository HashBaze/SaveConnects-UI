import React, {
  useState,
  useCallback,
  useRef,
  KeyboardEvent,
  MouseEvent,
} from "react";
import { useClickAway } from "react-use";
import { ICategory } from "../interface/Interface";

interface SelectModelProps {
  options: ICategory[];
  defaultCurrent?: number;
  placeholder?: string;
  className?: string;
  onChange: (item: ICategory, name: string) => void;
  name: string;
  setapiEndPoint: (categoryName: string) => void;
}

const SelectModel: React.FC<SelectModelProps> = ({
  options,
  placeholder,
  onChange,
  name,
  setapiEndPoint,
}) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<ICategory | null>(null);
  
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, onClose);

  const currentHandler = (item: ICategory) => {
    setCurrent(item);
    onChange(item, name);
    onClose();
    setapiEndPoint(item.name);
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      setOpen((prev) => !prev);
    }
  };

  const stopPropagation = (e: MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="relative block w-auto bg-gray-100 mt-1 px-4 py-3 rounded-md shadow-sm cursor-pointer transition-all duration-200 
      ease-in-out select-none whitespace-nowrap focus:outline-none focus:ring-navibluerelative block 
      w-auto bg-white mt-1 px-4 py-3 border border-gray-300 border-1 rounded-md shadow-sm cursor-pointer transition-all 
      duration-200 ease-in-out select-none whitespace-nowrap focus:outline-1 ring-naviblue border-naviblue"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      ref={ref}
    >
      <span className="mr-5 capitalize text-sm">
        {current?.name || placeholder}
      </span>

      <span
        className={`absolute right-4 top-1/2 pointer-events-none transition-transform duration-150 ease-in-out ${
          open ? "rotate-180 -mt-3" : "-mt-2"
        }`}
      >
        <img
          src="/icon/down.svg"
          alt="down"
          className="w-4 h-4"
          width={24}
          height={24}
        />
      </span>

      <ul
        className={`absolute left-0 top-full mt-1 p-0 bg-white shadow-sm rounded-md transform origin-top 
          transition-all duration-200 ease-out z-10 w-full list-none ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-75 pointer-events-none"
        }`}
        role="menubar"
        onClick={stopPropagation}
        onKeyPress={stopPropagation}
      >
        {options.length ? (
          options.map((item, index) => (
            <li
              key={index}
              data-value={index}
              className={`capitalize text-naviblue text-sm py-2 px-4 cursor-pointer transition-all duration-200 ${
                item.name === current?.name
                  ? "font-regular bg-gray-100"
                  : "hover:bg-gray-50"
              }`}
              role="menuitem"
              onClick={() => currentHandler(item)}
              onKeyPress={(e: KeyboardEvent<HTMLLIElement>) => {
                stopPropagation(e);
              }}
            >
              {item.name}
            </li>
          ))
        ) : (
          <li className="py-2 px-4 text-gray-500">No options available</li>
        )}
      </ul>
    </div>
  );
};

export default SelectModel;
