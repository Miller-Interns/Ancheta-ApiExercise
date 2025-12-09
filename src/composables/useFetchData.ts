import { ref } from 'vue';
import axios from 'axios';

export function useFetchData<T>(endpoint: string) {
    const data = ref<T[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchData = async () => {
        loading.value = true;
        error.value = null;

        try {
            const response = await axios.get<T[]>(`https://potterapi-fedeperin.vercel.app/en/${endpoint}`);
            data.value = response.data;
        } catch (err: any) {
            error.value = err.message || `Failed to fetch ${endpoint}`;
        } finally {
            loading.value = false;
        }
    };

    return { data, loading, error, fetchData };
}
