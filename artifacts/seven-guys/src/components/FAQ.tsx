import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "Do you deliver?",
    a: "Yes! We offer fast and hot delivery all over Gujranwala. Order easily via WhatsApp."
  },
  {
    q: "What areas do you deliver to?",
    a: "We deliver across the entirety of Gujranwala city from our three strategically located branches to ensure your food arrives fresh and hot."
  },
  {
    q: "What are your hours?",
    a: "All our branches are open daily from 2:00 PM to 2:00 AM. Perfect for lunch, dinner, or late-night cravings."
  },
  {
    q: "How do I order?",
    a: "The fastest way to order is by clicking any 'Order Now' button on our website, which will connect you directly to our WhatsApp ordering system at 0319-4800036."
  },
  {
    q: "What makes Detroit Pizza different?",
    a: "Detroit-style pizza is a deep-dish rectangular pizza topped with Wisconsin brick cheese that goes all the way to the edges. When baked in our authentic blue steel pans, the cheese caramelizes against the sides yielding a crispy, lacy edge while the center remains thick, airy, and light."
  },
  {
    q: "Do you have deals?",
    a: "Yes! We have premium combos like Deal 1 (Single Guy) up to Deal 4 (2 Guys Plus) offering great value on our burgers, fries, and drinks."
  }
];

export function FAQ() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-4"
          >
            COMMON <span className="text-secondary">QUESTIONS</span>
          </motion.h2>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <Accordion.Item 
              key={i} 
              value={`item-${i}`}
              className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 data-[state=open]:bg-white data-[state=open]:border-primary/30 transition-colors shadow-sm"
            >
              <Accordion.Header>
                <Accordion.Trigger className="flex flex-1 items-center justify-between py-5 px-6 font-heading font-bold text-lg text-primary w-full text-left [&[data-state=open]>svg]:rotate-180 transition-all">
                  {faq.q}
                  <ChevronDown className="text-secondary transition-transform duration-300" size={24} />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden text-muted-foreground text-base data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown px-6 pb-5 pt-0">
                {faq.a}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
