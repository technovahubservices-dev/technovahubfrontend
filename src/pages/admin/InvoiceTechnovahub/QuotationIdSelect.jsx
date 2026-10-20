import React, { useEffect, useId, useRef, useState } from "react";

const QuotationIdSelect = ({
  ids, value, onChange,
  includeAllOption = true,
  emptyMessage = "No quotation ID found",
  ariaLabel = "Filter by Quotation ID",
  inputClassName = "border border-gray-300 rounded-lg pl-3 pr-7 py-2 focus:ring-2 focus:ring-blue-400 w-full",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const listId = useId();
  const normalizedQuery = query.trim().toLowerCase();
  const matchingIds = [...new Set(ids.filter(Boolean))].filter((id) =>
    id.toLowerCase().includes(normalizedQuery)
  );
  const options = includeAllOption ? ["", ...matchingIds] : matchingIds;

  const close = () => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(-1);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
        setQuery("");
        setActiveIndex(-1);
      }
    };
    document.addEventListener("pointerdown", handleOutsideClick);
    return () => document.removeEventListener("pointerdown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (isOpen && activeIndex >= 0) {
      document.getElementById(`${listId}-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, isOpen, listId]);

  const select = (id) => {
    onChange(id);
    close();
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => event.key === "ArrowDown"
        ? Math.min(index + 1, options.length - 1)
        : index < 0 ? options.length - 1 : Math.max(index - 1, 0));
    } else if (event.key === "Enter" && isOpen) {
      event.preventDefault();
      const index = activeIndex >= 0 ? activeIndex : normalizedQuery && includeAllOption ? 1 : 0;
      if (index < options.length) select(options[index]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
    >
      <div className="relative">
        <input
          type="text"
          role="combobox"
          aria-label={ariaLabel}
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={isOpen && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
          autoComplete="off"
          value={isOpen ? query : value || (includeAllOption ? "All Quotations" : "")}
          placeholder="Search or select Quotation ID"
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(-1);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className={inputClassName}
        />
        <span aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-600">▼</span>
      </div>
      {isOpen && (
        <ul id={listId} role="listbox" aria-label="Quotation IDs" className="absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white py-1 text-gray-900 shadow-lg">
          {options.map((id, index) => (
            <li
              key={id}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={value === id}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => select(id)}
              className={`cursor-pointer px-3 py-2 hover:bg-blue-50 ${activeIndex === index ? "bg-blue-50" : ""}`}
            >
              {id || "All Quotations"}
            </li>
          ))}
          {matchingIds.length === 0 && (
            <li role="presentation" className="px-3 py-2 text-gray-500">{emptyMessage}</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default QuotationIdSelect;
