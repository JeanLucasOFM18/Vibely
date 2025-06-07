import { useState } from 'react';

const Home = ({ setVista, setResponse }) => {

    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async () => {
        if (!text.trim()) return alert('Por favor ingresa un texto.');

        setLoading(true);
        try {
            const res = await fetch(`${backendUrl}/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            const data = await res.json();
            let cleanResult = data.result.replace(/```json|```/g, "").trim();
            const jsonResult = JSON.parse(cleanResult);
            setResponse(jsonResult);
            console.log("JSON parseado correctamente:", jsonResult);
            setVista('recommend');
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Hubo un error al obtener las recomendaciones.');
        }
        setLoading(false);
    };

    return (
        <div className='max-w-7xl mx-auto px-4'>
            <div className='flex flex-col md:flex-row items-center justify-center mt-5'>
                <div className='w-full md:w-1/2 text-center md:text-left mb-4 md:mb-0'>
                    <h1 className='text-6xl md:text-6xl font-bold mb-4 text-white'>Descubre lo que te encantará</h1>
                    <p className='text-lg mb-6 text-gray-300'>Describe tus gustos, hobbies o lo que te hace feliz. Con base en tu texto, te sugeriremos opciones que seguramente amarás.</p>
                    <textarea placeholder='Comienza a escribir...' rows='4' value={text}
                        onChange={(e) => setText(e.target.value)} className='w-full p-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-gray-800 text-white placeholder-gray-400'></textarea>
                    <button type='button' onClick={handleSubmit}
                        disabled={loading} className='mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors duration-300 cursor-pointer'>{loading ? 'Cargando...' : 'Buscar Recomendaciones'}</button>
                </div>
                <div className='hidden lg:grid grid-cols-5 relative gap-4 w-[800px] h-[500px] transition-all duration-400 group ml-8'>
                    <div className='relative bg-[url("https://i.postimg.cc/XJ2CMJPL/image.avif")] bg-center bg-cover transition-all duration-400 flex justify-center items-center group-hover:grayscale group-hover:opacity-25 hover:grayscale-0 hover:opacity-100 transform -translate-y-8'></div>
                    <div className='relative bg-[url("https://i.postimg.cc/d3pZ1fwT/image.avif")] bg-center bg-cover transition-all duration-400 flex justify-center items-center group-hover:grayscale group-hover:opacity-25 hover:grayscale-0 hover:opacity-100 transform translate-y-2'></div>
                    <div className='relative bg-[url("https://i.postimg.cc/7PW2m50Y/image.avif")] bg-center bg-cover transition-all duration-400 flex justify-center items-center group-hover:grayscale group-hover:opacity-25 hover:grayscale-0 hover:opacity-100 transform -translate-y-8'></div>
                    <div className='relative bg-[url("https://i.postimg.cc/HkG71F6q/image.avif")] bg-center bg-cover transition-all duration-400 flex justify-center items-center group-hover:grayscale group-hover:opacity-25 hover:grayscale-0 hover:opacity-100 transform translate-y-2'></div>
                    <div className='relative bg-[url("https://i.postimg.cc/YSMGhYK8/image.avif")] bg-[-100px] bg-cover transition-all duration-400 flex justify-center items-center group-hover:grayscale group-hover:opacity-25 hover:grayscale-0 hover:opacity-100 transform -translate-y-8'></div>
                </div> 
            </div>
      </div>
    );
  };
  
  export default Home;