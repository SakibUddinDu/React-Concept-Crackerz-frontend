function ProgressBar({answer, numQuestions, maxPoints, currentQuestionIndex, points}) {
    return (
        <header className="progress">
        <progress max={numQuestions} value={ answer !== null ? currentQuestionIndex + 1: currentQuestionIndex} />
  
        <p>
          Question <strong>{currentQuestionIndex + 1}</strong> / {numQuestions}
        </p>
  
        <p>
          <strong>{points}</strong> / {maxPoints} points
        </p>
      </header>
    )
}

export default ProgressBar
