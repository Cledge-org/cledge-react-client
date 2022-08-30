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
            <h1>Thank you for your order!</h1>
            <h1>Hopefully, you enjoy our product!</h1>
            <br></br>
            <h1>Frontend can make it look pretty.</h1>
        </div>
    )
}