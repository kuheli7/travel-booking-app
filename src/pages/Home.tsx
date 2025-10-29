import { useEffect, useState } from 'react';
import ExperienceCard from '../components/ExperienceCard';
import type { Experience } from '../types';

interface HomeProps {
  searchTerm?: string;
}

export default function Home({ searchTerm = "" }: HomeProps) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from backend API
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    console.log('Fetching from:', `${API_URL}/api/experiences`);
    fetch(`${API_URL}/api/experiences`)
      .then(res => {
        console.log('Response status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Received data:', data);
        console.log('Data length:', data?.length);
        // Transform MongoDB _id to id for frontend compatibility
        const transformed = data.map((exp: any) => ({
          ...exp,
          id: exp._id || exp.id
        }));
        console.log('Transformed data:', transformed);
        setExperiences(transformed);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading experiences:', err);
        setLoading(false);
      });
  }, []);

  // Filter experiences based on search term
  const filteredExperiences = experiences.filter(exp => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      exp.title.toLowerCase().includes(search) ||
      exp.location.toLowerCase().includes(search) ||
      exp.description.toLowerCase().includes(search)
    );
  });

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="bg-white rounded-xl shadow-subtle overflow-hidden animate-pulse">
            <div className="h-44 bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {searchTerm && (
        <div className="mb-6">
          <p className="text-mutedText">
            Found {filteredExperiences.length} result{filteredExperiences.length !== 1 ? 's' : ''} for "<span className="font-semibold text-brandDark">{searchTerm}</span>"
          </p>
        </div>
      )}
      
      {filteredExperiences.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-mutedText">No experiences found matching your search.</p>
          <p className="text-sm text-mutedText mt-2">Try different keywords or browse all experiences.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExperiences.map(exp => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      )}
    </div>
  );
}
