import { createContext, useEffect, useState  }
          from 'react'

//Crear contexto
const ComentariosContexto = createContext()
//crear provider: para que el contexto
// se reconozca en todo componente
export const ComentariosProvider = ({ children }) => {

    const [comments, setComments] = useState()
   //Estado global
   const [isLoading, setIsLoading]=
          useState(true)

    useEffect(()=>{
      fetchComentarios()
    },[])

    /*funcion para traer los comentarios
    desde json server*/
    const fetchComentarios = async() => {
       const response = await fetch('http://localhost:5000/comentarios')
       const comentariosAPI = await response.json()
      setComments(comentariosAPI)
      //establecer el estado de carga a falso
      setIsLoading(false)
    }

    const addItem = async (newComentario) => {
      try {
        const response = await fetch('http://localhost:5000/comentarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newComentario),
        });
    
        if (!response.ok) {
          throw new Error('Error al guardar el comentario');
        }
    
        const data = await response.json();
        setComments([data, ...comments]);
    
        alert('¡Registro exitoso!');
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };
    


    const borrarItem=async (id) =>{
        if(  window.confirm('¿Estas seguro que quieres borrar el comentario?')){
          const response = await fetch(`http://localhost:5000/comentarios/${id}`, {method: 'DELETE'})
          
        
          setComments(comments.filter((c)=> c.id !== id))     
        }  
      }


    return (
            <ComentariosContexto.Provider 
                    value={{ comments, 
                             setComments,
                             isLoading,
                             setIsLoading,
                             borrarItem,
                             addItem }} >
        { children }
    </ComentariosContexto.Provider>)
}

export default ComentariosContexto



