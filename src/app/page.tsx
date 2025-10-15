import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { AuroraText } from "@/components/magicui/aurora-text";
import ShimmerButton from "@/components/ShimmerButton";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { TextAnimate } from "@/components/magicui/text-animate";
import VantaFogBackground from "@/components/VantaFogBackground";
const reviews = [
    {
        name: "Neha Kapoor",
        username: "@neha_recruiter",
        body: "This tool completely changed the way I shortlist developers. Instead of scanning dozens of GitHub profiles manually, I get instant insights into skills, activity, and collaboration habits.",
    },
    {
        name: "Arjun Menon",
        username: "@arjun_hr",
        body: "As an HR professional, I can now understand technical depth without needing to write code myself. The summaries make candidate screening 10x faster and more objective.",
    },
    {
        name: "Simran Kaur",
        username: "@simran_talent",
        body: "The benchmarking feature is amazing — I can compare a candidate’s GitHub activity against peers for similar roles. It adds so much clarity to hiring decisions.",
    },
    {
        name: "Karan Malhotra",
        username: "@karan_lead",
        body: "I used it for evaluating open-source contributors, and it highlighted their best projects, code quality, and collaboration style. It’s like an X-ray for GitHub profiles.",
    },
    {
        name: "Ritika Joshi",
        username: "@ritika_agency",
        body: "Our agency now saves hours every week when shortlisting remote developers. The assistant filters noise and surfaces exactly what clients want to see.",
    },
    {
        name: "Vikram Desai",
        username: "@vikram_cto",
        body: "I love how unbiased the reports are. Instead of gut-feel hiring, we now rely on data-driven GitHub insights. It’s streamlined our entire recruitment pipeline.",
    },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
    name,
    username,
    body,
}: {
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 bg-zinc-100  shadow-zinc-500 shadow-md inset-shadow-2xs inset-shadow-white"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <Image
                    className="rounded-full"
                    width="32"
                    height="32"
                    alt=""
                    src="/images/profile-user.png"
                />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">
                        {username}
                    </p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    );
};
  
const steps = [
    {
        title: "Step 1: Enter Candidate GitHub Profile",
        description:
            "Provide a GitHub username or profile link to begin the evaluation. (API: /analyze-profile)",
    },
    {
        title: "Step 2: Scan Repositories & Contributions",
        description:
            "The assistant reviews public repositories, code samples, and contribution activity to capture technical depth. (API: /scan-repos)",
    },
    {
        title: "Step 3: Detect Skills & Tech Stack",
        description:
            "Automatically identifies programming languages, frameworks, and tools used across projects. (API: /detect-skills)",
    },
    {
        title: "Step 4: Generate Profile Insights",
        description:
            "Summarizes contribution graph, pull requests, code quality, collaboration habits, and highlights key projects. (API: /generate-insights)",
    },
    {
        title: "Step 5: Review & Export Report",
        description:
            "View the structured candidate profile with benchmarks against role standards. Export as PDF, share internally, or integrate into ATS. (API: /export-report)",
    },
];

export default function Home() {
    return (
    <main className="relative bg-transparent overflow-hidden min-h-screen">
         <VantaFogBackground />
      <section className="relative min-h-[100vh] pt-28 px-6 md:px-36 max-w-6xl mx-auto text-center space-y-6 flex flex-col justify-center items-center z-10">
             {/* <section className="pt-28 px-6 md:px-36 max-w-6xl mx-auto text-center space-y-6">  */}
                <div className="inline-flex items-center gap-4 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 shadow-md">
                    <div className="bg-white rounded-full p-2 text-xl shadow">🔍</div>
                    <span className="text-indigo-800 font-semibold text-md tracking-wide">
                    <AuroraText>GitHub Profile Review Assistant</AuroraText>
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-indigo-900">
                    <AuroraText>Evaluate Developers</AuroraText> with AI-Powered GitHub Insights
                </h1>

                <TextAnimate
                    animation="slideUp"
                    by="word"
                    className="text-lg md:text-xl text-indigo-700 max-w-3xl mx-auto font-light"
                >
                    Empower hiring teams to make confident, data-driven decisions by analyzing GitHub profiles — surfacing skills, project strengths, and collaboration habits in minutes.
                </TextAnimate>

                <div className="mt-6">
                    <ShimmerButton className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg shadow-lg hover:shadow-2xl">
                    <Link href="/profile-review" className="flex items-center gap-3">
                        Review a GitHub Profile
                        <Image
                        src="/images/share (1).png"
                        alt="Open icon"
                        className="h-6 w-6"
                        width={24}
                        height={24}
                        />
                    </Link>
                    </ShimmerButton>
                </div>
                </section>

            <section className="pt-20 z-20 lg:pt-32 pb-10 px-4 md:px-36 mx-auto">
                <h2 className="text-4xl z-20 md:text-5xl font-bold text-center mb-16">
                    How It Works
                    {/* <AuroraText>How It Works</AuroraText> */}
                </h2>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="px-5 py-4 bg-zinc-100  shadow-zinc-500 shadow-md inset-shadow-2xs inset-shadow-white rounded-2xl  min-h-[180px] h-full"
                        >
                            <div className="p-0">
                                <h3 className="text-lg font-semibold text-primary">
                                    {String(step.title)}
                                </h3>
                            </div>
                            <div className="p-0 mt-2">
                                <TextAnimate
                                    animation="slideUp"
                                    by="word"
                                    className="text-muted-foreground text-sm leading-snug"
                                >
                                    {String(step.description)}
                                </TextAnimate>
                            </div>
                        </div>
                    ))}
                </div> 
            </section>

            


            <section className="flex mt-10 gap-8 flex-col md:flex-row items-center justify-between px-4 md:px-36 py-12">
                {/* Text Section */}
                <div className="md:w-1/2 text-center md:text-left space-y-4 order-2 md:order-1">
                    <h2 className="text-3xl md:text-5xl font-bold text-primary">
                        Analyze <AuroraText>GitHub Profiles</AuroraText> in
                        Seconds with AI
                    </h2>

                    <TextAnimate
                        animation="slideUp"
                        by="word"
                        className="text-lg z-20 md:text-xl text-muted-foreground max-w-2xl mb-8"
                    >
                        Empower hiring teams with data-informed insights. Our AI
                        scans repositories, contributions, and projects to
                        highlight skills, code quality, and collaboration habits
                        — helping you evaluate developers faster and more
                        objectively.
                    </TextAnimate>

                    <div className="mt-4">
                        <ShimmerButton className="flex items-center gap-2 px-6 py-3">
                        <Link href="/profile-review" className="flex items-center gap-2">
                            <span>● Review a GitHub Profile</span>
                            <Image
                            src="/images/share (1).png"
                            alt="open icon"
                            className="h-6 w-6"
                            width={24}
                            height={24}
                            />
                        </Link>
                    </ShimmerButton>
                    </div>
                </div>

                {/* Image Section */}
                <div className="md:w-1/2 mt-10 md:mt-0 order-1 md:order-2 flex bg-zinc-100 shadow-zinc-500 shadow-md inset-shadow-2xs inset-shadow-white p-2 rounded-2xl justify-center">
                    <Image
                        src="/images/markus-spiske-XrIfY_4cK1w-unsplash.jpg"
                        alt="GitHub Profile Review Assistant"
                        className="w-full shadow-lg h-full rounded-lg object-cover"
                        width={10}
                        height={10}
                        unoptimized
                    />
                </div>
            </section>

            <section className="mt-32 px-4 md:px-36">
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-12">
                    {/* Top Marquee Row */}
                    <Marquee
                    pauseOnHover
                    className="[--duration:30s] gap-6 py-6"
                    >
                    {firstRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                    </Marquee>

                    {/* Bottom Marquee Row (Reversed) */}
                    <Marquee
                    reverse
                    pauseOnHover
                    className="[--duration:30s] gap-6 py-6"
                    >
                    {secondRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                    </Marquee>

                    {/* Left & Right Gradient Masks */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white via-white/90 to-transparent z-10" />
                </div>
                </section>

            <section className="px-4 md:px-36 mt-32 bg-zinc-100 py-16">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-primary">
                    Frequently Asked Questions
                </h2>

                <Accordion
                    type="single"
                    collapsible
                    className="w-full max-w-4xl mx-auto"
                    defaultValue="item-1"
                >
                    {[
                    {
                        q: "What is the GitHub Profile Review Assistant?",
                        a: `It's an AI-powered tool that analyzes GitHub profiles to highlight skills, code quality, project strengths, and collaboration habits — helping teams evaluate developers more efficiently.`,
                    },
                    {
                        q: "How does it work?",
                        a: `Enter a GitHub username, and the AI scans public repositories, contributions, pull requests, and projects. It then generates a structured summary of technical expertise and coding practices.`,
                    },
                    {
                        q: "What kind of insights does it provide?",
                        a: `It highlights languages, frameworks, code quality, contribution graph summaries, open-source involvement, and collaboration patterns. It also benchmarks activity against peers or role standards.`,
                    },
                    {
                        q: "Who can benefit from this tool?",
                        a: `Recruiters, hiring managers, technical leads, and HR teams needing objective insights into candidates' technical depth. It's also useful for agencies shortlisting freelance talent.`,
                    },
                    {
                        q: "Does it analyze private repositories?",
                        a: `No. The assistant only analyzes publicly available repositories, commits, and contributions to ensure transparency and security.`,
                    },
                    {
                        q: "Can it compare multiple candidates?",
                        a: `Yes. You can review multiple profiles and benchmark them side-by-side against peer activity or role expectations.`,
                    },
                    {
                        q: "Can I export the analysis?",
                        a: `Yes. The profile reviews can be exported in PDF or Markdown format for reports and presentations.`,
                    },
                    {
                        q: "Is it free to use?",
                        a: `Basic summaries are free. Advanced features like benchmarking, deeper insights, and export options may require a subscription.`,
                    },
                    ].map((item, index) => (
                    // <AccordionItem
                    //     key={index}
                    //     value={`item-${index + 1}`}
                    //     className="bg-white rounded-xl border border-zinc-300 my-2 px-5"
                    // >
                    //     <AccordionTrigger className="text-lg font-medium text-left">
                    //     {index + 1}. {item.q}
                    //     </AccordionTrigger>
                    //     <AccordionContent className="text-zinc-600 text-sm mt-2 leading-relaxed">
                    //     {item.a}
                    //     </AccordionContent>
                    // </AccordionItem>
                    <AccordionItem
                        key={index}
                        value={`item-${index + 1}`}
                        className="bg-white rounded-xl border border-zinc-300 my-2 px-5"
                        >
                        <AccordionTrigger
                            className="
                                relative
                                text-lg font-medium text-left
                                text-zinc-800
                                no-underline
                                cursor-pointer
                                transition-all duration-300 ease-in-out
                                hover:text-[#4a90e2]        /* soft blue */
                                hover:bg-[#e6f0fa]          /* very light blue-gray */
                                hover:shadow-[#4a90e2]/30
                            "
                            >
                            {index + 1}. {item.q}
                            <span
                                className="
                                absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600
                                transition-all duration-300 ease-in-out
                                hover:w-full
                                "
                            />
                            </AccordionTrigger>

                        <AccordionContent className="text-zinc-600 text-sm mt-2 leading-relaxed">
                            {item.a}
                        </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                </section>

        </main>
    );
}
