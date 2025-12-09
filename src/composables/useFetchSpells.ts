import { ref } from 'vue'
import axios from 'axios'
import type { Spell } from '@/types'

export function useFetchSpells() {
    const data = ref<Spell[]>([])
    const totalCount = ref(0)
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Fetch spells with offset & limit for pagination
    const fetchData = async (offset = 0, limit = 6) => {
        loading.value = true
        error.value = null

        try {
            const response = await axios.get<Spell[]>('https://potterapi-fedeperin.vercel.app/en/spells')
            totalCount.value = response.data.length
            data.value = response.data.slice(offset, offset + limit)
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch spells'
        } finally {
            loading.value = false
        }
    }

    return { data, totalCount, loading, error, fetchData }
}
