import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import axios from  'axios';

interface SearchBarProps {
    onSearch: (query: string, results: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const router = useRouter();

    const handleSearch = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/location/?name=${encodeURIComponent(searchQuery)}`);
          if(response.data.results.length > 0){
            onSearch(searchQuery, response.data.results);
            router.push({
              pathname: '/Location',
              query: { results: JSON.stringify(response.data.results) }
            });
          }
      } catch (error) {
        console.error('Error fetching data:', error);
      }finally{
        const characterResponse = await axios.get(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(searchQuery)}`);
        onSearch(searchQuery, characterResponse.data.results);
        router.push({
            pathname: '/SearchResults',
            query: { results: JSON.stringify(characterResponse.data.results) }
        
        });
        setSearchQuery('');
      } 
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
      };
    
      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearch();
      };
    return(
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="SEARCH FOR CHARACTER,LOCATION OR EPISODE"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </form>
    )
}

export default SearchBar;