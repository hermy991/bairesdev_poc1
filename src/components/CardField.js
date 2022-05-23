import React from 'react';
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import valid from "card-validator";
import CreditCardIcon from '@mui/icons-material/CreditCard';

import AmexIcon from './icons/Amex.js';
import DinersClubIcon from './icons/DinersClub.js';
import DiscoverIcon from './icons/Discover.js';
import EloIcon from './icons/Elo.js';
// import GenericIcon from './icons/generic.js';
import JcbIcon from './icons/Jcb.js';
import MaestroIcon from './icons/Maestro.js';
import MastercardIcon from './icons/Mastercard.js';
import UnionPayIcon from './icons/UnionPay.js';
import VisaIcon from './icons/Visa.js';

const defaultIcons = {
  visa: <VisaIcon />,
  mastercard: <MastercardIcon />,
  'american-express': <AmexIcon />,
  'diners-club': <DinersClubIcon />,
  discover: <DiscoverIcon />,
  jcb: <JcbIcon />,
  unionpay: <UnionPayIcon />,
  maestro: <MaestroIcon />,
  elo: <EloIcon />,
  hiper: <CreditCardIcon />,
  hipercard: <CreditCardIcon />,
  generic: <CreditCardIcon />
}

 

export function CardField ({ sx, label, size, value, mask = "9999 - 9999 - 9999 - 9999", maskChar = " ", showCardNumber, onChange, showCardNumberHandler, icons = {} }) {
  value = (value || "").replace(/[^0-9]/ig, "");
  const imProps = { value, mask, maskChar, onChange };
  const tfProps = { sx, label, size };
  const pProps = { ...tfProps, value, onChange };
  const descriptor = valid.number(value);
  let { /*isPotentiallyValid,*/ isValid } = descriptor;
  for(const key in icons) {
    defaultIcons[key] = icons[key];
  }
  let type;
  let icon;
  if(isValid){
    type = descriptor.card.type;
    icon = defaultIcons[type] || <CreditCardIcon />;
    console.log({"defaultIcons[type]": defaultIcons[type]});
  }
  console.log({icon});
  // const mask = [/[0-9]{4}/, " - ", /[0-9]{4}/, " - ", /[0-9]{4}/, " - ", /[0-9]{7}/];
  return (
    <> 
    { showCardNumber
      ? <InputMask {...imProps}>
          {() => <TextField {...tfProps} 
                  InputProps={{
                    endAdornment: <> 
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="card brand"
                                        edge="end" >
                                        {icon}
                                      </IconButton>
                                    </InputAdornment>
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={showCardNumberHandler}
                                        // onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                      >
                                        <VisibilityOff />
                                      </IconButton>
                                    </InputAdornment>
                                  </>
                  }}
                />
          }
        </InputMask>
      : <TextField {...pProps} 
          type={"password"}
          inputProps={{ maxLength: 16 }}
          InputProps={{ 
            endAdornment: <> 
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="card brand"
                                edge="end" >
                                {icon}
                              </IconButton>
                            </InputAdornment>
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={showCardNumberHandler}
                                // onMouseDown={handleMouseDownPassword}
                                edge="end" >
                                <Visibility />
                              </IconButton>
                            </InputAdornment>
                          </>
          }}
        />
      }
  </>);
}