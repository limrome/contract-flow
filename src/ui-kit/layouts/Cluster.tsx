import styled from 'styled-components';

interface ICluster {
    justify?: string;
    align?: string;
    space?: string;
    wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
    ref?: HTMLElement;
}

export const Cluster = styled.div<ICluster>`
    display: flex;
    flex-wrap: ${({ wrap }) => wrap};
    gap: ${({ space }) => space};
    justify-content: ${({ justify }) => justify};
    align-items: ${({ align }) => align};
`;