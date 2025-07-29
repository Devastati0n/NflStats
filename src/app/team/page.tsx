
import Link from "next/link";
import Image from 'next/image'
import { Teams as nflTeams } from '@/app/lib/teams2'
import "../shared/teams.css"; 


type TeamGroups = {
[conference:string]:{
  [division:string]: Team[]; 
}; 
}; 



type Team = { 
name:string; 
conference:string; 
division:string; 
id:string;
logo:string; 
}




const groupedTeams = nflTeams.reduce((acc:TeamGroups, team) => {

  if(!acc[team.conference]){ 
    acc[team.conference] = {}; 
  }

  if(!acc[team.conference][team.division]){ 
    acc[team.conference][team.division] = []; 

  }

  acc[team.conference][team.division].push(team); 

  return acc;

}, {} )



//division-grid  <section className="division-grid">
//teams-list   <ul className="teams-list">
//images2 classname for image


const renderTeams = () => { 

  const allDivisions = Object.entries(groupedTeams).flatMap(([conference, division]) => 
    Object.entries(division).map(([division, teams]) => (
      {
        conference, 
        division, 
        teams, 
      }
    ))
  )

  
return ( 
  <section className="division-grid"> 
    {allDivisions.map(({conference, division, teams}) => (
      <div key={`${conference}-${division}`}>
        <h3> {conference} {division} </h3>
        <ul className="teams-list"> 
        {teams.map((team) => (
          
            <li key={team.id}> 
	        <Link href={`/team/${team.id}`}> 
             <Image className="image2" 
             src={team.logo}
             alt={team.name}
             width={60}
             height={60}
             loading="lazy"
             />
            <span>{team.name}</span>	
	        </Link>
            </li>
            
          
          )
        )}
        </ul>
      </div>
    ))}
  </section>
)
}; 


export default function Teams() {
  
  return <div>{renderTeams()}</div>;
  
  }











