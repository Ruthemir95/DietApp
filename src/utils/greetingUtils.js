// src/utils/greetingUtils.js
export const extractName = (fullName) => {
    if (!fullName) return '';

    // Rimuovi prefissi comuni
    const prefixes = ['Piano', 'Piano Alimentare', 'Dieta', 'Menu', 'Piano di'];
    let name = fullName;

    // Rimuovi i prefissi, ignorando maiuscole/minuscole
    prefixes.forEach(prefix => {
        if (name.toLowerCase().startsWith(prefix.toLowerCase())) {
            name = name.substring(prefix.length).trim();
        }
    });

    // Rimuovi eventuali caratteri speciali e numeri
    name = name.replace(/[^a-zA-ZÀ-ÿ\s]/g, '').trim();

    // Prendi solo la prima parola come nome
    const firstWord = name.split(/\s+/)[0];

    // Capitalizza la prima lettera e restituisci
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase();
};

export const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();

    // Restituisce un saluto basato sull'ora del giorno
    if (hour >= 5 && hour < 12) {
        return 'Buongiorno';
    } else if (hour >= 12 && hour < 18) {
        return 'Buon pomeriggio';
    } else {
        return 'Buonasera';
    }
};

export const formatGreeting = (planName) => {
    const name = extractName(planName); // Estrae il nome dal piano
    const greeting = getTimeBasedGreeting(); // Ottiene il saluto basato sull'ora

    // Restituisce il saluto formattato
    return name ? `${greeting}, ${name}` : greeting;
};

// Esportazioni delle funzioni
export { extractName, getTimeBasedGreeting, formatGreeting };