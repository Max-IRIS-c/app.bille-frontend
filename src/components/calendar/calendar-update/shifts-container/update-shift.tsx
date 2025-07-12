import { FunctionComponent, useEffect, useState } from "react";
import Shift from "../../../../models/shifts";
import '../css/update-shift.css'
import UpdateShiftUsers from "./update-shift-users";

type Props = {
    shift: Shift
}
type ShiftedUser = {
    idSubscribe: number | null,
    idUser: number,
    username: string
}
const UpdateShift: FunctionComponent<Props> = ({ shift }) => {
    const [actualShift, setactualShift] = useState<Shift>(null!)

    useEffect(() => {
        //console.log("givenSHift ::: ", shift)
        setactualShift(shift)
    }, [])

    const handleChangeStartTime = (newStartTime: string): void =>{
        const updatedShift: Shift = actualShift.changeStartTime(newStartTime)
        setactualShift(updatedShift)
    }
    const handleChangeEndTime = (newEndTime: string): void =>{
        const updatedShift: Shift = actualShift.changeEndTime(newEndTime)
        setactualShift(updatedShift)
    }
    const handleChangeMaxUsers = (newMaxUsers: string) => {
        const updatedShift: Shift = actualShift.changeMaxUsers(newMaxUsers)
        setactualShift(updatedShift)
    }
    
    const handleAddUserToShift = (givenUser: ShiftedUser): void => {  
        const updatedShift: Shift | string = actualShift.addUser(givenUser)
        if(typeof updatedShift === 'string') window.alert(updatedShift)
        else setactualShift(updatedShift)
    }
    const handleRemoveUserFromShift = (givenUser: ShiftedUser): void => {
        const updatedShift: Shift = actualShift.removeUser(givenUser)
        setactualShift(updatedShift)
    }
    return (
        <div id="update-shift-content">
            {
                !actualShift ? null : 
                <>
                    <div className="title-shift">
                        <input type="time" id="startDate" value={actualShift.startTime} onChange={(e) => handleChangeStartTime(e.target.value)} />
                        <p>-</p>
                        <input type="time" id="endDate" value={actualShift.endTime} onChange={(e) => handleChangeEndTime(e.target.value)} />
                    </div>
                    <div id="container-maxUsers">
                        <label htmlFor="maxUsers">Bénévoles attendus</label>
                        <input type="number" id="maxUsers" value={actualShift.maxUsers} onChange={(e) => handleChangeMaxUsers(e.target.value)} />
                    </div>
                    <UpdateShiftUsers 
                        handleAddUserToShift={handleAddUserToShift}  
                        handleRemoveUserFromShift={handleRemoveUserFromShift}
                        users={(actualShift.users.length <= 0) ? null : actualShift.users} 
                    /> 
                </>           
            }
        </div>
    )
}
export default UpdateShift