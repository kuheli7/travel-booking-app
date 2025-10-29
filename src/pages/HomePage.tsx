import React, { useEffect, useState } from 'react';
import { experienceService } from '../services/api';
import type { Experience } from '../types';
import ExperienceCard from '../components/ExperienceCard';

const HomePage: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const data = await experienceService.getExperiences();
      setExperiences(data);
      setError(null);
    } catch (err) {
      setError('Failed to load experiences. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-[1300px] px-6 py-10">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl-2 overflow-hidden shadow-subtle animate-pulse">
              <div className="w-full h-44 bg-gray-200" />
              <div className="p-4 bg-[#fafafa]">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-6" />
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded w-20" />
                  <div className="h-8 bg-gray-200 rounded w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1300px] px-6 py-10">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-pageBg min-h-screen">
      <main className="mx-auto max-w-[1300px] px-6 py-10">
        <section>
          <h1 className="text-3xl md:text-4xl font-bold text-brandDark mb-2">
            Explore Experiences
          </h1>
          <p className="text-mutedText text-base">
            Discover unique activities and create unforgettable memories
          </p>
        </section>

        {experiences.length === 0 ? (
          <div className="mt-8 text-center py-12 bg-white rounded-xl-2 shadow-subtle">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-mutedText text-lg">No experiences found</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
