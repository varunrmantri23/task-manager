import { useState } from 'react'

function TaskForm({ onAddTask }) {
  // form state for the two input fields
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [showError, setShowError] = useState(false) // track validation error

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // check if title is empty and show error
    if (!title.trim()) {
      setShowError(true)//if empty set error true and thus change color
      return
    }
    
    // clear error state if validation passes
    setShowError(false)
    
    onAddTask({ title, description })//pass to parent
    
    // clear the form after successful submission
    setTitle('')
    setDescription('')
  }

  // clear error when user starts typing
  const handleTitleChange = (e) => {
    setTitle(e.target.value)
    if (showError && e.target.value.trim()) {
      setShowError(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Add New Task</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* task title input - required field with error state */}
        <div>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={handleTitleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              showError 
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
            // required -- this can also work but i have added custom error 
          />
          {/* error message */}
          {showError && (
            <p className="text-red-500 text-sm mt-2">
              Task title is required
            </p>
          )}
        </div>
        
        {/* description textarea - optional */}
        <div>
          <textarea
            placeholder="Add more details (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* submit button - shows different state based on form validity */}
        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 ${
            title.trim() 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Task
        </button>
      </form>
    </div>
  )
}

export default TaskForm