async function GetCharacters() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    let page = 1;
    let allCharacters = [];

    while (true) {
        try {
            const response = await fetch(`https://swapi.dev/api/people?page=${page}`, requestOptions);
            const result = await response.json();
            result.results.forEach(character => {
                allCharacters.push({
                    name: character.name,
                    birth_year: character.birth_year,
                    starships: character.starships,
                    eye_color: character.eye_color,
                    hair_color: character.hair_color,
                    skin_color: character.skin_color
                });
            });
            if (!result.next) {
                break;
            }

            page++;
        } catch (error) {
            console.error('Error fetching characters:', error);
            break;
        }
    }

    return allCharacters;
}


async function GetCharacterData(route) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      try {
        const response = await fetch(route, requestOptions);
        const result = await response.json();
        return result;
      } catch (error) {
        console.error(error);
      };
}

async function getCharacterNames() {
    const characterNames = {};
    let page = 1;

    while (true) {
        try {
            const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
            const data = await response.json();

            data.results.forEach((char, index) => {
                characterNames[char.name.toLowerCase()] = { page: page, index: index };
            });

            if (!data.next) {
                break;
            }

            page++;
        } catch (error) {
            console.error('Error fetching characters:', error);
            break;
        }
    }

    return characterNames;
}

function findCharacterByName(characterNames, inputString) {
    const lowerCaseInput = inputString.toLowerCase();

    if (characterNames[lowerCaseInput]) {
        const { page, index } = characterNames[lowerCaseInput];
        return {page, index};
    } else {
        return false;
    }
}
export {GetCharacters,GetCharacterData,getCharacterNames,findCharacterByName}