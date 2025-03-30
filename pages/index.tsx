import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";

export default function Home() {
  return (
    <div className="min-h-screen parallax-gradient">
      <div className="parallax-content">
        <Seo
          title="Software Engineer"
          description="Software Engineer specializing in data engineering and cloud architecture. Currently working at Microsoft on scalable solutions using Scala, Spark Streaming, and Azure technologies."
          openGraphImage="/profile.jpeg"
        />
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="md:flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Daniel Fullerton
                </h1>
                <h2 className="text-2xl text-gray-600 mb-6">
                  Software Engineer
                </h2>
                <div className="prose max-w-none text-gray-600 mb-6">
                  <p className="mb-4">
                    I&apos;m a software engineer at Microsoft specializing in
                    data engineering and cloud architecture. Currently, I work
                    on the Commerce team where I develop scalable solutions for
                    customer invoice aggregation using Scala, Spark Streaming,
                    and Azure technologies. I combine traditional software
                    engineering with modern AI tooling to deliver efficient,
                    high-quality code.
                  </p>
                  <p>
                    My journey includes building retail operations applications
                    at T-Mobile using Java Spring microservices and Angular, and
                    developing talent management platforms at Randstad using
                    TypeScript, Node.js, and Google Cloud Platform. With a
                    Bachelor&apos;s in Computer Science, I bring a solid
                    foundation in software engineering principles and a track
                    record of delivering impactful solutions across different
                    technology stacks.
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

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Technologies & Skills
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Languages
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Scala",
                      "Java",
                      "C#",
                      "Go",
                      "JavaScript",
                      "TypeScript",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Frameworks & Libraries
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Spring Framework",
                      ".NET",
                      "NestJS",
                      "Next.js",
                      "Angular",
                      "React",
                      "React Native",
                      "GraphQL (Hot Chocolate)",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Big Data & Streaming
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Apache Spark",
                      "Spark Streaming",
                      "Azure Synapse Analytics",
                      "Azure HDInsight",
                      "Azure Data Factory",
                      "Databricks",
                      "Google BigQuery",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Cloud Platforms
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Microsoft Azure",
                      "Amazon Web Services (AWS)",
                      "Google Cloud Platform (GCP)",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Cloud Services (Azure)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Azure App Service",
                      "Azure SQL Database",
                      "Azure Storage",
                      "Azure Event Hubs",
                      "Microsoft Entra ID",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Databases & Search
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "MongoDB",
                      "Elasticsearch",
                      "Azure SQL Database",
                      "Google BigQuery",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-6">
              <Link
                href="https://github.com/danielfullerton"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com/in/daniel-frank-fullerton"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
              <Link
                href="mailto:dan.frank.fullerton@gmail.com"
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
