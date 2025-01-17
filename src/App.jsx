import React from "react";
import { Todo } from "./Todo";

const App = () => {
	return (
		<div
			className="scroll-smoot px-8 py-20 bg-slate-50 w-full min-h-screen
			max-[580px]:p-0 max-[580px]:bg-white relative
		">
			<Todo />
		</div>
	);
};

export default App;
