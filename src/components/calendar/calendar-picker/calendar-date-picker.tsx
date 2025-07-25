import React, { FunctionComponent, useState, useEffect } from "react";
import CalendarDetails from "../calendar-detail/calendar-detail"
import { SelectedMonth } from "./calendar-month-picker";
import MonthGestion from "../../../helpers/month-gestion";
import GetRequests from '../../../services/getters'


type Props = {
    monthInfos: SelectedMonth,
    handleChangeSelectedDate: (newVal: number) => void
}
type DateInfo = {
    laBilleShowId: number,
    date: string,
    status: string,
    isShowFull: boolean
}


const CalendarDatePicker: FunctionComponent<Props> = ({monthInfos, handleChangeSelectedDate}) => {
    const [selectedMonthInfos, setSelectedMonthInfos] = useState<SelectedMonth>(monthInfos)// props heritée du 
    const [allDatesOfMonth, setAllDatesOfMonth] = useState<string[][]>(MonthGestion.getCalendarWeeksFromMonthNumber(selectedMonthInfos.monthNumber, selectedMonthInfos.yearNumber))
    const [datesInfos, setDatesInfos] = useState<DateInfo[]>([])
    const [dateClicked, setDateClicked] = useState<number | null>(null)
    
    // update of the dates and DateInfo to display in calendar
    useEffect(() => {
        setSelectedMonthInfos(monthInfos);
        updateDatePicker(monthInfos)
    }, [monthInfos])

    const updateDatePicker = async(monthData: SelectedMonth) => {
        const allDatesOfConcernedMonth = MonthGestion.getCalendarWeeksFromMonthNumber(monthData.monthNumber, monthData.yearNumber)
        const newDatesInfos: DateInfo[] = await GetRequests.getDataInfos(allDatesOfConcernedMonth[0][0], allDatesOfConcernedMonth[allDatesOfConcernedMonth.length-1][6])//(allDatesOfConcernedMonth[0], allDatesOfConcernedMonth[allDatesOfConcernedMonth.length-1]);
        setAllDatesOfMonth(allDatesOfConcernedMonth)
        setDatesInfos(newDatesInfos)
    }
    const setClassForDate = (dateInfos: DateInfo | undefined) => {
        let classToReturn = `col s1 waves-effect rowDate`
        // isnt in actual month
        if(!dateInfos || !isDateOnActualMonth(dateInfos.date)) return classToReturn
        // is today
        if (MonthGestion.isDateToday(new Date(dateInfos.date))) classToReturn += ' today'
        // status
        if(dateInfos.status === 'ferme') classToReturn += ' closedDate'
        else if(dateInfos.status === 'normale') classToReturn += ' normalDate'
        else if(dateInfos.status === 'reunion') classToReturn += ' reunionDate' 
        else if(dateInfos.status === 'soiree') classToReturn += ' soireeDate' 
        return classToReturn
    }
    const displayWeeksInCalendar = (weeksArray: string[][]) => {
        console.log("week :: ", weeksArray)
        return weeksArray.map((week: string[], weekIndex: number) => {
            return (<div className="row" key={weekIndex}>
                {week.map((date: string, dateIndex: number) => {
                    console.log("date::: ", datesInfos)
                    const dateInfos: DateInfo | undefined = datesInfos ? datesInfos.find((info: DateInfo) => info.date === date) : undefined
                    return (
                    <div 
                        key={dateIndex}
                        className={setClassForDate(dateInfos)}
                        onClick={(e) => {
                            e.preventDefault() 
                            if(dateInfos && isDateOnActualMonth(dateInfos.date)) handleClickOnDate(dateInfos.laBilleShowId)
                        }}
                        >
                        {new Date(date).getDate()}
                        { (dateInfos && isDateOnActualMonth(dateInfos.date) && !dateInfos.isShowFull) ? <p className="needSomeOne">!</p> : null }             
                    </div>
                    )
                })}
            </div>)
        })
    }
    const isDateOnActualMonth = (givenDate: string): boolean => {
        const date: Date = new Date(givenDate)
        return (date.getMonth() + 1 === selectedMonthInfos.monthNumber)
    }
    const handleClickOnDate = (idShow: number) => { //, status: string, date: string, isShiftFull: boolean) => {
        handleChangeSelectedDate(idShow)
    }
    return (
        <div id='calendarContainer'>
            <div className='row dayRow'>
                <div className="col s1 waves-effect waves-light #37474f blue-grey darken-3 dayName">Lundi</div>
                <div className="col s1 waves-effect waves-light #37474f blue-grey darken-3 dayName">Mardi</div>
                <div className="col s1 waves-effect waves-light #37474f blue-grey darken-3 dayName">Mercredi</div>
                <div className="col s1 waves-effect waves-light #37474f blue-grey darken-3 dayName">Jeudi</div>
                <div className="col s1 waves-effect waves-light #37474f blue-grey darken-3 dayName">Vendredi</div>
                <div className="col s1 waves-effect waves-light #37474f blue-grey darken-3 dayName">Samedi</div>
                <div className="col s1 waves-effect waves-light #37474f blue-grey darken-3 dayName">Dimanche</div>
            </div>
            { displayWeeksInCalendar(allDatesOfMonth) }
        </div>
    )
}

export default CalendarDatePicker