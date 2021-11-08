import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, StatusBar, Button } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { database } from '../../database';
import { api } from '../../services/api';

import Logo from '../../assets/logo.svg';
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { Car as ModelCar } from '../../database/model/Car';
import { Load } from '../../components/Load'

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton
} from './styles';


export function Home(){

  //const [cars, setCars] = useState<CarDTO[]>([]);
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();

  const navigation = useNavigation();


  // const carData = {
  //   brand: 'AUDI',
  //   name: 'RS 5 Coupé',
  //   rent: {
  //       period: 'AO DIA',
  //       price: 120,
  //   },
  //   thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
  // }

  function handleCarDetails(car: CarDTO){
    navigation.navigate('CarDetails', { car })
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt })   => {
        const  response = await api
        .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)

        const { changes, latestVersion } = response.data;

        // console.log(".:# BackEnd para o App #:.");
        // console.log(changes);

        return { changes, timestamp: latestVersion }

      },
      pushChanges: async ({ changes }) => {
         console.log(".:# App para o BackEnd #:.");
         console.log(changes);
        const user = changes.users;
        await api.post('/users/sync', user );
      },
    });
  }

useEffect( () => {
  let isMounted = true;

  async function fetchCars() {
    try {
      // acessa a tabela de carros
      const carCollection = database.get<ModelCar>('cars'); 
      // fetch é para pegar todos
      const cars = await carCollection.query().fetch();

      if( isMounted ){
        setCars(cars);
      }
    } catch (error) {
      console.log(error);
    } finally {
      if( isMounted ) {
        setLoading(false);
      }
    }
  }
  fetchCars();
  return() => {
    // Aqui desmonta o uso do isMounted
    isMounted = false;
  };
},[]);

  /** aula 16 pede pra deletar 
  useEffect(()=>{

    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await  api.get('/cars');
        if( isMounted ){
          setCars(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if( isMounted ) {
          setLoading(false);
        }
      }
    }
    fetchCars();
    return() => {
      // Aqui desmonta o uso do isMounted
      isMounted = false;
    };
  },[]);
 */

  /** aula 16 pede pra deletar
  useEffect(() => {
    if(netInfo.isConnected){
      Alert.alert('Você está On-Line');
    } else {
      Alert.alert('Você está Of-line');
    }
  },[netInfo.isConnected]);
 */

  return (
    <Container>
        <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Header>
          <HeaderContent>
            <Logo 
              width =  {RFValue(108)}
              height = {RFValue(12)}
            />
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          </HeaderContent>
        </Header>

          <Button title="Sincronizar" onPress={offlineSynchronize} />

         { loading ? <Load /> :
          <CarList 
            data={cars}
            keyExtractor={ item => item.id}
            renderItem={({ item }) => 
              <Car data={ item }
                onPress={() => handleCarDetails(item)}
              />}
          />
          }

    </Container>
  );
}
