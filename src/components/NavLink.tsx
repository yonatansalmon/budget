import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Props {
  link: string,
  label: string,
}

const NavLink: React.FC<Props> = ({link, label}) => {
  const navigate = useNavigate();
  
  return (
    <div className='LinkContainer'>
      <Button variant='info' onClick={() => navigate(`/${link}`)}>{label}</Button>
    </div>
  );
};

export default NavLink;
