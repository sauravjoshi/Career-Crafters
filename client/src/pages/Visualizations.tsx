import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const frameStyle = {
  width: '100%',
  height: '500px',
  border: 'none',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const frameStyle1 = {
  width: '100%',
  height: '900px',
  border: 'none',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const frameStyle2 = {
  width: '100%',
  height: '550px',
  border: 'none',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const sectionStyle = {
  marginBottom: '32px',
  padding: '20px',
  backgroundColor: '#f0f8ff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};


const Visualizations: React.FC = () => {
  return (
    <div className="p-8" style={{ backgroundColor: '#87CEEB', color: '#000', minHeight: '100vh' }}>
      <h1 className="text-2xl font-bold">Visualizations</h1>
      <p className="mt-2">This page will display various data visualizations.</p>
      {/* Viz eMB */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Comparison Match Distances</h2>
        <ComparisonMatchDistances />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Geo Coordinates</h2>
        <GeoCoordinates />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Geo Prevalent Jobs</h2>
        <GeoPrevalentJobs />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Geo Remote Onsite</h2>
        <GeoRemoteOnsite />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Heat Map</h2>
        <HeatMap />
      </div>
    </div>
  );
};

const ComparisonMatchDistances = () => <iframe src="/comparison_match_distances.html" title="Comparison Match Distances" style={frameStyle} sandbox="allow-scripts allow-same-origin" />;
const GeoCoordinates = () => <iframe src="/geo_coordinates.html" title="Geo Coordinates" style={frameStyle} sandbox="allow-scripts allow-same-origin" />;
const GeoPrevalentJobs = () => <iframe src="/geo_prevalent_jobs.html" title="Geo Prevalent Jobs" style={frameStyle1} sandbox="allow-scripts allow-same-origin" />;
const GeoRemoteOnsite = () => <iframe src="/geo_remote_onsite.html" title="Geo Remote Onsite" style={frameStyle2} sandbox="allow-scripts allow-same-origin" />;
const HeatMap = () => <iframe src="/heatmap.html" title="Heat Map" style={frameStyle} sandbox="allow-scripts allow-same-origin" />;



export default Visualizations;

