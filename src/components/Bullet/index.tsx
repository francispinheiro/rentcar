import React from 'react';
import { boolean } from 'yup';

import {
  Container
} from './styles';

interface Props {
  active?: boolean;
}

export function Bullet({ active = false}:Props){
  return (
    <Container active={active}/>
  );
}