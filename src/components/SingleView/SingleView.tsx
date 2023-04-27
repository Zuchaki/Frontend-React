import React from 'react'
import style from './SingleView.module.scss'
import {RiCake2Line} from 'react-icons/ri';

interface Props{
    name:string;
    age:number;
    birth:string;
    cv: string;
}
const ViewsBox:React.FC<Props> = ({name, age, birth, cv}) => {

    return(
        <>
            {/*Container defining columns*/}
            <div className={style.container}>

                {/*Column 1 - name*/}
                <div className={style.name}>
                    {name}
                </div>

                {/*Column 2 - row witch 2 elements: 1. age 2. cake icon */}
                <div className={style.ageContainer}>
                        <span className={style.age}>{age}</span>
                        <RiCake2Line size={36} color={"#a83a5f"}/>
                </div>

                {/*Column 3 - birth date*/}
                <div className={style.birth}>{birth}</div>

                {/*Column 4 - cv*/}
                <div className={style.cv}>
                    {cv}
                </div>
            </div>
        </>
    )
}
export default ViewsBox;