import { TaskCard } from "@/components/TaskCard";


export default function Home() {
  const tasks = [
    {
      title: "Some random title",
      description: "Testing some things out",
      completed: true,
      priority: 2,
    },
    {
      title: "More",
      description: "Testing some more things out",
      completed: false,
      priority: 1,
    },
    {
      title: "No more",
      description: "",
      completed: true,
      priority: 3,
    },
    {
      title: "TOOO more",
      description: "Warning: Each child in a list should have a unique 'key' prop. Check the top-level render call using <div>. See https://reactjs.org/link/warning-keys for more information.",
      completed: true,
      priority: 3,
    },
  ]

  return (
    <>
      <h1 className="text-center text-4xl font-bold">
        Share My Tasks
      </h1>
      <div className="bg-blue-300">
        {
          tasks.map((task, index) => <TaskCard key={index} task={task} />)
        }
      </div>
    </>
  );
}
