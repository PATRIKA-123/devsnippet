import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Zap, Share2, Search } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function Landing() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );

    gsap.fromTo(
      featuresRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const features = [
    {
      icon: <Code2 size={24} className="text-blue-400" />,
      title: "Syntax Highlighting",
      desc: "Beautiful, readable code across 15+ languages, instantly.",
    },
    {
      icon: <Search size={24} className="text-blue-400" />,
      title: "Instant Search",
      desc: "Find any snippet by title, tag, or code content in seconds.",
    },
    {
      icon: <Share2 size={24} className="text-blue-400" />,
      title: "Public Sharing",
      desc: "Generate a shareable link for any snippet, no login required to view.",
    },
    {
      icon: <Zap size={24} className="text-blue-400" />,
      title: "Fast & Lightweight",
      desc: "Built for speed — save and retrieve code without the clutter.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <nav className="flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-2 font-bold text-lg">
          <Code2 size={22} className="text-blue-400" />
          DevSnippets
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="text-gray-300 hover:text-white transition">
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
          >
            Sign up
          </Link>
        </div>
      </nav>

      <section
        ref={heroRef}
        className="flex flex-col items-center text-center px-6 pt-20 pb-24 md:pt-32 md:pb-32"
      >
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight"
        >
          Your code snippets,
          <span className="text-blue-400"> organized</span> and
          <span className="text-blue-400"> shareable</span>
        </h1>
        <p ref={subtitleRef} className="text-gray-400 text-lg mt-6 max-w-xl">
          Stop losing that one useful function in old projects. Save it once,
          find it instantly, share it anywhere.
        </p>
        <div ref={ctaRef} className="mt-8 flex gap-4">
          <Link
            to="/signup"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            Get started — it's free
          </Link>
          <Link
            to="/login"
            className="border border-gray-700 hover:border-gray-500 px-6 py-3 rounded-lg font-semibold transition"
          >
            Log in
          </Link>
        </div>
      </section>

      <section
        ref={featuresRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-12 pb-24 max-w-6xl mx-auto"
      >
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition"
          >
            <div className="mb-3">{f.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      <footer className="text-center text-gray-500 text-sm pb-8">
        Built with the MERN stack · DevSnippets
      </footer>
    </div>
  );
}

export default Landing;