import React from 'react';
import Button from 'react-bootstrap/Button';

interface BtnProps {
  variant: string;
  handleClick?: () => void;
  text: string;
}
const Btn = (props: BtnProps) => {
  return (
    <Button type='submit' variant={props.variant}>
      {props.text}
    </Button>
  );
};

export default Btn;
