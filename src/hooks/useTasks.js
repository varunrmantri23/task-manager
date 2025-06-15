import { useState, useEffect } from 'react'

const STORAGE_KEY = 'tasks'

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // load tasks from localStorage on startup
  useEffect(() => {
    const loadTasks = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          // convert date strings back to actual dates
          const withDates = parsed.map(task => ({
            ...task,
            createdAt: new Date(task.createdAt)
          }))
          setTasks(withDates)
        }
      } catch (error) {
        console.error('Error loading tasks:', error)
      } finally {
        setIsLoaded(true)
      }
    }

    loadTasks()
  }, [])

  // save to localStorage whenever tasks change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
      } catch (error) {
        console.error('Error saving tasks:', error)
      }
    }
  }, [tasks, isLoaded])

  const addTask = (taskData) => {
    if (!taskData.title.trim()) return

    const newTask = {
      id: Date.now(), // simple id generation
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      completed: false,
      createdAt: new Date()
    }
    // add new task to front of the list --LIFO
    setTasks(prev => [newTask, ...prev])
  }

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed))
  }

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted
  }
}