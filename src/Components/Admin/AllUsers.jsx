import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import { notify } from '../toastUtils';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FiUserX } from "react-icons/fi";
import { FiUserCheck } from "react-icons/fi";





const AllUsers = () => {
  const [allusers,setallusers]=useState([])
  const [isblock,setisblock]=useState(false)

  useEffect(()=>{
   getusers();
  },[isblock])


async function getusers(){
  const tocken=localStorage.getItem('tocken')
  try{
    const response= await axios.get("http://localhost:5000/api/admin/viewAllUsers",{
      headers:{
        Authorization:`${tocken}`
      }
    })
    setallusers(response.data)
    console.log(response.data,'this is data from getusers');
    
  }catch(err){
    console.log("error to fetch users",err);
  }
   
   }

  // const removeHandle=async(id,name)=>{
  //  const userId=localStorage.getItem("id")
  //   try{
  //     if(userId!==id){
  //       await axios.delete(`http://localhost:3000/users/${id}`)
  //       setallusers( allusers.filter ((itmes)=> itmes.id !== id))
  //       notify(`${name} removed success fully`,"success")
  //     }else{
  //       notify("this is you ","warn")
  //     }
    
  //   }catch(err){
  //     console.log(err,"error  remove user");
      
  //   }


    //----
 const handleUnblock=async (id)=>{
  const tocken=localStorage.getItem('tocken')
  Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, block it!'
  }).then(async (result) => {
    if(result.isConfirmed){
      Swal.fire('unBlocked!', 'Your file has been unBlock.', 'success');
      try {
        const isunblock=await axios.put(`http://localhost:5000/api/admin/user/unblock/${id}`,{},{
          headers:{
            Authorization:`${tocken}`
          }
        })

        notify('unBlocked','success')
        setisblock(!isblock)
      } catch (error) {
        console.log('error to unblock user',error);
      }  
    }
  })
 }


    const handleBlock = async (id, name) => {
      const tocken=localStorage.getItem('tocken')
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, block it!'
      }).then(async (result) => { // Make the inner function async
        if (result.isConfirmed) {
          // Proceed with deletion
          Swal.fire('Blocked!', 'Your file has been Blocked.', 'success');  
          try {
             const isblock= await axios.put(`http://localhost:5000/api/admin/user/block/${id}`,{},{
              headers:{
                Authorization:`${tocken}`
              }
             });
              notify(`${name} blocked successfully`, "success");
              setisblock(!isblock)
          } catch (err) {
            console.log(err, "error blocking user");
          }
        }
      });
    };
    
    



    //----
  // }

  const Tablehead=["ID","User","Email","image","","",""]
  return (
    <div>
<Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow >
              {Tablehead.map((items)=>(
               <TableCell
                ><b>{items}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {allusers.map((items)=>(
              <TableRow hover role="checkbox" tabIndex={-1} >
                        <TableCell>
                          {items._id}
                        </TableCell>
                        <TableCell>
                          {items.username}
                        </TableCell>
                        <TableCell>
                          {items.email}
                        </TableCell>
                        <TableCell>
                          <img src={items.image} alt={items.username}  className='w-10 rounded-2xl'/>
                        </TableCell>
                        <TableCell>
                          {items.isDeleted?
                          <Button className='bg-blue-500 hover:bg-blue-700' onClick={()=> handleUnblock(items._id)}><FiUserX /></Button>
                          :
                          <Button className='bg-blue-500 hover:bg-blue-700' onClick={()=> handleBlock(items._id,items.name)} ><FiUserCheck /></Button>
                          }
                        </TableCell>
                        <TableCell>
                       <Link to={`/Userdetails/${items._id}`} ><Button className='bg-blue-500 hover:bg-blue-700'>Details</Button></Link>
                        </TableCell>
                  </TableRow>
            ))}
                  
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    </div>
  )
}

export default AllUsers



// --------------------------



// interface Column {
//   id: 'name' | 'code' | 'population' | 'size' | 'density';
//   label: string;
//   minWidth?: number;
//   align?: 'right';
//   format?: (value: number) => string;
// }

// const columns: readonly Column[] = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toFixed(2),
//   },
// ];

// interface Data {
//   name: string;
//   code: string;
//   population: number;
//   size: number;
//   density: number;
// }

// function createData(
//   name: string,
//   code: string,
//   population: number,
//   size: number,
// ): Data {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];

// export default function StickyHeadTable() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                     {columns.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }
