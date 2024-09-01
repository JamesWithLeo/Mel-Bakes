import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IOrder } from "../appTypes";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useRemoveNewOrder } from "./new";

export default function NewOrderCard({ order }: { order: IOrder }) {
  const { mutateAsync, isPending } = useRemoveNewOrder();
  const millisecondsInOneSecond = 1000;
  const secondsInOneHour = 3600;
  const HoursInOneDay = 24;
  const currentDate = new Date().getTime() - order.dateOrdered;
  const diffrenceInDays =
    currentDate / (millisecondsInOneSecond * secondsInOneHour * HoursInOneDay);

  const orderHour = Number(order.timeOrdered.split(":")[0]);
  const orderMinutes = Number(order.timeOrdered.split(":")[1]);
  let currentHour = new Date().getHours();
  let currentMinutes = new Date().getMinutes();
  let hoursAgo;
  let minutesAgo;
  if (orderMinutes > new Date().getMinutes()) {
    hoursAgo = currentHour - 1 - orderHour;
    minutesAgo = currentMinutes + 60 - orderMinutes;
  } else {
    hoursAgo = currentHour - orderHour;
    minutesAgo = currentMinutes - orderMinutes;
  }

  return (
    <div className="flex w-52 flex-col rounded border border-gray-100 border-transparent p-2 text-sm hover:bg-gray-50 lg:w-56">
      <section className="flex items-center gap-2 self-end align-middle text-[10px] text-gray-400">
        <span className="flex gap-1">
          {diffrenceInDays >= 1 ? (
            <>
              {Number(diffrenceInDays.toFixed()) !== 1 ? (
                <h1>{diffrenceInDays.toFixed()} days ago,</h1>
              ) : (
                <h1>{diffrenceInDays.toFixed()} day ago,</h1>
              )}
            </>
          ) : null}
          {hoursAgo > 0 ? (
            <>
              {hoursAgo !== 1 ? (
                <h1>{hoursAgo} hours</h1>
              ) : (
                <h1>{hoursAgo} hour</h1>
              )}
            </>
          ) : null}
          {minutesAgo !== 1 ? (
            <h1>{minutesAgo} minutes ago</h1>
          ) : (
            <h1>{minutesAgo} minute ago</h1>
          )}
        </span>
        <button
          className=""
          onClick={() => {
            if (!isPending) mutateAsync(order._id);
          }}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </section>
      <span className="font-Redhat text-gray-400">
        <h1 className="text-sm text-primary">{order.Name}</h1>
        <h1 className="text-[10px]">{order._id}</h1>
      </span>
    </div>
  );
}
