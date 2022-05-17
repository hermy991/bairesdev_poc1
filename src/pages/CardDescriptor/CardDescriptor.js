import React from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { CardField } from "../../components/CardField/CardField";


function createData(name, value) {
  return { name, value };
}

/**
 * 1111-2222-3333-4444
 * |
 * | first digit
 */

const getMII = (cardNumber) => {
  cardNumber = cardNumber.replace(/[^0-9]/ig, "");
  if(!cardNumber) return;
  let result = "";
  switch (cardNumber = parseInt(cardNumber.toString()[0])) {
    case 0:
        result = "ISO/TC 68";
        break;
    case 1:
    case 2:
        result = "Airlines";
        break;
    case 3:
        result = "Travel and entertainment and banking/financial";
        break;
    case 4:
    case 5:
        result = "Banking and financial";
        break;
    case 6:
        result = "Merchandising and banking/financial";
        break;
    case 7:
        result = "Petroleum";
        break;
    case 8:
        result = "Healthcare and telecommunications";
        break;
    case 9:
        result = "National assignment";
        break;
    default:
        result = "unknown"
  }
  return result
}


/**
 * 1111-2222-3333-4444
 *  |
 *  | first digit
 */

const getFullType = (cardNumber) => {
  cardNumber = cardNumber.replace(/[^0-9]/ig, "");
  if(!cardNumber) return;
  let result = "unknown";
  result = /^5[1-5][0-9]{14}$/.test(cardNumber) ? result = "MasterCard" 
         : /^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber) ? result = "Visa" 
         : /^3[47][0-9]{13}$/.test(cardNumber) ? result = "American Express" 
         : /^(?:2131|1800|35\d{3})\d{11}$/.test(cardNumber) ? result = "JCB" 
         : /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(cardNumber) ? result = "Diners Club" 
         : /^6(?:011|5[0-9]{2})[0-9]{12}$/.test(cardNumber) && (result = "Discover"
         );
  return result;

}

const checkSum = (cardNumber) => {
  cardNumber = cardNumber.replace(/[^0-9]/ig, "");
  if(!cardNumber) return;
  return cardNumber.slice(cardNumber.length - 1, cardNumber.length);
}

export function CardDescriptor({ drawerWidth, handleDrawerToggle }) {

  let [cardNumber, setCardNumber] = React.useState("");
  const rows = [
    createData('MII', getMII(cardNumber)),
    createData('Type', getFullType(cardNumber)),
    createData('CheckSum', checkSum(cardNumber)),
  ];

  return (
  <>
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }} >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Card Descriptor
        </Typography>
      </Toolbar>
    </AppBar>
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
      <Toolbar />
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate 
      autoComplete="off">
        <div>
          <Typography variant="h6" gutterBottom component="div">
            Card
          </Typography>
          <CardField 
            label="Card Number"
            size="small" 
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            />
        </div>
        <div>
          <Typography variant="h6" gutterBottom component="div">
            Card Info
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }} size="small">

              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>
    </Box>
  </>
  );
}