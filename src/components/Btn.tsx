import React from 'react';
import Button from 'react-bootstrap/Button';

interface BtnProps {
  variant: string;
  handleClick?: () => void;
  text: string;
}
const Btn: React.FC<BtnProps> = ( {variant, text}) => {
  return (
    <Button type='submit' variant={variant}>
      {text}
    </Button>
  );
};

export default Btn;
