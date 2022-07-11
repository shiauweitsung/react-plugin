import { useParams, useLocation } from "react-router-dom";


export default function Invoices() {
    let params = useParams();
    let location = useLocation();
    console.log(location, 'location');
    console.log(params, 'params');
    return (
        <div>
            Invoices 組件
            params:{params.invoicesOut}
        </div>
    )
}