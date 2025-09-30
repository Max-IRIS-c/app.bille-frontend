import { FunctionComponent, useEffect, useState } from "react";
import GetRequests from "../../services/getters";
import MonthGestion from "../../helpers/month-gestion";
import './recap.css'
  type Props = {
       dataOfMonth: any
  }
  const RecapDetails: FunctionComponent<Props> = ({ dataOfMonth }) => {
  const [userList, setUserList] = useState<any[]>([])
  const [dayList, setDayList] = useState<number[]>([])

  useEffect(() => {
    const setData = async () => {
      const daysOfMonth = MonthGestion.getDaysInMonth(
        dataOfMonth.yearNumber,
        dataOfMonth.monthNumber
      )
      const allUsers = await GetRequests.getAllUsers()
      setUserList(allUsers)
      setDayList(daysOfMonth)
    }
    setData()
  }, [dataOfMonth])

  return (
    <div id="recap-details-component">
        <table>
            <thead>
                <tr>
                    <td className="userCase"></td>
                    { 
                        dayList.map((day: number) => (
                            <div className="subCase">         
                                <td className="case date">{day}</td><br/>
                                <tr>
                                    <th>Shift</th>
                                    <th>Ouverture</th>
                                    <th>Fermeture</th>
                                </tr>
                            </div>
                        ))
                    }
                </tr>
            </thead>
            {userList.map((user: any) => (        
                <tbody>   
                    <tr>   
                        <th className="userCase">{user.login}</th>
                        {
                            dayList.map((day: number) => (
                                <>         
                                    <td className="case">.</td>
                                </>
                            ))
                        }          
                    </tr>
                </tbody>
            ))}      
        </table>
    </div>
  )
}
export default RecapDetails
/*import { FunctionComponent, useEffect, useState } from "react";
import GetRequests from "../../services/getters";
import MonthGestion from "../../helpers/month-gestion";
import { tr } from "date-fns/locale";

type Props = {
    dataOfMonth: any
}

const RecapDetails: FunctionComponent<Props> = ({ dataOfMonth }) => {
    const [userList, setUserList] = useState<any>()
    const [monthData, setMonthData] = useState<any>(dataOfMonth)
    const [dayList, setDayList] = useState<any>()

    useEffect(() => {
        const setData = async () => {
            const daysOfMonth = MonthGestion.getDaysInMonth(dataOfMonth.yearNumber, dataOfMonth.monthNumber)
            const allUsers = await GetRequests.getAllUsers()
            setUserList(allUsers)
            setDayList(daysOfMonth)
        }
        setData()
    }, [dataOfMonth])

    useEffect(() => {
        const displayData = async () => {
            return (
                <>{
                    userList.map((user: any) => {
                        return(
                            <table>
                                {
                                    dayList.map((day: number) => {
                                        return(
                                            <tr>
                                                <th>{user.login}</th>
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                        )
                    })   
                }</>
            )
        }    
        displayData()
    }, [userList, dayList])
    return (
        <div id="recap-details-component">

        </div>
    )
}
export default RecapDetails
*/