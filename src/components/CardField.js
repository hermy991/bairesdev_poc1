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
  const mask = "9999 - 9999 - 9999 - 9999";
  // const mask = [/[0-9]{4}/, " - ", /[0-9]{4}/, " - ", /[0-9]{4}/, " - ", /[0-9]{7}/];
  return (
  <InputMask mask={mask} maskChar=" " {...imProps}>
    {() => <TextField {...tfProps}/>}
  </InputMask>);
}