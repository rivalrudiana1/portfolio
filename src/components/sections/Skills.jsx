import Badge from '../ui/Badge';

const skillsData = [
  {
    category: "Languages & Core",
    skills: ["PHP 8.2", "JavaScript", "HTML5/CSS3", "TypeScript"]
  },
  {
    category: "Frameworks & Libs",
    skills: ["Laravel 11", "React.js", "Vite", "Tailwind CSS", "Express.js"]
  },
  {
    category: "Databases",
    skills: ["MySQL", "PostgreSQL"]
  },
  {
    category: "Architecture & Logic",
    skills: ["Fuzzy Matching", "Time-Overlap Query", "Predictive Algorithms (WMA/ROP)", "Data Normalization", "RESTful APIs"]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-white border-y border-ulbi-silver/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-ulbi-blue mb-4 tracking-tight">Core Expertise & Tech Stack</h2>
          <p className="text-ulbi-blue/70 text-lg max-w-2xl mx-auto font-light">
            Teknologi dan konsep fundamental yang saya gunakan untuk membangun solusi tangguh dan efisien.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillsData.map((group, index) => (
            <div key={index} className="bg-ulbi-grey/30 p-6 rounded-2xl border border-ulbi-silver hover:border-ulbi-orange transition-colors shadow-sm">
              <h3 className="text-xl font-semibold text-ulbi-blue mb-6 flex items-center gap-2">
                <span className="w-8 h-px bg-ulbi-orange/50"></span>
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, idx) => (
                  <Badge key={idx} variant="default">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
