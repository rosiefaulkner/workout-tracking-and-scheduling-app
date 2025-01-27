import React, { useEffect, useState } from "react";
import { Progress } from "@heroui/react";
import { OpenAI } from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: "API-KEY",
  dangerouslyAllowBrowser: true,
});

function DeepSeekRequest() {
  const [response, setResponse] = useState("");
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchAIResponse = async () => {
      try {
        const result = await openai.chat.completions.create({
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: "Hello!" },
          ],
          model: "deepseek-chat",
        });

        console.log("API Response:", result); // Debugging: Inspect the raw response.

        if (result.choices && result.choices.length > 0) {
          setResponse(result.choices[0].message.content);
        } else {
          throw new Error("Invalid response structure from API.");
        }
      } catch (error) {
        console.error("Error generating response from DeepSeek:", error);
        setResponse("Failed to fetch response. Please try again later.");
      }
    };

    fetchAIResponse();
  }, []);

  useEffect(() => {
    if (response) return;

    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, [response]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">AI Workout Generation</h1>
      <div>
        {response ? (
          <p className="text-green-600">{response}</p>
        ) : (
          <Progress
            aria-label="Generating..."
            className="max-w-md"
            color="success"
            showValueLabel={true}
            size="md"
            value={value}
          />
        )}
      </div>
    </div>
  );
}

export default DeepSeekRequest;
