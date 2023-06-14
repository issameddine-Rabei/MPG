import React from "react";
import Cards from "./Card";

const InfoSection = ({
  data: { imgUrl, reverse, paragraph, headline, class_, isFirst },
}) => {
  const className = reverse
    ? "max-w-screen-xl mx-auto flex space-x-7 items-center flex-row-reverse relative"
    : "max-w-screen-xl mx-auto flex space-x-7 items-center";

  const bg = reverse
    ? "bg-slate-800 text-white pt-28 "
    : "py-20 text-slate-800";

  return (
    <div className={bg}>
      <div className={className}>
        {isFirst && <Cards />}
        <div className="flex flex-col space-y-6 ">
          <h1 className="text-5xl font-extrabold">{headline} </h1>
          <p className="text-lg">{paragraph} </p>
        </div>
        <img src={imgUrl} alt="hero img" className={"h-96"} />
      </div>
    </div>
  );
};

export default InfoSection;
