import TaskItem from './TaskItem'

function TaskList({ 
  tasks, 
  filter, 
  onToggleTask, 
  onDeleteTask, 
  totalTasks,
  currentPage,
  totalPages,
  onPageChange 
}) {
  
  // show empty state if no tasks match
  if (totalTasks === 0) {
    return (
      <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-gray-500">
          {filter === 'all' ? 'No tasks yet. Add one above!' : `No ${filter} tasks.`}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">
            {filter === 'all' ? 'All Tasks' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks`}
          </h3>
          <span className="text-sm text-gray-500">
            {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'}
          </span>
        </div>
      </div>

      {/* render all tasks for current page */}
      <div className="p-4">
        <div className="space-y-3">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      </div>

      {/* pagination controls - only show if more than one page */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            {/* show current page info */}
            <div className="text-sm text-gray-500">
              Showing {((currentPage - 1) * 5) + 1} to {Math.min(currentPage * 5, totalTasks)} of {totalTasks} tasks
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              {/* individual page buttons */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskList