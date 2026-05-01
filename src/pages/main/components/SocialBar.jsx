// import { Globe, Instagram, Facebook } from 'lucide-react';

// const socials = [
//   { icon: Globe, label: 'www.golkardiy.or.id', href: '#' },
//   { icon: Instagram, label: '@golkardiy', href: '#' },
//   { icon: Facebook, label: 'Golkar DIY Official', href: '#' },
// ];

export default function SocialBar() {
  return (
    <div className="relative z-30 bg-golkar-dark-gold shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {/* {socials.map((item, i) => (
          <a
            key={i}
            href={item.href}
            className="inline-flex items-center gap-2.5 text-white text-sm font-medium hover:text-golkar-light transition-all duration-300 hover:-translate-y-0.5 group"
          >
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition">
              <item.icon size={16} />
            </div>
            <span className="hidden sm:inline">{item.label}</span>
          </a>
        ))} */}

        {/* Dividers between items (desktop) */}
        <style>{`
          @media (min-width: 768px) {
            .social-divider { display: block; }
          }
        `}</style>
      </div>
    </div>
  );
}
