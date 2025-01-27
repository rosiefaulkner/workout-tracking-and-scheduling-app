import React, { useEffect, useState } from "react";
import { Progress } from "@heroui/react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function GeminiRequest() {
  const [response, setResponse] = useState("");
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchAIResponse = async () => {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyBXY4U2tn09iHJ_q9iWKrWd_6rFoAL-ahc"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      try {
        const result = await model.generateContent("Give me a strength training workout including sets and reps that includes abs and takes around 1 hour to do. Assume I have a garage gym level of equipment. Your response should not include an intruduction or conclusion, rather, your response should just be the workout and no other fluff or chatter.");
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
      <h1>AI Workout Response</h1>
      <p>
        {response ? (
          response
        ) : (
          <Progress
            aria-label="Downloading..."
            className="max-w-md"
            color="success"
            showValueLabel={true}
            size="md"
            value={value}
          />
        )}
      </p>
    </div>
  );
}

export default GeminiRequest;
