import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import { Alert, StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';

import { useTheme } from 'styled-components';

import ArrowSvg from '../../assets/arrow.svg';



import { getPlatformDate } from '../../utils/getPlatformDate';
import { CarDTO } from '../../dtos/CarDTO';

import { 
     Calendar, 
     DayProps,
     generateInterval,
     MarkedDateProps,
    } from '../../components/Calendar';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';
import { Button } from '../components/Button';

interface RentalPeriod {
    //start: number;    foi desabilitado pelo professor na aula
    startFormatted: string;
    //end: number;      foi desabilitado pelo professor na aula
    endFormatted: string;
}

interface Params {
    car: CarDTO;
}

export function Scheduling(){

    const [ lastSelectedDate, setLastSelectedDate ]  = useState<DayProps>({} as DayProps);
    const [ markedDates, setMarkedDates ] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [ rentalPeriod, setRentalPeriod ] = useState<RentalPeriod>({} as RentalPeriod);

    const theme = useTheme();
    const navigation = useNavigation();

    const route = useRoute();
    const { car } = route.params as Params;



    function handleConfirmRental(){
        // if( !rentalPeriod.startFormatted || !rentalPeriod.endFormatted ){
        //     Alert.alert('Selecione o intervalo para alugar.');
        // } else {}

        navigation.navigate('SchedulingDetails',{
            car,
            dates: Object.keys(markedDates)
        });
        
    }

    function handleBack() {
        navigation.goBack();
    }

      
    function  handleChangeDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if(start.timestamp > end.timestamp){
            start = end;
            end = start;
        }

        setLastSelectedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        // Pegando a primeira data do intervalo
        const firstDate = Object.keys(interval)[0];
        // Pegando a ultima data do intervalo
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            //start: start.timestamp,
            //end: end.timestamp,
            startFormatted: format( getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format( getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
         })
    }

  return (
    <Container>
        <Header>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <BackButton 
                onPress={ handleBack }
                color={theme.colors.shape}
                />

            <Title>
                Escolha uma {'\n'}
                data de início e {'\n'}
                fim do aluguel
            </Title>

            <RentalPeriod>

                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue selected={!!rentalPeriod.startFormatted}>
                        {rentalPeriod.startFormatted}
                    </DateValue>
                </DateInfo>

                <ArrowSvg/>

                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValue selected={!!rentalPeriod.endFormatted}>
                        {rentalPeriod.endFormatted}
                    </DateValue>
                </DateInfo>

            </RentalPeriod>

        </Header>

            <Content>
                <Calendar 
                    markedDates = {markedDates}
                    onDayPress = {handleChangeDate}
                />
            </Content>
 
        <Footer>
            <Button title="Confirmar" 
                onPress={handleConfirmRental}
                enabled={!!rentalPeriod.startFormatted}
            />
       </Footer>

    </Container>
  );
}