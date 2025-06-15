function TaskItem({ task, onToggle, onDelete }) {
  // format date to something readable
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={`p-3 border rounded-lg transition-colors ${
      task.completed 
        ? 'bg-green-50 border-green-200' 
        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
    }`}>
      <div className="flex items-start gap-3">
        {/* checkbox*/}
        <div className="flex-shrink-0 mt-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
          />
        </div>
        
        {/* task title */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium text-sm ${
            task.completed 
              ? 'text-green-700 line-through' 
              : 'text-gray-800'
          }`}>
            {task.title}
          </h3>
          
          {/* description only shows if it exists -- conditional rendering*/}
          {task.description && (
            <p className={`mt-1 text-xs ${
              task.completed 
                ? 'text-green-600 line-through' 
                : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}
          
          {/* timestamp */}
          <div className="flex items-center gap-1 mt-2">
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-gray-500">
              {formatDate(task.createdAt)}
            </p>
          </div>
        </div>
        
        {/* delete button */}
        <div className="flex-shrink-0">
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem