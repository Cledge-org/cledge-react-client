import { useRouter } from "next/router"
import useSWR from 'swr'
import { DateSchema } from "yup";

export default function Result() {
    const router = useRouter();

    const { data, error } = useSWR(
        router.query.session_id
        ? `/api/checkout/${router.query.session_id}`
        : null,
        (url) => fetch(url).then(res => res.json())
    )

    return(
        <div>
            <h1>Payment Result</h1>
            <pre>{data ? JSON.stringify(data, null, 2) : 'Waiting...'}</pre>
        </div>
    )
}