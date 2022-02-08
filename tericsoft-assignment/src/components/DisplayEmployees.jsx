import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/* HERE I AM DISPLAY THE EMPLOYEE DETAIL IN THE FORM OT TABLES */

export  function DisplayEmployees(props) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          {/* HERE IS THE ONE TABLE ROW ALONG WITH  TABLE COLUMN NAME*/}
          <TableRow>
            <TableCell>Employee Names</TableCell>
            <TableCell align="left">Email Id</TableCell>
            <TableCell align="left">Phone Numbers</TableCell>
            <TableCell align="left">Genders</TableCell>
            <TableCell align="left">Date of Birth</TableCell>
            <TableCell align="left">Hobbies</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {/* HERE I AM GETTING DATA FROM THE JSON SERVER DB.JSON I AM LOOP OVER THE DATA
              AND DISPLAY BELOW */}
            {props.data.map(e=><TableRow key={e.id}>
                <TableCell component="th" scope="row">
                {e.Name}
              </TableCell>
              <TableCell align="left">{e.email}</TableCell>
              <TableCell align="left">{e.phone}</TableCell>
              <TableCell align="left">{e.gender}</TableCell>
              <TableCell align="left">{e.dob}</TableCell>
              <TableCell align="left">{Object.keys(e.hobbies).join(" ")}</TableCell>
            </TableRow>)
            }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
