import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { ISelectMenuOption } from '../../interfaces';

interface IProps {
    title: string;
    selected: ISelectMenuOption;
    setSelected: (option: ISelectMenuOption) => void;
    options: ISelectMenuOption[];
}

const SelectMenu = ({ title, options, selected, setSelected }: IProps) => {
    return (
        <Listbox value={selected} onChange={setSelected}>
            <div className='flex flex-col flex-1'>
                <Label className="text-sm/6 font-medium text-gray-900">{ title }</Label>
                <div className="relative mt-2">
                    <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm/6">
                        <span className="flex items-center">
                            {selected.icon && (
                                <img alt="" src={selected.icon} className="size-5 shrink-0 rounded-full" />
                            )}
                            <span className="ml-3 block truncate">{selected.name}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronUpDownIcon aria-hidden="true" className="size-5 text-gray-400" />
                        </span>
                    </ListboxButton>

                    <ListboxOptions
                        transition
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                    >
                        {options.map((option) => (
                            <ListboxOption
                                key={option.id}
                                value={option}
                                className="group relative cursor-default overflow-y-hidden select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                            >
                                <div className="flex items-center">
                                    {option.icon && (
                                        <img alt="" src={option.icon} className="size-5 shrink-0 rounded-full" />
                                    )}
                                    <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                        {option.name}
                                    </span>
                                </div>

                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                    <CheckIcon aria-hidden="true" className="size-5" />
                                </span>
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>
            </div>
        </Listbox>
    )
}

export default SelectMenu;