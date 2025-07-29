import { Teams } from '@/app/lib/teams2';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from "next/link";
import { prisma } from '@/app/lib/prisma';
import "../../shared/again.css"; 


interface TeamPageProps {
  params: { id: string };
}


export default async function TeamPage({ params }: TeamPageProps) {
  const { id } = params;

  const team = await prisma.team.findUnique({
    where: { id },
  });

  if (!team) {
    return <main><p>Team not found.</p></main>;
  }

  const players = await prisma.player.findMany({
    where: { teamId: id },
  });

 
  return (
  <main>
    <h1>{team.name}</h1>
    <img src={team.logoUrl} alt={team.name} width={100} height={100} />

    {players.length === 0 ? (
      <p>No players found for this team.</p>
    ) : (

    <div className="container-players"> 
      <table>
        <thead>
          <tr> 
            <th>Position</th>  
            <th>Player</th>
          </tr>
        </thead>

        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.position}</td>
              
              <td>
              <Link href={`/player/${player.id}`}>{player.name}</Link>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}

  </main>

);
}