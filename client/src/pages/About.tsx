import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-8">About Career Crafters</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="text-lg text-gray-800">
          In the rapidly evolving job market, matching the right candidate to the right job position is more crucial than ever. Our project, Career Crafters, leverages cutting-edge technology to develop a recommender system that enhances job search effectiveness by aligning job seekers’ resumes with the most suitable job postings. This system is designed to significantly improve the chances of resumes being shortlisted by Application Tracking Systems (ATS), thereby optimizing job search efforts and outcomes.
        </p>
      </section>

       {/* Team Members Section */}
       <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Team Members</h2>
        <ul className="list-disc pl-8 text-lg text-gray-800">
          <li>Saurav Joshi - <a href="mailto:sjoshi50@uic.edu" className="text-blue-500 hover:text-blue-700">sjoshi50@uic.edu</a></li>
          <li>Venkata Sesha Phani Vakicherla - <a href="mailto:vvakic2@uic.edu" className="text-blue-500 hover:text-blue-700">vvakic2@uic.edu</a></li>
          <li>Shahbaz - <a href="mailto:msyed62@uic.edu" className="text-blue-500 hover:text-blue-700">msyed62@uic.edu</a></li>
          <li>Usha - <a href="mailto:upuli@uic.edu" className="text-blue-500 hover:text-blue-700">upuli@uic.edu</a></li>
          <li>Venkat - <a href="mailto:vpidap2@uic.edu" className="text-blue-500 hover:text-blue-700">vpidap2@uic.edu</a></li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Project Goals</h2>
        <p className="text-lg text-gray-800">
          The main objective of Career Crafters is to build a robust recommender system that:
        </p>
        <ul className="list-disc pl-8 text-lg text-gray-800">
          <li>Identifies and recommends job opportunities that best match an individual's skills and experiences.</li>
          <li>Increases the efficiency of job applications by ensuring resumes are targeted towards the most appropriate postings.</li>
          <li>Potentially raises the likelihood of securing job interviews and employment.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Scope</h2>
        <p className="text-lg text-gray-800">
          Our project specifically focuses on Computer Science-related job markets, analyzing positions such as Data Analysts, Software Engineers, Data Scientists, and Data Engineers. These categories represent a substantial segment of the current job market in technology and analytics.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Methodology</h2>
        <p className="text-lg text-gray-800">
          Our methodology involves several key phases:
        </p>
        <ul className="list-disc pl-8 text-lg text-gray-800">
          <li>Data Collection and Preparation: Comprehensive scraping of job listings from LinkedIn, followed by meticulous data cleaning and exploratory data analysis.</li>
          <li>Text Processing: Application of NLP techniques including tokenization, normalization, and vectorization.</li>
          <li>Modeling: Utilization of K-Nearest Neighbors and other algorithms to develop a model that matches resumes to job descriptions effectively.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Results and Visualizations</h2>
        <p className="text-lg text-gray-800">
          Our results showcase dynamic visualizations of job distribution and skills demand, providing clear guidance to job seekers on market trends and necessary skills.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Future Directions</h2>
        <p className="text-lg text-gray-800">
          We plan to integrate advanced models like Word2Vec and develop a dynamic web application to enhance the user experience further.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Challenges and Learnings</h2>
        <p className="text-lg text-gray-800">
          The project presented challenges in data quality and modeling complexity, which were overcome by adopting robust data cleaning processes and advanced NLP techniques.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Project Impact</h2>
        <p className="text-lg text-gray-800">
          Career Crafters aims to revolutionize how job seekers approach the job market, making the search more targeted and effective. Our system aligns with real-world hiring patterns, making a significant impact on the job search process.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
        <p className="text-lg text-gray-800">
          Career Crafters is more than just a project; it's a step towards redefining the future of job applications and recruitment. We continue to refine and expand our system to ensure it remains at the forefront of technological advancements.
        </p>
      </section>
    </div>
  );
};

export default About;
