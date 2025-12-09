// src/composables/useFetchCharacters.ts
import { ref } from 'vue'
import axios from 'axios'
import type { Book } from '@/types'

export function useFetchBooks() {
    const data = ref<Book[]>([])
    const totalCount = ref(0)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetchData = async (offset = 0, limit = 3) => {
        loading.value = true
        error.value = null

        try {
            const response = await axios.get<Book[]>('https://potterapi-fedeperin.vercel.app/en/books')
            totalCount.value = response.data.length
            data.value = response.data.slice(offset, offset + limit)
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch Books'
        } finally {
            loading.value = false
        }
    }

    return { data, totalCount, loading, error, fetchData }
}
