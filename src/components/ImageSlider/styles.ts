import styled from 'styled-components/native';

import { Dimensions } from 'react-native';

interface ImageIndexProps {
    active: boolean;
}

export const Container = styled.View`
    width: 100%;
`;

export const ImageIndexes = styled.View`
    flex-direction: row;
    align-self: flex-end;
    padding-right: 24px;
`;

export const ImageIndex = styled.View<ImageIndexProps>`
    /* tamanho das bolinhas */
    width: 6px;
    height: 6px;

    /* Se o active estive como true aplica colors.title */
    background-color: ${({ theme , active }) =>
        active ? theme.colors.title : theme.colors.shape
    };

    /* o espaçamento entre o pontinhos */
    margin-left: 8px;
    border-radius: 3px;
`;

export const CarImageWrapper = styled.View`
    /* Para pegar a largura da tela e fazer o movto */
    width: ${Dimensions.get('window').width}px;
    height: 132px;

    justify-content: center;
    align-items: center;
`;

export const CarImage = styled.Image`
    /* medida da imagem do carro */
    width: 280px;
    height: 132px;
`;
