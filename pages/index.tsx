import Head from "next/head";

import {
    Anchor,
    Avatar,
    Box,
    Table,
    TableHeader,
    TableRow,
    TableCell,
    TableBody,
    Text
  } from "grommet";
  
import { Github, Slack } from "grommet-icons";

export async function getStaticProps(context) {
    const res = await fetch('http://localhost:60563/users');
    const users = await res.json();
  
    return {
      props: { users } 
    };
}
  
export default function Home({ users }) {
  
    return (
        <Box
            flex
            margin={{ horizontal: "auto" }}
            width={{ max: "xlarge" }}
            height={{ min: "100%" }}
        >
            <Head>
            <title>Ambire DOA - Leaderboard</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell><Text color="heading-text">Name</Text></TableCell>
                        <TableCell><Text color="heading-text">XP</Text></TableCell>
                        <TableCell><Text color="heading-text"># of Quests</Text></TableCell>
                        <TableCell><Text color="heading-text">Roles</Text></TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow style={{backgroundColor: "#1E2134", borderBottom: "15px solid #24263D"}}>
                            <TableCell>
                                {user.name}
                            </TableCell>
                            <TableCell>
                                {user.xp}
                            </TableCell>
                            <TableCell>
                                {user.numberOfQuests}
                            </TableCell>
                            <TableCell>
                                {user.roles.map((role) => (
                                    role.name+", "
                                ))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}