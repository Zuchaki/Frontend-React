import { Birth } from "../models";

const useBirthDateToAge = (): ((birth:Birth) => number) => {

    const calculateAge = (birth:Birth):number => {
        let today:Date = new Date();
        let age = today.getFullYear() - birth.year;
        let m = (today.getMonth()+1) - birth.month;
        if (m < 0 || (m === 0 && today.getDate() < birth.day)) {
            age--;
        }
        return age;
    }

    return calculateAge;
}

export default useBirthDateToAge;