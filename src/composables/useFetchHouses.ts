import { ref } from 'vue'
import axios from 'axios'
import type { House } from '../types'

export function useFetchHouses() {
    const data = ref<House[]>([])
    const totalCount = ref(0)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetchData = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await axios.get<House[]>('https://potterapi-fedeperin.vercel.app/en/houses')
            data.value = response.data
            totalCount.value = response.data.length
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch houses'
        } finally {
            loading.value = false
        }
    }

    return { data, totalCount, loading, error, fetchData }
}
