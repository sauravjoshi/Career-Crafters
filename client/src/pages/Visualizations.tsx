import React from 'react';
interface VisualizationCardProps {
  title: string;
  src: string;
  description: string;
  className: string;
  height: string;  // New property for dynamic height
}

const Visualizations: React.FC = () => {
  const cards = [
    { title: "Comparison Match Distances", src: "/comparison_match_distances.html", description: "Explore how match distances vary across different data points.", className: "col-span-2", height: "h-96" },
    { title: "Geo Coordinates", src: "/geo_coordinates.html", description: "View the geographic distribution of data points on a map.", className: "col-span-2", height: "h-96" },
    { title: "Geo Remote Onsite", src: "/geo_remote_onsite.html", description: "Analyze the ratio of remote to onsite jobs across different areas.", className: "col-span-2", height: "h-96" },
    { title: "Heat Map", src: "/heatmap.html", description: "Examine the intensity of data across different zones with a heat map.", className: "col-span-2", height: "h-80" },
    { title: "Visualization 6", src: "/top_skills_plot.png", description: "Analytical review of top skills required across industries.", className: "col-span-4", height: "h-80" },
    { title: "Visualization 7", src: "/top_skills_top_job_titles.png", description: "Correlation between top skills and job titles.", className: "col-span-4", height: "h-lvh" },
    { title: "Visualization 8", src: "/t-SNE.png", description: "t-SNE visualization for dimensionality reduction analysis.", className: "col-span-2", height: "h-lvh" },
    { title: "Geo Prevalent Jobs", src: "/geo_prevalent_jobs.html", description: "Discover which jobs are most prevalent in various regions.", className: "col-span-2", height: "h-lvh" },
  ];

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-12">Visualizations</h1>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <VisualizationCard
            key={index}
            title={card.title}
            src={card.src}
            description={card.description}
            className={card.className}
            height={card.height}
          />
        ))}
      </div>
    </div>
  );
};

const VisualizationCard: React.FC<VisualizationCardProps> = ({ title, src, description, className, height }) => {
  const handleIframeLoad = (event: any) => {
    const iframe = event.target;
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    // Create a <style> tag within the iframe
    const styleElement = doc.createElement("style");
    styleElement.type = 'text/css';
    styleElement.innerHTML = `g.infolayer g.legend { display: none; }`; // Your CSS here
    doc.head.appendChild(styleElement);
};

  return (
    <div className={`bg-white p-4 shadow rounded-lg ${className}`}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mb-4 text-gray-600">{description}</p>
      <iframe src={src} className={`w-full ${height}`} style={{ border: "none" }} onLoad={handleIframeLoad}></iframe>
    </div>
  );
};

export default Visualizations;
