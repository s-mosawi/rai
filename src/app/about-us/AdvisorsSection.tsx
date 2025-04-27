'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Advisor {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  bio: string;
}

function AdvisorCard({
  advisor,
  maxLength = 200,
}: {
  advisor: Advisor;
  maxLength?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded((prev) => !prev);

  // Only truncate if bio is longer than maxLength
  const shouldTruncate = advisor.bio.length > maxLength;
  const bioText =
    expanded || !shouldTruncate
      ? advisor.bio
      : advisor.bio.slice(0, maxLength) + '...';

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 relative">
        <div className="w-64 h-64 rounded-md overflow-hidden border-4 border-white shadow-lg">
          <Image
            src={advisor.image || '/placeholder.svg'}
            alt={advisor.name}
            width={256}
            height={256}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h3 className="text-2xl font-semibold text-gray-900">
            {advisor.name}
          </h3>
          {advisor.linkedin && advisor.linkedin !== '#' && (
            <Link
              href={advisor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-900 text-white hover:bg-purple-950 transition-colors inline-flex p-2 rounded-md"
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[20px] h-auto"
              >
                <path
                  d="M44.4469 0H3.54375C1.58437 0 0 1.54688 0 3.45938V44.5312C0 46.4437 1.58437 48 3.54375 48H44.4469C46.4062 48 48 46.4438 48 44.5406V3.45938C48 1.54688 46.4062 0 44.4469 0ZM14.2406 40.9031H7.11563V17.9906H14.2406V40.9031ZM10.6781 14.8688C8.39062 14.8688 6.54375 13.0219 6.54375 10.7437C6.54375 8.46562 8.39062 6.61875 10.6781 6.61875C12.9563 6.61875 14.8031 8.46562 14.8031 10.7437C14.8031 13.0125 12.9563 14.8688 10.6781 14.8688ZM40.9031 40.9031H33.7875V29.7656C33.7875 27.1125 33.7406 23.6906 30.0844 23.6906C26.3812 23.6906 25.8187 26.5875 25.8187 29.5781V40.9031H18.7125V17.9906H25.5375V21.1219H25.6312C26.5781 19.3219 28.9031 17.4188 32.3625 17.4188C39.5719 17.4188 40.9031 22.1625 40.9031 28.3313V40.9031Z"
                  fill="white"
                />
              </svg>
            </Link>
          )}
        </div>
        <p className="text-lg text-purple-900 font-medium mb-4">
          {advisor.role}
        </p>
        <p className="text-gray-600 leading-relaxed mb-6 max-w-lg">
          {bioText}
          {shouldTruncate && (
            <button
              onClick={toggleExpanded}
              className="ml-2 text-purple-800 hover:underline focus:outline-none"
            >
              {expanded ? 'Show Less' : 'See More'}
            </button>
          )}
        </p>
      </div>
    </div>
  );
}

export default function AdvisorsSection() {
  const advisors = [
    {
      name: 'Kyle Clunies-Ross ',
      role: 'Advisory Board Member',
      image:
        'https://ag48k7iwo0.ufs.sh/f/kjTnxX49Ouat3paKCBGqKMcg8hHpkSG0J2RDBrzObyt1PZw4',
      linkedin: 'https://www.linkedin.com/in/kyle-clunies-ross-229636120/',
      bio: 'Kyle Clunies-Ross is an innovator at the intersection of quantum technologies and responsible innovation. Currently undertaking a PhD to develop quantum sensing technologies for the biosciences, he is dedicated to creating cutting-edge solutions while ensuring ethical and responsible implementation in technological innovations. With a background in physics and law, including an LLB (Hons) and a BSc from the University of Queensland, Kyle brings a multidisciplinary perspective to emerging techno',
    },
    {
      name: 'Adi Rudraraju ',
      role: 'Advisory Board Member',
      image:
        'https://ag48k7iwo0.ufs.sh/f/kjTnxX49OuatFqsgLFfTQ9m1d4Ist7LRhgGZCHxyqW2N3MoE',
      linkedin: 'https://www.linkedin.com/in/aditya-rudraraju-208b3a186',
      bio: 'Adi is a seasoned AI technologist and Director at CopilotHQ. He’s dedicated to helping enterprises, both locally and globally, prepare for the advent of AGI by building an AI-first mindset through his hands-on advisory and development work. At CopilotHQ, Adi leads a full-service team that partners with organisations every step of the way—from offering strategic insights and developing innovative AI solutions to establishing robust adoption frameworks. With a proven track record across Australia, the USA, the UK, the UAE, and Singapore, he bridges the gap between technology, strategy, and execution, ensuring AI initiatives are both visionary and practical. Adi remains committed to staying ahead of emerging trends, continually upgrading his expertise so that business leaders are well-equipped to fully capitalise on AI’s transformative potential.',
    },
    {
      name: 'Jupiter',
      role: 'Advisory Board AI',
      image:
        'https://ag48k7iwo0.ufs.sh/f/kjTnxX49OuatYoEzL61b3Gz0gZW5qEPKFDSJ9eVTymfnAoNw',
      linkedin: '#',
      bio: 'Meet Jupiter. He may share his name with the largest planet in our solar system, but his insights into artificial intelligence are equally expansive. Jupiter is our trusted digital advisor at Responsble.ai. He monitors the latest AI news from Australia and around the world, ensuring our board is well-informed about emerging trends and critical developments. With sharp analytical skills and a subtle touch of humour, he guides our decision-making and helps us navigate the fast-changing landscape of AI.',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
            Board of Advisors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the experts guiding our vision and strategy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {advisors.map((advisor) => (
            <AdvisorCard key={advisor.name} advisor={advisor} />
          ))}
        </div>
      </div>
    </section>
  );
}
