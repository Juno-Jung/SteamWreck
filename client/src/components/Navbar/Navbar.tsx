import * as React from 'react'
import styled from 'styled-components';
import steamwrecked from './steamwrecked.png';

const Navbar = (props: {
  steamid:string,
  isAuth:boolean,
  company: { name: string; to: string },
  links: Array<{ name: string, to: string }>
}) => {
  const { company, links, isAuth } = props;
  const NavLinks: any = () => isAuth ? links.slice(1).map((link: { name: string, to: string }) => <Li key={link.name}><a href={link.to}>{link.name}</a></Li>)
  : links.slice(0,2).map((link: { name: string, to: string }) => <Li key={link.name}><a href={link.to}>{link.name}</a></Li>)


  return (
    <div>
      <NavbarMenu>
        <div className="logo">
          <Logo src={steamwrecked} alt="Logo"/>
          <Company href={company.to+((props.steamid) ? `#steamid=${props.steamid}` : '')}>{company.name}</Company>
        </div>
        <Ul>
          <NavLinks />
        </Ul>
      </NavbarMenu >
    </div>
  )
};


const Theme = {
  colors: {
    bg: `#fff`,
    dark: `#24292e`,
    light: `#EEEEEE`,
    red: `#ff5851`,
  },
  fonts: {
    body: `IBM Plex Sans, sans-serif`,
    heading: `IBM Plex Sans, sans-serif`,
  }
}


const Logo = styled.img`
  max-width: 100px;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 5px;
`;


const NavbarMenu = styled.nav`
  background: ${Theme.colors.dark};
  font-family: ${Theme.fonts.heading};
  color: ${Theme.colors.light};
  display: flex;
  align-items: center;
  justify-content: space-between;
  a { color: white; text-decoration: none; }`;

  const Company = styled.a`
  font-weight: bold;
  margin-left: 1rem;
  padding-right: 1rem;
  align-items: center;
  `;

  const Ul = styled.ul`
  overflow-x:hidden;
  display: flex;
  flex-wrap: nowrap;
  /* overflow-x: hidden; */
  -webkit-overflow-scrolling: touch;`;

const Li = styled.li`
  flex: 0 0 auto;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  color: #999;
  height: 100%;
  justify-content: center;
  text-decoration: none;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  color: #999;
  display: flex;
  font-size: 14px;
  height: 50px;
  justify-content: center;
  line-height: 16px;
  margin: 0 1.125rem ;
  text-decoration: none;
  white-space: nowrap;`;


export default Navbar;
