import React, { useState } from "react";
import { TfiPlus } from "react-icons/tfi";
import { RxCross1 } from "react-icons/rx";

const FAQ = [
  {
    id: 1,
    Question: "What is Netflix?",
    Answer: `Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!`,
  },
  {
    id: 2,
    Question: "How much does Netflix cost?",
    Answer: `Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts.`,
  },
  {
    id: 3,
    Question: "Where can I watch?",
    Answer: `Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. You can also download your favourite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.`,
  },
  {
    id: 4,
    Question: "How do I cancel?",
    Answer: `Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.`,
  },
  {
    id: 5,
    Question: "What can I watch on Netflix?",
    Answer: `Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.`,
  },
  {
    id: 6,
    Question: "Is Netflix good for kids?",
    Answer: `The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.`,
  },
];

const FaqList = () => {
  const [showAnswer, setShowAnswer] = useState(0);
  return (
    <div className="flex mx-auto flex-col pt-[4.5rem] mb-[2rem]">
      <div className="text-[3rem] font-extrabold flex mx-auto mb-[1.5rem]">
        Frequently Asked Questions
      </div>
      {FAQ.map((value, index) => {
        return (
          <div key={value.id}>
            <div
              className="w-[1082px] flex justify-between items-center p-[1.5rem] mx-auto gap-40 mb-[0.5rem] bg-[#2d2d2d] hover:bg-[rgb(65,65,65)] cursor-pointer"
              onClick={() => {
                setShowAnswer(showAnswer === value.id ? 0 : value.id);
              }}
            >
              <span className="text-[24px]">{value.Question}</span>
              <span>
                {showAnswer !== 0 && showAnswer === value.id ? (
                  <RxCross1 style={{ width: "30px", height: "30px" }} />
                ) : (
                  <TfiPlus style={{ width: "30px", height: "30px" }} />
                )}
              </span>
            </div>
            {showAnswer === value.id && showAnswer !== 0 && (
              <div className="w-[1082px] flex mx-auto bg-[#2d2d2d] relative bottom-[0.4rem] p-[1.5rem] text-[24px] answer-container">
                {value.Answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FaqList;
