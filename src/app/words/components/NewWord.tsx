"use client"
import { Modal } from "antd"
import debounce from "lodash.debounce";
import { useEffect, useRef, useState } from "react";
import data from '../../data/eng_germ_dict.json';
import { IoSearchOutline } from "react-icons/io5";
import { HiMiniXMark } from "react-icons/hi2";
import { BsPlus } from "react-icons/bs";

interface INewModal {
    known: 'DEknownWords';
    icon: 'small' | 'default';
    unknown: 'DEunknownWords';
    onOk?: () => void;
    lang: 'DE' | 'EN'
}

export default function NewWord(props: INewModal) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [input, setInput] = useState('');
    const [alreadyKnown, setAlreadyKnown] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [highlightIndex, setHighlightIndex] = useState<number>(-1);
    const suggestionsRef = useRef<HTMLUListElement>(null);
    const [word, setWord] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const debouncedUpdateSuggestions = debounce((value: string) => {
        const dic = props.lang === 'DE' ? Object.keys(data) : Object.values(data);

        const filtered = dic
            .filter((word): word is string => typeof word === 'string')
            .filter((word) => word.toLowerCase().startsWith(value.toLowerCase()))
            .slice(0, 5);

        setSuggestions(value ? filtered : []);
    }, 150);

    const handleChange = (value: string) => {
        setInput(value);
        setHighlightIndex(-1);
        debouncedUpdateSuggestions(value);
    };

    const handleSelectSuggestion = (word: string) => {
        const known = JSON.parse(localStorage.getItem(props.known) || "[]") as [];

        if (known.find((c) => c === word)) {
            setAlreadyKnown(true);
        } else {
            setAlreadyKnown(false);
        }

        setInput(word);
        setWord(word);
        setSuggestions([]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (suggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightIndex((prev) => (prev + 1) % suggestions.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (highlightIndex >= 0) {
                handleSelectSuggestion(suggestions[highlightIndex]);
            } else {
                setSuggestions([]);
            }
        }
    };

    const boldMatch = (suggestion: string) => {
        const i = suggestion.toLowerCase().indexOf(input.toLowerCase());
        if (i === -1) return suggestion;
        const before = suggestion.slice(0, i);
        const match = suggestion.slice(i, i + input.length);
        const after = suggestion.slice(i + input.length);
        return (
            <>
                {before}
                <strong>{match}</strong>
                {after}
            </>
        );
    };

    function onAddWord() {
        let known = JSON.parse(localStorage.getItem(props.known) || "[]") as [];
        const unknownWords = JSON.parse(localStorage.getItem(props.unknown) || "[]") as [];

        if (!Array.isArray(known)) known = [];

        localStorage.setItem(props.unknown, JSON.stringify(unknownWords.filter((w) => w !== word)));

        if (known.find((c) => c === word)) {
            setAlreadyKnown(true);
        } else {
            setAlreadyKnown(false);
            localStorage.setItem(props.known, JSON.stringify([...known, word]));
        }

        if (props.onOk)
            props.onOk();

        handleOk();

        setWord('');
        setInput('');
    }

    useEffect(() => {
        return () => {
            debouncedUpdateSuggestions.cancel();
        };
    });

    return (
        <div>
            {props.icon === 'default' ?
                <button
                    onClick={showModal}
                    className="cursor-pointer border border-black/30 text-black/60 font-normal rounded-full px-2 py-1">
                    + New word
                </button>
                :
                <button className="cursor-pointer flex items-center border rounded-full border-gray-700/20 text-black/80 p-2">
                    <BsPlus size={25} />
                </button>
            }
            <Modal open={isModalOpen}
                onCancel={handleCancel}
                title={
                    [
                        <div key={'title-new-word-modal'} className="leading-4 border-b pb-4 border-black/10">
                            Add new known word
                        </div>
                    ]
                }
                footer={[
                    <div key={'footer-new-word'} className="flex items-center justify-between border-t border-black/10 pt-4">
                        <button
                            key={'button-cancel'}
                            className="border border-black/20 text-black/80 rounded-full px-6 py-2"
                            onClick={handleOk}
                        >
                            Cancel
                        </button>
                        <button
                            disabled={word.length == 0 && alreadyKnown}
                            key={'button-submit'}
                            onClick={onAddWord}
                            style={{ opacity: word.length > 0 && !alreadyKnown ? 1 : 0.4 }}
                            className="bg-black px-6 py-2 border rounded-full text-white"
                        >
                            Confirm
                        </button>
                    </div>
                ]}>
                <div className="border border-black/20 rounded-lg flex items-center pl-2 mt-4">
                    <IoSearchOutline />
                    <input
                        value={input}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={() => setTimeout(() => setSuggestions([]), 100)}
                        onKeyDown={handleKeyDown}
                        className="w-full px-2 py-2 focus:outline-none focus:ring-0" placeholder="Search for word" />
                </div>
                {
                    word.length > 0 &&
                    <div className={`${alreadyKnown ? 'bg-lime-100 text-lime-900' : 'bg-slate-100'} rounded-lg my-4 flex flex-col h-min border border-slate-200`}>
                        <div className="flex items-center justify-between pl-4 pr-2 pt-2">
                            {alreadyKnown ? 'This word is already known!' : ' Add this word into the Known Words?'}

                            <div onClick={() => { setInput(''); setWord('') }} className="cursor-pointer border rounded-full border-black/50 text-black/60 p-1">
                                <HiMiniXMark size={15} />
                            </div>
                        </div>
                        <b className="text-lg pl-4 pb-3">
                            {word}
                        </b>
                    </div>
                }

                <div>
                    {suggestions.length > 0 && (
                        <ul
                            ref={suggestionsRef}
                            style={{ top: word.length > 0 ? "37%" : "54%" }}
                            className="absolute z-10 bg-white border-0 w-5/6 text-left max-h-40 overflow-y-auto rounded-x rounded-b shadow-md top-[37%]"
                        >
                            {suggestions.map((sug, index) => (
                                <li
                                    key={sug}
                                    className={`px-3 py-2 cursor-pointer ${index === highlightIndex ? 'bg-gray-100 font-bold' : 'hover:bg-gray-50'
                                        }`}
                                    onMouseDown={() => handleSelectSuggestion(sug)}
                                >
                                    {boldMatch(sug)}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </Modal>
        </div>
    )

}