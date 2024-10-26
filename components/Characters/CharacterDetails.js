"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Loading from "../Loading/Loading";
import SectionCard from "./SectionCard";

export default function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [sectionDetails, setSectionDetails] = useState({});

  useEffect(() => {
    fetchCharacterDetails();
  }, [id]);

  const fetchCharacterDetails = async () => {
    try {
      const response = await fetch(`https://swapi.dev/api/people/${id}`);
      const data = await response.json();
      setCharacter(data);
    } catch (error) {
      console.error("Error fetching character details:", error);
    }
  };

  const toggleSection = async (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
      if (!sectionDetails[section] && character[section].length > 0) {
        await fetchSectionDetails(section);
      }
    }
  };

  const fetchSectionDetails = async (section) => {
    try {
      const details = await Promise.all(
        character[section].map(async (url) => {
          const response = await fetch(url);
          const data = await response.json();
          return {
            title: data.title || data.name || "Unknown",
            episodeId: data.episode_id,
            openingCrawl: data.opening_crawl,
            director: data.director,
            producer: data.producer,
            releaseDate: data.release_date,
          };
        })
      );
      setSectionDetails((prev) => ({ ...prev, [section]: details }));
    } catch (error) {
      console.error(`Error fetching ${section} details:`, error);
    }
  };

  if (!character) {
    return <Loading />;
  }

  const displayValue = (value) =>
    value && value !== "n/a" ? value : "Unknown";

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 text-yellow-300">
      <div className="max-w-3xl mx-auto bg-gray-600 rounded-lg shadow-2xl p-6">
        <Link
          href="/"
          className="inline-block mb-6 text-yellow-300 hover:text-yellow-400 transition-colors duration-300"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-4 text-yellow-300">
          {character.name}
        </h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <p>
            <strong>Height:</strong> {displayValue(character.height)} cm
          </p>
          <p>
            <strong>Mass:</strong> {displayValue(character.mass)} kg
          </p>
          <p>
            <strong>Hair Color:</strong> {displayValue(character.hair_color)}
          </p>
          <p>
            <strong>Skin Color:</strong> {displayValue(character.skin_color)}
          </p>
          <p>
            <strong>Eye Color:</strong> {displayValue(character.eye_color)}
          </p>
          <p>
            <strong>Birth Year:</strong> {displayValue(character.birth_year)}
          </p>
          <p>
            <strong>Gender:</strong> {displayValue(character.gender)}
          </p>
        </div>

        {["films", "species", "starships", "vehicles"].map((section) => (
          <div key={section} className="mb-4">
            <button
              onClick={() => toggleSection(section)}
              className="w-full text-left p-3 bg-gray-700 rounded-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none text-yellow-300"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
              <span className="float-right">
                {expandedSection === section ? "▼" : "▶"}
              </span>
            </button>
            {expandedSection === section && (
              <div className="mt-2 p-3 bg-gray-700 rounded-md">
                {character[section].length === 0 ? (
                  <p>No info found</p>
                ) : sectionDetails[section] ? (
                  <ul className="space-y-4">
                    {sectionDetails[section].map((item, index) => (
                      <SectionCard
                        key={index}
                        index={index}
                        itemTitle={item.title}
                        itemEpisodeId={item.episodeId}
                        itemDirector={item.director}
                        displayValue={displayValue}
                        itemProducer={item.producer}
                        itemReleaseDate={item.releaseDate}
                        itemOpeningCrawl={item.openingCrawl}
                      />
                    ))}
                  </ul>
                ) : (
                  <Loading />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
