import React from "react";
import ComprehesiveIcon from "./ui/ComprehesiveIcon";
import DataExplorationIcon from "./ui/DataExplorationIcon";
import ChartIcon from "./ui/ChartIcon";

const mainFeatures: Array<{
  icon: React.ReactElement;
  title: string;
  description: string;
}> = [
  {
    icon: <ComprehesiveIcon />,
    title: "Comprehensive Search Capabilities",
    description:
      "Easily find individuals or companies with a history of fraud and corruption using advanced keyword and filter systems.",
  },
  {
    icon: <DataExplorationIcon />,
    title: "Advanced Data Processing",
    description:
      "Leveraging OCR and NLP, Lexicon Beneficial Ownership processes and classifies vast amounts of information efficiently.",
  },
  {
    icon: <ChartIcon />,
    title: "Intuitive Visualization",
    description:
      "Lexicon Beneficial Ownership presents data in charts and other visualization methods, enabling users to quickly interpret and act on the information.",
  },
];

export default function MainFeatures(): React.ReactElement {
  return (
    <div className="py-2 sm:py-28 mt-10 sm:mt-16 px-2 sm:px-32 flex flex-col justify-center">
      <h1 className="text-[40px] font-semibold sm:text-center leading-[43.57px]">
        Leading the Way in Procurement Integrity
      </h1>
      <h3 className="text-textGrayBold text-sm sm:text-xl mt-2 font-normal sm:text-center mx-0 sm:mx-20">
        Revolutionizing procurement by offering unparalleled search
        capabilities, advanced data processing, and intuitive data
        visualization.
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 mt-6 sm:mt-11 gap-4">
        {mainFeatures.map((feature, index) => (
          <div
            key={index}
            className="py-6 px-4 border-gray20 border-1 rounded-lg"
          >
            {feature.icon}
            <h3 className="text-base font-bold mt-6">{feature.title}</h3>
            <p className="mt-3 text-sm text-textGrayBold font-normal">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
