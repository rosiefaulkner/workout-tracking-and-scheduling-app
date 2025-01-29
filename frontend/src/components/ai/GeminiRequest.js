import React, { useEffect, useState } from "react";
import {
  Progress,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function GeminiRequest({ intensity, equipment, muscle, cat }) {
  const [response, setResponse] = useState("");
  const [value, setValue] = useState(0);
  const [formattedResponse, setFormattedResponse] = useState([{}]);

  const equipmentGroup = equipment.join(", ");

  const muscleGroup = muscle;

  useEffect(() => {
    if (!response) {
      return;
    }
  
    const workoutMatches = response.match(/{[^}]+}/g);
  
    const workouts = workoutMatches
      ? workoutMatches.map((item) => {
          const match = item.match(
            /title: '([^']+)', sets: (\d+), reps: '?(.*?)'?\s*}/
          );
          if (match) {
            return {
              title: match[1],
              sets: parseInt(match[2], 10),
              reps: isNaN(parseInt(match[3], 10)) ? match[3] : parseInt(match[3], 10),
            };
          }
          return null;
        }).filter(Boolean)
      : [];
  
    setFormattedResponse(workouts);
  }, [response]);

  useEffect(() => {
    const fetchAIResponse = async () => {
      const genAI = new GoogleGenerativeAI(
        "YOUR API KEY"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      try {
        const result = await model.generateContent(
          "Give me a " +
            cat +
            " training workout at the intensity level of " +
            intensity +
            " including sets and reps that focuses on the following muscles: " +
            muscleGroup +
            " and takes around 1 hour to do. Include only one day in the workout. The workout should be 1 hour for 1 day. Assume I have equipment such as " +
            equipmentGroup +
            ". Do not include a warmup or cool off or cool down. Your response should not include an intruduction or conclusion, rather, your response should just be the workout and no other fluff or chatter. Your response should be formatted like the following example: { title: 'Military Press', sets: 4, reps: 8 }, { title: 'Barbell Front Raise', sets: 3, reps: 10 }, { title: 'Upright Row', sets: 4, reps: 6 }, { title: 'Dumbbell Lateral Raise', sets: 4, reps: 5 }"
        );
        setResponse(result.response?.candidates[0]?.content?.parts[0]?.text);
      } catch (error) {
        console.error("Error generating response from Gemenini:", error);
        setResponse("Failed to fetch response. Please try again later.");
      }
    };

    fetchAIResponse();
  }, []);

  useEffect(() => {
    if (response) {
      return;
    }
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, [response]);

    return (
      <div>
        <h1>Your Custom Workout</h1>
        {formattedResponse ? (
          <div className="overflow-x-auto">
          <Table className="min-w-full shadow-md rounded-lg" selectionMode="single" removeWrapper aria-label="Custom workout">
            <TableHeader className="bg-gray-200 text-gray-700">
                <TableColumn className="py-2 px-4 border-b">Exercise</TableColumn>
                <TableColumn className="py-2 px-4 border-b">Sets</TableColumn>
                <TableColumn className="py-2 px-4 border-b">Reps</TableColumn>
            </TableHeader>
            <TableBody>
              {formattedResponse.map((exercise, index) => (
                <TableRow key={index} className="text-center border-b">
                  <TableCell className="py-2 px-4 border-r">{exercise.title}</TableCell>
                  <TableCell className="py-2 px-4 border-r">{exercise.sets}</TableCell>
                  <TableCell className="py-2 px-4">{exercise.reps}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        ) : (
          <Progress
            aria-label="Generating Workout..."
            className="max-w-md"
            color="success"
            showValueLabel={true}
            size="md"
            value={value}
          />
        )}
      </div>
    );
}
export default GeminiRequest;
