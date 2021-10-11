import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { generateInterval } from './generateInterval';
import { ptBR } from './localeConfig';

import { 
    Calendar as CustomCalendar,
    LocaleConfig,
    DateCallbackHandler
} from 'react-native-calendars';

LocaleConfig.locales['pt-br'] = ptBR;
// {
    // monthNames: ['Janeiro','Fevereiro','Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro','Outubro', 'Novembro', 'Dezembro'],
    // monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    // dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta', 'Sábado'],
    // dayNamesShort: ['DOM','SEG','TER','QUA','QUI','SEX','SÁB'],
    // today: 'Hoje'
// }

LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDateProps {
    [date: string] : {
        color: string;
        textColor: string;
        disable?: boolean;
        disableTouchEvent?: boolean;
    },
}

interface DayProps {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
}

interface CalendarProps {
    markedDates: MarkedDateProps;
    onDayPress: DateCallbackHandler;
}

function Calendar({ markedDates, onDayPress } : CalendarProps){

    const theme = useTheme();

    return (
        <CustomCalendar 
            renderArrow = {( direction ) =>
                <Feather 
                    size={24}
                    color={theme.colors.text}
                    name={direction == 'left' ? 'chevron-left' : 'chevron-right'}
                />
            }

            headerStyle = {{
                backgroundColor: theme.colors.background_secundary,
                borderBottomWidth: 0.5,
                borderBottomColor: theme.colors.text_detail,
                paddingBottom: 10,
                marginBottom: 10
            }}

            theme = {{
                textDayFontFamily: theme.fonts.secundary_400,
                textDayHeaderFontFamily: theme.fonts.secundary_500,
                textDayHeaderFontSize: 10,
                textMonthFontFamily: theme.fonts.secundary_600,
                textMonthFontSize: 20,
                monthTextColor: theme.colors.title,
                arrowStyle: {
                    marginHorizontal: -15
                }
            }}

            firstDay={1}
            minDate = { new Date()}
            markingType = "period"
            markedDates = {markedDates}
            onDayPress = { onDayPress }
        />    
    );
}


export {
    Calendar,
    MarkedDateProps,
    DayProps,
    generateInterval
}