/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { classNames } from '../../functions/styling'
import { ExternalLink } from '../Link'
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
const solutions = [
    // {
    //     name: 'DOGPARK',
    //     // description: 'Documentation for users of Sushi.',
    //     href: ''
    // },
    {
        name: 'GOVERNANCE',
        //description: 'Documentation for developers of Sushi.',
        href: '#'
    },
    // {
    //     name: 'ROADMAP',
    //     //description: 'Sushi is a supporter of Open Source.',
    //     href: ''
    // },
    {
        name: 'WHITEPAPER',
        //description: 'Tools to optimize your workflow.',
        href: '#'
    },
    {
        name: 'AUDIT',
        //description: 'Join the community on Discord.',
        href: ''
    },
    {
        name: 'FAQ',
        //description: 'Join the community on Discord.',
        href: ''
    }
]

export default function Menu() {
    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button
                        className='n-color-black'
                    >
                      <p className="nav-menu-name"> MENU </p>  
                    </Popover.Button>

                    <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel
                            static
                            className="absolute z-10 bottom-12 md:top-12 left-full transform -translate-x-full mt-3 px-2 w-screen max-w-xs sm:px-0"
                        >
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden nav-menu-submenu">
                                <div className="relative text-left">
                                    {solutions.map(item => (
                                        <ExternalLink
                                            key={item.name}
                                            href={item.href}
                                            className="-m-3 p-3 block p-1 rounded-md transition ease-in-out duration-150"
                                        >
                                            <p className="nav-menu-submenu-text">{item.name}</p>
                                            {/* <p className="mt-1 text-sm text-secondary">{item.description}</p> */}
                                        </ExternalLink>
                                    ))}
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}
