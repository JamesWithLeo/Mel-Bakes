import styled from 'styled-components';
import { Link } from 'react-router-dom';



export const Button = styled.button`
  font-size: calc(10px + .4vw);
  padding: .6em 1em;
  border-radius: 3px;
  
  color: ${props => props.theme.fg};
  background-color: ${props => props.theme.bg};
  border: ${props => props.theme.border};
  margin: ${props => props.theme.margin};
  transition: ease-in-out 300ms;
  font-family: 'Redhat';

`
Button.defaultProps = {
  theme: {
    bg : '#424874',
    fg : 'white'
  }
}
export const PrimaryTheme = {
  fg : 'white',
  bg : '#424874',
  border: 'none',
}
export const PrimaryThemeOutline = {
  fg : '#424874',
  bg : 'transparent',
  border : '#424874 .1em solid'
}
// styled
export const GoldButtonTheme = {
  fg : 'goldenrod',
  bg : 'transparent',
  // bg : 'var(--dark-color-000)',
  border : 'goldenrod .1em solid',
  margin : '0em .2em 0em 0em'
}


export const CustomLink = styled(Link)`
  justify-self: center;
  width: max-content;
  height: max-content;
  text-decoration: none;
  font-size: 14px;
  padding: .6em 1.4em;
  border-radius: .2em;
  grid-column: 2;
  grid-row: 5;
  border: #424874 .1em solid;
  transition: ease-in-out 300ms;
  color: ${props => props.theme.fg};
  background-color: ${props => props.theme.bg};
`;
export const Input = styled.input`
  text-decoration : none;
  display: block;
  box-shadow: 0px 0px 370px 16px rgba(166,177,225,0.15) inset;
  outline: none;
  border: none;
  color: var(--dark-color-000);
  padding: 0em 1em;
  border-radius: .2em;
`