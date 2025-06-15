function FilterButtons({ filter, onFilterChange, tasks, onClearCompleted }) {
  // calculate how many tasks are in each category
  const getTaskCounts = () => ({
    all: tasks.length,
    incomplete: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  })

  const counts = getTaskCounts()
  const completedCount = counts.completed

  const getButtonClass = (filterKey) => {

    //eg getButtonClass('complete') -> returns styling as bg-green-500 and baseclass common to all
    const baseClass = "px-4 py-2 rounded-lg font-medium transition-colors"
    
    if (filter === filterKey) {
      switch (filterKey) {
        case 'all': return `${baseClass} bg-blue-500 text-white`
        case 'incomplete': return `${baseClass} bg-orange-500 text-white`
        case 'completed': return `${baseClass} bg-green-500 text-white`
        default: return `${baseClass} bg-gray-500 text-white`
      }
    }
    
    return `${baseClass} bg-gray-200 text-gray-700 hover:bg-gray-300`
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex gap-2 flex-wrap items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => onFilterChange('all')}
            className={getButtonClass('all')}
          >
            All ({counts.all}) 
          </button> 
          {/* eg. all(5) */}
          <button
            onClick={() => onFilterChange('incomplete')}
            className={getButtonClass('incomplete')}
          >
            Incomplete ({counts.incomplete})
          </button>
          <button
            onClick={() => onFilterChange('completed')}
            className={getButtonClass('completed')}
          >
            Completed ({counts.completed})
          </button>
        </div>
        
        {/* only show clear button when there are completed tasks and not on incomplete tab */}
        {completedCount > 0 && filter !== 'incomplete' && (
          <button
            onClick={onClearCompleted}
            className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors text-md"
          >
            Clear Completed ({completedCount})
          </button>
        )}
      </div>
    </div>
  )
}

export default FilterButtons