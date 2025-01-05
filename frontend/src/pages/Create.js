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

function Create() {
  const { userData } = useContext(AppContext);
  const userInfo = userData;
  const userID = userInfo?.user_id;
  const userEmail = userInfo?.email;

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
      <div className="grid grid-cols-2 md:grid-cols-2 gap-9 p-4">
        <div>
          <MovementsCheckboxes
            setWorkoutTitle={setWorkoutTitle}
            setMovementsChecked={setMovementsChecked}
          />
        </div>
        <div>
          <VisibilitySwitch setVisibility={setVisibility} />
          <div className="mt-20">
            <SetsRepsForm
              movementsSetsReps={movementsChecked}
              setMovementsSetsReps={setMovementsSetsReps}
            />
          </div>
        </div>
        <div>
          <Description setDescriptionValue={setDescriptionValue} />
          <div>
            <ProgramLength setProgramLengthValue={setProgramLengthValue} />
          </div>
        </div>
      </div>
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
    </PageLayout>
  );
}

export default Create;
