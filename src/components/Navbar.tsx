// src/components/Navbar.tsx
import React, { useState } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { IssueModal } from '@/components/IssueModal';

const navigation = [
  { name: 'Início', href: '/' },
  { name: 'Editor', href: '/editor' },
  { name: 'Upload', href: '/upload' },
];

const legalLinks = [
  { name: 'Termos de Serviço', href: '/terms/termos-de-servico' },
  { name: 'Isenção de responsabilidade', href: '/terms/disclaimer' },
  { name: 'Termos de Uso', href: '/terms/termos-de-uso' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function Navbar() {
  const { status } = useSession();
  const [issueOpen, setIssueOpen] = useState(false);

  return (
    <>
      <Disclosure as="nav" className="fixed top-0 inset-x-0 z-50 bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                {/* Mobile menu button */}
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>

                {/* Logo and navigation */}
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex shrink-0 items-center">
                    <Image
                      src=""
                      alt="Logo placeholder"
                      width={32}
                      height={32}
                      className="h-8 w-auto"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        >
                          {item.name}
                        </a>
                      ))}
                      <button
                        onClick={() => setIssueOpen(true)}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Problemas?
                      </button>
                      <Menu as="div" className="relative">
                        <Menu.Button className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                          Termos
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg focus:outline-none">
                          {legalLinks.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Menu>
                    </div>
                  </div>
                </div>

                {/* Right side: logout button */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {status === 'authenticated' && (
                    <button
                      onClick={() => signOut()}
                      className="text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
                    >
                      Sair
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile menu, shown when open */}
            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
                <DisclosureButton
                  as="button"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  onClick={() => setIssueOpen(true)}
                >
                  Problemas?
                </DisclosureButton>
                {legalLinks.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
      <IssueModal open={issueOpen} onOpenChange={setIssueOpen} />
    </>
  );
}
