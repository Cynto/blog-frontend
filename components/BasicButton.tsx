import React from 'react';

const BasicButton = ({ text }: { text: string }) => {
  return (
    <button className="group dark:bg-white border-[1px] border-slate-900 dark:border-0 rounded px-4 py-1 text-slate-900 font-bold">
      <span className="relative group-hover:after:scale-x-100 group-hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
        {text}
      </span>
    </button>
  );
};

export default BasicButton;
