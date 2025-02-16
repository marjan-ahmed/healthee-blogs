import React from 'react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Image from 'next/image'
import { GrMenu } from 'react-icons/gr'
import Link from 'next/link'
import SearchBar from './SearchBar'

function Header() {
  return (
    <div>
      <nav className="">
        <ul className="h-32 flex items-center border-b-2 border-gray-300 justify-between md:mx-32 sm:mx-8 mx-2 ">
          <li className="">
            <Image 
            src={'/healthee-logo.png'}
            alt="Healthy Logo"
            width={210}
            height={210}
            />
          </li>
          <div className="flex gap-3 items-center my-16 mx-4">
          <li>
            <SearchBar />
          </li>
          <li className="hidden sm:block">
            <Button className='font-monstserrat'>
            <Link href={'/auth/signup'}>Become Our Member</Link>
              </Button>
          </li>
          <li className="hidden sm:block">
            <Button className='font-monstserrat'>
            <Link href={'/auth/signin'}>Sign In</Link>
            </Button>
          </li>
          <Sheet>
            <SheetTrigger className="block sm:hidden"><GrMenu /></SheetTrigger>
            <SheetContent>
              <ul className="mt-4 flex flex-col gap-3">
            <li>
            <Button className="font-monstserrat h-10">
            <Link href={'/auth/signup'}>Become Our Member</Link>
              </Button>
          </li>
          <li>
            <Button className="h-10 font-monstserrat">
              <Link href={'/auth/signin'}>Sign In</Link>
              </Button>
          </li>
          </ul>
            </SheetContent>
          </Sheet>
          </div>
        </ul>
      </nav>
    </div>
    
  )
}

export default Header