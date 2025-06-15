import { useState } from 'react'
import TaskForm from './components/TaskForm'
import FilterButtons from './components/FilterButtons'
import TaskList from './components/TaskList'
import { useTasks } from './hooks/useTasks'

function App() {
  const { 
    tasks, 
    addTask, 
    toggleTask, 
    deleteTask,
    clearCompleted 
  } = useTasks()
  
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const tasksPerPage = 5

  // filter tasks based on current selection
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'incomplete') return !task.completed
    return true
  })

  // pagination stuff - honestly could be cleaner but works
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage)
  const startIndex = (currentPage - 1) * tasksPerPage
  const endIndex = startIndex + tasksPerPage
  const currentTasks = filteredTasks.slice(startIndex, endIndex)

  // go back to first page when switching filters
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
    setCurrentPage(1)
  }

  const completedCount = tasks.filter(t => t.completed).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* left side with the svg and stats */}
          <div className="lg:sticky lg:top-6">
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Task Tracker
              </h1>
              <p className="text-lg text-gray-600">
                Stay organized and get things done efficiently
              </p>
            </div>
            
            <div className="flex justify-center lg:justify-start">
              <img 
                src="/Notes-pana.svg" 
                alt="Task management illustration" 
                className="w-full max-w-md h-auto"
              />
            </div>
            
            {/* simple stats cards */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-orange-600">{tasks.length - completedCount}</div>
                <div className="text-sm text-gray-600">Remaining</div>
              </div>
            </div>
          </div>

          {/* right side - actual task management */}
          <div className="space-y-6">
            <TaskForm onAddTask={addTask} />
            
            <FilterButtons 
              filter={filter}
              onFilterChange={handleFilterChange}
              tasks={tasks}
              onClearCompleted={clearCompleted}
            />
            
            <TaskList 
              tasks={currentTasks}
              filter={filter}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              totalTasks={filteredTasks.length}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default App