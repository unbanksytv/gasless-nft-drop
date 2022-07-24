import { useRouter } from 'next/router'

export default function post(props) {
const router = useRouter()
console.log(router , 'routes')

return ( <h2> nftId {router.query.id} </h2> )
}