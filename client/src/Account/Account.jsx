import { useEffect, useState } from "react";

export default function Account() {
  const [account, setAccount] = useState({});
  useEffect(() => {
    const id = localStorage.getItem("id");
    async function fetchAccount() {
      await fetch("/melbake/profile/" + id).then((response) => {
        response.json().then((Account) => {
          console.log(Account);
          setAccount(Account);
        });
      });
    }
    fetchAccount();
  }, []);
  return (
    <div className="h-screen w-full">
      <h1>Account</h1>
      {account.length ? (
        <>
          <h1>
            {account.FirstName} {account.LastName}
          </h1>
          <h1>{account._id}</h1>
          <h1>Item in the cart: {account.Cart.length}</h1>
          <h1>Item Order: {account.Orders.length}</h1>
          <h1>Item recieved: {account.Recieved.length}</h1>
        </>
      ) : null}
    </div>
  );
}
