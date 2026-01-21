import { PageContainer } from "@/app/components/PageContainer";

export default function Page() {
  return (
    <PageContainer title="Privacy Policy">
      <div className="flex flex-col gap-4">
        <p>
          Last updated: <time dateTime="2026-01-21">21.1.2026</time>
        </p>

        <section className="flex flex-col gap-2">
          <h3 className="text-xl">1. Who we are</h3>
          <p>Daily Signal is operated by:</p>
          <address>
            <p>Marmalade skies s.r.o.</p>
            <p>IČO: 24372901</p>
            <p>Bělehradská 858/23, 120 00 Praha, Czech Republic</p>
            <p>
              <a href="mailto:hello@marmaladeskies.dev">
                hello@marmaladeskies.dev
              </a>
            </p>
          </address>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-xl">2. What data we collect</h3>
          <p>
            We collect only the minimum data required to operate the
            application.
          </p>
          <p>Data you provide:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>
              Optional onboarding preferences (e.g. usage context, load
              preferences)
            </li>
            <li>Signals and check-ins entered during app usage</li>
          </ul>
          <p>Automatically collected data:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>Technical data such as timestamps and timezone</li>
            <li>
              Anonymous identifiers used to associate app usage with your
              session
            </li>
          </ul>
          <p>We do not require account registration or passwords.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-xl">3. How we use data</h3>
          <p>We use collected data to:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>Compute daily states and rules</li>
            <li>Generate optional analytical reports</li>
            <li>Improve the functionality of the application</li>
          </ul>
          <p>We do not use data for advertising or profiling.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-xl">4. Payments</h3>
          <p>Payments are processed by Stripe.</p>
          <p>We do not store payment card details.</p>
          <p>
            Stripe acts as a data processor and handles payment-related personal
            data in accordance with its own privacy policy.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-xl">5. Emails</h3>
          <p>If email communication is enabled, emails are sent via Resend.</p>
          <p>
            Resend acts as a data processor and is used only to deliver
            service-related emails (such as purchase confirmations).
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-xl">6. Data retention</h3>
          <p>
            Data is stored only as long as necessary to provide the service.
          </p>
          <p>You may request deletion of your data by contacting us.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-xl">7. Your rights</h3>
          <p>Under GDPR, you have the right to:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>Access your data</li>
            <li>Request correction or deletion</li>
            <li>Restrict processing</li>
          </ul>
          <p>To exercise your rights, contact us at the address above.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-xl">8. Changes</h3>
          <p>
            This Privacy Policy may be updated. The latest version will always
            be available on this page.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
