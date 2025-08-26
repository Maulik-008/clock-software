import React, { useState, useEffect } from "react";
import { PlusCircle, X, Check, Pencil, Trash2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the Task type
interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TodoListProps {
  variant?: "compact" | "full";
  maxHeight?: string;
  showHeader?: boolean;
}

const TodoList: React.FC<TodoListProps> = ({
  variant = "full",
  maxHeight = "400px",
  showHeader = true,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("studyclock_tasks");
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
        setTasks([]);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("studyclock_tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim() === "") return;

    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTasks([newTask, ...tasks]);
    setNewTaskText("");
  };

  // Toggle task completion status
  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Start editing a task
  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  };

  // Save edited task
  const saveEditedTask = (id: string) => {
    if (editingText.trim() === "") return;

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText.trim() } : task
      )
    );
    setEditingTaskId(null);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTaskId(null);
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Handle key press in edit mode
  const handleEditKeyPress = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter") {
      saveEditedTask(id);
    } else if (e.key === "Escape") {
      cancelEditing();
    }
  };

  // Format relative time
  const formatRelativeTime = (timestamp: number) => {
    const now = Date.now();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays}d ago`;

    // For older tasks, show the date
    return new Date(timestamp).toLocaleDateString();
  };

  // Get counts for stats
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div
      className={cn(
        "bg-black/60 backdrop-blur-xl rounded-xl border border-gray-800 shadow-xl overflow-hidden",
        variant === "compact" ? "p-2 sm:p-3 md:p-4" : "p-3 sm:p-4 md:p-6"
      )}
    >
      {showHeader && (
        <div className="mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center">
            <Clock className="mr-1.5 sm:mr-2 text-purple-400" size={18} />
            Study Tasks
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
            Keep track of your study goals and assignments
          </p>
        </div>
      )}

      {/* Task stats */}
      <div className="flex mb-4 gap-1 sm:gap-2">
        <div className="bg-purple-900/30 rounded-lg px-2 sm:px-3 py-2 flex-1 border border-purple-500/20">
          <div className="text-xs text-purple-300 truncate">Total</div>
          <div className="text-base sm:text-lg font-bold text-white">
            {tasks.length}
          </div>
        </div>
        <div className="bg-green-900/30 rounded-lg px-2 sm:px-3 py-2 flex-1 border border-green-500/20">
          <div className="text-xs text-green-300 truncate">Completed</div>
          <div className="text-base sm:text-lg font-bold text-white">
            {completedCount}
          </div>
        </div>
        <div className="bg-blue-900/30 rounded-lg px-2 sm:px-3 py-2 flex-1 border border-blue-500/20">
          <div className="text-xs text-blue-300 truncate">Pending</div>
          <div className="text-base sm:text-lg font-bold text-white">
            {pendingCount}
          </div>
        </div>
      </div>

      {/* Add task form */}
      <form onSubmit={addTask} className="mb-4 flex">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new study task..."
          className="flex-1 bg-white/10 border border-white/20 rounded-l-lg px-2 sm:px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm sm:text-base"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-2 sm:px-4 py-2 rounded-r-lg hover:opacity-90 transition-opacity flex items-center whitespace-nowrap"
          disabled={newTaskText.trim() === ""}
        >
          <PlusCircle size={16} className="mr-1 hidden sm:inline" />
          Add
        </button>
      </form>

      {/* Task list */}
      <div
        className={cn(
          "overflow-y-auto custom-scrollbar",
          tasks.length > 0 ? `max-h-[${maxHeight}]` : ""
        )}
        style={{ maxHeight }}
      >
        {tasks.length === 0 ? (
          <div className="text-center py-5 sm:py-8 text-gray-500">
            <p className="text-xs sm:text-sm">
              No tasks yet. Add your first study task above!
            </p>
          </div>
        ) : (
          <ul className="space-y-1.5 sm:space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={cn(
                  "bg-white/5 border rounded-lg transition-all",
                  task.completed
                    ? "border-green-500/30 bg-green-900/10"
                    : "border-white/10 hover:border-purple-500/30"
                )}
              >
                <div className="p-2 sm:p-3 flex items-start gap-1 sm:gap-2">
                  <button
                    style={{
                      width: "18px",
                      height: "18px",
                      minWidth: "18px",
                      minHeight: "18px",
                      padding: 0,
                    }}
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={cn(
                      "flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border transition-colors",
                      task.completed
                        ? "bg-green-500 border-green-600 text-white"
                        : "border-gray-600 hover:border-purple-400"
                    )}
                  >
                    {task.completed && <Check size={12} />}
                  </button>

                  <div className="flex-1 min-w-0">
                    {editingTaskId === task.id ? (
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyDown={(e) => handleEditKeyPress(e, task.id)}
                        onBlur={() => saveEditedTask(task.id)}
                        autoFocus
                        className="w-full bg-black/30 border border-purple-500/30 rounded px-2 py-1 text-white focus:outline-none text-sm"
                      />
                    ) : (
                      <>
                        <p
                          className={cn(
                            "text-xs sm:text-sm break-words",
                            task.completed
                              ? "text-gray-400 line-through"
                              : "text-white"
                          )}
                        >
                          {task.text}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                          <Clock size={10} className="mr-1" />
                          {formatRelativeTime(task.createdAt)}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="flex space-x-0.5 sm:space-x-1">
                    {editingTaskId === task.id ? (
                      <>
                        <button
                          onClick={() => saveEditedTask(task.id)}
                          className="p-0.5 sm:p-1 text-green-400 hover:text-green-300 transition-colors"
                        >
                          <Check size={14} className="sm:size-[16px]" />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="p-0.5 sm:p-1 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X size={14} className="sm:size-[16px]" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(task)}
                          className="p-0.5 sm:p-1 text-blue-400 hover:text-blue-300 transition-colors"
                          disabled={task.completed}
                        >
                          <Pencil size={14} className="sm:size-[16px]" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-0.5 sm:p-1 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={14} className="sm:size-[16px]" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default TodoList;
