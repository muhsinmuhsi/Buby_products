const Reducer=(state,action)=>{
    switch(action.type){
        case 'add':
            return [...state,action.cartitem]
        case 'remove':
            
        case 'increase':

        case 'decrease':

        default:
            state;
    }

}
export default Reducer;