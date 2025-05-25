// Predict post request interface
/*Example request body:{
  "gender": "Male",
  "age": 22,
  "hypertension": "No",
  "heartdisease": "No",
  "ever_married": "No",
  "work_type": "Private",
  "Residence_type": "Urban",
  "avg_glucose_level": 89,
  "bmi": 21.5,
  "smoking_status": "Smokes"
}*/
export interface PredictRequest {
  name: string;
  age: number;
  avg_glucose_level: number;
  bmi: number;
  hypertension: "Yes" | "No";
  heartdisease: "Yes" | "No";
  gender: "Male" | "Female";
  ever_married: "Yes" | "No";
  work_type: "Private" | "Self-employed" | "Govt_job" | "children";
  Residence_type: "Urban" | "Rural";
  smoking_status: "Formerly smoked" | "Never smoked" | "Smokes" | "Unknown";
}

export interface PredictResponse {
  probability: number;
}