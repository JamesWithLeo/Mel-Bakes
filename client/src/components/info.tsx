import * as React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
export default function Info() {
  return (
    <div>
      <div className="sticky top-0 z-0 flex w-full justify-center bg-secondarylight drop-shadow-lg">
        <header className="flex h-16 max-h-max w-full max-w-7xl items-center justify-between px-4">
          <div className="flex items-baseline gap-4">
            <Link className="font-[Lobster] text-3xl text-[#424874]" to={"/"}>
              Mel Bakes
            </Link>
            <FontAwesomeIcon icon={faAngleRight} className="text-[#424874]" />
            <h1 className="font-[Lobster] text-2xl text-[#424874]">Faqs</h1>
          </div>
        </header>
      </div>
      <h1>Order Process</h1>
      <h1>Payment Methods</h1>
      <h1>Returns and Refund</h1>
      <h1>Allergy Information</h1>
      <h1>Privacy Policy</h1>
      <h1>
        1. What types of cupcakes do you offer? We offer a wide variety of
        cupcakes, including classic flavors like vanilla, chocolate, and red
        velvet, as well as specialty cupcakes like salted caramel, cookies and
        cream, and seasonal flavors. All our cupcakes are made fresh daily.
      </h1>
      <h1>
        2. Do you offer gluten-free or vegan options? Yes, we have gluten-free
        and vegan cupcake options available. Please check our menu for specific
        flavors, or contact us to inquire about custom orders.
      </h1>
      <h1>
        3. How do I place an order? You can place an order directly on our
        website by selecting your desired cupcakes, adding them to your cart,
        and proceeding to checkout. You can also call us to place an order over
        the phone.
      </h1>
      <h1>
        4. Do you offer delivery? Yes, we offer delivery to various locations.
        During checkout, you can enter your delivery address to see if we
        deliver to your area. Delivery fees and times may vary depending on your
        location.
      </h1>

      <h1>
        5. How far in advance should I place my order? We recommend placing your
        order at least 24 hours in advance for regular orders. For larger or
        custom orders, please place your order at least 48 hours in advance.
      </h1>
      <h1>
        6. Can I customize my cupcakes? Absolutely! You can customize your
        cupcakes with different flavors, fillings, and toppings. We also offer
        custom decorations for special occasions. Please contact us directly to
        discuss your customization options.
      </h1>
      <h1>
        7. What is your return and refund policy? Due to the perishable nature
        of our products, we do not accept returns. However, if you are
        unsatisfied with your order, please contact us within 24 hours of
        receiving your cupcakes, and we will do our best to resolve the issue.
      </h1>

      <h1>
        8. Do you offer bulk orders for events? Yes, we cater to events such as
        weddings, birthdays, and corporate functions. Please contact us for more
        information on bulk orders and pricing.
      </h1>

      <h1>
        9. How do I track my order? Once your order is placed, you will receive
        an email confirmation. If you have selected delivery, you will receive
        updates on your order status, including when it’s out for delivery. You
        can also track your order through your account on our website.
      </h1>
      <h1>
        10. Can I pick up my order? Yes, you can choose to pick up your order
        from our store. During checkout, select the pickup option and choose
        your preferred pickup time.
      </h1>
      <h1>
        11. What payment methods do you accept? We accept all major credit
        cards, PayPal, and Apple Pay. Payment is processed securely through our
        website at the time of checkout.
      </h1>
      <h1>
        12. How do I contact customer support? You can reach our customer
        support team by emailing us at support@melbakes.com or calling us at
        (555) 123-4567 during business hours.
      </h1>
    </div>
  );
}
