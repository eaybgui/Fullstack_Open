import {useState} from 'react'

const Country = (props) => {
    const country = props.country;
    const [showInfo, setShowInfo] = useState(props.showInfo);

    const handleClick = () => {
        setShowInfo(!showInfo);
    }

    //the last api version (3.1) returns an object with the languages as keys, so we need to convert it to an array
    if(showInfo)
    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>capital: {country.capital[0]}</p>
            <p>population: {country.population}</p>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language.toString()}</li>)}
            </ul>
            <button onClick={handleClick}>{showInfo ? "hide" : "show"}</button>
        </div>
    )
    else
    return (
        <div>
            {country.name.common} 
            <button onClick={handleClick}>{showInfo ? "hide" : "show"}</button>
        </div>
    )
    
}

export default Country