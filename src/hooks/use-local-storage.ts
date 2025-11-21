import { useState, useEffect, useCallback } from 'react'

/**
 * A hook that provides localStorage-based state management with automatic serialization.
 * Used as a fallback when Spark KV storage is not available.
 * 
 * @param key - The localStorage key to use
 * @param initialValue - The initial value if no stored value exists
 * @returns A tuple of [value, setValue] similar to useState
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Get initial value from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return initialValue
    }
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Update localStorage when value changes
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        return
      }
      
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = typeof value === 'function' ? (value as (prev: T) => T)(storedValue) : value
        
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  // Listen for changes in other tabs/windows
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return
    }
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        try {
          // Handle deletion events by resetting to initial value
          if (e.newValue === null) {
            setStoredValue(initialValue)
          } else {
            setStoredValue(JSON.parse(e.newValue))
          }
        } catch (error) {
          console.warn(`Error parsing storage event for key "${key}":`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, initialValue])

  return [storedValue, setValue]
}
