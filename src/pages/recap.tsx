import { FunctionComponent, useState } from "react";
import CalendarMonthPicker from "../components/calendar/calendar-picker/calendar-month-picker";

const Recap: FunctionComponent = () => {
    const [selectedDate, setSelectedDate] = useState<number | null>(null)

    const handleChangeSelectedDate = (newValue: number): void => {
        setSelectedDate(newValue)
    }
    return (
        <div id="recap-component">
            <h4>Récap</h4>
            <CalendarMonthPicker handleChangeSelectedDate={handleChangeSelectedDate} source='recap' />
        </div>
    )
}

export default Recap