import React from 'react'
import { Input } from './ui/input';
import { SearchIcon } from 'lucide-react';

function SearchBar() {
  return (
    <div className='flex relative items-center'>
        <SearchIcon className='absolute right-2' size={20}/>
        <Input className='lg:w-96 sm:w-52 h-11 w-full font-monstserrat font-semibold'/>
    </div>
  )
}

export default SearchBar;