import React, { useState, createContext } from "react";

export const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [workoutEnded, setWorkoutEnded] = useState(false);

  return (
    <WorkoutContext.Provider
      value={{
        isWorkoutActive,
        setIsWorkoutActive,
        workoutEnded,
        setWorkoutEnded
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
