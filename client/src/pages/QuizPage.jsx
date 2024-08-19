import React from 'react'

export default function QuizPage() {
    let questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    let questionQ = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="grid grid-cols-12 h-lvh">
      <div className="col-span-9 grid grid-rows-12">
        {/* header */}
        <div className="row-span-1 bg-[#e7e7e7] font-bold text-lg text-center pt-2">
          Online Test
        </div>

        <div className="row-span-9">Question Number</div>
        <div className="row-span-2 bg-[#e7e7e7] flex flex-col justify-evenly">
          <div>hi</div>
          <div className="border-t-black border-2">hi</div>
        </div>
      </div>
      
          
      <div className="col-span-3 grid grid-rows-12 ">
        <div className="row-span-2 justify-center">
          <div className="bg-[#e7e7e7] text-center">Time Left</div>
          <div className=" text-center py-2">timer</div>
        </div>
        <div className="row-span-3">
          <div className="bg-[#e7e7e7] text-center">Quant</div>
          <div className="text-center py-2 grid grid-cols-6">
            {questions.map((question) => (
              <div
                key={question}
                className="bg-[#e9e9e9] m-1 rounded-tl-xl h-10 w-10 text-center pt-2 cursor-pointer hover:"
              >
                {question}{" "}
              </div>
            ))}
          </div>
        </div>
        <div className="row-span-7">
          <div className="bg-[#e7e7e7] text-center">Verbal</div>
          <div className="text-center py-2 grid grid-cols-10">
            
          </div>
        </div>
      </div>
    </div>
  );
}
