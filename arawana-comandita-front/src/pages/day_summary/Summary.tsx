/* eslint-disable max-len */
import { useState } from "react";

interface DropdownState {
  [key: string]: {
    isShown: boolean;
  }
}

export const Summary = () => {
  const [showDate, setShowDate] = useState<DropdownState>({});

  const onDropdownClick = (id: string) => {
    setShowDate((prevState) => ({
      ...prevState,
      [id]: {
        isShown:!prevState[id]?.isShown && true,
      },
    }));
  };

  return (
    <section>
      <h1 className="w-full font-semibold text-4xl mb-10">
        Summaries
      </h1>
      {/* New component, needs an id in the click and className */}
      <div>
        <section className="my-3">
          <button onClick={() => onDropdownClick('firstChild')} className="w-full text-left pl-5 py-5 bg-gray-500 text-white font-semibold" >
            <h1> Dropdown </h1>
          </button>
          <div className={`${showDate['firstChild']?.isShown ? '' : 'hidden'} w-full bg-gray-200 p-10`} >
            <h1> Box </h1>
            <h1> Box </h1>
            <h1> Box </h1>
            <p> With more information </p>
          </div>
        </section>
        <section className="my-3">
          <button onClick={() => onDropdownClick('secondChild')} className="w-full text-left pl-5 py-5 bg-gray-500 text-white font-semibold" >
            <h1> Dropdown </h1>
          </button>
          <div className={`${showDate['secondChild']?.isShown ? '' : 'hidden'} w-full bg-gray-200 p-10`} >
            <h1> Box </h1>
            <h1> Box </h1>
            <h1> Box </h1>
            <p> With more information </p>
          </div>
        </section>
      </div>
    </section>
  );
};
