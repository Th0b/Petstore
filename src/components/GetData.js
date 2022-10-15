export default async function getData({url, type, setData, setLoading, setError}){
        try{
            const response = await fetch(url+type);
            const pets = await response.json();
            setData(pets);
        } catch (err) {
           setError(err.message);
        }
        finally {
           setLoading(false);
        }
}