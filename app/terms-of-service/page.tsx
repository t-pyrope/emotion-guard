import { PageContainer } from "@/app/components/PageContainer";

export default function Page() {
  return (
    <PageContainer title="Terms of Service">
      <div className="flex flex-col gap-4">
        <p>
          Last updated: <time dateTime="2026-01-21">21.1.2026</time>
        </p>
        <section className="flex flex-col gap-2">
          <h3 className="text-xl">1. Service description</h3>
          <p>Daily Signal is a web-based software tool that provides:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>Daily check-ins</li>
            <li>Rule-based usage guidance</li>
            <li>Optional analytical reports</li>
          </ul>

          <p>
            The service does not provide medical, psychological, or professional
            advice.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-xl">2. Use of the service</h3>
          <p> You may use the service as-is.</p>
          <p>
            You are responsible for how you apply any information or insights
            provided.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-xl">3. Paid features</h3>
          <p>Some features may require a one-time payment.</p>
          <p>Prices are displayed at checkout</p>
          <p>Payments are processed by Stripe</p>
          <p>Access to paid features is granted after successful payment</p>
          <p>
            We reserve the right to change pricing or availability of features.
          </p>
          <p>
            Due to the nature of digital services, payments are non-refundable
            once access is granted, unless required by applicable law.
          </p>
          <p>
            We may, at our discretion, provide a refund in individual cases if
            the service was not meaningfully used.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-xl">4. No guarantees</h3>
          <p>
            The service is provided “as is”, without warranties of any kind.
          </p>
          <p>
            We do not guarantee specific outcomes, productivity improvements, or
            results.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-xl">5. Limitation of liability</h3>
          <p>
            To the maximum extent permitted by law, Marmalade skies s.r.o. shall
            not be liable for indirect or consequential damages arising from use
            of the service.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-xl">6. Termination</h3>
          <p>
            We may suspend or terminate access if the service is misused or used
            unlawfully.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-xl">7. Governing law</h3>
          <p>These Terms are governed by the laws of the Czech Republic.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-xl">8. Contact</h3>
          <p>
            For questions regarding these Terms, contact:{" "}
            <a href="mailto:hello@marmaladeskies.dev">
              hello@marmaladeskies.dev
            </a>
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
