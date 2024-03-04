import { useQuiz } from "../contexts/quizContext";

function Options() {
  const { option, dispatch, questions, answer, currentQuestionIndex }= useQuiz()

  const question = questions[currentQuestionIndex]
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button key={option}
          className={`btn btn-option ${index === answer && "answer"} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: "selectAnswer", payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
      
    </div>
  );
}

export default Options;
