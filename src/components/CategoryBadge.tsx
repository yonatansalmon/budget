import React from 'react';
import { Modal, Form, Button, Badge } from 'react-bootstrap';

interface Props {
  category: string;
  color: string;
  setBalanceEntry: any
}

const CategoryBadge: React.FC<Props> = ({ category, color, setBalanceEntry }) => {
  return (
    <Badge className='CategoryBadge m-1' bg={color} onClick={() => setBalanceEntry((prevBalance: any) => ({ ...prevBalance, category }))}>
      {category}
    </Badge>
  );
};

export default CategoryBadge;
