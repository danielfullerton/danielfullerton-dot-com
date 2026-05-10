import { technologies } from "../data/technologies";

interface SkillSectionProps {
  title: string;
  items: string[];
}

const SkillSection = ({ title, items }: SkillSectionProps) => (
  <div>
    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{title}</h4>
    <div className="flex flex-wrap gap-2">
      {items.map((tech) => (
        <span
          key={tech}
          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
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
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Technologies & Skills
      </h3>
      <div className="space-y-6">
        <SkillSection title="What I work with daily" items={technologies.currentFocus} />
        <SkillSection title="Shipped to production" items={technologies.productionExperience} />
        <SkillSection title="Hands-on experience" items={technologies.familiarWith} />
      </div>
    </div>
  );
}
