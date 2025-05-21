import { PredictionWrapper } from "./components/PredictionWrapper";

function App() {
  return (
    <>
      <header className="bg-gray-100 w-full z-10 sticky py-2 sm:py-4 md:py-5 sm:px-2 md:px-5 flex justify-around shadow-md place-items-center">
        <h1 className="text-2xl font-bold">Stroke Prediction</h1>
        <nav className="flex space-x-4">
          <a href="#" className="text-blue-500">
            About
          </a>
        </nav>
      </header>
      <main className="p-4 min-h-screen flex flex-col items-center lg:mt-10">
        <h2 className="text-xl font-semibold mb-4">
          Welcome to the Stroke Prediction App
        </h2>
        <p className="mb-4">
          This app helps you predict the likelihood of a stroke based on various
          health metrics.
        </p>
        <PredictionWrapper />
        <p className="mt-4">
          For any issues, please check our{" "}
          <a href="https://github.com/Spoky03/stroke-prediction-webapp" className="text-blue-500">
            GitHub repository
          </a>
          .
        </p>
        <div className="max-w-xl mt-4 text-sm text-gray-500">
          <p>This is <b>not</b> a medical tool and should not be used for medical diagnosis.
          Its purpose is to provide educational insights based on the data
          provided.
          </p>
          <p className="text-red-900 font-bold mt-0.5">Always consult a healthcare professional for medical advice.</p>
        </div>
      </main>
      <footer className="bg-gray-200 w-full px-2 py-5 sm:px-5 flex justify-around place-items-center">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Natalia Polak, Konrad Bąchór, Stefan Grzelec ©{" "}
            {new Date().getFullYear()}
          </p>
          <a
            className="text-blue-500"
            href="https://www.kaggle.com/datasets/teamincribo/stroke-prediction/data"
          >
            dataset
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
