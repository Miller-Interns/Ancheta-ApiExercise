import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFetchCharacters } from '@/composables/useFetchCharacters'
import { useFetchSpells } from '@/composables/useFetchSpells'
import { useFetchBooks } from '@/composables/useFetchBooks'
import { useFetchHouses } from '@/composables/useFetchHouses'
import type { Character, Spell, Book, House } from '@/types'

export const useDataStore = defineStore('dataStore', () => {
    // Characters 
    const characters = ref<Character[]>([])
    const charTotalCount = ref(0)
    const charCurrentPage = ref(1)
    const charItemsPerPage = ref(3)
    const charTotalPages = ref(1)
    const { data: charData, totalCount: charFetchedTotal, fetchData: fetchCharacters, loading: charLoading, error: charError } = useFetchCharacters()

    async function loadCharactersPage(page = 1) {
        charCurrentPage.value = page
        const offset = (page - 1) * charItemsPerPage.value
        await fetchCharacters(offset, charItemsPerPage.value)
        characters.value = charData.value
        charTotalCount.value = charFetchedTotal.value
        charTotalPages.value = Math.ceil(charTotalCount.value / charItemsPerPage.value)
    }

    // Spells
    const spells = ref<Spell[]>([])
    const spellTotalCount = ref(0)
    const spellCurrentPage = ref(1)
    const spellItemsPerPage = ref(6)
    const spellTotalPages = ref(1)
    const { data: spellData, totalCount: spellFetchedTotal, fetchData: fetchSpells, loading: spellLoading, error: spellError } = useFetchSpells()

    async function loadSpellsPage(page = 1) {
        spellCurrentPage.value = page
        const offset = (page - 1) * spellItemsPerPage.value
        await fetchSpells(offset, spellItemsPerPage.value)
        spells.value = spellData.value
        spellTotalCount.value = spellFetchedTotal.value
        spellTotalPages.value = Math.ceil(spellTotalCount.value / spellItemsPerPage.value)
    }

    // Books
    const books = ref<Book[]>([])
    const bookTotalCount = ref(0)
    const bookCurrentPage = ref(1)
    const bookItemsPerPage = ref(1) // one book per page
    const bookTotalPages = ref(1)
    const { data: bookData, totalCount: bookFetchedTotal, fetchData: fetchBooks, loading: bookLoading, error: bookError } = useFetchBooks()

    async function loadBooksPage(page = 1) {
        bookCurrentPage.value = page
        const offset = (page - 1) * bookItemsPerPage.value
        await fetchBooks(offset, bookItemsPerPage.value)
        books.value = bookData.value
        bookTotalCount.value = bookFetchedTotal.value
        bookTotalPages.value = Math.ceil(bookTotalCount.value / bookItemsPerPage.value)
    }

    // Houses
    const houses = ref<House[]>([])
    const houseTotalCount = ref(0)
    const houseCurrentPage = ref(1)
    const houseItemsPerPage = ref(3)
    const houseTotalPages = ref(1)
    const { data: houseData, totalCount: houseFetchedTotal, fetchData: fetchHouses, loading: houseLoading, error: houseError } = useFetchHouses()

    async function loadHousesPage(page = 1) {
        houseCurrentPage.value = page
        await fetchHouses()
        houses.value = houseData.value
        houseTotalCount.value = houseFetchedTotal.value
        houseTotalPages.value = Math.ceil(houseTotalCount.value / houseItemsPerPage.value)
    }

    return {
        // Characters
        characters,
        charTotalCount,
        charCurrentPage,
        charItemsPerPage,
        charTotalPages,
        charLoading,
        charError,
        loadCharactersPage,

        // Spells
        spells,
        spellTotalCount,
        spellCurrentPage,
        spellItemsPerPage,
        spellTotalPages,
        spellLoading,
        spellError,
        loadSpellsPage,

        // Books
        books,
        bookTotalCount,
        bookCurrentPage,
        bookItemsPerPage,
        bookTotalPages,
        bookLoading,
        bookError,
        loadBooksPage,

        // Houses
        houses,
        houseTotalCount,
        houseCurrentPage,
        houseItemsPerPage,
        houseTotalPages,
        houseLoading,
        houseError,
        loadHousesPage,
    }
})
