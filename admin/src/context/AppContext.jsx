import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props)=>{

    const ageCalculate = (dob)=>{
       

        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()
        return age 

    }

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

    const slotDateFormat = (slotDate) => {
  
      const dateArray = slotDate.split('_')
      return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const value={    // whatver we are passing it in here value , we cal access it anywhere
         ageCalculate , slotDateFormat
    }


    return (

        <AppContext.Provider value={value}>
                {props.children}
        </AppContext.Provider>
    )


}


export default AppContextProvider