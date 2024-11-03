import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { createEmptyPlan } from './planStructure';

export const parseFile = async (file) => {
    const fileType = file.name.split('.').pop().toLowerCase();

    try {
        switch (fileType) {
            case 'csv':
                return await parseCSV(file);
            case 'xlsx':
            case 'xls':
                return await parseExcel(file);
            default:
                throw new Error('Formato file non supportato. Usa CSV o Excel (.xlsx, .xls)');
        }
    } catch (error) {
        console.error('Errore parsing:', error);
        throw new Error(`Errore nel caricamento del file: ${error.message}`);
    }
};

const parseCSV = (file) => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            delimiter: ';',
            dynamicTyping: true,
            encoding: 'UTF-8',
            complete: (results) => {
                try {
                    if (results.errors.length > 0) {
                        throw new Error('Errore nel parsing del CSV: ' + results.errors[0].message);
                    }

                    validateHeaders(results.meta.fields);
                    const plan = convertToMealPlan(results.data);
                    resolve(plan);
                } catch (error) {
                    reject(error);
                }
            },
            error: (error) => reject(new Error(`Errore parsing CSV: ${error.message}`))
        });
    });
};

const parseExcel = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
                    header: 1,
                    blankrows: false,
                    defval: ''
                });

                if (jsonData.length < 2) {
                    throw new Error('Il file è vuoto o non contiene dati validi');
                }

                // Normalizza le intestazioni
                const headers = jsonData[0].map(header => 
                    header.trim()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/\s+/g, '')
                        .toLowerCase()
                );

                // Converti in array di oggetti
                const records = jsonData.slice(1).map(row => {
                    const record = {};
                    headers.forEach((header, index) => {
                        record[header] = (row[index] || '').toString().trim();
                    });
                    return record;
                });

                validateCSVData(records);
                const plan = convertToMealPlan(records);
                resolve(plan);
            } catch (error) {
                reject(new Error(`Errore parsing Excel: ${error.message}`));
            }
        };
        reader.onerror = () => reject(new Error('Errore nella lettura del file'));
        reader.readAsArrayBuffer(file);
    });
};

const validateCSVData = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Il file non contiene dati validi');
    }
};

const convertToMealPlan = (data) => {
    const plan = createEmptyPlan();

    data.forEach(row => {
        if (row.Giorno && row.Pasto && row.Alimento) {
            const giorno = row.Giorno.toUpperCase();
            const pasto = row.Pasto;

            if (plan[giorno] && plan[giorno][pasto]) {
                // Assicuriamoci che i valori nutrizionali siano numeri validi
                const nutrition = {
                    calories: parseFloat(row.Calorie) || 0,
                    protein: parseFloat(row.Proteine) || 0,
                    carbs: parseFloat(row.Carboidrati) || 0,
                    fat: parseFloat(row.Grassi) || 0
                };

                const item = {
                    item: `${row.Alimento}${row.Quantita ? `: ${row.Quantita}` : ''}`,
                    nutrition: nutrition
                };

                // Inizializziamo l'array se non esiste
                if (!Array.isArray(plan[giorno][pasto])) {
                    plan[giorno][pasto] = [];
                }

                plan[giorno][pasto].push(item);

                if (row.Alternative) {
                    plan[giorno][pasto].push({ 
                        alternative: row.Alternative,
                        nutrition: nutrition // Aggiungiamo i dati nutrizionali anche alle alternative
                    });
                }
            }
        }
    });

    return plan;
};

// Funzione per validare le intestazioni del CSV
const validateHeaders = (headers) => {
    const requiredHeaders = ['Giorno', 'Pasto', 'Alimento', 'Calorie', 'Proteine', 'Carboidrati', 'Grassi'];
    requiredHeaders.forEach(header => {
        if (!headers.includes(header)) {
            throw new Error(`Intestazione mancante: ${header}`);
        }
    });
};

export const generateTemplate = () => {
    const headers = [
        'Giorno',
        'Pasto',
        'Alimento',
        'Quantita',
        'Calorie',
        'Proteine',
        'Carboidrati',
        'Grassi',
        'Alternative'
    ];

    const template = [headers];

    // Aggiungere righe di esempio per ogni pasto di un giorno
    const exampleRows = [
        ['Lunedì', 'Colazione', 'Pane integrale', '50g', '131', '4', '27', '1', 'Fette biscottate'],
        ['Lunedì', 'Colazione', 'Marmellata', '20g', '49', '0', '12', '0', 'Miele'],
        ['Lunedì', 'Spuntino Matt.', 'Mela', '150g', '77', '0.4', '20.6', '0.3', 'Pera'],
        ['Lunedì', 'Pranzo', 'Pasta integrale', '80g', '280', '9', '58', '2', ''],
        ['Lunedì', 'Pranzo', 'Petto di pollo', '150g', '165', '31', '0', '3.6', 'Tacchino'],
        ['Lunedì', 'Merenda', 'Yogurt greco', '170g', '100', '17', '4', '0', ''],
        ['Lunedì', 'Cena', 'Salmone', '150g', '208', '22', '0', '13', 'Pesce spada']
    ];

    return [...template, ...exampleRows];
};

// Aggiorniamo anche la funzione per il download
export const downloadTemplate = () => {
    const templateData = generateTemplate();
    
    // Convertiamo l'array in stringa CSV
    const csvContent = templateData
        .map(row => row.join(','))
        .join('\n');

    // Creiamo il Blob con il contenuto CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Creiamo il link per il download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'template_piano_alimentare.csv');
    document.body.appendChild(link);
    
    // Triggeriamo il download
    link.click();
    
    // Pulizia
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};