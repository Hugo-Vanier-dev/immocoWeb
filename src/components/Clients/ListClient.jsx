import React from 'react';
import ClientService from '../../shared/services/client.service';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

/*
const useStyles = makeStyles({
  table: {
    minWidth: 300,
    maxWidth: 800
  },
});

state{
  id:,
  firstname:"",
  lastname:"",
  mail:"",
  cellphone:"",
  phone:"",
  streetNumber:"",
  zipCode:"",
  city:"",
  streetName:"",
  birthdate:"",
  description:"",
  archive:"",
  client_type_id:
}

function clientName = (firstname, lastname)=> {
  return { 'firstname, lastname' };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
];

function BasicTable() {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Lastname</TableCell>
            <TableCell align="right">firstname</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.lastname}</TableCell>
              <TableCell align="right">{row.firstname}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
*/

function ListClient() {

  React.useEffect(() => {
    ClientService.getAll().then(res => {
      console.log(res.data)
    })
  }, [])

  return(
    <div className="m-2">

    </div>
  );
}
export default ListClient;