import { useState } from "react";
import { PredictionForm } from "./PredictionForm";
import { Loader } from "./Loader";
import { Button } from "./ui/button";

export const PredictionWrapper = () => {
  const [result, setResult] = useState<boolean>(false);
  const [resultData, setResultData] = useState<[string, boolean]>(["", false]); // text, OK
  return (
    <div className="w-full max-w-xl mt-4 min-h-screen text-center">
      {result ? (
        resultData[0] !== "" ? (
          <>
            <div className="text-2xl border-white shadow-md rounded-md p-4 bg-white m-6">
              {resultData[1] === false ? (
                <p className="text-red-500">{resultData[0]}</p>
              ) : (
                <>
                  <p className="text-green-500">Prediction successful!</p>
                  <p>The likelihood of stroke is:</p>
                  <p className="p-4">{resultData[0]}</p>
                </>
              )}
            </div>
            <div>
              <Button
                className="bg-primary text-white hover:bg-primary/90"
                onClick={() => {
                  setResult(false);
                  setResultData(["", false]);
                }}
              >
                Reset
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-center">
              Please wait while we process your data
            </p>
            <Loader />
          </>
        )
      ) : (
        <>
          <p className="my-4 text-lg">
            Please fill out the form to get your prediction.
          </p>

          <PredictionForm setResult={setResult} setResultData={setResultData} />
        </>
      )}
    </div>
  );
};
