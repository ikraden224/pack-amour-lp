import Hero from "@/components/sections/Hero";
import PackContents from "@/components/sections/PackContents";
import Testimonials from "@/components/sections/Testimonials";
import OrderForm from "@/components/sections/OrderForm";
import PageTracker from "@/components/analytics/PageTracker";

export default function Home() {
  return (
    <>
      <PageTracker />
      <Hero />
      <PackContents />
      <Testimonials />
      <OrderForm />
    </>
  );
}
