import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import GasolineSvg from '../../assets/gasoline.svg';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

//import { CarDTO } from '../../dtos/CarDTO';
import { Car as ModelCar } from '../../database/model/Car';


import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

// interface CarData {
//     brand: string;
//     name: string;
//     rent: {
//         period: string;
//         price: number;
//     },
//     thumbnail: string;
// }

interface Props extends RectButtonProps{
    data: CarDTO;
}

export function Car({ data, ...rest }: Props){

const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
        <Details>
            <Brand>{data.brand}</Brand>
            <Name>{data.name}</Name>

            <About>
                <Rent>
                    <Period>{data.period}</Period>
                    <Price>{`R$ ${data.price}`}</Price>
                </Rent>

                <Type>
                    {/* <GasolineSvg /> */}
                    <MotorIcon />
                </Type>
            </About>
        </Details>

        <CarImage 
            source={{ uri: data.thumbnail }} 
            resizeMode="contain"    
        />

    </Container>
  );
}