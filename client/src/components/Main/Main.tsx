import React, { FunctionComponent ,useEffect, useState} from 'react';

import Navbar from '../Navbar/Navbar';
import UserSummary from '../UserSummary/UserSummary';
import RecommendationList from '../RecommendationList/RecommendationList';
import serverService from '../../services/ServerService'
import hash from '../../hash'
type MainProps = {
  //
};

const navigation = {
  company: { name: "SteamWreck", to: "/" },
  links: [
    { name: "Login", to: "/login" },
    { name: "About", to: "/about" },
    { name: "FaveWreck", to: "/favourite" },
    { name: "WorstWreck", to: "/worst" },
    { name: "Logout", to: "/logout" },
  ]
};
interface userObj {
  favourites: [];
  personaname: string;
  avatarfull: string;
  countrycode: string;
}
const user: userObj = JSON.parse('{ "personaname": "Test", "countrycode": "CA", "avatarfull": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ec/ecd7f7410cb1c7f59b62bf2355df6269ab8b14e1_full.jpg" }');


const Main: FunctionComponent = () => {
  const [steamid,setSteamid]= useState('')
  const [userInfo,setUserInfo]=useState(user);
  useEffect(() => {
    let steam:any = hash
    console.log(hash)
    setSteamid(steam.steamid)
    serverService.getUserInfo(steam.steamid).then(user=>setUserInfo(user[0]))
  
  }, [])

    const { company, links } = navigation;
    return (
      <div className="Main">
        <Navbar company={company} links={links} />
        <UserSummary user={userInfo} steamid={steamid}/>
        <RecommendationList />
      </div>
    )
};

export default Main;
