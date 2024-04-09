import React, { useState, useEffect } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import { FaRobot } from "react-icons/fa";
import { Input, Form, Button, Spin } from "antd";
import "./style.css";
import toast from "react-hot-toast";
import sqlFormatter from "@sqltools/formatter";
// const baseUrl = "http://127.0.0.1:8000/invocations/querysql";
const baseUrl =
	"https://uj7fyddl6oea72cu576ogfu6vu0qxhmu.lambda-url.us-east-1.on.aws/query";
const Prompt = ({ isOpen, databaseName, handleResponse, closeSidebar }) => {
	const [prompt, setPrompt] = useState("");
	const [message, setMessage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const handleInputChange = (event) => {
		setPrompt(event.target.value);
	};

	const handleSubmission = async () => {
		if (!prompt.trim()) {
			return; // Exit the function if the prompt is empty
		}

		setLoading(true); // Set loading to true while waiting for response

		try {
			const response = await fetch(`${baseUrl}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					question: prompt,
					db_name: databaseName,
				}),
			});

			setPrompt("");

			// Check if the request was successful
			if (!response.ok) {
				if (response.status === 500) {
					setError(true);
					setMessage({
						input: prompt,
						response: "An error occurred: unable to open database file",
					});
				}
				throw new Error("Failed to fetch data from server");
			}

			setError(false);

			// Get the response data
			const responseData = await response.json();
			console.log("Response data:", responseData);
			const { Prediction } = responseData;

			const formattedResponse = sqlFormatter.format(Prediction);
			setMessage({
				input: prompt,
				response: formattedResponse,
			});
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		}
	};

	const addResponseToNotebook = (response) => {
		handleResponse(response);
		setMessage(null);
		toast.success("Query added to notebook");
	};

	useEffect(() => {
		// Reset message state when sidebar is opened
		if (!isOpen) {
			setMessage(null);
		}
	}, [isOpen]);

	console.log("prompt", prompt);

	return (
		<div>
			{isOpen && (
				<>
					<div className="message-container">
						{loading ? ( // Conditionally render the loader
							<Spin size="large" />
						) : !message ? (
							<div className="assistance-text mt-12 flex justify-center items-center text-[20px]">
								<span className="robot-icon mr-4 text-[24px]">
									<FaRobot />
								</span>
								<p>How can I assist you today?</p>
							</div>
						) : (
							<>
								<div>
									<p className="user-prompt mt-12">
										<span>{message.input}</span>
									</p>
									{message.response && (
										<>
											<p className="result">
												<CodeBlock
													className="code"
													text={message.response}
													language={"SQL"}
													showLineNumbers={false}
													theme={dracula}
												/>
											</p>
											{!error && (
												<div className="notebook">
													<Button
														onClick={() => {
															addResponseToNotebook(message.response);
														}}
														className="bg-slate-700 border-0 p-2 h-11 focus:outline-none text-sm text-white notebook-btn"
													>
														Add to Notebook
													</Button>
												</div>
											)}
										</>
									)}
								</div>
							</>
						)}
					</div>
					<div className="prompt-form relative">
						<Form
							name="simpleForm"
							layout="vertical"
							className="fixed bottom-8 right-16"
						>
							<Input
								placeholder="Enter prompt e.g write a blog"
								value={prompt}
								onChange={handleInputChange}
								className="py-8 w-[420px] input-prompt"
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										handleSubmission();
									}
								}}
							/>
						</Form>
					</div>
				</>
			)}
		</div>
	);
};

export default Prompt;
