import { useFormContext } from "react-hook-form";
import { useContext } from "react";
import { CycleContext } from "../..";
import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";

export function NewCycleForm(){
  const { activeCycle } = useContext(CycleContext);
  const { register } = useFormContext()


    return (

      <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestion"
            placeholder="Dê um nome para o seu projeto"
            disabled={!!activeCycle}
            {...register("task")}
            />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            max={60}
            min={5}
            disabled={!!activeCycle}
            {...register("minutesAmount", { valueAsNumber: true })}
            />

          <span>minutos.</span>
        </FormContainer>
    )
}