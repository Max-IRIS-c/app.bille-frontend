import { FunctionComponent, useEffect, useState } from "react";
import Shift from "../../../../models/shifts";
import './css/update-add-shift.css'

type Props = {
    handleAddNewShift: (newShift: Shift, type: string) => void,
    fkShow: number,
    indexToPut: number,
    typeToPut: string,
    startTimeToPut: string | null,
}

const AddShift: FunctionComponent<Props> = ({ fkShow, indexToPut, typeToPut, startTimeToPut, handleAddNewShift}) => {
    const [shiftToAdd, setShiftToAdd] = useState<Shift>(null!)
    
    useEffect(() => {
        const updatedNewShift: Shift = new Shift(
            0, 
            fkShow, 
            typeToPut, 
            2, 
            startTimeToPut ?? "20:00", 
            '00:00', 
            indexToPut,
        )
        setShiftToAdd(updatedNewShift)
    }, [fkShow, indexToPut, startTimeToPut, indexToPut])

    const addShift = (newShift: Shift) => {
        handleAddNewShift(newShift, shiftToAdd.type)
    }
    return (
        <div id="add-shift-container-bt">
            <button id="add-shift-bt" onClick={() => addShift(shiftToAdd)}>+ Ajouter Shift</button>
        </div>
    )
}
export default AddShift