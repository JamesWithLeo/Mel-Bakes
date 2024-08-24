import { Link } from "react-router-dom";
export default function CustomerService() {
  return (
    <div>
      <div className="sticky top-0 z-0 flex w-full justify-center bg-secondarylight drop-shadow-lg">
        <header className="flex h-16 max-h-max w-full max-w-7xl items-center justify-between px-4">
          <div className="flex items-baseline gap-4">
            <Link className="font-[Lobster] text-3xl text-[#424874]" to={"/"}>
              Mel Bakes
            </Link>
          </div>
        </header>
      </div>

      <section className="flex flex-col gap-2 px-4 py-4" id="faqs">
        <h1 className="font-[Lobster] text-2xl text-primary">
          Frequently ask question
        </h1>

        <details className="" name="faqs">
          <summary className="font-raleway text-lg text-darker">
            What types of cupcakes do you offer?
          </summary>
          <h1 className="pl-8 font-light">
            We offer a wide variety of cupcakes, including classic flavors like
            vanilla, chocolate, and red velvet, as well as specialty cupcakes
            like salted caramel, cookies and cream, and seasonal flavors. All
            our cupcakes are made fresh daily.
          </h1>
        </details>

        <details className="" name="faqs">
          <summary className="font-raleway text-lg text-darker">
            Do you offer gluten-free or vegan options?
          </summary>
          <h1 className="pl-8 font-light">
            Yes, we have gluten-free and vegan cupcake options available. Please
            check our menu for specific flavors, or contact us to inquire about
            custom orders.
          </h1>
        </details>
        <details className="" name="faqs">
          <summary className="font-raleway text-lg text-darker">
            How do I place an order?
          </summary>
          <h1 className="pl-8 font-light">
            You can place an order directly on our website by selecting your
            desired cupcakes, adding them to your cart, and proceeding to
            checkout. You can also call us to place an order over the phone.
          </h1>
        </details>
        <details className="" name="faqs">
          <summary className="font-raleway text-lg text-darker">
            Do you offer delivery?
          </summary>
          <h1 className="pl-8 font-light">
            Yes, we offer delivery to various locations. During checkout, you
            can enter your delivery address to see if we deliver to your area.
            Delivery fees and times may vary depending on your location.
          </h1>
        </details>

        <details className="" name="faqs">
          <summary className="font-raleway text-lg text-darker">
            How far in advance should I place my order?
          </summary>
          <h1 className="pl-8 font-light">
            We recommend placing your order at least 24 hours in advance for
            regular orders. For larger or custom orders, please place your order
            at least 48 hours in advance.
          </h1>
        </details>
        <details className="" name="faqs">
          <summary className="font-raleway text-lg text-darker">
            Can I customize my cupcakes?
          </summary>
          <h1 className="pl-8 font-light">
            Absolutely! You can customize your cupcakes with different flavors,
            fillings, and toppings. We also offer custom decorations for special
            occasions. Please contact us directly to discuss your customization
            options.
          </h1>
        </details>

        <details className="" name="faqs">
          <summary className="font-raleway text-lg text-darker">
            What is your return and refund policy?
          </summary>
          <h1 className="pl-8 font-light">
            Due to the perishable nature of our products, we do not accept
            returns. However, if you are unsatisfied with your order, please
            contact us within 24 hours of receiving your cupcakes, and we will
            do our best to resolve the issue.
          </h1>
        </details>

        <details className="" name="faqs">
          <summary className="font-raleway text-lg text-darker">
            Do you offer bulk orders for events?
          </summary>
          <h1 className="pl-8 font-light">
            Yes, we cater to events such as weddings, birthdays, and corporate
            functions. Please contact us for more information on bulk orders and
            pricing.
          </h1>
        </details>

        <details className="" name="faqs">
          <summary className="font-raleway text-lg text-darker">
            How do I track my order?
          </summary>
          <h1 className="pl-8 font-light">
            Once your order is placed, you will receive an email confirmation.
            If you have selected delivery, you will receive updates on your
            order status, including when it’s out for delivery. You can also
            track your order through your account on our website.
          </h1>
        </details>

        <details className="" name="faqs">
          <summary className="font-raleway text-lg text-darker">
            Can I pick up my order?
          </summary>
          <h1 className="pl-8 font-light">
            Yes, you can choose to pick up your order from our store. During
            checkout, select the pickup option and choose your preferred pickup
            time.
          </h1>
        </details>

        <details className="" name="faqs">
          <summary className="font-raleway text-lg text-darker">
            What payment methods do you accept?
          </summary>
          <h1 className="pl-8 font-light">
            We accept all major credit cards, PayPal, and Apple Pay. Payment is
            processed securely through our website at the time of checkout.
          </h1>
        </details>
        <details className="" name="faqs">
          <summary className="font-raleway text-lg text-darker">
            How do I contact customer support?
          </summary>
          <h1 className="pl-8 font-light">
            You can reach our customer support team by emailing us at
            support@melbakes.com or calling us at (555) 123-4567 during business
            hours.
          </h1>
        </details>
      </section>
      <section className="flex flex-col gap-2 px-4 py-4">
        <h1 className="font-[Lobster] text-2xl text-primary">
          Allergy Information
        </h1>
        <h1 className="font-raleway text-darker">
          At Mel Bakes, we take the safety of our customers seriously. Please be
          aware that our products may contain allergens. If you have any
          allergies, we strongly recommend reading the information below and
          contacting us with any concerns before placing your order.
        </h1>
        <h1 className="font-raleway text-darker underline underline-offset-2">
          Nuts: All of our chocolate cupcake contains almonds and is made in a
          facility that processes peanuts and other tree nuts.
        </h1>
        <h1 className="font-raleway text-darker underline underline-offset-2">
          Dairy: All of our cupcakes contain milk and butter.
        </h1>
        <h1 className="font-raleway text-darker underline underline-offset-2">
          Eggs: Eggs are used in the batter and some frostings.
        </h1>
        <h1 className="font-raleway text-darker underline underline-offset-2">
          Gluten: All of our cupcakes contain wheat flour and are not suitable
          for those with gluten intolerance.
        </h1>
        <h1 className="font-raleway text-darker underline underline-offset-2">
          Soy: Our Chocolate Delight cupcake contains soy lecithin.
        </h1>
      </section>
      <section className="flex flex-col gap-2 px-4 py-4">
        <h1 className="font-[Lobster] text-2xl text-primary">Privacy Policy</h1>
        <h1 className="font-raleway text-darker">
          Welcome to Mel Bakes. We are committed to protecting your privacy and
          ensuring that your personal information is handled in a safe and
          responsible manner. This Privacy Policy outlines the types of
          information we collect, how we use it, and the steps we take to
          protect your information.
        </h1>
        <h1 className="font-raleway text-darker">
          We collect various types of information when you visit or make a
          purchase on our website:
        </h1>
        <details className="" name="policy">
          <summary className="font-raleway text-lg text-darker">
            Personal Information
          </summary>
          <h1 className="font-light">
            This includes your name, email address, phone number, shipping and
            billing addresses, payment information, and any other information
            you provide during the checkout process.
          </h1>
        </details>

        <details className="" name="policy">
          <summary className="font-raleway text-lg text-darker">
            Usage Data
          </summary>
          <h1 className="font-light">
            We collect information on how you interact with our website, such as
            your IP address, browser type, operating system, pages viewed, and
            the date and time of your visit.
          </h1>
        </details>

        <h1 className="font-raleway text-darker">
          We use the information we collect for the following purposes:
        </h1>
        <details name="policy">
          <summary className="font-raleway text-lg text-darker">
            Order Processing
          </summary>
          <h1 className="font-light">
            To process and fulfill your orders, including payment processing,
            shipping, and providing customer support.
          </h1>
        </details>

        <details name="policy">
          <summary className="font-raleway text-lg text-darker">
            Communication
          </summary>
          <h1 className="font-light">
            To send you order confirmations, updates, and promotional materials
            if you have opted to receive them.
          </h1>
        </details>

        <details name="policy">
          <summary className="font-raleway text-lg text-darker">
            Website improvement
          </summary>
          <h1 className="font-light">
            To improve our website, personalize your experience, and enhance our
            services.
          </h1>
        </details>
        <h1 className="font-raleway text-darker">
          You have certain rights regarding the personal information we collect
          and hold about you:
        </h1>

        <details name="policy">
          <summary className="font-raleway text-lg text-darker">
            Access and Correction
          </summary>
          <h1 className="font-light">
            You have the right to access and correct your personal information.
            You can update your account information by logging into your account
            on our website or contacting us directly.
          </h1>
        </details>
        <details name="policy">
          <summary className="font-raleway text-lg text-darker">
            Opt-out
          </summary>
          <h1 className="font-light">
            You can opt out of receiving promotional emails from us by following
            the unsubscribe instructions in those emails. Please note that even
            if you opt out, we may still send you non-promotional emails related
            to your orders or your account.
          </h1>
        </details>
        <details name="policy">
          <summary className="font-raleway text-lg text-darker">
            Children Privacy
          </summary>
          <h1 className="font-light">
            Our website is not intended for children under the age of 13. We do
            not knowingly collect personal information from children under 13.
            If you believe we have collected such information, please contact
            us, and we will take steps to delete it.
          </h1>
        </details>
      </section>
      <section className="flex flex-col gap-2 px-4 py-4">
        <h1 className="font-[Lobster] text-2xl text-primary">
          Return and Refunds
        </h1>
        <h1 className="font-raleway text-darker">
          On the way orders can't be cancelled
        </h1>
      </section>
    </div>
  );
}
