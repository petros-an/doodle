class DoodleService {
    static async getOrCreate(doodleId) {
        const res = await fetch(
            `http://localhost:8000/doodle/${doodleId}`,
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
        const res = await fetch(
            `http://localhost:8000/doodle/${doodleId}`,
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