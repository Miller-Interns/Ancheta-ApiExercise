// src/stores/useDataStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useFetchData } from '@/composables/useFetchData';
import type { Book, Character, House, Spell } from '@/types/index';

type DataMap = {
    books: Book;
    characters: Character;
    houses: House;
    spells: Spell;
};

export const useDataStore = defineStore('dataStore', () => {
    const books = ref<Book[]>([]);
    const characters = ref<Character[]>([]);
    const houses = ref<House[]>([]);
    const spells = ref<Spell[]>([]);

    const refMap = {
        books,
        characters,
        houses,
        spells,
    };

    async function loadData<K extends keyof DataMap>(endpoint: K) {
        const target = refMap[endpoint] as Ref<DataMap[K][]>;
        const { data, fetchData } = useFetchData<DataMap[K]>(endpoint);
        await fetchData();
        target.value = data.value as DataMap[K][];
    }

    const loadBooks = () => loadData('books');
    const loadCharacters = () => loadData('characters');
    const loadHouses = () => loadData('houses');
    const loadSpells = () => loadData('spells');

    return {
        books,
        characters,
        houses,
        spells,
        loadBooks,
        loadCharacters,
        loadHouses,
        loadSpells,
    };
});
