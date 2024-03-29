import { useParams, useLocation } from 'react-router-dom';
import React from 'react';

export default function Invoices() {
  const params = useParams();
  const location = useLocation();
  console.log(location, 'location');
  console.log(params, 'params');
  return (
    <div>
      Invoices 組件 params:{params.invoicesOut}
      <p>App js Router 是 path=&quot /invoices/{params.invoicesOut}&quot </p>
      <p>params 物件內容為：</p>
      <p>invoicesOut : {params.invoicesOut}</p>
      <h4>屬性名字是router path帶的</h4>
      <h4>屬性內的值是 NavLink帶的 to=&quot /invoices/{params.invoicesOut}&quot </h4>
    </div>
  );
}
