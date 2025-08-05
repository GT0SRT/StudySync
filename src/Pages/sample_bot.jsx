import React, { useState } from "react";
import { model } from "../Components/firebase";
import ResponseCard from "../Components/ResponseCard";
import { useEffect } from "react";
import { addTodo, getUserTodos } from "../Components/userTodos";
import { getAuth } from "firebase/auth";

const SampleBot = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const prompt = `Give the response as raw JSON only. 
        ⚠️ Do NOT include any markdown formatting like triple backticks (\`\`\`), 
        do NOT use \`\`\`json or explanations. Only return valid JSON starting with '{' and ending with '}'.

        The JSON must contain:
        - "title": a string
        - "description": an array of objects with:
            - "day": integer,
            - "checkbox": boolean (default false),
            - "task": string,
            - "date": string in "YYYY-MM-DD" format.

        The task you need to plan is: ${input}.`;

      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      const json = JSON.parse(text);
      addTodo(auth.currentUser.uid, json);
      setResponse(json);
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const auth = getAuth();
  useEffect(() => {
    const fetchTodos = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.warn("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const userTodos = await getUserTodos(user.uid);
        setTodos(userTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#000000] via-[#0d222b] to-[#061F2B] min-h-screen p-5 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Task Manager</h1>

        <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
          <input
            type="text"
            className="flex-1 p-3 rounded bg-[#1e2b34] border border-gray-600 text-white placeholder-gray-400"
            placeholder="Enter your task idea..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold"
          >
            {loading ? "Thinking..." : "Submit"}
          </button>
        </form>

        {todos.length === 0 ? (
          <p>No todos found.</p>
        ) : (
          <div className="gap-5 flex flex-wrap">
            {todos.map((todo, index) => (
              <ResponseCard key={index} data={todo} />
            ))}
            {response && !response.error && (
              <ResponseCard data={response} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SampleBot;