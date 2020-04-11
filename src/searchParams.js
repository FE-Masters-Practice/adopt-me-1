import React, { useState, useEffect } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import useDropdown from './useDropdown';
import Results from './Results';

const SearchParams = () => {
  const [location, updateLocation] = useState('Seattle, WA');
  const [breeds, updateBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);
  const [pets, setPet] = useState([]);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    setPets(animals || []);
  }

  // async functions are guaranteed to aLWAYS return a promise that will resolve whenever the function completes

  useEffect(() => {
    setBreeds([]);
    setBreed('');
    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      const breedStrings = apiBreeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]); // these are the dependency arrays. We are telling the effect to only rerender when these things CHANGE..
  // adding an empty dependency array [] ensures that the effect only runs once!!
  // not including a dependency array, it runs everytime anything updates, causing an infinite loop. STAY AWAY FROM THIS.

  // hooks replaced having to use the component lifecycle  (componentDidMount, componentDidUpdate, etc)
  useEffect(() => {
    updateBreeds([]);
    updateBreed('');
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      updateBreeds(breedStrings);
    }, console.error);
  }, [animal]);

  return (
    <div className='search-params'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}>
        <label htmlFor='location'>
          Location
          <input
            id='location'
            value={location}
            placeholder='Location'
            onChange={(e) => updateLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;

// search Params gets rendered, gets all of its info, sets up its hooks
// schedules useEffect (but it doesn't happen yet) it doesn't happen on the first render
// renders all of the markup so user can see it
// then, runs the scheduled effect
// going to call the useEffect function
// goes to API, calls animal, re renders with new breeds
