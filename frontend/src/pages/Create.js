import React, { useEffect, useState, useContext } from "react";
import { Alert, Button } from "@nextui-org/react";
import PageLayout from "./layout/PageLayout";
import MovementsCheckboxes from "../components/workouts/createWorkoutForm/movementsCheckboxes/MovementsCheckboxes";
import ProgramLength from "../components/workouts/createWorkoutForm/programLength/ProgramLength";
import Description from "../components/workouts/createWorkoutForm/description/Description";
import VisibilitySwitch from "../components/workouts/createWorkoutForm/visibility/VisibilitySwitch";
import SetsRepsForm from "../components/workouts/createWorkoutForm/setsRepsForm/SetsRepsForm";
import axiosInstance from "../helpers/axiosInstance";
import { AppContext } from "../AppContext/AppContext";
import WorkoutName from "../components/workouts/workoutName/WorkoutName";

function Create() {
  const { userData } = useContext(AppContext);
  const userInfo = userData;
  const userID = userInfo?.user_id;
  const userEmail = userInfo?.email;
  const [currentStep, setCurrentStep] = useState(1);
  const [isValid, setIsValid] = useState(true);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [visibility, setVisibility] = useState(true);
  const [workoutTitle, setWorkoutTitle] = useState("");
  const [movementsChecked, setMovementsChecked] = useState([]);
  const [movementsSetsReps, setMovementsSetsReps] = useState([]);
  const [programLengthValue, setProgramLengthValue] = useState("1");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [formData, setFormData] = useState({
    visibility: visibility,
    workoutTitle: workoutTitle,
    movementsChecked: movementsChecked,
    movementsSetsReps: movementsSetsReps,
    programLengthValue: programLengthValue,
    descriptionValue: descriptionValue,
    userID: userID,
    userEmail: userEmail,
  });

  const steps = ["Workout name", "Choose exercises", "Preferences"];
  const progressWidth = `${(currentStep / steps.length) * 100}%`;
  const validateStep = () => {
    return (
      formData.workoutTitle &&
      formData.movementsChecked.length > 0 &&
      formData.programLengthValue &&
      formData.descriptionValue &&
      formData.movementsSetsReps.length === formData.movementsChecked.length
    );
  };

  const onSubmit = () => {
    if (
      !formData.visibility ||
      !formData.workoutTitle ||
      formData.movementsChecked.length < 1 ||
      !formData.programLengthValue ||
      !formData.descriptionValue ||
      formData.movementsSetsReps.length !== formData.movementsChecked.length
    ) {
      return;
    }

    try {
      axiosInstance.post("/account/add-workout", formData).then((response) => {
        if (
          !response ||
          response?.status !== 200 ||
          response?.data?.status !== "success"
        ) {
          if (response?.message) {
            setErrorMessage(response.message);
          } else {
            setErrorMessage(
              "Oops! Something is missing. Double check your workout details and try again."
            );
          }
        } else {
          setErrorMessage(null);
          setIsValid(true);
          setIsSuccessful(true);
        }
      });
    } catch (error) {
      setErrorMessage(
        "Whoops, something went wrong. Please come back later and try again."
      );
    }
  };

  useEffect(() => {
    if (isSuccessful) {
      setIsSuccessful(false);
    }
    if (!isValid) {
      setIsValid(true);
    }
    if (errorMessage) {
      setErrorMessage(null);
    }
    setFormData({
      ...formData,
      visibility,
      workoutTitle,
      movementsChecked,
      movementsSetsReps,
      programLengthValue,
      descriptionValue,
    });
  }, [
    visibility,
    workoutTitle,
    movementsChecked,
    movementsSetsReps,
    programLengthValue,
    descriptionValue,
  ]);

  return (
    <PageLayout>
      {(!isValid || errorMessage) && (
        <div className="w-full flex items-center my-3 rounded-medium">
          <Alert
            color="danger"
            title={
              errorMessage ||
              "Oops! Something is missing. Double check your workout details and try again."
            }
          />
        </div>
      )}
      {isSuccessful && (
        <div className="w-full flex items-center my-3 rounded-medium">
          <Alert
            color="success"
            title={"Hurray! Workout successfully added!"}
          />
        </div>
      )}
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <span
              key={index}
              className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                index < currentStep
                  ? "text-green-600 bg-green-200"
                  : "text-green-600 bg-green-200 opacity-50"
              }`}
            >
              {step}
            </span>
          ))}
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
          <div
            style={{ width: progressWidth }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500 ease-in-out"
          ></div>
        </div>
      </div>
      {/* Step 1 */}
      {currentStep === 1 && (
        <div>
          <WorkoutName setWorkoutTitle={setWorkoutTitle} />
          <Description setDescriptionValue={setDescriptionValue} />
        </div>
      )}

      {/* Step 2 */}
      {currentStep === 2 && (
        <div className="gap-9 p-4">
          <div
            className={
              movementsChecked.length > 0 && "grid grid-cols-2 md:grid-cols-2"
            }
          >
            <MovementsCheckboxes setMovementsChecked={setMovementsChecked} />
            <SetsRepsForm
              movementsSetsReps={movementsChecked}
              setMovementsSetsReps={setMovementsSetsReps}
            />
          </div>
        </div>
      )}

      {/* Step 3 */}
      {currentStep === 3 && (
        <div>
          <VisibilitySwitch setVisibility={setVisibility} />
          <ProgramLength setProgramLengthValue={setProgramLengthValue} />
          <div className="items-center justify-center">
            <Button
              onPress={onSubmit}
              type="submit"
              color="primary"
              className="min-w-56"
            >
              Submit
            </Button>
          </div>
        </div>
      )}
      <div className="flex justify-between mt-8">
        <Button
          onPress={() => setCurrentStep(currentStep - 1)}
          className={`px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 ${
            currentStep === 1 ? "hidden" : ""
          }`}
        >
          Previous
        </Button>
        {currentStep < steps.length && (
          <Button
            onPress={() => setCurrentStep(currentStep + 1)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Next
          </Button>
        )}
      </div>
    </PageLayout>
  );
}

export default Create;
