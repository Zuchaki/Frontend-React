import {DataType, ViewDataRedux} from "../../models"

//Interfaces TypeScript
export interface InitialState{
    data:DataType[];
    key?:number;
}

export interface Action{
    type:string;
    selected:number[];
    add:DataType;
    edit:DataType;
    key:number;
}


//InitialState
const initialState:InitialState = {
    data: [],
    key:2
}


//reducer
const datas = (state:InitialState=initialState, action:Action):InitialState => {

    let newKey:number = state.key || 1;

    switch(action.type){
        case "delete":
            state.data.map(x=>(console.log(x.key)))
            return{
                data: state.data.filter((x) => !action.selected.includes(x.key))
            }
            
        case "add":
            console.log(action.add)
            return{
                data: [...state.data, {...action.add, key:newKey+1}],
                key:newKey+1
            }

        case "edit":
            console.log(action.key)
            const newData = [];
            for (let i = 0; i < state.data.length; i++) {
                const item = state.data[i];

                if (item.key === action.key) {
                    newData.push({ ...action.edit, key: item.key });
                } 
                else {
                    newData.push(item);
                }
            }
            return {
                data: newData,
                key:state.key
            };
            

            default:
                return state;
    }
}

export default datas;