import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        About ReachOut
      </h1>

      <Card className="p-6 space-y-6 bg-background text-foreground">
        <CardContent className="space-y-6">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p className="text-muted-foreground">
              At <span className="font-semibold text-primary">ReachOut</span>,
              we believe that helping hands should never be out of reach. Our
              mission is to connect people who need help with those who are
              willing to offer it — quickly, safely, and efficiently.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">What We Do</h2>
            <p className="text-muted-foreground">
              ReachOut is a community-driven platform where individuals can
              request assistance or offer their skills, time, or resources to
              others. Whether it's finding volunteers for an event, offering
              supplies during emergencies, or simply helping out neighbors —
              ReachOut makes it easier to connect and support each other.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Why ReachOut?</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Simple and secure way to request and offer help.</li>
              <li>
                Organized categories to easily find the type of help you need.
              </li>
              <li>Real-time updates and notifications for quick responses.</li>
              <li>
                Built to create a positive impact, one small act at a time.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
            <p className="text-muted-foreground">
              We envision a world where communities are stronger because people
              feel empowered to both seek and offer help without hesitation.
              Together, we can build a network of kindness, trust, and
              meaningful support.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
