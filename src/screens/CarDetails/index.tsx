import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';


// import speedSvg from '../../assets/speed.svg'; 
// import accelerationSvg from '../../assets/acceleration.svg'; 
// import forceSvg from '../../assets/force.svg'; 
// import gasolineSvg from '../../assets/gasoline.svg'; 
// import exchangeSvg from '../../assets/exchange.svg'; 
// import peopleSvg from '../../assets/people.svg'; 
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'; 

import { CarDTO } from '../../dtos/CarDTO';
//import { Car } from '../../database/model/Car';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Acessories,
  Footer
} from './styles';


interface Params {
  car: CarDTO;
}

export function CarDetails(){

  const navigation = useNavigation();

  const route = useRoute();
  const { car } = route.params as Params;
  
  function handleConfirmRental(){
    // enviar o car, como parametro
    navigation.navigate('Scheduling', { car })
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack}/>
      </Header>
        <CarImages>
          <ImageSlider imagesUrl ={car.photos}/>
        </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          
          <Rent>
          <Period>{car.period}</Period>
            <Price>R$ {car.price} </Price>
          </Rent>
        </Details>

        <Acessories>
          {/* <Accessory name="380km/h" icon={speedSvg}/>           */}
          {
            car.accessories.map(accessory => (
              <Accessory 
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
        </Acessories>

        <About>
          {car.about}
        </About>

      </Content>
    
      <Footer>
          <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
      </Footer>

    </Container>

  );
}