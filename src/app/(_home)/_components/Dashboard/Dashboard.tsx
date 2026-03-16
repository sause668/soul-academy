import Link from "next/link";

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link href='/decks'>
                <button className='btn'>Decks</button>
            </Link>
        </div>
    );
}