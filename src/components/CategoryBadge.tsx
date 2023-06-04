import { memo } from 'react';
import { Modal, Form, Button, Badge } from 'react-bootstrap';

interface Props {
  category: string;
  color: string;
  setCategory: (category: string) => void;
}

const CategoryBadge: React.FC<Props> = ({ category, color, setCategory }) => {
  return (
    <Badge className='CategoryBadge m-1' bg={color} onClick={() => setCategory(category)}>
      {category}
    </Badge>
  );
};

export default memo(CategoryBadge);
