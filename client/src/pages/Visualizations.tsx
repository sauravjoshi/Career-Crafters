import React from 'react';

interface VisualizationCardProps {
  title: string;
  src: string;
  description: string;
  styleDelay: number; // Additional prop for animation delay
}

const Visualizations: React.FC = () => {
  const cards = [
    { title: "Comparison Match Distances", src: "/comparison_match_distances.html", description: "Explore how match distances vary across different data points." },
    { title: "Geo Coordinates", src: "/geo_coordinates.html", description: "View the geographic distribution of data points on a map." },
    { title: "Geo Prevalent Jobs", src: "/geo_prevalent_jobs.html", description: "Discover which jobs are most prevalent in various regions." },
    { title: "Geo Remote Onsite", src: "/geo_remote_onsite.html", description: "Analyze the ratio of remote to onsite jobs across different areas." },
    { title: "Heat Map", src: "/heatmap.html", description: "Examine the intensity of data across different zones with a heat map." },
    { title: "Visualization 6", src: "/top_skills_plot.png", description: "Analytical review of top skills required across industries." },
    { title: "Visualization 7", src: "/top_skills_top_job_titles.png", description: "Correlation between top skills and job titles." },
    { title: "Visualization 8", src: "/t-SNE.png", description: "t-SNE visualization for dimensionality reduction analysis." },
    { title: "Visualization 9", src: "/visualization_9.html", description: "Advanced data interaction in a dynamic environment." }
  ];

  return (
    <div className="p-8 text-black min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-12">Visualizations</h1>
      <div className="grid grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <VisualizationCard
            key={index}
            title={card.title}
            src={card.src}
            description={card.description}
            styleDelay={index * 0.1} // Staggered animation delay
          />
        ))}
      </div>
    </div>
  );
};

const VisualizationCard = ({ title, src, description, styleDelay }: VisualizationCardProps) => {
  return (
    <a href={src} target="_blank" className="block transform transition duration-500 hover:scale-105 hover:shadow-2xl" style={{
      animation: `spiralIn 0.8s ${styleDelay}s both` // Applying animation with delay
    }}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="font-semibold text-xl text-gray-800">{title}</h2>
          <p className="text-gray-600 text-sm mt-2">{description}</p>
        </div>
      </div>
    </a>
  );
};

export default Visualizations;
