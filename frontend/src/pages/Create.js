import React, { useEffect, useState, useContext, useRef } from "react";
import { Alert, Button } from "@heroui/react";
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
  const userID = userData?.user_id;
  const userEmail = userData?.email;
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [visibility, setVisibility] = useState(true);
  const [workoutTitle, setWorkoutTitle] = useState("");
  const [movementsChecked, setMovementsChecked] = useState([]);
  const [movementsSetsReps, setMovementsSetsReps] = useState([]);
  const [programLengthValue, setProgramLengthValue] = useState("1");
  const [descriptionValue, setDescriptionValue] = useState("");

  const formRef = useRef(null);

  const formData = {
    visibility,
    workoutTitle,
    movementsChecked,
    movementsSetsReps,
    programLengthValue,
    descriptionValue,
    userID,
    userEmail,
  };

  const steps = ["Workout name", "Choose exercises", "Preferences"];
  const progressWidth = `${(currentStep / steps.length) * 100}%`;

  const validateMovements = () => {
    if (movementsChecked.length === 0) {
      setErrorMessage("Please select at least one exercise.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (
      formRef.current.checkValidity() &&
      (currentStep !== 2 || validateMovements())
    ) {
      setErrorMessage(null);
      setCurrentStep((prev) => prev + 1);
    } else {
      formRef.current.reportValidity();
    }
  };

  const handleSubmit = async () => {
    if (!formRef.current.checkValidity() || !validateMovements()) {
      formRef.current.reportValidity();
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/account/create-workout",
        formData
      );
      if (response?.status === 200 && response?.data?.status === "success") {
        setErrorMessage(null);
        setIsSuccessful(true);
      } else {
        setErrorMessage(response?.message || "Error adding workout.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    setErrorMessage(null);
    setIsSuccessful(false);
  }, [currentStep]);

  return (
    <PageLayout>
      {errorMessage && (
        <div className="w-full flex items-center my-3 rounded-medium">
          <Alert color="danger" title={errorMessage} />
        </div>
      )}
      {isSuccessful && (
        <div className="w-full flex items-center my-3 rounded-medium">
          <Alert color="success" title="Workout successfully added!" />
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
                  ? "text-primary-600 bg-primary-200"
                  : "text-primary-600 bg-primary-200 opacity-50"
              }`}
            >
              {step}
            </span>
          ))}
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
          <div
            style={{ width: progressWidth }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 transition-all duration-500 ease-in-out"
          ></div>
        </div>
      </div>

      <form ref={formRef}>
        {/* Step 1 */}
        {currentStep === 1 && (
          <div>
            <WorkoutName
              workoutTitle={workoutTitle}
              setWorkoutTitle={setWorkoutTitle}
              required
            />
            <Description
              descriptionValue={descriptionValue}
              setDescriptionValue={setDescriptionValue}
              required
            />
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
              <MovementsCheckboxes
                movementsChecked={movementsChecked}
                setMovementsChecked={setMovementsChecked}
              />
              <SetsRepsForm
                movementsSetsReps={movementsChecked}
                setMovementsSetsReps={setMovementsSetsReps}
              />
            </div>
          </div>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <div className="grid grid-cols-2 md:grid-cols-2">
            <VisibilitySwitch setVisibility={setVisibility} />
            <ProgramLength setProgramLengthValue={setProgramLengthValue} />
          </div>
        )}
      </form>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          onPress={() => setCurrentStep((prev) => prev - 1)}
          className={`px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 ${
            currentStep === 1 ? "hidden" : ""
          }`}
        >
          Previous
        </Button>
        {currentStep < steps.length ? (
          <Button
            onPress={handleNext}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Next
          </Button>
        ) : (
          <Button
            onPress={handleSubmit}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Submit
          </Button>
        )}
      </div>
    </PageLayout>
  );
}

export default Create;
