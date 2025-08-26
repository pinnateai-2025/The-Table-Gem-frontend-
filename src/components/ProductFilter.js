import { useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";

const Dropdown = ({ label, options, selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                className="flex items-center gap-1 px-3 max-[500px]:px-1 py-1.5 max-[500px]:text-[14px] bg-white rounded-md hover:border-blue-500 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selected || label}
                <RiArrowDropDownLine className="text-xl md:text-2xl -mt-[-4px]" />
            </button>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1" role="menu">
                        {options.map((option) => (
                            <button
                                key={option}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                    onSelect(option);
                                    setIsOpen(false);
                                }}
                                role="menuitem"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const ProductFilter = () => {
    const [availability, setAvailability] = useState('');
    const [priceSort, setPriceSort] = useState('');
    const [dateSort, setDateSort] = useState('Date - Latest');

    const availabilityOptions = ['In Stock', 'Out of Stock', 'Pre-Order'];
    const priceOptions = ['Low to High', 'High to Low'];
    const dateOptions = ['Newest First', 'Oldest First', 'Recently Updated'];

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 max-[500px]:gap-0 mb-6 max-[500px]:mb-4 px-4 max-[500px]:px-0">

            <div className="flex flex-wrap items-center gap-4">
                <span className="text-black font-medium max-[500px]:text-[14px]">Filter:</span>
                <div className="flex flex-wrap items-center gap-3 ml-1">
                    <Dropdown
                        label="Availability"
                        options={availabilityOptions}
                        selected={availability}
                        onSelect={setAvailability}
                    />
                    <Dropdown
                        label="Price"
                        options={priceOptions}
                        selected={priceSort}
                        onSelect={setPriceSort}
                    />
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-black font-medium max-[500px]:text-[14px]">Sort by:</span>
                    <Dropdown
                        label="Date - Latest"
                        options={dateOptions}
                        selected={dateSort}
                        onSelect={setDateSort}
                    />
                </div>
                <span className="text-black text-sm md:text-base font-medium">
                    58 Products
                </span>
            </div>
        </div>
    );
};

export default ProductFilter;