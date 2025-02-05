import { createContext, ReactNode, useReducer, useState } from "react";
import { ActionTypes, Cycle, CyclesReducers } from '../reducers/cycles'

interface createCycleData {
  task: string;
  minutesAmount: number;
}

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentlyCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: createCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CycleContext = createContext({} as CycleContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(CyclesReducers,
    {
      cycles: [],
      activeCycleId: null,
    }
  );

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentlyCycleAsFinished() {
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: {
        activeCycleId,
      },
    });
  }

  function createNewCycle(data: createCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE,
      payload: {
        newCycle,
      },
    });

    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: {
        activeCycleId,
      },
    });
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentlyCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}
