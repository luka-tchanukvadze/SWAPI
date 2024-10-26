"use client";

import { useState, useEffect, useMemo } from "react";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import Loading from "../Loading/Loading";
import CharacterListCard from "./CharacterListCard";
import { useThrottle } from "@/Hooks/useThrottle";

export default function HomePage() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const throttledSearchTerm = useThrottle(searchTerm, 300);

  // Create a cache object to store fetched data
  const cache = useMemo(() => ({}), []);

  useEffect(() => {
    if (throttledSearchTerm) {
      fetchCharacters(1, throttledSearchTerm);
    } else {
      fetchCharacters(currentPage);
    }
  }, [throttledSearchTerm, currentPage]);

  const fetchCharacters = async (page, search = "") => {
    const cacheKey = `${page}-${search}`;

    // Check if data is already in cache
    if (cache[cacheKey]) {
      setCharacters(cache[cacheKey].results);
      setTotalPages(Math.ceil(cache[cacheKey].count / 10));
      setCurrentPage(page);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?page=${page}${
          search ? `&search=${search}` : ""
        }`
      );
      const data = await response.json();

      // Store fetched data in cache
      cache[cacheKey] = data;

      setCharacters(data.results);
      setTotalPages(Math.ceil(data.count / 10));
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCharacterId = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-yellow-400">
          Star Wars Characters
        </h1>

        <Search
          searchTerm={searchTerm}
          handleChange={(e) => setSearchTerm(e.target.value)}
        />

        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {characters.map((character) => (
              <CharacterListCard
                key={character.name}
                myKey={character.name}
                charName={character.name}
                charLink={`/characters/${getCharacterId(character.url)}`}
              />
            ))}
          </div>
        )}

        <Pagination
          handleClickPrevious={() =>
            fetchCharacters(Math.max(currentPage - 1, 1))
          }
          handleClickNext={() =>
            fetchCharacters(Math.min(currentPage + 1, totalPages))
          }
          currentPage={currentPage}
          isLoading={isLoading}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
