class DoodleService {



    static async getOrCreate(doodleId) {
        const backendUrl = import.meta.env.VITE_BACKEND_URL
        const res = await fetch(
            `${backendUrl}/doodle/${doodleId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const data = await res.json();
        console.log(data)
        return {
            text: data.text,
        }

    }

    static async save(doodleId, text) {
        const backendUrl = import.meta.env.VITE_BACKEND_URL
        const res = await fetch(
            `${backendUrl}/doodle/${doodleId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text,
                }),
            }
        );
        const data = await res.json();
        console.log(data)
        return {
            text: data.text,
        }
    }
}

export default DoodleService