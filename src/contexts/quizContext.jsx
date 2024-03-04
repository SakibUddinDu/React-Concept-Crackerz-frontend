import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();

function QuizProvider({ children }) {
  const initialState = {
    questions: [],
    // loading, ready, active, error, finished
    status: "loading",
    currentQuestionIndex: 0,
    answer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: 180,
  };

  const reducer = (state, action) => {
    const question = state.questions.at(state.currentQuestionIndex);

    switch (action.type) {
      case "dataReceived":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };
      case "dataFailed":
        return {
          ...state,
          questions: action.payload,
          status: "error",
        };
      case "start":
        return {
          ...state,
          status: "active",
          // currentQuestionIndex: currentQuestionIndex + 1,
        };
      case "selectAnswer":
        return {
          ...state,
          answer: action.payload, //clicked item index
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      case "goNextQuestion":
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1,
          answer: null,
          // currentQuestionIndex: currentQuestionIndex + 1,
        };
      case "finished":
        return {
          ...state,
          status: "finished",
          highScore:
            state.points > state.highScore ? state.points : state.highScore,
        };
      case "reset":
        return {
          ...initialState,
          questions: state.questions,
          status: "active",
          highScore: state.highScore,
        };
      case "tick":
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? "finished" : state.status,
        };

      default:
        throw new Error("Unknown action error");
    }
  };

  const [
    {
      questions,
      status,
      currentQuestionIndex,
      answer,
      points,
      highScore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        currentQuestionIndex,
        answer,
        points,
        highScore,
        secondsRemaining,
        numQuestions,
        maxPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("QuizContext is used outside the QuizProvider");
  }
  return context;
}


export { QuizProvider, useQuiz };
