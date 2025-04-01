import { technologies } from "../data/technologies";

interface SkillSectionProps {
  title: string;
  items: string[];
}

const SkillSection = ({ title, items }: SkillSectionProps) => (
  <div>
    <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
    <div className="flex flex-wrap gap-2">
      {items.map((tech) => (
        <span
          key={tech}
          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
);

export default function Skills() {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Technologies & Skills
      </h3>
      <div className="space-y-6">
        <SkillSection title="Languages" items={technologies.languages} />
        <SkillSection
          title="Frameworks & Libraries"
          items={technologies.frameworks}
        />
        <SkillSection
          title="Big Data & Streaming"
          items={technologies.bigData}
        />
        <SkillSection
          title="Cloud Platforms"
          items={technologies.cloudPlatforms}
        />
        <SkillSection
          title="Cloud Services (Azure)"
          items={technologies.azureServices}
        />
        <SkillSection
          title="Databases & Search"
          items={technologies.databases}
        />
      </div>
    </div>
  );
}
