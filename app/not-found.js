import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center flex-col bg-gray-900 text-yellow-400">
      <h1>Page Not Found – 404!</h1>
      <div>
        <Link href="/" className="underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
