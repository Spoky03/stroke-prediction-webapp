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
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  age: z
    .number()
    .min(0, {
      message: "Age must be a positive number.",
    })
    .max(120, {
      message: "Age must be less than 120.",
    }),
  gender: z.enum(["Male", "Female", "Other"]),
  hypertension: z.union([z.literal(1), z.literal(0)]),
  heartDisease: z.union([z.literal(1), z.literal(0)]),
  maritalStatus: z.enum(["Married", "Single", "Divorced"]),
  workType: z.enum([
    "Private",
    "Self-employed",
    "Government Job",
    "Never Worked",
  ]),
  residenceType: z.enum(["Urban", "Rural"]),
  averageGlucoseLevel: z
    .number()
    .min(0, {
      message: "Average Glucose Level must be a positive number.",
    })
    .max(300, {
      message: "Average Glucose Level must be less than 300.",
    }),
  bodyMassIndex: z
    .number()
    .min(10, {
      message: "Body Mass Index must be atleast 10.",
    })
    .max(50, {
      message: "Body Mass Index must be less than 50.",
    }),
  smokingStatus: z.enum(["Formerly Smoked", "Non-smoker", "Currently Smokes"]),
  alcoholIntake: z.enum([
    "Never",
    "Rarely",
    "Social Drinker",
    "Frequent Drinker",
  ]),
  physicalActivity: z.enum(["Low", "Moderate", "High"]),
  strokeHistory: z.union([z.literal(1), z.literal(0)]),
  familyHistoryOfStroke: z.union([z.literal(1), z.literal(0)]),
  dietaryHabits: z.enum([
    "Gluten-free",
    "Vegetarian",
    "Vegan",
    "Non-vegetarian",
    "Paleo",
    "Keto",
    "Pescatarian",
  ]),
  stressLevels: z.number().min(0).max(10),
  bloodPressureLevels_systolic: z.number().min(0).max(200),
  bloodPressureLevels_diastolic: z.number().min(0).max(120),
  cholesterolLevels_HDL: z.number().min(0).max(100),
  cholesterolLevels_LDL: z.number().min(0).max(200),
  symptoms: z.array(
    z.enum([
      "Blurred Vision",
      "Confusion",
      "Difficulty Speaking",
      "Dizziness",
      "Headache",
      "Loss of Balance",
      "Numbness",
      "Seizures",
      "Severe Fatigue",
      "Weakness",
    ])
  ),
});

export function PredictionForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: 0,
      gender: "Male",
      hypertension: 0,
      heartDisease: 0,
      maritalStatus: "Single",
      workType: "Private",
      residenceType: "Urban",
      averageGlucoseLevel: 0,
      bodyMassIndex: 10,
      smokingStatus: "Non-smoker",
      alcoholIntake: "Never",
      physicalActivity: "Low",
      strokeHistory: 0,
      familyHistoryOfStroke: 0,
      dietaryHabits: "Non-vegetarian",
      stressLevels: 0,
      bloodPressureLevels_systolic: 0,
      bloodPressureLevels_diastolic: 0,
      cholesterolLevels_HDL: 0,
      cholesterolLevels_LDL: 0,
      symptoms: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const symptomOptions = [
    "Blurred Vision",
    "Confusion",
    "Difficulty Speaking",
    "Dizziness",
    "Headache",
    "Loss of Balance",
    "Numbness",
    "Seizures",
    "Severe Fatigue",
    "Weakness",
  ] as const;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto p-6 bg-white rounded-lg shadow"
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
              <FormDescription>Please enter your name.</FormDescription>
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
                  max={120}
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
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="Other" id="gender-other" />
                    <FormLabel htmlFor="gender-other" className="font-normal">
                      Other
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hypertension */}
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
          name="heartDisease"
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
                    <RadioGroupItem value="1" id="heartDisease-yes" />
                    <FormLabel
                      htmlFor="heartDisease-yes"
                      className="font-normal"
                    >
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="heartDisease-no" />
                    <FormLabel
                      htmlFor="heartDisease-no"
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

        {/* Marital Status */}
        <FormField
          control={form.control}
          name="maritalStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Marital Status</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Divorced">Divorced</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  <SelectItem value="Government Job">Government Job</SelectItem>
                  <SelectItem value="Never Worked">Never Worked</SelectItem>
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

        {/* Average Glucose Level */}
        <FormField
          control={form.control}
          name="averageGlucoseLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Average Glucose Level</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={300}
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
                  min={10}
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
                  <SelectItem value="Formerly Smoked">
                    Formerly Smoked
                  </SelectItem>
                  <SelectItem value="Non-smoker">Non-smoker</SelectItem>
                  <SelectItem value="Currently Smokes">
                    Currently Smokes
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Alcohol Intake */}
        <FormField
          control={form.control}
          name="alcoholIntake"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Alcohol Intake</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select alcohol intake" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Never">Never</SelectItem>
                  <SelectItem value="Rarely">Rarely</SelectItem>
                  <SelectItem value="Social Drinker">Social Drinker</SelectItem>
                  <SelectItem value="Frequent Drinker">
                    Frequent Drinker
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Physical Activity */}
        <FormField
          control={form.control}
          name="physicalActivity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Physical Activity</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Stroke History */}
        <FormField
          control={form.control}
          name="strokeHistory"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Stroke History</FormLabel>
              <FormControl>
                <RadioGroup
                  value={String(field.value)}
                  onValueChange={(val) => field.onChange(Number(val))}
                  className="flex flex-row gap-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="strokeHistory-yes" />
                    <FormLabel
                      htmlFor="strokeHistory-yes"
                      className="font-normal"
                    >
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="strokeHistory-no" />
                    <FormLabel
                      htmlFor="strokeHistory-no"
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

        {/* Family History of Stroke */}
        <FormField
          control={form.control}
          name="familyHistoryOfStroke"
          render={({ field }) => (
            <FormItem>
              <FormLabel  className="text-md">Family History of Stroke</FormLabel>
              <FormControl>
                <RadioGroup
                  value={String(field.value)}
                  onValueChange={(val) => field.onChange(Number(val))}
                  className="flex flex-row gap-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="familyHistoryOfStroke-yes" />
                    <FormLabel
                      htmlFor="familyHistoryOfStroke-yes"
                      className="font-normal"
                    >
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="familyHistoryOfStroke-no" />
                    <FormLabel
                      htmlFor="familyHistoryOfStroke-no"
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

        {/* Dietary Habits */}
        <FormField
          control={form.control}
          name="dietaryHabits"
          render={({ field }) => (
            <FormItem>
              <FormLabel  className="text-md">Dietary Habits</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select dietary habit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Gluten-free">Gluten-free</SelectItem>
                  <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="Vegan">Vegan</SelectItem>
                  <SelectItem value="Non-vegetarian">Non-vegetarian</SelectItem>
                  <SelectItem value="Paleo">Paleo</SelectItem>
                  <SelectItem value="Keto">Keto</SelectItem>
                  <SelectItem value="Pescatarian">Pescatarian</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Stress Levels */}
        <FormField
          control={form.control}
          name="stressLevels"
          render={({ field }) => (
            <FormItem>
              <FormLabel  className="text-md">Stress Levels (0-10)</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={10}
                  step={1}
                  value={[field.value]}
                  onValueChange={([val]) => field.onChange(val)}
                  className="w-full"
                />
              </FormControl>
              <div className="text-sm text-muted-foreground mt-1">
                Selected: {field.value}
              </div>
              <FormDescription>
                Please rate your stress levels from 0 (no stress) to 10
                (extremely stressed). You can refer to{" "}
                <a
                  className="text-blue-500 underline"
                  href="https://www.das.nh.gov/wellness/docs/percieved%20stress%20scale.pdf"
                >
                  this
                </a>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Blood Pressure Levels */}
        <div>
          <p className="my-4">Blood Pressure Levels (Systolic/Diastolic)</p>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="bloodPressureLevels_systolic"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Systolic BP</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter systolic BP"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bloodPressureLevels_diastolic"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Diastolic BP</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter diastolic BP"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <p className="my-4">Cholesterol Levels (HDL/LDL)</p>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="cholesterolLevels_HDL"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>HDL Cholesterol</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter HDL cholesterol"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cholesterolLevels_LDL"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>LDL Cholesterol</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter LDL cholesterol"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Symptoms */}
        <FormField
          control={form.control}
          name="symptoms"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Symptoms</FormLabel>
              <FormDescription>
                Please select <b>all</b> applicable symptoms.
              </FormDescription>

              <FormControl>
                <div className="grid grid-cols-2 gap-2">
                  {symptomOptions.map((symptom) => (
                    <label key={symptom} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={symptom}
                        checked={field.value?.includes(symptom)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([
                              ...field.value,
                              symptom as (typeof symptomOptions)[number],
                            ]);
                          } else {
                            field.onChange(
                              field.value.filter(
                                (s: (typeof symptomOptions)[number]) =>
                                  s !== symptom
                              )
                            );
                          }
                        }}
                        className="checkbox"
                      />
                      <span>{symptom}</span>
                    </label>
                  ))}
                </div>
              </FormControl>
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
