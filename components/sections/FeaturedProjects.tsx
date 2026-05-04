import ProjectCard from "@/components/ui/ProjectCard";
import fs from "fs";
import path from "path";

async function getFeaturedProjects() {
  const filePath = path.join(process.cwd(), "data", "projects.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const projects = JSON.parse(jsonData);
  return projects.filter((p: any) => p.featured).slice(0, 3);
}

export default async function FeaturedProjects() {
  const projects = await getFeaturedProjects();

  return (
    <section className="container mx-auto px-4 md:px-8 max-w-6xl mb-32">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-3xl md:text-4xl font-playfair italic text-[#F0EDE6] tracking-wide">
          Featured Work
        </h2>
        <a
          href="/projects"
          className="text-[#A8DADC] font-jetbrains text-sm hover:text-[#F5A623] transition-colors flex items-center gap-2"
        >
          View All <span className="text-[#F5A623]">&rarr;</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: any) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}
