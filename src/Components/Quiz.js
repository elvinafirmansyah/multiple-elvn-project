import React, { useState } from "react";
import { useNavigate } from "react-router-dom/dist";

const Quiz = ({ questions, category, name, difficulty, amount }) => {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const navigation = useNavigate();
  const [myAnswer, setMyAnswer] = useState("");

  const checkAnswers = (correct) => {
    setMyAnswer(correct);
    if (questions?.[currentQuiz]?.correct_answer === correct) {
      setScore(score + 1);
    } 
  };

  const handleNextButton = () => {
    setCurrentQuiz(currentQuiz + 1);
  };

  // console.log(questions?.[currentQuiz]?.correct_answer);
  // console.log(questions);

  return (
    <div className="p-4">
      <div>
        <h2 className={currentQuiz >= questions.length ? "block" : "hidden"}>
          ur score out {score} of {questions.length}
        </h2>
        <div>
          {currentQuiz >= questions.length ? (
            <>
              <div className="flex-row flex">
                <div className="mt-4 mr-2" onClick={() => {
                  setCurrentQuiz(0)
                  setScore(0)
                }}>
                  <span className="bg-pink-400 py-2 px-4 cursor-pointer">
                    Ulangi
                  </span>
                </div>
                <div className="mt-4" onClick={() => navigation("/")}>
                  <span className="bg-pink-400 py-2 px-4 cursor-pointer">
                    Pilih pertanyaan lain
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2>
                {currentQuiz + 1}/{questions.length}
              </h2>
              <h2>{questions?.[currentQuiz]?.question}</h2>
              {questions?.[currentQuiz]?.answers.map((question) => (
                <h2
                  className={`${myAnswer === question ? "text-green-500" : "black"} cursor-pointer`}
                  onClick={() => checkAnswers(question)}
                >
                  {question}
                </h2>
              ))}
                <div className="mt-4" onClick={() => myAnswer ? handleNextButton() : {}}>
                  <span className={`${myAnswer ? 'bg-pink-400 text-white cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'} py-2 px-4`}>
                    Next
                  </span>
                </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
