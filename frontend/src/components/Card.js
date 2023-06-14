import React from "react";

const Cards = () => {
  return (
    <div className="w-full text-slate-800  absolute -top-52">
      <div className="flex justify-center space-x-10">
        <div className="px-10 p-5  rounded-md flex flex-col justify-center items-center shadow-inner bg-gray-50">
          <img src="/secure.png" className="w-20" />
          <div className="font-bold text-lg flex  justify-center items-cente">
            Empower Your
          </div>
          <div className="font-bold text-lg flex  justify-center items-cente">
            Security
          </div>
        </div>{" "}
        <div className="px-10 p-5  rounded-md flex flex-col justify-center items-center shadow-inner bg-gray-50">
          <img src="/target.png" className="w-20" />
          <div className="font-bold text-lg flex  justify-center items-cente ">
            Accurate Threat
          </div>
          <div className="font-bold text-lg flex  justify-center items-cente ">
            Analysis
          </div>
        </div>{" "}
        <div className="px-10 p-5  rounded-md flex flex-col justify-center items-center shadow-inner bg-gray-50">
          <img src="/money.png" className="w-20" />
          <div className="font-bold text-lg flex  justify-center items-cente">
            Cost-Effective
          </div>
        </div>
        <div className="px-10 p-5  rounded-md flex flex-col justify-center items-center shadow-inner bg-gray-50">
          <img src="/time.png" className="w-20" />
          <div className="font-bold text-lg flex  justify-center items-cente">
            Time-Saving
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
