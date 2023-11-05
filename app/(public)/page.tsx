import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
      <div className={`container mx-auto px-10`}>
        <h1 className={`mb-5 text-6xl font-semibold text-center px-10`}>
          An excellent substitute for WordPress and Medium for creating and
          managing blogs.
        </h1>
        <h3 className={`mb-3 text-4xl  text-center px-10 text-gray-400`}>
          Powerblog takes care of the SEO and speed optimization, so you can
          stay in the creative zone, leaving the setup and maintenance worries
          behind!
        </h3>
      </div>
    </main>
  );
}
