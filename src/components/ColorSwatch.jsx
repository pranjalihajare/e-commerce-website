const ColorSwatch = ({ color, onHover, onClick, selected }) => {
    return (
      <div
        onMouseEnter={onHover}
        onClick={onClick}
        className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
          selected ? 'border-black' : 'border-transparent'
        }`}
        style={{ backgroundColor: color }}
      ></div>
    );
  };
  
  export default ColorSwatch;
  