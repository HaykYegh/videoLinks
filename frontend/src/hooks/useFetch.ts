import { useEffect, useState } from "react"
import axios from "axios"


export default function useFetch(url: string){

  const [data,setData] = useState<{id: string, url: string}[] | null>(null)
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)

  const handleSetData = async () => {
    const response = await axios.get(url)
    setData(response.data)
  }

  useEffect(() => {
    (
      async function(){
        try{
          setLoading(true)
          await handleSetData();
        }catch(err: any){
          setError(err)
        }finally{
          setLoading(false)
        }
      }
    )()
  }, [url])

  return { data, error, loading, handleSetData }

}