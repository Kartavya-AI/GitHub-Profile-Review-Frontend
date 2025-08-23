import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { AuroraText } from "@/components/magicui/aurora-text";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import githubIllustration from "../../public/images/markus-spiske-XrIfY_4cK1w-unsplash.jpg";
import open from "../../public/images/share (1).png";
import profile from "../../public/images/profile-user.png";

import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { TextAnimate } from "@/components/magicui/text-animate";

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
                    src={profile}
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
        <main className="mx-auto bg-zinc-100">
            <InteractiveGridPattern
                className={cn(
                    "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                    "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
                )}
            />
            <section className="pt-20 z-20 px-4 md:px-36 flex flex-col justify-center items-center text-center">
                {/* Badge */}
                <div className="group mb-5 relative mx-auto flex items-center justify-center rounded-full px-2 py-1.5 bg-zinc-100 shadow-zinc-500 shadow-md inset-shadow-2xs inset-shadow-white">
                    <h1 className="bg-zinc-100 shadow-zinc-500 shadow-md inset-shadow-2xs inset-shadow-white rounded-full h-8 w-8 flex justify-center items-center">
                        🔍
                    </h1>

                    <div className="text-sm font-light px-3 text-zinc-600">
                        <AuroraText>GitHub Profile Review Assistant</AuroraText>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-5xl z-20 md:text-7xl font-bold tracking-tight leading-tight text-primary mb-6">
                    <AuroraText>Evaluate Developers</AuroraText> with AI-Powered
                    GitHub Insights
                </h1>

                {/* Subheading */}
                <TextAnimate
                    animation="slideUp"
                    by="word"
                    className="text-lg z-20 md:text-xl text-muted-foreground max-w-2xl mb-8"
                >
                    Empower hiring teams to make confident, data-driven
                    decisions by analyzing GitHub profiles — surfacing skills,
                    project strengths, and collaboration habits in minutes.
                </TextAnimate>

                {/* CTA */}
                <div className="z-20">
                    <Link
                        href="/profile-review"
                        className="rounded-full px-4 py-2 text-xl hover:shadow-lg cursor-pointer text-zinc-600 bg-zinc-100 shadow-zinc-500 shadow-md flex items-center gap-2"
                    >
                        <span>Review a GitHub Profile</span>
                        <div className="rounded-full h-9 w-9 flex justify-center items-center hover:shadow-lg cursor-pointer text-zinc-600 bg-zinc-100 shadow-zinc-500 shadow-md">
                            <Image
                                src={open}
                                alt="open icon"
                                className="h-6 w-6"
                            />
                        </div>
                    </Link>
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
                        <Link href="/profile-review">
                            <button className="shadow-2xl">
                                <span className="rounded-full px-4 py-2 text-xl hover:shadow-lg cursor-pointer text-zinc-600 bg-zinc-100 shadow-zinc-500 shadow-md inset-shadow-2xs inset-shadow-white">
                                    ● Review a GitHub Profile
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Image Section */}
                <div className="md:w-1/2 mt-10 md:mt-0 order-1 md:order-2 flex bg-zinc-100 shadow-zinc-500 shadow-md inset-shadow-2xs inset-shadow-white p-2 rounded-2xl justify-center">
                    <Image
                        src={githubIllustration} // Replace with an illustration relevant to GitHub/code review
                        alt="GitHub Profile Review Assistant"
                        className="w-full shadow-lg h-full rounded-lg object-cover"
                        width={10}
                        height={10}
                        unoptimized
                    />
                </div>
            </section>

            <section className="mt-20 mx-4 md:mx-36">
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                    <Marquee pauseOnHover className="[--duration:20s]">
                        {firstRow.map((review) => (
                            <ReviewCard key={review.username} {...review} />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover className="[--duration:20s]">
                        {secondRow.map((review) => (
                            <ReviewCard key={review.username} {...review} />
                        ))}
                    </Marquee>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-zinc-100"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-zinc-100"></div>
                </div>
            </section>

            <section className="px-4 md:px-36 mt-20 bg-zinc-100 py-10">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="item-1"
                >
                    <h1 className="text-4xl mb-5 font-bold">FAQ&apos;S</h1>

                    <AccordionItem
                        value="item-1"
                        className="bg-zinc-100 shadow-zinc-500 shadow-md inset-shadow-2xs inset-shadow-white rounded-2xl px-5 my-2"
                    >
                        <AccordionTrigger>
                            1. What is the GitHub Profile Review Assistant?
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>
                                It&apos;s an AI-powered tool that analyzes
                                GitHub profiles to highlight skills, code
                                quality, project strengths, and collaboration
                                habits — helping teams evaluate developers more
                                efficiently.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                        value="item-2"
                        className="bg-zinc-100 shadow-zinc-500 shadow-md inset-shadow-2xs inset-shadow-white rounded-2xl px-5 my-2"
                    >
                        <AccordionTrigger>
                            2. How does it work?
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>
                                Enter a GitHub username, and the AI scans public
                                repositories, contributions, pull requests, and
                                projects. It then generates a structured summary
                                of technical expertise and coding practices.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                        value="item-3"
                        className="bg-zinc-100 shadow-zinc-500 shadow-md inset-shadow-2xs inset-shadow-white rounded-2xl px-5 my-2"
                    >
                        <AccordionTrigger>
                            3. What kind of insights does it provide?
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>
                                The assistant highlights languages, frameworks,
                                code quality, contribution graph summaries,
                                open-source involvement, and collaboration
                                patterns. It also benchmarks activity against
                                peers or role standards.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                        value="item-4"
                        className="bg-zinc-100 shadow-zinc-500 shadow-md inset-shadow-2xs inset-shadow-white rounded-2xl px-5 my-2"
                    >
                        <AccordionTrigger>
                            4. Who can benefit from this tool?
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>
                                Recruiters, hiring managers, technical leads,
                                and HR teams who need objective insights into
                                candidates&apos; technical depth and coding
                                practices. It&apos;s also useful for agencies
                                shortlisting freelance talent.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                        value="item-5"
                        className="bg-zinc-100 shadow-zinc-500 shadow-md inset-shadow-2xs inset-shadow-white rounded-2xl px-5 my-2"
                    >
                        <AccordionTrigger>
                            5. Does it analyze private repositories?
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>
                                No. The assistant only analyzes publicly
                                available repositories, commits, and
                                contributions to ensure transparency and
                                security.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                        value="item-6"
                        className="bg-zinc-100 shadow-zinc-500 shadow-md inset-shadow-2xs inset-shadow-white rounded-2xl px-5 my-2"
                    >
                        <AccordionTrigger>
                            6. Can it compare multiple candidates?
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>
                                Yes. You can run reviews on multiple GitHub
                                profiles and benchmark them side-by-side against
                                peer activity or role requirements.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                        value="item-7"
                        className="bg-zinc-100 shadow-zinc-500 shadow-md inset-shadow-2xs inset-shadow-white rounded-2xl px-5 my-2"
                    >
                        <AccordionTrigger>
                            7. Can I export the analysis?
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>
                                Yes. The generated profile reviews can be
                                exported in PDF or Markdown format, or copied
                                directly for reports and presentations.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                        value="item-8"
                        className="bg-zinc-100 shadow-zinc-500 shadow-md inset-shadow-2xs inset-shadow-white rounded-2xl px-5 my-2"
                    >
                        <AccordionTrigger>
                            8. Is it free to use?
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>
                                Basic profile summaries are free. Advanced
                                features like benchmarking, deeper code quality
                                metrics, and export options may require a
                                subscription.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
        </main>
    );
}
