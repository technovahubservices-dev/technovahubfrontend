import React from "react";

const Title = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1
       className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 text-transparent bg-clip-text mb-4 drop-shadow-md"
      >
        {text}
      </h1>
    </div>
  );
};

export default Title;
