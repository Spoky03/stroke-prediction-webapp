"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
// import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PredictRequest } from "@/interfaces/index.ts";
import { postRequest } from "@/lib/requests";

/* 
  'Patient ID',
  'Patient Name',
  'Age',
  'Gender',
  'Hypertension',
  'Heart Disease',
  'Marital Status',
  'Work Type',
  'Residence Type',
  'Average Glucose Level',
  'Body Mass Index (BMI)',
  'Smoking Status',
  'Alcohol Intake',
  'Physical Activity',
  'Stroke History',
  'Family History of Stroke',
  'Dietary Habits',
  'Stress Levels',
  'Blood Pressure Levels',
  'Cholesterol Levels',
  'Symptoms', : 
              Blurred Vision
              Confusion
              Difficulty Speaking
              Dizziness
              Headache
              Loss of Balance
              Numbness
              Seizures
              Severe Fatigue
              Weakness

  'Diagnosis'
*/
// name is not required 
const formSchema = z.object({
  name: z.string().optional(),
  age: z
    .number()
    .min(0, {
      message: "Age must be a positive number.",
    })
    .max(110, {
      message: "Age must be less than 110.",
    }),
  gender: z.enum(["Male", "Female"]),
  hypertension: z.union([z.literal(1), z.literal(0)]),
  heartdisease: z.union([z.literal(1), z.literal(0)]),
  everMarried: z.union([z.literal(1), z.literal(0)]),
  workType: z.enum(["Private", "Self-employed", "Government Job", "Children"]),
  residenceType: z.enum(["Urban", "Rural"]),
  averageGlucoseLevel: z
    .number()
    .min(40, {
      message: "Average Glucose Level must be a positive number.",
    })
    .max(280, {
      message: "Average Glucose Level must be less than 280.",
    }),
  bodyMassIndex: z
    .number()
    .min(14, {
      message: "Body Mass Index must be atleast 14.",
    })
    .max(50, {
      message: "Body Mass Index must be less than 50.",
    }),
  smokingStatus: z.enum([
    "Formerly smoked",
    "Never smoked",
    "Smokes",
    "Unknown",
  ]),
});

export function PredictionForm({
  setResult,
  setResultData,
}: {
  setResult: (result: boolean) => void;
  setResultData: (result: [string, boolean]) => void;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: 20,
      gender: "Male",
      hypertension: 0,
      heartdisease: 0,
      everMarried: 0,
      workType: "Private",
      residenceType: "Urban",
      averageGlucoseLevel: 80,
      bodyMassIndex: 24,
      smokingStatus: "Never smoked",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(true);
    // scroll to the top
    window.scrollTo({ top: 0, behavior: "smooth" });
    // modify values to match the PredictRequest interface
    // Map form values to PredictRequest interface
    // Map workType to match PredictRequest expected values
    const workTypeMap: Record<
      string,
      "Private" | "Self-employed" | "Govt_job" | "children"
    > = {
      Private: "Private",
      "Self-employed": "Self-employed",
      "Government Job": "Govt_job",
      Children: "children",
    };

    const modifiedValues: PredictRequest = {
      name: values.name || "Unknown", // Default to "Unknown" if name is not provided
      age: values.age,
      avg_glucose_level: values.averageGlucoseLevel,
      bmi: values.bodyMassIndex,
      hypertension: values.hypertension === 1 ? "Yes" : "No",
      heartdisease: values.heartdisease === 1 ? "Yes" : "No",
      gender: values.gender,
      ever_married: values.everMarried === 1 ? "Yes" : "No",
      work_type: workTypeMap[values.workType],
      Residence_type: values.residenceType,
      smoking_status: values.smokingStatus,
    };
    // Make the API request
    postRequest("/predict", modifiedValues)
      .then((response) => {
        setResultData([response.data.probability, true]);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setResultData([
          `${
            error.status || ""
          } An error occurred while processing your request.`,
          false,
        ]);
      });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 max-w-3xl mx-auto p-6 my-6 bg-white rounded-lg shadow"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter patient name" {...field} />
              </FormControl>
              <FormDescription>Not required</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Age */}
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Age</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={110}
                  step={1}
                  value={[field.value]}
                  onValueChange={([val]) => field.onChange(val)}
                  className="w-full"
                />
              </FormControl>
              <div className="text-sm text-muted-foreground mt-1">
                Selected: {field.value}
              </div>
              <FormDescription>Please enter your age in years.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-row gap-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="Male" id="gender-male" />
                    <FormLabel htmlFor="gender-male" className="font-normal">
                      Male
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="Female" id="gender-female" />
                    <FormLabel htmlFor="gender-female" className="font-normal">
                      Female
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hypertension */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="hypertension"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Hypertension</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={String(field.value)}
                    onValueChange={(val) => field.onChange(Number(val))}
                    className="flex flex-row gap-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="hypertension-yes" />
                      <FormLabel
                        htmlFor="hypertension-yes"
                        className="font-normal"
                      >
                        Yes
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="hypertension-no" />
                      <FormLabel
                        htmlFor="hypertension-no"
                        className="font-normal"
                      >
                        No
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Heart Disease */}
          <FormField
            control={form.control}
            name="heartdisease"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Heart Disease</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={String(field.value)}
                    onValueChange={(val) => field.onChange(Number(val))}
                    className="flex flex-row gap-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="heartdisease-yes" />
                      <FormLabel
                        htmlFor="heartdisease-yes"
                        className="font-normal"
                      >
                        Yes
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="heartdisease-no" />
                      <FormLabel
                        htmlFor="heartdisease-no"
                        className="font-normal"
                      >
                        No
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Marital Status */}
        <FormField
          control={form.control}
          name="everMarried"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Ever Married</FormLabel>
              <FormControl>
                <RadioGroup
                  value={String(field.value)}
                  onValueChange={(val) => field.onChange(Number(val))}
                  className="flex flex-row gap-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="everMarried-yes" />
                    <FormLabel
                      htmlFor="everMarried-yes"
                      className="font-normal"
                    >
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="everMarried-no" />
                    <FormLabel htmlFor="everMarried-no" className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Work Type */}
          <FormField
            control={form.control}
            name="workType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Work Type</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Private">Private</SelectItem>
                    <SelectItem value="Self-employed">Self-employed</SelectItem>
                    <SelectItem value="Government Job">
                      Government Job
                    </SelectItem>
                    <SelectItem value="Children">Children</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Residence Type */}
          <FormField
            control={form.control}
            name="residenceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Residence Type</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select residence type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Urban">Urban</SelectItem>
                    <SelectItem value="Rural">Rural</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Average Glucose Level */}
        <FormField
          control={form.control}
          name="averageGlucoseLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Average Glucose Level</FormLabel>
              <FormControl>
                <Slider
                  min={40}
                  max={280}
                  step={1}
                  value={[field.value]}
                  onValueChange={([val]) => field.onChange(val)}
                  className="w-full"
                />
              </FormControl>
              <div className="text-sm text-muted-foreground mt-1">
                Selected: {field.value}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Body Mass Index */}
        <FormField
          control={form.control}
          name="bodyMassIndex"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Body Mass Index (BMI)</FormLabel>
              <FormControl>
                <Slider
                  min={14}
                  max={50}
                  step={0.1}
                  value={[field.value]}
                  onValueChange={([val]) => field.onChange(val)}
                  className="w-full"
                />
              </FormControl>
              <div className="text-sm text-muted-foreground mt-1">
                Selected: {field.value}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Smoking Status */}
        <FormField
          control={form.control}
          name="smokingStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Smoking Status</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select smoking status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Formerly smoked">
                    Formerly smoked
                  </SelectItem>
                  <SelectItem value="Never smoked">Never Smoked</SelectItem>
                  <SelectItem value="Smokes">Smokes</SelectItem>
                  <SelectItem value="Unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
