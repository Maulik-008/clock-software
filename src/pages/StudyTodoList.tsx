import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  X,
  Check,
  Pencil,
  Trash2,
  Clock,
  BookOpen,
  CheckCircle,
  Calendar,
  ListTodo,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageLayout from "../components/PageLayout";

// Define the Task type
interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  category?: string;
  dueDate?: string;
}

const StudyTodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [newTaskCategory, setNewTaskCategory] = useState<string>("study");
  const [newTaskDueDate, setNewTaskDueDate] = useState<string>("");

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("studyclock_dedicated_tasks");
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
    localStorage.setItem("studyclock_dedicated_tasks", JSON.stringify(tasks));
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
      category: newTaskCategory,
      dueDate: newTaskDueDate || undefined,
    };

    setTasks([newTask, ...tasks]);
    setNewTaskText("");
    setNewTaskDueDate("");
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

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Get counts for stats
  const totalCount = tasks.length;
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = totalCount - completedCount;

  // Calculate completion rate
  const completionRate =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <>
      <SEO
        title="Study Todo List & Task Manager for Students | StudyClock"
        description="Organize your study tasks, assignments, and academic goals with our free online student task manager. Track homework, set due dates, and boost your productivity."
        keywords="study todo list, student task manager, to do list for students, study planner online, study tasks organizer, student homework planner, academic task manager, study goals planner"
        canonicalUrl="https://studyclock.com/study-todo-list"
      />
      <PageLayout showParticles>
        <Navigation />

        <main className="relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          {/* Page header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-blue-300 to-indigo-400">
              Student Task Manager & Study Planner
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Organize your academic life, track assignments, and achieve your
              study goals with our free online task management tool designed
              specifically for students.
            </p>
          </div>

          {/* Main content area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Task management column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Task creation form */}
              <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-gray-800 shadow-xl p-4 sm:p-6">
                <h2 className="text-xl font-bold text-white flex items-center mb-4">
                  <ListTodo className="mr-2 text-purple-400" size={20} />
                  Create New Study Task
                </h2>

                <form onSubmit={addTask} className="space-y-4">
                  <div>
                    <label
                      htmlFor="task-text"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Task Description
                    </label>
                    <input
                      id="task-text"
                      type="text"
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      placeholder="Enter your study task here..."
                      className="w-full bg-black/40 border border-gray-700 rounded-lg px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="task-category"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Category
                      </label>
                      <select
                        id="task-category"
                        value={newTaskCategory}
                        onChange={(e) => setNewTaskCategory(e.target.value)}
                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 appearance-none"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23a78bfa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\")",
                          backgroundPosition: "right 0.5rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        <option value="study">Study</option>
                        <option value="assignment">Assignment</option>
                        <option value="exam">Exam Prep</option>
                        <option value="reading">Reading</option>
                        <option value="project">Project</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="task-due-date"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Due Date (Optional)
                      </label>
                      <input
                        id="task-due-date"
                        type="date"
                        value={newTaskDueDate}
                        onChange={(e) => setNewTaskDueDate(e.target.value)}
                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50"
                        style={{
                          colorScheme: "dark",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                      disabled={newTaskText.trim() === ""}
                    >
                      <PlusCircle size={18} className="mr-2" />
                      Add Study Task
                    </button>
                  </div>
                </form>
              </div>

              {/* Task list */}
              <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-gray-800 shadow-xl p-4 sm:p-6">
                <div className="flex flex-wrap items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <CheckCircle className="mr-2 text-blue-400" size={20} />
                    Your Study Tasks
                  </h2>

                  <div className="flex mt-2 sm:mt-0">
                    <button
                      onClick={() => setFilter("all")}
                      className={cn(
                        "px-3 py-1.5 text-sm rounded-l-lg border border-r-0 transition-colors",
                        filter === "all"
                          ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white border-purple-600"
                          : "bg-black/40 text-white border-gray-700 hover:bg-black/60"
                      )}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilter("active")}
                      className={cn(
                        "px-3 py-1.5 text-sm border-y border-x-0 transition-colors",
                        filter === "active"
                          ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-blue-600"
                          : "bg-black/40 text-white border-gray-700 hover:bg-black/60"
                      )}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => setFilter("completed")}
                      className={cn(
                        "px-3 py-1.5 text-sm rounded-r-lg border border-l-0 transition-colors",
                        filter === "completed"
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-600"
                          : "bg-black/40 text-white border-gray-700 hover:bg-black/60"
                      )}
                    >
                      Completed
                    </button>
                  </div>
                </div>

                {/* Task stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4">
                  <div className="bg-purple-900/30 rounded-lg px-3 py-2 border border-purple-500/20">
                    <div className="text-xs text-purple-300">Total Tasks</div>
                    <div className="text-xl font-bold text-white">
                      {totalCount}
                    </div>
                  </div>
                  <div className="bg-green-900/30 rounded-lg px-3 py-2 border border-green-500/20">
                    <div className="text-xs text-green-300">Completed</div>
                    <div className="text-xl font-bold text-white">
                      {completedCount}
                    </div>
                  </div>
                  <div className="bg-blue-900/30 rounded-lg px-3 py-2 border border-blue-500/20">
                    <div className="text-xs text-blue-300">Pending</div>
                    <div className="text-xl font-bold text-white">
                      {pendingCount}
                    </div>
                  </div>
                  <div className="bg-indigo-900/30 rounded-lg px-3 py-2 border border-indigo-500/20">
                    <div className="text-xs text-indigo-300">
                      Completion Rate
                    </div>
                    <div className="text-xl font-bold text-white">
                      {completionRate}%
                    </div>
                  </div>
                </div>

                {/* Task list */}
                <div className="overflow-y-auto custom-scrollbar max-h-[500px]">
                  {filteredTasks.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-sm">
                        {filter === "all"
                          ? "No tasks yet. Add your first study task above!"
                          : filter === "active"
                          ? "No active tasks. All your tasks are completed!"
                          : "No completed tasks yet. Keep studying!"}
                      </p>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {filteredTasks.map((task) => (
                        <li
                          key={task.id}
                          className={cn(
                            "bg-white/5 border rounded-lg transition-all",
                            task.completed
                              ? "border-green-500/30 bg-green-900/10"
                              : "border-white/10 hover:border-purple-500/30"
                          )}
                        >
                          <div className="p-2.5 sm:p-3 md:p-4 flex items-start gap-2 sm:gap-3">
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
                                  onChange={(e) =>
                                    setEditingText(e.target.value)
                                  }
                                  onKeyDown={(e) =>
                                    handleEditKeyPress(e, task.id)
                                  }
                                  onBlur={() => saveEditedTask(task.id)}
                                  autoFocus
                                  className="w-full bg-black/40 border border-purple-500/50 rounded-md px-3 py-1.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50"
                                />
                              ) : (
                                <>
                                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                                    <p
                                      className={cn(
                                        "text-sm break-words max-w-full line-clamp-2 sm:line-clamp-none",
                                        task.completed
                                          ? "text-gray-400 line-through"
                                          : "text-white"
                                      )}
                                      title={task.text}
                                    >
                                      {task.text}
                                    </p>

                                    {task.category && (
                                      <span
                                        className={cn(
                                          "text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full inline-block max-w-[80px] sm:max-w-full truncate",
                                          task.category === "study"
                                            ? "bg-purple-900/50 text-purple-300"
                                            : task.category === "assignment"
                                            ? "bg-blue-900/50 text-blue-300"
                                            : task.category === "exam"
                                            ? "bg-red-900/50 text-red-300"
                                            : task.category === "reading"
                                            ? "bg-green-900/50 text-green-300"
                                            : task.category === "project"
                                            ? "bg-amber-900/50 text-amber-300"
                                            : "bg-gray-900/50 text-gray-300"
                                        )}
                                        title={task.category}
                                      >
                                        {task.category}
                                      </span>
                                    )}
                                  </div>

                                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                                    <span className="flex items-center flex-shrink-0">
                                      <Clock
                                        size={10}
                                        className="mr-0.5 sm:mr-1 sm:size-[12px]"
                                      />
                                      <span className="truncate">
                                        {formatRelativeTime(task.createdAt)}
                                      </span>
                                    </span>

                                    {task.dueDate && (
                                      <span className="flex items-center flex-shrink-0">
                                        <Calendar
                                          size={10}
                                          className="mr-0.5 sm:mr-1 sm:size-[12px]"
                                        />
                                        <span className="truncate">
                                          Due:{" "}
                                          {new Date(
                                            task.dueDate
                                          ).toLocaleDateString()}
                                        </span>
                                      </span>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>

                            <div className="flex space-x-0.5 sm:space-x-1 ml-1">
                              {editingTaskId === task.id ? (
                                <>
                                  <button
                                    onClick={() => saveEditedTask(task.id)}
                                    className="p-0.5 sm:p-1 text-green-400 hover:text-green-300 transition-colors"
                                  >
                                    <Check
                                      size={14}
                                      className="sm:size-[16px]"
                                    />
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
                                    <Pencil
                                      size={14}
                                      className="sm:size-[16px]"
                                    />
                                  </button>
                                  <button
                                    onClick={() => deleteTask(task.id)}
                                    className="p-0.5 sm:p-1 text-red-400 hover:text-red-300 transition-colors"
                                  >
                                    <Trash2
                                      size={14}
                                      className="sm:size-[16px]"
                                    />
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
              </div>
            </div>

            {/* Sidebar content */}
            <div className="space-y-6">
              {/* Benefits card */}
              <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-gray-800 shadow-xl p-4 sm:p-6">
                <h2 className="text-xl font-bold text-white flex items-center mb-4">
                  <Brain className="mr-2 text-purple-400" size={20} />
                  Why Use a Study Task Manager?
                </h2>

                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium text-white">
                        Improved Organization
                      </h3>
                      <p className="text-sm text-gray-300">
                        Keep all your assignments, readings, and exam prep in
                        one centralized location.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Reduced Stress</h3>
                      <p className="text-sm text-gray-300">
                        Stop worrying about forgotten assignments with clear due
                        dates and visual progress tracking.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium text-white">
                        Increased Productivity
                      </h3>
                      <p className="text-sm text-gray-300">
                        Break down large projects into manageable tasks to boost
                        completion rates and motivation.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium text-white">
                        Better Time Management
                      </h3>
                      <p className="text-sm text-gray-300">
                        Prioritize effectively and allocate appropriate time for
                        each academic task.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Tips card */}
              <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-gray-800 shadow-xl p-4 sm:p-6">
                <h2 className="text-xl font-bold text-white flex items-center mb-4">
                  <BookOpen className="mr-2 text-blue-400" size={20} />
                  Study Task Management Tips
                </h2>

                <div className="space-y-4">
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <h3 className="font-medium text-white">
                      Use Categories Effectively
                    </h3>
                    <p className="text-sm text-gray-300 mt-1">
                      Organize tasks by subject or project type to quickly
                      identify related work and create focused study sessions.
                    </p>
                  </div>

                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <h3 className="font-medium text-white">
                      Set Realistic Due Dates
                    </h3>
                    <p className="text-sm text-gray-300 mt-1">
                      Add due dates 1-2 days before actual deadlines to build in
                      buffer time for unexpected challenges.
                    </p>
                  </div>

                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <h3 className="font-medium text-white">
                      Break Down Large Tasks
                    </h3>
                    <p className="text-sm text-gray-300 mt-1">
                      Instead of "Write research paper," create smaller tasks
                      like "Research sources," "Create outline," and "Write
                      introduction."
                    </p>
                  </div>

                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <h3 className="font-medium text-white">Review Daily</h3>
                    <p className="text-sm text-gray-300 mt-1">
                      Spend 5 minutes each morning reviewing your task list and
                      setting priorities for the day.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Content Section */}
          <section className="mt-16 bg-black/60 backdrop-blur-xl rounded-xl border border-gray-800 shadow-xl p-6 sm:p-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-6">
                The Ultimate Study Todo List for Academic Success
              </h2>

              <div className="space-y-6 text-gray-300">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    What Makes a Great Student Task Manager?
                  </h3>
                  <p className="leading-relaxed">
                    A truly effective study todo list goes beyond simple
                    checkboxes. Our student task manager combines
                    academic-focused categories, due date tracking, and progress
                    visualization to create a comprehensive system designed
                    specifically for educational needs. Unlike generic
                    productivity apps, StudyClock's task manager understands the
                    unique challenges students face—from juggling multiple
                    subjects to managing complex project deadlines and exam
                    preparation.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    How to Organize Your Study Tasks Effectively
                  </h3>
                  <p className="leading-relaxed mb-4">
                    Research shows that effective task organization can increase
                    productivity by up to 40%. The key is creating a system that
                    works with your brain's natural tendencies rather than
                    against them. Here's how our study planner helps you
                    implement research-backed organization strategies:
                  </p>

                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="text-white font-medium">
                        Task Categorization:
                      </span>{" "}
                      Group related tasks by subject or project type to reduce
                      context-switching, which research shows can decrease
                      productivity by up to 40%.
                    </li>
                    <li>
                      <span className="text-white font-medium">
                        Visual Progress Tracking:
                      </span>{" "}
                      Our completion rate metrics provide dopamine-triggering
                      feedback that motivates continued progress.
                    </li>
                    <li>
                      <span className="text-white font-medium">
                        Due Date Management:
                      </span>{" "}
                      Prioritize tasks based on deadlines to ensure you're
                      always working on what matters most right now.
                    </li>
                    <li>
                      <span className="text-white font-medium">
                        Task Breakdown:
                      </span>{" "}
                      Convert overwhelming projects into manageable steps that
                      prevent procrastination and build momentum.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    The Science Behind Effective Study Planning
                  </h3>
                  <p className="leading-relaxed">
                    Cognitive research demonstrates that externalizing your
                    academic responsibilities through a dedicated study task
                    organizer reduces cognitive load, freeing up mental
                    resources for actual learning. By maintaining a
                    comprehensive task list, you eliminate the mental energy
                    spent remembering deadlines and instead redirect that energy
                    toward deep work and critical thinking. Additionally, the
                    act of checking off completed tasks triggers dopamine
                    release, creating a positive reinforcement cycle that builds
                    consistent study habits over time.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Integrating Your Study Todo List with Time Management
                  </h3>
                  <p className="leading-relaxed mb-4">
                    The most successful students combine effective task
                    management with strategic time allocation. Our study task
                    manager works seamlessly with StudyClock's timer features to
                    create a complete academic productivity system:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h4 className="font-medium text-white mb-2">
                        Pomodoro Technique Integration
                      </h4>
                      <p className="text-sm">
                        Select a task from your list, then use our Pomodoro
                        timer to work in focused 25-minute intervals with
                        strategic breaks, proven to enhance retention and reduce
                        burnout.
                      </p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h4 className="font-medium text-white mb-2">
                        Time Blocking Strategy
                      </h4>
                      <p className="text-sm">
                        Group similar tasks from your list and allocate specific
                        time blocks using our Study Clock Timer for deep focus
                        on related material.
                      </p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h4 className="font-medium text-white mb-2">
                        Deadline-Driven Focus
                      </h4>
                      <p className="text-sm">
                        Use our Countdown Timer with tasks that have approaching
                        due dates to create productive urgency and ensure timely
                        completion.
                      </p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h4 className="font-medium text-white mb-2">
                        Progress Tracking
                      </h4>
                      <p className="text-sm">
                        Monitor both your task completion rates and total focus
                        time to gain insights into your productivity patterns
                        and make data-driven improvements.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Common Questions About Student Task Management
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-white">
                        How can I create a study planner online that actually
                        works?
                      </h4>
                      <p className="text-sm text-gray-300 mt-1">
                        The most effective online study planners combine task
                        management with time tracking. Our system lets you
                        create categorized tasks with due dates, then seamlessly
                        transition to focused study sessions using our
                        integrated timers. This closed-loop approach ensures you
                        not only plan your work but actually complete it.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-white">
                        What is the best way to manage a study schedule?
                      </h4>
                      <p className="text-sm text-gray-300 mt-1">
                        Research shows that the most effective study schedules
                        combine fixed blocks for recurring commitments (classes,
                        study groups) with flexible blocks that can be allocated
                        to specific tasks from your todo list based on current
                        priorities and energy levels. Our task manager helps you
                        identify what to work on, while our timer suite helps
                        you dedicate focused time to those tasks.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-white">
                        What is the best todo app for students?
                      </h4>
                      <p className="text-sm text-gray-300 mt-1">
                        The ideal student todo app should include
                        academic-specific categories, due date tracking,
                        priority management, and integration with study timers.
                        Unlike general productivity apps, StudyClock's task
                        manager is designed specifically for academic workflows,
                        with features tailored to student needs like exam
                        preparation categories and integration with focus
                        timers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-500/20 text-center">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Start Organizing Your Academic Life Today
                  </h3>
                  <p>
                    Create your first study task above and experience how proper
                    task management can transform your academic performance. Our
                    free student task manager requires no login or
                    downloads—just start adding your assignments, readings, and
                    exam prep to build a comprehensive system for academic
                    success.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </PageLayout>

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
    </>
  );
};

export default StudyTodoList;
