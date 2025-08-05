import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="absolute top-0 z-20 w-full px-6 py-4 flex justify-between items-center text-green-400 font-semibold text-lg">
      <Link href="/">Home</Link>
      <div className="space-x-8">
        <Link href="/pages/About">About Us</Link>
        <Link href="/pages/UpComingEvents">Upcoming Events</Link>
        <Link href="/pages/UpComingEvents">Gallary</Link>
      </div>
    </nav>
  );
}
