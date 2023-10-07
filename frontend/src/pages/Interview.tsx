import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { FiMic, FiMicOff } from "react-icons/fi";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

type Track = {
    track: string;
  };
  
  interface InterviewState {
    questionIndex: number;
    inputValue: string;
    finalData: { [key: string]: string };
  }

const Interview = () => {
    
    const [field, setField] = useState<string | null>(localStorage.getItem("field"));
    const [level, setLevel] = useState<string | null>(localStorage.getItem("level"));
    
    const  track  = field;
    const [state, setState] = useState<InterviewState>({
        questionIndex: 0,
        inputValue: "",
        finalData: {},
    });
    
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isAnswerValid, setIsAnswerValid] = useState<boolean>(false);
    const [question, setQuestion] = useState<string>("");
    const [feedback, setFeedback] = useState<boolean>(false);
    const [provideFeedback, setProvideFeedback] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false); // Added state for listening toggle
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

    useEffect(() => {
        getQues();
      }, []);

      
      useEffect(() => {
          setIsAnswerValid(
              state.inputValue.trim().length >= 30 ||
              (isListening && transcript.trim().length >= 30)
              );
            }, [state.inputValue, isListening, transcript]);
            
            useEffect(() => {
                if (isListening) {
                    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
                } 
            }, [isListening, transcript]);
            
            const questionsArray: string[] = question.split("\n");
            const feedbackarray  =provideFeedback.split("\n");
        
            if (!browserSupportsSpeechRecognition) {
            return null;
            }



            const getQues = () => {
                setLoading(false);
                axios
                    .get<string>(`http://localhost:8080/mind/${track}`)
                    .then((res:any) => {
                    const response: string = res.data;
                    setLoading(false);
                    setQuestion(response);
                    })
                    .catch((err: Error) => {
                    console.log(err);
                    });
                };
            
                const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setState({ ...state, inputValue: e.target.value });
                };
            
                const toggleListening = () => {
                if (isListening) {
                    SpeechRecognition.stopListening();
                } else {
                    resetTranscript();
                }
                setIsListening(!isListening);
                };
            
                const handleSubmit = async (a: React.MouseEvent<HTMLButtonElement>) => {
                a.preventDefault();
                const currentQuestion = questionsArray[state.questionIndex];
                const currentAnswer = state.inputValue;
                //console.log(currentAnswer);
                const updatedFinalData = {
                    ...state.finalData,
                    [currentQuestion]: currentAnswer,
                };
            
                if (state.questionIndex === questionsArray.length - 1) {
                    SpeechRecognition.stopListening()
                      resetTranscript();
                    try {
                    setFeedback(true);
                    const response = await axios.post(
                        "http://localhost:8080/mind/feedback/out",
                        updatedFinalData
                        );
                        setProvideFeedback(response.data);
                    } catch (err) {
                    console.log(err);
                    }
                    } else {
                    setState({
                    ...state,
                    questionIndex: state.questionIndex + 1,
                    inputValue: "",
                    finalData: updatedFinalData,
                    });
                    resetTranscript();
                }
                };

        if (isLoading) {
            return (
                <Loader/>
            );
        }

  return (
    <div className="max-w-[80%] md:mt-[50px] sm:mt-[-60px] w-full h-[83vh] mx-auto text-center flex flex-col justify-center">
        {feedback ? (
            <div className="bg-[#849fd2] text-start p-6 w-[90%] md:w-[70%] mx-auto rounded-xl shadow-md space-x-4">
            <h2 className="text-white text-center text-xl sm:text-3xl md:text-4xl font-bold">Feedback</h2>
                {provideFeedback.length === 0 ? (
            <img
                    className="w-[100%] p-10 mx-auto"
                    src="https://media4.giphy.com/media/1ibfRD75ZMtDG/giphy.gif?cid=ecf05e477c55u48nj1fj9vi0pzoukfulon52ugdwqbwvllzo&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                    alt=""
            />
                ) : (
            <div className="text-white">
                    <h2 className="md:text-2xl sm:text-xl text-lg font-bold p-2">
                Ratings
                    </h2>
                    <h3 className="md:text-2xl sm:text-xl text-lg font-bold p-2">
                {feedbackarray[0]}
                    </h3>
                    <h3 className="md:text-2xl sm:text-xl text-lg font-bold p-2">
                {feedbackarray[1]}
                    </h3>
                    <h2 className="md:text-2xl sm:text-xl text-lg font-bold ">
                Remarks
                    </h2>
                    {feedbackarray.slice(2).map((item, index) => (
                <p className=" text-md font-medium " key={index}>{item}</p>
                    ))}
            </div>
                )}
        </div>
            ) : (
        <div className="bg-[#608fe6] text-start p-6 w-[90%] md:w-[70%] mx-auto rounded-xl shadow-md space-x-4">
                <div className="h-[100%]">
            <h2 className="text-white text-sm font-bold md:text-lg">
                    Question {questionsArray[state.questionIndex]}
            </h2>
            <div className="flex items-center md:flex-row mt-[-10px] flex-col h-[80%]">
                <textarea
                className="rounded-lg py-4 w-[90%] h-32 px-3 mt-4 mr-2 text-start"
                value={transcript ? state.inputValue + transcript : state.inputValue}
                onChange={(e) => {
                  handleChange(e);
                  resetTranscript();
                }}
                placeholder="Enter Your Answer here..."
              />
            <div className="mt-0 flex flex-row md:flex-col rounded-md">
              <div
                className="bg-[#d52626] w-[65px] mr-3 md:py-3 md:ml-1 text-white py-2 px-4 rounded-md  mx-auto my-6 hover:bg-[#ec1206] flex items-center justify-center"
                onClick={toggleListening}
              >
                        {isListening ? <FiMicOff /> : <FiMic />}
                </div>
                <button
                        className={`py-2 px-4 ml-1 mr-2 rounded-md font-medium mx-auto my-6 ${
                    isAnswerValid
                            ? "bg-[#1baaf7] text-white hover:bg-[#28d5d2] cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        disabled={!isAnswerValid}
                        onClick={handleSubmit}
                >
                        Send
                </button>
                    </div>
            </div>
                </div>
        </div>
            )}
    </div>
        );
}

export default Interview
