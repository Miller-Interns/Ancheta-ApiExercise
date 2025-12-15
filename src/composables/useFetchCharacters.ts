
import { ref } from 'vue'
import axios from 'axios'
import type { Character } from '@/types'

export function useFetchCharacters() {
    const data = ref<Character[]>([])
    const totalCount = ref(0)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetchData = async (offset = 0, limit = 3) => {
        loading.value = true
        error.value = null

        try {
            const response = await axios.get<Character[]>('https://potterapi-fedeperin.vercel.app/en/characters')
            totalCount.value = response.data.length
            data.value = response.data.slice(offset, offset + limit)
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch characters'
        } finally {
            loading.value = false
        }
    }

    return { data, totalCount, loading, error, fetchData }
}
