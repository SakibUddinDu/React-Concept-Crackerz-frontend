import { useEffect, useReducer } from "react";
import ButtonNext from "./components/ButtonNext";
import Error from "./components/Error";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Main from "./components/Main";
import ProgressBar from "./components/ProgressBar";
import Question from "./components/Question";
import StartScreen from "./components/StartScreen";
import Timer from "./components/Timer";

const initialState = {
  questions: [],
  // loading, ready, active, error, finished
  status: "loading",
  currentQuestionIndex: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 150,
};

const reducer = (state, action) => {
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
      const question = state.questions.at(state.currentQuestionIndex);
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

function App() {
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
  useEffect(() => {
    fetch("https://react-concept-crackerz-backend.vercel.app/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      //   catch
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              answer={answer}
              numQuestions={numQuestions}
              maxPoints={maxPoints}
              currentQuestionIndex={currentQuestionIndex}
              points={points}
            />
            <Question
              key={questions[currentQuestionIndex]}
              question={questions[currentQuestionIndex]}
              answer={answer}
              onDispatch={dispatch}
            />
            <Footer>
              <Timer
                secondsRemaining={secondsRemaining}
                onDispatch={dispatch}
              />
              <ButtonNext
                onDispatch={dispatch}
                answer={answer}
                currentQuestionIndex={currentQuestionIndex}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            onDispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
