import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ArrowRight, BarChart3, CheckCircle2, Clock3, MessagesSquare, Sparkles } from "lucide-react";
import type { FormEvent } from "react";

const Index = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = (formData.get("email") as string | null)?.trim();

    toast({
      title: "You’re on the waitlist",
      description: email ? `We’ll reach out to ${email} when spots open.` : "We’ll reach out as soon as spots open.",
    });

    event.currentTarget.reset();
  };

  const handleTopClick = () => {
    toast({
      title: "Join the waitlist",
      description: "Drop your work email below and we’ll confirm right away.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/80 backdrop-blur">
        <div className="container flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Sensei logo" className="h-10 w-auto rounded-md bg-card shadow-soft ring-1 ring-border object-contain p-1" />
            <div>
              <p className="text-lg font-semibold">Sensei</p>
              <p className="text-sm text-muted-foreground">For PE &amp; consulting teams</p>
            </div>
          </div>
          <Button size="sm" onClick={handleTopClick}>
            Join the waitlist
          </Button>
        </div>
      </header>

      <main className="flex flex-col gap-16 pb-16">
        {/* Screen 1: Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-accent/40 to-background pt-12 pb-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.16),transparent_28%),radial-gradient(circle_at_50%_80%,rgba(45,212,191,0.18),transparent_30%)]" />
          <div className="container relative">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 text-sm font-medium text-primary shadow-soft ring-1 ring-border backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Built for fast diligence
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                  Your fastest AI expert network – instantly book and learn from vetted experts.
                </h1>
                <p className="text-lg text-muted-foreground">
                  Sensei recommends best-fit experts in minutes and automates outreach, scheduling, compliance, and post-call analysis.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
                <Input name="email" type="email" placeholder="Work email" required className="h-12 text-base shadow-soft" />
                <Button type="submit" size="lg" className="h-12 px-6 bg-gradient-primary text-primary-foreground shadow-medium transition-transform hover:-translate-y-[2px]">
                  Join the waitlist
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
              <p className="text-sm text-muted-foreground">No spam. We’ll notify you as soon as seats open.</p>
            </div>
          </div>
        </section>

        {/* Screen 2: Problem framing */}
        <section className="container">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-medium hover:-translate-y-[2px] transition-transform">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold leading-tight">
                When the clock is expensive, “we’ll get back to you in 48 hours” is not an option.
              </h2>
              <p className="text-base text-muted-foreground">
                Sensei helps deal teams and diligence analysts validate markets, pricing, competition, and operations faster — without the
                traditional expert-network lag.
              </p>
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="container">
          <div className="flex flex-col gap-3 rounded-xl border border-dashed border-primary/30 bg-gradient-primary px-6 py-5 text-primary-foreground shadow-medium backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/90">Private beta</p>
              <p className="text-lg font-semibold text-primary-foreground">Get early access to the private beta.</p>
              <p className="text-sm text-primary-foreground/85">We’re onboarding a small number of PE teams each month.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Input name="email" type="email" placeholder="Work email" required className="h-11 sm:w-64 bg-card/90 text-foreground shadow-soft ring-1 ring-border/60" />
              <Button type="submit" size="sm" className="h-11 bg-card text-primary font-semibold shadow-soft hover:-translate-y-[1px] transition-transform">
                Join the waitlist
              </Button>
            </form>
          </div>
        </section>

        {/* Screen 3: Capabilities */}
        <section className="container space-y-6">
          <div className="space-y-2 text-left sm:text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Built for diligence</p>
            <h2 className="text-3xl font-bold">Move faster with AI-powered expert matching</h2>
            <p className="text-base text-muted-foreground sm:mx-auto sm:max-w-3xl">
              Sensei handles the entire expert workflow so your team can stay focused on the investment thesis.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1 hover:shadow-medium">
              <div className="flex items-center gap-3 text-primary">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock3 className="h-5 w-5" />
                </span>
                <p className="font-semibold">Calls in hours, not days</p>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Automated workflows keep diligence moving at deal speed.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1 hover:shadow-medium">
              <div className="flex items-center gap-3 text-primary">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
                  <Sparkles className="h-5 w-5" />
                </span>
                <p className="font-semibold">Instant expert recommendations</p>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Enter your diligence request. Sensei finds best-fit experts in minutes.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1 hover:shadow-medium">
              <div className="flex items-center gap-3 text-primary">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
                  <MessagesSquare className="h-5 w-5" />
                </span>
                <p className="font-semibold">No email back-and-forth</p>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Type in what you need. We handle outreach, screening, scheduling, and compliance.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1 hover:shadow-medium">
              <div className="flex items-center gap-3 text-primary">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <BarChart3 className="h-5 w-5" />
                </span>
                <p className="font-semibold">Diligence intelligence in one place</p>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Call transcripts, key takeaways, and synthesis ready for memos and slides.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-secondary/60 p-5 shadow-soft transition-transform hover:-translate-y-1 hover:shadow-medium">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">Optional AI-led calls</p>
                <p className="text-sm text-muted-foreground">
                  Automate interviews with your questions and scripts. Sensei runs the call, then delivers a clean synthesis with citations to exact transcript moments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Screen 4: How it works */}
        <section className="bg-gradient-to-b from-secondary/70 via-background to-secondary/50 py-12">
          <div className="container space-y-8">
            <div className="space-y-2 text-left sm:text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">How it works</p>
              <h2 className="text-3xl font-bold">From request to reportable insights</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "1) Describe your expert request",
                  body: "Industry, role, geography, seniority, and what you want to learn.",
                },
                {
                  title: "2) Review top matches",
                  body: "See ranked, pre-vetted experts with relevant experience. Connect or book in minutes.",
                },
                {
                  title: "3) Sensei runs the logistics",
                  body: "Outreach, screening, scheduling, NDAs, and compliance checks — handled automatically.",
                },
                {
                  title: "4) Turn conversations into reportable insights",
                  body: "Structured notes, transcripts, key insights, and synthesis organized by deal, theme, and question.",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1 hover:shadow-medium"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-soft">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold leading-tight">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
