import React, { useEffect, useState } from "react";
import { Alert, Form, Input, Button } from "@nextui-org/react";
import PageLayout from "./layout/PageLayout";
import MovementsCheckboxes from "../components/workouts/createWorkoutForm/movementsCheckboxes/MovementsCheckboxes";
import ProgramLength from "../components/workouts/createWorkoutForm/programLength/ProgramLength";
import Description from "../components/workouts/createWorkoutForm/description/Description";
import axiosInstance from "../helpers/axiosInstance";

function Create() {
  const [isValid, setIsValid] = useState(true);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [workoutTitle, setWorkoutTitle] = useState("");
  const [movementsChecked, setMovementsChecked] = useState(["3/4 Sit-Up"]);
  const [programLengthValue, setProgramLengthValue] = useState("1");
  const [descriptionValue, setDescriptionhValue] = useState("");
  const [formData, setFormData] = useState({
    workoutTitle: workoutTitle,
    movementsChecked: movementsChecked,
    programLengthValue: programLengthValue,
    descriptionValue: descriptionValue,
  });

  const onSubmit = async (e) => {
    console.log("e.currentTarget", e.currentTarget);
    if (
      !formData.workoutTitle ||
      formData.movementsChecked.length < 1 ||
      !formData.programLengthValue ||
      !formData.descriptionValue
    ) {
      return;
    }

    try {
      const response = await axiosInstance.post("/accout/add-workout", formData);
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
        setIsSuccessful(true);
      }
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
      workoutTitle,
      movementsChecked,
      programLengthValue,
      descriptionValue,
    });
  }, [workoutTitle, movementsChecked, programLengthValue, descriptionValue]);

  return (
    <PageLayout>
      {(!isValid || errorMessage) && (
        <div className="w-full flex items-center my-3 alert-danger rounded-medium">
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
        <div className="w-full flex items-center my-3 alert-success rounded-medium">
          <Alert
            color="success"
            title={"Hurray! Workout successfully added!"}
          />
        </div>
      )}
      <Form className="w-full" validationBehavior="native" onSubmit={onSubmit}>
        <MovementsCheckboxes
          setWorkoutTitle={setWorkoutTitle}
          setMovementsChecked={setMovementsChecked}
        />
        <ProgramLength setProgramLengthValue={setProgramLengthValue} />
        <Description setDescriptionhValue={setDescriptionhValue} />
        <div className="items-center justify-center">
          <Button type="submit" color="primary" className="min-w-56">
            Submit
          </Button>
        </div>
      </Form>
    </PageLayout>
  );
}

export default Create;
