import { useQuiz } from "../contexts/quizContext";

function ButtonNext() {
  const {answer, currentQuestionIndex, numQuestions,dispatch } = useQuiz()
    if( answer === null) return;
    if (currentQuestionIndex < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "goNextQuestion" })}
      >
        Next
      </button>
    );

  if (currentQuestionIndex === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
}

export default ButtonNext
