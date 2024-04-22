import React from 'react';

interface VisualizationCardProps {
    title: string;
    src: string;
    height: string;
  }

const Visualizations: React.FC = () => {
  return (
    <div className="p-8 text-black min-h-screen">
      <h1 className="text-2xl font-bold">Visualizations</h1>
      <div className="grid grid-cols-1 gap-8 mt-8">
        <VisualizationCard title="Comparison Match Distances" src="/comparison_match_distances.html" height="500px" />
        <VisualizationCard title="Geo Coordinates" src="/geo_coordinates.html" height="500px" />
        <VisualizationCard title="Geo Prevalent Jobs" src="/geo_prevalent_jobs.html" height="500px" />
        <VisualizationCard title="Geo Remote Onsite" src="/geo_remote_onsite.html" height="550px" />
        <VisualizationCard title="Heat Map" src="/heatmap.html" height="500px" />
      </div>
    </div>
  );
};

const VisualizationCard = (visProps: VisualizationCardProps) => {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <h2 className="font-semibold text-xl">{visProps.title}</h2>
      </div>
      <iframe src={visProps.src} title={visProps.title} style={{ height: visProps.height, width: '100%' }} sandbox="allow-scripts allow-same-origin" className="border-none" />
    </div>
  );
};

export default Visualizations;
