function ButtonNext({answer, currentQuestionIndex, numQuestions, onDispatch}) {
    if( answer === null) return;
    if (currentQuestionIndex < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => onDispatch({ type: "goNextQuestion" })}
      >
        Next
      </button>
    );

  if (currentQuestionIndex === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => onDispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
}

export default ButtonNext
