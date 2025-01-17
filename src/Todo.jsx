import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";

export const Todo = () => {
	const [tasks, setTasks] = useState(() => {
		const savedTasks = localStorage.getItem("tasks");
		return savedTasks ? JSON.parse(savedTasks) : [];
	});
	const [taskInput, setTaskInput] = useState("");

	const formatDate = (date) => {
		return date.toLocaleString("uk-UA", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const addTasks = () => {
		if (taskInput.trim() === "") return;
		setTasks([
			...tasks,
			{
				id: Date.now(),
				text: taskInput,
				completed: false,
				time: formatDate(new Date()),
			},
		]);
		setTaskInput("");
	};

	const toggleTaskChecked = (id) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	const deleteTasks = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	useEffect(() => {
		try {
			localStorage.setItem("tasks", JSON.stringify(tasks));
		} catch (e) {
			setError("Failed to save tasks to local storage");
		}
	}, [tasks]);

	return (
		<div
			className="px-6 py-10 bg-white shadow-xl rounded-2xl h-full max-w-xl w-full
			max-[580px]:shadow-none max-[580px]:rounded-none max-[580px]:bg-transparent
			max-[580px]:py-10 max-[580px]:px-4 mr-auto ml-auto
		">
			<h1 className="text-4xl mb-16 font-normal leading-normal max-[580px]:mb-10 max-[580px]:text-2xl">
				Welcome to <span className="font-bold text-blue-400 ">Todo App</span>
			</h1>
			<div className="flex items-center gap-2">
				<input
					type="text"
					placeholder="New tasks"
					value={taskInput}
					onChange={(e) => setTaskInput(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && addTasks()}
					className="select-none bg-transparent w-full border border-solid border-neutral-200 rounded-lg min-h-12 px-4 placeholder:text-neutral-400 text-base outline-none text-neutral-400 focus:border-blue-500 focus:text-neutral-800"
				/>
				<button
					onClick={addTasks}
					className="min-h-12 min-w-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ease-linear duration-200 active:bg-blue-700">
					<AddIcon style={{ fontSize: "28px" }} />
				</button>
			</div>
			<ul className="flex flex-col gap-4">
				{tasks.map((task) => (
					<li
						key={task.id}
						className="border border-solid border-neutral-200 rounded-lg p-4 first:mt-12 max-[580px]:p-3">
						<div className="mb-6">
							<span
								className={`${
									task.completed
										? "decoration-2 line-through text-neutral-400"
										: "no-underline text-neutral-600"
								} ${"text-xl break-words"}`}>
								{task.text}
							</span>
						</div>
						<div className="flex justify-between">
							<p className="text-neutral-400 text-sm mt-auto">{task.time}</p>
							<div className="flex items-center gap-2 text-white">
								<button
									onClick={() => toggleTaskChecked(task.id)}
									className={`${
										task.completed
											? "bg-green-500 hover:bg-green-600 active:bg-green-700"
											: "bg-neutral-300 hover:bg-neutral-500 active:bg-neutral-600"
									} ${"min-w-10 min-h-10 flex justify-center items-center  rounded-md  ease-linear duration-200"}`}>
									{task.completed ? (
										<DoneAllIcon style={{ fontSize: "16px" }} />
									) : (
										<CheckIcon style={{ fontSize: "20px" }} />
									)}
								</button>
								<button
									onClick={() => deleteTasks(task.id)}
									className="min-w-10 min-h-10 flex justify-center items-center bg-red-500 rounded-md hover:bg-red-600 ease-linear duration-200 active:bg-red-700">
									<DeleteIcon style={{ fontSize: "20px" }} />
								</button>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
