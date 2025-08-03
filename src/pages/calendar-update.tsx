import { useState, useEffect } from "react";
import { FunctionComponent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShowHandler from "../models/show";
import Shift from "../models/shifts";
import GetRequests from "../services/getters";
import './css/calendar-details.css';
import UpdateShiftsContainer from "../components/calendar/calendar-update/shifts-container/update-shifts-container";
import UpdateShow from "../components/calendar/calendar-update/update-show";
import UserConnexion from "../helpers/user-connexion";

const CalendarUpdate: FunctionComponent = () => {
    const { idShow } = useParams<{idShow: any}>()
    const [showInfos, setShowInfos] = useState<ShowHandler>(null!)
    const [isShiftSectionOpen, setIsShiftSectionOpen] = useState<boolean>(false)
    const naviguate = useNavigate()

    useEffect(() => {
        if(!UserConnexion.iAmConnected()) naviguate(`/login`)
        if(UserConnexion.myAdminLevel() >= 3) naviguate(`/calendar`)
        setInfos()
    }, [])
     useEffect(() => {
        setInfos()
    }, [idShow])

    const handleCloseUpdate = () => {
        naviguate(`/calendar/details/${showInfos.laBilleShowId}`, { replace: true })
    }

    const setInfos = async() => {
        try{
            if(!idShow) throw new Error()
            const formatedId: number = parseInt(idShow) 
            const dataOfShow: any = await getShowInfos(formatedId)  
            if(dataOfShow) setShowInfos(dataOfShow)
            else throw new Error()
        }catch(err){
            //console.log("erreur getShowInfos")
        } 
    }
    const getShowInfos = async (idShow: number): Promise<ShowHandler> => {
        const rawData: ShowHandler | null = await GetRequests.getDateInfos(idShow)
        //console.log("rawData ::: ", rawData)
        if (!rawData) throw new Error("Aucune donnée reçue")
        return rawData
    }
    /*
    const updateAllShifts = async(newShifts: Shift[] | null): Promise<void> => {
        const updatedShow: ShowHandler = await showInfos.updateAllShifts(newShifts)
        setShowInfos(updatedShow)
    } */
    return (
        !showInfos ? null : 
        <div id="CalendarDetails">
            <div id="header-update-buttons">       
                <button onClick={handleCloseUpdate} className="close-update-bt">X</button>
            </div>
            { /* Title => "Vendredi 9 Janvier2025" */ }
            <div className='title1'>{ showInfos ? showInfos.formatDateLabel() : '...' }</div> 
            <UpdateShow givenShow={showInfos} />
            { UserConnexion.myAdminLevel() === 1 ? <UpdateShiftsContainer idShow={showInfos.laBilleShowId} showInfos={showInfos} /> : null }
        </div>
    )
}
export default CalendarUpdate