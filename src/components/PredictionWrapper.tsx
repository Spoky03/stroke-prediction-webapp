import { useState } from "react";
import { PredictionForm } from "./PredictionForm";
import { Loader } from "./Loader";

export const PredictionWrapper = () => {
  const [result, setResult] = useState<boolean>(false);
  const [resultData, setResultData] = useState<unknown>("");
  return (
    <div className="w-full max-w-xl mt-4">
      {result ? (
        resultData ? (
          <pre>
            {typeof resultData === "string"
              ? resultData
              : JSON.stringify(resultData, null, 2)}
          </pre>
        ) : (
          <>
            <p className="text-center">Please wait while we process your data</p>
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
