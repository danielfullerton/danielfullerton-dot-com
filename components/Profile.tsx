import Image from "next/image";

export default function Profile() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="md:flex-1">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Daniel Fullerton
        </h1>
        <h2 className="text-2xl text-gray-600 mb-6">Software Engineer</h2>
        <div className="prose max-w-none text-gray-600 mb-6">
          <p className="mb-4">
            I&apos;m a software engineer at Microsoft specializing in data
            engineering and cloud architecture. Currently, I work on the
            Commerce team where I develop scalable solutions for customer
            invoice aggregation using Scala, Spark Streaming, and Azure
            technologies. I combine traditional software engineering with modern
            AI tooling to deliver efficient, high-quality code.
          </p>
          <p>
            My journey includes building retail operations applications at
            T-Mobile using Java Spring microservices and Angular, and developing
            talent management platforms at Randstad using TypeScript, Node.js,
            and Google Cloud Platform. With a Bachelor&apos;s in Computer
            Science, I bring a solid foundation in software engineering
            principles and a track record of delivering impactful solutions
            across different technology stacks.
          </p>
        </div>
      </div>
      <div className="mb-6 md:mb-0 md:mt-0 md:ml-6 flex-shrink-0 order-first md:order-last">
        <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200 mx-auto">
          <Image
            src="/profile.jpeg"
            alt="Dan Fullerton"
            width={192}
            height={192}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
