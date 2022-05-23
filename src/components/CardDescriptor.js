import React from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import valid from "card-validator";
import { CardField } from "./CardField";

/**********
* Card Examples:
* 4012888888881881: visa
* 621234567890003: unionpay
* 6011000990139424: discover
* 5555555555554444: masterdard
* 5000000000000000005: maestro
* 378282246310005: american-express
* 3530111333300000: jcb
*******/



  /*******************
  * Card Return
  * 
  {
    "card": {
        "niceType": "Visa",
        "type": "visa",
        "patterns": [
            4
        ],
        "gaps": [
            4,
            8,
            12
        ],
        "lengths": [
            16,
            18,
            19
        ],
        "code": {
            "name": "CVV",
            "size": 3
        },
        "matchStrength": 1
    },
    "isPotentiallyValid": true,
    "isValid": true
}
  */

function createData(name, display, value) {
  return { name, display, value };
}

export function CardDescriptor() {
  let [cardNumber, setCardNumber] = React.useState("");
  let [showCardNumber, setShowCardNumber] = React.useState(false);

  const showCardNumberHandler = () => {
    setShowCardNumber(!showCardNumber);
  }
  const descriptor = valid.number(cardNumber);
  let niceType;
  let type;
  let codeName;
  let codeSize;
  let { /*isPotentiallyValid,*/ isValid } = descriptor;
  if(isValid){
    niceType = descriptor.card.niceType;
    type = descriptor.card.type;
    codeName = descriptor.card.code.name;
    codeSize = descriptor.card.code.size;
  }
  const rows = [
    createData('niceType', 'Display', niceType),
    createData('cardNumber', 'Card Number', cardNumber),
    createData('type', 'Type', type),
    createData('codeName', 'Code', codeName),
    createData('codeSize', 'Code Size', codeSize),
    // createData('isPotentiallyValid', isPotentiallyValid ? "true" : "false"),
    createData('isValid', 'Is Valid?', isValid ? "true" : "false"),
  ];

  return (
  <>
    <AppBar
      position="fixed"
      sx={{ width: { sm: `100%` } }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Card Descriptor
        </Typography>
      </Toolbar>
    </AppBar>
    <Box component="main" sx={{ flexGrow: 1, p: 1, width: { sm: `auto`, md: 500 } }}>
      <Toolbar />
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { mt: 1, mb: 1, width: "100%" },
        '& .MuiPaper-root': { mt: 1, mb: 1 },
      }}
      noValidate 
      autoComplete="off">
          <Typography variant="h6" gutterBottom component="div"> Card </Typography>
          <CardField 
            sx={{marginLeft: 0}}
            label="Card Number"
            size="small" 
            value={cardNumber}
            showCardNumber={showCardNumber}
            showCardNumberHandler={showCardNumberHandler}
            onChange={(e) => setCardNumber(e.target.value)} 
            />

          <Typography variant="h6" gutterBottom component="div"> Card Info </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }} size="small">

              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.display}
                    </TableCell>
                    <TableCell>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Box>
    </Box>
  </>
  );
}