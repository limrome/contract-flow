import styled from 'styled-components';

interface IStack {
    space?: string;
    stretch?: boolean;
}

export const Stack = styled.div<IStack>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    ${({ stretch }) => stretch && 'height: 100%;'}

    & > * {
        margin-top: 0;
        margin-bottom: 0;
    }

    & > * + * {
        margin-top: ${({ space }) => space};
    }
`;