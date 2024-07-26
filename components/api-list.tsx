import { useOrigin } from "@/hooks/use-origin"
import { useParams } from "next/navigation"
import { ApiALert } from "./ui/api-alert"

interface ApiListProps {
  entitiyName: string
  entitiyIdName: string
}
export const ApiList: React.FC<ApiListProps>=({
  entitiyName,
  entitiyIdName,
}) => {

  const params = useParams()
  const origin = useOrigin()
  
  const baseUrl = `${origin}/api/${params.storeId}`
  return (
    <>
      <ApiALert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entitiyName}`}
      /> 

      <ApiALert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entitiyName}/{${entitiyIdName}}`}
      /> 
      <ApiALert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entitiyName}`}
      /> 
      <ApiALert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entitiyName}/{${entitiyIdName}}`}
      /> 
      <ApiALert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entitiyName}/{${entitiyIdName}}`}
      /> 
    </>
  )
}
