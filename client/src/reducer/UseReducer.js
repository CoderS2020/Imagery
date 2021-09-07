export const initialState=null;

export const reducer=(state,action)=>{
    if(action.type==='USER'){
        return action.payload;
    }
    

    return state;
}


export const reducer1=(state,action)=>{
    if(action.type==='INPUT'){
        return action.payload;
    }

    return state;
}



