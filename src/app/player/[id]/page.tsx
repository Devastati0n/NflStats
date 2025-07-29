import { prisma } from '@/app/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image'
import "../../shared/player_id.css" 
import PlayerTabs from '@/app/components/player/player_tabs';



interface PlayerPageProps {
  params: { id: string };
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const player = await prisma.player.findUnique({
    where: { id: params.id },
  });

  if (!player) {
    return notFound();
  }

  return (

  <> 
  <div className="top-line" />
   <main className="main">
     <div className="flex-container"> 
      
      <div className="data-container"> 
       <h1>{player.name}</h1>
       <p>Position: {player.position}</p>
       <p>Number: #{player.number}</p>
       <p>Team: {player.teamId}</p>
      </div>
      
    <div className="playerstats-image-container">
    <Image 
    src="/player_photos/cooper_dejean.jpg" 
    alt="Cooper DeJean"
    fill
    style={{ objectFit: "cover" }}
    />

    </div>
    </div> 
    <PlayerTabs playerId={player.id} />
    </main>

  </> 
  );
}
