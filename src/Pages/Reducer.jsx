// const Reducer=(state,action)=>{
//     switch(action.type){
//         case 'add':
//             return [...state,action.cartitem]
//         case 'remove':
            
//         case 'increase':

//         case 'decrease':

//         default:
//             state;
//     }

// }
// export default Reducer;











// //fetchwishlist
// const wldata=async(id)=>{
//     const response= await axios.get(https://jsoneserver.onrender.com/user/${usersid})
//      setwlitem(response.data.wishlist)
//   }
//   useEffect(()=>{
//   wldata()
//   },[])
  
//   //addtowishlist
  
//   const wishlists=async(data)=>{
//     const response= await axios.get(https://jsoneserver.onrender.com/user/${usersid})
//     const wlist=response.data.wishlist
//      const wlitems=wlist.find((item)=>item.id===data.id)
//      if(wlitems ){
//       const res=wlitem.filter((item)=>item.id!=wlitems.id)
//       await axios.patch(https://jsoneserver.onrender.com/user/${usersid},{wishlist:res})
//       wldata()
//       toast.warning("removed from wishlist")
//     }else{
//       const upd=[...wlist,data]
//      await axios.patch(https://jsoneserver.onrender.com/user/${usersid},{wishlist:upd})
//      toast.success("product add to wishlist")
//      wldata()
//      
//      }
  
//   }