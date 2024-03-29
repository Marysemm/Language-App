import React, { useState, useContext, useEffect } from "react";
import { globalContext } from "../../Context/MyContext";
import CSSModules from 'react-css-modules';
import Word from '../Word/Word';
import style from "./style.module.scss";

function WordCollection() {
    const { words } = useContext(globalContext)
    const [count, setCount] = useState(0)
    const [countWord, setCountWord] = useState(0)
    const [translatedWordsId, setTranslatedWordId] = useState([])

    useEffect(() => {
        console.log(translatedWordsId);
    }, [translatedWordsId]);

    const handleTranslateWord = (id) => {
        if (translatedWordsId.includes(id)) {
            console.log(`Word ${id} has already been viewed`);
            return;
        } else {
            setTranslatedWordId(prevState => [...prevState, id]);
            console.log(`Word ${id} has been added to viewed words`);
        }
    };

    function handlePrev() {
        {
            if (count > 0) {
                setCount((count - 1) % words.length)
            } else {
                setCount(words.length - 1)
            }
        }
    }

    function handleNext() {
        setCount((count + 1) % words.length)
    }

    function getCountWord() {
        setCountWord(countWord + 1);
    }

    return (
        <>
            <p styleName="card__count">Проверено {countWord} слов</p>
            <div styleName="card__wrapper" key={count}>
                <button styleName="card__btn" onClick={handlePrev}>Previous word</button>
                <div styleName="word__card">
                    <Word
                        word={words[count]}
                        count={countWord}
                        getCountWord={getCountWord}
                        handleTranslateWord={handleTranslateWord}
                        translatedWordsId={translatedWordsId}
                    />
                </div>
                <button styleName="card__btn" onClick={handleNext}>Next word</button>
            </div>
        </>
    )
}

export default CSSModules(WordCollection, style);