import styled from 'styled-components/native';

interface Props {
    active: boolean;
}

export const Container = styled.View<Props>`
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