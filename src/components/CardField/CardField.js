import React from 'react';
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';
 

export function CardField (props) {
  /**
   * <InputMask
  mask="(0)999 999 99 99"
  value={this.state.phone}
  onChange={this.onChange}
>
  {() => <TextField />}
</InputMask>
   */
  const imProps = {}
  const tfProps = {};
  for(const key in props){
    if(["value", "onChange", "mask", "maskChar"].includes(key)) 
      imProps[key] = props[key];
    else tfProps[key] = props[key];
  }
  return (
  <InputMask mask="9999 - 9999 - 9999 - 9999" maskChar=" " {...imProps}>
    {() => <TextField {...tfProps}/>}
  </InputMask>);
}