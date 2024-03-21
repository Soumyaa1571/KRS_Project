import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import "./Bform.css";

function Bform({tokenState}) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [totalMarks, setTotalMarks] = useState(0);

  let isAttempted = false;

  const handleOptionClick = (questionId, selectedOption) => {
    setSelectedOptions({ ...selectedOptions, [questionId]: selectedOption });
  };

  const handleNextClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousClick = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };
  const getAttemp = async () => {
    const response =  await axios.post('http://localhost:5000/api/isAttempted', {
      email: tokenState.email
    })
    if(response) {
      return response.data.isAttempted;
    }
    return false;
  }

  const handleFinishClick = async () => {
    // Calculate the result based on user responses
    const userResult = calculateResult();
    setResult(userResult);
    if(tokenState) {

      const response = await axios.post('http://localhost:5000/api/result', {
        email: tokenState.email,
        marks: userResult
      });
    }
  };

  const calculateResult = () => {
    const correctAnswers = questions.map((question) => question.correctans);
    let score = 0;

    for (const [questionId, selectedOption] of Object.entries(
      selectedOptions
    )) {
      const question = questions.find((q) => q._id === questionId);
      if (question && selectedOption === question.correctans) {
        score++;
      }
    }

    return score;
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/gettest");
        console.log("Response:", response.data);
        setQuestions(response.data.test);
        setTotalMarks(response.data.test.length); // Set total marks
        setLoading(false);

       isAttempted = await getAttemp();
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      { isAttempted? 
      (<div className="questions">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h3>Error</h3>
        ) : questions.length > 0 ? (
          <>
            <h3>
              {questions[currentQuestionIndex].Ques ||
                questions[currentQuestionIndex].ques}
            </h3>
            <div className="options-container">
              <p
                className={`option ${
                  selectedOptions[questions[currentQuestionIndex]._id] ===
                  questions[currentQuestionIndex].option1
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  handleOptionClick(
                    questions[currentQuestionIndex]._id,
                    questions[currentQuestionIndex].option1
                  )
                }
              >
                {questions[currentQuestionIndex].option1}
              </p>
              <p
                className={`option ${
                  selectedOptions[questions[currentQuestionIndex]._id] ===
                  questions[currentQuestionIndex].option2
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  handleOptionClick(
                    questions[currentQuestionIndex]._id,
                    questions[currentQuestionIndex].option2
                  )
                }
              >
                {questions[currentQuestionIndex].option2}
              </p>
              <p
                className={`option ${
                  selectedOptions[questions[currentQuestionIndex]._id] ===
                  questions[currentQuestionIndex].option3
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  handleOptionClick(
                    questions[currentQuestionIndex]._id,
                    questions[currentQuestionIndex].option3
                  )
                }
              >
                {questions[currentQuestionIndex].option3}
              </p>
              <p
                className={`option ${
                  selectedOptions[questions[currentQuestionIndex]._id] ===
                  questions[currentQuestionIndex].option4
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  handleOptionClick(
                    questions[currentQuestionIndex]._id,
                    questions[currentQuestionIndex].option4
                  )
                }
              >
                {questions[currentQuestionIndex].option4}
              </p>
            </div>
            <div className="button-container">
              {currentQuestionIndex > 0 && (
                <button
                  className="button-container"
                  onClick={handlePreviousClick}
                >
                  Previous
                </button>
              )}
              {currentQuestionIndex < questions.length - 1 ? (
                <button className="button-container" onClick={handleNextClick}>
                  Next
                </button>
              ) : (
                <button
                  className="button-container"
                  onClick={handleFinishClick}
                >
                  Finish
                </button>
              )}
            </div>
            {result !== null && (
              <div className="result">
                Your Result: {result}
                <br />
                Total Marks: {totalMarks}
              </div>
            )}
          </>
        ) : (
          <h1>No questions available</h1>
        )}
      </div>) :(

        <div>
          The test has been attempted
        </div>
      )} 
    </Fragment>
  );
}

export default Bform;
