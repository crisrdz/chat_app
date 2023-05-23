import { useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Select.css";

function Select({ options, hasMore, loadData, selectedOptionState, closeOptionsOnSelect = true }) {
  const [selectedOption, setSelectedOption] = selectedOptionState;
  const [page, setPage] = useState(2);

  const selectRef = useRef(null);
  const optionsRef = useRef(null);

  function handleToggleSelect() {
    selectRef.current.classList.toggle("select--show");
    optionsRef.current.classList.toggle("select__options--show");
  }

  return (
    <div className="modal__input select" ref={selectRef}>
      <div className="select__value--selected" onClick={handleToggleSelect}>
        {selectedOption?.label || "Selecciona una opción"}
        <AiFillCaretDown />
      </div>
      <InfiniteScroll
        dataLength={options.length}
        hasMore={hasMore}
        scrollableTarget="select-users"
        scrollThreshold={0}
        next={() => {
          loadData(page);
          setPage(prev => prev + 1);
        }}
      >
        <div className="select__options" id="select-users" ref={optionsRef}>
          {options.map((op) => (
            <div 
              onClick={() => {
                setSelectedOption(op);
                if(closeOptionsOnSelect) {
                  handleToggleSelect();
                }
              }} 
              className="select__value" key={op.value}
            >
              {op.label}
            </div>
          ))}
          </div>
      </InfiniteScroll>
    </div>
  );
}

export default Select;
